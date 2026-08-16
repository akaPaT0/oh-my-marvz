'use client';

import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, MapPin, ShieldCheck } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      {/* Outer Comic Panel Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-3 border-black shadow-[6px_6px_0_#000] p-6 sm:p-8 space-y-6">
        
        {/* Top Header Ribbon & Close Button */}
        <div className="flex items-center justify-between border-b-3 border-black pb-3">
          <div className="comic-ribbon-yellow px-4 py-1.5 inline-block transform -rotate-1">
            <span className="font-black text-sm uppercase italic text-black tracking-wider">
              ISSUE SPOTLIGHT • PEEK VAULT
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white border-2 border-black shadow-[2px_2px_0_#000] flex items-center justify-center font-black transition-transform hover:scale-105"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Modal Grid Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Product Image Frame */}
          <div className="md:col-span-5 relative w-full aspect-square bg-white border-2 border-black shadow-[4px_4px_0_#000] p-2 flex items-center justify-center overflow-hidden">
            {/* Top Right Red Star Circle Badge */}
            <div className="absolute top-2 right-2 z-10 w-7 h-7 bg-red-600 border-2 border-black rounded-full flex items-center justify-center text-white shadow-[1px_1px_0_#000]">
              <Star className="w-4 h-4 fill-white stroke-none" />
            </div>

            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-zinc-400 font-bold text-xs">NO IMAGE AVAILABLE</div>
            )}
          </div>

          {/* Right Column: Comic Details */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="inline-block bg-black text-yellow-300 border-2 border-black px-2 py-0.5 font-black text-[10px] uppercase tracking-wider mb-1">
                {product.franchise} • {product.category}
              </div>

              <h2 className="text-xl sm:text-2xl font-black uppercase text-black italic tracking-tight leading-snug">
                {product.name}
              </h2>
              
              <p className="text-xs font-bold text-zinc-600 tracking-wide mt-1">
                {product.subtitle}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5 text-red-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-red-600 stroke-none" />
                  ))}
                </div>
                <span className="text-xs font-extrabold text-black uppercase tracking-wide">
                  {product.rating.toFixed(1)} ({product.reviewsCount} REVIEWS)
                </span>
              </div>
            </div>

            {/* Price Box Panel */}
            <div className="flex items-center justify-between p-3 bg-zinc-100 border-2 border-black shadow-[2px_2px_0_#000]">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-red-600 font-mono">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-bold text-zinc-400 line-through font-mono">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="bg-yellow-300 text-black border border-black px-2 py-0.5 font-black text-[10px] uppercase tracking-wider">
                IN STOCK
              </div>
            </div>

            {/* Description Speech Panel */}
            <div className="bg-yellow-50 border-2 border-black p-3 shadow-[2px_2px_0_#000] relative">
              <p className="text-xs font-bold text-black italic leading-relaxed">
                "{product.description}"
              </p>
            </div>

            {/* Specs & Features Card */}
            {product.details && (
              <div className="bg-zinc-50 border-2 border-black p-3 shadow-[2px_2px_0_#000] space-y-2">
                <div className="text-[11px] font-black uppercase text-black italic tracking-wider flex items-center justify-between border-b-2 border-black pb-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                    <span>VERIFIED SPECIFICATIONS</span>
                  </span>
                  <span className="text-[10px] font-bold text-zinc-500 font-mono">MARVZ OFFICIAL</span>
                </div>

                <ul className="text-xs font-bold text-black space-y-1.5 pt-1">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[9px] font-black border border-black flex-shrink-0">
                        ✓
                      </span>
                      <span className="text-zinc-800">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="flex items-center gap-3 pt-2">
              {/* Quantity Selector */}
              <div className="flex items-center bg-yellow-300 border-2 border-black shadow-[2px_2px_0_#000]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 font-black text-black text-sm hover:bg-yellow-400 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-black text-sm font-mono text-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 font-black text-black text-sm hover:bg-yellow-400 flex items-center justify-center"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Action Button */}
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 font-black py-3 px-4 border-3 border-black shadow-[3px_3px_0_#000] text-xs uppercase tracking-wider transition-transform hover:-translate-y-0.5 ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                    <span>ADD TO BAG • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Lebanon Shipping Note */}
            <div className="comic-ribbon-pink p-2 flex items-center gap-2 text-[11px] font-black text-black uppercase">
              <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>NATIONWIDE LEBANON SHIPPING & BAU BEIRUT PICKUP</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
