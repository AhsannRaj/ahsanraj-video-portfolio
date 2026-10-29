"use client";

import React from "react";

const SiteFooter = () => (
  <footer id="main-footer">
    <div className="footer-top">
      <div className="footer-brand">
        <h1 className="f-logo">AHSAN</h1>
        <p className="f-desc">Frontend Web Developer &amp; Technical Support from Lahore.<br />Also here for the computer problems that somehow become urgent at 11 PM.</p>
        <div className="f-socials">
          <a href="https://github.com/ahsannraj" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
          <a href="https://www.linkedin.com/in/ahsanraj" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
          <a href="https://www.instagram.com/itzahsanraj/" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
          <a href="https://x.com/buildwithchain" target="_blank" rel="noreferrer" aria-label="X">𝕏</a>
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
