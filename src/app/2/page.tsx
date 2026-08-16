'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Search,
  Heart,
  Star,
  Eye,
  ArrowRight,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { INITIAL_PRODUCTS, Product } from '@/data/products';
import { ProductQuickView } from '@/components/ProductQuickView';
import { CartDrawer, CartItem } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'figures', label: 'Figures' },
  { id: 'statues', label: 'Statues' },
  { id: 'keychains', label: 'Keychains' },
  { id: 'pops', label: 'Funko Pops' },
  { id: 'stickers', label: 'Stickers' },
];

export default function ModernShop() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeFranchise, setActiveFranchise] = useState<'all' | 'marvel' | 'anime'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((_, i) => i !== index));
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesFranchise = activeFranchise === 'all' || p.franchise === activeFranchise;
        const matchesCategory =
          activeCategory === 'all' ||
          p.category === activeCategory ||
          p.category.includes(activeCategory) ||
          (activeCategory === 'keychains' && p.category.includes('keychain')) ||
          (activeCategory === 'pops' && p.category.includes('pop'));
        const matchesSearch =
          !searchQuery ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFranchise && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, activeFranchise, activeCategory, searchQuery, sortBy]);

  const heroProduct = products.filter((p) => p.isFeatured)[0];
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#111]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ─── TICKER ─── */}
      <div className="bg-[#111] text-white text-[11px] font-semibold tracking-widest uppercase overflow-hidden py-2">
        <div className="flex gap-16 whitespace-nowrap animate-marquee">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-6 shrink-0">
              <span>⚡ Fast Lebanon Delivery</span>
              <span className="text-white/30">·</span>
              <span>🏫 BAU Beirut Pickup</span>
              <span className="text-white/30">·</span>
              <span>✦ Authentic Collectibles</span>
              <span className="text-white/30">·</span>
              <span>🎯 Marvel & Anime Grails</span>
              <span className="text-white/30">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[64px] flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/2" className="text-[#111] font-black text-lg tracking-[-0.02em] hover:text-[#e07b00] transition-colors shrink-0">
            OH MY MARVZ
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-black/40">
            {(['all', 'marvel', 'anime'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFranchise(f)}
                className={`transition-colors hover:text-black capitalize ${activeFranchise === f ? 'text-black font-semibold' : ''}`}
              >
                {f === 'all' ? 'All Collections' : f === 'marvel' ? 'Marvel' : 'Anime'}
              </button>
            ))}
            <Link href="/" className="hover:text-black transition-colors">Classic View</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-black/40 hover:text-black transition-colors rounded-lg hover:bg-black/5"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <button className="relative p-2.5 text-black/40 hover:text-black transition-colors rounded-lg hover:bg-black/5">
              <Heart className="w-[18px] h-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#e07b00] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="ml-1 flex items-center gap-2 bg-[#111] text-white px-4 py-2 rounded-lg font-bold text-[13px] hover:bg-[#e07b00] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-white/15 text-white text-[10px] font-black px-1.5 py-0.5 rounded min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Drawer */}
        {searchOpen && (
          <div className="border-t border-black/[0.06] bg-white px-6 lg:px-10 py-3 flex items-center gap-3">
            <Search className="w-4 h-4 text-black/30 shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[#111] text-sm placeholder:text-black/25 focus:outline-none"
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
              <X className="w-4 h-4 text-black/30 hover:text-black transition-colors" />
            </button>
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      {heroProduct && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 bg-[#e07b00]/10 border border-[#e07b00]/20 text-[#e07b00] text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#e07b00] rounded-full animate-pulse" />
                New Drop
              </div>

              <h1 className="text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-[0.88] tracking-[-0.04em] text-[#111] uppercase">
                CURATED<br />
                <span className="text-[#e07b00]">DROPS.</span>
              </h1>

              <p className="text-[15px] text-black/40 leading-relaxed max-w-md">
                Premium Marvel statues, anime action figures, and limited collectibles — meticulously sourced and delivered across Lebanon.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#catalog"
                  className="bg-[#111] text-white px-7 py-3.5 rounded-xl font-bold text-[13px] uppercase tracking-wide hover:bg-[#e07b00] transition-colors inline-flex items-center gap-2"
                >
                  Shop All Drops <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setQuickViewProduct(heroProduct)}
                  className="border border-black/10 text-black/40 px-6 py-3.5 rounded-xl font-semibold text-[13px] hover:border-black/30 hover:text-black transition-colors bg-white"
                >
                  Quick Preview
                </button>
              </div>

              {/* Trust stats */}
              <div className="flex items-center gap-8 pt-6 border-t border-black/[0.07]">
                <div>
                  <div className="text-xl font-black text-[#111]">100%</div>
                  <div className="text-[11px] text-black/35 uppercase tracking-wider mt-0.5">Authentic</div>
                </div>
                <div className="w-px h-8 bg-black/10" />
                <div>
                  <div className="text-xl font-black text-[#111]">24-48h</div>
                  <div className="text-[11px] text-black/35 uppercase tracking-wider mt-0.5">Lebanon Ship</div>
                </div>
                <div className="w-px h-8 bg-black/10" />
                <div>
                  <div className="text-xl font-black text-[#111]">BAU</div>
                  <div className="text-[11px] text-black/35 uppercase tracking-wider mt-0.5">Pickup Point</div>
                </div>
              </div>
            </div>

            {/* Right: Hero Product Image */}
            <div className="relative group cursor-pointer" onClick={() => setQuickViewProduct(heroProduct)}>
              <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-[0_8px_60px_rgba(0,0,0,0.1)] relative">
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="text-white/60 text-xs font-mono uppercase tracking-widest mb-0.5">{heroProduct.subtitle}</p>
                    <h3 className="text-white font-bold text-lg leading-tight">{heroProduct.name}</h3>
                  </div>
                  <div className="bg-[#e07b00] text-white font-black text-lg px-4 py-2 rounded-xl">
                    ${heroProduct.price.toFixed(0)}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white text-black text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl flex items-center gap-2 shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-4 h-4" /> Quick View
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── CATALOG ─── */}
      <section id="catalog" className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 space-y-6">

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-black/[0.07] py-4 bg-[#f7f7f5]">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#111] text-white shadow-sm'
                    : 'bg-white text-black/50 hover:text-black border border-black/[0.08] hover:border-black/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[12px] text-black/40 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-black/50 hover:text-black focus:outline-none cursor-pointer transition-colors font-semibold uppercase tracking-wide"
            >
              <option value="featured" className="text-black bg-white">Featured</option>
              <option value="price-low" className="text-black bg-white">Price: Low → High</option>
              <option value="price-high" className="text-black bg-white">Price: High → Low</option>
              <option value="rating" className="text-black bg-white">Top Rated</option>
            </select>
            <span className="text-black/20">·</span>
            <span className="text-black/30">{filteredProducts.length} items</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const justAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-black/[0.07] hover:border-black/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.09)] transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-[#f2f2f0]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-106 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isFeatured && (
                      <span className="bg-[#e07b00] text-white text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-lg">
                        Featured
                      </span>
                    )}
                    <span className="bg-white/90 backdrop-blur text-black/50 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-lg">
                      {product.franchise}
                    </span>
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-xl hover:bg-white transition-all shadow-sm"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-black/30 hover:text-black'}`}
                    />
                  </button>

                  {/* Quick View */}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute inset-x-3 bottom-3 py-2.5 bg-[#111] text-white text-[11px] font-bold uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 translate-y-2 group-hover:translate-y-0 shadow-lg"
                  >
                    <Eye className="w-3.5 h-3.5" /> Quick View
                  </button>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div>
                    <p className="text-black/30 text-[10px] font-mono uppercase tracking-widest mb-1">{product.subtitle}</p>
                    <h3 className="text-[#111] text-[13px] font-bold leading-snug line-clamp-2 group-hover:text-[#e07b00] transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 mt-auto">
                    <Star className="w-3.5 h-3.5 text-[#e07b00] fill-[#e07b00]" />
                    <span className="text-black/40 text-[11px] font-medium">{product.rating}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-black/[0.06]">
                    <span className="text-[#111] font-black text-base">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-3.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wide transition-all cursor-pointer ${
                        justAdded
                          ? 'bg-[#e07b00] text-white'
                          : 'bg-[#111] text-white hover:bg-[#e07b00]'
                      }`}
                    >
                      {justAdded ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-black/[0.07] bg-white py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[#111] font-black text-base tracking-[-0.02em]">OH MY MARVZ</div>
            <div className="text-black/30 text-[11px] mt-1">Lebanon's premier collectibles store</div>
          </div>
          <div className="flex items-center gap-6 text-black/30 text-[12px] font-medium">
            <Link href="/" className="hover:text-black transition-colors">Classic View</Link>
            <Link href="/marvel" className="hover:text-black transition-colors">Marvel</Link>
            <Link href="/anime" className="hover:text-black transition-colors">Anime</Link>
            <Link href="/meta" className="hover:text-black transition-colors">Admin</Link>
          </div>
          <div className="text-black/25 text-[11px]">Crafted by Meta Pylon</div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: max-content;
        }
      `}</style>

      <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToCart={handleAddToCart} />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
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
