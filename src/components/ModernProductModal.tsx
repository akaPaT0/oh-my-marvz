'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  MapPin,
  Minus,
  Plus,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { Product } from '@/data/products';

interface ModernProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const ModernProductModal: React.FC<ModernProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Animate in
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
    setTimeout(onClose, 220);
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
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(6px)',
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Modal panel */}
      <div
        className="relative w-full sm:max-w-3xl sm:mx-4 sm:rounded-3xl overflow-hidden"
        style={{
          background: '#FAFAF7',
          boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.1)',
          maxHeight: '92vh',
          overflowY: 'auto',
          transition: 'transform 220ms cubic-bezier(0.34,1.26,0.64,1), opacity 200ms ease',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
          opacity: visible ? 1 : 0,
          borderRadius: '24px',
        }}
      >
        {/* ── TOP BAR ── */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{
            background: 'rgba(250,250,247,0.92)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div>
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(201,106,0,0.1)', color: '#c96a00' }}
            >
              {product.franchise} · {product.category}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
            style={{
              background: 'rgba(0,0,0,0.07)',
              color: 'rgba(0,0,0,0.5)',
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── BODY ── */}
        <div className="grid sm:grid-cols-2 gap-0">

          {/* Left: Image */}
          <div
            className="relative flex items-center justify-center"
            style={{ background: '#ECEAE2', minHeight: '320px' }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{ maxHeight: '420px' }}
            />

            {/* Discount badge */}
            {discount && (
              <div
                className="absolute top-4 left-4 text-white text-[12px] font-black px-3 py-1 rounded-full"
                style={{ background: '#c96a00', boxShadow: '0 2px 12px rgba(201,106,0,0.45)' }}
              >
                −{discount}%
              </div>
            )}

            {/* Wishlist */}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <Heart
                className="w-4 h-4 transition-colors"
                style={{
                  fill: wishlisted ? '#f43f5e' : 'none',
                  color: wishlisted ? '#f43f5e' : 'rgba(0,0,0,0.4)',
                }}
              />
            </button>
          </div>

          {/* Right: Details */}
          <div className="p-6 flex flex-col gap-5">

            {/* Name + subtitle */}
            <div>
              <p
                className="text-[11px] font-mono uppercase tracking-widest mb-1.5"
                style={{ color: 'rgba(0,0,0,0.35)' }}
              >
                {product.subtitle}
              </p>
              <h2
                className="text-2xl font-black tracking-[-0.03em] leading-tight"
                style={{ color: '#111' }}
              >
                {product.name}
              </h2>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5"
                    style={{
                      fill: i < Math.round(product.rating) ? '#c96a00' : 'rgba(0,0,0,0.1)',
                      color: i < Math.round(product.rating) ? '#c96a00' : 'rgba(0,0,0,0.1)',
                    }}
                  />
                ))}
              </div>
              <span className="text-[12px] font-semibold" style={{ color: 'rgba(0,0,0,0.4)' }}>
                {product.rating.toFixed(1)} · {product.reviewsCount} reviews
              </span>
            </div>

            {/* Price */}
            <div
              className="flex items-center justify-between p-4 rounded-2xl"
              style={{ background: '#ECEAE2', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-black tracking-[-0.02em]" style={{ fontSize: '28px', color: '#111' }}>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-[14px] font-medium line-through" style={{ color: 'rgba(0,0,0,0.3)' }}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <span
                className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(34,197,94,0.12)', color: '#16a34a' }}
              >
                In Stock
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.5)' }}>
                {product.description}
              </p>
            )}

            {/* Details */}
            {product.details && product.details.length > 0 && (
              <div className="space-y-2">
                {product.details.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(201,106,0,0.15)' }}
                    >
                      <Check className="w-2.5 h-2.5" style={{ color: '#c96a00' }} />
                    </div>
                    <span className="text-[12px] font-medium" style={{ color: 'rgba(0,0,0,0.55)' }}>
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + CTA */}
            <div className="flex items-center gap-3 mt-auto pt-2">
              {/* Qty */}
              <div
                className="flex items-center rounded-xl overflow-hidden shrink-0"
                style={{
                  border: '1.5px solid rgba(0,0,0,0.1)',
                  background: '#fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-black/5"
                  style={{ color: 'rgba(0,0,0,0.5)' }}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-9 text-center font-black text-[14px]" style={{ color: '#111' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-black/5"
                  style={{ color: 'rgba(0,0,0,0.5)' }}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-[13px] transition-all active:scale-95"
                style={
                  added
                    ? {
                        background: '#16a34a',
                        color: '#fff',
                        boxShadow: '0 4px 16px rgba(22,163,74,0.35)',
                      }
                    : {
                        background: '#111',
                        color: '#fff',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                      }
                }
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart · ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Shipping note */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[12px] font-medium"
              style={{ background: 'rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.45)' }}
            >
              <MapPin className="w-4 h-4 shrink-0" style={{ color: '#c96a00' }} />
              <span>Lebanon-wide delivery · Free BAU Beirut campus pickup</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
