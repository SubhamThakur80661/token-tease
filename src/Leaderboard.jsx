import React from 'react';

const rankings = [
  { rank: 1, name: "VelvetQueen", value: "154 ETH" },
  { rank: 2, name: "CryptoJade", value: "98 ETH" },
  { rank: 3, name: "NeonVixen", value: "82 ETH" },
  { rank: 4, name: "AlphaDoll", value: "64 ETH" },
  { rank: 5, name: "RoseGold", value: "41 ETH" },
];

export default function Leaderboard() {
  return (
    <div className="w-[300px] flex flex-col gap-3">
      
      {/* Hand-drawn style Header */}
      <h3 className="font-serif text-3xl text-tt-pink mb-4 text-right">
        Leaderboard
      </h3>

      {rankings.map((user) => (
        <div 
          key={user.rank}
          className="flex items-center justify-between bg-tt-dark/40 border border-tt-beige/20 p-4 rounded-lg backdrop-blur-md hover:border-tt-pink hover:bg-tt-pink/10 transition-all cursor-pointer group"
        >
          {/* Circle Number (Like sketch) */}
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono font-bold ${
               user.rank === 1 ? 'border-tt-pink text-tt-pink' : 'border-tt-beige/50 text-tt-beige/50'
            }`}>
              {user.rank}
            </div>
            <span className="font-serif text-lg text-tt-beige group-hover:text-white">
              {user.name}
            </span>
          </div>

          {/* Value */}
          <span className="text-xs font-mono text-tt-olive">
            {user.value}
          </span>
        </div>
      ))}

      {/* Empty Slots (Like sketch) */}
      <div className="h-12 border border-dashed border-tt-dark rounded-lg opacity-30"></div>
      <div className="h-12 border border-dashed border-tt-dark rounded-lg opacity-20"></div>

    </div>
  );
}
