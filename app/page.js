"use client";
import { Suspense, useRef, useEffect } from "react";
import Header from "@/components/Featured/Header";
import Skiggle from "@/components/Featured/Skiggle";
import SubHeader from "@/components/Featured/SubHeader";
import Navbar from "@/components/Navbar/Navbar";
import FeaturedVideo from "@/components/Featured/FeaturedVideo";
import SmoothScroll from "@/components/SmoothScroll";
import GradualBlur from "@/components/GradualBlur/GradualBlur";
import HorizontalScroll from "@/components/HorizontalScroll/HorizontalScroll";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import HeroSection from "@/components/HeroSection/HeroSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const ref = useRef(null);
  const blurRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const blur = blurRef.current;
    const footer = document.getElementById("main-footer");
    if (!blur || !footer) return;

    const setVisible = (visible) =>
      gsap.to(blur, { autoAlpha: visible ? 1 : 0, duration: 0.3, overwrite: true });

    const updateBlurState = () => {
      const isAtTop = window.scrollY < 20;
      const footerInView = footer.getBoundingClientRect().top < window.innerHeight;
      setVisible(!isAtTop && !footerInView);
    };

    updateBlurState();

    const triggerHero = ScrollTrigger.create({
      trigger: "#hero-section",
      start: "bottom bottom",
      onEnter: updateBlurState,
      onLeaveBack: updateBlurState,
    });

    const triggerFooter = ScrollTrigger.create({
      trigger: footer,
      start: "top bottom",
      end: "bottom top",
      onEnter: updateBlurState,
      onEnterBack: updateBlurState,
      onLeave: updateBlurState,
      onLeaveBack: updateBlurState,
    });

    return () => {
      triggerHero.kill();
      triggerFooter.kill();
    };
  }, []);

  return (
    <SmoothScroll>
      <Suspense
        fallback={
          <div className="w-screen bg-black h-screen text-white text-4xl md:text-7xl flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <div className="bg-bg text-fg h-auto w-screen overflow-x-hidden">
          <Navbar />
          <HeroSection />

          <div
            id="about"
            className="h-auto relative mt-16 md:mt-[10rem] px-6 sm:px-12 lg:px-20 pb-24 z-10 flex flex-col gap-8 md:gap-12"
            ref={ref}
          >
            <Skiggle />
            <Header />
            <div className="w-full flex flex-col md:flex-row gap-12 lg:gap-16 items-start relative z-10">
              <div className="w-full md:w-[42%] lg:w-[38%] flex-shrink-0 flex justify-center md:justify-start">
                <FeaturedVideo refForward={ref} />
              </div>
              <div className="w-full md:flex-grow">
                <SubHeader />
              </div>
            </div>
          </div>

          <Projects />
          <HorizontalScroll />
          <Contact />
          <SiteFooter />

          <div
            ref={blurRef}
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              zIndex: 99999,
            }}
          >
            <GradualBlur
              target="parent"
              position="bottom"
              height="3.25rem"
              strength={1.15}
              divCount={4}
              curve="bezier"
              exponential={false}
              opacity={0.62}
              zIndex={1}
            />
          </div>
        </div>
      </Suspense>
    </SmoothScroll>
  );
}
