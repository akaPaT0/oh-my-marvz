'use client';

import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, Sparkles, Cpu, ShieldCheck } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0F18]/95 backdrop-blur-2xl animate-in fade-in font-sans selection:bg-[#2DD4BF] selection:text-[#0A0F18]">
      
      {/* Background Meta Pylon Teal Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Meta Pylon Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#2DD4BF_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* Lock Card Container (Meta Pylon Official #0A0F18 + #2DD4BF Teal Palette) */}
      <div className="relative z-10 w-full max-w-md bg-[#0E1524] border border-[#2DD4BF]/30 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        
        {/* Meta Pylon Official Header Badge */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono font-extrabold text-[#2DD4BF] uppercase tracking-widest bg-[#2DD4BF]/10 border border-[#2DD4BF]/25 py-1.5 px-4 rounded-full max-w-xs mx-auto">
          <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
          <span>META PYLON</span>
        </div>

        {/* Lock Icon Box with Official Teal Core Glow */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#2DD4BF]/10 border-2 border-[#2DD4BF] text-[#2DD4BF] flex items-center justify-center shadow-[0_0_25px_rgba(45,212,191,0.25)]">
          <Lock className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F1F5F9] tracking-tight">
            WORK IN PROGRESS
          </h2>

          <p className="text-xs text-[#94A3B8] font-medium leading-relaxed max-w-xs mx-auto">
            Our engineering team at <strong className="text-[#2DD4BF] font-bold">Meta Pylon</strong> is actively building and refining this platform.
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
              className="w-full text-center px-4 py-3 bg-[#0A0F18] border border-[#2DD4BF]/30 rounded-2xl text-[#F1F5F9] font-mono font-extrabold text-sm tracking-widest focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 transition-all placeholder:text-[#94A3B8]/40"
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
            className="w-full bg-[#2DD4BF] hover:bg-white text-[#0A0F18] font-extrabold text-xs py-3.5 px-5 rounded-2xl shadow-lg shadow-[#2DD4BF]/20 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer"
          >
            <span>UNLOCK STORE PREVIEW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-[#94A3B8] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
          <span>Crafted by Meta Pylon</span>
        </div>

      </div>

    </div>
  );
}
