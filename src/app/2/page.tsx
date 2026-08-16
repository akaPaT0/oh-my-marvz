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
  Truck,
  ChevronDown,
  X,
  SlidersHorizontal,
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

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 1);
  const heroProduct = featuredProducts[0];
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* ─── TICKER ANNOUNCEMENT ─── */}
      <div className="bg-[#f0a500] text-black text-[11px] font-bold tracking-wider uppercase overflow-hidden py-2">
        <div className="flex gap-16 whitespace-nowrap animate-marquee items-center">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-6 shrink-0">
              <span>⚡ Fast Lebanon Delivery</span>
              <span className="text-black/40">·</span>
              <span>🏫 BAU Beirut Pickup</span>
              <span className="text-black/40">·</span>
              <span>✦ Authentic Collectibles Only</span>
              <span className="text-black/40">·</span>
              <span>🎯 Marvel & Anime Grails</span>
              <span className="text-black/40">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-[#0c0c0c]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[64px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/2" className="text-white font-black text-lg tracking-[-0.02em] hover:text-[#f0a500] transition-colors">
            OH MY MARVZ
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-white/50">
            <button
              onClick={() => setActiveFranchise('all')}
              className={`transition-colors hover:text-white ${activeFranchise === 'all' ? 'text-white' : ''}`}
            >
              All Collections
            </button>
            <button
              onClick={() => setActiveFranchise('marvel')}
              className={`transition-colors hover:text-white ${activeFranchise === 'marvel' ? 'text-white' : ''}`}
            >
              Marvel
            </button>
            <button
              onClick={() => setActiveFranchise('anime')}
              className={`transition-colors hover:text-white ${activeFranchise === 'anime' ? 'text-white' : ''}`}
            >
              Anime
            </button>
            <Link href="/" className="transition-colors hover:text-white">
              Classic View
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <button
              className="relative p-2.5 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <Heart className="w-[18px] h-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#f0a500] text-black text-[9px] font-black rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative ml-1 flex items-center gap-2.5 bg-white text-black px-4 py-2 rounded-lg font-bold text-[13px] hover:bg-[#f0a500] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-black text-white text-[10px] font-black px-1.5 py-0.5 rounded min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expanding Search Bar */}
        {searchOpen && (
          <div className="border-t border-white/[0.06] bg-[#0c0c0c] px-6 lg:px-10 py-3 flex items-center gap-3">
            <Search className="w-4 h-4 text-white/30 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none"
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="text-white/30 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      {heroProduct && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left Copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#f0a500]/10 border border-[#f0a500]/20 text-[#f0a500] text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#f0a500] rounded-full animate-pulse" />
                New Drop
              </div>

              <h1
                className="text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.04em] text-white uppercase"
              >
                CURATED<br />
                <span className="text-[#f0a500]">DROPS.</span>
              </h1>

              <p className="text-[15px] text-white/40 leading-relaxed max-w-md font-normal">
                Premium Marvel statues, anime action figures, and limited collectibles — meticulously sourced and delivered across Lebanon.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#catalog"
                  className="bg-white text-black px-7 py-3.5 rounded-lg font-bold text-[13px] uppercase tracking-wide hover:bg-[#f0a500] transition-colors inline-flex items-center gap-2"
                >
                  Shop All Drops
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setQuickViewProduct(heroProduct)}
                  className="border border-white/10 text-white/50 px-6 py-3.5 rounded-lg font-semibold text-[13px] hover:border-white/30 hover:text-white transition-colors"
                >
                  Quick View Feature
                </button>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-8 pt-6 border-t border-white/[0.06]">
                <div>
                  <div className="text-xl font-black text-white">100%</div>
                  <div className="text-[11px] text-white/30 uppercase tracking-wider mt-0.5">Authentic</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <div className="text-xl font-black text-white">24-48h</div>
                  <div className="text-[11px] text-white/30 uppercase tracking-wider mt-0.5">Lebanon Ship</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <div className="text-xl font-black text-white">BAU</div>
                  <div className="text-[11px] text-white/30 uppercase tracking-wider mt-0.5">Pickup Point</div>
                </div>
              </div>
            </div>

            {/* Right: Hero Product */}
            <div className="relative group cursor-pointer" onClick={() => setQuickViewProduct(heroProduct)}>
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#161616] relative">
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Product Info inside image */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/50 text-xs font-mono uppercase tracking-widest mb-0.5">{heroProduct.subtitle}</p>
                      <h3 className="text-white font-bold text-lg leading-tight">{heroProduct.name}</h3>
                    </div>
                    <div className="bg-[#f0a500] text-black font-black text-lg px-4 py-2 rounded-lg">
                      ${heroProduct.price.toFixed(0)}
                    </div>
                  </div>
                </div>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white text-black text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-lg flex items-center gap-2 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-4 h-4" />
                    Quick View
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ─── CATALOG ─── */}
      <section id="catalog" className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 space-y-6">
        
        {/* Catalog Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-white/[0.06] py-4">
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white text-black'
                    : 'text-white/40 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 text-[12px] text-white/40 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white/40 hover:text-white focus:outline-none cursor-pointer transition-colors font-semibold uppercase tracking-wide"
            >
              <option value="featured" className="bg-[#161616] text-white">Featured</option>
              <option value="price-low" className="bg-[#161616] text-white">Price: Low → High</option>
              <option value="price-high" className="bg-[#161616] text-white">Price: High → Low</option>
              <option value="rating" className="bg-[#161616] text-white">Top Rated</option>
            </select>
            <span className="text-white/20">·</span>
            <span className="text-white/30">{filteredProducts.length} items</span>
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
                className="group bg-[#111] rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-[#161616]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-106 transition-transform duration-500"
                  />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isFeatured && (
                      <span className="bg-[#f0a500] text-black text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                    <span className="bg-black/70 backdrop-blur text-white/60 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded">
                      {product.franchise}
                    </span>
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur rounded-lg hover:bg-black/80 transition-all"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-white/40 hover:text-white'}`}
                    />
                  </button>

                  {/* Quick View Overlay */}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute inset-x-3 bottom-3 py-2.5 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 translate-y-2 group-hover:translate-y-0"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Quick View
                  </button>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div>
                    <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-1">{product.subtitle}</p>
                    <h3 className="text-white text-[13px] font-bold leading-snug line-clamp-2 group-hover:text-[#f0a500] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 mt-auto">
                    <Star className="w-3.5 h-3.5 text-[#f0a500] fill-[#f0a500]" />
                    <span className="text-white/40 text-[11px] font-medium">{product.rating}</span>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/[0.06]">
                    <span className="text-white font-black text-base">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all cursor-pointer ${
                        justAdded
                          ? 'bg-[#f0a500] text-black'
                          : 'bg-white/10 text-white hover:bg-white hover:text-black'
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
      <footer className="border-t border-white/[0.06] bg-[#0c0c0c] py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-white font-black text-base tracking-[-0.02em]">OH MY MARVZ</div>
            <div className="text-white/20 text-[11px] mt-1">Lebanon's premier collectibles store</div>
          </div>
          <div className="flex items-center gap-6 text-white/30 text-[12px] font-medium">
            <Link href="/" className="hover:text-white transition-colors">Classic View</Link>
            <Link href="/marvel" className="hover:text-white transition-colors">Marvel</Link>
            <Link href="/anime" className="hover:text-white transition-colors">Anime</Link>
            <Link href="/meta" className="hover:text-white transition-colors">Admin</Link>
          </div>
          <div className="text-white/20 text-[11px]">Crafted by Meta Pylon</div>
        </div>
      </footer>

      {/* Marquee CSS */}
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

      {/* Modals */}
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
