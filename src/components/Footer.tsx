"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LAPMART_BRANCHES,
  MASTER_HOTLINE,
  LAPMART_EMAIL,
  SEARCH_TAGS,
  WHATSAPP_NUMBER
} from "@/data/lapmart-data";
import { useStore } from "@/context/StoreContext";
import {
  MapPin,
  Phone,
  Mail,
  Share2,
  ShieldCheck,
  Truck,
  Heart,
  ArrowUp
} from "lucide-react";

export default function Footer() {
  const { setFilters, setActiveBrandTab } = useStore();

  const handleTagClick = (tag: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: tag }));
    document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 px-4 sm:px-8 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 2030 SEARCH TAGS CLOUD (From Screenshot 5) */}
        <div className="space-y-4 pb-10 border-b border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              Popular Search Tags
            </span>
            <span className="text-[11px] text-slate-500 font-mono">Instant filter indexed</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {SEARCH_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-400 text-[10px] font-mono font-medium border border-slate-800 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN 4-COLUMN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative h-10 sm:h-11 flex items-center">
                <Image
                  src="/lapmart-logo.webp"
                  alt="LapMart Official Brand Logo"
                  width={190}
                  height={42}
                  className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_2px_12px_rgba(234,160,29,0.3)]"
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Sri Lanka’s most trusted technology distribution network. Direct factory imports of certified used business workstations, brand new gaming rigs, and high-speed components.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Main Hub:</strong> 488/11, Maithripala Senanayake Mawatha, New Bus Stand, Anuradhapura, Sri Lanka.
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Hotline:</strong>{" "}
                  <a href={`tel:${MASTER_HOTLINE.replace(/\s/g, "")}`} className="hover:text-amber-400 font-mono">
                    {MASTER_HOTLINE}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${LAPMART_EMAIL}`} className="hover:text-amber-400 font-mono">
                    {LAPMART_EMAIL}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Our Branches (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              Our Showrooms
            </h4>
            <ul className="space-y-2 text-xs">
              {LAPMART_BRANCHES.map((b) => (
                <li key={b.id}>
                  <a
                    href={`tel:${b.hotline}`}
                    className="flex items-center justify-between text-slate-400 hover:text-white transition-colors group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {b.city} {b.isFlagship && "★ Flagship"}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500 group-hover:text-amber-400">
                      {b.displayPhone}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/shop?condition=Brand+New" className="hover:text-amber-400 transition-colors">
                  Brand New Laptops
                </Link>
              </li>
              <li>
                <Link href="/shop?condition=Used" className="hover:text-amber-400 transition-colors">
                  Certified Used Laptops
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Gaming" className="hover:text-amber-400 transition-colors">
                  Gaming Laptops (RTX)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Workstation" className="hover:text-amber-400 transition-colors">
                  Precision Workstations
                </Link>
              </li>
              <li>
                <a href="#accessories" className="hover:text-amber-400 transition-colors">
                  Accessories & RAM
                </a>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-400 transition-colors font-bold text-slate-300">
                  Browse Full Shop →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Community & Hotline (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              Community
            </h4>
            <p className="text-xs text-slate-400">
              Follow LapMart on social channels for unboxings & flash sales:
            </p>

            {/* Orange Social pill container from Screenshot 5 */}
            <div className="p-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-around shadow-md shadow-orange-500/20">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white text-rose-600 flex items-center justify-center hover:scale-110 transition-transform"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center hover:scale-110 transition-transform"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-110 transition-transform font-black text-xs"
                title="TikTok"
              >
                ♪
              </a>
            </div>

            <div className="pt-2">
              <a
                href="#"
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors block underline"
              >
                Our Privacy & Warranty Policy
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT STRIP */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Copyright © 2030 <strong>LapMart (pvt) Ltd.</strong> All rights reserved. Designed for the Future.
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-slate-400">Sri Lanka’s Direct Laptop Gateway</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-400 transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
