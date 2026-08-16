'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeCategory?: string;
  setActiveCategory?: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/marvel', label: 'M@RVEL' },
    { href: '/anime', label: 'ANIME' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full pt-4 px-2 sm:px-4 lg:px-6">
      {/* Spider-Man Web Mesh Corner Anchors */}
      <div className="max-w-7xl mx-auto relative">
        
        {/* Left Spider-Man Corner Web Mesh */}
        <div className="absolute -top-4 -left-3 pointer-events-none z-30 hidden lg:block">
          <svg className="w-20 h-20 text-black opacity-90 overflow-visible" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            {/* Radial Spoke Threads */}
            <path d="M 0 0 L 90 10 M 0 0 L 80 40 M 0 0 L 60 70 M 0 0 L 30 85 M 0 0 L 10 90" strokeWidth="2.5" strokeLinecap="round" />
            {/* Concentric Web Concave Arcs */}
            <path d="M 25 3 Q 18 18 3 25" strokeWidth="2" strokeLinecap="round" />
            <path d="M 45 5 Q 32 32 5 45" strokeWidth="2" strokeLinecap="round" />
            <path d="M 65 7 Q 48 48 7 65" strokeWidth="2" strokeLinecap="round" />
            <path d="M 85 9 Q 60 60 9 85" strokeWidth="2.5" strokeLinecap="round" />
            {/* Spider Emblem Pin Accent */}
            <circle cx="85" cy="9" r="3.5" fill="#e62429" stroke="black" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Right Spider-Man Corner Web Mesh */}
        <div className="absolute -top-4 -right-3 pointer-events-none z-30 hidden lg:block">
          <svg className="w-20 h-20 text-black opacity-90 overflow-visible" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            {/* Radial Spoke Threads */}
            <path d="M 100 0 L 10 10 M 100 0 L 20 40 M 100 0 L 40 70 M 100 0 L 70 85 M 100 0 L 90 90" strokeWidth="2.5" strokeLinecap="round" />
            {/* Concentric Web Concave Arcs */}
            <path d="M 75 3 Q 82 18 97 25" strokeWidth="2" strokeLinecap="round" />
            <path d="M 55 5 Q 68 32 95 45" strokeWidth="2" strokeLinecap="round" />
            <path d="M 35 7 Q 52 48 93 65" strokeWidth="2" strokeLinecap="round" />
            <path d="M 15 9 Q 40 60 91 85" strokeWidth="2.5" strokeLinecap="round" />
            {/* Spider Emblem Pin Accent */}
            <circle cx="15" cy="9" r="3.5" fill="#e62429" stroke="black" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Boxed centered nav container */}
        <div className="relative z-20 bg-white border-3 border-black shadow-[4px_4px_0_#111] px-4 py-3 flex items-center justify-between">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-black hover:text-red-600"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
            </button>

            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="OH MY MARVZ"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <span className="text-[9px] font-black text-black font-mono hidden sm:inline-block border-2 border-black bg-yellow-300 px-2 py-0.5 shadow-[2px_2px_0_#000]">
                LEBANON
              </span>
            </Link>
          </div>

          {/* Center: Sleek Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-black uppercase tracking-wider">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-1 transition-colors ${
                    isActive
                      ? 'text-red-600 font-black border-b-3 border-red-600'
                      : 'text-black hover:text-red-600 font-extrabold'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Direct Action Icons */}
          <div className="flex items-center gap-4">
            {/* Cart Icon Button */}
            <button
              onClick={onOpenCart}
              className="relative text-black hover:text-red-600 transition-colors p-1"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-7 h-7 stroke-[2.5]" />
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white rounded-full text-[10px] font-black w-5 h-5 flex items-center justify-center border-2 border-black shadow-[1px_1px_0_#000]">
                {cartCount}
              </span>
            </button>

            {/* Admin Dashboard Profile Button */}
            <Link
              href="/admin"
              className="text-black hover:text-red-600 transition-colors p-1"
              aria-label="Admin Dashboard"
              title="Admin Dashboard"
            >
              <User className="w-7 h-7 stroke-[2.5]" />
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="max-w-7xl mx-auto mt-2 bg-white border-3 border-black shadow-[4px_4px_0_#111] p-4 space-y-3 text-xs font-black uppercase relative z-30">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left p-3 border-2 border-black ${
                  isActive ? 'bg-red-600 text-white' : 'bg-yellow-200 text-black'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
