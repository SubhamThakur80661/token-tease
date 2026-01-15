import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import ThreeDSlider from './ThreeDSlider'; // Import your new slider

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(1); // For Side Nav

  useEffect(() => {
    // 1. Initialize Smooth Scroll
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

    // 2. HORIZONTAL SCROLL LOGIC (PHASE I)
    const sections = gsap.utils.toArray(".horizontal-panel");
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: "+=3000",
        onUpdate: (self) => {
          // Logic to switch Side Nav from I to II
          if (self.progress > 0.9) setActiveSection(2);
          else setActiveSection(1);
        }
      }
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-tt-black text-tt-beige overflow-x-hidden font-sans">
      
      {/* --- SIDE NAVIGATION (Fixed Right) --- */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 pr-6 hidden md:flex flex-col gap-6 text-xs font-serif mix-blend-difference">
        <div className={`transition-all duration-300 ${activeSection === 1 ? 'text-tt-pink scale-150 font-bold' : 'opacity-40'}`}>
          I
        </div>
        <div className="w-[1px] h-8 bg-tt-beige/20 mx-auto"></div>
        <div className={`transition-all duration-300 ${activeSection === 2 ? 'text-tt-pink scale-150 font-bold' : 'opacity-40'}`}>
          II
        </div>
        <div className="w-[1px] h-8 bg-tt-beige/20 mx-auto"></div>
        <div className="opacity-40">III</div>
      </div>

      {/* --- PHASE I: HORIZONTAL SCROLL WRAPPER --- */}
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden flex flex-nowrap z-10">
        
        {/* PANEL 1: HERO */}
        <div className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center justify-center relative border-r border-tt-dark/30">
          <div className="text-center">
            <h1 className="text-[12vw] leading-none font-serif font-black text-tt-pink">TOKEN</h1>
            <h1 className="text-[12vw] leading-none font-serif font-black text-transparent stroke-text opacity-50">TEASE</h1>
          </div>
        </div>

        {/* PANEL 2: INTRO */}
        <div className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center justify-center bg-tt-black border-r border-tt-dark/30">
           <h2 className="text-6xl font-serif max-w-2xl text-center leading-tight">
             The <span className="text-tt-olive italic">Renaissance</span> <br/> of Content.
           </h2>
        </div>

      </div>

      {/* --- PHASE II: VERTICAL SECTION (Creators) --- */}
      <section className="relative z-20 bg-tt-black py-32 border-t border-tt-pink/20 min-h-screen flex flex-col items-center justify-center">
        
        {/* Background Grid for Phase II */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#314021 1px, transparent 1px), linear-gradient(90deg, #314021 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-tt-pink uppercase tracking-[0.3em] text-sm font-bold mb-4 block">Phase II</span>
          <h2 className="text-6xl md:text-8xl font-serif text-tt-beige mb-20">
            Famous Creators
          </h2>
          
          {/* THE 3D SLIDER COMPONENT */}
          <ThreeDSlider />
          
        </div>
      </section>

      <style>{`.stroke-text { -webkit-text-stroke: 2px #D8C6BA; }`}</style>
    </div>
  );
}