'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { FeaturedVault } from '@/components/FeaturedVault';
import { LebanonDeliveryBanner } from '@/components/LebanonDeliveryBanner';
import { LettersToEditor } from '@/components/LettersToEditor';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductQuickView } from '@/components/ProductQuickView';
import { CartDrawer, CartItem } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { INITIAL_PRODUCTS, Product } from '@/data/products';
import { ArrowUpDown, ShieldAlert, Sparkles } from 'lucide-react';

export default function MarvelPage() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('rating');
  
  // Cart & Modal State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const marvelProducts = useMemo(() => {
    return products.filter((p) => p.franchise === 'marvel');
  }, [products]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const filteredProducts = useMemo(() => {
    return marvelProducts
      .filter((p) => {
        const matchesCategory =
          activeCategory === 'all' ||
          p.category === activeCategory ||
          p.category.includes(activeCategory) ||
          (activeCategory === 'keychains' && p.category.includes('keychain')) ||
          (activeCategory === 'pops' && p.category.includes('pop'));
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [marvelProducts, activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#eef0f2] text-black selection:bg-red-600 selection:text-white">
      {/* Header */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Main Container */}
      <main className="flex-1 w-full space-y-4">
        {/* Marvel Hero Banner */}
        <section className="w-full max-w-6xl mx-auto my-4 px-4 sm:px-6 lg:px-8">
          <div className="relative w-full bg-white border-3 border-black shadow-[4px_4px_0_#111] overflow-hidden p-6 sm:p-10">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 opacity-95" />
            <div className="absolute inset-0 halftone-comic-yellow opacity-30 mix-blend-multiply pointer-events-none" />

            <div className="relative z-10 space-y-3 text-white">
              <div className="inline-block bg-yellow-300 text-black border-2 border-black px-3 py-1 font-black text-xs uppercase transform -rotate-1 shadow-[2px_2px_0_#111]">
                OFFICIAL MARVEL COLLECTION
              </div>

              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[4px_4px_0_#111] italic leading-none">
                MARVEL FIGURES & GADGETS
              </h1>

              <p className="text-xs sm:text-sm font-extrabold uppercase text-yellow-300 drop-shadow-[2px_2px_0_#111] tracking-wider">
                IRON MAN • SPIDER-MAN • THOR • DEADPOOL • WOLVERINE • AVENGERS
              </p>
            </div>
          </div>
        </section>



        {/* Delivery Banner */}
        <LebanonDeliveryBanner />

        {/* Catalog Grid */}
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 border-black pb-3">
            <div className="comic-ribbon-yellow px-4 py-1.5 inline-block transform -rotate-1">
              <h2 className="text-base sm:text-lg font-black uppercase text-black italic">
                ALL MARVEL PRODUCTS ({filteredProducts.length})
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex items-center bg-white border-2 border-black px-3 py-1 text-xs font-black shadow-[2px_2px_0_#111]">
                <ArrowUpDown className="w-3.5 h-3.5 text-black mr-1" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-black text-black focus:outline-none cursor-pointer uppercase font-mono"
                >
                  <option value="featured">SORT: FEATURED</option>
                  <option value="price-low">PRICE: LOW TO HIGH</option>
                  <option value="price-high">PRICE: HIGH TO LOW</option>
                  <option value="rating">HIGHEST RATED</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </section>

        <LettersToEditor />
      </main>

      <Footer />

      {/* Modals & Drawers */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
