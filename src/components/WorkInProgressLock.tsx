'use client';

import React, { useState, useEffect } from 'react';
import { Lock, ShieldAlert, ArrowRight, Sparkles, Cpu } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Background Meta Pylon Indigo Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Meta Pylon Cyber Mesh Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Lock Card Container (Meta Pylon Theme) */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl shadow-indigo-950/50 backdrop-blur-2xl">
        
        {/* Meta Pylon Branding Header */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 py-1.5 px-4 rounded-full max-w-xs mx-auto">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>META PYLON DIGITAL</span>
        </div>

        {/* Lock Icon Box */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/30">
          <Lock className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            WORK IN PROGRESS
          </h2>

          <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-xs mx-auto">
            Our engineering team at <strong className="text-indigo-400 font-bold">Meta Pylon Digital</strong> is actively building and refining this platform.
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
              className="w-full text-center px-4 py-3 bg-slate-950 border border-indigo-500/30 rounded-2xl text-white font-mono font-extrabold text-sm tracking-widest focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-600"
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-xs font-mono font-bold animate-shake">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-xs py-3.5 px-5 rounded-2xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all hover:scale-102"
          >
            <span>UNLOCK STORE PREVIEW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Crafted by Meta Pylon Digital</span>
        </div>

      </div>

    </div>
  );
}
