'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Truck, Sparkles, ArrowRight, DollarSign } from 'lucide-react';
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
  const deliveryFee = fulfillmentType === 'pickup' ? 0 : 3.00; // $3 delivery fee across Lebanon
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
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#ffee00', '#ff2244', '#0088ff', '#00cc66'],
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border-5 border-black comic-shadow-lg p-6 sm:p-8 text-black">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-4 border-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ff2244] border-3 border-black flex items-center justify-center text-[#ffee00] font-black text-xl shadow-[3px_3px_0_#000]">
              M!
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-wider italic">OH MY MARVZ LEBANON CHECKOUT</h2>
              <p className="text-xs font-mono font-bold text-zinc-600">
                {fulfillmentType === 'pickup' ? 'LOCAL PICKUP NEAR BAU (BEIRUT)' : 'DELIVERY ACROSS LEBANON'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 bg-[#ffee00] border-3 border-black text-black font-black hover:bg-black hover:text-white">
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Fulfillment Selection */}
        {step === 'shipping' && (
          <form onSubmit={handleSubmitShipping} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFulfillmentType('delivery')}
                className={`p-3 border-3 border-black font-black text-xs uppercase flex items-center justify-center gap-2 ${
                  fulfillmentType === 'delivery' ? 'bg-[#ff2244] text-white shadow-[3px_3px_0_#000]' : 'bg-white text-black'
                }`}
              >
                <Truck className="w-4 h-4 stroke-[3]" />
                <span>LEBANON DELIVERY ($3.00)</span>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentType('pickup')}
                className={`p-3 border-3 border-black font-black text-xs uppercase flex items-center justify-center gap-2 ${
                  fulfillmentType === 'pickup' ? 'bg-[#ffee00] text-black shadow-[3px_3px_0_#000]' : 'bg-white text-black'
                }`}
              >
                <MapPin className="w-4 h-4 stroke-[3]" />
                <span>BAU BEIRUT PICKUP (FREE)</span>
              </button>
            </div>

            <div>
              <label className="text-xs font-mono font-bold block mb-1">FULL NAME</label>
              <input
                required
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#fffdf0] border-3 border-black text-xs font-bold text-black px-3 py-2 focus:outline-none uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-bold block mb-1">PHONE / WHATSAPP (LEBANON)</label>
                <input
                  required
                  type="tel"
                  placeholder="+961 70 123 456"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#fffdf0] border-3 border-black text-xs font-bold text-black px-3 py-2 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold block mb-1">CITY / AREA IN LEBANON</label>
                <input
                  required
                  type="text"
                  placeholder="Beirut, Tripoli, Saida, Jounieh..."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#fffdf0] border-3 border-black text-xs font-bold text-black px-3 py-2 focus:outline-none uppercase"
                />
              </div>
            </div>

            {fulfillmentType === 'delivery' ? (
              <div>
                <label className="text-xs font-mono font-bold block mb-1">STREET ADDRESS / DELIVERY DETAILS</label>
                <input
                  required
                  type="text"
                  placeholder="Building, Floor, Street details..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#fffdf0] border-3 border-black text-xs font-bold text-black px-3 py-2 focus:outline-none uppercase"
                />
              </div>
            ) : (
              <div className="p-3 bg-[#ffee00] border-3 border-black text-xs font-mono font-bold text-black">
                📍 PICKUP LOCATION: Beirut Arab University (BAU) Main Gate area. We will contact you via WhatsApp to coordinate timing!
              </div>
            )}

            <div className="pt-4 flex justify-between items-center border-t-3 border-black">
              <span className="text-xs font-mono font-bold">TOTAL: <strong className="bg-[#ffee00] px-2 py-0.5 border border-black">${total.toFixed(2)}</strong></span>
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#ff2244] hover:bg-[#ff0033] text-white font-black text-xs px-6 py-3 border-3 border-black uppercase shadow-[4px_4px_0_#000]"
              >
                <span>NEXT: PAYMENT</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && (
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold block">PAYMENT METHOD</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-4 border-3 border-black font-black text-xs uppercase flex items-center justify-center gap-2 ${
                    formData.paymentMethod === 'cod' ? 'bg-[#ffee00] text-black shadow-[3px_3px_0_#000]' : 'bg-white'
                  }`}
                >
                  <DollarSign className="w-5 h-5 stroke-[3]" />
                  <span>CASH ON DELIVERY (USD / LBP)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'wish' })}
                  className={`p-4 border-3 border-black font-black text-xs uppercase flex items-center justify-center gap-2 ${
                    formData.paymentMethod === 'wish' ? 'bg-[#0088ff] text-white shadow-[3px_3px_0_#000]' : 'bg-white'
                  }`}
                >
                  <Sparkles className="w-5 h-5 stroke-[3]" />
                  <span>WHISH MONEY / OMT</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#fffdf0] border-3 border-black text-xs font-mono font-bold">
              <p>ORDER SUMMARY:</p>
              <ul className="mt-1 space-y-1">
                <li>SUBTOTAL: ${subtotal.toFixed(2)}</li>
                <li>FULFILLMENT: {fulfillmentType === 'pickup' ? 'BAU Beirut Pickup (FREE)' : `Lebanon Delivery ($${deliveryFee.toFixed(2)})`}</li>
                <li className="text-sm font-black text-[#ff2244] border-t border-black pt-1 mt-1">TOTAL AMOUNT: ${total.toFixed(2)}</li>
              </ul>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep('shipping')}
                className="text-xs font-mono font-bold text-zinc-600 hover:text-black"
              >
                ← BACK
              </button>
              <button
                onClick={handleCompleteOrder}
                className="flex items-center gap-2 bg-[#00cc66] hover:bg-emerald-500 text-white font-black text-xs px-6 py-3 border-3 border-black uppercase shadow-[4px_4px_0_#000]"
              >
                <ShieldCheck className="w-4 h-4 stroke-[3]" />
                <span>CONFIRM ORDER (${total.toFixed(2)})</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="py-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-[#ffee00] border-4 border-black flex items-center justify-center text-black font-black text-4xl shadow-[6px_6px_0_#000] transform -rotate-6">
              ✨
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-black text-black uppercase italic">MABROUK! ORDER RECEIVED!</h3>
              <p className="text-black text-xs font-bold max-w-md mx-auto">
                THANK YOU FOR SHOPPING AT <strong className="bg-[#ff2244] text-white px-1">Oh my Marvz</strong>! WE WILL CONTACT YOU VIA WHATSAPP ({formData.phone || '+961'}) TO CONFIRM YOUR LEBANON DELIVERY OR BAU PICKUP.
              </p>
            </div>

            <div className="inline-block bg-[#ffee00] border-3 border-black px-6 py-2 text-xs font-mono font-black text-black shadow-[3px_3px_0_#000]">
              REF #: MARVZ-LB-8891
            </div>

            <div>
              <button
                onClick={onClose}
                className="bg-black text-white font-black text-xs px-8 py-3 border-3 border-black uppercase shadow-[4px_4px_0_#ffee00]"
              >
                BACK TO STORE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
