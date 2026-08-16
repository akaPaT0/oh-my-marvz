'use client';

import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'Lebanon Delivery & BAU Pickup',
      desc: 'Nationwide shipping across Lebanon and free local pickup near BAU (Beirut).',
    },
    {
      icon: ShieldCheck,
      title: '100% Authentic Quality',
      desc: 'Guaranteed genuine statues, keychains, and Marvel collectibles.',
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns & Exchange',
      desc: 'Hassle-free 30-day exchange policy for guaranteed satisfaction.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Customer Support',
      desc: 'Contact us anytime via WhatsApp or Instagram @oh_my_marvz.',
    },
  ];

  return (
    <section className="my-12 mx-4 sm:mx-6 lg:mx-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 border border-zinc-200 shadow-sm flex flex-col space-y-2"
          >
            <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 text-[#e62429] flex items-center justify-center">
              <f.icon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-zinc-900">{f.title}</h4>
            <p className="text-xs text-zinc-500 font-normal leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
