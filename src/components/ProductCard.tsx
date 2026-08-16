'use client';

import React from 'react';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  return (
    <div className="bg-white border-3 border-black shadow-[4px_4px_0_#000] p-3 flex flex-col justify-between relative group hover:-translate-y-1 transition-transform">
      {/* Top Image Container Frame */}
      <div className="relative w-full aspect-square bg-white border-2 border-black flex items-center justify-center p-1 overflow-hidden">
        {/* Top Right Red Star Circle Badge */}
        <div className="absolute top-1 right-1 z-10 w-6 h-6 bg-red-600 border-2 border-black rounded-full flex items-center justify-center text-white shadow-[1px_1px_0_#000]">
          <Star className="w-3.5 h-3.5 fill-white stroke-none" />
        </div>

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain cursor-pointer group-hover:scale-105 transition-transform duration-200"
            onClick={() => onQuickView(product)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold text-xs">
            NO IMAGE
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-3">
          <button
            onClick={() => onQuickView(product)}
            className="flex items-center gap-1 bg-yellow-300 text-black font-black px-3 py-1 text-xs border-2 border-black shadow-[2px_2px_0_#000] hover:bg-white uppercase tracking-wider"
          >
            <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>PEEK</span>
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-2 flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => onQuickView(product)}
            className="font-black italic text-xs uppercase text-black line-clamp-1 tracking-wide cursor-pointer hover:text-red-600"
          >
            {product.name}
          </h3>
          <p className="text-[10px] font-mono font-bold text-zinc-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Solid Black Horizontal Separator */}
        <div className="border-b-2 border-black my-2" />

        {/* Price Left & Blue Cart Button Right */}
        <div className="flex items-center justify-between">
          <span className="font-black text-sm text-red-600 font-mono">
            ${product.price.toFixed(0)}
          </span>

          <button
            onClick={() => onAddToCart(product)}
            className="w-7 h-7 bg-blue-600 hover:bg-blue-700 text-white border-2 border-black shadow-[2px_2px_0_#000] flex items-center justify-center transition-colors"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
