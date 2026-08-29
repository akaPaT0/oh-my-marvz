'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  MapPin,
  Tag,
  Share2,
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/data/products';
import { ViewSwitcher } from '@/components/ViewSwitcher';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = INITIAL_PRODUCTS.find(p => p.id === slug);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div style={{ fontFamily: "'Inter', system-ui, sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, color: '#1A1A1A' }}>
        <p style={{ fontSize: 20, fontWeight: 700 }}>Product not found</p>
        <Link href="/2" style={{ fontSize: 14, color: '#C96A00', textDecoration: 'none', fontWeight: 600 }}>← Back to shop</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Use same image multiple times as "gallery" since we only have one per product
  const images = [product.image, product.image, product.image];

  // Related products: same franchise, different id
  const related = INITIAL_PRODUCTS.filter(p => p.franchise === product.franchise && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#F4F4F4', minHeight: '100vh', color: '#1A1A1A' }}>
      <style>{`
        @media (max-width: 768px) {
          .slug-header-inner { padding: 0 16px !important; }
          .slug-breadcrumb { padding: 10px 16px !important; font-size: 12px !important; overflow-x: auto; white-space: nowrap; }
          .slug-main-grid { grid-template-columns: 1fr !important; gap: 24px !important; padding: 0 16px 48px !important; }
          .slug-img-col { position: static !important; }
          .slug-related-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .slug-related-inner { padding: 0 16px !important; }
          .slug-h1 { font-size: 22px !important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #E8E8E8', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
        <div className="slug-header-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', height: 62, gap: 16 }}>
          <Link href="/2" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555', textDecoration: 'none', fontSize: 14, fontWeight: 600, transition: 'color 0.15s' }}>
            <ArrowLeft size={16} />
            <span>Shop</span>
          </Link>
          <div style={{ width: 1, height: 20, background: '#E0E0E0' }} />
          <Link href="/2" style={{ fontWeight: 900, fontSize: 16, letterSpacing: '-0.03em', color: '#1A1A1A', textDecoration: 'none' }}>
            OH MY MARVZ
          </Link>
          <div style={{ flex: 1 }} />
          <Link
            href="/2"
            style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#1A1A1A', color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
          >
            <ShoppingCart size={15} />
            <span>Cart</span>
          </Link>
        </div>
      </header>

      {/* ── BREADCRUMB ── */}
      <div className="slug-breadcrumb" style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 28px', display: 'flex', gap: 8, fontSize: 13, color: '#999', alignItems: 'center' }}>
        <Link href="/2" style={{ color: '#999', textDecoration: 'none' }}>Shop</Link>
        <span>/</span>
        <span style={{ color: '#999', textTransform: 'capitalize' }}>{product.franchise}</span>
        <span>/</span>
        <span style={{ color: '#1A1A1A', fontWeight: 600 }}>{product.name}</span>
      </div>

      {/* ── PRODUCT BODY ── */}
      <div className="slug-main-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>

        {/* Left: Images */}
        <div className="slug-img-col" style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 82 }}>
          {/* Main image */}
          <div style={{ position: 'relative', aspectRatio: '1', background: '#ECECEC', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
            <img
              src={images[activeImg]}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
            />
            {discount && (
              <div style={{ position: 'absolute', top: 16, left: 16, background: '#DC2626', color: '#fff', fontSize: 13, fontWeight: 700, padding: '4px 12px', borderRadius: 8 }}>
                −{discount}% OFF
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: 10 }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{ flex: 1, aspectRatio: '1', background: '#ECECEC', borderRadius: 10, overflow: 'hidden', border: activeImg === i ? '2.5px solid #1A1A1A' : '2.5px solid transparent', cursor: 'pointer', padding: 0, position: 'relative' }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 4 }}>

          {/* Badges row */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#C96A00', background: 'rgba(201,106,0,0.1)', padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {product.franchise}
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#555', background: '#F0F0F0', padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {product.category.replace(/-/g, ' ')}
            </span>
            {product.tag && (
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: '#1A1A1A', padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                {product.tag}
              </span>
            )}
          </div>

          {/* Name */}
          <div>
            <p style={{ fontSize: 12, color: '#B0B0B0', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, margin: '0 0 8px' }}>{product.subtitle}</p>
            <h1 className="slug-h1" style={{ fontSize: 28, fontWeight: 900, color: '#1A1A1A', margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {product.name}
            </h1>
          </div>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} style={{ fill: i < Math.round(product.rating) ? '#F59E0B' : '#E5E7EB', color: i < Math.round(product.rating) ? '#F59E0B' : '#E5E7EB' }} />
              ))}
            </div>
            <span style={{ fontSize: 14, color: '#555', fontWeight: 600 }}>{product.rating.toFixed(1)}</span>
            <span style={{ fontSize: 13, color: '#aaa' }}>({product.reviewsCount} reviews)</span>
          </div>

          {/* Price block */}
          <div style={{ padding: '18px 20px', background: '#fff', borderRadius: 14, border: '1.5px solid #E8E8E8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontSize: 34, fontWeight: 900, color: '#1A1A1A', letterSpacing: '-0.03em' }}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span style={{ fontSize: 16, color: '#C0C0C0', textDecoration: 'line-through', fontWeight: 500 }}>${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', background: 'rgba(22,163,74,0.1)', padding: '5px 14px', borderRadius: 20 }}>
              ✓ In Stock
            </span>
          </div>

          {/* Description */}
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, margin: 0, padding: '16px 20px', background: '#fff', borderRadius: 12, border: '1px solid #F0F0F0' }}>
            {product.description}
          </p>

          {/* Details checklist */}
          {product.details?.length > 0 && (
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0F0F0', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>What's included</p>
              {product.details.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#F0F0F0', border: '1.5px solid #E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Check size={11} color="#1A1A1A" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 14, color: '#444', lineHeight: 1.5 }}>{d}</span>
                </div>
              ))}
            </div>
          )}

          {/* Qty + CTA */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #E0E0E0', borderRadius: 12, overflow: 'hidden', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 44, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}>
                <Minus size={16} />
              </button>
              <span style={{ width: 36, textAlign: 'center', fontSize: 16, fontWeight: 800, color: '#1A1A1A' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ width: 44, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}>
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              style={{
                flex: 1, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: added ? '#16a34a' : '#1A1A1A',
                color: '#fff', border: 'none', borderRadius: 12,
                fontSize: 15, fontWeight: 800, cursor: 'pointer',
                boxShadow: added ? '0 4px 20px rgba(22,163,74,0.35)' : '0 4px 20px rgba(0,0,0,0.22)',
                transition: 'background 0.2s, box-shadow 0.2s',
                letterSpacing: '-0.01em',
              }}
            >
              {added ? (
                <><Check size={18} /> Added to Cart!</>
              ) : (
                <><ShoppingCart size={18} /> Add to Cart · ${(product.price * quantity).toFixed(2)}</>
              )}
            </button>

            <button
              onClick={() => setWishlisted(!wishlisted)}
              style={{ width: 52, height: 52, background: '#fff', border: '1.5px solid #E0E0E0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            >
              <Heart size={18} style={{ fill: wishlisted ? '#ef4444' : 'none', color: wishlisted ? '#ef4444' : '#888' }} />
            </button>
          </div>

          {/* Trust strips */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { icon: Truck, text: 'Lebanon delivery' },
              { icon: ShieldCheck, text: '100% Authentic' },
              { icon: MapPin, text: 'BAU pickup' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 8px', background: '#fff', borderRadius: 12, border: '1px solid #F0F0F0', textAlign: 'center' }}>
                <Icon size={18} color="#C96A00" />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#555' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RELATED PRODUCTS ── */}
      {related.length > 0 && (
        <div style={{ background: '#fff', borderTop: '1.5px solid #E8E8E8', padding: '40px 0' }}>
          <div className="slug-related-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', margin: '0 0 20px', letterSpacing: '-0.02em' }}>More from {product.franchise === 'marvel' ? 'Marvel' : 'Anime'}</h2>
            <div className="slug-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {related.map(p => {
                const disc = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : null;
                return (
                  <Link
                    key={p.id}
                    href={`/2/${p.id}`}
                    style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #F0F0F0', transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.13)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'; }}
                  >
                    <div style={{ position: 'relative', aspectRatio: '1', background: '#ECECEC', overflow: 'hidden' }}>
                      <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {disc && <span style={{ position: 'absolute', top: 8, left: 8, background: '#DC2626', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>−{disc}%</span>}
                    </div>
                    <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as React.CSSProperties}>{p.name}</p>
                      <span style={{ fontSize: 15, fontWeight: 800, color: '#1A1A1A' }}>${p.price.toFixed(2)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <ViewSwitcher />
    </div>
  );
}

