"use client";

import React from "react";

const GithubIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.78.5 12.28c0 5.2 3.34 9.6 7.98 11.15.58.11.79-.26.79-.57v-2.01c-3.25.72-3.93-1.4-3.93-1.4-.53-1.38-1.3-1.75-1.3-1.75-1.06-.75.08-.74.08-.74 1.17.08 1.79 1.23 1.79 1.23 1.04 1.82 2.73 1.3 3.4.99.11-.77.41-1.3.74-1.6-2.59-.3-5.31-1.33-5.31-5.8 0-1.28.45-2.32 1.18-3.14-.12-.3-.51-1.49.11-3.1 0 0 .96-.31 3.15 1.2a10.5 10.5 0 0 1 5.74 0c2.19-1.51 3.15-1.2 3.15-1.2.62 1.61.23 2.8.11 3.1.73.82 1.18 1.86 1.18 3.14 0 4.48-2.73 5.49-5.33 5.78.42.38.79 1.11.79 2.24v3.31c0 .31.21.68.8.56A11.79 11.79 0 0 0 23.5 12.28C23.5 5.78 18.35.5 12 .5Z" />
  </svg>
);

const LinkedinIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M5.37 3.3A2.3 2.3 0 1 1 .77 3.3a2.3 2.3 0 0 1 4.6 0ZM1.03 8.1h4.68V23H1.03V8.1ZM8.2 8.1h4.49v2.04h.06c.62-1.18 2.15-2.42 4.43-2.42 4.74 0 5.61 3.12 5.61 7.18V23h-4.68v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.88-2.77 3.81V23H8.2V8.1Z" />
  </svg>
);

const InstagramIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = ({ size = 21 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);


const SiteFooter = () => (
  <footer id="main-footer">
    <div className="footer-top">
      <div className="footer-brand">
        <h1 className="f-logo">AHSAN</h1>
        <p className="f-desc">Frontend Web Developer &amp; Technical Support from Lahore.<br />Also here for the computer problems that somehow become urgent at 11 PM.</p>
        <div className="f-socials">
          <a href="https://github.com/ahsannraj" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><GithubIcon /></a>
          <a href="https://www.linkedin.com/in/ahsanraj" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><LinkedinIcon /></a>
          <a href="https://www.instagram.com/itzahsanraj/" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram"><InstagramIcon /></a>
          <a href="https://x.com/buildwithchain" target="_blank" rel="noreferrer" aria-label="X" title="X"><XIcon /></a>
        </div>
      </div>
      <div className="footer-links">
        <div className="f-col">
          <h3>EXPLORE</h3>
          <a href="#about">About</a>
          <a href="#projects-section">Projects</a>
          <a href="#contact-section">Contact</a>
          <a href="/Ahsan_Ali_CV_Pakistan.pdf" target="_blank" rel="noreferrer">Résumé</a>
        </div>
        <div className="f-col">
          <h3>CONTACT</h3>
          <a href="mailto:ahsannraj@gmail.com">ahsannraj@gmail.com</a>
          <a href="https://wa.me/923001480309" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://t.me/ahsanraj" target="_blank" rel="noreferrer">Telegram</a>
          <a href="https://www.linkedin.com/in/ahsanraj" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Ahsan Ali. All rights reserved.</p>
      <p>Lahore, Pakistan · Built with Next.js</p>
    </div>
  </footer>
);

export default SiteFooter;
