import React from 'react';

export default function SideNav({ currentPhase, scrollToSection }) {
  
  // These are the "Chapters" of your page
  const chapters = [
    { id: 1, label: "TOKEN TEASE", roman: "I" },
    { id: 2, label: "THE CREATORS", roman: "II" },
    { id: 3, label: "ROADMAP", roman: "III" },
  ];

  return (
    // Fixed at Bottom-Left (left-8 bottom-10)
    <div className="fixed left-8 bottom-10 z-50 hidden md:flex flex-col gap-2 mix-blend-difference">
      {chapters.map((chapter) => {
        const isActive = currentPhase === chapter.id;
        
        return (
          <div 
            key={chapter.id}
            onClick={() => scrollToSection(chapter.id)}
            className="group flex items-center gap-3 cursor-pointer p-1"
          >
            {/* Roman Numeral (The fixed part) */}
            <span 
              className={`font-serif text-sm transition-all duration-300 w-6 text-right ${
                isActive 
                  ? 'text-tt-beige font-bold' 
                  : 'text-tt-beige/40 group-hover:text-tt-beige'
              }`}
            >
              {chapter.roman}
            </span>

            {/* The Text Label (Slides out like the video) */}
            <span 
              className={`font-sans text-[10px] tracking-widest uppercase text-tt-pink transition-all duration-500 overflow-hidden whitespace-nowrap ${
                isActive 
                  ? 'w-auto opacity-100 translate-x-0' 
                  : 'w-0 opacity-0 -translate-x-2 group-hover:w-auto group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {chapter.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
