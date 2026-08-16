'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

export function WorkInProgressLock() {
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [passcode, setPasscode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    // Check if site has already been unlocked in this session
    const unlocked = sessionStorage.getItem('marvz_preview_unlocked');
    if (unlocked === 'true') {
      setIsLocked(false);
    }
    setIsChecking(false);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === '686868') {
      sessionStorage.setItem('marvz_preview_unlocked', 'true');
      setIsLocked(false);
      setError('');
    } else {
      setError('Invalid access passcode. Please enter valid key.');
      setPasscode('');
    }
  };

  if (isChecking || !isLocked) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-xl animate-in fade-in font-sans selection:bg-red-600 selection:text-white">
      
      {/* Background Subtle Red Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* SPIDER-MAN CORNER WEBS (DESKTOP) */}
      <div className="hidden md:block pointer-events-none">
        <div className="absolute top-0 left-0 w-44 h-44 opacity-25 text-red-600">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[1.5]">
            <path d="M 0 0 L 100 0 L 0 100 Z" fill="none" />
            <path d="M 0 0 L 100 100 M 0 0 L 70 100 M 0 0 L 100 70 M 0 0 L 35 100 M 0 0 L 100 35" />
            <path d="M 20 0 Q 15 15 0 20 M 40 0 Q 30 30 0 40 M 60 0 Q 45 45 0 60 M 80 0 Q 60 60 0 80 M 100 0 Q 75 75 0 100" />
            <circle cx="20" cy="20" r="2" fill="currentColor" />
            <circle cx="40" cy="40" r="2" fill="currentColor" />
            <circle cx="60" cy="60" r="2" fill="currentColor" />
          </svg>
        </div>

        <div className="absolute top-0 right-0 w-44 h-44 opacity-25 text-red-600">
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

      {/* Lock Card Container */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl backdrop-blur-2xl">
        
        {/* Animated Icon Header */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-600/10 border border-red-600/20 text-red-500 flex items-center justify-center shadow-lg shadow-red-600/10">
          <Lock className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-3.5 py-1 rounded-full text-xs font-mono font-extrabold uppercase">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>WORK IN PROGRESS • PRIVATE PREVIEW</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            SITE UNDER DEVELOPMENT
          </h2>

          <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-xs mx-auto">
            This e-commerce store is currently undergoing final quality inspection. Enter your VIP access passcode to preview.
          </p>
        </div>

        {/* Passcode Form */}
        <form onSubmit={handleUnlock} className="space-y-3 pt-2">
          <div className="space-y-1">
            <input
              type="password"
              placeholder="ENTER PASSCODE (e.g. 686868)"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError('');
              }}
              className="w-full text-center px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-white font-mono font-extrabold text-sm tracking-widest focus:outline-none focus:border-red-600 transition-all placeholder:text-zinc-600"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs font-mono font-bold animate-shake">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-3.5 px-5 rounded-2xl shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 transition-all hover:scale-102"
          >
            <span>UNLOCK STORE PREVIEW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-[10px] font-mono text-zinc-500 font-bold">
          OH MY MARVZ & LA3EEB • PRIVATE PREVIEW BUILD
        </div>

      </div>

    </div>
  );
}
