"use client";

import React, { Suspense, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { StoreProvider, useStore } from "@/context/StoreContext";
import Header from "@/components/Header";
import CyberDock from "@/components/CyberDock";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import CompareDrawer from "@/components/CompareDrawer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CommandPalette from "@/components/CommandPalette";
import PriceTag from "@/components/PriceTag";
import { LAPTOP_PRODUCTS, ACCESSORY_PRODUCTS, LAPMART_BRANCHES, MASTER_HOTLINE, WHATSAPP_NUMBER } from "@/data/lapmart-data";
import {
  Laptop,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  Filter,
  X,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Home,
  Check,
  Zap,
  ShieldCheck,
  Truck,
  Layers,
  Cpu,
  Gamepad2,
  Grid,
  List,
  PhoneCall
} from "lucide-react";
import { soundFX } from "@/utils/sound";

function ShopContent() {
  const searchParams = useSearchParams();
  const {
    filters,
    setFilters,
    resetFilters,
    activeBrandTab,
    setActiveBrandTab,
    selectedBranch,
    setSelectedBranch
  } = useStore();

  const [activeTab, setActiveTab] = useState<"all" | "laptops" | "accessories">("all");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Read initial query params if present (e.g. ?brand=Acer or ?category=Gaming)
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    const categoryParam = searchParams.get("category");
    const conditionParam = searchParams.get("condition");
    const queryParam = searchParams.get("q");

    if (brandParam) {
      setFilters((prev) => ({ ...prev, brand: brandParam }));
      setActiveBrandTab(brandParam.toUpperCase());
    }
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
    if (conditionParam) {
      setFilters((prev) => ({ ...prev, condition: conditionParam }));
    }
    if (queryParam) {
      setFilters((prev) => ({ ...prev, searchQuery: queryParam }));
    }
  }, [searchParams, setFilters, setActiveBrandTab]);

  // Laptop filter logic
  const filteredLaptops = useMemo(() => {
    return LAPTOP_PRODUCTS.filter((product) => {
      if (filters.brand !== "ALL" && product.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }
      if (filters.condition !== "ALL" && product.condition !== filters.condition) {
        return false;
      }
      if (filters.processor !== "ALL") {
        if (filters.processor.includes("i7") && !product.processor.toLowerCase().includes("i7")) return false;
        if (filters.processor.includes("i5") && !product.processor.toLowerCase().includes("i5")) return false;
        if (filters.processor.includes("Ryzen") && !product.processor.toLowerCase().includes("ryzen")) return false;
        if (filters.processor.includes("Apple") && product.brand !== "Apple") return false;
      }
      if (filters.category !== "ALL" && product.category !== filters.category) {
        return false;
      }
      if (product.price > filters.priceRange[1] || product.price < filters.priceRange[0]) {
        return false;
      }
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesSpecs =
          product.processor.toLowerCase().includes(query) ||
          product.graphics.toLowerCase().includes(query) ||
          product.ram.toLowerCase().includes(query);
        if (!matchesName && !matchesSku && !matchesBrand && !matchesSpecs) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price-asc") return a.price - b.price;
      if (filters.sortBy === "price-desc") return b.price - a.price;
      if (filters.sortBy === "score") return b.scores.aiCompute - a.scores.aiCompute;
      return 0; // featured
    });
  }, [filters]);

  // Accessories filter logic
  const filteredAccessories = useMemo(() => {
    return ACCESSORY_PRODUCTS.filter((acc) => {
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        return (
          acc.name.toLowerCase().includes(query) ||
          acc.category.toLowerCase().includes(query) ||
          acc.subCategory.toLowerCase().includes(query) ||
          acc.sku.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [filters.searchQuery]);

  const brandsList = ["ALL", "Acer", "HP", "Dell", "Asus", "Lenovo", "MSI", "Apple"];
  const categoriesList = ["ALL", "Gaming", "Workstation", "Ultrabook", "Business", "Everyday"];
  const conditionsList = ["ALL", "Brand New", "Used"];
  const processorList = ["ALL", "Intel Core i7", "Intel Core i5", "AMD Ryzen", "Apple Silicon"];

  const activeFiltersCount =
    (filters.brand !== "ALL" ? 1 : 0) +
    (filters.condition !== "ALL" ? 1 : 0) +
    (filters.category !== "ALL" ? 1 : 0) +
    (filters.processor !== "ALL" ? 1 : 0) +
    (filters.searchQuery ? 1 : 0) +
    (filters.priceRange[0] > 50000 || filters.priceRange[1] < 1000000 ? 1 : 0);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FAFAFC] text-slate-900 selection:bg-amber-500 selection:text-white">
      {/* 2030 Unified Frosted Header */}
      <Header />

      {/* Cyber lateral dock for desktop */}
      <CyberDock />

      {/* Main Container */}
      <main className="flex-1 md:pl-16">
        
        {/* SHOP BREADCRUMB & HERO BANNER */}
        <section className="bg-white border-b border-slate-200/80 pt-8 pb-10 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto space-y-4">
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-amber-600 transition-colors font-medium"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-900 font-bold">2030 Hardware Shop</span>
              {filters.brand !== "ALL" && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-amber-600 font-mono font-bold uppercase">{filters.brand}</span>
                </>
              )}
            </div>

            {/* Title & Live Status */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/70 text-amber-800 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Sri Lanka&apos;s Comprehensive 2030 Inventory</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  LapMart Hardware <span className="text-amber-500">Store</span>
                </h1>
                <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                  Explore certified brand new and Grade A+ tested used workstations, RTX gaming laptops, and pro studio peripherals with direct showroom pickup across 7 branches.
                </p>
              </div>

              {/* Fast Scope Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold self-start md:self-auto">
                <button
                  onClick={() => {
                    soundFX.click();
                    setActiveTab("all");
                  }}
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    activeTab === "all"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All ({LAPTOP_PRODUCTS.length + ACCESSORY_PRODUCTS.length})
                </button>
                <button
                  onClick={() => {
                    soundFX.click();
                    setActiveTab("laptops");
                  }}
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    activeTab === "laptops"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Laptops ({LAPTOP_PRODUCTS.length})
                </button>
                <button
                  onClick={() => {
                    soundFX.click();
                    setActiveTab("accessories");
                  }}
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    activeTab === "accessories"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Gears & Peripherals ({ACCESSORY_PRODUCTS.length})
                </button>
              </div>
            </div>

            {/* Guarantee Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Up to 2 Years Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Truck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Free Islandwide Courier</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Layers className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>7 Showrooms Islandwide</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Direct WhatsApp Dispatch</span>
              </div>
            </div>

          </div>
        </section>

        {/* SHOP BODY: SIDEBAR + RESULTS */}
        <section className="py-8 px-4 sm:px-8 max-w-7xl mx-auto">
          
          {/* Top Control Bar: Search query chip + Sort + View switcher + Mobile filter button */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            
            {/* Left: Active Filters & Clear */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs"
              >
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                <span>Filters ({activeFiltersCount})</span>
              </button>

              <span className="text-xs font-mono font-bold text-slate-700 hidden sm:inline">
                Showing {activeTab === "accessories" ? filteredAccessories.length : filteredLaptops.length} Results
              </span>

              {activeFiltersCount > 0 && (
                <button
                  onClick={() => {
                    soundFX.switchTab();
                    resetFilters();
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold border border-rose-200 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All ({activeFiltersCount})</span>
                </button>
              )}

              {filters.brand !== "ALL" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold">
                  Brand: {filters.brand}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-rose-500"
                    onClick={() => setFilters((prev) => ({ ...prev, brand: "ALL" }))}
                  />
                </span>
              )}

              {filters.category !== "ALL" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-bold">
                  {filters.category}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-rose-500"
                    onClick={() => setFilters((prev) => ({ ...prev, category: "ALL" }))}
                  />
                </span>
              )}

              {filters.condition !== "ALL" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
                  {filters.condition}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-rose-500"
                    onClick={() => setFilters((prev) => ({ ...prev, condition: "ALL" }))}
                  />
                </span>
              )}
            </div>

            {/* Right: Sort & Grid View Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as any
                    }))
                  }
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer shadow-2xs"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="score">Top Performance Score</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "grid" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-400 hover:text-slate-700"
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "compact" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-400 hover:text-slate-700"
                  }`}
                  title="Compact View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* SIDEBAR FILTERS (Desktop + Mobile drawer) */}
            <aside
              className={`${
                isMobileFilterOpen
                  ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto block lg:relative lg:p-0 lg:z-auto lg:bg-transparent"
                  : "hidden lg:block"
              } space-y-6`}
            >
              {/* Mobile drawer header */}
              <div className="lg:hidden flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-amber-500" /> Filter Store
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 1. Keyword Search in Filter Box */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Search Specification
                </span>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                    placeholder="RTX 4060, 16GB, i7..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  {filters.searchQuery && (
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, searchQuery: "" }))}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Brand Selector */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Hardware Brand
                </span>
                <div className="flex flex-col gap-1">
                  {brandsList.map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        soundFX.click();
                        setFilters((prev) => ({ ...prev, brand: b }));
                        setActiveBrandTab(b.toUpperCase());
                      }}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        filters.brand.toLowerCase() === b.toLowerCase()
                          ? "bg-amber-500 text-white font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{b}</span>
                      {filters.brand.toLowerCase() === b.toLowerCase() && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Hardware Condition */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Condition Tier
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {conditionsList.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        soundFX.click();
                        setFilters((prev) => ({ ...prev, condition: c }));
                      }}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        filters.condition === c
                          ? "bg-slate-900 text-white font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{c === "ALL" ? "All Conditions" : c}</span>
                      {filters.condition === c && <Check className="w-3 h-3 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Use-case Category */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Category & Workload
                </span>
                <div className="flex flex-col gap-1">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        soundFX.click();
                        setFilters((prev) => ({ ...prev, category: cat }));
                      }}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        filters.category === cat
                          ? "bg-amber-50 text-amber-800 font-bold border border-amber-200"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{cat === "ALL" ? "All Workloads" : cat}</span>
                      {filters.category === cat && <Check className="w-3 h-3 text-amber-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Processor Architecture */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Processor
                </span>
                <div className="flex flex-col gap-1">
                  {processorList.map((proc) => (
                    <button
                      key={proc}
                      onClick={() => {
                        soundFX.click();
                        setFilters((prev) => ({ ...prev, processor: proc }));
                      }}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        filters.processor === proc
                          ? "bg-slate-900 text-white font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{proc}</span>
                      {filters.processor === proc && <Check className="w-3 h-3 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Maximum Budget Slider */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold uppercase tracking-wider text-slate-500">
                    Max Budget
                  </span>
                  <span className="font-mono font-bold text-amber-600">
                    Rs. {filters.priceRange[1].toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="25000"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                    }))
                  }
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Rs. 50K</span>
                  <span>Rs. 1,000K</span>
                </div>
              </div>

              {/* 7. Showroom Pickup Selector */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900 block">
                  Select Preferred Branch
                </span>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {LAPMART_BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.city} ({b.displayPhone}) {b.isFlagship ? "★ Flagship" : ""}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-amber-800/80">
                  Hardware can be reserved for same-day hands-on inspection at this showroom.
                </p>
              </div>

              {/* Mobile apply button */}
              <div className="lg:hidden pt-4">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md"
                >
                  Show {activeTab === "accessories" ? filteredAccessories.length : filteredLaptops.length} Results
                </button>
              </div>
            </aside>

            {/* RESULTS CONTENT AREA (Laptops & Accessories) */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* (A) LAPTOPS SECTION */}
              {activeTab !== "accessories" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-amber-500" />
                      <span>Laptops & Mobile Workstations</span>
                    </h2>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {filteredLaptops.length} Available
                    </span>
                  </div>

                  {filteredLaptops.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
                      <Laptop className="w-8 h-8 text-slate-300 mx-auto" />
                      <h4 className="text-sm font-bold text-slate-800">No matching laptops found</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Try resetting your filters or adjusting your budget slider to view more machines from our 7 islandwide warehouses.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                          : "grid grid-cols-1 gap-4"
                      }
                    >
                      {filteredLaptops.map((laptop) => (
                        <ProductCard key={laptop.id} product={laptop} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* (B) ACCESSORIES & PERIPHERALS SECTION */}
              {activeTab !== "laptops" && (
                <div className="pt-6 border-t border-slate-200/80">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-cyan-500" />
                      <span>Studio & Gaming Peripherals</span>
                    </h2>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {filteredAccessories.length} Items
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredAccessories.map((acc) => (
                      <div
                        key={acc.id}
                        className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-cyan-300 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="h-40 rounded-xl overflow-hidden bg-slate-900 mb-3 flex items-center justify-center">
                            <img
                              src={acc.image}
                              alt={acc.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] font-mono font-bold uppercase text-cyan-600">
                              {acc.subCategory}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              SKU: {acc.sku}
                            </span>
                          </div>
                          <h3 className="text-xs font-bold text-slate-900 line-clamp-2 mb-1 group-hover:text-cyan-600 transition-colors">
                            {acc.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mb-2 font-mono">
                            {acc.specs}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div className="font-mono font-black text-slate-900 text-sm">
                            <PriceTag amount={acc.price} />
                          </div>
                          <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                              `Hello LapMart! I am interested in purchasing ${acc.name} (SKU: ${acc.sku}) listed at Rs. ${acc.price}. Is this in stock?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors"
                          >
                            Inquire
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </section>

      </main>

      {/* Comprehensive Footer */}
      <div className="md:pl-16">
        <Footer />
      </div>

      {/* Floating Utilities */}
      <QuickViewModal />
      <CompareDrawer />
      <CartDrawer />
      <WhatsAppFloat />
      <CommandPalette />
    </div>
  );
}

export default function ShopPage() {
  return (
    <StoreProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-xs text-slate-400">Loading LapMart 2030 Store...</div>}>
        <ShopContent />
      </Suspense>
    </StoreProvider>
  );
}
