'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Gamepad2, ShoppingBag, ArrowLeft, ShieldCheck, Zap, Star } from 'lucide-react';

export default function La3eebStorefrontPage() {
  const [cartCount, setCartCount] = useState(0);

  const gamingProducts = [
    {
      id: 'la3-1',
      name: 'La3eeb Apex Pro Wireless Controller',
      subtitle: 'Hall Effect Joysticks & Programmable Back Paddles',
      price: 69.99,
      originalPrice: 89.99,
      image: '/products/tony_stark.png',
      tag: 'BESTSELLER',
    },
    {
      id: 'la3-2',
      name: 'La3eeb Mechanical Hotswap RGB Keyboard',
      subtitle: 'Linear Yellow Switches & PBT Double-shot Keycaps',
      price: 119.00,
      originalPrice: 139.99,
      image: '/products/marvz_cyber_hoodie_1786559934648.jpg',
      tag: 'NEW',
    },
    {
      id: 'la3-3',
      name: 'La3eeb 7.1 Surround Sound eSports Headset',
      subtitle: 'Detachable Noise-Canceling Mic & Memory Foam Earcups',
      price: 89.99,
      originalPrice: 109.99,
      image: '/products/marvz_headphones_1786560048930.jpg',
      tag: 'HOT',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white selection:bg-indigo-600 selection:text-white font-sans">
      
      {/* LA3EEB Header */}
      <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-6 lg:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
              <Gamepad2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight text-white font-mono flex items-center gap-2">
                <span>LA3EEB</span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-sans font-bold">
                  GAMING GEARS
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/meta"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs px-3.5 py-2 rounded-xl border border-zinc-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>META PORTAL</span>
            </Link>

            <button
              onClick={() => setCartCount(cartCount + 1)}
              className="relative bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl transition-transform hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main LA3EEB Storefront Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Gaming Hero Spotlight */}
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-950 via-zinc-900 to-purple-950 border border-zinc-800 p-8 sm:p-12 overflow-hidden shadow-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3.5 py-1 rounded-full text-xs font-mono font-bold">
            <Zap className="w-4 h-4" />
            <span>LEBANON OFFICIAL ESPORTS STORE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            LEVEL UP YOUR GAMING SETUP WITH LA3EEB
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl font-medium">
            High-performance wireless controllers, hotswap RGB mechanical keyboards, and 7.1 surround sound audio gear. Fast delivery across Lebanon & local pickup.
          </p>
        </div>

        {/* Products Grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span>FEATURED GAMING GEARS</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {gamingProducts.map((p) => (
              <div key={p.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-lg hover:border-indigo-500/50 transition-all">
                <div className="space-y-3">
                  <span className="inline-block bg-indigo-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full">
                    {p.tag}
                  </span>
                  <div className="font-extrabold text-base text-white">{p.name}</div>
                  <div className="text-xs text-zinc-400 font-medium">{p.subtitle}</div>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-xl font-extrabold text-emerald-400 font-mono">${p.price.toFixed(2)}</div>
                    <div className="text-xs text-zinc-500 line-through font-mono">${p.originalPrice.toFixed(2)}</div>
                  </div>

                  <button
                    onClick={() => setCartCount(cartCount + 1)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-transform hover:scale-105"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* LA3EEB Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-6 px-4 sm:px-6 lg:px-8 mt-12 text-xs font-mono text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © 2026 LA3EEB Gaming Gears • All Rights Reserved.
          </div>
          <div>
            Crafted by{' '}
            <a
              href="https://meta-pylon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 font-bold hover:underline"
            >
              Meta Pylon
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
