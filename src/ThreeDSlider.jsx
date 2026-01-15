import React, { useState } from 'react';
import { FaUserCircle, FaCrown } from 'react-icons/fa';

const creators = [
  { id: 1, name: "VelvetQueen", handle: "@velvet_eth", role: "Model", color: "bg-tt-pink" },
  { id: 2, name: "CryptoJade", handle: "@jade_sol", role: "Artist", color: "bg-tt-olive" },
  { id: 3, name: "NeonVixen", handle: "@neon_dao", role: "Dancer", color: "bg-tt-dark" },
  { id: 4, name: "AlphaDoll", handle: "@alpha_btc", role: "Gamer", color: "bg-tt-beige" },
  { id: 5, name: "RoseGold", handle: "@rose_nft", role: "Vlog", color: "bg-tt-pink" },
  { id: 6, name: "DarkAura", handle: "@aura_web3", role: "Music", color: "bg-tt-olive" },
];

export default function ThreeDSlider() {
  const [currDeg, setCurrDeg] = useState(0);

  // Rotate 60 degrees because 360 / 6 items = 60
  const rotate = (direction) => {
    setCurrDeg(prev => direction === 'next' ? prev - 60 : prev + 60);
  };

  // Calculate which index is currently in front to highlight it
  // The math ensures we handle negative rotations correctly
  const activeIndex = (Math.abs(Math.round(currDeg / 60)) % 6);
  // Note: Simple logic to highlight the card facing front (roughly)

  return (
    <div className="relative w-full h-[600px] flex flex-col items-center justify-center perspective-1000 overflow-visible">
      
      {/* 3D Cylinder Container */}
      <div 
        className="relative w-[280px] h-[400px] transform-style-3d transition-transform duration-1000 ease-out"
        style={{ transform: `rotateY(${currDeg}deg)` }}
      >
        {creators.map((creator, index) => {
          // 6 cards * 60deg = 360deg circle
          const rotation = index * 60;
          
          return (
            <div
              key={creator.id}
              className={`absolute inset-0 rounded-2xl border backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-500
                ${creator.color === 'bg-tt-pink' ? 'border-tt-pink/30 bg-tt-pink/10' : 'border-tt-olive/30 bg-tt-black/60'}
                group hover:border-tt-pink hover:shadow-[0_0_50px_rgba(192,155,172,0.2)]`}
              style={{
                // translateZ(350px) pushes the cards out from the center to make the circle width
                transform: `rotateY(${rotation}deg) translateZ(350px)`,
                backfaceVisibility: 'visible' 
              }}
            >
              {/* Card Content */}
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-tt-dark to-tt-pink flex items-center justify-center">
                    <FaUserCircle className="text-3xl text-tt-beige" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono border border-tt-beige/20 px-2 py-1 rounded-full text-tt-beige">
                    <FaCrown className="text-yellow-500" /> TOP 1%
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs font-mono text-tt-pink uppercase tracking-widest">{creator.role}</div>
                <h3 className="text-3xl font-serif font-bold text-white leading-none">{creator.name}</h3>
                <p className="opacity-60 text-sm font-mono text-tt-olive">{creator.handle}</p>
              </div>

              {/* Glossy Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="absolute -bottom-10 flex gap-12 z-20">
        <button 
            onClick={() => rotate('prev')} 
            className="text-tt-pink font-mono text-sm tracking-[0.2em] hover:text-white transition-colors">
            PREV
        </button>
        <div className="w-[1px] h-5 bg-tt-dark"></div>
        <button 
            onClick={() => rotate('next')} 
            className="text-tt-pink font-mono text-sm tracking-[0.2em] hover:text-white transition-colors">
            NEXT
        </button>
      </div>

      {/* Required CSS for 3D to work */}
      <style>{`
        .perspective-1000 { perspective: 1200px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}
