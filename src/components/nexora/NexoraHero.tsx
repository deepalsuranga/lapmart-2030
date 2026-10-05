"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  MapPin,
  CreditCard,
  ArrowRight,
  Star,
  CheckCircle2,
  Cpu,
  Zap,
  PhoneCall,
  Flame,
  Tag,
  Gift,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";
import { soundFX } from "@/utils/sound";
import { useStore } from "@/context/StoreContext";
import { LAPTOP_PRODUCTS, WHATSAPP_NUMBER } from "@/data/lapmart-data";
import { LaptopProduct } from "@/types";

export default function NexoraHero() {
  const { addToCart, setQuickViewProduct, formatLKR } = useStore();
  const [activeOffer, setActiveOffer] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);

  const heroOffers = [
    {
      id: "offer-nitro-16",
      tabLabel: "🔥 Nitro 16 AI",
      badge: "MEGA GAMING OFFER",
      product: LAPTOP_PRODUCTS[0],
      dealTitle: "Acer Nitro 16 AI Edition | Ryzen 7 • RTX 4060",
      specHighlight: "Ryzen 7 7840HS • 16GB DDR5 • 1TB Gen4 SSD • RTX 4060 8GB",
      originalPrice: 420000,
      offerPrice: 385000,
      discountLabel: "SAVE RS. 35,000",
      giftHighlight: "+ FREE 6-Pc VIP Pack Included",
      freebies: ["CyberArmor Backpack", "Silent Mouse", "Silicone Shield", "Screen Care"],
      couponCode: "NITROVIP",
      stockStatus: "In Stock (7 Branches)",
      image: "/generated/products/nitro-studio.jpg"
    },
    {
      id: "offer-rog-strix",
      tabLabel: "⚡ ROG Strix i9",
      badge: "TITAN GAMING BEAST",
      product: LAPTOP_PRODUCTS[5] || LAPTOP_PRODUCTS[0],
      dealTitle: "ASUS ROG Strix G16 2030 Edition | RTX 4070",
      specHighlight: "Core i9-14900HX 24-Core • 32GB DDR5 • 1TB Gen4 • 240Hz Nebula",
      originalPrice: 580000,
      offerPrice: 545000,
      discountLabel: "SAVE RS. 35,000",
      giftHighlight: "+ FREE ROG Bag & Dual Mouse",
      freebies: ["ROG Armor Bag", "Wireless Mouse", "2-Yr Comprehensive Warranty"],
      couponCode: "ROGTITAN",
      stockStatus: "Only 4 Units Left",
      image: "/generated/products/rog-studio.jpg"
    },
    {
      id: "offer-thinkpad",
      tabLabel: "💼 ThinkPad Touch",
      badge: "EXECUTIVE CLEARANCE",
      product: LAPTOP_PRODUCTS[1] || LAPTOP_PRODUCTS[0],
      dealTitle: "Lenovo ThinkPad T490 Touch | Core i5",
      specHighlight: "Core i5 8th Gen • 8GB RAM • 256GB SSD • 14\" Touch • Grade A+",
      originalPrice: 100000,
      offerPrice: 97000,
      discountLabel: "UNDER RS. 100K",
      giftHighlight: "+ FREE Executive Bag & Mouse",
      freebies: ["Targus Bag", "Silent Mouse", "2-Yr Free Service"],
      couponCode: "THINKPRO",
      stockStatus: "Ready in Showrooms",
      image: "/generated/products/thinkpad.webp"
    }
  ];

  const currentDeal = heroOffers[activeOffer] || heroOffers[0];

  // Auto-rotate offers every 5.5s unless hovered
  useEffect(() => {
    if (isAutoPlayPaused) return;
    const timer = setInterval(() => {
      setActiveOffer((prev) => (prev + 1) % heroOffers.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlayPaused, heroOffers.length]);

  const trustPillars = [
    {
      icon: ShieldCheck,
      title: "2-Year Official Warranty",
      sub: "Comprehensive Hardware Cover"
    },
    {
      icon: Truck,
      title: "Islandwide Express Delivery",
      sub: "24-48h Safe Courier to Door"
    },
    {
      icon: MapPin,
      title: "7 Physical Showrooms",
      sub: "Colombo, Kandy, Kurunegala +"
    },
    {
      icon: CreditCard,
      title: "0% Installment Plans",
      sub: "Available via Koko & Mintpay"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0A0D18] text-slate-900 dark:text-white pt-9 sm:pt-12 md:pt-14 pb-4 sm:pb-6 min-h-0 flex flex-col justify-center transition-colors duration-500">

      {/* 1. HIGH-RESOLUTION COMMERCIAL STUDIO SHOWCASE BACKGROUND (LIGHT & DARK DUAL STAGE) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        {/* LIGHT MODE COMMERCIAL SHOWCASE IMAGE */}
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out opacity-100 dark:opacity-0">
          <Image
            src="/generated/hero-commercial-studio-light.jpg"
            alt="LapMart Commercial Tech Studio Showcase (Light Theme)"
            fill
            priority
            quality={95}
            className="object-cover object-[75%_center] lg:object-right transition-transform duration-1000 scale-[1.01]"
          />
          {/* Architectural Daylight High-Key Contrast Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/95 md:via-[#F8FAFC]/80 lg:via-[#F8FAFC]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-transparent to-[#F8FAFC]/50"></div>
        </div>

        {/* DARK MODE COMMERCIAL SHOWCASE IMAGE */}
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out opacity-0 dark:opacity-100">
          <Image
            src="/generated/hero-commercial-studio.jpg"
            alt="LapMart Commercial Flagship Studio Showcase (Dark Theme)"
            fill
            priority
            quality={95}
            className="object-cover object-[70%_center] lg:object-right transition-transform duration-1000 scale-[1.01]"
          />
          {/* Obsidian Architectural Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D18] via-[#0A0D18]/95 md:via-[#0A0D18]/80 lg:via-[#0A0D18]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18] via-transparent to-[#0A0D18]/60"></div>
        </div>
      </div>

      {/* 2. HERO CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">

          {/* LEFT COLUMN: Human Retail Copy & Trust Anchors */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Top Verified Retail Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 border border-slate-200 dark:border-white/15 text-xs text-amber-700 dark:text-amber-300 backdrop-blur-md mb-2.5 w-fit shadow-xs dark:shadow-md transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold tracking-wide">
                Sri Lanka&apos;s Authorized Laptop Network • 7 Showrooms Open Daily
              </span>
            </div>

            {/* High-Impact Retail Headline */}
            <h1 className="text-2xl sm:text-4xl xl:text-5xl font-black tracking-tight leading-[1.15] mb-2.5 drop-shadow-xs dark:drop-shadow-lg text-slate-950 dark:text-white transition-colors">
              Engineering-Grade Rigs. <br />
              <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 dark:from-amber-300 dark:via-rose-400 dark:to-indigo-300 bg-clip-text text-transparent">
                Commercial Confidence.
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl font-normal leading-relaxed mb-3.5 transition-colors line-clamp-2 sm:line-clamp-none">
              Explore Sri Lanka&apos;s curated catalog of factory-sealed brand new flagships and Grade A+ certified business workstations. Every machine passes our rigorous 45-point hardware diagnostic before dispatch.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
              <Link
                href="/shop"
                onClick={() => soundFX.pop()}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs tracking-wide shadow-md shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Browse All 50+ Models</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-slate-950" />
              </Link>

              <button
                onClick={() => {
                  soundFX.click();
                  const el = document.querySelector("#showrooms");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white font-semibold text-xs backdrop-blur-md shadow-xs dark:shadow-md transition-all duration-200 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                <span>Find Showroom</span>
              </button>
            </div>

            {/* Verified Customer Rating & Social Proof */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex items-center text-amber-500 dark:text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-200">
                <strong>4.9 / 5</strong> from 1,200+ verified customer reviews in Sri Lanka
              </span>
            </div>

            {/* 4 Commercial Trust Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 border-t border-slate-200 dark:border-white/10 max-w-2xl transition-colors">
              {trustPillars.map((badge, idx) => {
                const IconComponent = badge.icon;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 backdrop-blur-md flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-xs">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                        {badge.title}
                      </div>
                      <div className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 truncate max-w-[110px]">
                        {badge.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* RIGHT COLUMN: ATTRACTIVE EXCLUSIVE SHOWROOM OFFERS SHOWCASE */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div
              onMouseEnter={() => setIsAutoPlayPaused(true)}
              onMouseLeave={() => setIsAutoPlayPaused(false)}
              className="w-full max-w-lg backdrop-blur-2xl bg-white/95 dark:bg-slate-900/90 border border-amber-500/30 rounded-3xl p-3.5 sm:p-4 shadow-[0_20px_60px_-15px_rgba(245,158,11,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.2)] text-left relative overflow-hidden group transition-all duration-300"
            >
              {/* Subtle top ambient glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none"></div>

              {/* Offer Card Header & Navigation */}
              <div className="relative z-10 flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200 dark:border-white/10 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" />
                    Exclusive Showroom Offers
                  </span>
                </div>

                {/* Offer Step Dots & Direction Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      soundFX.click();
                      setActiveOffer((prev) => (prev === 0 ? heroOffers.length - 1 : prev - 1));
                    }}
                    className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    title="Previous Offer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 px-1">
                    {activeOffer + 1}/{heroOffers.length}
                  </span>
                  <button
                    onClick={() => {
                      soundFX.click();
                      setActiveOffer((prev) => (prev === heroOffers.length - 1 ? 0 : prev + 1));
                    }}
                    className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    title="Next Offer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Offer Selector Tabs (Quick Deals Switcher - 3 Products) */}
              <div className="relative z-10 grid grid-cols-3 gap-1 mb-2 p-1 bg-slate-100/90 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 transition-colors">
                {heroOffers.map((deal, idx) => (
                  <button
                    key={deal.id}
                    onClick={() => {
                      soundFX.tick();
                      setActiveOffer(idx);
                    }}
                    className={`py-1.5 px-1 rounded-xl text-[11px] font-black transition-all text-center truncate cursor-pointer ${activeOffer === idx
                        ? "bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-black"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5"
                      }`}
                  >
                    {deal.tabLabel}
                  </button>
                ))}
              </div>

              {/* Product Visual Container with Floating Deal Badges */}
              <div
                onClick={() => {
                  soundFX.pop();
                  if (currentDeal.product) setQuickViewProduct(currentDeal.product);
                }}
                className="relative z-10 my-1.5 h-32 sm:h-36 w-full rounded-2xl bg-gradient-to-b from-slate-100/80 via-slate-50 to-white dark:from-white/10 dark:via-white/5 dark:to-transparent border border-slate-200/90 dark:border-white/10 flex items-center justify-center p-2 cursor-pointer group/stage overflow-hidden shadow-inner transition-colors"
              >
                {/* Product Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={currentDeal.image}
                    alt={currentDeal.dealTitle}
                    fill
                    sizes="(max-width: 640px) 100vw, 450px"
                    priority
                    className="object-contain p-2 group-hover/stage:scale-105 transition-transform duration-500 drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* Floating Badge Top Left: Savings */}
                <div className="absolute top-2.5 left-2.5 z-20">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600 text-white font-black text-[10px] uppercase tracking-wide shadow-lg shadow-rose-600/30">
                    <Tag className="w-3 h-3" />
                    {currentDeal.discountLabel}
                  </span>
                </div>

                {/* Floating Badge Top Right: Condition / Stock */}
                <div className="absolute top-2.5 right-2.5 z-20">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/20 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    {currentDeal.stockStatus}
                  </span>
                </div>

                {/* Free VIP Pack Banner Bottom of Image */}
                <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between text-[10px] font-bold text-amber-300 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/30 shadow-md pointer-events-none">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{currentDeal.giftHighlight}</span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase">Worth Rs. 35K</span>
                </div>
              </div>

              {/* Offer Details & Title */}
              <div className="relative z-10 pt-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {currentDeal.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    CODE: <strong className="text-slate-900 dark:text-white">{currentDeal.couponCode}</strong>
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-1 leading-snug mb-1 transition-colors">
                  {currentDeal.dealTitle}
                </h3>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-mono line-clamp-1 mb-2 transition-colors">
                  {currentDeal.specHighlight}
                </p>

                {/* Freebies Mini Strip */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 text-[10px] text-slate-600 dark:text-slate-300 transition-colors">
                  <Gift className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0 ml-1" />
                  <span className="font-semibold text-slate-900 dark:text-white">Includes:</span>
                  {currentDeal.freebies.map((freebie, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 text-slate-700 dark:text-slate-200 text-[9px] font-medium border border-slate-200/60 dark:border-transparent"
                    >
                      {freebie}
                    </span>
                  ))}
                </div>

                {/* Pricing & Stock Details */}
                <div className="flex items-baseline justify-between pt-1.5 border-t border-slate-200 dark:border-white/10 mb-2 transition-colors">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-xs text-slate-400 line-through">
                        {formatLKR(currentDeal.originalPrice)}
                      </span>
                      <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/20 px-1.5 py-0.2 rounded border border-rose-200 dark:border-rose-500/30">
                        OFFER PRICE
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 tracking-tight transition-colors">
                      {formatLKR(currentDeal.offerPrice)}
                    </div>
                    <div className="text-[9px] text-slate-500 dark:text-slate-400">
                      Or ~Rs. {Math.round(currentDeal.offerPrice / 12).toLocaleString("en-LK")}/mo (0% Installments)
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Availability</div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>7 Showrooms</span>
                    </div>
                    <div className="text-[9px] text-slate-500 dark:text-slate-400 mt-0.5">Immediate Pickup</div>
                  </div>
                </div>

                {/* Primary Conversion Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hello LapMart! I would like to claim the special offer for ${currentDeal.dealTitle} with promo code ${currentDeal.couponCode} priced at ${formatLKR(
                        currentDeal.offerPrice
                      )}. Please hold a unit for me at my nearest showroom!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.success()}
                    className="w-full py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={(e) => {
                      if (currentDeal.product) {
                        addToCart(currentDeal.product);
                        soundFX.cart();
                        try {
                          confetti({
                            particleCount: 25,
                            spread: 50,
                            origin: {
                              x: e.clientX / window.innerWidth,
                              y: e.clientY / window.innerHeight
                            },
                            colors: ["#F59E0B", "#10B981", "#EF4444"]
                          });
                        } catch {
                          // ignore
                        }
                      }
                    }}
                    className="w-full py-2 px-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-slate-950" />
                    <span>Add to Cart</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
