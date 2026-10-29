import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const FeaturedVideo = ({ refForward, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: refForward, layoutEffect: false });
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", setProgress);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 1 }}
      animate={{ scale: progress > 0.5 ? 1.04 : 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full aspect-[3/4] md:aspect-[856/1024] overflow-hidden rounded-3xl shadow-md z-30"
      {...props}
    >
      <img src="/images/about-portrait.jpg" alt="Ahsan Ali portrait" className="absolute inset-0 w-full h-full object-cover" />
    </motion.div>
  );
};

export default FeaturedVideo;
