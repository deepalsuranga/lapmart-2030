"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import SmartLaptopFinder from "@/components/SmartLaptopFinder";
import { useStore } from "@/context/StoreContext";
import { LAPTOP_PRODUCTS, WHATSAPP_NUMBER } from "@/data/lapmart-data";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Gauge,
  ArrowUpRight,
  MessageSquare,
  Flame,
  CheckCircle,
  Rotate3d,
  Monitor,
  Eye,
  ShoppingCart,
  Play,
  Pause
} from "lucide-react";
import PriceTag from "@/components/PriceTag";
import { soundFX } from "@/utils/sound";
import gsap from "gsap";
import confetti from "canvas-confetti";

export default function HeroShowcase() {
  const { setQuickViewProduct, addToCart, formatLKR } = useStore();
  const heroRef = useRef<HTMLDivElement>(null);
  const stage3DRef = useRef<HTMLDivElement>(null);
  const laptopRigRef = useRef<HTMLDivElement>(null);

  // 4 Flagship Hero Models
  const heroFleet = [
    LAPTOP_PRODUCTS[0], // Acer Nitro 16 AI
    LAPTOP_PRODUCTS[5], // Asus ROG Strix G16
    LAPTOP_PRODUCTS[1], // Lenovo ThinkPad T490
    LAPTOP_PRODUCTS[4]  // MacBook Pro 16
  ];

  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);
  const [cameraMode, setCameraMode] = useState<"isometric" | "front" | "orbit">("isometric");
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [isHoveredOrFocused, setIsHoveredOrFocused] = useState(false);
  const activeLaptop = heroFleet[selectedHeroIndex];
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Switch hardware model with 3D warp transition
  const handleModelSwitch = (index: number, manual: boolean = true) => {
    if (index === selectedHeroIndex) return;
    if (manual) {
      soundFX.switchTab();
    }
    if (laptopRigRef.current) {
      gsap.timeline()
        .to(laptopRigRef.current, {
          scale: 0.94,
          opacity: 0.6,
          rotateY: "+=20",
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => setSelectedHeroIndex(index)
        })
        .to(laptopRigRef.current, {
          scale: 1,
          opacity: 1,
          rotateY: cameraMode === "isometric" ? -8 : 0,
          duration: 0.45,
          ease: "back.out(1.4)"
        });
    } else {
      setSelectedHeroIndex(index);
    }
  };

  // Auto-play interval: rotates models every 4.5 seconds, pauses when user focuses or hovers
  useEffect(() => {
    if (!isAutoPlayEnabled || isHoveredOrFocused) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setSelectedHeroIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % heroFleet.length;
        if (laptopRigRef.current) {
          gsap.timeline()
            .to(laptopRigRef.current, {
              scale: 0.95,
              opacity: 0.7,
              rotateY: "+=15",
              duration: 0.25,
              ease: "power2.in",
              onComplete: () => {}
            })
            .to(laptopRigRef.current, {
              scale: 1,
              opacity: 1,
              rotateY: cameraMode === "isometric" ? -8 : 0,
              duration: 0.45,
              ease: "back.out(1.3)"
            });
        }
        return nextIndex;
      });
    }, 4500);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlayEnabled, isHoveredOrFocused, cameraMode, heroFleet.length]);

  // GSAP 3D Interactive Gyroscope / Mouse Parallax
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stage3DRef.current || cameraMode === "orbit") return;
    const stage = stage3DRef.current;
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -9;
    const rotY = ((x - centerX) / centerX) * 12;

    if (laptopRigRef.current) {
      gsap.to(laptopRigRef.current, {
        rotateX: cameraMode === "front" ? rotX * 0.4 : rotX + 6,
        rotateY: cameraMode === "front" ? rotY * 0.4 : rotY - 8,
        rotateZ: rotY * 0.08,
        duration: 0.35,
        ease: "power2.out"
      });
    }
  };

  const handleStageMouseLeave = () => {
    if (!laptopRigRef.current || cameraMode === "orbit") return;
    gsap.to(laptopRigRef.current, {
      rotateX: cameraMode === "isometric" ? 6 : 0,
      rotateY: cameraMode === "isometric" ? -8 : 0,
      rotateZ: 0,
      duration: 0.6,
      ease: "power3.out"
    });
  };

  // Switch camera perspective mode
  const handleCameraSwitch = (mode: "isometric" | "front" | "orbit") => {
    soundFX.switchTab();
    setCameraMode(mode);
    if (!laptopRigRef.current) return;

    if (mode === "isometric") {
      gsap.to(laptopRigRef.current, {
        rotateX: 6,
        rotateY: -8,
        rotateZ: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out"
      });
    } else if (mode === "front") {
      gsap.to(laptopRigRef.current, {
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1.02,
        duration: 0.6,
        ease: "power3.out"
      });
    } else if (mode === "orbit") {
      gsap.to(laptopRigRef.current, {
        rotateX: 4,
        rotateY: 0,
        scale: 1,
        duration: 0.6
      });
    }
  };



  const handleAddToCart = () => {
    addToCart(activeLaptop);
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.5 },
        colors: ["#ff6b00", "#10b981", "#06b6d4"]
      });
    } catch {
      // ignore
    }
  };

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: -15,
        duration: 0.6
      })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
            stagger: 0.1
          },
          "-=0.3"
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 15,
            duration: 0.5
          },
          "-=0.3"
        )
        .from(
          ".hero-spatial-stage",
          {
            opacity: 0,
            scale: 0.92,
            duration: 0.8,
            ease: "back.out(1.2)"
          },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-6 pb-12 px-4 sm:px-8 overflow-hidden">
      
      {/* 2030 SPATIAL ATMOSPHERE: Radial Caustic Refraction & Glowing Laser Orbs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-r from-amber-400/15 via-orange-500/12 to-cyan-400/15 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* MAIN STAGE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          
          {/* LEFT 6 COLS: Hero Copy & Value Anchors */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Status Pill */}
            <div className="hero-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-amber-400/30 text-amber-900 text-xs font-semibold shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="font-mono uppercase tracking-wider text-[11px] font-bold text-amber-700">
                2030 HARDWARE GENERATION
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-medium">Direct Importers in Sri Lanka</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="hero-title text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08]">
                Precision Tech. <br />
                <span className="hologram-text">Future Powered.</span>
              </h1>
              <p className="hero-desc text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed pt-2">
                Factory-sealed RTX gaming rigs, certified enterprise ThinkPads, and neural AI workstations direct from global distributors across 7 physical showrooms in Sri Lanka.
              </p>
            </div>

            {/* Fleet Model Selectors with Auto-Play & Focus/Hover Pause */}
            <div
              className="space-y-2 pt-1"
              onMouseEnter={() => setIsHoveredOrFocused(true)}
              onMouseLeave={() => setIsHoveredOrFocused(false)}
            >
              <div className="flex items-center justify-between text-xs max-w-md">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold uppercase tracking-wider text-slate-500">
                    Select Architecture:
                  </span>
                  {/* Auto Play Status & Manual Toggle */}
                  <button
                    onClick={() => {
                      soundFX.click();
                      setIsAutoPlayEnabled(!isAutoPlayEnabled);
                    }}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
                      isAutoPlayEnabled
                        ? isHoveredOrFocused
                          ? "bg-amber-100 text-amber-900 border-amber-300"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}
                    title={
                      isAutoPlayEnabled
                        ? isHoveredOrFocused
                          ? "Auto-play paused on focus/hover (Click to disable)"
                          : "Auto-play active (Click to pause)"
                        : "Auto-play paused (Click to start)"
                    }
                  >
                    {isAutoPlayEnabled ? (
                      isHoveredOrFocused ? (
                        <>
                          <Pause className="w-2.5 h-2.5 text-amber-600" />
                          <span>PAUSED</span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>AUTO</span>
                        </>
                      )
                    ) : (
                      <>
                        <Play className="w-2.5 h-2.5 text-slate-500" />
                        <span>PLAY</span>
                      </>
                    )}
                  </button>
                </div>

                <span className="text-amber-600 font-mono text-[11px] font-bold">
                  {selectedHeroIndex + 1} of {heroFleet.length}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                {heroFleet.map((laptop, i) => (
                  <button
                    key={laptop.id}
                    onClick={() => handleModelSwitch(i)}
                    onFocus={() => setIsHoveredOrFocused(true)}
                    onBlur={() => setIsHoveredOrFocused(false)}
                    className={`relative overflow-hidden px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedHeroIndex === i
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/25 scale-[1.03] ring-2 ring-amber-500/40"
                        : "bg-white/90 border border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50/40 shadow-2xs"
                    }`}
                  >
                    <span className="relative z-10">{laptop.brand} {laptop.category}</span>
                    
                    {/* Animated Progress Bar for Active Auto-Playing Tab */}
                    {selectedHeroIndex === i && isAutoPlayEnabled && !isHoveredOrFocused && (
                      <span
                        key={`progress-${selectedHeroIndex}`}
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-orange-500 animate-[autoplay-progress_4.5s_linear]"
                        style={{ width: "100%" }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Value Props 3-Grid */}
            <div className="grid grid-cols-3 gap-3 py-2 max-w-md">
              <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs hover:border-amber-300 transition-colors">
                <div className="text-xl font-black text-slate-900 font-mono">100%</div>
                <div className="text-[11px] font-medium text-slate-500 uppercase">Direct Importer</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs hover:border-amber-300 transition-colors">
                <div className="text-xl font-black text-amber-500 font-mono">7 Hubs</div>
                <div className="text-[11px] font-medium text-slate-500 uppercase">Physical Stores</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs hover:border-cyan-300 transition-colors">
                <div className="text-xl font-black text-cyan-600 font-mono">2 Years</div>
                <div className="text-[11px] font-medium text-slate-500 uppercase">Hardware Care</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-actions flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/shop"
                onClick={() => soundFX.click()}
                className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5"
              >
                <span>EXPLORE ALL LAPTOPS</span>
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello LapMart! Inquiring about ${activeLaptop.name} (${activeLaptop.sku})`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.click()}
                className="px-5 py-3.5 rounded-xl glass-panel bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 border border-emerald-500/30 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Hotline</span>
              </a>
            </div>
          </div>

          {/* RIGHT 6 COLS: TRUE 3D HOLOGRAPHIC SPATIAL RIG (CLEAN ZERO-OVERLAP) */}
          <div
            ref={stage3DRef}
            onMouseMove={handleStageMouseMove}
            onMouseEnter={() => setIsHoveredOrFocused(true)}
            onMouseLeave={() => {
              handleStageMouseLeave();
              setIsHoveredOrFocused(false);
            }}
            onFocus={() => setIsHoveredOrFocused(true)}
            onBlur={() => setIsHoveredOrFocused(false)}
            className="lg:col-span-6 relative hero-spatial-stage flex flex-col items-center justify-center select-none"
            style={{ perspective: "1200px" }}
          >
            {/* Top 3D Camera Controls Bar */}
            <div className="w-full flex items-center justify-between mb-3 px-1 z-30">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500">
                <Rotate3d className="w-4 h-4 text-amber-500" />
                <span>3D SPATIAL RIG</span>
              </div>

              {/* 3D View Angles */}
              <div className="flex items-center gap-1 bg-white/90 border border-slate-200 rounded-xl p-1 shadow-2xs backdrop-blur-md">
                <button
                  onClick={() => handleCameraSwitch("isometric")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    cameraMode === "isometric"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Isometric 3D Perspective"
                >
                  Isometric
                </button>
                <button
                  onClick={() => handleCameraSwitch("front")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    cameraMode === "front"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Front Hologram Perspective"
                >
                  Front
                </button>
                <button
                  onClick={() => handleCameraSwitch("orbit")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    cameraMode === "orbit"
                      ? "bg-amber-500 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Gentle Orbit Animation"
                >
                  Float
                </button>
              </div>
            </div>

            {/* 3-METRIC TELEMETRY HUD BAR (DOCKED SAFELY ABOVE CARD - ZERO COLLISION) */}
            <div className="w-full grid grid-cols-3 gap-2.5 mb-3 z-20">
              <div className="p-2.5 rounded-2xl bg-white/95 border border-amber-300/60 shadow-sm backdrop-blur-md flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-mono font-bold text-slate-400 uppercase truncate">GPU TGP</div>
                  <div className="text-[11px] font-bold text-slate-900 truncate">
                    {activeLaptop.graphics.split("(")[0].replace("NVIDIA GeForce ", "")}
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/95 border border-cyan-300/60 shadow-sm backdrop-blur-md flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-600 flex items-center justify-center shrink-0">
                  <Monitor className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-mono font-bold text-slate-400 uppercase truncate">DISPLAY</div>
                  <div className="text-[11px] font-bold text-slate-900 truncate">
                    {activeLaptop.display.split(" ")[0]} {activeLaptop.display.split(" ")[1] || "IPS"}
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/95 border border-emerald-300/60 shadow-sm backdrop-blur-md flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-mono font-bold text-slate-400 uppercase truncate">AI NPU</div>
                  <div className="text-[11px] font-bold text-slate-900 truncate">
                    {activeLaptop.scores.aiCompute}/100 TOPS
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Stage Container */}
            <div
              className={`relative w-full max-w-lg flex flex-col items-center justify-center ${
                cameraMode === "orbit" ? "animate-float" : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* 3D GLOSSY CYBER PEDESTAL & NEON HALO UNDERGLOW */}
              <div
                className="absolute -bottom-6 w-4/5 h-20 rounded-[100%] bg-gradient-to-r from-amber-500/20 via-slate-900/30 to-cyan-500/20 blur-xl -z-10"
                style={{ transform: "rotateX(75deg) translateZ(-40px)" }}
              />
              <div
                className="absolute -bottom-4 w-3/4 h-14 rounded-[100%] border-2 border-amber-400/40 shadow-[0_0_25px_rgba(255,107,0,0.25)] -z-10"
                style={{ transform: "rotateX(75deg) translateZ(-30px)" }}
              />

              {/* MAIN 3D RIG (PRISTINE HIGH-CONTRAST LIGHT/CERAMIC GLASS PANEL) */}
              <div
                ref={laptopRigRef}
                className="relative w-full rounded-3xl bg-white/98 p-5 sm:p-6 border border-slate-200/90 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.8)_inset] transition-shadow duration-300 flex flex-col justify-between"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(6deg) rotateY(-8deg)"
                }}
              >
                {/* Card Top HUD */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-mono font-bold text-[10px] uppercase shadow-xs">
                      {activeLaptop.brand} FLAGSHIP
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-bold">
                      SKU: {activeLaptop.sku}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    In Stock ({activeLaptop.stockCount})
                  </span>
                </div>

                {/* Center 3D Laptop Display */}
                <div
                  className="relative my-3 aspect-[16/10] overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group shadow-inner"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <img
                    src={activeLaptop.image}
                    alt={activeLaptop.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  
                  {/* Floating In-Game Telemetry Strip */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-white bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="text-amber-400 font-bold">FPS Index: {activeLaptop.scores.gaming}%</span>
                    <span className="text-cyan-400 font-bold">AI Compute: {activeLaptop.scores.aiCompute}%</span>
                    <span className="text-emerald-400 font-bold">Battery: {activeLaptop.scores.batteryLife}%</span>
                  </div>
                </div>

                {/* Card Bottom: Name, Price, and Quick Actions (HIGH-CONTRAST & FULLY UNOBSTRUCTED) */}
                <div className="space-y-3 pt-2" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-black text-slate-900 truncate">
                        {activeLaptop.name}
                      </h3>
                      <div className="text-[11px] text-slate-500 font-mono truncate mt-0.5">
                        {activeLaptop.processor} • {activeLaptop.ram}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {activeLaptop.originalPrice && (
                        <div>
                          <PriceTag
                            amount={activeLaptop.originalPrice}
                            className="text-[11px] text-slate-400 line-through"
                            decimalClassName="text-[0.7em] opacity-70 ml-0.5"
                          />
                        </div>
                      )}
                      <div>
                        <PriceTag
                          amount={activeLaptop.price}
                          className="text-lg sm:text-xl font-black text-amber-600 font-mono tracking-tight"
                          decimalClassName="text-[0.6em] font-bold opacity-75 ml-0.5"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - 100% VISIBLE & UNOBSTRUCTED */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <button
                      onClick={() => {
                        soundFX.click();
                        setQuickViewProduct(activeLaptop);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 hover:border-amber-400 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                      <span>Quick View 360</span>
                    </button>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add To Cart</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* DOCKED 2030 SMART LAPTOP FINDER */}
        <div className="mt-8">
          <SmartLaptopFinder />
        </div>

      </div>
    </section>
  );
}
