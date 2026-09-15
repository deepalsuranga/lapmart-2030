"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { LaptopProduct, AccessoryProduct } from "@/types";
import { LAPTOP_PRODUCTS, ACCESSORY_PRODUCTS, WHATSAPP_NUMBER } from "@/data/lapmart-data";
import { useStore } from "@/context/StoreContext";
import { soundFX } from "@/utils/sound";
import { getLaptopSlug } from "@/utils/slug";
import {
  Heart,
  Eye,
  ShoppingCart,
  GitCompare,
  Sparkles,
  Star,
  Check,
  ShieldCheck,
  ArrowRight,
  Zap,
  PhoneCall
} from "lucide-react";
import confetti from "canvas-confetti";

type FilterTab = "ALL" | "GAMING" | "WORKSTATION" | "ULTRABOOK" | "USED" | "ACCESSORIES";

export default function NexoraProductGrid() {
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");
  const [addedId, setAddedId] = useState<string | null>(null);

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    addToCompare,
    compareList,
    formatLKR
  } = useStore();

  const filteredItems = useMemo(() => {
    if (activeTab === "ACCESSORIES") {
      return ACCESSORY_PRODUCTS.slice(0, 8);
    }

    let laptops = [...LAPTOP_PRODUCTS];
    if (activeTab === "GAMING") {
      laptops = laptops.filter((p) => p.category === "Gaming" || p.graphics.includes("RTX"));
    } else if (activeTab === "WORKSTATION") {
      laptops = laptops.filter((p) => p.category === "Workstation");
    } else if (activeTab === "ULTRABOOK") {
      laptops = laptops.filter((p) => p.category === "Ultrabook" || p.category === "Business");
    } else if (activeTab === "USED") {
      laptops = laptops.filter((p) => p.condition === "Used");
    }

    return laptops.slice(0, 8);
  }, [activeTab]);

  const handleAddToCart = (item: LaptopProduct | AccessoryProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
    soundFX.pop();
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);

    try {
      confetti({
        particleCount: 22,
        spread: 45,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        },
        colors: ["#FF5A5F", "#3B82F6", "#F59E0B"]
      });
    } catch {
      // ignore
    }
  };

  const handleWhatsApp = (item: LaptopProduct | AccessoryProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.click();
    const text = `Hello LapMart! I am interested in inquiring about ${item.name} (${item.sku}) listed at ${formatLKR(item.price)}. Is this unit currently available?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="hardware-catalog" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200/60 text-xs font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Hardware Grid</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Explore Curated Rigs & Workstations
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl">
            Factory-sealed gaming machines, Grade A+ certified used workstations, and studio accessories with islandwide warranty & express delivery.
          </p>
        </div>

        <Link
          href="/shop"
          onClick={() => soundFX.click()}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 group shrink-0"
        >
          <span>View All 50+ In Store</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
        {(
          [
            { id: "ALL", label: "All Products" },
            { id: "GAMING", label: "Gaming & RTX" },
            { id: "WORKSTATION", label: "Workstations" },
            { id: "ULTRABOOK", label: "Ultrabooks & Touch" },
            { id: "USED", label: "Certified Used" },
            { id: "ACCESSORIES", label: "Gear & Accessories" }
          ] as const
        ).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.click();
                setActiveTab(tab.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const isLaptop = "specs" in item && typeof item.specs === "object";
          const laptop = isLaptop ? (item as LaptopProduct) : null;
          const isWishlisted = isInWishlist(item.id);
          const isCompared = laptop ? compareList.some((c) => c.id === laptop.id) : false;
          const isJustAdded = addedId === item.id;

          const discountPercent =
            item.originalPrice && item.originalPrice > item.price
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : null;

          return (
            <div
              key={item.id}
              onClick={() => {
                if (laptop) {
                  soundFX.pop();
                  setQuickViewProduct(laptop);
                }
              }}
              className="bg-white rounded-3xl border border-slate-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between overflow-hidden cursor-pointer p-4 relative"
            >
              {/* Top Floating Badges & Action Buttons */}
              <div className="flex items-start justify-between gap-2 mb-2 z-10">
                <div className="flex flex-wrap items-center gap-1.5">
                  {laptop && (
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        laptop.condition === "Brand New"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                          : "bg-blue-50 text-blue-700 border border-blue-200/80"
                      }`}
                    >
                      {laptop.condition === "Brand New" ? "Brand New" : "Certified Used"}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-500 text-white shadow-sm">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {/* Quick Action Heart & Compare Icons */}
                <div className="flex items-center gap-1">
                  {laptop && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFX.click();
                        addToCompare(laptop);
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isCompared
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                      title={isCompared ? "In Compare List" : "Add to Compare"}
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFX.click();
                      toggleWishlist(item.id);
                    }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isWishlisted
                        ? "bg-rose-50 text-rose-600"
                        : "bg-slate-100 text-slate-500 hover:text-rose-500 hover:bg-rose-50"
                    }`}
                    title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${isWishlisted ? "fill-rose-600 text-rose-600" : ""}`}
                    />
                  </button>
                </div>
              </div>

              {/* Product Visual Container (Elevated 3D Studio Look) */}
              <div className="relative h-44 w-full rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/60 overflow-hidden flex items-center justify-center p-3 my-2 border border-slate-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                />

                {/* Quick View Floating Eye Overlay on Hover */}
                {laptop && (
                  <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-slate-900 font-bold text-xs shadow-lg hover:scale-105 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      <span>Quick View</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="pt-2 flex-1 flex flex-col justify-between">
                <div>
                  {/* Brand and Rating */}
                  <div className="flex items-center justify-between gap-1 text-[11px] mb-1">
                    <span className="font-extrabold uppercase tracking-wider text-slate-400">
                      {laptop ? laptop.brand : item.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      <span>{laptop ? laptop.rating.toFixed(1) : "4.8"}</span>
                    </div>
                  </div>

                  {/* Title */}
                  {laptop ? (
                    <Link
                      href={`/product/${getLaptopSlug(laptop)}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFX.click();
                      }}
                      className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug hover:text-blue-600 transition-colors block"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                  )}

                  {/* Hardware Spec Chips for Laptops */}
                  {laptop && (
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {laptop.ram.split(" ")[0]} RAM
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {laptop.storage.split(" ")[0]} SSD
                      </span>
                      {laptop.graphics.includes("RTX") && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/60">
                          {laptop.graphics.split(" ")[2] || "RTX"}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Guarantee Pill */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">
                      {laptop ? laptop.specs.warranty?.split("•")[0] || "1 Year LapMart Warranty" : "Genuine Hardware Warranty"}
                    </span>
                  </div>
                </div>

                {/* Pricing and Add to Cart Row */}
                <div className="pt-4 border-t border-slate-100 mt-3 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-base sm:text-lg font-black text-slate-900 leading-none">
                      {formatLKR(item.price)}
                    </div>
                    {item.originalPrice && (
                      <div className="text-[11px] text-slate-400 line-through mt-0.5">
                        {formatLKR(item.originalPrice)}
                      </div>
                    )}
                  </div>

                  {/* Buttons: WhatsApp Inquiry + Add to Cart */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleWhatsApp(item, e)}
                      className="w-9 h-9 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition-colors cursor-pointer"
                      title="Direct Showroom WhatsApp Inquiry"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                        isJustAdded
                          ? "bg-emerald-600 text-white shadow-emerald-500/20"
                          : "bg-[#FF5A5F] hover:bg-[#fa4349] text-white shadow-rose-500/20 hover:scale-105 active:scale-95"
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Conversion Banner */}
      <div className="mt-10 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black shrink-0 shadow-lg shadow-amber-500/20">
            <Zap className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Need Custom RAM, NVMe Upgrades, or Showroom Reservations?
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Talk directly with our certified hardware technicians in Colombo, Kandy, Anuradhapura & Kurunegala.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="/shop"
            onClick={() => soundFX.click()}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold transition-all"
          >
            All 50+ Models
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello LapMart! I am looking for custom laptop specs and upgrade options."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.click()}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all"
          >
            Chat WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
