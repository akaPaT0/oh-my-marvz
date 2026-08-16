'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_PRODUCTS, Product } from '@/data/products';
import {
  Package,
  DollarSign,
  ShoppingBag,
  Plus,
  Trash2,
  TrendingUp,
  MapPin,
  CheckCircle,
  Clock,
  Shield,
  Star,
  Search,
  ArrowLeft,
  UserCheck,
} from 'lucide-react';

interface MockOrder {
  id: string;
  customerName: string;
  phone: string;
  location: string;
  fulfillment: 'pickup' | 'delivery';
  itemsCount: number;
  totalPrice: number;
  status: 'pending' | 'ready' | 'completed';
  date: string;
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFranchiseFilter, setSelectedFranchiseFilter] = useState<'all' | 'marvel' | 'anime'>('all');

  // Mock Orders Data
  const [orders, setOrders] = useState<MockOrder[]>([
    {
      id: 'ORD-9021',
      customerName: 'Hadi Sleiman',
      phone: '+961 70 123 456',
      location: 'BAU Beirut Station (Pickup)',
      fulfillment: 'pickup',
      itemsCount: 2,
      totalPrice: 64.98,
      status: 'pending',
      date: 'Today, 2:45 PM',
    },
    {
      id: 'ORD-9020',
      customerName: 'Maya Khoury',
      phone: '+961 03 987 654',
      location: 'Achrafieh, Beirut',
      fulfillment: 'delivery',
      itemsCount: 1,
      totalPrice: 89.99,
      status: 'ready',
      date: 'Today, 11:20 AM',
    },
    {
      id: 'ORD-9019',
      customerName: 'Kareem El-Hajj',
      phone: '+961 76 554 321',
      location: 'Saida, South Lebanon',
      fulfillment: 'delivery',
      itemsCount: 3,
      totalPrice: 104.97,
      status: 'completed',
      date: 'Yesterday, 6:15 PM',
    },
  ]);

  // New Product Modal Form State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    subtitle: '',
    price: 19.99,
    franchise: 'marvel',
    category: 'figurines',
    inStock: true,
    isFeatured: false,
    description: '',
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const created: Product = {
      id: `custom-${Date.now()}`,
      name: newProduct.name || 'New Item',
      subtitle: newProduct.subtitle || 'Marvel & Anime Collectible',
      price: Number(newProduct.price) || 19.99,
      rating: 5.0,
      reviewsCount: 1,
      franchise: (newProduct.franchise as any) || 'marvel',
      category: (newProduct.category as any) || 'figurines',
      tag: 'NEW',
      description: newProduct.description || 'Authentic Marvel / Anime merch.',
      details: ['Official Quality Inspection', 'Lebanon Stock Available'],
      inStock: true,
      image: newProduct.image || '/products/ironman_figure.png',
      isFeatured: Boolean(newProduct.isFeatured),
    };

    setProducts([created, ...products]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      subtitle: '',
      price: 19.99,
      franchise: 'marvel',
      category: 'figurines',
      inStock: true,
      isFeatured: false,
      description: '',
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleToggleFeatured = (id: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchesFranchise =
      selectedFranchiseFilter === 'all' || p.franchise === selectedFranchiseFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFranchise && matchesSearch;
  });

  // Calculate Overview Stats
  const totalRevenue = products.reduce((acc, p) => acc + p.price, 0) * 12;
  const totalProducts = products.length;
  const marvelCount = products.filter((p) => p.franchise === 'marvel').length;
  const animeCount = products.filter((p) => p.franchise === 'anime').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#eef0f2] text-black selection:bg-red-600 selection:text-white font-sans">
      
      {/* --- DEDICATED ADMIN TOPBAR (Zero Public Nav Header) --- */}
      <header className="sticky top-0 z-40 bg-black text-white border-b-4 border-red-600 px-4 py-3 shadow-[0_4px_0_#111]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 border-2 border-white shadow-[2px_2px_0_#fff]">
              <img src="/logo.png" alt="OH MY MARVZ" className="h-8 w-auto object-contain" />
            </div>
            <span className="bg-yellow-400 text-black px-2 py-0.5 font-black text-[10px] uppercase font-mono tracking-wider border border-black shadow-[1px_1px_0_#000]">
              ADMIN PORTAL
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-300">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>LOGGED IN: <strong>STORE OWNER</strong></span>
            </div>

            <Link
              href="/"
              className="bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase px-4 py-2 border-2 border-white shadow-[2px_2px_0_#fff] flex items-center gap-1.5 transition-transform hover:-translate-y-0.5 tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span>EXIT TO STORE</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Control Panel Hero Banner */}
        <div className="bg-white border-3 border-black shadow-[4px_4px_0_#111] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block bg-black text-yellow-300 border-2 border-black px-3 py-1 font-black text-xs uppercase transform -rotate-1 shadow-[2px_2px_0_#ffee00] mb-2">
              ADMIN CONTROL CENTER
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-black">
              OH MY MARVZ DASHBOARD
            </h1>
            <p className="text-xs font-mono font-bold text-zinc-500">
              Manage inventory, featured products, and Lebanese BAU pickup & shipping orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider px-5 py-3 border-3 border-black shadow-[3px_3px_0_#000] flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>ADD NEW ITEM</span>
            </button>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-3 border-b-3 border-black pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'OVERVIEW & ANALYTICS' },
            { id: 'products', label: `INVENTORY (${products.length})` },
            { id: 'orders', label: `ORDERS & PICKUPS (${orders.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 font-black text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0_#111] transition-all ${
                activeTab === tab.id
                  ? 'bg-yellow-300 text-black font-extrabold'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- TAB 1: OVERVIEW & ANALYTICS --- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border-3 border-black shadow-[4px_4px_0_#111] p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-zinc-500 font-mono">TOTAL REVENUE</span>
                  <div className="p-2 bg-emerald-100 border-2 border-black">
                    <DollarSign className="w-5 h-5 text-emerald-700 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-black">${totalRevenue.toFixed(2)}</div>
                <div className="text-[10px] font-mono font-bold text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% this month</span>
                </div>
              </div>

              <div className="bg-white border-3 border-black shadow-[4px_4px_0_#111] p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-zinc-500 font-mono">TOTAL CATALOG</span>
                  <div className="p-2 bg-yellow-100 border-2 border-black">
                    <Package className="w-5 h-5 text-yellow-700 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-black">{totalProducts} Products</div>
                <div className="text-[10px] font-mono font-bold text-zinc-500">
                  {marvelCount} Marvel • {animeCount} Anime
                </div>
              </div>

              <div className="bg-white border-3 border-black shadow-[4px_4px_0_#111] p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-zinc-500 font-mono">ACTIVE ORDERS</span>
                  <div className="p-2 bg-red-100 border-2 border-black">
                    <ShoppingBag className="w-5 h-5 text-red-600 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-black">{orders.length} Orders</div>
                <div className="text-[10px] font-mono font-bold text-red-600">
                  {orders.filter((o) => o.status === 'pending').length} Pending Pickups
                </div>
              </div>

              <div className="bg-white border-3 border-black shadow-[4px_4px_0_#111] p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-zinc-500 font-mono">BAU PICKUP RATE</span>
                  <div className="p-2 bg-blue-100 border-2 border-black">
                    <MapPin className="w-5 h-5 text-blue-600 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-black">65% Pickup</div>
                <div className="text-[10px] font-mono font-bold text-blue-600">
                  Near BAU Beirut Station
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white border-3 border-black shadow-[4px_4px_0_#111] p-6 space-y-4">
              <h3 className="text-lg font-black uppercase italic text-black border-b-2 border-black pb-2">
                FAST ADMIN ACTIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="p-4 bg-yellow-300 hover:bg-yellow-400 border-2 border-black shadow-[2px_2px_0_#000] font-black text-xs uppercase flex items-center justify-center gap-2 text-black transition-colors"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>ADD NEW CATALOG ITEM</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="p-4 bg-red-600 hover:bg-red-700 border-2 border-black shadow-[2px_2px_0_#000] font-black text-xs uppercase flex items-center justify-center gap-2 text-white transition-colors"
                >
                  <Clock className="w-4 h-4 stroke-[3]" />
                  <span>VIEW PENDING ORDERS ({orders.filter(o => o.status === 'pending').length})</span>
                </button>
                <Link
                  href="/"
                  className="p-4 bg-zinc-100 hover:bg-zinc-200 border-2 border-black shadow-[2px_2px_0_#000] font-black text-xs uppercase flex items-center justify-center gap-2 text-black transition-colors"
                >
                  <Shield className="w-4 h-4 stroke-[2.5]" />
                  <span>PREVIEW PUBLIC STORE</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: INVENTORY MANAGEMENT --- */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="bg-white border-3 border-black shadow-[4px_4px_0_#111] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search product inventory..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-zinc-50 border-2 border-black text-xs font-mono font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase font-mono text-zinc-500">FRANCHISE:</span>
                <button
                  onClick={() => setSelectedFranchiseFilter('all')}
                  className={`px-3 py-1.5 border-2 border-black text-xs font-black uppercase shadow-[1px_1px_0_#000] ${
                    selectedFranchiseFilter === 'all' ? 'bg-black text-white' : 'bg-white text-black'
                  }`}
                >
                  ALL ({products.length})
                </button>
                <button
                  onClick={() => setSelectedFranchiseFilter('marvel')}
                  className={`px-3 py-1.5 border-2 border-black text-xs font-black uppercase shadow-[1px_1px_0_#000] ${
                    selectedFranchiseFilter === 'marvel' ? 'bg-red-600 text-white' : 'bg-white text-black'
                  }`}
                >
                  MARVEL ({marvelCount})
                </button>
                <button
                  onClick={() => setSelectedFranchiseFilter('anime')}
                  className={`px-3 py-1.5 border-2 border-black text-xs font-black uppercase shadow-[1px_1px_0_#000] ${
                    selectedFranchiseFilter === 'anime' ? 'bg-yellow-300 text-black' : 'bg-white text-black'
                  }`}
                >
                  ANIME ({animeCount})
                </button>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white border-3 border-black shadow-[4px_4px_0_#111] overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white text-xs font-black uppercase font-mono border-b-3 border-black">
                    <th className="p-3">PRODUCT</th>
                    <th className="p-3">FRANCHISE</th>
                    <th className="p-3">CATEGORY</th>
                    <th className="p-3">PRICE</th>
                    <th className="p-3">FEATURED</th>
                    <th className="p-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black text-xs font-bold font-mono">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-yellow-50 transition-colors">
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-contain bg-white border border-black p-1 flex-shrink-0"
                        />
                        <div>
                          <div className="font-black text-sm text-black">{product.name}</div>
                          <div className="text-[10px] text-zinc-500">{product.subtitle}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 border border-black font-black uppercase text-[10px] ${
                            product.franchise === 'marvel'
                              ? 'bg-red-600 text-white'
                              : 'bg-yellow-300 text-black'
                          }`}
                        >
                          {product.franchise}
                        </span>
                      </td>
                      <td className="p-3 uppercase text-zinc-600">{product.category}</td>
                      <td className="p-3 font-black text-black font-mono">${product.price.toFixed(2)}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleToggleFeatured(product.id)}
                          className={`px-2.5 py-1 border border-black text-[10px] font-black uppercase flex items-center gap-1 ${
                            product.isFeatured
                              ? 'bg-emerald-500 text-white'
                              : 'bg-zinc-200 text-zinc-700'
                          }`}
                        >
                          <Star className={`w-3 h-3 ${product.isFeatured ? 'fill-white' : ''}`} />
                          <span>{product.isFeatured ? 'FEATURED' : 'NORMAL'}</span>
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 bg-red-600 hover:bg-red-700 text-white border border-black shadow-[1px_1px_0_#000]"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 3: ORDERS MANAGEMENT --- */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white border-3 border-black shadow-[4px_4px_0_#111] p-6 space-y-4">
              <h3 className="text-lg font-black uppercase italic text-black border-b-2 border-black pb-2">
                CUSTOMER ORDERS & BAU PICKUP STATION
              </h3>

              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-zinc-50 border-2 border-black p-4 shadow-[2px_2px_0_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-black font-mono">{order.id}</span>
                        <span
                          className={`px-2 py-0.5 border border-black font-black text-[10px] uppercase ${
                            order.fulfillment === 'pickup'
                              ? 'bg-yellow-300 text-black'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          {order.fulfillment === 'pickup' ? 'BAU PICKUP' : 'LEBANON SHIPPING'}
                        </span>
                      </div>
                      <div className="text-xs font-black text-black">{order.customerName} ({order.phone})</div>
                      <div className="text-[11px] font-mono text-zinc-500">{order.location} • {order.date}</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-base font-black text-red-600 font-mono">${order.totalPrice.toFixed(2)}</div>
                        <div className="text-[10px] font-mono text-zinc-500">{order.itemsCount} Items</div>
                      </div>

                      <button
                        onClick={() => {
                          setOrders(
                            orders.map((o) =>
                              o.id === order.id ? { ...o, status: 'completed' } : o
                            )
                          );
                        }}
                        className={`px-3 py-2 border-2 border-black font-black text-xs uppercase flex items-center gap-1.5 shadow-[1px_1px_0_#000] ${
                          order.status === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-yellow-300 text-black hover:bg-yellow-400'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                        <span>{order.status === 'completed' ? 'COMPLETED' : 'MARK COMPLETED'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- DEDICATED ADMIN FOOTER (Zero Public Customer Footer) --- */}
      <footer className="bg-black text-white border-t-4 border-red-600 py-4 px-4 sm:px-6 lg:px-8 mt-12 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="text-zinc-400">
            Oh My Marvz • Internal Store Operations Portal v1.0
          </div>
          <div className="text-zinc-400">
            Crafted by{' '}
            <a
              href="https://meta-pylon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 font-black hover:underline"
            >
              Meta Pylon
            </a>
          </div>
        </div>
      </footer>

      {/* --- ADD PRODUCT MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white border-3 border-black shadow-[6px_6px_0_#000] p-6 space-y-4">
            <h2 className="text-xl font-black uppercase italic text-black border-b-3 border-black pb-2">
              ADD NEW CATALOG ITEM
            </h2>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs font-mono font-bold">
              <div>
                <label className="block text-black uppercase mb-1">PRODUCT NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spider-Man Suit Statue"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full p-2 bg-zinc-50 border-2 border-black font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-black uppercase mb-1">SUBTITLE / EDITION</label>
                <input
                  type="text"
                  placeholder="e.g. Includes Swappable FX Parts"
                  value={newProduct.subtitle}
                  onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
                  className="w-full p-2 bg-zinc-50 border-2 border-black font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-black uppercase mb-1">PRICE ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    className="w-full p-2 bg-zinc-50 border-2 border-black font-bold focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-black uppercase mb-1">FRANCHISE</label>
                  <select
                    value={newProduct.franchise}
                    onChange={(e) => setNewProduct({ ...newProduct, franchise: e.target.value as any })}
                    className="w-full p-2 bg-zinc-50 border-2 border-black font-bold focus:outline-none uppercase"
                  >
                    <option value="marvel">MARVEL</option>
                    <option value="anime">ANIME</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-black uppercase mb-1">IMAGE PATH / URL</label>
                <input
                  type="text"
                  placeholder="/products/ironman_figure.png"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full p-2 bg-zinc-50 border-2 border-black font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-black uppercase mb-1">DESCRIPTION</label>
                <textarea
                  rows={2}
                  placeholder="Item details and specifications..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full p-2 bg-zinc-50 border-2 border-black font-bold focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={newProduct.isFeatured}
                  onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                  className="w-4 h-4 accent-red-600 cursor-pointer"
                />
                <label htmlFor="isFeatured" className="text-black uppercase cursor-pointer">
                  SET AS FEATURED HERO SPOTLIGHT ITEM
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-black">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-zinc-200 border-2 border-black text-black font-black uppercase"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 border-2 border-black text-white font-black uppercase shadow-[2px_2px_0_#000]"
                >
                  SAVE PRODUCT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
