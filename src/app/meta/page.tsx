'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { INITIAL_PRODUCTS, Product } from '@/data/products';
import { convertImageToWebP, WebPOptimizationResult } from '@/lib/image-optimizer';
import {
  Package,
  DollarSign,
  ShoppingBag,
  Plus,
  Trash2,
  Edit,
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
  Gamepad2,
  X,
  Upload,
  Zap,
  Database,
  Lock,
  BarChart3,
  PieChart,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Clock,
  Activity,
  Award,
  ShoppingCart,
  Percent,
  Layers,
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
  id: 'oh-my-marvz' | 'la3eeb';
  name: string;
  tagline: string;
  domain: string;
  badgeBg: string;
  badgeText: string;
  storefrontUrl: string;
  storefrontLabel: string;
}

const BUSINESSES: Record<string, BusinessConfig> = {
  'oh-my-marvz': {
    id: 'oh-my-marvz',
    name: 'OH MY MARVZ',
    tagline: 'Marvel & Anime Collectibles Store',
    domain: 'oh-my-marvz.com',
    badgeBg: 'bg-red-50 text-red-700 border-red-200',
    badgeText: 'COLLECTIBLES STORE',
    storefrontUrl: '/',
    storefrontLabel: 'OH MY MARVZ STOREFRONT',
  },
  'la3eeb': {
    id: 'la3eeb',
    name: 'LA3EEB',
    tagline: 'Gaming Gears & eSports Equipment Store',
    domain: 'la3eeb.com',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badgeText: 'GAMING HUB',
    storefrontUrl: 'https://la3eeb.com',
    storefrontLabel: 'LA3EEB WEBSITE',
  },
};

