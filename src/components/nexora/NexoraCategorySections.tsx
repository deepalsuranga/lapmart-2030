"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LaptopProduct, AccessoryProduct } from "@/types";
import { LAPTOP_PRODUCTS, ACCESSORY_PRODUCTS, WHATSAPP_NUMBER } from "@/data/lapmart-data";
import { useStore } from "@/context/StoreContext";
import { soundFX } from "@/utils/sound";
import { getLaptopSlug } from "@/utils/slug";
import {
  Gamepad2,
  Laptop,
  Palette,
  Cpu,
  Monitor,
  Keyboard,
  HardDrive,
  Heart,
  Eye,
  GitCompare,
  Star,
  Check,
  ShieldCheck,
  ArrowRight,
  ShoppingCart,
  PhoneCall,
  Sparkles,
  Zap,
  ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface CategorySectionConfig {
  id: string;
  anchorId: string;
  name: string;
  subtitle: string;
  badge: string;
  icon: React.ElementType;
  accentColor: {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    btnHover: string;
    glow: string;
  };
  shopUrl: string;
  buttonLabel: string;
  products: (LaptopProduct | AccessoryProduct)[];
}

export default function NexoraCategorySections() {
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

  // 1. Gaming Laptops (8 products)
  const gamingLaptops = LAPTOP_PRODUCTS.filter(
    (p) => p.category === "Gaming" || p.graphics.toLowerCase().includes("rtx")
  ).slice(0, 8);

  // 2. Ultrabooks (8 products)
  const ultrabooks = LAPTOP_PRODUCTS.filter(
    (p) => p.category === "Ultrabook"
  ).slice(0, 8);

  // 3. Creator Studio (8 products)
  const creatorLaptops = LAPTOP_PRODUCTS.filter(
    (p) => p.category === "Workstation"
  ).slice(0, 8);

  // 4. Workstations & Business Pro (8 products)
  const businessLaptops = LAPTOP_PRODUCTS.filter(
    (p) => p.category === "Business"
  ).slice(0, 8);

  // 5. Peripherals, Displays & Storage (8 products)
  const accessories = ACCESSORY_PRODUCTS.slice(0, 8);

  const categorySections: CategorySectionConfig[] = [
    {
      id: "gaming",
      anchorId: "cat-gaming",
      name: "Gaming Rigs & Esports Battlestations",
      subtitle: "High-FPS gaming machines engineered with NVIDIA GeForce RTX graphics, high-refresh panels, and liquid thermal cooling.",
      badge: "RTX 40-Series & High FPS",
      icon: Gamepad2,
      accentColor: {
        badgeBg: "bg-rose-50 dark:bg-rose-950/40",
        badgeText: "text-rose-600 dark:text-rose-400",
        badgeBorder: "border-rose-200/80 dark:border-rose-800/40",
        btnHover: "hover:bg-rose-600 hover:border-rose-600 hover:text-white",
        glow: "from-rose-500/10 via-transparent to-transparent"
      },
      shopUrl: "/shop?category=Gaming",
      buttonLabel: "Show More Gaming Rigs",
      products: gamingLaptops
    },
    {
      id: "ultrabooks",
      anchorId: "cat-ultrabooks",
      name: "Ultrabooks & AI Thin-Light Portables",
      subtitle: "Featherweight magnesium builds featuring all-day battery longevity, OLED clarity, and dedicated NPU neural engines.",
      badge: "All-Day Battery & OLED Displays",
      icon: Laptop,
      accentColor: {
        badgeBg: "bg-blue-50 dark:bg-blue-950/40",
        badgeText: "text-blue-600 dark:text-blue-400",
        badgeBorder: "border-blue-200/80 dark:border-blue-800/40",
        btnHover: "hover:bg-blue-600 hover:border-blue-600 hover:text-white",
        glow: "from-blue-500/10 via-transparent to-transparent"
      },
      shopUrl: "/shop?category=Ultrabook",
      buttonLabel: "Show More Ultrabooks",
      products: ultrabooks
    },
    {
      id: "creator",
      anchorId: "cat-creator",
      name: "Creator Studio & 3D Render Stations",
      subtitle: "Color-accurate DCI-P3 displays, massive RAM capacity, and studio-grade GPU acceleration for visual creators and engineers.",
      badge: "100% DCI-P3 & Multi-Core Rendering",
      icon: Palette,
      accentColor: {
        badgeBg: "bg-purple-50 dark:bg-purple-950/40",
        badgeText: "text-purple-600 dark:text-purple-400",
        badgeBorder: "border-purple-200/80 dark:border-purple-800/40",
        btnHover: "hover:bg-purple-600 hover:border-purple-600 hover:text-white",
        glow: "from-purple-500/10 via-transparent to-transparent"
      },
      shopUrl: "/shop?category=Workstation",
      buttonLabel: "Show More Creator Rigs",
      products: creatorLaptops
    },
    {
      id: "workstations",
      anchorId: "cat-workstations",
      name: "Enterprise Workstations & Business Pro",
      subtitle: "Military-spec endurance, hardware TPM encryption, vPro management, and all-day typing comfort.",
      badge: "vPro & Mil-Spec Certified",
      icon: Cpu,
      accentColor: {
        badgeBg: "bg-amber-50 dark:bg-amber-950/40",
        badgeText: "text-amber-600 dark:text-amber-400",
        badgeBorder: "border-amber-200/80 dark:border-amber-800/40",
        btnHover: "hover:bg-amber-600 hover:border-amber-600 hover:text-white",
        glow: "from-amber-500/10 via-transparent to-transparent"
      },
      shopUrl: "/shop?category=Business",
      buttonLabel: "Show More Workstations",
      products: businessLaptops
    },
    {
      id: "peripherals",
      anchorId: "cat-peripherals",
      name: "Peripherals, Displays & Storage Upgrades",
      subtitle: "Esports optical sensors, mechanical gaming decks, PCIe Gen4 NVMe expansion, and high-frequency DDR5 memory.",
      badge: "High-Speed Gear & Storage",
      icon: Keyboard,
      accentColor: {
        badgeBg: "bg-emerald-50 dark:bg-emerald-950/40",
        badgeText: "text-emerald-600 dark:text-emerald-400",
        badgeBorder: "border-emerald-200/80 dark:border-emerald-800/40",
        btnHover: "hover:bg-emerald-600 hover:border-emerald-600 hover:text-white",
        glow: "from-emerald-500/10 via-transparent to-transparent"
      },
      shopUrl: "/shop?tab=accessories",
      buttonLabel: "Show More Gear & Accessories",
      products: accessories
    }
  ];

  const handleAddToCart = (item: LaptopProduct | AccessoryProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
    soundFX.pop();
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);

    try {
      confetti({
        particleCount: 24,
        spread: 50,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        },
        colors: ["#FF5A5F", "#3B82F6", "#10B981"]
      });
    } catch {
      // ignore
    }
  };

  const handleWhatsApp = (item: LaptopProduct | AccessoryProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.click();
    const text = `Hello LapMart! I am inquiring about ${item.name} (${item.sku}) listed at ${formatLKR(item.price)}. Is this unit currently available?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      {/* Hidden anchors for Displays and Components to scroll cleanly */}
      <div id="cat-displays" className="sr-only" />
      <div id="cat-components" className="sr-only" />

      {categorySections.map((section, sIdx) => {
        const IconComponent = section.icon;

        return (
          <section
            key={section.id}
            id={section.anchorId}
            className="relative max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24"
          >
            {/* Ambient subtle glow background */}
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-b ${section.accentColor.glow} pointer-events-none blur-3xl -z-10 rounded-full`}
            />

            {/* Section Header */}
            <ScrollReveal animation="fade-up" duration={600}>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200/70 dark:border-white/10 pb-6">
                <div>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${section.accentColor.badgeBg} ${section.accentColor.badgeText} border ${section.accentColor.badgeBorder} text-xs font-extrabold uppercase tracking-wider mb-2.5 shadow-sm`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{section.badge}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span>{section.name}</span>
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
                    {section.subtitle}
                  </p>
                </div>

                <Link
                  href={section.shopUrl}
                  onClick={() => soundFX.click()}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors group shrink-0 self-start md:self-end px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80"
                >
                  <span>Explore All In Shop</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            {/* 4x2 Product Grid (8 products) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {section.products.map((item, idx) => {
                const laptop = "scores" in item ? (item as LaptopProduct) : null;
                const isWishlisted = isInWishlist(item.id);
                const isCompared = compareList.some((c) => c.id === item.id);
                const isJustAdded = addedId === item.id;
                const discountPercent = item.originalPrice
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                  : null;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (laptop) {
                        soundFX.click();
                        setQuickViewProduct(laptop);
                      }
                    }}
                    className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between overflow-hidden cursor-pointer p-4 relative"
                  >
                    {/* Top Badges & Action Icons */}
                    <div className="flex items-start justify-between gap-2 mb-2 z-10">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {laptop ? (
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              laptop.condition === "Brand New"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/50"
                                : "bg-blue-50 text-blue-700 border border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/50"
                            }`}
                          >
                            {laptop.condition === "Brand New" ? "Brand New" : "Certified Used"}
                          </span>
                        ) : (
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                            {item.category}
                          </span>
                        )}

                        {discountPercent && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-500 text-white shadow-sm">
                            -{discountPercent}%
                          </span>
                        )}
                      </div>

                      {/* Wishlist & Compare Icons */}
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
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50"
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
                              ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          }`}
                          title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${isWishlisted ? "fill-rose-600 text-rose-600" : ""}`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Product Visual Container */}
                    <div className="relative h-44 w-full rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/60 dark:from-slate-800/40 dark:to-slate-900/60 overflow-hidden flex items-center justify-center p-3 my-2 border border-slate-100 dark:border-white/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Quick View Floating Eye Overlay on Hover */}
                      {laptop && (
                        <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white font-bold text-xs shadow-lg hover:scale-105 transition-transform">
                            <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
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
                          <span className="font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {laptop ? laptop.brand : item.category}
                          </span>
                          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200/50 dark:border-amber-700/40">
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
                            className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug hover:text-rose-600 dark:hover:text-rose-400 transition-colors block"
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                            {item.name}
                          </h3>
                        )}

                        {/* Hardware Spec Chips */}
                        {laptop && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {laptop.ram.split(" ")[0]} RAM
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {laptop.storage.split(" ")[0]} SSD
                            </span>
                            {laptop.graphics.includes("RTX") && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50">
                                {laptop.graphics.split(" ")[2] || "RTX"}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Guarantee / Warranty */}
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="truncate">
                            {laptop ? laptop.specs.warranty?.split("•")[0] || "1 Year LapMart Warranty" : "Genuine Hardware Warranty"}
                          </span>
                        </div>
                      </div>

                      {/* Pricing and Action Buttons */}
                      <div className="pt-3 border-t border-slate-100 dark:border-white/10 mt-3 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-none">
                            {formatLKR(item.price)}
                          </div>
                          {item.originalPrice && (
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 line-through mt-0.5">
                              {formatLKR(item.originalPrice)}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => handleWhatsApp(item, e)}
                            className="w-8 h-8 rounded-xl border border-slate-200 dark:border-white/15 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center justify-center transition-colors cursor-pointer"
                            title="Direct Showroom WhatsApp Inquiry"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={(e) => handleAddToCart(item, e)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-sm cursor-pointer ${
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

            {/* Prominent "Show More" Button Inside Every Section */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={section.shopUrl}
                onClick={() => soundFX.click()}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-sm tracking-wide bg-slate-900 hover:bg-rose-600 dark:bg-white/10 dark:hover:bg-rose-600 text-white transition-all duration-200 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-98 group cursor-pointer border border-slate-800 dark:border-white/10`}
              >
                <span>{section.buttonLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}
