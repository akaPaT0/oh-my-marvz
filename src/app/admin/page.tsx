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
  Building2,
  RefreshCw,
  LayoutDashboard,
  Layers,
  ChevronDown,
  Globe,
  Sparkles,
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

interface BusinessConfig {
  id: 'oh-my-marvz' | 'meta-pylon';
  name: string;
  tagline: string;
  domain: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
}

const BUSINESSES: Record<string, BusinessConfig> = {
  'oh-my-marvz': {
    id: 'oh-my-marvz',
    name: 'OH MY MARVZ',
    tagline: 'Marvel & Anime Collectibles Store',
    domain: 'oh-my-marvz.com',
    accentColor: 'from-red-600 to-amber-500',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/20',
    badgeText: 'E-COMMERCE STORE',
  },
  'meta-pylon': {
    id: 'meta-pylon',
    name: 'META PYLON DIGITAL',
    tagline: 'Full-Stack Web & AI Engineering Agency',
    domain: 'meta-pylon.com',
    accentColor: 'from-indigo-600 to-cyan-500',
    badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    badgeText: 'DIGITAL AGENCY',
  },
};

export default function AdminDashboardPage() {
  const [currentBusinessId, setCurrentBusinessId] = useState<'oh-my-marvz' | 'meta-pylon'>('oh-my-marvz');
  const [isSwitchDropdownOpen, setIsSwitchDropdownOpen] = useState(false);
  
  const currentBusiness = BUSINESSES[currentBusinessId];

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFranchiseFilter, setSelectedFranchiseFilter] = useState<'all' | 'marvel' | 'anime'>('all');

  // Mock Meta Pylon Services Data for 2nd Business
  const agencyServices = [
    { id: 'srv-1', name: 'Custom Next.js Web Application', category: 'Development', price: 1499.0, status: 'Active' },
    { id: 'srv-2', name: 'AI Chatbot & Automation Suite', category: 'Artificial Intelligence', price: 2100.0, status: 'Active' },
    { id: 'srv-3', name: 'Brand Design & UI/UX Strategy', category: 'Design', price: 850.0, status: 'Active' },
  ];

  // Mock Orders Data for Store
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

  // Calculate Stats based on active Business
  const totalRevenue = currentBusinessId === 'oh-my-marvz'
    ? products.reduce((acc, p) => acc + p.price, 0) * 14
    : 18450.00;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* --- SLEEK MODERN SAAS NAVBAR --- */}
      <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Brand Identifier */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Building2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white font-mono">
                  ENTERPRISE CONTROL HUB
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentBusiness.badgeBg}`}>
                  {currentBusiness.badgeText}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                Active Tenant: <strong className="text-zinc-200">{currentBusiness.name}</strong>
              </p>
            </div>
          </div>

          {/* Right Action Controls & Distant Business Switcher */}
          <div className="flex items-center gap-3">
            
            {/* DISTANT BUSINESS SWITCHER DROPDOWN BUTTON */}
            <div className="relative">
              <button
                onClick={() => setIsSwitchDropdownOpen(!isSwitchDropdownOpen)}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs px-3.5 py-2 rounded-xl border border-zinc-700/80 shadow-md flex items-center gap-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
                <span>SWITCH BUSINESS</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {/* Dropdown Menu */}
              {isSwitchDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest font-mono">
                    Select Enterprise Tenant
                  </div>

                  {Object.values(BUSINESSES).map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setCurrentBusinessId(b.id as any);
                        setIsSwitchDropdownOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all ${
                        currentBusinessId === b.id
                          ? 'bg-zinc-800 text-white border border-zinc-700'
                          : 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-white">{b.name}</div>
                        <div className="text-[10px] text-zinc-400">{b.tagline}</div>
                      </div>
                      {currentBusinessId === b.id && (
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Exit to Frontend Store */}
            <Link
              href="/"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs px-3.5 py-2 rounded-xl border border-zinc-700/80 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">STOREFRONT</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Dynamic Business Header Spotlight */}
        <div className="relative rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
          <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${currentBusiness.accentColor} opacity-10 blur-3xl pointer-events-none`} />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-zinc-800/80 border border-zinc-700 px-3 py-1 rounded-full text-xs font-mono text-zinc-300">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>{currentBusiness.domain}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                {currentBusiness.name}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                {currentBusiness.tagline}. Centralized dashboard metrics, product catalog control, and customer orders.
              </p>
            </div>

            {currentBusinessId === 'oh-my-marvz' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>CREATE PRODUCT ITEM</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Selection Controls */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          {[
            { id: 'overview', label: 'ANALYTICS & METRICS' },
            { id: 'products', label: currentBusinessId === 'oh-my-marvz' ? `STORE CATALOG (${products.length})` : 'AGENCY SERVICES (3)' },
            { id: 'orders', label: currentBusinessId === 'oh-my-marvz' ? `CUSTOMER ORDERS (${orders.length})` : 'CLIENT INVOICES (3)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- TAB 1: OVERVIEW METRICS --- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 uppercase">MONTHLY REVENUE</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <DollarSign className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold font-mono text-white">${totalRevenue.toFixed(2)}</div>
                <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+24.2% from last month</span>
                </div>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 uppercase">TOTAL INVENTORY</span>
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Package className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold font-mono text-white">
                  {currentBusinessId === 'oh-my-marvz' ? `${products.length} Items` : '3 Services'}
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  {currentBusinessId === 'oh-my-marvz' ? '17 Active Marvel & Anime' : 'Web & AI Client Packages'}
                </div>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 uppercase">PENDING ORDERS</span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold font-mono text-white">
                  {orders.filter((o) => o.status === 'pending').length} Pending
                </div>
                <div className="text-[11px] text-amber-400 font-mono">
                  Requires fulfillment action
                </div>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 uppercase">FULFILLMENT RATE</span>
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <MapPin className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold font-mono text-white">98.5%</div>
                <div className="text-[11px] text-cyan-400 font-mono">
                  BAU Station & Shipping
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- TAB 2: INVENTORY & PRODUCTS CONTROL --- */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {currentBusinessId === 'oh-my-marvz' ? (
              <>
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative flex-1 w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Search inventory items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-indigo-500 text-white"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    {['all', 'marvel', 'anime'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedFranchiseFilter(f as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors ${
                          selectedFranchiseFilter === f
                            ? 'bg-indigo-600 text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-x-auto shadow-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-xs font-mono text-zinc-400 uppercase">
                        <th className="p-4">PRODUCT</th>
                        <th className="p-4">FRANCHISE</th>
                        <th className="p-4">PRICE</th>
                        <th className="p-4">FEATURED</th>
                        <th className="p-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-xs font-mono">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-contain bg-zinc-950 border border-zinc-800 p-1 rounded-lg" />
                            <div>
                              <div className="font-bold text-white text-sm">{p.name}</div>
                              <div className="text-[10px] text-zinc-400">{p.subtitle}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              p.franchise === 'marvel' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {p.franchise}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-white">${p.price.toFixed(2)}</td>
                          <td className="p-4">
                            <button
                              onClick={() => handleToggleFeatured(p.id)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-colors ${
                                p.isFeatured ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-400'
                              }`}
                            >
                              <Star className="w-3 h-3" />
                              <span>{p.isFeatured ? 'FEATURED' : 'NORMAL'}</span>
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">Meta Pylon Digital Agency Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {agencyServices.map((srv) => (
                    <div key={srv.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
                      <div className="text-xs font-mono text-indigo-400">{srv.category}</div>
                      <div className="font-bold text-white text-sm">{srv.name}</div>
                      <div className="text-lg font-extrabold text-emerald-400 font-mono">${srv.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: ORDERS MANAGEMENT --- */}
        {activeTab === 'orders' && (
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Active Store Orders & Fulfillment</h3>
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold font-mono text-indigo-400 text-sm">{order.id}</span>
                      <span className="px-2 py-0.5 bg-zinc-800 rounded-full text-[10px] font-mono text-zinc-300">
                        {order.fulfillment === 'pickup' ? 'BAU BEIRUT PICKUP' : 'LEBANON DELIVERY'}
                      </span>
                    </div>
                    <div className="font-bold text-white text-xs mt-1">{order.customerName} ({order.phone})</div>
                    <div className="text-[11px] font-mono text-zinc-400">{order.location} • {order.date}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right font-mono">
                      <div className="text-base font-extrabold text-emerald-400">${order.totalPrice.toFixed(2)}</div>
                      <div className="text-[10px] text-zinc-400">{order.itemsCount} Items</div>
                    </div>
                    <button
                      onClick={() => setOrders(orders.map((o) => o.id === order.id ? { ...o, status: 'completed' } : o))}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 ${
                        order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-indigo-600 text-white hover:bg-indigo-500'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{order.status === 'completed' ? 'COMPLETED' : 'MARK COMPLETED'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* --- ADD PRODUCT MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h2 className="text-xl font-bold text-white border-b border-zinc-800 pb-3">
              Create New Store Item
            </h2>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-zinc-400 mb-1">PRODUCT NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Spider-Man Poseable Statue"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">PRICE ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">FRANCHISE</label>
                  <select
                    value={newProduct.franchise}
                    onChange={(e) => setNewProduct({ ...newProduct, franchise: e.target.value as any })}
                    className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 uppercase"
                  >
                    <option value="marvel">MARVEL</option>
                    <option value="anime">ANIME</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">IMAGE URL / PATH</label>
                <input
                  type="text"
                  placeholder="/products/ironman_figure.png"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20"
                >
                  SAVE ITEM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
