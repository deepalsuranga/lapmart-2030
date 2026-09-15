"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { LAPMART_BRANCHES, WHATSAPP_NUMBER } from "@/data/lapmart-data";
import { getLaptopSlug } from "@/utils/slug";
import {
  X,
  ShoppingCart,
  GitCompare,
  Heart,
  MessageSquare,
  CheckCircle2,
  MapPin,
  Cpu,
  Zap,
  Gauge,
  Battery,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";
import PriceTag from "@/components/PriceTag";
import confetti from "canvas-confetti";
import { soundFX } from "@/utils/sound";

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    addToCompare,
    compareList,
    toggleWishlist,
    isInWishlist,
    formatLKR
  } = useStore();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);
  const isCompared = compareList.some((p) => p.id === quickViewProduct.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    addToCart(quickViewProduct, quantity);
    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#ff6b00", "#10b981", "#06b6d4"]
      });
    } catch {
      // ignore
    }
  };

  const handleWhatsAppOrder = () => {
    const text = `Hello LapMart Sri Lanka! I am interested in purchasing:\n\n*${quickViewProduct.name}*\nSKU: ${quickViewProduct.sku}\nPrice: ${formatLKR(quickViewProduct.price)}\nCondition: ${quickViewProduct.condition}\n\nPlease let me know the availability and payment options!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel bg-white/95 rounded-3xl border border-slate-200/90 shadow-2xl p-5 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Gallery Stage (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 flex items-center justify-center">
              <img
                src={quickViewProduct.gallery[selectedImageIdx] || quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 font-mono text-[10px] font-bold border border-amber-400/30">
                2030 HARDWARE HUD
              </div>
            </div>

            {/* Thumbnails */}
            {quickViewProduct.gallery.length > 1 && (
              <div className="flex items-center gap-2">
                {quickViewProduct.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIdx(i)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIdx === i ? "border-amber-500 scale-105" : "border-slate-200 opacity-70"
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* 2030 Telemetry Benchmark Meters */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1 text-amber-600">
                  <Sparkles className="w-3.5 h-3.5" /> Hardware Telemetry (2030 Index)
                </span>
                <span className="font-mono text-slate-400">BENCH-V5</span>
              </div>

              {/* Gaming Score */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="flex items-center gap-1 text-slate-600">
                    <Gauge className="w-3 h-3 text-cyan-500" /> Gaming & GPU Compute
                  </span>
                  <span className="font-mono font-bold text-slate-800">{quickViewProduct.scores.gaming}/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                    style={{ width: `${quickViewProduct.scores.gaming}%` }}
                  />
                </div>
              </div>

              {/* AI Compute */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="flex items-center gap-1 text-slate-600">
                    <Zap className="w-3 h-3 text-amber-500" /> AI / NPU TOPS Rating
                  </span>
                  <span className="font-mono font-bold text-slate-800">{quickViewProduct.scores.aiCompute}/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                    style={{ width: `${quickViewProduct.scores.aiCompute}%` }}
                  />
                </div>
              </div>

              {/* Battery Score */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="flex items-center gap-1 text-slate-600">
                    <Battery className="w-3 h-3 text-emerald-500" /> Battery Efficiency
                  </span>
                  <span className="font-mono font-bold text-slate-800">{quickViewProduct.scores.batteryLife}/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    style={{ width: `${quickViewProduct.scores.batteryLife}%` }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Info & Actions (7 Cols) */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Brand, Condition & SKU */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-mono">
                {quickViewProduct.brand}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                {quickViewProduct.condition === "Brand New" ? "Factory Sealed" : "Grade A+ Refurbished"}
              </span>
              <span className="text-xs font-mono text-slate-400">SKU: {quickViewProduct.sku}</span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {quickViewProduct.name}
            </h2>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 block">LKR Cash / Card Price:</span>
                <div>
                  <PriceTag
                    amount={quickViewProduct.price}
                    className="text-2xl sm:text-3xl font-black text-amber-600 font-mono tracking-tight"
                    decimalClassName="text-[0.6em] font-bold opacity-75 ml-0.5"
                  />
                </div>
              </div>
              {quickViewProduct.originalPrice && (
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Original List:</span>
                  <PriceTag
                    amount={quickViewProduct.originalPrice}
                    className="text-sm font-bold text-slate-400 line-through"
                    decimalClassName="text-[0.7em] opacity-70 ml-0.5"
                  />
                </div>
              )}
            </div>

            {/* Detailed Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Processor</span>
                <span className="font-bold text-slate-800 line-clamp-1">{quickViewProduct.processor}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Graphics</span>
                <span className="font-bold text-slate-800 line-clamp-1">{quickViewProduct.graphics}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Memory & Storage</span>
                <span className="font-bold text-slate-800 line-clamp-1">{quickViewProduct.ram} • {quickViewProduct.storage}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Display</span>
                <span className="font-bold text-slate-800 line-clamp-1">{quickViewProduct.display}</span>
              </div>
            </div>

            {/* Warranty & Condition Note */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{quickViewProduct.specs.warranty}</span>
            </div>

            {/* Available Branches */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                Physical Branch Stock Verification
              </span>
              <div className="flex flex-wrap gap-1.5">
                {LAPMART_BRANCHES.map((b) => {
                  const isAvail = quickViewProduct.availableBranches.includes(b.id);
                  return (
                    <span
                      key={b.id}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 ${
                        isAvail
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-slate-100 text-slate-400 line-through"
                      }`}
                    >
                      {isAvail ? "✓" : "×"} {b.city}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Purchase & Action Controls */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3">
              
              {/* Quantity */}
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200"
                >
                  -
                </button>
                <span className="px-3 py-2.5 text-xs font-mono font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add To Cart</span>
              </button>

              {/* WhatsApp Checkout */}
              <button
                onClick={handleWhatsAppOrder}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                title="Instant Order on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </button>

              {/* Compare Button */}
              <button
                onClick={() => addToCompare(quickViewProduct)}
                className={`p-3 rounded-xl border transition-colors ${
                  isCompared
                    ? "bg-cyan-500 text-white border-cyan-500"
                    : "border-slate-200 text-slate-700 hover:border-amber-400"
                }`}
                title="Compare with another model"
              >
                <GitCompare className="w-4 h-4" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  isFavorited
                    ? "bg-rose-500 text-white border-rose-500"
                    : "border-slate-200 text-slate-700 hover:border-rose-400"
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`} />
              </button>
            </div>

            {/* Direct Link to Full Product Page */}
            <div className="pt-2">
              <Link
                href={`/product/${getLaptopSlug(quickViewProduct)}`}
                onClick={() => {
                  soundFX.click();
                  setQuickViewProduct(null);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Full Page (Custom RAM/SSD Upgrades & Free 6-Piece VIP Pack)</span>
                <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
