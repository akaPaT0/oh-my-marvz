'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Search,
  Heart,
  Star,
  Check,
  Truck,
  ShieldCheck,
  MapPin,
  X,
  Menu,
  Plus,
} from 'lucide-react';
import { INITIAL_PRODUCTS, Product } from '@/data/products';
import { CartDrawer, CartItem } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ViewSwitcher } from '@/components/ViewSwitcher';

const CATEGORIES = ['All', 'Figures', 'Statues', 'Keychains', 'Funko Pops', 'Stickers'];

export default function ShopPage() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFranchise, setActiveFranchise] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const addToCart = (product: Product, qty = 1) => {
    setCartItems(prev => {
      const i = prev.findIndex(x => x.product.id === product.id);
      if (i > -1) { const u = [...prev]; u[i].quantity += qty; return u; }
      return [...prev, { product, quantity: qty }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const toggleWishlist = (id: string) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const filtered = useMemo(() => products
    .filter(p => {
      const cat = activeCategory === 'All'
        || p.category.toLowerCase().includes(activeCategory.toLowerCase())
        || (activeCategory === 'Funko Pops' && p.category.toLowerCase().includes('pop'))
        || (activeCategory === 'Keychains' && p.category.toLowerCase().includes('keychain'));
      const franchise = activeFranchise === 'All' || p.franchise.toLowerCase() === activeFranchise.toLowerCase();
      const search = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return cat && franchise && search;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }), [products, activeCategory, activeFranchise, searchQuery, sortBy]);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#F4F4F4', minHeight: '100vh', color: '#1A1A1A' }}>

      {/* ── ANNOUNCEMENT ── */}
      <div style={{ background: '#1A1A1A', color: '#fff', fontSize: '12px', fontWeight: 500, textAlign: 'center', padding: '9px 16px', letterSpacing: '0.02em' }}>
        🚚 Free Lebanon delivery &nbsp;·&nbsp; 🏫 BAU Beirut pickup &nbsp;·&nbsp; ✅ 100% Authentic
      </div>

      {/* ── HEADER ── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#fff',
        borderBottom: '1px solid #E8E8E8',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', height: 62, gap: 12 }}>

          {/* Logo */}
          <Link href="/2" style={{ fontWeight: 900, fontSize: 16, letterSpacing: '-0.03em', color: '#1A1A1A', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            OH MY MARVZ
          </Link>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: '#E0E0E0', flexShrink: 0 }} />

          {/* Nav links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {[
              { id: 'All', label: 'All' },
              { id: 'Marvel', label: 'Marvel' },
              { id: 'Anime', label: 'Anime' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFranchise(f.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: activeFranchise === f.id ? 700 : 500,
                  background: activeFranchise === f.id ? '#1A1A1A' : 'transparent',
                  color: activeFranchise === f.id ? '#fff' : '#666',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {f.label}
              </button>
            ))}
          </nav>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{ padding: '7px 8px', color: '#666', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', borderRadius: 8 }}
            >
              <Search size={18} />
            </button>
            {searchOpen && (
              <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 10px)', background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.14)', width: 260, padding: 10, zIndex: 100, border: '1px solid #E8E8E8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F4F4F4', borderRadius: 8, padding: '7px 12px', border: '1.5px solid #DCDCDC' }}>
                  <Search size={13} color="#888" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search collectibles..."
                    style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 13, color: '#1A1A1A' }}
                  />
                  {searchQuery && <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0, display: 'flex' }}><X size={13} /></button>}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <button style={{ position: 'relative', padding: '7px 8px', color: '#666', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', borderRadius: 8 }}>
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span style={{ position: 'absolute', top: 3, right: 3, width: 14, height: 14, background: '#ef4444', color: '#fff', borderRadius: '50%', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#1A1A1A', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}
          >
            <ShoppingBag size={15} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{ background: '#C96A00', color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 800, padding: '1px 7px' }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <div style={{ background: '#141414', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #282828' }}>
        {/* Subtle glow backdrop */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, background: 'radial-gradient(circle, rgba(201,106,0,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 28px 60px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center' }}>
            
            {/* Left: Copy & Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,106,0,0.12)', border: '1px solid rgba(201,106,0,0.3)', padding: '6px 14px', borderRadius: 999, width: 'fit-content' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C96A00' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  Official Collectibles Vault
                </span>
              </div>

              <h1 style={{ fontSize: 48, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                Authentic Marvel & Anime Grails.
              </h1>

              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.65, maxWidth: 480 }}>
                High-grade action figures, resin statues, metal keychains & sticker packs. Verified authentic, packed securely, and delivered across Lebanon.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 14, marginTop: 4, flexWrap: 'wrap' }}>
                <button
                  onClick={() => { setActiveFranchise('All'); document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{ padding: '14px 28px', background: '#C96A00', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', letterSpacing: '-0.01em', boxShadow: '0 4px 20px rgba(201,106,0,0.35)', transition: 'transform 0.15s' }}
                >
                  Explore Collection
                </button>
                <button
                  onClick={() => { setActiveFranchise('Anime'); document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{ padding: '14px 24px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}
                >
                  Anime Grails →
                </button>
              </div>

              {/* Highlights bar */}
              <div style={{ display: 'flex', gap: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0 }}>4.9 ★</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified Reviews</p>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
                <div>
                  <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0 }}>24-48h</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lebanon Delivery</p>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
                <div>
                  <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0 }}>Free Pickup</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>BAU Beirut Campus</p>
                </div>
              </div>
            </div>

            {/* Right: Featured Product Showcase (Cards filling the space) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                {
                  id: 'marvel-fig-01',
                  name: 'Iron Man Mark 46 Action Figure',
                  tag: 'TOP MARVEL',
                  price: 49.99,
                  orig: 65.00,
                  img: '/products/ironman_figure.png',
                },
                {
                  id: 'anime-fig-01',
                  name: 'Luffy Wano Captain Resin Statue',
                  tag: 'TOP ANIME',
                  price: 89.99,
                  orig: 110.00,
                  img: '/products/luffy_wano_statue.png',
                }
              ].map(item => (
                <Link
                  key={item.id}
                  href={`/2/${item.id}`}
                  style={{
                    background: '#1F1F1F',
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                    transition: 'transform 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,106,0,0.6)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <div style={{ position: 'relative', aspectRatio: '1', background: '#2B2B2B', overflow: 'hidden' }}>
                    <Image src={item.img} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: 10, left: 10, background: '#C96A00', color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.05em' }}>
                      {item.tag}
                    </span>
                  </div>
                  <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>
                      {item.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>${item.price.toFixed(2)}</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>${item.orig.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── CATEGORY TILES (Image-Backed, High Contrast, No Emojis) ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 28px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            {
              id: 'Marvel',
              title: 'Marvel Universe',
              subtitle: 'Iron Man · Captain America · Deadpool · Keychains',
              img: '/products/ironman_figure.png',
              badge: 'MARVEL HEROES',
            },
            {
              id: 'Anime',
              title: 'Anime Collection',
              subtitle: 'One Piece · Demon Slayer · Naruto · Statues',
              img: '/products/zoro_figure.png',
              badge: 'ANIME GRAILS',
            },
          ].map(tile => (
            <button
              key={tile.id}
              onClick={() => { setActiveFranchise(tile.id); document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                position: 'relative',
                background: '#fff',
                borderRadius: 16,
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #E2E2E2',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                textAlign: 'left',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#1A1A1A';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#E2E2E2';
              }}
            >
              <div style={{ zIndex: 2, maxWidth: '65%' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#C96A00', letterSpacing: '0.1em', background: 'rgba(201,106,0,0.08)', padding: '3px 9px', borderRadius: 4, display: 'inline-block', marginBottom: 8 }}>
                  {tile.badge}
                </span>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A1A', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                  {tile.title}
                </h3>
                <p style={{ fontSize: 13, color: '#777', margin: '0 0 12px', lineHeight: 1.4 }}>
                  {tile.subtitle}
                </p>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Shop Series →
                </span>
              </div>

              {/* Product Thumbnail Frame */}
              <div style={{ width: 110, height: 110, position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#F4F4F4', border: '1px solid #E8E8E8', flexShrink: 0 }}>
                <Image src={tile.img} alt={tile.title} fill style={{ objectFit: 'cover' }} />
              </div>
            </button>
          ))}
        </div>
      </div>


      {/* ── COLLECTION HEADER ── */}
      <div id="shop-grid" style={{ background: '#fff', borderBottom: '1.5px solid #E2E2E2', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginTop: 28 }}>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>

          {/* Category filter pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  border: activeCategory === cat ? '2px solid #1A1A1A' : '2px solid #DCDCDC',
                  background: activeCategory === cat ? '#1A1A1A' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#555',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  boxShadow: activeCategory === cat ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort + count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: '#888' }}>{filtered.length} products</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              style={{ border: '1.5px solid #DCDCDC', borderRadius: 8, padding: '6px 12px', fontSize: 13, color: '#1A1A1A', background: '#fff', cursor: 'pointer', outline: 'none', fontWeight: 600 }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
          {filtered.map(product => {
            const wishlisted = wishlist.includes(product.id);
            const justAdded = addedId === product.id;
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null;

            return (
              <div
                key={product.id}
                className="product-card"
                style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'default' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Image */}
                <Link
                  href={`/2/${product.id}`}
                  className="card-image-wrap"
                  style={{ position: 'relative', aspectRatio: '1', background: '#ECECEC', overflow: 'hidden', cursor: 'pointer', display: 'block' }}
                >
                  <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover', transition: 'transform 0.4s' }} className="card-img" />

                  {/* Badges */}
                  <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {discount && <span style={{ background: '#DC2626', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>−{discount}%</span>}
                    {product.isFeatured && <span style={{ background: '#C96A00', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>Featured</span>}
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
                    style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, background: 'rgba(255,255,255,0.95)', border: '1px solid #E0E0E0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
                  >
                    <Heart size={14} style={{ fill: wishlisted ? '#ef4444' : 'none', color: wishlisted ? '#ef4444' : '#888' }} />
                  </button>

                  {/* Hover add to cart overlay */}
                  <div
                    className="card-add-overlay"
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 10px', transform: 'translateY(100%)', transition: 'transform 0.25s ease' }}
                  >
                    <button
                      onClick={e => { e.stopPropagation(); addToCart(product); }}
                      style={{
                        width: '100%',
                        padding: '11px',
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        background: justAdded ? '#16a34a' : '#1A1A1A',
                        color: '#fff',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                        transition: 'background 0.2s',
                      }}
                    >
                      {justAdded ? <><Check size={15} /> Added!</> : <><Plus size={15} /> Add to Cart</>}
                    </button>
                  </div>
                </Link>

                {/* Info */}
                <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1, borderTop: '1px solid #EBEBEB' }}>
                  <p style={{ fontSize: 11, color: '#B0B0B0', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, margin: 0 }}>{product.subtitle}</p>
                  <Link
                    href={`/2/${product.id}`}
                    style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.35, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textDecoration: 'none' } as React.CSSProperties}
                  >
                    {product.name}
                  </Link>

                  {/* Stars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} style={{ fill: i < Math.round(product.rating) ? '#F59E0B' : '#E5E7EB', color: i < Math.round(product.rating) ? '#F59E0B' : '#E5E7EB' }} />
                    ))}
                    <span style={{ fontSize: 11, color: '#aaa', marginLeft: 2 }}>({product.reviewsCount})</span>
                  </div>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto', paddingTop: 6 }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.02em' }}>${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span style={{ fontSize: 13, color: '#bbb', textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
            <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No products found</p>
            <p style={{ fontSize: 14 }}>Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {/* ── TRUST ROW ── */}
      <div style={{ background: '#fff', borderTop: '1.5px solid #E2E2E2', boxShadow: '0 -2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center' }}>
          {[
            { icon: Truck, title: 'Lebanon-Wide Delivery', desc: '24–48h to your door' },
            { icon: ShieldCheck, title: '100% Authenticated', desc: 'Every item verified' },
            { icon: MapPin, title: 'BAU Beirut Pickup', desc: 'Free campus collection' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Icon size={22} color="#C96A00" />
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>{title}</p>
              <p style={{ fontSize: 12, color: '#999', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#111', color: '#fff', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
          <div>
            <p style={{ fontWeight: 900, fontSize: 15, marginBottom: 8 }}>OH MY MARVZ</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginTop: 0 }}>Lebanon's premier collectibles store. Sourced, verified, delivered.</p>
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Shop</p>
            {[['Marvel Collection', '/marvel'], ['Anime Collection', '/anime'], ['Classic View', '/']].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', marginBottom: 8 }}>{label}</Link>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Info</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 2, margin: 0 }}>📍 BAU Beirut pickup<br />🚚 Lebanon-wide delivery<br />✅ 100% authentic</p>
          </div>
        </div>
        <div style={{ maxWidth: 1280, margin: '24px auto 0', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
          <span>© 2025 Oh My Marvz</span>
          <span>Powered by Meta Pylon</span>
        </div>
      </footer>

      {/* Card hover styles */}
      <style>{`
        .card-image-wrap:hover .card-img { transform: scale(1.06); }
        .card-image-wrap:hover .card-add-overlay { transform: translateY(0) !important; }
      `}</style>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(i, q) => {
          if (q <= 0) setCartItems(p => p.filter((_, idx) => idx !== i));
          else setCartItems(p => { const u = [...p]; u[i].quantity = q; return u; });
        }}
        onRemoveItem={i => setCartItems(p => p.filter((_, idx) => idx !== i))}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} items={cartItems} onClearCart={() => setCartItems([])} />
      <ViewSwitcher />
    </div>
  );
}
