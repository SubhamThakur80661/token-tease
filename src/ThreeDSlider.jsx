import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const creators = [
  { id: 1, name: "CryptoKing", handle: "@king_eth", color: "bg-tt-pink" },
  { id: 2, name: "NFT_Queen", handle: "@nft_art", color: "bg-tt-olive" },
  { id: 3, name: "Web3Dev", handle: "@dev_sol", color: "bg-tt-dark" },
  { id: 4, name: "AlphaSeeker", handle: "@alpha_dao", color: "bg-tt-beige" },
  { id: 5, name: "TokenWhale", handle: "@whale_btc", color: "bg-tt-pink" },
  { id: 6, name: "MetaArtist", handle: "@meta_vibe", color: "bg-tt-olive" },
];

export default function ThreeDSlider() {
  const [currDeg, setCurrDeg] = useState(0);

  const rotate = (direction) => {
    setCurrDeg(prev => direction === 'next' ? prev - 60 : prev + 60);
  };

  return (
    <div className="relative w-full h-[600px] flex flex-col items-center justify-center perspective-1000 overflow-hidden">
      
      {/* 3D Container */}
      <div 
        className="relative w-[300px] h-[400px] transform-style-3d transition-transform duration-1000 ease-out"
        style={{ transform: `rotateY(${currDeg}deg)` }}
      >
        {creators.map((creator, index) => {
          // Calculate rotation for each card (6 cards * 60deg = 360deg)
          const rotation = index * 60;
          
          return (
            <div
              key={creator.id}
              className={`absolute inset-0 rounded-2xl border border-white/10 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500
                ${creator.color === 'bg-tt-pink' ? 'bg-tt-pink/20 text-tt-beige' : 'bg-tt-dark/80 text-tt-pink'}
                shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
              style={{
                transform: `rotateY(${rotation}deg) translateZ(350px)`,
                // This ensures cards face outward
                backfaceVisibility: 'visible' 
              }}
            >
              <div className="flex justify-between items-start">
                <FaUserCircle className="text-4xl opacity-80" />
                <span className="text-xs font-mono border border-white/20 px-2 py-1 rounded-full">TOP 1%</span>
              </div>
              
              <div>
                <h3 className="text-2xl font-serif font-bold">{creator.name}</h3>
                <p className="opacity-60 text-sm">{creator.handle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 flex gap-8 z-20">
        <button onClick={() => rotate('prev')} className="px-6 py-2 border border-tt-pink text-tt-pink rounded-full hover:bg-tt-pink hover:text-tt-black transition">
          ← PREV
        </button>
        <button onClick={() => rotate('next')} className="px-6 py-2 bg-tt-pink text-tt-black rounded-full font-bold hover:scale-110 transition">
          NEXT CREATOR →
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}