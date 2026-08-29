'use client';

import React, { useState, useMemo, useRef } from 'react';
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
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { INITIAL_PRODUCTS, Product } from '@/data/products';
import { CartDrawer, CartItem } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ViewSwitcher } from '@/components/ViewSwitcher';

const CATEGORIES = [
  'All',
  'Figurines',
  'Keychains',
  'Necklaces',
  'Stickers',
  'Funko Pops',
  'Props',
  'Spinners',
  'Phone Pins',
  '3D Buttons',
  'Car Accessories',
];

export default function ShopPage() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFranchise, setActiveFranchise] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);


  const featuredProducts = useMemo(
    () => products.filter((p) => p.isFeatured || p.rating >= 5.0).slice(0, 6),
    [products]
  );

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
      const catLower = activeCategory.toLowerCase();
      const pCat = (p.category || '').toLowerCase();
      const pName = (p.name || '').toLowerCase();
      const pSub = (p.subtitle || '').toLowerCase();
      const pDesc = (p.description || '').toLowerCase();
      const pHigh = (p.highlightCategory || '').toLowerCase();

      const matchesCategory =
        activeCategory === 'All' ||
        pCat.includes(catLower) ||
        pHigh.includes(catLower) ||
        (catLower === 'figurines' && (pCat.includes('figurine') || pCat.includes('figure') || pCat.includes('statue'))) ||
        (catLower === 'keychains' && pCat.includes('keychain')) ||
        (catLower === 'funko pops' && (pCat.includes('pop') || pName.includes('pop'))) ||
        (catLower === 'necklaces' && (pCat.includes('necklace') || pName.includes('necklace') || pSub.includes('necklace'))) ||
        (catLower === 'stickers' && pCat.includes('sticker')) ||
        (catLower === 'props' && (pCat.includes('prop') || pName.includes('replica') || pName.includes('shield') || pName.includes('hammer') || pName.includes('gauntlet'))) ||
        (catLower === 'spinners' && (pCat.includes('spinner') || pName.includes('spinner'))) ||
        (catLower === 'phone pins' && (pCat.includes('phone') || pCat.includes('pin') || pName.includes('pin'))) ||
        (catLower === '3d buttons' && (pCat.includes('button') || pName.includes('button'))) ||
        (catLower === 'car accessories' && (pCat.includes('car') || pName.includes('car')));

      const franchise = activeFranchise === 'All' || p.franchise.toLowerCase() === activeFranchise.toLowerCase();
      const search = !searchQuery || pName.includes(searchQuery.toLowerCase()) || pSub.includes(searchQuery.toLowerCase()) || pDesc.includes(searchQuery.toLowerCase());
      return matchesCategory && franchise && search;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }), [products, activeCategory, activeFranchise, searchQuery, sortBy]);


  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#F4F4F4', minHeight: '100vh', color: '#1A1A1A', overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>

      {/* ── ANNOUNCEMENT ── */}
      <div style={{ background: '#1A1A1A', color: '#fff', fontSize: '12px', fontWeight: 500, textAlign: 'center', padding: '9px 12px', letterSpacing: '0.02em', overflow: 'hidden' }}>
        🚚 Free Lebanon delivery &nbsp;·&nbsp; 🏫 BAU Beirut pickup &nbsp;·&nbsp; ✅ 100% Authentic
      </div>

      {/* ── HEADER ── */}
      <style>{`
        /* Universal box sizing and overflow protection */
        * { box-sizing: border-box; }

        /* Desktop base card hover */
        .product-card:hover .card-img { transform: scale(1.05); }
        .product-card:hover .card-add-overlay { transform: translateY(0); }
        .product-card:hover { border-color: #1A1A1A; }
        .mobile-quick-add-btn { display: none; }

        /* Mobile Responsive Adjustments (<= 768px) */
        @media (max-width: 768px) {
          .store-header-inner { padding: 0 14px !important; gap: 8px !important; width: 100% !important; max-width: 100% !important; }
          .store-nav-links { display: none !important; }
          .store-hero-wrap { padding-top: 62px !important; padding-bottom: 0 !important; width: 100% !important; overflow: hidden !important; }
          .store-hero-inner { padding: 20px 14px 18px !important; }
          .store-hero-grid { grid-template-columns: 1fr !important; gap: 18px !important; width: 100% !important; text-align: center !important; }

          .store-hero-h1 { font-size: 28px !important; line-height: 1.15 !important; text-align: center !important; }
          .store-hero-desc { font-size: 14px !important; text-align: center !important; margin: 0 auto !important; }
          .store-hero-ctas { justify-content: center !important; }
          .store-hero-cards { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 10px !important; width: 100% !important; }

          .store-hero-card-tile { min-height: 170px !important; padding: 14px 12px !important; }
          .store-hero-card-desc { display: none !important; }
          .store-hero-stats { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 4px !important; text-align: center !important; width: 100% !important; }
          .store-hero-stats-divider { display: none !important; }
          .store-hero-stat-val { font-size: 15px !important; }
          .store-hero-stat-lbl { font-size: 9.5px !important; letter-spacing: 0 !important; }
          .store-featured-wrap { padding: 16px 14px 0 !important; width: 100% !important; overflow: hidden !important; }


          .store-featured-banner { min-height: 230px !important; height: 230px !important; border-radius: 16px !important; }
          .store-featured-img { object-position: right center !important; transform: translateX(0px) !important; }
          .store-featured-gradient { background: linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.88) 55%, rgba(255,255,255,0.15) 100%) !important; }
          .store-featured-content { padding: 18px 16px !important; max-width: 65% !important; height: 100% !important; min-height: auto !important; justify-content: space-between !important; }
          .store-featured-title { font-size: 16px !important; line-height: 1.2 !important; margin: 0 !important; }
          .store-featured-desc { font-size: 11px !important; line-height: 1.3 !important; }
          .store-featured-price { font-size: 20px !important; }
          .store-featured-actions { display: flex !important; flex-direction: row !important; gap: 6px !important; }
          .store-featured-btn-view { width: auto !important; height: 32px !important; padding: 0 10px !important; font-size: 11px !important; border-radius: 8px !important; }
          .store-featured-btn-add { width: auto !important; height: 32px !important; padding: 0 10px !important; font-size: 11px !important; border-radius: 8px !important; }
          .store-featured-arrows { display: none !important; }
          .store-featured-dots { bottom: 8px !important; right: 10px !important; padding: 3px 8px !important; }

          .store-collection-header-inner { padding: 12px 14px !important; width: 100% !important; flex-direction: row !important; align-items: center !important; gap: 10px !important; justify-content: space-between !important; }
          .store-filter-pills { overflow-x: auto !important; flex-wrap: nowrap !important; max-width: 100% !important; width: 100% !important; padding-bottom: 2px !important; -webkit-overflow-scrolling: touch !important; white-space: nowrap !important; }

          .store-filter-pills::-webkit-scrollbar { display: none; }
          .store-product-grid-wrap { padding: 16px 14px 48px !important; width: 100% !important; overflow: hidden !important; }
          .store-product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 10px !important; width: 100% !important; }
          .store-product-card-body { padding: 10px 10px 12px !important; min-width: 0 !important; }
          .card-add-overlay { display: none !important; }
          .mobile-quick-add-btn { display: flex !important; }
          .store-trust-strip { grid-template-columns: 1fr !important; gap: 16px !important; padding: 20px 14px !important; width: 100% !important; }
          .store-footer-inner { padding: 32px 14px !important; flex-direction: column !important; gap: 20px !important; text-align: center !important; width: 100% !important; }
          .store-footer-links { justify-content: center !important; }
        }


        @media (max-width: 420px) {
          .store-hero-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>


      {/* ── FIXED HEADER ── */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 100,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E8E8E8',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      }}>
        <div className="store-header-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', height: 62, gap: 12 }}>


          {/* Real Brand Logo */}
          <Link href="/2" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <Image
              src="/logo.png"
              alt="Oh My Marvz"
              width={150}
              height={42}
              style={{ objectFit: 'contain', height: 36, width: 'auto' }}
              priority
            />
          </Link>


          {/* Divider */}
          <div className="store-nav-links" style={{ width: 1, height: 20, background: '#E0E0E0', flexShrink: 0 }} />

          {/* Nav links */}
          <nav className="store-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
            style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#E23636', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 800, cursor: 'pointer', boxShadow: '0 3px 12px rgba(226,54,54,0.38)', whiteSpace: 'nowrap', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#C52222')}
            onMouseLeave={e => (e.currentTarget.style.background = '#E23636')}
          >
            <ShoppingBag size={15} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{ background: '#111', color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 900, padding: '1px 7px' }}>
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </header>

      {/* ── HERO (Signature Red, Black & White Energy) ── */}
      <div className="store-hero-wrap" style={{ background: 'radial-gradient(ellipse 90% 60% at 15% -5%, rgba(226,54,54,0.07) 0%, #FFFFFF 65%)', borderBottom: '1.5px solid #E8E8E8', paddingTop: 62 }}>

        <div className="store-hero-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '52px 28px 56px' }}>
          <div className="store-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 48, alignItems: 'center' }}>

            <div className="store-hero-text-col" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h1 className="store-hero-h1" style={{ fontSize: 46, fontWeight: 950, color: '#111', margin: 0, lineHeight: 1.08, letterSpacing: '-0.035em' }}>
                Marvel & Anime Collectibles, <span style={{ color: '#E23636', position: 'relative', display: 'inline-block' }}>Delivered.</span>
              </h1>

              <p className="store-hero-desc" style={{ fontSize: 15, color: '#555', margin: 0, lineHeight: 1.65, maxWidth: 480, textAlign: 'center' }}>
                High-articulation figures, collector statues, metal keychains & sticker packs. Verified authentic with Lebanon-wide doorstep delivery or BAU Beirut pickup.
              </p>

              {/* CTAs with Signature Red & High-Contrast Black */}
              <div className="store-hero-ctas" style={{ display: 'flex', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>

                <button
                  onClick={() => { setActiveFranchise('All'); document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{
                    padding: '13px 28px',
                    background: '#E23636',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: 'pointer',
                    letterSpacing: '-0.01em',
                    boxShadow: '0 4px 18px rgba(226,54,54,0.38)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#C52222';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#E23636';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Explore Full Vault
                </button>

                <button
                  onClick={() => {
                    setActiveFranchise('All');
                    setActiveCategory('All');
                    document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    padding: '13px 24px',
                    background: '#1A1A1A',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#333';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#1A1A1A';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>Discover New Drops</span>
                  <span style={{ fontSize: 16 }}>→</span>
                </button>
              </div>

              {/* Highlights bar (Strict 3 columns side-by-side) */}
              <div className="store-hero-stats" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', alignItems: 'center', gap: 16, paddingTop: 18, borderTop: '1.5px solid #F0F0F0', width: '100%' }}>
                <div>
                  <p className="store-hero-stat-val" style={{ fontSize: 18, fontWeight: 950, color: '#111', margin: 0, whiteSpace: 'nowrap' }}>
                    4.9 <span style={{ color: '#E23636' }}>★</span>
                  </p>
                  <p className="store-hero-stat-lbl" style={{ fontSize: 11, color: '#777', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700, whiteSpace: 'nowrap' }}>Customer Rating</p>
                </div>
                <div className="store-hero-stats-divider" style={{ width: 1.5, height: 28, background: '#E8E8E8' }} />
                <div>
                  <p className="store-hero-stat-val" style={{ fontSize: 18, fontWeight: 950, color: '#111', margin: 0, whiteSpace: 'nowrap' }}>24-48h</p>
                  <p className="store-hero-stat-lbl" style={{ fontSize: 11, color: '#777', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700, whiteSpace: 'nowrap' }}>Lebanon Delivery</p>
                </div>
                <div className="store-hero-stats-divider" style={{ width: 1.5, height: 28, background: '#E8E8E8' }} />
                <div>
                  <p className="store-hero-stat-val" style={{ fontSize: 18, fontWeight: 950, color: '#111', margin: 0, whiteSpace: 'nowrap' }}>Free Pickup</p>
                  <p className="store-hero-stat-lbl" style={{ fontSize: 11, color: '#777', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700, whiteSpace: 'nowrap' }}>BAU Campus</p>
                </div>
              </div>



            </div>

            {/* Right: Marvel & Anime Franchise Collection Cards with Authentic Artwork */}
            <div className="store-hero-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                {
                  id: 'Marvel',
                  name: 'Marvel Series',
                  desc: 'Avengers, Iron Man, Spider-Man & X-Men',
                  img: '/banners/marvel_comic_art.jpg',
                },
                {
                  id: 'Anime',
                  name: 'Anime Series',
                  desc: 'One Piece, Naruto, Hunter x Hunter & more',
                  img: '/banners/anime_collage.jpg',
                }
              ].map(item => (

                <button
                  key={item.id}
                  className="store-hero-card-tile"
                  onClick={() => {
                    setActiveFranchise(item.id);
                    document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    position: 'relative',
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                    padding: '20px 18px',
                    textAlign: 'left',
                    minHeight: 240,
                    background: '#1A1A1A',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.18)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Full-bleed Background Artwork */}
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  />

                  {/* Gradient Scrim for Legibility */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.88) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Direct Text Overlay */}
                  <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <p className="store-hero-card-title" style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                      {item.name}
                    </p>
                    <p className="store-hero-card-desc" style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', margin: '0 0 6px', lineHeight: 1.35, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                      {item.desc}
                    </p>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      Shop {item.id} →
                    </span>
                  </div>
                </button>
              ))}
            </div>


          </div>
        </div>
      </div>


      {/* ── FEATURED SPOTLIGHT BANNER (Cropped Image BG + Gradient Scrim, Interactive Carousel) ── */}
      {featuredProducts.length > 0 && (() => {
        const item = featuredProducts[featuredIndex] || featuredProducts[0];
        const itemDiscount = item.originalPrice
          ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
          : null;
        const justAdded = addedId === item.id;

        return (
          <div className="store-featured-wrap" style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 28px 0' }}>
            {/* Top Bar with Header & Explore Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1A1A1A', margin: 0, letterSpacing: '-0.02em' }}>
                  Featured Spotlight
                </h2>
                <p style={{ fontSize: 13, color: '#777', margin: '3px 0 0' }}>
                  Hand-picked grail items and high-demand collector editions
                </p>
              </div>

              <div>
                <button
                  onClick={() => {
                    setSortBy('featured');
                    setActiveCategory('All');
                    setActiveFranchise('All');
                    document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 8,
                    background: '#fff',
                    border: '1.5px solid #DCDCDC',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#1A1A1A',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#1A1A1A')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#DCDCDC')}
                >
                  <span>Explore Featured Products</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Featured Banner: Cropped Product Image as Background + Gradient Scrim + Smooth Transitions */}
            <div
              className="store-featured-banner"
              onTouchStart={e => {
                setTouchEndX(null);
                setTouchStartX(e.targetTouches[0].clientX);
              }}
              onTouchMove={e => {
                setTouchEndX(e.targetTouches[0].clientX);
              }}
              onTouchEnd={() => {
                if (!touchStartX || !touchEndX) return;
                const diff = touchStartX - touchEndX;
                if (diff > 40) {
                  setFeaturedIndex(prev => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
                } else if (diff < -40) {
                  setFeaturedIndex(prev => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
                }
              }}
              style={{
                position: 'relative',
                borderRadius: 22,
                overflow: 'hidden',
                border: '1px solid #E2E2E2',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                minHeight: 440,
                display: 'flex',
                alignItems: 'center',
                background: '#ECECEC',
                touchAction: 'pan-y',
              }}
            >
              {featuredProducts.map((prod, idx) => {
                const isActive = idx === featuredIndex;
                const prodDiscount = prod.originalPrice
                  ? Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)
                  : null;
                const isProdAdded = addedId === prod.id;

                return (
                  <div
                    key={prod.id}
                    className="store-featured-slide"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : idx < featuredIndex ? 'translateX(-30px)' : 'translateX(30px)',
                      pointerEvents: isActive ? 'auto' : 'none',
                      transition: 'opacity 0.45s cubic-bezier(0.25, 1, 0.5, 1), transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
                      zIndex: isActive ? 2 : 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {/* Background Product Image */}
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        priority={idx === 0}
                        className="store-featured-img"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center 15%',
                          transform: isActive ? 'translateX(110px) scale(1)' : 'translateX(130px) scale(1.04)',
                          transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                        }}
                      />

                      {/* Gradient fade overlay for typography legibility */}
                      <div
                        className="store-featured-gradient"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0.94) 35%, rgba(255,255,255,0.55) 55%, transparent 100%)',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>

                    {/* Direct Content Overlay */}
                    <div
                      className="store-featured-content"
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        padding: '44px 48px',
                        maxWidth: 500,
                        height: 360,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* Title & Subtitle */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <Link
                          href={`/2/${prod.id}`}
                          style={{ textDecoration: 'none', color: '#1A1A1A' }}
                        >
                          <h3 className="store-featured-title" style={{ fontSize: 28, fontWeight: 900, margin: 0, lineHeight: 1.18, letterSpacing: '-0.03em', cursor: 'pointer', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>
                            {prod.name}
                          </h3>
                        </Link>

                        <p className="store-featured-desc" style={{ fontSize: 13, color: '#666', margin: 0, lineHeight: 1.4, fontWeight: 500, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>
                          {prod.subtitle}
                        </p>
                      </div>

                      {/* Price + Action Buttons */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {/* Price & Discount */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                          <span className="store-featured-price" style={{ fontSize: 30, fontWeight: 900, color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                            ${prod.price.toFixed(2)}
                          </span>
                          {prod.originalPrice && (
                            <span style={{ fontSize: 15, color: '#888', textDecoration: 'line-through', fontWeight: 500 }}>
                              ${prod.originalPrice.toFixed(2)}
                            </span>
                          )}
                          {prodDiscount && (
                            <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: '#DC2626', padding: '3px 8px', borderRadius: 4 }}>
                              −{prodDiscount}%
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="store-featured-actions" style={{ display: 'flex', gap: 10 }}>
                          <Link
                            href={`/2/${prod.id}`}
                            className="store-featured-btn-view"
                            style={{
                              width: 140,
                              height: 44,
                              background: '#1A1A1A',
                              color: '#fff',
                              borderRadius: 10,
                              textDecoration: 'none',
                              fontSize: 13,
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 6,
                              boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                              transition: 'background 0.15s',
                              flexShrink: 0,
                            }}
                          >
                            <span>View Piece</span>
                            <ArrowRight size={14} />
                          </Link>

                          <button
                            onClick={() => addToCart(prod)}
                            className="store-featured-btn-add"
                            style={{
                              width: 130,
                              height: 44,
                              background: isProdAdded ? '#16a34a' : '#E23636',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 10,
                              fontSize: 13,
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 6,
                              boxShadow: '0 4px 14px rgba(226,54,54,0.35)',
                              transition: 'all 0.15s',
                              flexShrink: 0,
                            }}
                            onMouseEnter={e => { if (!isProdAdded) e.currentTarget.style.background = '#C52222'; }}
                            onMouseLeave={e => { if (!isProdAdded) e.currentTarget.style.background = '#E23636'; }}
                          >
                            {isProdAdded ? (
                              <><Check size={15} /> Added</>
                            ) : (
                              <><ShoppingBag size={14} /> Quick Add</>
                            )}
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}


              {/* Navigation Arrows for PC & Mobile */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  setFeaturedIndex(prev => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
                }}
                aria-label="Previous slide"
                className="store-featured-arrows"
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 4,
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  color: '#1A1A1A',
                  transition: 'transform 0.15s, background 0.15s',
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={e => {
                  e.stopPropagation();
                  setFeaturedIndex(prev => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
                }}
                aria-label="Next slide"
                className="store-featured-arrows"
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 4,
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  color: '#1A1A1A',
                  transition: 'transform 0.15s, background 0.15s',
                }}
              >
                <ChevronRight size={20} />
              </button>

              {/* Bottom Pagination Dots */}
              <div className="store-featured-dots" style={{ position: 'absolute', bottom: 12, right: 18, zIndex: 4, display: 'flex', gap: 6, background: 'rgba(0,0,0,0.25)', padding: '5px 10px', borderRadius: 20, backdropFilter: 'blur(8px)' }}>
                {featuredProducts.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setFeaturedIndex(dotIdx)}
                    aria-label={`Jump to slide ${dotIdx + 1}`}
                    style={{
                      width: featuredIndex === dotIdx ? 18 : 6,
                      height: 6,
                      borderRadius: 999,
                      background: featuredIndex === dotIdx ? '#fff' : 'rgba(255,255,255,0.45)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })()}




      {/* ── COLLECTION HEADER (Single Row Bar) ── */}
      <div id="shop-grid" style={{ background: '#fff', borderBottom: '1.5px solid #E2E2E2', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginTop: 28, position: 'relative', zIndex: 10 }}>
        <div className="store-collection-header-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '12px 24px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>

          {/* Left / Right Category Navigation Arrows + Hidden Scrollbar Pill Container */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
            {/* Scroll Left Arrow */}
            <button
              onClick={() => categoryScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
              aria-label="Scroll categories left"
              className="store-category-arrow"
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                border: '1.5px solid #E5E5E5',
                background: '#fff',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F7F7F7'; e.currentTarget.style.borderColor = '#CCC'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#E5E5E5'; }}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Category filter pills (Horizontal Scroll without scrollbars) */}
            <div
              ref={categoryScrollRef}
              className="store-filter-pills"
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: 8,
                overflowX: 'auto',
                flex: 1,
                minWidth: 0,
                padding: '2px 0',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 700,
                    border: activeCategory === cat ? '2px solid #E23636' : '2px solid #DCDCDC',
                    background: activeCategory === cat ? '#E23636' : '#fff',
                    color: activeCategory === cat ? '#fff' : '#555',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    boxShadow: activeCategory === cat ? '0 2px 10px rgba(226,54,54,0.32)' : 'none',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Scroll Right Arrow */}
            <button
              onClick={() => categoryScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
              aria-label="Scroll categories right"
              className="store-category-arrow"
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                border: '1.5px solid #E5E5E5',
                background: '#fff',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F7F7F7'; e.currentTarget.style.borderColor = '#CCC'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#E5E5E5'; }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Pure Filter Icon Button */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setSortDropdownOpen(prev => !prev)}
              aria-label="Filter & Sort"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                background: sortDropdownOpen ? 'rgba(226,54,54,0.08)' : '#fff',
                border: sortDropdownOpen ? '1.5px solid #E23636' : '1.5px solid #DCDCDC',
                borderRadius: 10,
                color: sortDropdownOpen ? '#E23636' : '#1A1A1A',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                if (!sortDropdownOpen) {
                  e.currentTarget.style.borderColor = '#111';
                  e.currentTarget.style.background = '#F7F7F7';
                }
              }}
              onMouseLeave={e => {
                if (!sortDropdownOpen) {
                  e.currentTarget.style.borderColor = '#DCDCDC';
                  e.currentTarget.style.background = '#fff';
                }
              }}
            >
              <SlidersHorizontal size={17} color={sortDropdownOpen ? '#E23636' : '#111'} />
            </button>


            {/* Dropdown Popup */}
            {sortDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  background: '#fff',
                  borderRadius: 12,
                  border: '1.5px solid #EAEAEA',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.16)',
                  padding: 6,
                  zIndex: 40,
                  minWidth: 175,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                {[
                  { id: 'featured', label: 'Featured Drops' },
                  { id: 'price-low', label: 'Price: Low to High' },
                  { id: 'price-high', label: 'Price: High to Low' },
                  { id: 'rating', label: 'Top Rated' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setSortBy(opt.id as any); setSortDropdownOpen(false); }}
                    style={{
                      padding: '8px 12px',
                      textAlign: 'left',
                      fontSize: 12.5,
                      fontWeight: sortBy === opt.id ? 800 : 600,
                      color: sortBy === opt.id ? '#E23636' : '#222',
                      background: sortBy === opt.id ? 'rgba(226,54,54,0.08)' : 'transparent',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { if (sortBy !== opt.id) e.currentTarget.style.background = '#F7F7F7'; }}
                    onMouseLeave={e => { if (sortBy !== opt.id) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span>{opt.label}</span>
                    {sortBy === opt.id && <Check size={14} color="#E23636" />}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>



      {/* ── PRODUCT GRID ── */}
      <div className="store-product-grid-wrap" style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px 60px' }}>
        <div className="store-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
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
                style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'default' }}
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
                  style={{ position: 'relative', aspectRatio: '1.05', background: '#ECECEC', overflow: 'hidden', cursor: 'pointer', display: 'block' }}
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
                        padding: '10px',
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 800,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        background: justAdded ? '#16a34a' : '#E23636',
                        color: '#fff',
                        boxShadow: '0 4px 16px rgba(226,54,54,0.45)',
                        transition: 'background 0.2s',
                      }}
                    >
                      {justAdded ? <><Check size={15} /> Added!</> : <><Plus size={15} /> Add to Cart</>}
                    </button>
                  </div>
                </Link>

                {/* Info (Compact height on PC) */}
                <div className="store-product-card-body" style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1, borderTop: '1px solid #EBEBEB' }}>
                  <p style={{ fontSize: 11, color: '#B0B0B0', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.subtitle}
                  </p>
                  <Link
                    href={`/2/${product.id}`}
                    style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.25, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textDecoration: 'none' } as React.CSSProperties}
                  >
                    {product.name}
                  </Link>

                  {/* Price & Mobile Quick Add */}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginTop: 'auto', paddingTop: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.02em' }}>${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span style={{ fontSize: 12, color: '#bbb', textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); addToCart(product); }}
                      className="mobile-quick-add-btn"
                      aria-label="Add to cart"
                      style={{
                        background: justAdded ? '#16a34a' : '#E23636',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        width: 32,
                        height: 32,
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(226,54,54,0.35)',
                      }}
                    >
                      {justAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
                    </button>

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
        <div className="store-trust-strip" style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center' }}>
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
        <div className="store-footer-inner" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
          <div>
            <Image
              src="/logo.png"
              alt="Oh My Marvz"
              width={130}
              height={36}
              style={{ objectFit: 'contain', height: 28, width: 'auto', marginBottom: 12, filter: 'brightness(1.1)' }}
            />
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
