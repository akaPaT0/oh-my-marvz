'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, ShieldCheck } from 'lucide-react';
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

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 3.00;
  const discountAmount = (subtotal * discount) / 100;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'MARVZ10' || promoCode.toUpperCase() === 'OHMYMARVZ') {
      setDiscount(15);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "MARVZ10" or "OHMYMARVZ"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white flex flex-col justify-between shadow-2xl border-l border-zinc-200 text-zinc-900">
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#e62429] text-white font-black rounded flex items-center justify-center text-sm">
                M!
              </div>
              <h2 className="text-lg font-bold text-zinc-900 uppercase">Shopping Bag</h2>
              <span className="bg-zinc-100 text-zinc-700 text-xs px-2 py-0.5 rounded font-mono font-bold">
                {items.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-black rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-zinc-400">
                <ShoppingBag className="w-12 h-12 stroke-1" />
                <p className="font-bold text-zinc-800 text-sm">Your bag is empty</p>
                <p className="text-xs">Explore our latest Marvel gadgets & statues.</p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${idx}`}
                  className="flex gap-4 p-3 bg-zinc-50 border border-zinc-200 rounded-xl"
                >
                  <div className="w-16 h-16 bg-white border border-zinc-200 rounded-lg flex items-center justify-center flex-shrink-0 p-1">
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="font-bold text-sm text-zinc-400">{item.product.name.charAt(0)}</span>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-xs text-zinc-900 line-clamp-1 pr-2">
                          {item.product.name}
                        </h4>
                        <button onClick={() => onRemoveItem(idx)} className="text-zinc-400 hover:text-[#e62429] p-0.5">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono">${item.product.price.toFixed(2)} each</span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center bg-white border border-zinc-200 rounded">
                        <button onClick={() => onUpdateQuantity(idx, item.quantity - 1)} className="px-2 py-0.5 text-xs text-zinc-500">
                          -
                        </button>
                        <span className="px-2 text-xs font-bold font-mono">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(idx, item.quantity + 1)} className="px-2 py-0.5 text-xs text-zinc-500">
                          +
                        </button>
                      </div>

                      <span className="font-extrabold text-sm text-zinc-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-white space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (MARVZ10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-zinc-50 border border-zinc-200 text-xs px-3 py-2 rounded-lg font-mono uppercase focus:outline-none"
                />
                <button onClick={applyPromo} className="bg-black text-white text-xs font-bold px-3 py-2 rounded-lg">
                  Apply
                </button>
              </div>

              {promoApplied && (
                <div className="text-xs font-mono text-emerald-600 flex justify-between">
                  <span>Discount (15% OFF)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-zinc-600 font-medium pt-2 border-t border-zinc-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Lebanon)</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-zinc-900 pt-2 border-t border-zinc-200">
                  <span>Total</span>
                  <span className="text-[#e62429]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2 bg-[#e62429] hover:bg-[#c41217] text-white font-bold py-3.5 rounded-lg text-sm transition-all shadow-sm"
              >
                <span>Checkout Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
