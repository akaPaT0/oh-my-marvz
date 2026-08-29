'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { FeaturedVault } from '@/components/FeaturedVault';
import { LebanonDeliveryBanner } from '@/components/LebanonDeliveryBanner';
import { LettersToEditor } from '@/components/LettersToEditor';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductQuickView } from '@/components/ProductQuickView';
import { CartDrawer, CartItem } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { INITIAL_PRODUCTS, Product } from '@/data/products';
import { ArrowUpDown } from 'lucide-react';
import { ViewSwitcher } from '@/components/ViewSwitcher';


export default function Home() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'all' | 'featured' | 'price-low' | 'price-high' | 'rating'>('all');
  
  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          activeCategory === 'all' ||
          p.category === activeCategory ||
          p.category.includes(activeCategory) ||
          (activeCategory === 'keychains' && p.category.includes('keychain')) ||
          (activeCategory === 'pops' && p.category.includes('pop')) ||
          p.highlightCategory?.toLowerCase() === activeCategory.toLowerCase();

        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'featured') return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        return 0; // 'all' default catalog order
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#eef0f2] text-black selection:bg-red-600 selection:text-white">
      {/* Header */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Main Area */}
      <main className="flex-1 w-full space-y-4">
        {/* Top Hero Comic Featured Products Showcase + 4 Quick Filter Buttons */}
        <HeroBanner
          featuredProducts={products.filter((p) => p.isFeatured)}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            const el = document.getElementById('full-arsenal-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Fast Lebanon Delivery & BAU Beirut Pickup Banner */}
        <LebanonDeliveryBanner />

        {/* Multiverse Arsenal Catalog Grid (Shows All Products) */}
        <section id="full-arsenal-section" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 border-black pb-3">
            <div className="comic-ribbon-yellow px-4 py-1.5 inline-block transform -rotate-1">
              <h2 className="text-base sm:text-lg font-black uppercase text-black italic">
                MULTIVERSE ARSENAL VAULT ({filteredProducts.length} PRODUCTS)
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex items-center bg-white border-2 border-black px-3 py-1 text-xs font-black shadow-[2px_2px_0_#111]">
                <ArrowUpDown className="w-3.5 h-3.5 text-black mr-1" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-black text-black focus:outline-none cursor-pointer uppercase font-mono"
                >
                  <option value="all">SORT: ALL PRODUCTS</option>
                  <option value="rating">HIGHEST RATED</option>
                  <option value="featured">FEATURED DROPS</option>
                  <option value="price-low">PRICE: LOW TO HIGH</option>
                  <option value="price-high">PRICE: HIGH TO LOW</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setQuickViewProduct(p)}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
              />
            ))}
          </div>
        </section>

        {/* Letters to the Editor */}
        <LettersToEditor />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
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
