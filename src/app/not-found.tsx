'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Compass, ShoppingBag, ShieldAlert, ArrowLeft, Sparkles, Building2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-6 relative overflow-hidden font-sans selection:bg-red-600 selection:text-white">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* SPIDER-MAN CORNER WEBS (PC DESKTOP ENHANCEMENT) */}
      <div className="hidden md:block pointer-events-none">
        {/* Top-Left Web */}
        <div className="absolute top-0 left-0 w-48 h-48 opacity-30 text-red-600">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[1.5]">
            <path d="M 0 0 L 100 0 L 0 100 Z" fill="none" />
            <path d="M 0 0 L 100 100 M 0 0 L 70 100 M 0 0 L 100 70 M 0 0 L 35 100 M 0 0 L 100 35" />
            <path d="M 20 0 Q 15 15 0 20 M 40 0 Q 30 30 0 40 M 60 0 Q 45 45 0 60 M 80 0 Q 60 60 0 80 M 100 0 Q 75 75 0 100" />
            <circle cx="20" cy="20" r="2" fill="currentColor" />
            <circle cx="40" cy="40" r="2" fill="currentColor" />
            <circle cx="60" cy="60" r="2" fill="currentColor" />
          </svg>
        </div>

        {/* Top-Right Web */}
        <div className="absolute top-0 right-0 w-48 h-48 opacity-30 text-red-600">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[1.5]">
            <path d="M 100 0 L 0 0 L 100 100 Z" fill="none" />
            <path d="M 100 0 L 0 100 M 100 0 L 30 100 M 100 0 L 0 70 M 100 0 L 65 100 M 100 0 L 0 35" />
            <path d="M 80 0 Q 85 15 100 20 M 60 0 Q 70 30 100 40 M 40 0 Q 55 45 100 60 M 20 0 Q 40 60 100 80 M 0 0 Q 25 75 100 100" />
            <circle cx="80" cy="20" r="2" fill="currentColor" />
            <circle cx="60" cy="40" r="2" fill="currentColor" />
            <circle cx="40" cy="60" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-xl w-full bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
        
        {/* Badge & Icon */}
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-xs font-mono font-extrabold uppercase">
          <ShieldAlert className="w-4 h-4" />
          <span>404 ERROR • MULTIVERSE MISMATCH</span>
        </div>

        {/* Big 404 Headline */}
        <div className="space-y-2">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-white font-mono bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            THIS PAGE DOES NOT EXIST IN OUR UNIVERSE
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium max-w-md mx-auto leading-relaxed">
            The secret route or collectible item you are looking for has been teleported to another dimension or never existed.
          </p>
        </div>

        {/* Quick Route Actions */}
        <div className="pt-4 border-t border-zinc-800/80 space-y-3">
          <Link
            href="/"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-3.5 px-6 rounded-2xl shadow-lg shadow-red-600/20 flex items-center justify-center gap-2.5 transition-all hover:scale-102"
          >
            <Home className="w-4 h-4" />
            <span>RETURN TO OH MY MARVZ HOMEPAGE</span>
          </Link>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Link
              href="/marvel"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs py-3 px-4 rounded-xl border border-zinc-700/80 flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>MARVEL STORE</span>
            </Link>

            <Link
              href="/anime"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs py-3 px-4 rounded-xl border border-zinc-700/80 flex items-center justify-center gap-2 transition-colors"
            >
              <Compass className="w-4 h-4 text-purple-400" />
              <span>ANIME STORE</span>
            </Link>
          </div>
        </div>

        {/* Discreet Portal Link */}
        <div className="pt-2">
          <Link
            href="/meta"
            className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 font-bold transition-colors inline-flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>ENTERPRISE META PORTAL</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
