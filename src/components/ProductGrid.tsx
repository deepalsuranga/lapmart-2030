"use client";

import React, { useMemo } from "react";
import { LAPTOP_PRODUCTS } from "@/data/lapmart-data";
import { useStore } from "@/context/StoreContext";
import BrandSelector from "@/components/BrandSelector";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, ArrowUpDown, Sparkles, AlertCircle } from "lucide-react";

export default function ProductGrid() {
  const { filters, setFilters, resetFilters } = useStore();

  const filteredProducts = useMemo(() => {
    return LAPTOP_PRODUCTS.filter((product) => {
      // Brand filter
      if (filters.brand !== "ALL" && product.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }
      // Condition filter
      if (filters.condition !== "ALL" && product.condition !== filters.condition) {
        return false;
      }
      // Processor filter
      if (filters.processor !== "ALL") {
        if (filters.processor.includes("i7") && !product.processor.toLowerCase().includes("i7")) return false;
        if (filters.processor.includes("i5") && !product.processor.toLowerCase().includes("i5")) return false;
        if (filters.processor.includes("Ryzen") && !product.processor.toLowerCase().includes("ryzen")) return false;
        if (filters.processor.includes("Apple") && product.brand !== "Apple") return false;
      }
      // Category filter
      if (filters.category !== "ALL") {
        if (filters.category === "Gaming" && product.category !== "Gaming") return false;
        if (filters.category === "Workstation" && product.category !== "Workstation") return false;
        if (filters.category === "Ultrabook" && product.category !== "Ultrabook") return false;
      }
      // Price range
      if (product.price > filters.priceRange[1] || product.price < filters.priceRange[0]) {
        return false;
      }
      // Search query
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
      return 0; // default featured
    });
  }, [filters]);

  return (
    <section id="product-catalog" className="py-12 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Brand Selector Bar */}
        <BrandSelector />

        {/* Action Header & Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-slate-900">
              Verified Hardware Fleet
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-mono font-bold">
              {filteredProducts.length} Laptops Available
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
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
                <option value="score">Top AI & Gaming Score</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div
          id="product-catalog-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-6"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-16 text-center glass-panel bg-white/90 rounded-2xl border border-slate-200 p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-slate-900">No Laptops Match These Filters</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try widening your budget range, clearing the brand selector, or clearing your search term.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/25 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
