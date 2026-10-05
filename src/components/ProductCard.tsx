"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { LaptopProduct } from "@/types";
import { useStore } from "@/context/StoreContext";
import { WHATSAPP_NUMBER } from "@/data/lapmart-data";
import { getLaptopSlug } from "@/utils/slug";
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
      className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-slate-300 transition-all duration-300 overflow-hidden p-4 sm:p-5 text-left"
    >
      {/* Top Badges & Status */}
      <div className="flex items-start justify-between z-10 gap-2 mb-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {product.isSale && (
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-extrabold text-[10px] tracking-wide uppercase shadow-sm">
              SPECIAL OFFER
            </span>
          )}
          {product.isHot && !product.isSale && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] tracking-wide uppercase shadow-sm">
              HOT SELLER
            </span>
          )}
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              product.condition === "Brand New"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80"
                : "bg-blue-50 text-blue-800 border border-blue-200/80"
            }`}
          >
            {product.condition === "Brand New" ? "Factory Sealed" : "Certified Grade A+"}
          </span>
        </div>

        {/* SKU indicator */}
        <span className="text-[10px] font-mono text-slate-400 shrink-0">SKU: {product.sku}</span>
      </div>

      {/* Product Image Stage — Clean Studio Backdrop */}
      <div
        onClick={() => {
          soundFX.click();
          setQuickViewProduct(product);
        }}
        className="relative my-3 aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-100 flex items-center justify-center cursor-pointer p-4 group-hover:bg-slate-100/90 transition-colors"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />

        {/* Hover Quick-Action HUD Overlay */}
        <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
          <button
            onClick={handleAddToCartClick}
            className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
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
            title="Quick View Specs"
          >
            <Eye className="w-4 h-4 text-slate-700" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCompare(product);
            }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer ${
              isCompared ? "bg-blue-600 text-white" : "bg-white text-slate-800 hover:bg-slate-100"
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
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : "text-slate-700"}`} />
          </button>
        </div>

        {/* Free VIP Pack Badge on image bottom */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-semibold text-slate-700 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-sm pointer-events-none">
          <span className="flex items-center gap-1 text-amber-700">
            <Sparkles className="w-3 h-3 text-amber-500" />
            + 6-Piece Free VIP Pack
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase">Worth Rs. 35,000</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            {product.brand}
          </span>
          <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            In Stock ({product.stockCount})
          </span>
        </div>

        {/* Title */}
        <Link
          href={`/product/${getLaptopSlug(product)}`}
          onClick={() => soundFX.click()}
          className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-2 leading-snug transition-colors block"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Hardware Chips */}
        <div className="flex flex-wrap gap-1 pt-1">
          <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md truncate max-w-[170px]">
            {product.processor}
          </span>
          <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
            {product.ram}
          </span>
          <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
            {product.storage}
          </span>
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
                  <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-100">
                    Save {formatLKR(savingsAmount).replace(".00", "")}
                  </span>
                )}
              </div>
            )}
            <div>
              <PriceTag
                amount={product.price}
                className="text-base sm:text-lg font-black text-slate-900 font-mono tracking-tight"
                decimalClassName="text-[0.6em] font-bold opacity-75 ml-0.5"
              />
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Or ~Rs. {Math.round(product.price / 12).toLocaleString("en-LK")}/mo (12 mo EMI)
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAddToCartClick}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer shadow-sm"
              title="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
            <button
              onClick={handleWhatsAppInquiry}
              className="p-2 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
              title="Instant WhatsApp inquiry"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
