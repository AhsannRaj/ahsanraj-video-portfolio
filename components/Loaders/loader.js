import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

function onBufferLoad(buffer) {
  if (!buffer) {
    throw new Error("No buffer data was provided.");
  }

  const view = new DataView(buffer);

  if (buffer.byteLength < 4) {
    throw new Error("Invalid schematic buffer.");
  }

  const schematicJsonSize = view.getUint32(0, true);

  if (
    schematicJsonSize <= 0 ||
    schematicJsonSize > buffer.byteLength - 4
  ) {
    throw new Error("Invalid schematic JSON size.");
  }

  const jsonBytes = new Uint8Array(
    buffer,
    4,
    schematicJsonSize
  );

  const decoder = new TextDecoder("utf-8");
  const schematic = JSON.parse(decoder.decode(jsonBytes));

  const vertexCount = schematic.vertexCount;
  const indexCount = schematic.indexCount;
  const schematicAttributeList = schematic.attributes;

  if (
    !Number.isFinite(vertexCount) ||
    !Array.isArray(schematicAttributeList)
  ) {
    throw new Error("Invalid schematic data.");
  }

  let offset = 4 + schematicJsonSize;

  const geometry = new THREE.BufferGeometry();

  let hasNormal = false;

  for (
    let i = 0;
    i < schematicAttributeList.length;
    i++
  ) {
    const schematicAttribute = schematicAttributeList[i];

    const id = schematicAttribute.id;

    const dataLength =
      id === "indices"
        ? indexCount
        : vertexCount;

    const componentSize =
      schematicAttribute.componentSize;

    const storageTypeName =
      schematicAttribute.storageType;

    if (!storageTypeName || typeof componentSize !== "number") {
      throw new Error(
        `Invalid attribute definition for "${id}".`
      );
    }

    let storageType;

    if (typeof window !== "undefined") {
      storageType = window[storageTypeName];
    }

    if (typeof storageType === "undefined") {
      const typedArrayTypes = {
        Int8Array,
        Uint8Array,
        Uint8ClampedArray,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
      };

      storageType =
        typedArrayTypes[storageTypeName];
    }

    if (typeof storageType !== "function") {
      throw new Error(
        `Unsupported storage type: ${storageTypeName}`
      );
    }

    const elementCount =
      dataLength * componentSize;

    const byteSize =
      storageType.BYTES_PER_ELEMENT;

    const byteLength =
      elementCount * byteSize;

    if (
      offset < 0 ||
      offset + byteLength > buffer.byteLength
    ) {
      throw new Error(
        `Invalid buffer range for attribute "${id}".`
      );
    }

    const tmpArr = new storageType(
      buffer,
      offset,
      elementCount
    );

    let outArr;

    if (schematicAttribute.needsPack) {
      const packedComponents =
        schematicAttribute.packedComponents || [];

      const packedComponentCount =
        packedComponents.length;

      const isSign =
        storageTypeName.indexOf("Int") === 0;

      const size =
        1 << (byteSize * 8);

      const valueOffset =
        isSign ? size * 0.5 : 0;

      const divider = 1 / size;

      outArr = new Float32Array(
        dataLength * componentSize
      );

      for (
        let j = 0, jk = 0;
        j < dataLength;
        j++
      ) {
        for (
          let k = 0;
          k < packedComponentCount;
          k++
        ) {
          const packedComponent =
            packedComponents[k];

          outArr[jk] =
            (tmpArr[jk] + valueOffset) *
              divider *
              packedComponent.delta +
            packedComponent.from;

          jk++;
        }
      }
    } else {
      outArr = tmpArr;
    }

    if (id === "normal") {
      hasNormal = true;
    }

    if (id === "indices") {
      geometry.setIndex(
        new THREE.BufferAttribute(
          outArr,
          1
        )
      );
    } else {
      geometry.setAttribute(
        id,
        new THREE.BufferAttribute(
          outArr,
          componentSize
        )
      );
    }

    offset += byteLength;
  }

  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  const meshType = schematic.meshType;

  let mesh;

  if (meshType === "Mesh") {
    const material =
      new THREE.MeshStandardMaterial({
        color: "#181818",
        roughness: 0.8,
        metalness: 0.05,
        flatShading: !hasNormal,
      });

    mesh = new THREE.Mesh(
      geometry,
      material
    );
  } else if (meshType === "LineSegments") {
    const material =
      new THREE.LineBasicMaterial({
        color: "#181818",
      });

    mesh = new THREE.LineSegments(
      geometry,
      material
    );
  } else {
    const material =
      new THREE.PointsMaterial({
        sizeAttenuation: false,
        size: 2,
        color: "#181818",
      });

    mesh = new THREE.Points(
      geometry,
      material
    );
  }

  return mesh;
}

export const fetchData = async (
  path,
  onProgress = (percentage) => {
    console.log(`${percentage}%`);
  }
) => {
  if (!path) {
    throw new Error("A valid file path is required.");
  }

  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch "${path}": ${response.status} ${response.statusText}`
    );
  }

  if (!response.body) {
    throw new Error(
      "ReadableStream is not available for this response."
    );
  }

  const reader =
    response.body.getReader();

  const contentLengthHeader =
    response.headers.get("Content-Length");

  const contentLength =
    contentLengthHeader
      ? Number(contentLengthHeader)
      : null;

  let receivedLength = 0;

  const chunks = [];

  while (true) {
    const { done, value } =
      await reader.read();

    if (done) {
      break;
    }

    if (value) {
      chunks.push(value);

      receivedLength += value.length;

      if (
        contentLength &&
        contentLength > 0
      ) {
        const percentage =
          Math.min(
            100,
            (receivedLength /
              contentLength) *
              100
          );

        onProgress(percentage);
      }
    }
  }

  // If Content-Length is unavailable,
  // we cannot calculate an accurate percentage.
  // Report completion once the download finishes.
  if (
    !contentLength ||
    contentLength <= 0
  ) {
    onProgress(100);
  }

  const chunksAll =
    new Uint8Array(receivedLength);

  let position = 0;

  for (const chunk of chunks) {
    chunksAll.set(
      chunk,
      position
    );

    position += chunk.length;
  }

  return onBufferLoad(
    chunksAll.buffer
  );
};

export const exportToGLTF = (mesh) => {
  if (!mesh) {
    throw new Error(
      "A valid Three.js mesh is required."
    );
  }

  if (
    typeof window === "undefined" ||
    typeof document === "undefined"
  ) {
    throw new Error(
      "GLTF export must run in a browser."
    );
  }

  const exporter =
    new GLTFExporter();

  exporter.parse(
    mesh,
    (result) => {
      try {
        let blob;

        if (result instanceof ArrayBuffer) {
          blob = new Blob(
            [result],
            {
              type:
                "application/octet-stream",
            }
          );
        } else {
          blob = new Blob(
            [JSON.stringify(result, null, 2)],
            {
              type:
                "application/json",
            }
          );
        }

        const url =
          URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href = url;
        link.download =
          "exportedModel.gltf";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1000);
      } catch (error) {
        console.error(
          "GLTF export failed:",
          error
        );
      }
    },
    (error) => {
      console.error(
        "GLTFExporter error:",
        error
      );
    },
    {
      binary: false,
    }
  );
};
