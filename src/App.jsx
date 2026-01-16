import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { FaArrowRight, FaPlay } from 'react-icons/fa';

// --- ESSENTIAL IMPORTS ONLY ---
import ThreeDSlider from './ThreeDSlider'; 
import SideNav from './SideNav'; 
import Leaderboard from './Leaderboard'; 

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const horizontalContainerRef = useRef(null);
  const pinnedSectionRef = useRef(null); 
  const sliderContainerRef = useRef(null); 
  const leaderboardContainerRef = useRef(null); 
  
  const [currentPhase, setCurrentPhase] = useState(1);

  const scrollToSection = (id) => {
    if (id === 1) window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 2) window.scrollTo({ top: 3500, behavior: 'smooth' }); 
    if (id === 3) window.scrollTo({ top: 5000, behavior: 'smooth' }); 
  };

  useEffect(() => {
    // 1. SMOOTH SCROLL..
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

    // 2. PHASE 1 ANIMATION (Horizontal)
    const panels = gsap.utils.toArray(".horizontal-panel");
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalContainerRef.current,
        pin: true,
        scrub: 1,
        end: "+=3500", 
        onUpdate: (self) => { if (self.progress < 0.95) setCurrentPhase(1); }
      }
    });

    // 3. PHASE 2 & 3 ANIMATION (Pinned Transition)
    gsap.set(leaderboardContainerRef.current, { yPercent: 150, autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedSectionRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          if (self.progress < 0.1) setCurrentPhase(1);      
          else if (self.progress < 0.5) setCurrentPhase(2); 
          else setCurrentPhase(3);                          
        }
      }
    });

    tl.to({}, { duration: 0.5 }) 
      .addLabel('startTransition')
      // Move Slider to TOP-LEFT
      .to(sliderContainerRef.current, {
        scale: 0.45, top: "15%", left: "10%", xPercent: 0, yPercent: 0, x: 0, y: 0,
        ease: "power2.inOut", duration: 2
      }, 'startTransition')
      // Move Leaderboard to BOTTOM-RIGHT
      .to(leaderboardContainerRef.current, {
        yPercent: 0, autoAlpha: 1, ease: "power2.out", duration: 2
      }, 'startTransition+=0.5'); 

    // Parallax Text
    panels.forEach((panel) => {
      const text = panel.querySelector(".parallax-text");
      if (text) {
        gsap.to(text, {
          x: -150, ease: "none",
          scrollTrigger: {
            trigger: panel, containerAnimation: gsap.getTweensOf(panels)[0], 
            start: "left center", end: "right center", scrub: true,
          }
        });
      }
    });

    return () => { lenis.destroy(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <div className="bg-tt-black text-tt-beige overflow-x-hidden font-sans selection:bg-tt-pink selection:text-tt-black">
      
      {/* STANDARD HEADER (No 3D Card) */}
      <nav className="fixed top-0 w-full px-8 py-6 flex justify-between items-center z-50 mix-blend-difference">
        <div className="text-2xl font-serif font-bold tracking-widest text-tt-pink">TT</div>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-xs font-mono text-tt-olive border border-tt-olive/30 px-3 py-1 rounded-full">
            BETA Protocol
          </span>
        </div>
      </nav>

      {/* NAVIGATOR (Bottom-Left) */}
      <SideNav currentPhase={currentPhase} scrollToSection={scrollToSection} />
      
      {/* ORIGINAL BACKGROUND GRID (Restored) */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, #314021 1px, transparent 1px), linear-gradient(to bottom, #314021 1px, transparent 1px)',
             backgroundSize: '4rem 4rem' 
           }}>
      </div>

      {/* PHASE 1: HORIZONTAL SCROLL */}
      <div ref={horizontalContainerRef} className="h-screen w-full relative overflow-hidden flex flex-nowrap z-10">
        <div className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center justify-center relative border-r border-tt-dark/30">
          <div className="relative z-10 px-10 text-center">
            <h1 className="parallax-text text-[15vw] leading-[0.8] font-serif font-black text-tt-pink mix-blend-hard-light">TOKEN</h1>
            <h1 className="text-[15vw] leading-[0.8] font-serif font-black text-transparent stroke-text opacity-50 -mt-4 md:-mt-8">TEASE</h1>
          </div>
        </div>
        <div className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center justify-center relative border-r border-tt-dark/30 bg-tt-black/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl px-8 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-serif text-tt-beige leading-tight">Watch. <span className="text-tt-pink italic">Unlock.</span> Own.</h2>
              <p className="text-lg opacity-70 max-w-md leading-relaxed font-sans">The first decentralized platform where views are transactions.</p>
            </div>
            <div className="relative aspect-[9/16] h-[60vh] bg-tt-dark/20 rounded-[3rem] border-2 border-tt-pink/10 flex items-center justify-center">
               <div className="w-20 h-20 rounded-full border-2 border-tt-pink/50 flex items-center justify-center"><FaPlay className="ml-2 text-tt-pink text-3xl" /></div>
            </div>
          </div>
        </div>
        <div className="horizontal-panel w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center relative bg-tt-black/90">
          <h2 className="parallax-text text-[12vw] font-serif text-tt-dark absolute top-1/2 -translate-y-1/2 left-0 opacity-10 whitespace-nowrap pointer-events-none">JOIN THE PROTOCOL</h2>
          <div className="z-10 text-center space-y-10 relative">
            <h3 className="text-4xl md:text-6xl font-bold font-serif">Ready to enter?</h3>
            <FaArrowRight className="text-4xl text-tt-pink mx-auto animate-bounce mt-10 rotate-90" />
          </div>
        </div>
      </div>

      {/* PHASE 2 & 3: PINNED SECTION */}
      <section ref={pinnedSectionRef} className="relative h-screen w-full bg-tt-black overflow-hidden border-t border-tt-dark/50">
        
        {/* SLIDER: Starts centered, moves to TOP-LEFT */}
        <div 
          ref={sliderContainerRef} 
          className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-4xl flex flex-col items-center"
        >
            <div className="mb-8 text-center transition-opacity duration-500">
                <span className="text-tt-pink uppercase tracking-[0.3em] text-xs font-bold border border-tt-pink/30 px-4 py-2 rounded-full">Phase II</span>
                <h2 className="text-4xl md:text-6xl font-serif text-tt-beige mt-4">Famous <span className="text-tt-olive italic">Creators</span></h2>
            </div>
            <ThreeDSlider />
        </div>

        {/* LEADERBOARD: Enters at BOTTOM-RIGHT */}
        <div 
          ref={leaderboardContainerRef} 
          className="absolute bottom-10 right-10 z-20 w-full max-w-lg"
        >
            <Leaderboard />
        </div>

      </section>

      {/* Spacer */}
      <div className="h-[50vh] bg-tt-black flex items-center justify-center">
        <p className="text-tt-dark font-serif text-2xl">End of Experience</p>
      </div>

      <style>{`.stroke-text { -webkit-text-stroke: 2px #D8C6BA; }`}</style>
    </div>
  );
}
