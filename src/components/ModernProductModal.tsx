'use client';

import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, Check, MapPin, Minus, Plus, Heart, Shield } from 'lucide-react';
import { Product } from '@/data/products';

interface ModernProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const ModernProductModal: React.FC<ModernProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setAdded(false);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [product]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  const handleAdd = () => {
    onAddToCart(product!, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          transition: 'opacity 0.2s',
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 820,
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 24px 80px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.1)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          transition: 'transform 0.22s cubic-bezier(0.34,1.2,0.64,1), opacity 0.2s ease',
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(20px)',
          opacity: visible ? 1 : 0,
        }}
      >
        {/* ── LEFT: Image ── */}
        <div style={{ position: 'relative', background: '#ECECEC', borderRadius: '16px 0 0 16px', overflow: 'hidden', minHeight: 380, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />

          {/* Discount badge */}
          {discount && (
            <div style={{ position: 'absolute', top: 14, left: 14, background: '#DC2626', color: '#fff', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>
              −{discount}%
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={() => setWishlisted(!wishlisted)}
            style={{ position: 'absolute', top: 14, right: 14, width: 36, height: 36, background: 'rgba(255,255,255,0.95)', border: '1px solid #E0E0E0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Heart size={16} style={{ fill: wishlisted ? '#ef4444' : 'none', color: wishlisted ? '#ef4444' : '#888' }} />
          </button>
        </div>

        {/* ── RIGHT: Details ── */}
        <div style={{ padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>

          {/* Close */}
          <button
            onClick={handleClose}
            style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, background: '#F4F4F4', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#888' }}
          >
            <X size={16} />
          </button>

          {/* Category badge */}
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#C96A00', textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(201,106,0,0.08)', padding: '3px 10px', borderRadius: 20 }}>
              {product.franchise} · {product.category}
            </span>
          </div>

          {/* Name */}
          <div>
            <p style={{ fontSize: 11, color: '#B0B0B0', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, margin: '0 0 6px' }}>{product.subtitle}</p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A', margin: 0, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              {product.name}
            </h2>
          </div>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} style={{ fill: i < Math.round(product.rating) ? '#F59E0B' : '#E5E7EB', color: i < Math.round(product.rating) ? '#F59E0B' : '#E5E7EB' }} />
              ))}
            </div>
            <span style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{product.rating.toFixed(1)} · {product.reviewsCount} reviews</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#F8F8F8', borderRadius: 12, border: '1.5px solid #EBEBEB' }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#1A1A1A', letterSpacing: '-0.03em' }}>${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span style={{ fontSize: 15, color: '#C0C0C0', textDecoration: 'line-through', fontWeight: 500 }}>${product.originalPrice.toFixed(2)}</span>
            )}
            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: '#16a34a', background: 'rgba(22,163,74,0.1)', padding: '3px 10px', borderRadius: 20 }}>In Stock</span>
          </div>

          {/* Description */}
          {product.description && (
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.65, margin: 0 }}>{product.description}</p>
          )}

          {/* Details checklist */}
          {product.details && product.details.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {product.details.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Check size={11} color="#1A1A1A" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{d}</span>
                </div>
              ))}
            </div>
          )}

          {/* Qty + Add to cart */}
          <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
            {/* Qty */}
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #E0E0E0', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 38, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}>
                <Minus size={14} />
              </button>
              <span style={{ width: 32, textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ width: 38, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}>
                <Plus size={14} />
              </button>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              style={{
                flex: 1, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: added ? '#16a34a' : '#1A1A1A',
                color: '#fff', border: 'none', borderRadius: 10,
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
                boxShadow: added ? '0 4px 16px rgba(22,163,74,0.3)' : '0 4px 16px rgba(0,0,0,0.2)',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
            >
              {added ? (
                <><Check size={16} /> Added to Cart!</>
              ) : (
                <><ShoppingCart size={16} /> Add to Cart · ${(product.price * quantity).toFixed(2)}</>
              )}
            </button>
          </div>

          {/* Shipping note */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#F8F8F8', borderRadius: 10, border: '1px solid #EBEBEB' }}>
            <MapPin size={15} color="#C96A00" />
            <span style={{ fontSize: 12, color: '#888', fontWeight: 500 }}>Lebanon delivery · Free BAU Beirut campus pickup</span>
          </div>
        </div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 620px) {
          .modal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