export default function AdminDashboardPage() {
  const [currentBusinessId, setCurrentBusinessId] = useState<'oh-my-marvz' | 'la3eeb'>('oh-my-marvz');
  const [isSwitchDropdownOpen, setIsSwitchDropdownOpen] = useState(false);
  
  const currentBusiness = BUSINESSES[currentBusinessId];

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedFranchiseFilter, setSelectedFranchiseFilter] = useState<'all' | 'marvel' | 'anime'>('all');

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // WebP Image Compression State
  const [webpOptimization, setWebpOptimization] = useState<WebPOptimizationResult | null>(null);
  const [isOptimizingImage, setIsOptimizingImage] = useState(false);

  // Mock La3eeb Gaming Catalog for 2nd Business
  const la3eebProducts = [
    { id: 'la3-1', name: 'Pro Wireless RGB Gaming Controller', category: 'Controllers', price: 69.99, status: 'In Stock' },
    { id: 'la3-2', name: 'Mechanical Hotswap RGB Keyboard', category: 'Keyboards', price: 119.00, status: 'In Stock' },
    { id: 'la3-3', name: '7.1 Surround Sound Gaming Headset', category: 'Audio Gear', price: 89.99, status: 'In Stock' },
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
    image: '',
  });

  // Handle File Upload and Convert to WebP
  const handleImageFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isEditMode: boolean = false
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsOptimizingImage(true);
      const result = await convertImageToWebP(file);
      setWebpOptimization(result);

      if (isEditMode && editingProduct) {
        setEditingProduct({ ...editingProduct, image: result.dataUrl });
      } else {
        setNewProduct({ ...newProduct, image: result.dataUrl });
      }
    } catch (err) {
      console.error('Failed to convert image to WebP:', err);
    } finally {
      setIsOptimizingImage(false);
    }
  };

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
    setWebpOptimization(null);
  };

  const handleSaveEditedProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProducts(
      products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null);
    setWebpOptimization(null);
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
    : 12450.00;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* --- SLEEK MODERN SAAS NAVBAR --- */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Brand Identifier */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
              {currentBusinessId === 'la3eeb' ? (
                <Gamepad2 className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <Building2 className="w-5 h-5 stroke-[2.5]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-slate-900 font-mono">
                  ENTERPRISE META PORTAL
                </span>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${currentBusiness.badgeBg}`}>
                  {currentBusiness.badgeText}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Active Tenant: <strong className="text-slate-800 font-bold">{currentBusiness.name}</strong>
              </p>
            </div>
          </div>

          {/* Right Action Controls & Distant Business Switcher */}
          <div className="flex items-center gap-3">


            {/* DISTANT BUSINESS SWITCHER BUTTON */}
            <div className="relative">
              <button
                onClick={() => setIsSwitchDropdownOpen(!isSwitchDropdownOpen)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all focus:outline-none"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>SWITCH BUSINESS</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {/* Dropdown Menu */}
              {isSwitchDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">
                    Select Enterprise Business
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
                          ? 'bg-slate-100 text-slate-900 font-bold border border-slate-200'
                          : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-xs text-slate-900">{b.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{b.tagline}</div>
                      </div>
                      {currentBusinessId === b.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dynamic Exit to Storefront based on Active Business */}
            <Link
              href={currentBusiness.storefrontUrl}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{currentBusiness.storefrontLabel}</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Dynamic Business Header Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-xs font-mono text-slate-700 font-bold">
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>{currentBusiness.domain}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {currentBusiness.name} DASHBOARD
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
              {currentBusiness.tagline}. Centralized dashboard for sales analytics, product catalog management, and order fulfillment.
            </p>
          </div>

          {currentBusinessId === 'oh-my-marvz' && (
            <button
              onClick={() => {
                setWebpOptimization(null);
                setIsAddModalOpen(true);
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-sm flex items-center gap-2 transition-all hover:scale-102"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>CREATE PRODUCT ITEM</span>
            </button>
          )}
        </div>

        {/* Tab Selection Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'overview', label: 'ANALYTICS & METRICS' },
            { id: 'products', label: currentBusinessId === 'oh-my-marvz' ? `STORE CATALOG (${products.length})` : 'GAMING PRODUCTS (3)' },
            { id: 'orders', label: currentBusinessId === 'oh-my-marvz' ? `CUSTOMER ORDERS (${orders.length})` : 'LA3EEB ORDERS (3)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- TAB 1: OVERVIEW METRICS & PRO ANALYTICS --- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* Timeframe Filter Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <span className="font-extrabold text-sm text-slate-900 font-mono">Performance & Revenue Analytics</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                  LIVE SYNC
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono font-bold">
                {[
                  { id: '7d', label: '7 Days' },
                  { id: '30d', label: '30 Days' },
                  { id: '90d', label: '90 Days' },
                  { id: '1y', label: '1 Year' },
                ].map((tf) => (
                  <button
                    key={tf.id}
                    onClick={() => setAnalyticsTimeframe(tf.id as any)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      analyticsTimeframe === tf.id
                        ? 'bg-white text-slate-900 shadow-xs font-extrabold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Top 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Monthly Revenue */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 font-extrabold uppercase">GROSS REVENUE</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <DollarSign className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold font-mono text-slate-900">${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                <div className="text-[11px] text-emerald-600 font-mono font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+24.2% vs previous period</span>
                </div>
              </div>

              {/* Total Orders & Volume */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 font-extrabold uppercase">TOTAL ORDERS</span>
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold font-mono text-slate-900">
                  {currentBusinessId === 'oh-my-marvz' ? '342 Orders' : '189 Orders'}
                </div>
                <div className="text-[11px] text-indigo-600 font-mono font-bold flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+18.7% fulfillment volume</span>
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 font-extrabold uppercase">CONVERSION RATE</span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                    <Percent className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold font-mono text-slate-900">3.82%</div>
                <div className="text-[11px] text-amber-600 font-mono font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+1.4% vs industry baseline</span>
                </div>
              </div>

              {/* Average Order Value (AOV) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 font-extrabold uppercase">AVG. ORDER VALUE</span>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Award className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold font-mono text-slate-900">$42.80</div>
                <div className="text-[11px] text-blue-600 font-mono font-bold flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+$6.20 bundle uplift</span>
                </div>
              </div>
            </div>

            {/* Revenue Trend Visualizer & Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales & Orders Growth Bar Chart (2 cols) */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 font-mono">REVENUE & SALES VOLUME TIMELINE</h3>
                    <p className="text-xs text-slate-500">Monthly breakdown across all Lebanese districts & online orders</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono font-bold">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-xs bg-[#E23636]" />
                      <span className="text-slate-600">Marvel</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-xs bg-indigo-600" />
                      <span className="text-slate-600">Anime</span>
                    </div>
                  </div>
                </div>

                {/* Visual Chart Bars */}
                <div className="pt-4 space-y-3">
                  {[
                    { month: 'Jan', marvel: 3800, anime: 3100, total: '$6,900', pct: '62%' },
                    { month: 'Feb', marvel: 4200, anime: 3900, total: '$8,100', pct: '74%' },
                    { month: 'Mar', marvel: 5100, anime: 4600, total: '$9,700', pct: '86%' },
                    { month: 'Apr (Current)', marvel: 6600, anime: 5850, total: `$${totalRevenue.toLocaleString()}`, pct: '100%' },
                  ].map((bar, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono font-bold">
                        <span className="text-slate-800">{bar.month}</span>
                        <span className="text-slate-900">{bar.total}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-6 rounded-xl overflow-hidden flex shadow-inner">
                        <div
                          className="bg-[#E23636] h-full flex items-center justify-end pr-2 text-[10px] font-mono font-extrabold text-white transition-all duration-500"
                          style={{ width: `${(bar.marvel / (bar.marvel + bar.anime)) * parseInt(bar.pct)}%` }}
                        >
                          54%
                        </div>
                        <div
                          className="bg-indigo-600 h-full flex items-center justify-end pr-2 text-[10px] font-mono font-extrabold text-white transition-all duration-500"
                          style={{ width: `${(bar.anime / (bar.marvel + bar.anime)) * parseInt(bar.pct)}%` }}
                        >
                          46%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600 font-medium">⚡ Peak Order Hour: <strong>8:00 PM – 11:30 PM (Lebanon GMT+2)</strong></span>
                  <span className="font-bold text-emerald-600">+34% weekend surge</span>
                </div>
              </div>

              {/* Fulfillment & Payment Channels */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 font-mono">FULFILLMENT & PAYMENTS</h3>
                  <p className="text-xs text-slate-500">Distribution across Lebanese channels</p>
                </div>

                {/* Fulfillment Split */}
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold text-slate-700 flex justify-between">
                    <span>Doorstep Delivery (Lebanon)</span>
                    <span className="text-[#E23636]">58%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#E23636] h-full rounded-full" style={{ width: '58%' }} />
                  </div>

                  <div className="text-xs font-mono font-bold text-slate-700 flex justify-between pt-1">
                    <span>BAU Beirut Campus Pickup</span>
                    <span className="text-indigo-600">42%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <span className="text-[11px] font-mono font-extrabold text-slate-400 uppercase tracking-wider block">
                    Payment Method Split
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-[11px] text-slate-500 font-bold">Cash on Delivery</div>
                      <div className="text-base font-extrabold text-slate-900 mt-1">68.4%</div>
                      <div className="text-[10px] text-emerald-600 font-bold">USD / LBP</div>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-[11px] text-slate-500 font-bold">Whish / OMT Pay</div>
                      <div className="text-base font-extrabold text-slate-900 mt-1">31.6%</div>
                      <div className="text-[10px] text-indigo-600 font-bold">Digital Transfer</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-slate-600">Dispatch Speed</span>
                  <span className="text-emerald-600">⚡ 1.2 hrs Avg</span>
                </div>
              </div>
            </div>

            {/* Regional Sales Breakdown & Top Selling Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Lebanon Regional Sales Breakdown */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 font-mono">SALES BY LEBANESE REGION</h3>
                    <p className="text-xs text-slate-500">Order distribution across governorates</p>
                  </div>
                  <MapPin className="w-5 h-5 text-[#E23636]" />
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { region: 'Beirut (Hamra, Achrafieh, BAU)', percentage: 48, orders: 164, revenue: '$6,210' },
                    { region: 'Mount Lebanon (Metn, Keserwan, Baabda)', percentage: 26, orders: 89, revenue: '$3,420' },
                    { region: 'North (Tripoli, Koura, Batroun)', percentage: 12, orders: 41, revenue: '$1,480' },
                    { region: 'South (Saida, Tyre, Nabatieh)', percentage: 9, orders: 31, revenue: '$960' },
                    { region: 'Bekaa (Zahle, Chtaura, Baalbek)', percentage: 5, orders: 17, revenue: '$380' },
                  ].map((r, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-slate-900">{r.region}</span>
                        <span className="text-[#E23636]">{r.revenue} ({r.percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#E23636] h-full rounded-full transition-all duration-300"
                          style={{ width: `${r.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono font-medium">
                        <span>{r.orders} Doorstep & Campus Deliveries</span>
                        <span className="text-emerald-700 font-bold">99.2% Success</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Selling Collectibles Leaderboard */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 font-mono">TOP SELLING COLLECTIBLES</h3>
                    <p className="text-xs text-slate-500">Highest grossing items & stock velocity</p>
                  </div>
                  <Award className="w-5 h-5 text-amber-500" />
                </div>

                <div className="space-y-3 pt-2">
                  {products.slice(0, 5).map((p, idx) => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-extrabold text-xs ${
                          idx === 0 ? 'bg-amber-100 text-amber-800' : idx === 1 ? 'bg-slate-200 text-slate-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          #{idx + 1}
                        </span>
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-contain bg-white border border-slate-200 p-0.5 rounded-lg" />
                        <div>
                          <div className="font-extrabold text-xs text-slate-900 line-clamp-1">{p.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">${p.price.toFixed(2)} • {p.category}</div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 font-mono">
                        <div className="font-extrabold text-xs text-[#E23636]">${(p.price * (32 - idx * 4)).toFixed(2)}</div>
                        <div className="text-[10px] text-emerald-600 font-bold">{32 - idx * 4} sold</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Customer Search Trends & Demographics Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 font-mono">STORE SEARCH QUERIES & INTENT</h3>
                  <p className="text-xs text-slate-500">Most requested characters, franchises, and accessories</p>
                </div>
                <Search className="w-5 h-5 text-slate-400" />
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { tag: 'Iron Man Mark 85', count: '384 searches', growth: '+32%' },
                  { tag: 'Luffy Gear 5 Figure', count: '298 searches', growth: '+45%' },
                  { tag: 'Zoro Shusui Katana', count: '241 searches', growth: '+18%' },
                  { tag: 'Spider-Man 2099 Pop', count: '194 searches', growth: '+22%' },
                  { tag: 'Death Note Replica', count: '165 searches', growth: '+12%' },
                  { tag: 'Attack on Titan Keychain', count: '142 searches', growth: '+9%' },
                  { tag: 'Goku Ultra Instinct', count: '130 searches', growth: '+15%' },
                  { tag: 'Gojo Satoru Statue', count: '118 searches', growth: '+28%' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-mono">
                    <span className="font-extrabold text-slate-800">{item.tag}</span>
                    <span className="text-slate-500 text-[11px] font-medium">• {item.count}</span>
                    <span className="text-emerald-600 font-bold text-[10px]">{item.growth}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}


        {/* --- TAB 2: INVENTORY & PRODUCTS CONTROL --- */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {currentBusinessId === 'oh-my-marvz' ? (
              <>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative flex-1 w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search inventory items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none text-slate-900"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    {['all', 'marvel', 'anime'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedFranchiseFilter(f as any)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-extrabold uppercase transition-colors ${
                          selectedFranchiseFilter === f
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-mono text-slate-500 uppercase bg-slate-50 font-extrabold">
                        <th className="p-4">PRODUCT</th>
                        <th className="p-4">FRANCHISE</th>
                        <th className="p-4">PRICE</th>
                        <th className="p-4">FEATURED</th>
                        <th className="p-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs font-mono">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-contain bg-slate-50 border border-slate-200 p-1 rounded-xl" />
                            <div>
                              <div className="font-extrabold text-slate-900 text-sm">{p.name}</div>
                              <div className="text-[10px] text-slate-500">{p.subtitle}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              p.franchise === 'marvel' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {p.franchise}
                            </span>
                          </td>
                          <td className="p-4 font-extrabold text-slate-900">${p.price.toFixed(2)}</td>
                          <td className="p-4">
                            <button
                              onClick={() => handleToggleFeatured(p.id)}
                              className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold flex items-center gap-1.5 transition-colors ${
                                p.isFeatured ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <Star className="w-3 h-3" />
                              <span>{p.isFeatured ? 'FEATURED' : 'NORMAL'}</span>
                            </button>
                          </td>
                          <td className="p-4 text-right flex items-center justify-end gap-2">
                            {/* EDIT PRODUCT BUTTON */}
                            <button
                              onClick={() => {
                                setWebpOptimization(null);
                                setEditingProduct({ ...p });
                              }}
                              className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-colors"
                              title="Edit Product Details"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            {/* DELETE PRODUCT BUTTON */}
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-colors"
                              title="Delete Product"
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
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                <h3 className="text-lg font-extrabold text-slate-900">LA3EEB Gaming Gear Inventory</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {la3eebProducts.map((p) => (
                    <div key={p.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                      <div className="text-xs font-mono text-indigo-600 font-extrabold">{p.category}</div>
                      <div className="font-extrabold text-slate-900 text-sm">{p.name}</div>
                      <div className="text-lg font-extrabold text-emerald-600 font-mono">${p.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: ORDERS MANAGEMENT --- */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-lg font-extrabold text-slate-900">Active Store Orders & Fulfillment</h3>
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold font-mono text-indigo-600 text-sm">{order.id}</span>
                      <span className="px-2.5 py-0.5 bg-slate-200 rounded-full text-[10px] font-mono text-slate-700 font-bold">
                        {order.fulfillment === 'pickup' ? 'BAU BEIRUT PICKUP' : 'LEBANON DELIVERY'}
                      </span>
                    </div>
                    <div className="font-extrabold text-slate-900 text-xs mt-1">{order.customerName} ({order.phone})</div>
                    <div className="text-[11px] font-mono text-slate-500 font-bold">{order.location} • {order.date}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right font-mono">
                      <div className="text-base font-extrabold text-emerald-600">${order.totalPrice.toFixed(2)}</div>
                      <div className="text-[10px] text-slate-500 font-bold">{order.itemsCount} Items</div>
                    </div>
                    <button
                      onClick={() => setOrders(orders.map((o) => o.id === order.id ? { ...o, status: 'completed' } : o))}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-extrabold flex items-center gap-1.5 ${
                        order.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'
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

      {/* --- DEDICATED ADMIN FOOTER WITH META PYLON CREDIT --- */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 mt-12 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="text-slate-500 font-extrabold">
            Enterprise Admin Portal • {currentBusiness.name}
          </div>
          <div className="text-slate-700 font-black">
            Crafted by{' '}
            <a
              href="https://meta-pylon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-extrabold underline"
            >
              Meta Pylon
            </a>
          </div>
        </div>
      </footer>

      {/* --- CREATE PRODUCT MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-200 pb-3">
              Create New Store Item
            </h2>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-slate-600 font-bold mb-1">PRODUCT NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Spider-Man Poseable Statue"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">PRICE ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">FRANCHISE</label>
                  <select
                    value={newProduct.franchise}
                    onChange={(e) => setNewProduct({ ...newProduct, franchise: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 font-bold uppercase"
                  >
                    <option value="marvel">MARVEL</option>
                    <option value="anime">ANIME</option>
                  </select>
                </div>
              </div>

              {/* WebP Image Upload */}
              <div className="space-y-1">
                <label className="block text-slate-600 font-bold">UPLOAD PRODUCT IMAGE (AUTO WEBP CONVERT)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFileUpload(e, false)}
                  className="w-full text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
                {isOptimizingImage && (
                  <p className="text-indigo-600 text-[10px] font-bold animate-pulse">
                    ⚡ Converting image to WebP format...
                  </p>
                )}
                {webpOptimization && (
                  <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-[10px] text-emerald-700 font-bold">
                    ⚡ WebP Optimized! Saved {webpOptimization.compressionRatio}% file size ({(webpOptimization.originalSize / 1024).toFixed(0)}KB ➔ {(webpOptimization.optimizedSize / 1024).toFixed(0)}KB)
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-extrabold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold shadow-md"
                >
                  SAVE ITEM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT PRODUCT MODAL POPUP (2-Column Widescreen Live Preview) --- */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-indigo-600" />
                  <span>EDIT PRODUCT CATALOG ITEM</span>
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  Modify details on the right to see the live product preview update on the left.
                </p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2-Column Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: LIVE PRODUCT PREVIEW CARD */}
              <div className="md:col-span-5 space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
                  LIVE PRODUCT PREVIEW
                </div>

                {/* Product Image Display Box */}
                <div className="relative w-full h-56 bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-center overflow-hidden shadow-xs">
                  {editingProduct.image ? (
                    <img
                      src={editingProduct.image}
                      alt={editingProduct.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-xs font-mono text-slate-400">NO IMAGE PROVIDED</div>
                  )}

                  {editingProduct.isFeatured && (
                    <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 font-mono font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                      FEATURED SPOTLIGHT
                    </span>
                  )}

                  <span className={`absolute top-2 right-2 font-mono font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase ${
                    editingProduct.franchise === 'marvel' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {editingProduct.franchise}
                  </span>
                </div>

                {/* Product Info Preview */}
                <div className="space-y-1 pt-1">
                  <div className="font-extrabold text-base text-slate-900 leading-snug">
                    {editingProduct.name || 'Untitled Product'}
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    {editingProduct.subtitle || 'No edition subtitle specified'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <div className="text-xl font-extrabold text-emerald-600 font-mono">
                    ${editingProduct.price ? editingProduct.price.toFixed(2) : '0.00'}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">
                    Category: {editingProduct.category || 'figurines'}
                  </div>
                </div>

                {editingProduct.description && (
                  <p className="text-xs text-slate-600 font-medium italic bg-white p-3 rounded-xl border border-slate-200">
                    "{editingProduct.description}"
                  </p>
                )}
              </div>

              {/* RIGHT COLUMN: EDIT FORM */}
              <form onSubmit={handleSaveEditedProduct} className="md:col-span-7 space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-700 font-extrabold mb-1">PRODUCT NAME</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-extrabold mb-1">SUBTITLE / EDITION</label>
                  <input
                    type="text"
                    value={editingProduct.subtitle}
                    onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-extrabold mb-1">PRICE ($ USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-extrabold mb-1">FRANCHISE</label>
                    <select
                      value={editingProduct.franchise}
                      onChange={(e) => setEditingProduct({ ...editingProduct, franchise: e.target.value as any })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 font-bold uppercase"
                    >
                      <option value="marvel">MARVEL</option>
                      <option value="anime">ANIME</option>
                    </select>
                  </div>
                </div>

                {/* Image Upload + WebP Converter */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-extrabold mb-1">CHANGE PRODUCT IMAGE (WEBP OPTIMIZED)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileUpload(e, true)}
                    className="w-full text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                  />
                  {isOptimizingImage && (
                    <p className="text-indigo-600 text-[10px] font-bold animate-pulse">
                      ⚡ Converting image to WebP format...
                    </p>
                  )}
                  {webpOptimization && (
                    <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-[10px] text-emerald-700 font-bold">
                      ⚡ WebP Optimized! Saved {webpOptimization.compressionRatio}% file size ({(webpOptimization.originalSize / 1024).toFixed(0)}KB ➔ {(webpOptimization.optimizedSize / 1024).toFixed(0)}KB)
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-extrabold mb-1">DESCRIPTION</label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 font-bold"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="editIsFeatured"
                    checked={editingProduct.isFeatured || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                    className="w-4 h-4 accent-indigo-600 cursor-pointer"
                  />
                  <label htmlFor="editIsFeatured" className="text-slate-900 font-extrabold uppercase cursor-pointer">
                    SET AS FEATURED HERO SPOTLIGHT ITEM
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-extrabold"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold shadow-md"
                  >
                    UPDATE PRODUCT
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
