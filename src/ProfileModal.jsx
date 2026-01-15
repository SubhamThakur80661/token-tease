import React from 'react';
import { FaTimes, FaLock, FaPlay } from 'react-icons/fa';

export default function ProfileModal({ creator, onClose }) {
  if (!creator) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* The Glass Card */}
      <div className="relative w-full max-w-lg bg-tt-dark/40 border border-tt-pink/30 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(192,155,172,0.2)] animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-tt-pink hover:text-black transition-colors"
        >
          <FaTimes />
        </button>

        {/* 1. The Header (Creator Info) */}
        <div className="relative z-10 p-8 pb-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-tt-pink bg-tt-dark flex items-center justify-center text-2xl">
              {creator.name[0]}
            </div>
            <div>
              <h2 className="text-3xl font-serif text-white">{creator.name}</h2>
              <p className="text-tt-pink font-mono text-sm">{creator.handle}</p>
            </div>
          </div>
        </div>

        {/* 2. The "Tease" Content (Blurred Video Placeholder) */}
        <div className="relative h-64 bg-tt-black group">
           {/* The Blurred Background */}
           <div className="absolute inset-0 bg-gradient-to-tr from-tt-olive/20 to-tt-pink/20 blur-xl opacity-50"></div>
           
           {/* The Lock UI */}
           <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                 <FaLock className="text-2xl text-tt-pink" />
              </div>
              <p className="text-tt-beige font-serif italic opacity-80">
                Premium Content Locked
              </p>
           </div>
        </div>

        {/* 3. The Footer (Payment Action) */}
        <div className="p-8 bg-black/90 border-t border-white/10 text-center">
           <div className="flex justify-between items-center mb-6 text-sm font-mono text-tt-olive">
              <span>EXCLUSIVE ACCESS</span>
              <span>1 VIDEO + 3 PHOTOS</span>
           </div>
           
           <button className="w-full py-4 bg-tt-pink text-black font-bold text-lg rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(192,155,172,0.4)] flex items-center justify-center gap-3">
              <span>UNLOCK FOR</span>
              <span className="bg-black/20 px-2 py-1 rounded text-sm">500 TT</span>
           </button>
           
           <p className="mt-4 text-xs text-white/30">
             Wallet Balance: 0 TT (Connect Wallet)
           </p>
        </div>

      </div>
    </div>
  );
}
