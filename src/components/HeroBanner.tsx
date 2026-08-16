'use client';

import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Box,
  Key,
  Sparkles,
  Tag,
  Star,
  Shield,
  Disc,
  Smartphone,
  CircleDot,
} from 'lucide-react';
import { Product } from '@/data/products';

interface HeroBannerProps {
  featuredProducts: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectCategory: (cat: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredProducts,
  onAddToCart,
  onQuickView,
  onSelectCategory,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentProduct = featuredProducts[currentIndex] || featuredProducts[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'figurines', label: 'FIGURINES', icon: Box },
    { id: 'keychains', label: 'KEYCHAINS', icon: Key },
    { id: 'necklaces', label: 'NECKLACES', icon: Sparkles },
    { id: 'stickers', label: 'STICKERS', icon: Tag },
    { id: 'pops', label: 'POPS', icon: Star },
    { id: 'props', label: 'PROPS', icon: Shield },
    { id: 'spinners', label: 'SPINNERS', icon: Disc },
    { id: 'phone-pins', label: 'PHONE PINS', icon: Smartphone },
    { id: '3d-buttons', label: '3D BUTTONS', icon: CircleDot },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto my-4 px-4 sm:px-6 lg:px-8 space-y-3">
      {/* Top Hero Comic Featured Product Banner */}
      <div className="relative w-full bg-white border-3 border-black shadow-[4px_4px_0_#111] overflow-hidden p-6 sm:p-8 lg:p-10">
        {/* Classic Marvel Red & Gold Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 opacity-95" />
        <div className="absolute inset-0 halftone-comic-yellow opacity-30 mix-blend-multiply pointer-events-none" />

        {/* Content Overlay */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Text Info */}
          <div className="md:col-span-7 space-y-4 text-white">
            <div className="flex items-center gap-2">
              <div className="inline-block bg-yellow-300 text-black border-2 border-black px-3 py-1 font-black text-xs uppercase transform -rotate-1 shadow-[2px_2px_0_#111]">
                FEATURED SPOTLIGHT • LIMITED DROPS
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[4px_4px_0_#111] italic leading-none line-clamp-2">
                {currentProduct?.name || 'GEAR 5 AWAKENING'}
              </h1>
              <p className="text-xs sm:text-sm font-extrabold uppercase text-yellow-300 drop-shadow-[2px_2px_0_#111] tracking-wider line-clamp-1">
                {currentProduct?.subtitle || 'Limited Edition Statue Drop & Marvel Gadgets'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => currentProduct && onAddToCart(currentProduct)}
                className="bg-black hover:bg-zinc-900 text-yellow-300 font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3 border-3 border-black shadow-[3px_3px_0_#ffee00] transform hover:-translate-y-0.5 transition-transform flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                <span>SECURE YOURS (${currentProduct?.price.toFixed(0)})</span>
              </button>

              <button
                onClick={() => currentProduct && onQuickView(currentProduct)}
                className="bg-white hover:bg-yellow-200 text-black font-black text-xs uppercase tracking-wider px-4 py-3 border-3 border-black shadow-[3px_3px_0_#111] transition-colors"
              >
                QUICK PEEK
              </button>
            </div>
          </div>

          {/* Right Product Image Showcase */}
          <div className="md:col-span-5 relative flex items-center justify-center">
            {currentProduct?.image && (
              <div
                onClick={() => onQuickView(currentProduct)}
                className="w-48 h-48 sm:w-60 sm:h-60 bg-white border-3 border-black shadow-[4px_4px_0_#111] p-2 cursor-pointer overflow-hidden transform rotate-1 hover:rotate-0 transition-transform"
              >
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* Slider Navigation Arrows */}
            {featuredProducts.length > 1 && (
              <div className="absolute -bottom-4 right-0 flex gap-2 z-20">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0_#111] flex items-center justify-center text-black font-black hover:bg-yellow-300"
                  aria-label="Previous featured item"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[3]" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0_#111] flex items-center justify-center text-black font-black hover:bg-yellow-300"
                  aria-label="Next featured item"
                >
                  <ChevronRight className="w-5 h-5 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Scroll Bar with Lucide Icons (Zero Emojis) */}
      <div className="relative flex items-center w-full gap-2">
        {/* Left Scroll Arrow */}
        <button
          onClick={scrollLeft}
          className="w-9 h-11 bg-white hover:bg-yellow-300 border-3 border-black shadow-[2px_2px_0_#111] flex items-center justify-center text-black font-black flex-shrink-0 z-10 transition-colors"
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Scrollable Categories List */}
        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-2.5 overflow-x-auto scrollbar-none py-1 px-0.5 scroll-smooth"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="bg-white hover:bg-yellow-300 border-3 border-black shadow-[3px_3px_0_#111] py-3 px-4 flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider text-black flex-shrink-0 transition-colors"
              >
                <Icon className="w-4 h-4 text-red-600 stroke-[2.5]" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Scroll Arrow */}
        <button
          onClick={scrollRight}
          className="w-9 h-11 bg-white hover:bg-yellow-300 border-3 border-black shadow-[2px_2px_0_#111] flex items-center justify-center text-black font-black flex-shrink-0 z-10 transition-colors"
          aria-label="Scroll categories right"
        >
          <ChevronRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </section>
  );
};
