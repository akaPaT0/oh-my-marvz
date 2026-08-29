'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingCart,
  Search,
  Heart,
  Star,
  ChevronDown,
  SlidersHorizontal,
  X,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  User,
  Menu,
  Tag,
} from 'lucide-react';
import { INITIAL_PRODUCTS, Product } from '@/data/products';
import { ModernProductModal } from '@/components/ModernProductModal';
import { CartDrawer, CartItem } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ViewSwitcher } from '@/components/ViewSwitcher';

const CATEGORIES = ['All', 'Figures', 'Statues', 'Keychains', 'Funko Pops', 'Stickers'];
const FRANCHISES = ['All', 'Marvel', 'Anime'];

export default function ShopPage() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFranchise, setActiveFranchise] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setTimeout(() => setAddedId(null), 1800);
  };

  const toggleWishlist = (id: string) =>
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const cat = activeCategory === 'All' || p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
          (activeCategory === 'Funko Pops' && p.category.toLowerCase().includes('pop')) ||
          (activeCategory === 'Keychains' && p.category.toLowerCase().includes('keychain'));
        const franchise = activeFranchise === 'All' || p.franchise.toLowerCase() === activeFranchise.toLowerCase();
        const search = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return cat && franchise && search;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, activeCategory, activeFranchise, searchQuery, sortBy]);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#D6D6D6] text-[#1A1A1A]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-[#1A1A1A] text-white text-[12px] font-medium text-center py-2 px-4">
        🚚 Free delivery across Lebanon &nbsp;·&nbsp; 🏫 BAU Beirut pickup available &nbsp;·&nbsp; ✅ 100% Authentic collectibles
      </div>

      {/* ── HEADER ── */}
      <header className="bg-white sticky top-0 z-50" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.12), 0 1px 0 rgba(0,0,0,0.06)' }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

          {/* Main row */}
          <div className="flex items-center gap-4 h-[64px]">

            {/* Mobile menu */}
            <button className="md:hidden p-2 text-[#555]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link href="/2" className="font-black text-[18px] tracking-tight text-[#1A1A1A] hover:text-[#C96A00] transition-colors shrink-0 mr-2">
              OH MY MARVZ
            </Link>

            {/* Search — prominent center */}
            <div className="flex-1 max-w-xl hidden sm:block">
              <div className="flex items-center bg-[#F0F0F0] border-2 border-[#CCCCCC] rounded-lg overflow-hidden focus-within:border-[#1A1A1A] transition-all">
                <input
                  type="text"
                  placeholder="Search collectibles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-transparent text-[14px] text-[#1A1A1A] placeholder:text-[#888] focus:outline-none"
                />
                <button className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#333] transition-colors">
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto">
              <button className="sm:hidden p-2 text-[#555]">
                <Search className="w-5 h-5" />
              </button>
              <button className="relative p-2 text-[#555] hover:text-[#1A1A1A] transition-colors">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 bg-[#C96A00] hover:bg-[#B05A00] text-white px-4 py-2 rounded-lg font-semibold text-[14px] transition-colors ml-1"
                style={{ boxShadow: '0 2px 8px rgba(201,106,0,0.4)' }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="bg-white text-[#C96A00] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Nav bar */}
          <nav className="hidden md:flex items-center gap-6 h-[40px] border-t border-[#EBEBEB] text-[13px] font-medium text-[#666]">
            {FRANCHISES.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFranchise(f)}
                className={`h-full border-b-2 transition-colors ${
                  activeFranchise === f
                    ? 'border-[#C96A00] text-[#C96A00] font-semibold'
                    : 'border-transparent hover:text-[#1A1A1A] hover:border-[#DCDCDC]'
                }`}
              >
                {f === 'All' ? 'All Collections' : f}
              </button>
            ))}
            <Link href="/" className="ml-auto h-full flex items-center border-transparent hover:text-[#1A1A1A] transition-colors">
              Classic View →
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EBEBEB] bg-white px-4 py-3 space-y-2">
            <div className="flex items-center bg-[#F0F0F0] border-2 border-[#CCCCCC] rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2.5 bg-transparent text-[14px] focus:outline-none"
              />
              <button className="px-3 py-2.5">
                <Search className="w-4 h-4 text-[#555]" />
              </button>
            </div>
            {FRANCHISES.map((f) => (
              <button
                key={f}
                onClick={() => { setActiveFranchise(f); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-2 py-1.5 text-[14px] rounded ${activeFranchise === f ? 'text-[#C96A00] font-semibold' : 'text-[#555]'}`}
              >
                {f === 'All' ? 'All Collections' : f}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── TRUST BAR ── */}
      <div className="bg-[#F0F0F0] border-b-2 border-[#C8C8C8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap justify-center gap-x-8 gap-y-2">
          {[
            { icon: Truck, text: 'Lebanon-wide delivery' },
            { icon: ShieldCheck, text: '100% Authentic' },
            { icon: RotateCcw, text: 'BAU Beirut pickup' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-[13px] text-[#333] font-medium">
              <Icon className="w-4 h-4 text-[#C96A00]" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>


      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">

        {/* Page heading + sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h1 className="text-[22px] font-black text-[#1A1A1A]">
              {activeFranchise === 'All' ? 'All Collectibles' : `${activeFranchise} Collection`}
            </h1>
            <p className="text-[13px] text-[#888] mt-0.5">{filteredProducts.length} products</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-[#DCDCDC] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] bg-white focus:outline-none focus:border-[#1A1A1A] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all ${
                activeCategory === cat
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white text-[#555] border-[#DCDCDC] hover:border-[#999] hover:text-[#1A1A1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── PRODUCT GRID ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const justAdded = addedId === product.id;
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null;

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.08)' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.10)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.08)'}
              >
                {/* Image */}
                <div
                  className="relative aspect-square bg-[#E8E8E8] cursor-pointer overflow-hidden"
                  onClick={() => setQuickViewProduct(product)}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-400"
                  />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                    {discount && (
                      <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                        -{discount}%
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="bg-[#C96A00] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-2.5 right-2.5 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center border border-[#E8E8E8] hover:scale-110 transition-transform"
                  >
                    <Heart
                      className="w-4 h-4"
                      style={{
                        fill: isWishlisted ? '#ef4444' : 'none',
                        color: isWishlisted ? '#ef4444' : '#888',
                      }}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-2 flex-1 border-t border-[#E0E0E0]">
                  {/* Category label */}
                  <p className="text-[11px] text-[#999] uppercase tracking-wider font-medium">{product.subtitle}</p>

                  {/* Name */}
                  <h3
                    className="text-[13px] font-semibold text-[#1A1A1A] line-clamp-2 leading-snug cursor-pointer hover:text-[#C96A00] transition-colors"
                    onClick={() => setQuickViewProduct(product)}
                  >
                    {product.name}
                  </h3>

                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3"
                        style={{
                          fill: i < Math.round(product.rating) ? '#F59E0B' : '#E5E7EB',
                          color: i < Math.round(product.rating) ? '#F59E0B' : '#E5E7EB',
                        }}
                      />
                    ))}
                    <span className="text-[11px] text-[#888] ml-0.5">({product.reviewsCount})</span>
                  </div>

                  {/* Price row */}
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-[16px] font-black text-[#1A1A1A]">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-[12px] text-[#AAA] line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-2.5 rounded-lg text-[13px] font-semibold transition-all active:scale-95 mt-1 flex items-center justify-center gap-2 ${
                      justAdded
                        ? 'bg-green-600 text-white'
                        : 'bg-[#1A1A1A] hover:bg-[#333] text-white'
                    }`}
                  >
                    {justAdded ? (
                      <><Check className="w-4 h-4" /> Added!</>
                    ) : (
                      <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-[#999]">
            <p className="text-[18px] font-semibold mb-2">No products found</p>
            <p className="text-[14px]">Try a different category or search term.</p>
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1A1A1A] text-white mt-12 py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid sm:grid-cols-3 gap-8">
          <div>
            <div className="font-black text-[16px] mb-2">OH MY MARVZ</div>
            <p className="text-[13px] text-white/50 leading-relaxed">Lebanon's premier collectibles store. Marvel, anime, and more — sourced, verified, and delivered.</p>
          </div>
          <div>
            <div className="font-semibold text-[13px] text-white/60 uppercase tracking-widest mb-3">Shop</div>
            <div className="space-y-2 text-[13px] text-white/50">
              <Link href="/marvel" className="block hover:text-white transition-colors">Marvel Collection</Link>
              <Link href="/anime" className="block hover:text-white transition-colors">Anime Collection</Link>
              <Link href="/" className="block hover:text-white transition-colors">Classic View</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold text-[13px] text-white/60 uppercase tracking-widest mb-3">Info</div>
            <div className="space-y-2 text-[13px] text-white/50">
              <p>📍 BAU Beirut pickup available</p>
              <p>🚚 Lebanon-wide delivery</p>
              <p>✅ 100% authentic products</p>
            </div>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[12px] text-white/30">
          <span>© 2025 Oh My Marvz</span>
          <span>Powered by Meta Pylon</span>
        </div>
      </footer>

      <ModernProductModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToCart={handleAddToCart} />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(i, q) => {
          if (q <= 0) setCartItems((p) => p.filter((_, idx) => idx !== i));
          else setCartItems((p) => { const u = [...p]; u[i].quantity = q; return u; });
        }}
        onRemoveItem={(i) => setCartItems((p) => p.filter((_, idx) => idx !== i))}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onClearCart={() => setCartItems([])}
      />
      <ViewSwitcher />
    </div>
  );
}
