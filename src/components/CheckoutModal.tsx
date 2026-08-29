'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, CheckCircle2, ShieldCheck, MapPin, Truck, Sparkles, ArrowRight, DollarSign, CreditCard, ChevronRight, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from './CartDrawer';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Beirut',
    address: '',
    notes: '',
    paymentMethod: 'cod', // Cash on delivery is standard in Lebanon
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= 50;
  const deliveryFee = fulfillmentType === 'pickup' || isFreeDelivery ? 0 : 3.00;
  const total = subtotal + deliveryFee;

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    setStep('success');
    onClearCart();

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E23636', '#111111', '#10B981', '#F59E0B'],
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-zinc-200/80 p-6 sm:p-8 text-zinc-900 overflow-hidden"
        style={{ animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* ── HEADER ── */}
        <div className="flex items-center justify-between pb-5 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Oh My Marvz"
              width={130}
              height={36}
              className="h-8 w-auto object-contain"
            />
            <div className="h-4 w-px bg-zinc-200" />
            <div>
              <h2 className="text-sm font-black text-zinc-900 tracking-tight">Lebanon Express Checkout</h2>
              <p className="text-[11px] text-zinc-500 font-medium">
                {fulfillmentType === 'pickup' ? 'Free BAU Beirut Campus Pickup' : 'Fast 24-48h Lebanon Delivery'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── STEP INDICATOR ── */}
        {step !== 'success' && (
          <div className="flex items-center justify-between py-3 px-1 border-b border-zinc-100 text-xs font-bold text-zinc-400">
            <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-[#E23636]' : 'text-zinc-900'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'shipping' ? 'bg-[#E23636] text-white' : 'bg-zinc-900 text-white'}`}>
                1
              </span>
              <span>Delivery Details</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#E23636]' : 'text-zinc-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-[#E23636] text-white' : 'bg-zinc-200 text-zinc-600'}`}>
                2
              </span>
              <span>Payment & Review</span>
            </div>
          </div>
        )}

        {/* ── STEP 1: SHIPPING & FULFILLMENT ── */}
        {step === 'shipping' && (
          <form onSubmit={handleSubmitShipping} className="space-y-4 pt-4">
            {/* Fulfillment Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFulfillmentType('delivery')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  fulfillmentType === 'delivery'
                    ? 'border-[#E23636] bg-red-50/40 shadow-xs ring-1 ring-[#E23636]'
                    : 'border-zinc-200 bg-white hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Truck className={`w-4 h-4 ${fulfillmentType === 'delivery' ? 'text-[#E23636]' : 'text-zinc-500'}`} />
                    <span className="text-xs font-black text-zinc-900">Doorstep Delivery</span>
                  </div>
                  {fulfillmentType === 'delivery' && <Check className="w-3.5 h-3.5 text-[#E23636]" />}
                </div>
                <span className="text-[11px] font-bold text-zinc-500">
                  {isFreeDelivery ? '🎉 FREE (Order > $50)' : '$3.00 (All Lebanon)'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentType('pickup')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  fulfillmentType === 'pickup'
                    ? 'border-[#E23636] bg-red-50/40 shadow-xs ring-1 ring-[#E23636]'
                    : 'border-zinc-200 bg-white hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${fulfillmentType === 'pickup' ? 'text-[#E23636]' : 'text-zinc-500'}`} />
                    <span className="text-xs font-black text-zinc-900">BAU Beirut Pickup</span>
                  </div>
                  {fulfillmentType === 'pickup' && <Check className="w-3.5 h-3.5 text-[#E23636]" />}
                </div>
                <span className="text-[11px] font-bold text-emerald-600">FREE Campus Pickup</span>
              </button>
            </div>

            {/* Inputs */}
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-900 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Phone / WhatsApp (Lebanon)</label>
                <div className="relative">
                  <input
                    required
                    type="tel"
                    placeholder="+961 70 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs font-mono font-bold text-zinc-900 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">City / Region in Lebanon</label>
                <input
                  required
                  type="text"
                  placeholder="Beirut, Tripoli, Saida, Jounieh..."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-900 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {fulfillmentType === 'delivery' ? (
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Street Address / Delivery Notes</label>
                <input
                  required
                  type="text"
                  placeholder="Building, Floor, Landmark, Street details..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-900 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
                />
              </div>
            ) : (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-zinc-700 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E23636] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>BAU Beirut Pickup:</strong> Main Gate / Campus area. We will WhatsApp you at ({formData.phone || '+961'}) to coordinate timing!
                </span>
              </div>
            )}

            {/* Bottom Bar */}
            <div className="pt-4 flex justify-between items-center border-t border-zinc-100">
              <div className="flex flex-col">
                <span className="text-[11px] text-zinc-500 font-medium">Total Amount</span>
                <span className="text-lg font-black text-[#E23636] font-mono">${total.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#E23636] hover:bg-[#C52222] text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-red-500/20 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ── STEP 2: PAYMENT & CONFIRMATION ── */}
        {step === 'payment' && (
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-2">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#E23636] bg-red-50/40 shadow-xs ring-1 ring-[#E23636]'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <DollarSign className={`w-4 h-4 ${formData.paymentMethod === 'cod' ? 'text-[#E23636]' : 'text-zinc-500'}`} />
                      <span className="text-xs font-black text-zinc-900">Cash on Delivery</span>
                    </div>
                    {formData.paymentMethod === 'cod' && <Check className="w-3.5 h-3.5 text-[#E23636]" />}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-500">Pay in USD or LBP</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'wish' })}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                    formData.paymentMethod === 'wish'
                      ? 'border-[#E23636] bg-red-50/40 shadow-xs ring-1 ring-[#E23636]'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Sparkles className={`w-4 h-4 ${formData.paymentMethod === 'wish' ? 'text-[#E23636]' : 'text-zinc-500'}`} />
                      <span className="text-xs font-black text-zinc-900">Whish / OMT</span>
                    </div>
                    {formData.paymentMethod === 'wish' && <Check className="w-3.5 h-3.5 text-[#E23636]" />}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-500">Instant Mobile Transfer</span>
                </button>
              </div>
            </div>

            {/* Order Review Card */}
            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600 font-medium">
                <span>Items ({items.reduce((a, b) => a + b.quantity, 0)})</span>
                <span className="font-mono font-bold text-zinc-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600 font-medium">
                <span>Fulfillment</span>
                <span className="font-mono font-bold text-zinc-900">
                  {fulfillmentType === 'pickup' ? 'BAU Beirut (FREE)' : deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-zinc-600 font-medium">
                <span>Recipient</span>
                <span className="font-bold text-zinc-900">{formData.name || 'Collector'} • {formData.phone}</span>
              </div>
              <div className="flex justify-between items-baseline text-sm font-black text-zinc-900 pt-2 border-t border-zinc-200">
                <span>Total Amount Due</span>
                <span className="text-base font-mono text-[#E23636]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-900 cursor-pointer"
              >
                ← Back to Details
              </button>
              <button
                type="button"
                onClick={handleCompleteOrder}
                className="flex items-center gap-2 bg-[#E23636] hover:bg-[#C52222] text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-red-500/25 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Order (${total.toFixed(2)})</span>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: ORDER SUCCESS ── */}
        {step === 'success' && (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200 shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-red-50 text-[#E23636] uppercase tracking-wider">
                Order Confirmed
              </span>
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight pt-2">
                Mabrouk, {formData.name || 'Collector'}!
              </h3>
              <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
                Thank you for ordering from <strong>Oh My Marvz</strong>. Our Lebanese team will contact you via WhatsApp at <strong className="text-zinc-900">{formData.phone || '+961'}</strong> to confirm delivery or BAU pickup timing.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-xl text-xs font-mono text-zinc-700">
              <span>Order Reference:</span>
              <strong className="text-zinc-900 font-bold">MARVZ-LB-{Math.floor(1000 + Math.random() * 9000)}</strong>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                Back to Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
