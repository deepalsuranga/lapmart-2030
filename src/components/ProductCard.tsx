"use client";

import React, { useRef } from "react";
import { LaptopProduct } from "@/types";
import { useStore } from "@/context/StoreContext";
import { WHATSAPP_NUMBER } from "@/data/lapmart-data";
import {
  Eye,
  ShoppingCart,
  GitCompare,
  Heart,
  CheckCircle2,
  Sparkles,
  Zap,
  Gauge,
  Flame,
  MessageSquare,
  Cpu,
  Layers,
  HardDrive
} from "lucide-react";
import PriceTag from "@/components/PriceTag";
import { soundFX } from "@/utils/sound";
import gsap from "gsap";
import confetti from "canvas-confetti";

interface ProductCardProps {
  product: LaptopProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const {
    addToCart,
    addToCompare,
    compareList,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    filters,
    formatLKR
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const isCompared = compareList.some((p) => p.id === product.id);

  // Dynamic persona score
  let matchScore = 0;
  if (filters.workflowPersona === "GAMING") {
    matchScore = product.scores.gaming;
  } else if (filters.workflowPersona === "3D_RENDER") {
    matchScore = Math.round((product.scores.aiCompute + product.scores.productivity) / 2);
  } else if (filters.workflowPersona === "CODING_UNI") {
    matchScore = Math.round((product.scores.batteryLife + product.scores.productivity) / 2);
  } else if (filters.workflowPersona === "BUSINESS") {
    matchScore = product.scores.batteryLife;
  }

  // GSAP 3D interactive tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power1.out",
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);

    try {
      confetti({
        particleCount: 20,
        spread: 45,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        },
        colors: ["#ff6b00", "#10b981"]
      });
    } catch {
      // ignore
    }
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.click();
    const text = `Hello LapMart! I would like to inquire about ${product.name} (SKU: ${product.sku}) listed at ${formatLKR(product.price)}. Is it available for immediate dispatch?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const savingsAmount = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between rounded-3xl glass-panel bg-white/95 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300 overflow-hidden p-4 sm:p-5 text-left"
    >
      {/* Top Floating Badges */}
      <div className="flex items-start justify-between z-10">
        <div className="flex flex-wrap items-center gap-1.5">
          {product.isSale && (
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[10px] tracking-tight shadow-sm uppercase">
              SALE
            </span>
          )}
          {product.isHot && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-black text-[10px] tracking-tight shadow-sm uppercase">
              HOT
            </span>
          )}
          {matchScore > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-300 font-mono font-bold text-[10px]">
              ★ {matchScore}% MATCH
            </span>
          )}
        </div>

        {/* Condition & SKU indicator */}
        <div className="flex flex-col items-end gap-0.5">
          <span
            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
              product.condition === "Brand New"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-blue-50 text-blue-800 border border-blue-200"
            }`}
          >
            {product.condition === "Brand New" ? "BRAND NEW" : "CERTIFIED USED A+"}
          </span>
          <span className="text-[10px] font-mono text-slate-400">SKU: {product.sku}</span>
        </div>
      </div>

      {/* Product Image Stage */}
      <div
        onClick={() => {
          soundFX.click();
          setQuickViewProduct(product);
        }}
        className="relative my-3 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center cursor-pointer group-hover:bg-slate-900 transition-colors shadow-inner"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Hover Quick-Action HUD Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
          
          <button
            onClick={handleAddToCartClick}
            className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.click();
              setQuickViewProduct(product);
            }}
            className="w-10 h-10 rounded-xl bg-white text-slate-800 hover:bg-slate-100 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
            title="Quick View Hologram"
          >
            <Eye className="w-4 h-4 text-slate-700" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCompare(product);
            }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer ${
              isCompared ? "bg-cyan-500 text-white" : "bg-white text-slate-800 hover:bg-slate-100"
            }`}
            title="Compare Specs"
          >
            <GitCompare className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer ${
              isFavorited ? "bg-rose-500 text-white" : "bg-white text-slate-800 hover:bg-slate-100"
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : "text-slate-700"}`} />
          </button>
        </div>

        {/* 2030 Telemetry Mini Bar on card */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-white/90 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg pointer-events-none">
          <span className="flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 text-amber-400" />
            AI: {product.scores.aiCompute}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="w-2.5 h-2.5 text-cyan-400" />
            FPS: {product.scores.gaming}
          </span>
          <span className="text-emerald-400">Bat: {product.scores.batteryLife}%</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            {product.brand}
          </span>
          <span className="text-[10px] font-mono font-semibold text-emerald-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            In Stock ({product.stockCount})
          </span>
        </div>

        {/* Title */}
        <h4
          onClick={() => {
            soundFX.click();
            setQuickViewProduct(product);
          }}
          className="text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-600 cursor-pointer line-clamp-2 leading-snug transition-colors"
          title={product.name}
        >
          {product.name}
        </h4>

        {/* Spec bullet line */}
        <div className="text-[11px] text-slate-500 line-clamp-1 font-mono">
          {product.processor} • {product.ram}
        </div>

        {/* Pricing Block */}
        <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between gap-2">
          <div>
            {product.originalPrice && (
              <div className="flex items-center gap-1.5 mb-0.5">
                <PriceTag
                  amount={product.originalPrice}
                  className="text-[11px] text-slate-400 line-through"
                  decimalClassName="text-[0.7em] opacity-70 ml-0.5"
                />
                {savingsAmount > 0 && (
                  <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    Save {formatLKR(savingsAmount).replace(".00", "")}
                  </span>
                )}
              </div>
            )}
            <div>
              <PriceTag
                amount={product.price}
                className="text-base sm:text-lg font-black text-amber-600 font-mono tracking-tight"
                decimalClassName="text-[0.6em] font-bold opacity-75 ml-0.5"
              />
            </div>
          </div>

          <button
            onClick={handleWhatsAppInquiry}
            className="p-2 rounded-xl text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
            title="Instant WhatsApp inquiry"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
