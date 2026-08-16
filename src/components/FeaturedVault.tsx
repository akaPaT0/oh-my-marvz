'use client';

import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/data/products';

interface FeaturedVaultProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedVault: React.FC<FeaturedVaultProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onViewAll,
}) => {
  return (
    <section className="w-full max-w-6xl mx-auto my-6 px-4 sm:px-6 lg:px-8 space-y-4">
      {/* Yellow Ribbon Header */}
      <div className="flex items-center justify-between">
        <div className="comic-ribbon-yellow px-5 py-2 inline-block transform -rotate-1">
          <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-black italic">
            FEATURED VAULT ITEMS
          </h2>
        </div>

        <button
          onClick={onViewAll}
          className="text-xs font-black uppercase text-black hover:text-red-600 tracking-wider flex items-center gap-1 border-b-2 border-black pb-0.5"
        >
          <span>VIEW ENTIRE ARSENAL</span>
          <span>→</span>
        </button>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
};
