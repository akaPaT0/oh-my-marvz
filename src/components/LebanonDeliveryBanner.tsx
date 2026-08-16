'use client';

import React from 'react';

export const LebanonDeliveryBanner: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto my-6 px-4 sm:px-6 lg:px-8">
      <div className="comic-ribbon-pink halftone-comic-pink p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Left Info */}
        <div className="space-y-2 text-black">
          <div className="inline-block bg-black text-yellow-300 border-2 border-black px-2.5 py-0.5 font-black text-[10px] uppercase tracking-wider">
            QUINJET EXPRESS DROPS!
          </div>

          <h3 className="text-xl sm:text-2xl font-black uppercase text-black italic tracking-tight leading-none">
            FAST LEBANON DELIVERY & BAU BEIRUT PICKUP!
          </h3>

          <p className="text-xs font-bold text-zinc-700 max-w-lg font-mono">
            Fast 24-48h nationwide shipping or pickup near BAU Beirut.
          </p>
        </div>

        {/* Right Circle Badge: Stylized Avengers Quinjet Express Delivery */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-yellow-300 border-3 border-black rounded-full flex items-center justify-center text-black shadow-[4px_4px_0_#111] flex-shrink-0 relative overflow-hidden group">
          {/* Continuous Spinning Quinjet Icon */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[2px_2px_0_#000]">
              {/* Blue Jet Plasma Thruster Trail */}
              <path
                d="M 12 56 L 2 52 L 12 48 Z"
                fill="#00e5ff"
                stroke="#000"
                strokeWidth="1.5"
                className="animate-pulse"
              />
              <path
                d="M 18 50 L 8 50"
                stroke="#ffee00"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-pulse"
              />

              {/* Main Quinjet Fuselage Body */}
              <path
                d="M 92 50 C 75 35, 45 36, 22 42 L 15 48 L 15 52 L 22 58 C 45 64, 75 65, 92 50 Z"
                fill="#2d3748"
                stroke="#000"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* Cockpit Glass Canopy */}
              <path
                d="M 90 50 C 80 41, 65 40, 52 42 C 60 49, 60 51, 52 58 C 65 60, 80 59, 90 50 Z"
                fill="#00f0ff"
                stroke="#000"
                strokeWidth="2.5"
              />
              <path d="M 72 43 L 72 57 M 80 46 L 80 54" stroke="#000" strokeWidth="1.5" />

              {/* Swept-Back Stealth Left & Right Wings */}
              <path
                d="M 62 41 L 32 12 L 18 16 L 38 42 Z"
                fill="#4a5568"
                stroke="#000"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M 62 59 L 32 88 L 18 84 L 38 58 Z"
                fill="#4a5568"
                stroke="#000"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* Red Avengers Wing Stripe Accent */}
              <path d="M 46 25 L 34 14 L 28 15 L 40 28 Z" fill="#e62429" stroke="#000" strokeWidth="1.5" />
              <path d="M 46 75 L 34 86 L 28 85 L 40 72 Z" fill="#e62429" stroke="#000" strokeWidth="1.5" />

              {/* Rear Twin Tail Stabilizers */}
              <path d="M 22 42 L 14 30 L 25 38 Z" fill="#e62429" stroke="#000" strokeWidth="2" />
              <path d="M 22 58 L 14 70 L 25 62 Z" fill="#e62429" stroke="#000" strokeWidth="2" />

              {/* Central Panel Linings */}
              <path d="M 45 44 L 28 44 M 45 56 L 28 56" stroke="#e62429" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
