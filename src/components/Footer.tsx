'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Camera } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white border-t-4 border-red-600 mt-12 pt-10 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Main 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Brand Profile */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-12 border-2 border-white shadow-[2px_2px_0_#fff] bg-white p-1.5 flex items-center justify-center">
                <img src="/logo.png" alt="OH MY MARVZ" className="h-full object-contain" />
              </div>
              <span className="text-[10px] font-bold text-yellow-400 tracking-widest font-mono">
                ALL M@RVEL GADGETS YOUR HEART DESIRES
              </span>
            </div>

            <p className="text-xs font-mono text-zinc-400 leading-relaxed max-w-md">
              Based in Lebanon. Official shop for Marvel action figures, statues, metal keychains, 3D rubber straps, and vinyl sticker packs. 
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs font-mono text-yellow-400">
              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>BAU Beirut Pickup & 24-48h Nationwide Lebanon Delivery</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-black uppercase text-yellow-400 italic tracking-wider">
              MULTIVERSE VAULTS
            </h4>
            <ul className="space-y-2 text-xs font-bold text-zinc-300 uppercase">
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors flex items-center gap-1.5">
                  <span className="text-red-600">►</span>
                  <span>HOME CATALOG</span>
                </Link>
              </li>
              <li>
                <Link href="/marvel" className="hover:text-red-500 transition-colors flex items-center gap-1.5">
                  <span className="text-red-600">►</span>
                  <span>M@RVEL UNIVERSE</span>
                </Link>
              </li>
              <li>
                <Link href="/anime" className="hover:text-red-500 transition-colors flex items-center gap-1.5">
                  <span className="text-red-600">►</span>
                  <span>ANIME GRAILS</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social & Official Connect */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-black uppercase text-yellow-400 italic tracking-wider">
              CONNECT WITH US
            </h4>
            
            <div className="space-y-2 text-xs">
              <a
                href="https://instagram.com/oh_my_marvz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-red-600 hover:bg-red-700 text-white font-black uppercase flex items-center justify-center gap-2 border-2 border-white shadow-[2px_2px_0_#fff] transition-transform hover:-translate-y-0.5 text-xs tracking-wider"
              >
                <Camera className="w-4 h-4" />
                <span>FOLLOW @OH_MY_MARVZ ON INSTAGRAM</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Excelsior Copyright & Meta Pylon Agency Credit */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-0.5">
            <span className="font-black text-yellow-400 text-sm uppercase italic tracking-widest block">
              EXCELSIOR!
            </span>
            <p className="text-[11px] font-mono text-zinc-500">
              Action Portal • Powered by <strong className="text-white">Oh my Marvz</strong> • Vol. 1 No. 2026
            </p>
          </div>

          <div className="text-xs font-extrabold text-zinc-400">
            Crafted by{' '}
            <a
              href="https://meta-pylon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-white underline font-black tracking-wider transition-colors"
            >
              Meta Pylon
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
