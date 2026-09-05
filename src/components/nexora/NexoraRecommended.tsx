"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingCart, Eye } from "lucide-react";
import { soundFX } from "@/utils/sound";
import { useStore } from "@/context/StoreContext";
import { LAPTOP_PRODUCTS } from "@/data/lapmart-data";
import { LaptopProduct } from "@/types";

export default function NexoraRecommended() {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
    formatLKR
  } = useStore();

  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Duplicated list for seamless infinity loop
  const baseProducts = LAPTOP_PRODUCTS.slice(0, 8);
  const infiniteProducts = [...baseProducts, ...baseProducts, ...baseProducts];

  // Butter-smooth continuous auto-sliding loop (60fps)
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const speed = 0.6; // Soft continuous drift speed

    const step = () => {
      if (!isPaused && container) {
        container.scrollLeft += speed;
        // When scrolled past 1/3 of the duplicated content, loop seamlessly
        const singleSetWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft -= singleSetWidth;
        }
      }
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused]);

  // Smooth manual scrolling with temporary auto-slide pause
  const handleManualScroll = useCallback((direction: "left" | "right") => {
    soundFX.click();
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);

    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -290 : 290;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    // Resume auto-sliding after 3.5 seconds of user inactivity
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3500);
  }, []);

  const handleQuickView = (product: LaptopProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.pop();
    setQuickViewProduct(product);
  };

  const handleAddToCart = (product: LaptopProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.cart();
    addToCart(product);
  };

  // Helper to format prices with smaller decimals
  const renderFormattedPrice = (price: number) => {
    const formatted = formatLKR(price);
    const parts = formatted.split(".");
    if (parts.length === 2) {
      return (
        <span className="text-xs sm:text-sm font-black text-slate-900">
          {parts[0]}
          <span className="text-[10px] font-normal text-slate-400">.{parts[1]}</span>
        </span>
      );
    }
    return (
      <span className="text-xs sm:text-sm font-black text-slate-900">
        {formatted}
      </span>
    );
  };

  return (
    <section id="recommended" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-8 select-none">
      {/* Header Row: Title, 'See All' & Navigation Arrows */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Recommended For You
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Auto Drift Loop
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Top-rated machines calibrated for performance, reliability & value • Hover to pause
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            onClick={() => soundFX.click()}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            See All
          </Link>

          {/* Carousel Chevrons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleManualScroll("left")}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all cursor-pointer active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll("right")}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all cursor-pointer active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CONTINUOUS SMOOTH AUTO-SLIDING INFINITY LOOP CAROUSEL */}
      <div
        ref={carouselRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
      >
        {infiniteProducts.map((product: LaptopProduct, index: number) => {
          const isWishlisted = wishlist.includes(product.id);

          return (
            <div
              key={`${product.id}-${index}`}
              onClick={(e) => handleQuickView(product, e)}
              className="min-w-[230px] sm:min-w-[250px] max-w-[270px] bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative shrink-0"
            >
              {/* Top Row: Category Pill & Wishlist Heart */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-black/5">
                  {product.category}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFX.pop();
                    toggleWishlist(product.id);
                  }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isWishlisted
                      ? "text-rose-500 bg-rose-50"
                      : "text-slate-300 hover:text-rose-500 hover:bg-slate-50"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`}
                  />
                </button>
              </div>

              {/* Realistic Studio Product Image (Clean 3D Surface with Soft Shadow) */}
              <div className="relative w-full h-36 my-2 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/80 flex items-center justify-center p-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 230px, 250px"
                  className="object-contain p-1 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5">
                  <button
                    onClick={(e) => handleQuickView(product, e)}
                    className="p-2.5 rounded-full bg-white text-slate-900 shadow-lg hover:scale-110 active:scale-95 transition-transform"
                    title="Quick Specs"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="p-2.5 rounded-full bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-transform"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="pt-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 min-h-[38px] group-hover:text-rose-600 transition-colors leading-snug">
                  {product.name}
                </h3>

                {/* Bottom Row: Price & Star Rating */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-medium">LapMart Direct</span>
                    {renderFormattedPrice(product.price)}
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 shadow-xs">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                    <span className="text-[11px] font-bold text-amber-900 font-mono">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
