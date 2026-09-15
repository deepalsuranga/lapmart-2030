"use client";

import React from "react";
import Link from "next/link";
import { MASTER_HOTLINE, WHATSAPP_NUMBER } from "@/data/lapmart-data";
import { soundFX } from "@/utils/sound";

export default function NexoraDualTicker() {
  const topItems = [
    { text: "Broken Device? Let Us Fix It", icon: "👨‍💻" },
    { text: `Official Hotline: ${MASTER_HOTLINE}`, icon: "📞", href: `tel:${MASTER_HOTLINE.replace(/\s/g, "")}` },
    { text: "45-Point Hardware Diagnostics", icon: "⚡", href: "/#lab" },
    { text: "Certified Grade A+ Laptops", icon: "💻", href: "/shop" },
    { text: "Express Islandwide Delivery", icon: "🚚" },
    { text: "Custom RAM & NVMe Upgrades", icon: "🔧" },
    { text: "100% Genuine Warranty Backed", icon: "🛡️" }
  ];

  const bottomItems = [
    { text: "Quick Tech Fixes, Just Call Us", icon: "🧑‍💻" },
    { text: "+94 76 140 7320", icon: "📲", href: "tel:0761407320" },
    { text: "7 Physical Showrooms in Sri Lanka", icon: "📍", href: "/#showrooms" },
    { text: "Colombo • Kandy • Kurunegala • Anuradhapura", icon: "🏢" },
    { text: "Chat on WhatsApp for Live Stock", icon: "💬", href: `https://wa.me/${WHATSAPP_NUMBER}` },
    { text: "Direct Importers of Quality Laptops", icon: "✨" },
    { text: "Trade-In & Exchange Available", icon: "🔄" }
  ];

  return (
    <div className="relative w-full overflow-hidden py-6 sm:py-10 select-none bg-slate-900/5 my-4">
      {/* Container with overflow-hidden to crop angled ribbon edges */}
      <div className="relative w-full space-y-3 sm:space-y-4">
        
        {/* TOP CORAL RIBBON (Slanted -1deg, moving left) */}
        <div className="relative w-full -rotate-1 sm:-rotate-[1.2deg] scale-105 origin-center shadow-lg hover:shadow-xl transition-shadow z-20">
          <div className="w-full bg-[#FF5A5F] py-2.5 sm:py-3.5 border-y border-rose-600/30 overflow-hidden flex items-center">
            <div className="animate-marquee-left pause-on-hover flex items-center gap-6 sm:gap-10 text-slate-950 font-black text-sm sm:text-base tracking-tight cursor-default">
              {/* Loop duplicated 3 times for completely seamless infinite wrap */}
              {[...topItems, ...topItems, ...topItems].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 sm:gap-10 shrink-0">
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={() => soundFX.click()}
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity underline decoration-slate-950/40 hover:decoration-slate-950"
                    >
                      <span>{item.text}</span>
                      <span className="text-base sm:text-lg">{item.icon}</span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>{item.text}</span>
                      <span className="text-base sm:text-lg">{item.icon}</span>
                    </span>
                  )}
                  <span className="w-2 h-2 rounded-full bg-slate-950/60 shrink-0"></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM DARK RIBBON (Slanted +1deg, moving right) */}
        <div className="relative w-full rotate-1 sm:rotate-[1deg] scale-105 origin-center shadow-2xl hover:shadow-cyan-950/20 transition-shadow z-10 -mt-2 sm:-mt-3">
          <div className="w-full bg-[#080B16] py-2.5 sm:py-3.5 border-y border-white/10 overflow-hidden flex items-center">
            <div className="animate-marquee-right pause-on-hover flex items-center gap-6 sm:gap-10 text-white font-black text-sm sm:text-base tracking-tight cursor-default">
              {/* Loop duplicated 3 times for completely seamless infinite wrap */}
              {[...bottomItems, ...bottomItems, ...bottomItems].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 sm:gap-10 shrink-0">
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={() => soundFX.click()}
                      className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors underline decoration-white/30 hover:decoration-amber-400"
                    >
                      <span>{item.text}</span>
                      <span className="text-base sm:text-lg">{item.icon}</span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span className="text-slate-100">{item.text}</span>
                      <span className="text-base sm:text-lg">{item.icon}</span>
                    </span>
                  )}
                  <span className="w-2 h-2 rounded-full bg-amber-400/80 shrink-0 shadow-sm shadow-amber-400/40"></span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
