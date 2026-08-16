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
  Truck,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { INITIAL_PRODUCTS, Product } from '@/data/products';
import { ProductQuickView } from '@/components/ProductQuickView';
import { CartDrawer, CartItem } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
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
    <div className="min-h-screen text-[#111]" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#F0EFE9' }}>

      {/* ─── TICKER ─── */}
      <div
        style={{ background: '#111' }}
        className="text-white text-[11px] font-semibold tracking-widest uppercase overflow-hidden py-2.5"
      >
        <div className="flex gap-16 whitespace-nowrap animate-marquee">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              <span>⚡ Fast Lebanon Delivery</span>
              <span className="opacity-20">·</span>
              <span>🏫 BAU Beirut Pickup</span>
              <span className="opacity-20">·</span>
              <span>✦ 100% Authentic Collectibles</span>
              <span className="opacity-20">·</span>
              <span>🎯 Marvel & Anime Grails</span>
              <span className="opacity-20">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── FLOATING HOVERING NAV ─── */}
      <div className="sticky top-4 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className="pointer-events-auto w-full max-w-5xl flex items-center justify-between gap-4 px-5 py-3 rounded-2xl"
          style={{
            background: 'rgba(250,250,247,0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.14), 0 1px 0 rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          {/* Logo */}
          <Link href="/2" className="text-[#111] font-black text-[15px] tracking-[-0.03em] hover:text-[#c96a00] transition-colors shrink-0">
            OH MY MARVZ
          </Link>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'marvel', label: 'Marvel' },
              { id: 'anime', label: 'Anime' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFranchise(f.id as any)}
                className="px-4 py-1.5 rounded-xl text-[13px] font-semibold transition-all"
                style={
                  activeFranchise === f.id
                    ? { background: '#111', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }
                    : { color: 'rgba(0,0,0,0.45)' }
                }
              >
                {f.label}
              </button>
            ))}
            <div className="w-px h-4 bg-black/10 mx-2" />
            <Link href="/" className="px-3 py-1.5 rounded-xl text-[13px] text-black/35 font-medium hover:text-black transition-colors">Classic</Link>
          </div>

          {/* Right: Search + Wishlist + Cart */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Inline search */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl w-40 lg:w-52 transition-all"
              style={{ background: '#ECEAE2', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.07)' }}
            >
              <Search className="w-3.5 h-3.5 text-black/30 shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-[#111] text-xs placeholder:text-black/30 focus:outline-none min-w-0"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 text-black/30 hover:text-black" />
                </button>
              )}
            </div>

            <button className="relative p-2 text-black/40 hover:text-black rounded-xl hover:bg-black/5 transition-all">
              <Heart className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 text-white text-[9px] font-black rounded-full flex items-center justify-center" style={{ background: '#c96a00' }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-xl font-bold text-[12px] transition-all hover:opacity-90 active:scale-95"
              style={{ background: '#111', boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-lg min-w-[18px] text-center" style={{ background: '#c96a00' }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>


      {/* ─── HERO ─── */}
      {heroProduct && (
        <section style={{ background: '#FAFAF7', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }} className="w-full">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left copy */}
              <div className="space-y-7">
                <div
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full"
                  style={{ background: 'rgba(201,106,0,0.1)', border: '1px solid rgba(201,106,0,0.25)', color: '#c96a00' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c96a00] animate-pulse" />
                  New Drop Available
                </div>

                <h1
                  className="uppercase leading-[0.88] tracking-[-0.04em] font-black text-[#111]"
                  style={{ fontSize: 'clamp(3.5rem,7vw,6.5rem)' }}
                >
                  CURATED<br />
                  <span style={{ color: '#c96a00' }}>DROPS.</span>
                </h1>

                <p className="text-[15px] leading-relaxed max-w-md" style={{ color: 'rgba(0,0,0,0.45)' }}>
                  Premium Marvel statues, anime action figures, and limited collectibles — sourced and delivered fast across Lebanon.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="#catalog"
                    className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-xl font-bold text-[13px] uppercase tracking-wide transition-all active:scale-95"
                    style={{ background: '#111', boxShadow: '0 4px 16px rgba(0,0,0,0.22)' }}
                  >
                    Shop All Drops <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setQuickViewProduct(heroProduct)}
                    className="px-6 py-3.5 rounded-xl font-semibold text-[13px] transition-all hover:bg-black/5"
                    style={{ border: '1.5px solid rgba(0,0,0,0.12)', color: 'rgba(0,0,0,0.5)' }}
                  >
                    Quick Preview
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 pt-6" style={{ borderTop: '1.5px solid rgba(0,0,0,0.08)' }}>
                  {[
                    { val: '100%', label: 'Authentic' },
                    { val: '24–48h', label: 'Lebanon Ship' },
                    { val: 'BAU', label: 'Beirut Pickup' },
                  ].map((stat, i) => (
                    <React.Fragment key={stat.label}>
                      {i > 0 && <div className="w-px h-8 bg-black/10" />}
                      <div>
                        <div className="text-xl font-black text-[#111]">{stat.val}</div>
                        <div className="text-[11px] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(0,0,0,0.3)' }}>{stat.label}</div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Right: hero product card */}
              <div
                className="relative group cursor-pointer rounded-3xl overflow-hidden"
                onClick={() => setQuickViewProduct(heroProduct)}
                style={{ boxShadow: '0 20px 80px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.1)' }}
              >
                <div className="aspect-square relative" style={{ background: '#E8E5DA' }}>
                  <Image
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />

                  {/* Info overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{heroProduct.subtitle}</p>
                      <h3 className="text-white font-bold text-xl leading-tight">{heroProduct.name}</h3>
                    </div>
                    <div className="text-white font-black text-xl px-4 py-2 rounded-xl" style={{ background: '#c96a00', boxShadow: '0 4px 16px rgba(201,106,0,0.5)' }}>
                      ${heroProduct.price.toFixed(0)}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.15)' }}>
                    <div
                      className="flex items-center gap-2 text-[#111] text-[12px] font-bold uppercase tracking-widest px-6 py-3 rounded-xl translate-y-2 group-hover:translate-y-0 transition-transform"
                      style={{ background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                    >
                      <Eye className="w-4 h-4" /> Quick View
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── TRUST STRIP ─── */}
      <div style={{ background: '#ECEAE2', borderTop: '1.5px solid rgba(0,0,0,0.07)', borderBottom: '1.5px solid rgba(0,0,0,0.07)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x sm:divide-black/10">
          {[
            { icon: Truck, title: 'Lebanon-Wide Delivery', desc: '24 to 48 hours to your door' },
            { icon: ShieldCheck, title: '100% Authenticated', desc: 'Inspected, verified collectibles only' },
            { icon: RotateCcw, title: 'BAU Beirut Pickup', desc: 'Free collection from BAU campus' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 px-0 sm:px-8 first:pl-0 last:pr-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(201,106,0,0.1)' }}>
                <Icon className="w-5 h-5" style={{ color: '#c96a00' }} />
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#111]">{title}</div>
                <div className="text-[12px]" style={{ color: 'rgba(0,0,0,0.4)' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CATALOG ─── */}
      <section id="catalog" className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 space-y-7">

        {/* Filter + Sort Row */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl px-5 py-4"
          style={{ background: '#FAFAF7', boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 0 rgba(0,0,0,0.05)' }}
        >
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-4 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer"
                style={
                  activeCategory === cat.id
                    ? { background: '#111', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }
                    : { background: '#ECEAE2', color: 'rgba(0,0,0,0.5)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)' }
                }
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[12px] font-semibold shrink-0" style={{ color: 'rgba(0,0,0,0.4)' }}>
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer uppercase tracking-wide"
              style={{ color: 'rgba(0,0,0,0.5)' }}
            >
              <option value="featured" className="text-black bg-white">Featured</option>
              <option value="price-low" className="text-black bg-white">Price: Low → High</option>
              <option value="price-high" className="text-black bg-white">Price: High → Low</option>
              <option value="rating" className="text-black bg-white">Top Rated</option>
            </select>
            <span style={{ color: 'rgba(0,0,0,0.15)' }}>·</span>
            <span>{filteredProducts.length} items</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const justAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                style={{ background: '#FAFAF7', boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 0 rgba(0,0,0,0.04)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06), 0 1px 0 rgba(0,0,0,0.04)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden" style={{ background: '#ECEAE2' }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-106 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isFeatured && (
                      <span className="text-white text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-lg" style={{ background: '#c96a00', boxShadow: '0 2px 8px rgba(201,106,0,0.4)' }}>
                        Featured
                      </span>
                    )}
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', color: 'rgba(0,0,0,0.5)', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}
                    >
                      {product.franchise}
                    </span>
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-xl transition-all"
                    style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-black/30 hover:text-black'}`}
                    />
                  </button>

                  {/* Quick View — slide up on hover */}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute inset-x-3 bottom-3 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    style={{ background: '#111', color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
                  >
                    <Eye className="w-3.5 h-3.5" /> Quick View
                  </button>
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col gap-3 flex-1" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <div className="flex-1">
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: 'rgba(0,0,0,0.3)' }}>{product.subtitle}</p>
                    <h3
                      className="text-[13px] font-bold leading-snug line-clamp-2 transition-colors group-hover:text-[#c96a00]"
                      style={{ color: '#111' }}
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3"
                        style={{
                          color: i < Math.round(product.rating) ? '#c96a00' : 'rgba(0,0,0,0.12)',
                          fill: i < Math.round(product.rating) ? '#c96a00' : 'rgba(0,0,0,0.08)',
                        }}
                      />
                    ))}
                    <span className="text-[11px] ml-1 font-medium" style={{ color: 'rgba(0,0,0,0.35)' }}>{product.rating}</span>
                  </div>

                  {/* Price + CTA */}
                  <div
                    className="flex items-center justify-between gap-2 pt-3"
                    style={{ borderTop: '1.5px solid rgba(0,0,0,0.06)' }}
                  >
                    <span className="font-black text-[#111]" style={{ fontSize: '17px', letterSpacing: '-0.02em' }}>
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wide transition-all cursor-pointer active:scale-95"
                      style={
                        justAdded
                          ? { background: '#c96a00', color: '#fff', boxShadow: '0 2px 10px rgba(201,106,0,0.4)' }
                          : { background: '#111', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }
                      }
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
      <footer style={{ background: '#111', borderTop: '1px solid rgba(255,255,255,0.06)' }} className="py-12 mt-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-white font-black text-base tracking-[-0.02em]">OH MY MARVZ</div>
            <div className="text-white/25 text-[11px] mt-1">Lebanon's premier collectibles store</div>
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

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
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
