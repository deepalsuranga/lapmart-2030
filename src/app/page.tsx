"use client";

import React, { useState } from "react";
import { StoreProvider } from "@/context/StoreContext";
import NexoraHeader from "@/components/nexora/NexoraHeader";
import NexoraHero from "@/components/nexora/NexoraHero";
import NexoraCategoryBar from "@/components/nexora/NexoraCategoryBar";
import NexoraCollections from "@/components/nexora/NexoraCollections";
import NexoraRecommended from "@/components/nexora/NexoraRecommended";
import NexoraCategorySections from "@/components/nexora/NexoraCategorySections";
import NexoraMidSplit from "@/components/nexora/NexoraMidSplit";
import NexoraRewardsPillars from "@/components/nexora/NexoraRewardsPillars";
import NexoraProductGrid from "@/components/nexora/NexoraProductGrid";
import NexoraDualTicker from "@/components/nexora/NexoraDualTicker";
import NexoraReviews from "@/components/nexora/NexoraReviews";
import NexoraNewsletter from "@/components/nexora/NexoraNewsletter";
import NexoraFooter from "@/components/nexora/NexoraFooter";
import DiagnosticLabSection from "@/components/DiagnosticLabSection";
import BranchLocator from "@/components/BranchLocator";
import QuickViewModal from "@/components/QuickViewModal";
import CompareDrawer from "@/components/CompareDrawer";
import CartDrawer from "@/components/CartDrawer";
import CommandPalette from "@/components/CommandPalette";
import LapMartChatbot from "@/components/chat/LapMartChatbot";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <StoreProvider>
      <div className="relative min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#070913] text-slate-900 dark:text-slate-100 selection:bg-rose-500 selection:text-white font-sans antialiased overflow-x-hidden transition-colors duration-300">

        {/* 1. Header (100% matched to reference top bar) */}
        <NexoraHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Sections */}
        <main className="flex-1 w-full">
          {/* 2. Hero Section: 'Your World Of Tech Starts Here.' + 3D Holographic Showroom Stage */}
          <NexoraHero />

          {/* 3. Floating Category Bar (8 Circular Category Pills) */}
          <NexoraCategoryBar />

          {/* 4. Interactive Collections (4 Curated Cards) */}
          <NexoraCollections />

          {/* 5. Recommended For You (Carousel / Product Grid) */}
          <NexoraRecommended />

          {/* Dynamic Category-Wise 4x2 Product Grids with Shop Direct Links */}
          <NexoraCategorySections />

          {/* 6. Mid-Page Split Section (Trending Now | Summer Refresh Sale | Flash Offers) */}
          <NexoraMidSplit />

          {/* 7. Rewards & Loyalty 4-Pillar Banner */}
          <NexoraRewardsPillars />

          {/* 8. Featured Hardware Product Grid (Filterable Rigs & Accessories) */}
          <NexoraProductGrid />

          {/* 9. Full-Width Dual Infinite Marquee Ticker Ribbons */}
          <NexoraDualTicker />

          {/* 10. Customer Reviews ('What Shoppers Say') */}
          <NexoraReviews />

          {/* 9. Newsletter Email Capture & Social Channels */}
          <NexoraNewsletter />

          {/* Diagnostic Lab Section (Integrated for #lab) */}
          <div id="lab" className="border-t border-slate-200/80 dark:border-slate-800 transition-colors">
            <ScrollReveal animation="fade-up" duration={650}>
              <DiagnosticLabSection />
            </ScrollReveal>
          </div>

          {/* Showrooms & Physical Branches (Integrated for #showrooms) */}
          <div id="showrooms" className="border-t border-slate-200/80 dark:border-slate-800 transition-colors">
            <ScrollReveal animation="fade-up" duration={650}>
              <BranchLocator />
            </ScrollReveal>
          </div>
        </main>

        {/* 10. Footer (100% matched to reference footer) */}
        <NexoraFooter />

        {/* Interactive Modals & Drawers */}
        <QuickViewModal />
        <CompareDrawer />
        <CartDrawer />
        <LapMartChatbot />
        <CommandPalette />

      </div>
    </StoreProvider>
  );
}
