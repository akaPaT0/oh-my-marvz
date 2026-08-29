'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Zap } from 'lucide-react';

export function ViewSwitcher() {
  const pathname = usePathname();
  const isModern = pathname === '/2';

  return (
    <Link
      href={isModern ? '/' : '/2'}
      className="fixed bottom-6 right-6 z-[90] flex items-center gap-2.5 px-4 py-3 rounded-full font-bold text-[13px] transition-all hover:scale-105 active:scale-95 select-none"
      style={{
        background: isModern ? '#111' : '#fff',
        color: isModern ? '#fff' : '#111',
        boxShadow: isModern
          ? '0 8px 24px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)'
          : '0 8px 24px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
        border: isModern ? 'none' : '1.5px solid rgba(0,0,0,0.08)',
      }}
    >
      {isModern ? (
        <>
          <Zap className="w-4 h-4" />
          <span>Classic View</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          <span>Modern View</span>
        </>
      )}
    </Link>
  );
}
