"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { soundFX } from "@/utils/sound";
import { useStore } from "@/context/StoreContext";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function NexoraCollections() {
  const { setFilters } = useStore();

  const collections = [
    {
      id: "gaming",
      title: "Esports & Gaming Rigs",
      subtitle: "RTX 40-Series • High-Refresh Displays",
      priceStarting: "From Rs. 248,000",
      category: "Gaming",
      image: "/generated/collection-esports.jpg",
      tag: "HIGH DEMAND"
    },
    {
      id: "executive",
      title: "Executive Business Mobility",
      subtitle: "Ultralight Titanium • All-Day Battery",
      priceStarting: "From Rs. 97,000",
      category: "Business",
      image: "/generated/collection-executive.jpg",
      tag: "CERTIFIED USED & NEW"
    },
    {
      id: "creator",
      title: "Creative & 3D Render Studio",
      subtitle: "Color-Calibrated OLED • Studio Drivers",
      priceStarting: "From Rs. 385,000",
      category: "Creator",
      image: "/generated/collection-creator.jpg",
      tag: "PRO CREATOR"
    },
    {
      id: "developer",
      title: "Student & Developer Essentials",
      subtitle: "Multi-core Compilation • Durable Chassis",
      priceStarting: "From Rs. 121,000",
      category: "Everyday",
      image: "/generated/collection-developer.jpg",
      tag: "CAMPUS SPECIAL"
    }
  ];

  const handleSelectCollection = (cat: string) => {
    soundFX.select();
    setFilters((prev) => ({ ...prev, category: cat }));
    const el = document.querySelector("#recommended");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="collections" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Header Row */}
      <ScrollReveal animation="fade-up" duration={600}>
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              Tailored By Workflow
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">
              Curated Hardware Collections
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">
              Engineered setups for competitive gamers, creative pros, executives, and university students
            </p>
          </div>

          <Link
            href="/shop"
            onClick={() => soundFX.click()}
            className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors group cursor-pointer shrink-0"
          >
            <span>View All Rigs</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>

      {/* 4 Cards Grid with Photorealistic Studio Lifestyle Imagery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {collections.map((item, idx) => (
          <ScrollReveal
            key={item.id}
            animation="fade-up"
            delay={idx * 90}
            duration={650}
            className="h-full"
          >
            <div
              onClick={() => handleSelectCollection(item.category)}
              onMouseEnter={() => soundFX.cardHover()}
              className="group relative rounded-3xl overflow-hidden h-[300px] sm:h-[320px] flex flex-col justify-between p-5 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/80 dark:border-slate-800 bg-slate-900 text-white"
            >
              {/* Real Lifestyle Product Photograph Background */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none select-none"
              />

              {/* Gradient Scrim for crisp legible text */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none"></div>

              {/* Top Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-amber-300">
                  {item.tag}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Content Info */}
              <div className="relative z-10 pt-4">
                <div className="text-[11px] font-bold text-amber-300 font-mono mb-1">
                  {item.priceStarting}
                </div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight leading-snug text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1 font-medium">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
