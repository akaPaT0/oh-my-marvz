'use client';

import React from 'react';
import { Star } from 'lucide-react';

export const LettersToEditor: React.FC = () => {
  const reviews = [
    {
      style: 'sticky-note-yellow',
      stars: 5,
      text: '"The packaging was literal art. My statue arrived pristine. Will be ordering my next figure from Marvz for sure!"',
      author: '- COMIC FAN, Beirut',
    },
    {
      style: 'sticky-note-white',
      stars: 5,
      text: '"Picked up my order near BAU. Smooth operation, cool staff! The Zoro Haki statue is insane in person."',
      author: '- SAKAMOTO_COLLECTOR, Tripoli',
    },
    {
      style: 'sticky-note-pink',
      stars: 5,
      text: '"Fast delivery across Lebanon, solid prices for genuine merch. Deadpool keychain pair is top tier!"',
      author: '- MARVELFANATIC99, Saida',
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Centered Title Ribbon */}
      <div className="text-center">
        <div className="comic-ribbon-white px-6 py-2 inline-block">
          <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-black italic">
            COLLECTOR REVIEWS & COMMUNITY FEEDBACK
          </h2>
        </div>
      </div>

      {/* 3 Sticky Note Review Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
        {reviews.map((r, i) => (
          <div key={i} className={`${r.style} p-5 relative flex flex-col justify-between space-y-4`}>
            {/* Thumbtack Pin */}
            <div className="absolute top-2 left-2 thumbtack-pin" />

            <div className="space-y-2 pt-2">
              <div className="flex gap-1 text-red-600">
                {[...Array(r.stars)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-red-600 stroke-none" />
                ))}
              </div>

              <p className="text-xs font-bold text-black italic leading-relaxed">
                {r.text}
              </p>
            </div>

            <div className="text-[11px] font-black text-right uppercase tracking-wider font-mono text-zinc-700">
              {r.author}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
