-- ========================================================
-- SUPABASE POSTGRESQL SCHEMA FOR MULTI-TENANT ENTERPRISE PLATFORM
-- Multi-Business: OH MY MARVZ & LA3EEB GAMING
-- ========================================================

-- 1. ENABLE UUID EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. BUSINESSES TABLE
CREATE TABLE IF NOT EXISTS public.businesses (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  tagline VARCHAR(255),
  domain VARCHAR(255) NOT NULL,
  badge_bg VARCHAR(255),
  badge_text VARCHAR(255),
  storefront_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Initial Businesses
INSERT INTO public.businesses (id, name, tagline, domain, badge_bg, badge_text, storefront_url)
VALUES 
  ('oh-my-marvz', 'OH MY MARVZ', 'Marvel & Anime Collectibles Store', 'oh-my-marvz.com', 'bg-red-50 text-red-700 border-red-200', 'COLLECTIBLES STORE', '/'),
  ('la3eeb', 'LA3EEB', 'Gaming Gears & eSports Equipment Store', 'la3eeb.com', 'bg-indigo-50 text-indigo-700 border-indigo-200', 'GAMING HUB', '/la3eeb')
ON CONFLICT (id) DO NOTHING;

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id VARCHAR(50) REFERENCES public.businesses(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  franchise VARCHAR(50) DEFAULT 'marvel',
  category VARCHAR(50) DEFAULT 'figurines',
  tag VARCHAR(50) DEFAULT 'NEW',
  description TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  image_url TEXT NOT NULL,
  webp_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id VARCHAR(50) PRIMARY KEY,
  business_id VARCHAR(50) REFERENCES public.businesses(id) ON DELETE CASCADE,
  customer_name VARCHAR(255) NOT NULL,
  phone VARCHAR(100) NOT NULL,
  location TEXT NOT NULL,
  fulfillment VARCHAR(50) DEFAULT 'pickup',
  items_count INT DEFAULT 1,
  total_price NUMERIC(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Public Read Access for Storefronts
CREATE POLICY "Public Read Businesses" ON public.businesses FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Orders" ON public.orders FOR SELECT USING (true);

-- Authenticated Admin Access for /meta Dashboard
CREATE POLICY "Admin All Businesses" ON public.businesses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Orders" ON public.orders FOR ALL USING (auth.role() = 'authenticated');

-- 6. STORAGE BUCKET CREATION FOR OPTIMIZED WEBP PRODUCT IMAGES
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public Read Policy for Product Images Storage Bucket
CREATE POLICY "Public Access Storage" ON storage.objects 
FOR SELECT USING (bucket_id = 'product-images');

-- Admin Upload Policy for Product Images Storage Bucket
CREATE POLICY "Admin Upload Storage" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'product-images');
