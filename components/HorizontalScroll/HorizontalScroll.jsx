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
       * IMPORTANT:
       * The FIRST character ("I") starts at the CENTER
       * of the viewport.
       *
       * We do NOT center the whole text.
       * Instead, the LEFT edge of the text is positioned
       * at the center of the viewport.
       */
      gsap.set(text, {
        left: "50%",
        xPercent: 0,
      });

      const getPinDistance = () => {
        const textWidth = text.scrollWidth;
        const viewport = window.innerWidth;

        /*
         * The text starts with "I" at the viewport center.
         * It then needs to travel all the way left until
         * the complete sentence has exited the viewport.
         */
        return Math.max(textWidth + viewport * 0.5, viewport);
      };

      const scrollTween = gsap.to(text, {
        x: () => -(text.scrollWidth + window.innerWidth * 0.5),
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

  /*
   * Split text into words and characters
   * while preserving spaces.
   */
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
            transform: "none",
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
