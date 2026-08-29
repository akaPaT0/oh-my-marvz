'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Truck, MapPin } from 'lucide-react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeDeliveryThreshold = 50; // $50 threshold for free doorstep delivery
  const isFreeDelivery = subtotal >= freeDeliveryThreshold || subtotal === 0;
  const deliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const shipping = isFreeDelivery ? 0 : 3.00;
  const discountAmount = (subtotal * discount) / 100;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const applyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'MARVZ10' || code === 'OHMYMARVZ' || code === 'VIP10') {
      setDiscount(15);
      setPromoApplied(true);
    } else {
      setPromoError('Invalid code. Try "MARVZ10"');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-white flex flex-col justify-between shadow-2xl border-l border-zinc-200 text-zinc-900 overflow-hidden">
          {/* ── HEADER ── */}
          <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E23636] flex-shrink-0">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-zinc-900 tracking-tight">Your Cart</h2>
                  <span className="bg-[#E23636] text-white text-[11px] font-black px-2 py-0.5 rounded-full">
                    {totalItemsCount}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 font-medium">Verified Authentic Lebanese Vault</p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close cart"
              className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* ── FREE DELIVERY PROGRESS BAR ── */}
          {items.length > 0 && (
            <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-zinc-800 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#E23636]" />
                  {isFreeDelivery ? (
                    <span className="text-emerald-700 font-extrabold">🎉 You unlocked FREE Delivery in Lebanon!</span>
                  ) : (
                    <span>Add <strong className="text-[#E23636] font-mono">${amountToFreeDelivery.toFixed(2)}</strong> for Free Delivery</span>
                  )}
                </span>
                <span className="text-[11px] font-mono font-bold text-zinc-500">{deliveryProgress}%</span>
              </div>
              <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#E23636] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${deliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* ── CART ITEMS LIST ── */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12 text-zinc-400">
                <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-100">
                  <ShoppingBag className="w-10 h-10 text-[#E23636] stroke-[1.5]" />
                </div>
                <h3 className="font-extrabold text-zinc-900 text-base mb-1">Your cart is empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs mb-6 leading-relaxed">
                  Discover rare figures, metal keychains, and high-detail statues ready for doorstep delivery across Lebanon.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-[#E23636] hover:bg-[#C52222] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-red-500/20 cursor-pointer"
                >
                  Explore Collectibles
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${idx}`}
                  className="group flex gap-3.5 p-3.5 bg-white border border-zinc-200/90 rounded-2xl shadow-xs hover:border-zinc-300 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-zinc-50 border border-zinc-100 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 p-1 relative">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    ) : (
                      <span className="font-black text-base text-zinc-400">{item.product.name.charAt(0)}</span>
                    )}
                  </div>

                  {/* Info & Stepper */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-xs text-zinc-900 line-clamp-1 leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          aria-label="Remove item"
                          className="text-zinc-400 hover:text-[#E23636] p-1 rounded-md transition-colors cursor-pointer flex-shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-bold text-zinc-500 font-mono">
                          ${item.product.price.toFixed(2)}
                        </span>
                        {item.product.category && (
                          <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 uppercase">
                            {item.product.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom row: Stepper + Total */}
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-zinc-100">
                      <div className="flex items-center bg-zinc-100 border border-zinc-200 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 rounded flex items-center justify-center text-zinc-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-black font-mono text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-zinc-600 hover:bg-white transition-all cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-black text-sm text-zinc-900 font-mono">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ── FOOTER & SUMMARY ── */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-white space-y-3.5 shadow-lg">
              {/* Promo Code Input */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo Code (MARVZ10)"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoError('');
                      }}
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs pl-8 pr-3 py-2.5 rounded-xl font-mono uppercase focus:outline-none focus:border-zinc-400 text-zinc-900"
                    />
                  </div>
                  <button
                    onClick={applyPromo}
                    className="bg-zinc-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-red-500 font-medium pl-1">{promoError}</p>}
              </div>

              {promoApplied && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 flex justify-between items-center">
                  <span>🎉 15% VIP Discount Applied</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600 font-medium pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-zinc-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <span>Lebanon Delivery</span>
                    <span className="text-[10px] text-zinc-400">(Doorstep / BAU Pickup)</span>
                  </span>
                  <span className={`font-mono font-bold ${shipping === 0 ? 'text-emerald-600' : 'text-zinc-900'}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-base font-black text-zinc-900 pt-2 border-t border-zinc-200">
                  <span>Estimated Total</span>
                  <span className="text-lg text-[#E23636] font-mono">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Lebanese delivery info badge */}
              <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-zinc-600">
                <MapPin className="w-3.5 h-3.5 text-[#E23636] flex-shrink-0" />
                <span>Pay on Doorstep Delivery or Free BAU Beirut Pickup</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-between bg-[#E23636] hover:bg-[#C52222] text-white font-extrabold py-3.5 px-5 rounded-xl text-sm transition-all shadow-md shadow-red-500/25 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <div className="flex items-center gap-2 font-mono">
                  <span>${total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
