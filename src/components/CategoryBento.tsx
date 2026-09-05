"use client";

import React, { useRef, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import { WHATSAPP_NUMBER } from "@/data/lapmart-data";
import { soundFX } from "@/utils/sound";
import {
  Laptop,
  Repeat,
  Smartphone,
  Tablet,
  Headphones,
  ArrowRight,
  Sparkles
} from "lucide-react";
import gsap from "gsap";

export default function CategoryBento() {
  const { setFilters, setActiveBrandTab } = useStore();
  const bentoRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: "brand-new",
      title: "Brand New Laptops",
      subtitle: "Factory Sealed • 2 Year Warranty",
      badge: "Zero Cycles",
      icon: Laptop,
      count: "45+ Models",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      action: () => {
        setFilters((prev) => ({ ...prev, condition: "Brand New", brand: "ALL" }));
        setActiveBrandTab("BRAND NEW");
        document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "used-laptops",
      title: "Certified Used Laptops",
      subtitle: "Tested 45-Point Check • Grade A+",
      badge: "Best Value",
      icon: Repeat,
      count: "60+ Models",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      action: () => {
        setFilters((prev) => ({ ...prev, condition: "Used", brand: "ALL" }));
        setActiveBrandTab("USED");
        document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "smartphones",
      title: "Smart Phones",
      subtitle: "Flagships & Pro Devices",
      badge: "Latest Tech",
      icon: Smartphone,
      count: "30+ Models",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
      action: () => {
        soundFX.click();
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            "Hello LapMart! I am inquiring about available Flagship Smartphones (iPhone / Samsung / Pixel) in stock at your showrooms."
          )}`,
          "_blank"
        );
      }
    },
    {
      id: "tablets",
      title: "Performance Tablets",
      subtitle: "Stylus & iPad Pro Displays",
      badge: "Touch Pro",
      icon: Tablet,
      count: "20+ Models",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
      action: () => {
        soundFX.click();
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            "Hello LapMart! I am inquiring about available iPad / Android Drawing Tablets in stock at your showrooms."
          )}`,
          "_blank"
        );
      }
    },
    {
      id: "accessories",
      title: "Gears & Accessories",
      subtitle: "RAM • NVMe SSD • Chargers",
      badge: "High-Speed",
      icon: Headphones,
      count: "150+ Items",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      action: () => {
        soundFX.click();
        document.getElementById("accessories")?.scrollIntoView({ behavior: "smooth" });
      }
    }
  ];

  return (
    <section ref={bentoRef} className="py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Category Matrix 2030</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Curated Hardware Categories
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Click any collection to instantly teleport and filter catalog
          </span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={cat.action}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-slate-950 flex flex-col justify-between p-5"
              >
                {/* Background Image with Dark Vignette */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-400 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                    {cat.badge}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider">
                    {cat.count}
                  </span>
                  <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 font-normal">
                    {cat.subtitle}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Deck</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
