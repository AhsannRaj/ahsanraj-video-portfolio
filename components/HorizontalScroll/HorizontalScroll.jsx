"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXT = "I BUILD CLEAN, FAST & RESPONSIVE WEBSITES";

const HorizontalScroll = () => {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const text = textRef.current;

    if (!wrapper || !sticky || !text) return;

    const ctx = gsap.context(() => {
      const chars = text.querySelectorAll(".hs-char");

      /*
       * Start the heading from the CENTER of the viewport.
       *
       * left: 50% + xPercent: -50%
       * means the center point of the complete text sits exactly
       * at the center of the viewport.
       *
       * This prevents the mobile animation from beginning at the
       * left edge of the screen.
       */
      gsap.set(text, {
        left: "50%",
        xPercent: -50,
      });

      const getPinDistance = () => {
        const textWidth = text.scrollWidth;
        const viewport = window.innerWidth;

        // Distance required for the complete text to travel
        // from its centered starting position to fully outside
        // the left side of the viewport.
        const travel = Math.max(
          textWidth / 2 + viewport / 2,
          viewport
        );

        return travel;
      };

      /*
       * Move the text from its centered starting position
       * toward the left as the user scrolls.
       *
       * xPercent is relative to the text's own width, while the
       * initial -50% keeps its center aligned with the viewport.
       */
      const scrollTween = gsap.to(text, {
        xPercent: -110,
        ease: "none",
        scrollTrigger: {
          trigger: sticky,
          start: "top top",
          end: () => "+=" + getPinDistance(),
          scrub: 0.5,
          pin: sticky,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * Individual character animation.
       * Preserved from the original implementation.
       */
      chars.forEach((char) => {
        gsap.from(char, {
          yPercent: gsap.utils.random(-200, 200),
          rotation: gsap.utils.random(-20, 20),
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "left 30%",
            scrub: 1,
          },
        });
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  // Split text into words and characters while preserving spaces.
  const renderText = () => {
    return TEXT.split(" ").map((word, wi, arr) => (
      <span
        key={wi}
        className="hs-word"
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
        }}
      >
        {word.split("").map((char, ci) => (
          <span
            key={ci}
            className="hs-char"
            style={{
              display: "inline-block",
            }}
          >
            {char}
          </span>
        ))}

        {wi < arr.length - 1 && (
          <span
            className="hs-char"
            style={{
              display: "inline-block",
            }}
          >
            &nbsp;
          </span>
        )}
      </span>
    ));
  };

  return (
    <section className="Horizontal" ref={wrapperRef}>
      <div className="hs-sticky" ref={stickyRef}>
        <h3
          className="Horizontal__text heading-xl"
          ref={textRef}
          style={{
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
            width: "max-content",
            whiteSpace: "nowrap",
          }}
        >
          {renderText()}
        </h3>
      </div>
    </section>
  );
};

export default HorizontalScroll;
