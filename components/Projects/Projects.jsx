"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    name: "Ahsan Ali Portfolio",
    href: "https://ahsanraj.vercel.app/",
    role: "Next.js • Tailwind CSS • GSAP",
    kind: "Live",
    note: "This portfolio: a motion-led personal site rebuilt around Ahsan's work, contact links, CV and real early-career positioning.",
    image: "/images/projects/personalportfolio.jpg",
  },
  {
    name: "NoMoreDMS",
    href: "https://nomoredms.vercel.app/",
    role: "Reference project",
    kind: "Keep",
    note: "Existing project slot retained for now; replace with Ahsan's own project details when ready.",
    image: "/images/projects/nomoredms.png",
  },
  {
    name: "EduCalc",
    href: "https://educalc-expert0509.vercel.app/",
    role: "Reference project",
    kind: "Keep",
    note: "Existing project slot retained for now; replace with Ahsan's own project details when ready.",
    image: "/images/projects/educalc.png",
  },
  {
    name: "PostLearn",
    href: "https://postlearn-lake.vercel.app/",
    role: "Reference project",
    kind: "Keep",
    note: "Existing project slot retained for now; replace with Ahsan's own project details when ready.",
    image: "/images/projects/postlearn.png",
  },
  {
    name: "Cozy Cafe Website",
    href: "https://cozy-cafa1.netlify.app/",
    role: "Reference project",
    kind: "Keep",
    note: "Existing project slot retained for now; replace with Ahsan's own project details when ready.",
    image: "/images/projects/cozy-cafe.png",
  },
  {
    name: "Maatoori Akshith Portfolio",
    href: "https://maatoori-akshith.netlify.app/",
    role: "Reference project",
    kind: "Keep",
    note: "Existing project slot retained for now; replace with Ahsan's own project details when ready.",
    image: "/images/projects/maatoori-akshith.jpg",
  },
  {
    name: "TeamZ",
    href: "https://teamz09.netlify.app/",
    role: "Reference project",
    kind: "Keep",
    note: "Existing project slot retained for now; replace with Ahsan's own project details when ready.",
    image: "/images/projects/teamz.png",
  },
];

const VENTURES = [
  { name: "Portfolio & Landing Pages", role: "Web Design + Frontend", href: null, kind: "Service", note: "Clean, responsive pages for personal brands, small businesses and practical web needs." },
  { name: "UI to Clean Code", role: "Frontend", href: null, kind: "Service", note: "Turning a design or visual reference into responsive HTML, CSS and JavaScript." },
  { name: "Fixes & Polish", role: "Web support", href: null, kind: "Service", note: "Layout fixes, responsiveness, small UI improvements and practical website cleanup." },
  { name: "IT & Data Support", role: "Office / computer support", href: null, kind: "Service", note: "Basic troubleshooting, Excel/data-entry support and everyday computer help." },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7" /><path d="M8 7h9v9" />
  </svg>
);

const Row = ({ item, index }) => {
  const hasLink = Boolean(item.href);
  const Wrapper = hasLink ? "a" : "div";
  return (
    <li className="pj-row">
      <Wrapper className={`pj-link${hasLink ? "" : " pj-link--static"}`} {...(hasLink ? { href: item.href, target: "_blank", rel: "noreferrer" } : {})}>
        <span className="pj-num">{String(index + 1).padStart(2, "0")}</span>
        {item.image && <img src={item.image} alt="" className="w-20 h-14 sm:w-28 sm:h-18 object-contain bg-white/5 rounded-xl border border-white/10 shrink-0" />}
        <div className="pj-meta"><span className="pj-name">{item.name}</span>{item.role && <span className="pj-role">{item.role}</span>}{item.note && <span className="pj-note">{item.note}</span>}</div>
        <span className="pj-kind">{item.kind}</span>
        <span className="pj-arrow" aria-hidden="true">{hasLink ? <ArrowIcon /> : <span className="pj-dot">•</span>}</span>
      </Wrapper>
    </li>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll(".pj-row"), { opacity: 0, y: 60, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } });
      gsap.from(sectionRef.current.querySelectorAll(".pj-title"), { opacity: 0, y: 40, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true } });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects-section" ref={sectionRef}>
      <div className="pj-head"><span className="pj-label">PROJECTS</span><h2 className="pj-title">selected work</h2></div>
      <ul className="pj-list">{PROJECTS.map((p, i) => <Row key={p.name} item={p} index={i} />)}</ul>
      <div id="ventures" className="pj-head pj-head--secondary"><span className="pj-label">WHAT I CAN DO</span><h2 className="pj-title">practical services</h2></div>
      <ul className="pj-list">{VENTURES.map((v, i) => <Row key={v.name} item={v} index={i} />)}</ul>
    </section>
  );
};

export default Projects;
