'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  Sparkles, 
  ArrowUpDown, 
  Star, 
  Truck, 
  ShieldCheck, 
  Clock, 
  SlidersHorizontal,
  ChevronRight,
  Eye,
  Check,
  Building2,
  X
} from 'lucide-react';
import { INITIAL_PRODUCTS, Product } from '@/data/products';
import { ProductQuickView } from '@/components/ProductQuickView';
import { CartDrawer, CartItem } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';

export default function ModernHomeTwo() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeFranchise, setActiveFranchise] = useState<'all' | 'marvel' | 'anime'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  
  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

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
      setCartItems((prev) => prev.filter((_, idx) => idx !== index));
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

  const handleToggleWishlist = (productId: string) => {
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
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-indigo-100 text-xs font-semibold py-2 px-4 text-center border-b border-indigo-500/20 flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-mono font-bold">
          LEBANON EXPRESS
        </span>
        <span>⚡ Same-day delivery in Beirut & fast shipping across Lebanon | Pickup available at BAU University</span>
      </div>

      {/* Modern Floating Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/2" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-extrabold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                MARVZ
              </span>
              <span className="text-[10px] font-mono text-indigo-400 block -mt-1 tracking-widest font-semibold">
                CURATED VAULT
              </span>
            </div>
          </Link>

          {/* Franchise Tabs Navigation */}
          <nav className="hidden md:flex items-center bg-slate-900/90 border border-slate-800 rounded-full p-1 text-xs font-medium">
            <button
              onClick={() => setActiveFranchise('all')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                activeFranchise === 'all'
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ALL COLLECTIONS
            </button>
            <button
              onClick={() => setActiveFranchise('marvel')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                activeFranchise === 'marvel'
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              MARVEL UNIVERSE
            </button>
            <button
              onClick={() => setActiveFranchise('anime')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                activeFranchise === 'anime'
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ANIME GRAILS
            </button>
          </nav>

          {/* Search Bar & Actions */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => alert(`Wishlist contains ${wishlist.length} saved items.`)}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition-all"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-semibold text-xs transition-all shadow-lg shadow-indigo-600/20 hover:scale-102"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">CART</span>
              <span className="bg-indigo-950/60 text-indigo-200 px-2 py-0.5 rounded-lg font-mono text-[11px] font-bold">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Modern High-End Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950 border-b border-slate-900">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-indigo-400">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>PREMIUM COLLECTIBLES & GADGETS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Authentic Pop Culture & <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200 bg-clip-text text-transparent">Anime Grails</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Discover high-detail Marvel statues, limited anime action figures, metal keychains, and premium 3D accessories. Fast dispatch across Beirut and all Lebanon.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#catalog"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase shadow-xl shadow-indigo-600/25 transition-all hover:scale-102 flex items-center gap-2"
                >
                  <span>EXPLORE ARSENAL</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <Link
                  href="/meta"
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-6 py-3.5 rounded-2xl font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  <span>META PORTAL</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-900 grid grid-cols-3 gap-4 text-left max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-lg font-extrabold text-white">100%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Verified Authentic</div>
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white">24-48h</div>
                  <div className="text-[11px] text-slate-500 font-medium">Lebanon Shipping</div>
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white">BAU Pickup</div>
                  <div className="text-[11px] text-slate-500 font-medium">Beirut Location</div>
                </div>
              </div>

            </div>

            {/* Right Hero Showcase Cards */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {products.filter(p => p.isFeatured).slice(0, 4).map((item, idx) => (
                  <div 
                    key={item.id}
                    onClick={() => setQuickViewProduct(item)}
                    className="group relative bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/40 rounded-3xl p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/50 cursor-pointer overflow-hidden"
                  >
                    <div className="aspect-square relative rounded-2xl overflow-hidden bg-slate-950 mb-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono text-indigo-400 font-bold uppercase">
                        {item.franchise}
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-mono font-extrabold text-indigo-400">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {item.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Clean Catalog Section */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Controls Header: Category Filter Pills & Sort Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'figures', label: 'Action Figures' },
              { id: 'statues', label: 'Statues & Busts' },
              { id: 'keychains', label: 'Keychains' },
              { id: 'pops', label: 'Pops' },
              { id: 'stickers', label: 'Stickers' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer uppercase font-mono font-bold"
              >
                <option value="featured">SORT: FEATURED</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
                <option value="rating">HIGHEST RATED</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid (Modern Non-Comic Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 rounded-3xl p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/40 flex flex-col justify-between"
            >
              <div>
                {/* Product Image Container */}
                <div className="aspect-square relative rounded-2xl overflow-hidden bg-slate-950 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-indigo-300 font-bold uppercase border border-white/10">
                      {product.franchise}
                    </span>
                    {product.isFeatured && (
                      <span className="bg-indigo-600/90 text-white px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleToggleWishlist(product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
                      wishlist.includes(product.id)
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick View Hover Overlay */}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute inset-x-3 bottom-3 py-2 bg-slate-900/90 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Preview</span>
                  </button>
                </div>

                {/* Meta Category & Rating */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-mono text-[11px] uppercase text-indigo-400 font-medium">
                    {product.subtitle}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-300">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {product.rating}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1 mb-2">
                  {product.name}
                </h3>
              </div>

              {/* Price & Add to Cart Action */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2 mt-2">
                <div>
                  <span className="text-xs text-slate-500 block text-[10px]">Price</span>
                  <span className="text-base font-mono font-extrabold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 hover:scale-102 flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO CART</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Modern Trust & Delivery Banner */}
      <section className="bg-slate-900/80 border-y border-slate-800/80 py-10 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/50">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Lebanon Shipping</h4>
                <p className="text-xs text-slate-400 mt-1">24 to 48 hours door-to-door delivery across all Lebanese governates.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/50">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">BAU Beirut Pickup</h4>
                <p className="text-xs text-slate-400 mt-1">Collect directly from BAU University location in Beirut with zero delivery fees.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/50">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Verified Authentic</h4>
                <p className="text-xs text-slate-400 mt-1">Every statue, action figure, and accessory is inspected for high quality.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-900 pb-8">
            
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm">
                M
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                OH MY MARVZ
              </span>
            </div>

            <div className="flex items-center gap-6 font-medium text-xs">
              <Link href="/" className="hover:text-white transition-colors">Comic View</Link>
              <Link href="/marvel" className="hover:text-white transition-colors">Marvel</Link>
              <Link href="/anime" className="hover:text-white transition-colors">Anime</Link>
              <Link href="/meta" className="hover:text-white transition-colors">Enterprise Meta</Link>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500 text-[11px]">
            <p>© 2026 OH MY MARVZ. All rights reserved. Powered by Meta Pylon.</p>
            <p className="font-mono text-indigo-400">Crafted by Meta Pylon</p>
          </div>
        </div>
      </footer>

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
