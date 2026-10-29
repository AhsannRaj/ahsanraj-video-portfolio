"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
const GithubIcon = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.78.5 12.28c0 5.2 3.34 9.6 7.98 11.15.58.11.79-.26.79-.57v-2.01c-3.25.72-3.93-1.4-3.93-1.4-.53-1.38-1.3-1.75-1.3-1.75-1.06-.75.08-.74.08-.74 1.17.08 1.79 1.23 1.79 1.23 1.04 1.82 2.73 1.3 3.4.99.11-.77.41-1.3.74-1.6-2.59-.3-5.31-1.33-5.31-5.8 0-1.28.45-2.32 1.18-3.14-.12-.3-.51-1.49.11-3.1 0 0 .96-.31 3.15 1.2a10.5 10.5 0 0 1 5.74 0c2.19-1.51 3.15-1.2 3.15-1.2.62 1.61.23 2.8.11 3.1.73.82 1.18 1.86 1.18 3.14 0 4.48-2.73 5.49-5.33 5.78.42.38.79 1.11.79 2.24v3.31c0 .31.21.68.8.56A11.79 11.79 0 0 0 23.5 12.28C23.5 5.78 18.35.5 12 .5Z" />
  </svg>
);

const LinkedinIcon = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M5.37 3.3A2.3 2.3 0 1 1 .77 3.3a2.3 2.3 0 0 1 4.6 0ZM1.03 8.1h4.68V23H1.03V8.1ZM8.2 8.1h4.49v2.04h.06c.62-1.18 2.15-2.42 4.43-2.42 4.74 0 5.61 3.12 5.61 7.18V23h-4.68v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.88-2.77 3.81V23H8.2V8.1Z" />
  </svg>
);

const InstagramIcon = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
  </svg>
);

const SOCIALS = {
  github: "https://github.com/ahsannraj",
  linkedin: "https://www.linkedin.com/in/ahsanraj",
  instagram: "https://www.instagram.com/itzahsanraj/",
  x: "https://x.com/buildwithchain",
};

const HeroSection = () => {
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const loaderRef = useRef(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentText, setCurrentText] = useState("AHSAN ALI");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = "hidden";
    gsap.set(videoContainerRef.current, { autoAlpha: 0, scale: 1.05 });

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaderDone(true);
        document.body.style.overflow = "";
      },
    });

    tl.to(loaderRef.current, { y: "-100%", duration: 1.1, ease: "power3.out" }, "start+=3.0");
    tl.to(videoContainerRef.current, { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" }, "start+=3.2");

    const t1 = setTimeout(() => setCurrentText("احسن علی"), 1000);
    const t2 = setTimeout(() => setCurrentText("WELCOME TO MY PORTFOLIO"), 2000);

    return () => {
      tl.kill();
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);


  const handleScrollToWork = (e) => {
    e.preventDefault();
    const target = document.getElementById("projects-section") || document.getElementById("about");
    if (target) {
      const lenis = window.__lenis;
      lenis?.scrollTo ? lenis.scrollTo(target, { offset: 0, duration: 1.4 }) : target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      return;
    }
    video.muted = false;
    video.play().then(() => setIsPlaying(true)).catch(() => {
      setIsPlaying(false);
    });
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.7 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <>
      <div id="loader" ref={loaderRef} style={{ backgroundColor: "#111111", zIndex: 100002, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center justify-center text-center px-4">
          <img src="/avatar-logo.jpg" alt="Ahsan Ali" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/10 mb-6 object-cover shadow-lg" />
          <div className="h-10 flex items-center justify-center overflow-hidden">
            <motion.div key={currentText} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="text-[#F5F1EA] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-widest uppercase" style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}>
              {currentText}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <section id="hero-section" className="relative w-full h-screen min-h-[600px] overflow-hidden select-none transition-colors duration-300" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
        <div ref={videoContainerRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
          <video
            ref={videoRef}
            key={isMobile ? "mobile-video" : "desktop-video"}
            src={isMobile ? "/hero-bg-mobile.mp4" : "/hero-bg-video.mp4"}
            playsInline
            preload="metadata"
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div aria-hidden="true" className="hero-video-overlay" />

        <motion.div variants={containerVariants} initial="hidden" animate={loaderDone ? "visible" : "hidden"} className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 lg:left-20 z-10 max-w-[480px] flex flex-col items-start text-left pointer-events-auto bg-black/10 backdrop-blur-[2px] p-6 rounded-2xl border border-white/10 lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:border-none">
          <motion.span variants={itemVariants} className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-white/80 uppercase mb-2" style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}>
            HELLO, I'M AHSAN
          </motion.span>
          <motion.div variants={itemVariants} className="flex items-center gap-1.5 mb-6">
            <div className="w-12 h-[1.5px] bg-white/35" /><div className="w-1.5 h-1.5 rounded-full bg-white/80" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-[3.2rem] font-black uppercase leading-[1.05] tracking-tight text-white mb-6 drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]" style={{ fontFamily: "'AeonikBold', 'Neue Montreal', sans-serif" }}>
            FRONTEND WEB DEVELOPER <br />
            <span className="text-white/80 font-bold">&amp; TECHNICAL SUPPORT</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xs sm:text-sm text-white/75 leading-relaxed mb-8 max-w-[40ch] drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]" style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}>
            I design clean interfaces, build responsive websites, and help keep everyday tech problems under control.
          </motion.p>
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            <a href="#projects-section" onClick={handleScrollToWork} className="px-6 py-3 bg-white text-black hover:bg-white/90 rounded-full flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-lg" style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}>
              <span>View My Work</span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </a>
            <a href="/Ahsan_Ali_CV_Pakistan.pdf" target="_blank" rel="noopener noreferrer" download="Ahsan_Ali_CV_Pakistan.pdf" className="text-xs font-semibold text-white hover:text-white/75 flex items-center gap-1.5 pb-0.5 border-b border-white/70 transition-all drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]" style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}>
              <span>Download CV</span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
            </a>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-5 mt-8 text-white/75">
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub" className="hero-social-icon hover:text-white transition-colors"><GithubIcon size={17} /></a>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn" className="hero-social-icon hover:text-white transition-colors"><LinkedinIcon size={17} /></a>
            <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram" className="hero-social-icon hover:text-white transition-colors"><InstagramIcon size={17} /></a>
            <a href={SOCIALS.x} target="_blank" rel="noopener noreferrer" title="X" aria-label="X" className="hero-social-icon hover:text-white transition-colors"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg></a>
          </motion.div>
        </motion.div>

        <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={loaderDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }} transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }} onClick={togglePlay} className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 z-20 flex items-center gap-3 bg-black/45 backdrop-blur-md border border-white/35 hover:border-white/70 px-4 py-2.5 rounded-full text-white hover:bg-white hover:text-black transition-all active:scale-95 shadow-lg group cursor-pointer" style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}>
          <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-colors">
            {isPlaying ? <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current translate-x-[1px]"><path d="M8 5v14l11-7z"/></svg>}
          </span>
          <span className="text-[11px] font-bold tracking-[0.18em] uppercase pr-2">{isPlaying ? "PAUSE VIDEO" : "PLAY VIDEO"}</span>
        </motion.button>
      </section>
    </>
  );
};

export default HeroSection;
