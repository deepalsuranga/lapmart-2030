"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { soundFX } from "@/utils/sound";
import { useStore } from "@/context/StoreContext";

export default function NexoraCollections() {
  const { setFilters } = useStore();

  const collections = [
    {
      id: "essentials",
      title: "Tech Essentials",
      subtitle: "Upgrade Your World",
      category: "Accessories",
      image: "/generated/seamless-essentials.webp",
      bgGradient: "bg-gradient-to-br from-[#A5B2EE] via-[#C9D3FB] to-[#E6E8FE]",
      textColor: "text-slate-900",
      subColor: "text-slate-600"
    },
    {
      id: "creator",
      title: "Creator Studio",
      subtitle: "Precision & Power",
      category: "Creator",
      image: "/generated/seamless-creator.webp",
      bgGradient: "bg-gradient-to-br from-[#F5B5CC] via-[#FAD3DF] to-[#FCE8EE]",
      textColor: "text-slate-900",
      subColor: "text-slate-600"
    },
    {
      id: "executive",
      title: "Executive Style",
      subtitle: "Stylish Living",
      category: "Business",
      image: "/generated/seamless-executive.webp",
      bgGradient: "bg-gradient-to-br from-[#F5D8C7] via-[#F9E4D7] to-[#FCF1EB]",
      textColor: "text-slate-900",
      subColor: "text-slate-600"
    },
    {
      id: "esports",
      title: "Esports Arena",
      subtitle: "Street Performance",
      category: "Gaming",
      image: "/generated/seamless-esports.webp",
      bgGradient: "bg-gradient-to-br from-[#DDCFF6] via-[#ECE1FA] to-[#F4ECFA]",
      textColor: "text-slate-900",
      subColor: "text-slate-600"
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
      {/* Header Row (Left Title & Right 'View All' Link) */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Interactive Collections
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Curated setups engineered for creators, esports athletes & executives
          </p>
        </div>

        <Link
          href="/shop"
          onClick={() => soundFX.click()}
          className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors group cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 4 Cards Grid — Zero Borders, Zero Boundaries, 100% Seamless Color Connection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {collections.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelectCollection(item.category)}
            onMouseEnter={() => soundFX.cardHover()}
            className={`relative rounded-3xl overflow-hidden h-[210px] sm:h-[230px] p-5 flex flex-col justify-between group cursor-pointer shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ${item.bgGradient}`}
          >
            {/* Seamless Full-Bleed Background Image (NO BORDERS, NO BOX BOUNDARIES) */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none select-none"
            />

            {/* Card Titles Floating Cleanly at Top-Left */}
            <div className="relative z-10 max-w-[65%] pointer-events-none">
              <h3 className={`text-base sm:text-lg font-bold tracking-tight leading-tight ${item.textColor}`}>
                {item.title}
              </h3>
              <p className={`text-xs font-medium mt-0.5 ${item.subColor}`}>
                {item.subtitle}
              </p>
            </div>

            {/* Bottom-Right Circular Action Pill (Exact Match to Screenshot) */}
            <div className="absolute bottom-4 right-4 z-10 w-8 h-8 rounded-full bg-white/95 shadow-md flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-white transition-all pointer-events-none">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
