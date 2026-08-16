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
  Shield,
  Star,
  Search,
  ArrowLeft,
  Building2,
  RefreshCw,
  ChevronDown,
  Globe,
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
  badgeBg: string;
  badgeText: string;
}

const BUSINESSES: Record<string, BusinessConfig> = {
  'oh-my-marvz': {
    id: 'oh-my-marvz',
    name: 'OH MY MARVZ',
    tagline: 'Marvel & Anime Collectibles Store',
    domain: 'oh-my-marvz.com',
    badgeBg: 'bg-red-600 text-white border-2 border-slate-900',
    badgeText: 'E-COMMERCE STORE',
  },
  'meta-pylon': {
    id: 'meta-pylon',
    name: 'META PYLON DIGITAL',
    tagline: 'Full-Stack Web & AI Engineering Agency',
    domain: 'meta-pylon.com',
    badgeBg: 'bg-indigo-600 text-white border-2 border-slate-900',
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
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* --- HIGH-CONTRAST TOPBAR --- */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b-4 border-slate-950 px-4 sm:px-6 lg:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Brand Identifier */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 text-slate-950 font-black border-2 border-white flex items-center justify-center shadow-[2px_2px_0_#fff]">
              <Building2 className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base tracking-wider font-mono text-white">
                  ENTERPRISE ADMIN PORTAL
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 font-mono ${currentBusiness.badgeBg}`}>
                  {currentBusiness.badgeText}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono font-extrabold">
                Active Tenant: <strong className="text-amber-400 uppercase">{currentBusiness.name}</strong>
              </p>
            </div>
          </div>

          {/* Right Action Controls & Distant Business Switcher */}
          <div className="flex items-center gap-3">
            
            {/* DISTANT BUSINESS SWITCHER BUTTON */}
            <div className="relative">
              <button
                onClick={() => setIsSwitchDropdownOpen(!isSwitchDropdownOpen)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase px-4 py-2.5 border-2 border-white shadow-[3px_3px_0_#fff] flex items-center gap-2 transition-transform hover:-translate-y-0.5 focus:outline-none"
              >
                <RefreshCw className="w-4 h-4 stroke-[3]" />
                <span>SWITCH BUSINESS</span>
                <ChevronDown className="w-4 h-4 stroke-[3]" />
              </button>

              {/* Dropdown Menu */}
              {isSwitchDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border-3 border-slate-900 shadow-[6px_6px_0_#0f172a] p-2 space-y-1 z-50">
                  <div className="px-3 py-2 text-xs font-black text-slate-500 uppercase tracking-wider font-mono border-b-2 border-slate-200">
                    Select Enterprise Business
                  </div>

                  {Object.values(BUSINESSES).map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setCurrentBusinessId(b.id as any);
                        setIsSwitchDropdownOpen(false);
                      }}
                      className={`w-full text-left p-3 flex items-center justify-between border-2 transition-colors ${
                        currentBusinessId === b.id
                          ? 'bg-slate-900 text-white border-slate-900 font-black'
                          : 'bg-white text-slate-900 border-transparent hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div className="font-black text-xs uppercase">{b.name}</div>
                        <div className="text-[11px] font-mono font-bold text-slate-400">{b.tagline}</div>
                      </div>
                      {currentBusinessId === b.id && (
                        <div className="w-3 h-3 bg-amber-400 border border-black" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Exit to Storefront */}
            <Link
              href="/"
              className="bg-white hover:bg-slate-200 text-slate-950 font-black text-xs uppercase px-4 py-2.5 border-2 border-slate-900 shadow-[3px_3px_0_#000] flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">PUBLIC STOREFRONT</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Dynamic Business Header Banner */}
        <div className="bg-white border-3 border-slate-900 p-6 sm:p-8 shadow-[6px_6px_0_#0f172a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-amber-400 font-mono text-xs font-black px-3 py-1 border-2 border-slate-900 shadow-[2px_2px_0_#000]">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>{currentBusiness.domain}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950 italic">
              {currentBusiness.name} CONTROL CENTER
            </h1>
            <p className="text-xs sm:text-sm font-extrabold text-slate-700 max-w-xl font-mono">
              {currentBusiness.tagline}. Direct analytics, product catalog management, and order fulfillment.
            </p>
          </div>

          {currentBusinessId === 'oh-my-marvz' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase px-6 py-3.5 border-3 border-slate-900 shadow-[4px_4px_0_#000] flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              <span>ADD CATALOG ITEM</span>
            </button>
          )}
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-3 border-b-3 border-slate-900 pb-3 overflow-x-auto">
          {[
            { id: 'overview', label: 'ANALYTICS & METRICS' },
            { id: 'products', label: currentBusinessId === 'oh-my-marvz' ? `STORE CATALOG (${products.length})` : 'AGENCY SERVICES (3)' },
            { id: 'orders', label: currentBusinessId === 'oh-my-marvz' ? `CUSTOMER ORDERS (${orders.length})` : 'CLIENT INVOICES (3)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white italic'
                  : 'bg-white text-slate-950 hover:bg-amber-300'
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
              
              <div className="bg-white border-3 border-slate-900 p-5 space-y-3 shadow-[4px_4px_0_#0f172a]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-600 font-mono">MONTHLY REVENUE</span>
                  <div className="p-2 bg-emerald-500 text-white border-2 border-slate-900 shadow-[2px_2px_0_#000]">
                    <DollarSign className="w-5 h-5 stroke-[3]" />
                  </div>
                </div>
                <div className="text-3xl font-black font-mono text-slate-950">${totalRevenue.toFixed(2)}</div>
                <div className="text-xs text-emerald-700 font-black font-mono flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>+24.2% Growth</span>
                </div>
              </div>

              <div className="bg-white border-3 border-slate-900 p-5 space-y-3 shadow-[4px_4px_0_#0f172a]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-600 font-mono">TOTAL INVENTORY</span>
                  <div className="p-2 bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0_#000]">
                    <Package className="w-5 h-5 stroke-[3]" />
                  </div>
                </div>
                <div className="text-3xl font-black font-mono text-slate-950">
                  {currentBusinessId === 'oh-my-marvz' ? `${products.length} Items` : '3 Services'}
                </div>
                <div className="text-xs font-bold font-mono text-slate-600">
                  {currentBusinessId === 'oh-my-marvz' ? '17 Marvel & Anime Collectibles' : 'Web & AI Packages'}
                </div>
              </div>

              <div className="bg-white border-3 border-slate-900 p-5 space-y-3 shadow-[4px_4px_0_#0f172a]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-600 font-mono">PENDING ORDERS</span>
                  <div className="p-2 bg-amber-500 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0_#000]">
                    <ShoppingBag className="w-5 h-5 stroke-[3]" />
                  </div>
                </div>
                <div className="text-3xl font-black font-mono text-slate-950">
                  {orders.filter((o) => o.status === 'pending').length} Pending
                </div>
                <div className="text-xs font-black text-amber-700 font-mono">
                  Requires fulfillment
                </div>
              </div>

              <div className="bg-white border-3 border-slate-900 p-5 space-y-3 shadow-[4px_4px_0_#0f172a]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-600 font-mono">FULFILLMENT RATE</span>
                  <div className="p-2 bg-blue-600 text-white border-2 border-slate-900 shadow-[2px_2px_0_#000]">
                    <MapPin className="w-5 h-5 stroke-[3]" />
                  </div>
                </div>
                <div className="text-3xl font-black font-mono text-slate-950">98.5%</div>
                <div className="text-xs font-bold font-mono text-blue-700">
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
                <div className="bg-white border-3 border-slate-900 p-4 shadow-[4px_4px_0_#0f172a] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative flex-1 w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="SEARCH PRODUCT CATALOG..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border-2 border-slate-900 font-mono font-black text-xs text-slate-950 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    {['all', 'marvel', 'anime'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedFranchiseFilter(f as any)}
                        className={`px-3 py-1.5 border-2 border-slate-900 font-black text-xs uppercase shadow-[2px_2px_0_#000] ${
                          selectedFranchiseFilter === f
                            ? 'bg-slate-900 text-white'
                            : 'bg-white text-slate-900 hover:bg-amber-300'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white border-3 border-slate-900 shadow-[6px_6px_0_#0f172a] overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-3 border-slate-900 text-xs font-black uppercase font-mono bg-slate-900 text-white">
                        <th className="p-4">PRODUCT</th>
                        <th className="p-4">FRANCHISE</th>
                        <th className="p-4">PRICE</th>
                        <th className="p-4">FEATURED</th>
                        <th className="p-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-900 text-xs font-mono font-bold">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-amber-50 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-12 h-12 object-contain bg-white border-2 border-slate-900 p-1 flex-shrink-0" />
                            <div>
                              <div className="font-black text-sm text-slate-950">{p.name}</div>
                              <div className="text-xs text-slate-500 font-bold">{p.subtitle}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 border-2 border-slate-900 font-black text-[10px] uppercase shadow-[1px_1px_0_#000] ${
                              p.franchise === 'marvel' ? 'bg-red-600 text-white' : 'bg-amber-400 text-slate-950'
                            }`}>
                              {p.franchise}
                            </span>
                          </td>
                          <td className="p-4 font-black text-slate-950 text-sm font-mono">${p.price.toFixed(2)}</td>
                          <td className="p-4">
                            <button
                              onClick={() => handleToggleFeatured(p.id)}
                              className={`px-3 py-1 border-2 border-slate-900 font-black text-[10px] uppercase flex items-center gap-1.5 shadow-[1px_1px_0_#000] ${
                                p.isFeatured ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-900'
                              }`}
                            >
                              <Star className={`w-3.5 h-3.5 ${p.isFeatured ? 'fill-white' : ''}`} />
                              <span>{p.isFeatured ? 'FEATURED' : 'NORMAL'}</span>
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white border-2 border-slate-900 shadow-[2px_2px_0_#000]"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4 stroke-[2.5]" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="bg-white border-3 border-slate-900 p-6 space-y-4 shadow-[6px_6px_0_#0f172a]">
                <h3 className="text-xl font-black uppercase italic text-slate-950">Meta Pylon Digital Agency Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {agencyServices.map((srv) => (
                    <div key={srv.id} className="bg-slate-50 border-2 border-slate-900 p-4 space-y-2 shadow-[3px_3px_0_#000]">
                      <div className="text-xs font-mono font-black text-indigo-700 uppercase">{srv.category}</div>
                      <div className="font-black text-slate-950 text-base">{srv.name}</div>
                      <div className="text-xl font-black text-emerald-700 font-mono">${srv.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: ORDERS MANAGEMENT --- */}
        {activeTab === 'orders' && (
          <div className="bg-white border-3 border-slate-900 p-6 space-y-4 shadow-[6px_6px_0_#0f172a]">
            <h3 className="text-xl font-black uppercase italic text-slate-950">Active Store Orders & BAU Station</h3>
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-slate-50 border-2 border-slate-900 p-4 shadow-[3px_3px_0_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black font-mono text-indigo-700 text-sm">{order.id}</span>
                      <span className="px-2.5 py-0.5 bg-amber-300 text-slate-950 border border-slate-900 font-black text-[10px] font-mono">
                        {order.fulfillment === 'pickup' ? 'BAU BEIRUT PICKUP' : 'LEBANON SHIPPING'}
                      </span>
                    </div>
                    <div className="font-black text-slate-950 text-xs">{order.customerName} ({order.phone})</div>
                    <div className="text-xs font-mono text-slate-600 font-bold">{order.location} • {order.date}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right font-mono">
                      <div className="text-lg font-black text-red-600">${order.totalPrice.toFixed(2)}</div>
                      <div className="text-xs font-bold text-slate-600">{order.itemsCount} Items</div>
                    </div>
                    <button
                      onClick={() => setOrders(orders.map((o) => o.id === order.id ? { ...o, status: 'completed' } : o))}
                      className={`px-4 py-2.5 border-2 border-slate-900 font-black text-xs uppercase flex items-center gap-1.5 shadow-[2px_2px_0_#000] ${
                        order.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-amber-400 text-slate-950 hover:bg-amber-500'
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
        )}

      </main>

      {/* --- DEDICATED ADMIN FOOTER WITH HIGH-CONTRAST META PYLON CREDIT --- */}
      <footer className="bg-slate-900 text-white border-t-4 border-slate-950 py-6 px-4 sm:px-6 lg:px-8 mt-12 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="text-slate-300 font-extrabold">
            Enterprise Admin Portal • <strong className="text-white uppercase">{currentBusiness.name}</strong>
          </div>
          <div className="text-slate-300 font-black">
            Crafted by{' '}
            <a
              href="https://meta-pylon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-white font-black underline tracking-wider transition-colors"
            >
              Meta Pylon
            </a>
          </div>
        </div>
      </footer>

      {/* --- ADD PRODUCT MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white border-3 border-slate-900 shadow-[8px_8px_0_#000] p-6 space-y-4">
            <h2 className="text-xl font-black uppercase italic text-slate-950 border-b-3 border-slate-900 pb-2">
              Create New Store Item
            </h2>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs font-mono font-bold">
              <div>
                <label className="block text-slate-950 uppercase mb-1">PRODUCT NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Spider-Man Poseable Statue"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border-2 border-slate-900 font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-950 uppercase mb-1">PRICE ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border-2 border-slate-900 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-950 uppercase mb-1">FRANCHISE</label>
                  <select
                    value={newProduct.franchise}
                    onChange={(e) => setNewProduct({ ...newProduct, franchise: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border-2 border-slate-900 font-bold focus:outline-none uppercase"
                  >
                    <option value="marvel">MARVEL</option>
                    <option value="anime">ANIME</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-950 uppercase mb-1">IMAGE URL / PATH</label>
                <input
                  type="text"
                  placeholder="/products/ironman_figure.png"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border-2 border-slate-900 font-bold focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-slate-900">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 border-2 border-slate-900 text-slate-950 font-black uppercase"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white border-2 border-slate-900 font-black uppercase shadow-[3px_3px_0_#000]"
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
