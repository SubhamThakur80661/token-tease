import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { FaArrowRight, FaPlay, FaCube, FaFire } from 'react-icons/fa';
import ThreeDSlider from './ThreeDSlider'; // Ensure this file exists in src/

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const horizontalContainerRef = useRef(null);

  useEffect(() => {
    // 1. ACTIVATE LUXURY SMOOTH SCROLL (Lenis)
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. HORIZONTAL SCROLL LOGIC
    const panels = gsap.utils.toArray(".horizontal-panel");
    
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalContainerRef.current,
        pin: true,
        scrub: 1,
        end: "+=3500", 
      }
    });

    // 3. PARALLAX TEXT EFFECT
    panels.forEach((panel) => {
      const text = panel.querySelector(".parallax-text");
      if (text) {
        gsap.to(text, {
          x: -150,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: gsap.getTweensOf(panels)[0], 
            start: "left center",
            end: "right center",
            scrub: true,
          }
        });
      }
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-tt-black text-tt-beige overflow-x-hidden font-sans selection:bg-tt-pink selection:text-tt-black">
      
      {/* --- FIXED HEADER --- */}
      <nav className="fixed top-0 w-full px-8 py-6 flex justify-between items-center z-50 mix-blend-difference">
        {/* Replace with <img src="/logo.svg" /> if you have the file */}
        <div className="text-2xl font-serif font-bold tracking-widest text-tt-pink">TT</div>
        
        <div className="hidden md:flex items-center gap-6">
          <span className="text-xs font-mono text-tt-olive border border-tt-olive/30 px-3 py-1 rounded-full">
            BETA Protocol
          </span>
        </div>
      </nav>

      {/* --- FIXED BACKGROUND GRID --- */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, #314021 1px, transparent 1px), linear-gradient(to bottom, #314021 1px, transparent 1px)',
             backgroundSize: '4rem 4rem' 
           }}>
      </div>

      {/* =========================================
          PHASE 1: THE HORIZONTAL SCROLL CONTAINER
      ========================================= */}
      <div ref={horizontalContainerRef} className="h-screen w-full relative overflow-hidden flex flex-nowrap z-10">
        
        {/* PANEL 1: HERO */}
        <div className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center justify-center relative border-r border-tt-dark/30">
          <div className="relative z-10 px-10 text-center">
            <h1 className="parallax-text text-[15vw] leading-[0.8] font-serif font-black text-tt-pink mix-blend-hard-light">
              TOKEN
            </h1>
            <h1 className="text-[15vw] leading-[0.8] font-serif font-black text-transparent stroke-text opacity-50 -mt-4 md:-mt-8">
              TEASE
            </h1>
            <div className="mt-16 flex flex-col items-center gap-4">
              <p className="text-xl uppercase tracking-[0.3em] text-tt-olive">
                Web3 Content Protocol
              </p>
            </div>
          </div>
        </div>

        {/* PANEL 2: THE VISION */}
        <div className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center justify-center relative border-r border-tt-dark/30 bg-tt-black/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl px-8 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-serif text-tt-beige leading-tight">
                Watch. <span className="text-tt-pink italic">Unlock.</span> Own.
              </h2>
              <p className="text-lg opacity-70 max-w-md leading-relaxed font-sans">
                The first decentralized platform where views are transactions.
              </p>
            </div>
            <div className="relative aspect-[9/16] h-[60vh] bg-tt-dark/20 rounded-[3rem] border-2 border-tt-pink/10 flex items-center justify-center">
               <div className="w-20 h-20 rounded-full border-2 border-tt-pink/50 flex items-center justify-center">
                 <FaPlay className="ml-2 text-tt-pink text-3xl" />
               </div>
            </div>
          </div>
        </div>

        {/* PANEL 3: CTA */}
        <div className="horizontal-panel w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center relative bg-tt-black/90">
          <h2 className="parallax-text text-[12vw] font-serif text-tt-dark absolute top-1/2 -translate-y-1/2 left-0 opacity-10 whitespace-nowrap pointer-events-none">
            JOIN THE PROTOCOL
          </h2>
          <div className="z-10 text-center space-y-10 relative">
            <h3 className="text-4xl md:text-6xl font-bold font-serif">Ready to enter?</h3>
            <FaArrowRight className="text-4xl text-tt-pink mx-auto animate-bounce mt-10 rotate-90" />
          </div>
        </div>

      </div>

      {/* =========================================
          PHASE 2: THE VERTICAL SECTION (360 Slider)
      ========================================= */}
      <section className="relative z-20 bg-tt-black min-h-screen border-t border-tt-dark/50 flex flex-col items-center justify-center overflow-hidden py-20">
        
        {/* Background Grid Pattern for Phase 2 */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(#314021 1px, transparent 1px), linear-gradient(90deg, #314021 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-7xl mx-auto px-8 relative z-10 text-center">
            
            {/* Header */}
            <div className="mb-20">
                <span className="text-tt-pink uppercase tracking-[0.3em] text-xs font-bold border border-tt-pink/30 px-4 py-2 rounded-full">
                    Phase II
                </span>
                <h2 className="text-5xl md:text-8xl font-serif text-tt-beige mt-8">
                    Famous <span className="text-tt-olive italic">Creators</span>
                </h2>
            </div>

            {/* THE NEW 3D SLIDER */}
            <div className="mt-10">
                <ThreeDSlider />
            </div>

        </div>
      </section>

      <style>{`.stroke-text { -webkit-text-stroke: 2px #D8C6BA; }`}</style>
    </div>
  );
}
