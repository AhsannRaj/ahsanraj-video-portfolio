"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EMAIL_ADDRESS = "ahsannraj@gmail.com";
const WHATSAPP_URL = "https://wa.me/923001480309";
const LINKEDIN_URL = "https://www.linkedin.com/in/ahsanraj";
const GITHUB_URL = "https://github.com/ahsannraj";
const TELEGRAM_URL = "https://t.me/ahsanraj";

const ArrowUpRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>;

const Contact = () => {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const emailRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(eyebrowRef.current?.querySelectorAll(".ct-char") ?? [], { opacity: 0, y: 40, duration: 1, stagger: { amount: 0.4, from: "start" }, ease: "power3.out", scrollTrigger: { trigger: eyebrowRef.current, start: "top 90%", toggleActions: "play none none reverse" } });
      gsap.from(headlineRef.current?.querySelectorAll(".ct-char") ?? [], { opacity: 0, y: 200, duration: 1.4, stagger: { amount: 0.6, from: "start" }, ease: "power3.out", scrollTrigger: { trigger: headlineRef.current, start: "top 85%", toggleActions: "play none none reverse" } });
      gsap.from([emailRef.current, ctaRef.current], { autoAlpha: 0, y: 50, duration: 1, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: emailRef.current, start: "top 95%", toggleActions: "play none none reverse" } });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  const splitChars = (text) => text.split("").map((char, i) => <span key={i} className="ct-char" style={{ display: "inline-block" }}>{char === " " ? "\u00A0" : char}</span>);

  return (
    <section id="contact-section" ref={sectionRef}>
      <div id="ct-eyebrow" ref={eyebrowRef}>{splitChars("want to work together?")}</div>
      <h2 id="ct-headline" ref={headlineRef}>{splitChars("let's talk.")}</h2>
      <a id="ct-email" href={`mailto:${EMAIL_ADDRESS}`} ref={emailRef} aria-label="Email Ahsan">{EMAIL_ADDRESS}</a>
      <div id="ct-actions" ref={ctaRef}>
        <a id="ct-btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><span>WHATSAPP</span><ArrowUpRight /></a>
        <a id="ct-btn-secondary" href={LINKEDIN_URL} target="_blank" rel="noreferrer"><span>LINKEDIN</span><ArrowUpRight /></a>
        <a id="ct-btn-secondary" href={GITHUB_URL} target="_blank" rel="noreferrer"><span>GITHUB</span><ArrowUpRight /></a>
        <a id="ct-btn-secondary" href={TELEGRAM_URL} target="_blank" rel="noreferrer"><span>TELEGRAM</span><ArrowUpRight /></a>
      </div>
    </section>
  );
};

export default Contact;
