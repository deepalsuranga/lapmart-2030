"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LaptopProduct,
  AccessoryProduct,
  FreeGiftItem,
  HardwareUpgradeOption
} from "@/types";
import {
  LAPMART_BRANCHES,
  LAPTOP_PRODUCTS,
  MASTER_HOTLINE,
  WHATSAPP_NUMBER
} from "@/data/lapmart-data";
import {
  FREE_GIFT_ITEMS,
  TOTAL_FREE_GIFT_VALUE,
  getRamUpgradeOptions,
  getStorageUpgradeOptions,
  WARRANTY_UPGRADE_OPTIONS,
  getCrossSellAccessories
} from "@/data/product-offers";
import { getLaptopSlug } from "@/utils/slug";
import { useStore } from "@/context/StoreContext";
import { soundFX } from "@/utils/sound";
import confetti from "canvas-confetti";
import PriceTag from "@/components/PriceTag";
import NexoraHeader from "@/components/nexora/NexoraHeader";
import NexoraFooter from "@/components/nexora/NexoraFooter";
import CartDrawer from "@/components/CartDrawer";
import CompareDrawer from "@/components/CompareDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import LapMartChatbot from "@/components/chat/LapMartChatbot";
import {
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RefreshCw,
  Gift,
  Zap,
  Gauge,
  Cpu,
  Layers,
  HardDrive,
  Heart,
  GitCompare,
  ShoppingCart,
  MessageSquare,
  Share2,
  ChevronRight,
  Info,
  MapPin,
  Clock,
  Sparkles,
  PhoneCall,
  Check,
  Plus,
  ArrowRight,
  Eye,
  Sliders,
  Maximize2,
  X,
  Award,
  ShieldAlert,
  Flame
} from "lucide-react";

interface ProductClientPageProps {
  product: LaptopProduct;
}

export default function ProductClientPage({ product }: ProductClientPageProps) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    compareList,
    selectedBranch,
    setSelectedBranch,
    setIsCartOpen,
    formatLKR
  } = useStore();

  // Active gallery image
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const galleryImages = useMemo(() => {
    const images = [product.image];
    if (product.gallery && product.gallery.length > 0) {
      product.gallery.forEach((img) => {
        if (!images.includes(img)) images.push(img);
      });
    }
    return images;
  }, [product]);

  // Image Zoom Lens
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  // Up-Sell Configurator States
  const ramOptions = useMemo(() => getRamUpgradeOptions(product), [product]);
  const storageOptions = useMemo(() => getStorageUpgradeOptions(product), [product]);
  const warrantyOptions = WARRANTY_UPGRADE_OPTIONS;

  const [selectedRamId, setSelectedRamId] = useState<string>(ramOptions[0]?.id || "ram-stock");
  const [selectedStorageId, setSelectedStorageId] = useState<string>(storageOptions[0]?.id || "ssd-stock");
  const [selectedWarrantyId, setSelectedWarrantyId] = useState<string>(warrantyOptions[0]?.id || "warranty-standard");

  const activeRamOption = useMemo(
    () => ramOptions.find((o) => o.id === selectedRamId) || ramOptions[0],
    [ramOptions, selectedRamId]
  );
  const activeStorageOption = useMemo(
    () => storageOptions.find((o) => o.id === selectedStorageId) || storageOptions[0],
    [storageOptions, selectedStorageId]
  );
  const activeWarrantyOption = useMemo(
    () => warrantyOptions.find((o) => o.id === selectedWarrantyId) || warrantyOptions[0],
    [warrantyOptions, selectedWarrantyId]
  );

  // Dynamic Calculated Total Price
  const configuredTotalPrice = useMemo(() => {
    let total = product.price;
    if (activeRamOption) total += activeRamOption.additionalPrice;
    if (activeStorageOption) total += activeStorageOption.additionalPrice;
    if (activeWarrantyOption) total += activeWarrantyOption.additionalPrice;
    return total;
  }, [product.price, activeRamOption, activeStorageOption, activeWarrantyOption]);

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Cross-Sell Accessories ("Frequently Bought Together")
  const crossSellAccessories = useMemo(() => getCrossSellAccessories(product), [product]);
  const [selectedCrossSellIds, setSelectedCrossSellIds] = useState<string[]>([
    crossSellAccessories[0]?.id || ""
  ]);

  const toggleCrossSell = (id: string) => {
    soundFX.click();
    setSelectedCrossSellIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const crossSellSelectedItems = useMemo(() => {
    return crossSellAccessories.filter((acc) => selectedCrossSellIds.includes(acc.id));
  }, [crossSellAccessories, selectedCrossSellIds]);

  const bundleRawTotal = useMemo(() => {
    const accTotal = crossSellSelectedItems.reduce((sum, item) => sum + item.price, 0);
    return configuredTotalPrice + accTotal;
  }, [configuredTotalPrice, crossSellSelectedItems]);

  const bundleDiscountSavings = useMemo(() => {
    if (crossSellSelectedItems.length === 0) return 0;
    // 5% additional bundle savings on total accessory value
    const accTotal = crossSellSelectedItems.reduce((sum, item) => sum + item.price, 0);
    return Math.round(accTotal * 0.05);
  }, [crossSellSelectedItems]);

  const bundleFinalPrice = bundleRawTotal - bundleDiscountSavings;

  // Selected Free Gift Modal preview
  const [inspectGift, setInspectGift] = useState<FreeGiftItem | null>(null);
  const [giftViewMode, setGiftViewMode] = useState<"grid" | "compact">("grid");

  // Tabs for detailed specs
  const [activeTab, setActiveTab] = useState<"specs" | "diagnostics" | "reviews" | "warranty">("specs");

  // Sticky Buy Bar on scroll
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!buyBoxRef.current) return;
      const rect = buyBoxRef.current.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add Configured Laptop to Cart
  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.cart();

    addToCart(product, quantity, {
      ram: activeRamOption?.label,
      storage: activeStorageOption?.label,
      warranty: activeWarrantyOption?.label,
      totalAdjustedPrice: configuredTotalPrice
    });

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#ff5a5f", "#10b981", "#f59e0b"]
      });
    } catch {
      // ignore
    }
  };

  // Buy Now
  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(true);
  };

  // Add Entire Bundle to Cart
  const handleAddBundleToCart = () => {
    soundFX.cart();
    // Add the configured laptop
    addToCart(product, 1, {
      ram: activeRamOption?.label,
      storage: activeStorageOption?.label,
      warranty: activeWarrantyOption?.label,
      totalAdjustedPrice: configuredTotalPrice
    });

    // Add selected accessories
    crossSellSelectedItems.forEach((acc) => {
      addToCart(acc, 1);
    });

    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#3b82f6", "#10b981", "#ff5a5f"]
      });
    } catch {
      // ignore
    }

    setIsCartOpen(true);
  };

  // WhatsApp consultation
  const handleWhatsAppConsultation = () => {
    soundFX.click();
    const branchName = LAPMART_BRANCHES.find((b) => b.id === selectedBranch)?.city || "Kandy Flagship";
    const text = `Hello LapMart! I am inquiring about the ${product.name} (SKU: ${product.sku}).
Configured Specs:
• RAM: ${activeRamOption.label}
• Storage: ${activeStorageOption.label}
• Protection: ${activeWarrantyOption.label}
• Preferred Branch / Pickup: ${branchName}
• Total Configured Price: ${formatLKR(configuredTotalPrice)}

Could you please confirm instant availability or prepare this reservation? Thank you!`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Wishlist & Compare
  const isWishlisted = isInWishlist(product.id);
  const isCompared = compareList.some((p) => p.id === product.id);

  // Sibling higher-tier / alternative laptops
  const siblingLaptops = useMemo(() => {
    return LAPTOP_PRODUCTS.filter(
      (p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category)
    ).slice(0, 3);
  }, [product]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Main Navigation */}
      <NexoraHeader activeTab="Shop" setActiveTab={() => {}} />

      {/* Sticky Flash Deal Sub-Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-amber-400 font-bold">COMPLIMENTARY VIP PACK:</span>
            <span className="text-slate-300">
              6 Premium Accessories worth <strong>LKR 35,000</strong> Included 100% Free with Every Laptop
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-400" /> Fast Islandwide Dispatch (24-48 hrs)
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> 7 Verified Islandwide Showrooms
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/shop" className="hover:text-slate-900 transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href={`/shop?brand=${product.brand}`} className="hover:text-slate-900 transition-colors">{product.brand}</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-[280px] sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* HERO PRODUCT STAGE: 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Media Gallery Stage (5 Cols on large) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative bg-white rounded-3xl border border-slate-200/80 shadow-sm p-4 overflow-hidden">
              {/* Top Badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-tight shadow-sm ${
                    product.condition === "Brand New"
                      ? "bg-emerald-500 text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {product.condition === "Brand New" ? "BRAND NEW FACTORY SEALED" : "CERTIFIED GRADE A+ USED"}
                </span>

                {product.isSale && (
                  <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black uppercase tracking-tight shadow-sm">
                    PROMO SALE
                  </span>
                )}
              </div>

              {/* Top Right Quick Actions */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm transition-all hover:scale-110 active:scale-95 cursor-pointer ${
                    isWishlisted ? "text-rose-500 bg-rose-50 border-rose-200" : "text-slate-600 hover:text-rose-500"
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
                </button>
                <button
                  onClick={() => addToCompare(product)}
                  className={`p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm transition-all hover:scale-110 active:scale-95 cursor-pointer ${
                    isCompared ? "bg-cyan-500 text-white border-cyan-500" : "text-slate-600 hover:text-cyan-600"
                  }`}
                  title="Compare Specs"
                >
                  <GitCompare className="w-4 h-4" />
                </button>
              </div>

              {/* Large Interactive Image Viewport with Zoom */}
              <div
                ref={imageContainerRef}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center cursor-crosshair group select-none"
              >
                <img
                  src={galleryImages[activeImageIndex] || product.image}
                  alt={product.name}
                  className={`w-full h-full object-contain p-4 transition-transform duration-200 ${
                    isZoomed ? "scale-150" : "scale-100"
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                        }
                      : undefined
                  }
                />

                {/* 2030 Telemetry Mini HUD overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 pointer-events-none">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    AI: <strong>{product.scores.aiCompute}/100</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                    Gaming: <strong>{product.scores.gaming} FPS</strong>
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Clock className="w-3.5 h-3.5" />
                    Battery: <strong>{product.scores.batteryLife}%</strong>
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1 no-scrollbar">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundFX.click();
                        setActiveImageIndex(idx);
                      }}
                      className={`relative w-18 h-18 rounded-xl overflow-hidden border-2 bg-slate-50 shrink-0 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? "border-rose-500 ring-2 ring-rose-200 shadow-md scale-105"
                          : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality & Guarantee Assurance Pills */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 text-center shadow-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-900">45-Point Lab Tested</div>
                <div className="text-[10px] text-slate-500">Zero dead-pixel guarantee</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 text-center shadow-xs">
                <Truck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-900">Islandwide Dispatch</div>
                <div className="text-[10px] text-slate-500">Insured 24-48 hr courier</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 text-center shadow-xs">
                <RefreshCw className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-900">7-Day Swap Policy</div>
                <div className="text-[10px] text-slate-500">Peace of mind exchange</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Configuration & Buy Box (6 Cols on large) */}
          <div ref={buyBoxRef} className="lg:col-span-6 space-y-6">
            
            {/* Header: Brand, SKU, Title, Ratings */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-rose-50 text-rose-700 font-mono font-bold text-xs uppercase tracking-wider border border-rose-100">
                  {product.brand} Direct
                </span>
                <span className="text-xs font-mono text-slate-400">
                  SKU: <strong className="text-slate-700">{product.sku}</strong>
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Rating & Review Counter */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span className="text-xs font-bold text-amber-900 font-mono">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  Based on <strong>{product.reviewsCount}</strong> verified buyer audits
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  In Stock ({product.stockCount} units)
                </span>
              </div>
            </div>

            {/* PRICING ENGINE */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Configured Price</span>
                  <PriceTag
                    amount={configuredTotalPrice}
                    className="text-3xl sm:text-4xl font-black text-rose-600 font-mono tracking-tight"
                    decimalClassName="text-[0.6em] font-bold opacity-75 ml-0.5"
                  />
                </div>

                {product.originalPrice && (
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through block font-mono">
                      {formatLKR(product.originalPrice)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                      Save {formatLKR(product.originalPrice - product.price).replace(".00", "")}
                    </span>
                  </div>
                )}
              </div>

              {/* Free Pack Callout Badge */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 border border-amber-200 text-amber-900 text-xs">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Includes <strong>6-Piece VIP Pack</strong> (Backpack, Mouse, Shield, Kit, etc.)
                  </span>
                </div>
                <span className="font-mono font-black text-emerald-600 uppercase bg-white px-2 py-0.5 rounded-full shadow-xs border border-emerald-200">
                  FREE LKR 35,000
                </span>
              </div>
            </div>

            {/* HARDWARE UP-SELL CONFIGURATOR */}
            <div className="space-y-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-rose-600" />
                  <h3 className="text-sm font-bold text-slate-900">Custom Upgrade Configurator</h3>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Real-time dynamic pricing</span>
              </div>

              {/* 1. RAM Upgrade Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>RAM Memory Configuration</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Active: <strong className="text-slate-800">{activeRamOption.label}</strong>
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {ramOptions.map((opt) => {
                    const isSelected = opt.id === selectedRamId;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          soundFX.click();
                          setSelectedRamId(opt.id);
                        }}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-rose-50/80 border-rose-500 ring-2 ring-rose-200 shadow-xs"
                            : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{opt.label}</span>
                            {opt.recommended && (
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-500 text-white">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{opt.detail}</p>
                        </div>

                        <div className="mt-2 text-xs font-mono font-bold text-rose-600">
                          {opt.additionalPrice === 0 ? "Included (+Rs. 0)" : `+ ${formatLKR(opt.additionalPrice)}`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Storage Upgrade Selector */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>NVMe Storage Configuration</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Active: <strong className="text-slate-800">{activeStorageOption.label}</strong>
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {storageOptions.map((opt) => {
                    const isSelected = opt.id === selectedStorageId;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          soundFX.click();
                          setSelectedStorageId(opt.id);
                        }}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-rose-50/80 border-rose-500 ring-2 ring-rose-200 shadow-xs"
                            : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{opt.label}</span>
                            {opt.recommended && (
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-cyan-500 text-white">
                                Top Pick
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{opt.detail}</p>
                        </div>

                        <div className="mt-2 text-xs font-mono font-bold text-rose-600">
                          {opt.additionalPrice === 0 ? "Included (+Rs. 0)" : `+ ${formatLKR(opt.additionalPrice)}`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Extended Protection Up-sell */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Warranty & Protection Plan</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Active: <strong className="text-slate-800">{activeWarrantyOption.label}</strong>
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {warrantyOptions.map((opt) => {
                    const isSelected = opt.id === selectedWarrantyId;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          soundFX.click();
                          setSelectedWarrantyId(opt.id);
                        }}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-rose-50/80 border-rose-500 ring-2 ring-rose-200 shadow-xs"
                            : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{opt.label}</span>
                            {opt.recommended && (
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-500 text-white">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{opt.detail}</p>
                        </div>

                        <div className="mt-2 text-xs font-mono font-bold text-rose-600">
                          {opt.additionalPrice === 0 ? "Included Free" : `+ ${formatLKR(opt.additionalPrice)}`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* BRANCH PICKUP & ISLANDWIDE AVAILABILITY SELECTOR */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span>Choose Showroom Pickup / Islandwide Delivery</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  7 Branches Open
                </span>
              </div>

              <select
                value={selectedBranch}
                onChange={(e) => {
                  soundFX.click();
                  setSelectedBranch(e.target.value);
                }}
                className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer"
              >
                {LAPMART_BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.city} {b.isFlagship ? "★ Flagship CyberHub" : ""} — {b.hours} ({b.hotline})
                  </option>
                ))}
              </select>

              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                <span>
                  Ready for collection at{" "}
                  <strong>
                    {LAPMART_BRANCHES.find((b) => b.id === selectedBranch)?.city || "Kandy Flagship"}
                  </strong>{" "}
                  within 30 mins
                </span>
                <span className="text-emerald-600 font-medium">Islandwide Courier: 24h</span>
              </div>
            </div>

            {/* BUY ACTIONS: Quantity, Add to Cart, Buy Now, WhatsApp */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-xs">
                  <button
                    onClick={() => {
                      soundFX.click();
                      setQuantity((q) => Math.max(1, q - 1));
                    }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-all font-bold text-base cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-black text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      soundFX.click();
                      setQuantity((q) => Math.min(product.stockCount, q + 1));
                    }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-all font-bold text-base cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add To Cart</span>
                </button>

                {/* Buy Now (1-Click) */}
                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm sm:text-base shadow-md transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              {/* Direct WhatsApp Specialist Consultation */}
              <button
                onClick={handleWhatsAppConsultation}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp Hardware Consultation (071 059 5548)</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION: COMPLIMENTARY 6-PIECE VIP GIFT PACK BREAKDOWN ("separate items as view customers like") */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70 text-xs font-extrabold uppercase tracking-wider mb-1.5">
                <Gift className="w-3.5 h-3.5 text-amber-600" />
                <span>Complimentary Customer Offer</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Included 6-Piece VIP Gift Pack
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Every laptop purchase includes this curated bundle worth <strong>LKR 35,000</strong> — 100% free of charge. Click any item to inspect specs.
              </p>
            </div>

            {/* View Mode Switcher + Value Pill */}
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-right">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Total Bonus Value</span>
                <span className="text-sm sm:text-base font-black text-emerald-600 font-mono">
                  FREE LKR 35,000
                </span>
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setGiftViewMode("grid")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    giftViewMode === "grid" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setGiftViewMode("compact")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    giftViewMode === "compact" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* GIFT ITEMS PRESENTATION */}
          {giftViewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {FREE_GIFT_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    soundFX.click();
                    setInspectGift(item);
                  }}
                  className="group relative bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-amber-400/80 shadow-xs hover:shadow-xl transition-all duration-300 p-4 cursor-pointer flex flex-col justify-between text-left"
                >
                  <div>
                    {/* Top image preview */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-200/60">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-500 text-white font-mono font-black text-[10px] uppercase shadow-xs">
                        {item.badge}
                      </span>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white font-mono text-[10px]">
                        Inspect Details
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 line-through font-mono block">
                        Valued at {formatLKR(item.retailValue)}
                      </span>
                      <span className="text-xs font-black text-emerald-600 font-mono">
                        Included Free (+Rs. 0)
                      </span>
                    </div>

                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 group-hover:border-amber-400 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 shadow-xs transition-colors"
                    >
                      View Specs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* COMPACT LIST VIEW */
            <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
              {FREE_GIFT_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    soundFX.click();
                    setInspectGift(item);
                  }}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{item.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 line-through font-mono block">
                      {formatLKR(item.retailValue)}
                    </span>
                    <span className="text-xs font-black text-emerald-600 font-mono">
                      FREE
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION: CROSS-SELLING ("FREQUENTLY BOUGHT TOGETHER") */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-extrabold uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Frequently Bought Together</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Recommended Accessories Bundle
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Bundle high-performance peripherals with your machine and receive an automatic <strong>extra 5% bundle discount</strong> today.
              </p>
            </div>

            {bundleDiscountSavings > 0 && (
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                Bundle Savings: {formatLKR(bundleDiscountSavings)}
              </span>
            )}
          </div>

          {/* Bundle Builder Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Product Strip */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-3">
              
              {/* 1. The Main Laptop */}
              <div className="w-full sm:w-1/3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center flex flex-col justify-between min-h-[220px]">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white mb-2 p-2 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="max-h-24 object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">This Laptop</span>
                  <div className="text-xs font-bold text-slate-900 line-clamp-2">{product.name}</div>
                </div>
                <div className="text-xs font-mono font-black text-rose-600 mt-2">
                  {formatLKR(configuredTotalPrice)}
                </div>
              </div>

              <div className="hidden sm:flex text-slate-300 font-bold text-xl">+</div>

              {/* 2. Accessories Checkboxes */}
              <div className="w-full sm:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {crossSellAccessories.slice(0, 2).map((acc) => {
                  const isChecked = selectedCrossSellIds.includes(acc.id);
                  return (
                    <div
                      key={acc.id}
                      onClick={() => toggleCrossSell(acc.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[220px] ${
                        isChecked
                          ? "bg-blue-50/70 border-blue-500 ring-2 ring-blue-200 shadow-xs"
                          : "bg-slate-50/50 border-slate-200 opacity-60 hover:opacity-100 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="aspect-[4/3] w-20 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center border border-slate-100">
                          <img src={acc.image} alt={acc.name} className="max-h-16 object-contain" />
                        </div>

                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </div>

                      <div className="mt-2">
                        <span className="text-[9px] font-mono font-bold text-blue-600 uppercase block">
                          {acc.subCategory}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{acc.name}</h4>
                        <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{acc.specs}</p>
                      </div>

                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-xs font-mono font-bold text-slate-900">
                          {formatLKR(acc.price)}
                        </span>
                        {acc.originalPrice && (
                          <span className="text-[10px] font-mono text-slate-400 line-through">
                            {formatLKR(acc.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Calculated Bundle Action Box */}
            <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  Bundle Summary
                </span>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs text-slate-300 font-mono">
                    <span>1x {product.brand} Laptop:</span>
                    <span>{formatLKR(configuredTotalPrice)}</span>
                  </div>
                  {crossSellSelectedItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs text-slate-400 font-mono">
                      <span className="truncate max-w-[170px]">+ {item.name}:</span>
                      <span>{formatLKR(item.price)}</span>
                    </div>
                  ))}
                  {bundleDiscountSavings > 0 && (
                    <div className="flex justify-between text-xs text-emerald-400 font-mono font-bold pt-2 border-t border-white/10">
                      <span>Instant Bundle Promo (5%):</span>
                      <span>- {formatLKR(bundleDiscountSavings)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between border-t border-white/15 pt-3">
                  <span className="text-xs text-slate-300">Total Bundle:</span>
                  <PriceTag
                    amount={bundleFinalPrice}
                    className="text-2xl font-black text-amber-400 font-mono"
                    decimalClassName="text-[0.6em] opacity-75 ml-0.5"
                  />
                </div>

                <button
                  onClick={handleAddBundleToCart}
                  className="mt-4 w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add All {1 + crossSellSelectedItems.length} Items to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: DEEP-DIVE TABS (Specs, 45-Point Lab Diagnostics, Reviews, Warranty) */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => {
                soundFX.click();
                setActiveTab("specs");
              }}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === "specs"
                  ? "border-rose-500 text-rose-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Technical Specifications
            </button>

            <button
              onClick={() => {
                soundFX.click();
                setActiveTab("diagnostics");
              }}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeTab === "diagnostics"
                  ? "border-rose-500 text-rose-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Award className="w-4 h-4 text-cyan-600" />
              <span>45-Point Lab Diagnostics</span>
            </button>

            <button
              onClick={() => {
                soundFX.click();
                setActiveTab("reviews");
              }}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === "reviews"
                  ? "border-rose-500 text-rose-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Customer Reviews ({product.reviewsCount})
            </button>

            <button
              onClick={() => {
                soundFX.click();
                setActiveTab("warranty");
              }}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === "warranty"
                  ? "border-rose-500 text-rose-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Warranty & Service Policy
            </button>
          </div>

          {/* TAB CONTENT: 1. Full Specs */}
          {activeTab === "specs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-rose-600" />
                  <span>Computing Architecture</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">Processor:</span>
                  <span className="font-semibold text-slate-900 text-right">{product.processor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">Processor Cores:</span>
                  <span className="font-semibold text-slate-900 text-right">{product.specs.cores || "Multi-Core Architecture"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">Installed Memory:</span>
                  <span className="font-semibold text-slate-900 text-right">{product.ram}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Graphics GPU:</span>
                  <span className="font-semibold text-slate-900 text-right">{product.graphics}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Display & Chassis</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">Display Panel:</span>
                  <span className="font-semibold text-slate-900 text-right">{product.display}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">Physical Weight:</span>
                  <span className="font-semibold text-slate-900 text-right">{product.specs.weight || "1.8 kg"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">Battery Cell:</span>
                  <span className="font-semibold text-slate-900 text-right">{product.specs.battery || "High Endurance"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Operating System:</span>
                  <span className="font-semibold text-slate-900 text-right">{product.specs.os || "Windows 11 Pro"}</span>
                </div>
              </div>

              <div className="md:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-emerald-600" />
                  <span>Connectivity & Expansion Ports</span>
                </div>
                <p className="text-slate-700 leading-relaxed pt-1">
                  {product.specs.ports || "Thunderbolt 4 / USB-C 3.2 Gen 2, HDMI 2.1, USB 3.2 Type-A, 3.5mm Headphone combo, Gigabit LAN"}
                </p>
              </div>
            </div>
          )}

          {/* TAB CONTENT: 2. 45-Point Lab Diagnostics */}
          {activeTab === "diagnostics" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs sm:text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Official LapMart 45-Point Hardware Diagnostics Certification:</strong> Every machine is subjected to rigorous hardware stress and calibration testing before leaving our Colombo / Kandy tech vaults.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {[
                  "Display Zero-Dead-Pixel Inspection (RGB Matrix)",
                  "FurMark Full GPU Thermal Saturation & TGP Test",
                  "MemTest86 RAM Parity & Timing Stability",
                  "CrystalDiskInfo NVMe Read/Write Health Check",
                  "Battery Discharge Rate & Charge Cycle Analysis",
                  "Dual-Fan Bearing Acoustic Noise Measurement",
                  "Chassis Structural Integrity & Hinge Torque Audit",
                  "Thunderbolt & USB-C Power Delivery Negotiator",
                  "Wi-Fi 6E/7 Throughput & Packet Drop Benchmark",
                  "Multi-Touch Precision Trackpad Calibration",
                  "Keycap Scissor Switch Actuation Parity",
                  "Internal Dust Ultrasonic Decontamination"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 font-medium text-slate-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: 3. Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-center pr-4 border-r border-slate-200">
                  <div className="text-3xl font-black text-slate-900 font-mono">{product.rating.toFixed(1)}</div>
                  <div className="flex justify-center my-1 text-amber-500">
                    {"★".repeat(5)}
                  </div>
                  <div className="text-[11px] text-slate-500">{product.reviewsCount} Verified Reviews</div>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>100% Verified Purchases:</strong> Audited through LapMart serial numbers.</div>
                  <div><strong>Recommendation Rate:</strong> 98.4% of clients recommend this configuration.</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Kasun Jayasuriya",
                    date: "3 days ago",
                    verified: "Verified Buyer • Kandy Flagship",
                    rating: 5,
                    comment: `Superb machine! The thermals under Unreal Engine 5 are ice cold. The free backpack and mouse included in the pack were genuine quality, not cheap giveaways.`
                  },
                  {
                    name: "Niroshan Perera",
                    date: "1 week ago",
                    verified: "Verified Buyer • Bambalapitiya",
                    rating: 5,
                    comment: `Ordered with the 32GB RAM upgrade. LapMart delivered to Colombo 04 within 2 hours of payment confirmation. Fast and trustworthy.`
                  }
                ].map((rev, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-white shadow-xs space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{rev.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                          {rev.verified}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="text-amber-500">{"★".repeat(rev.rating)}</div>
                    <p className="text-slate-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: 4. Warranty & Service Policy */}
          {activeTab === "warranty" && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <div className="font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Official LapMart Warranty Agreement</span>
                </div>
                <p className="text-xs text-emerald-900">
                  {product.specs.warranty || "2 Years LapMart Official Comprehensive Hardware Warranty + 2 Years Free Labor Servicing across all 7 islandwide branches."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <h4 className="font-bold text-slate-900">What Is Covered:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                    <li>Motherboard, processor, and dedicated GPU failures</li>
                    <li>Display panel lines, flicker, or zero backlight</li>
                    <li>Factory charger and power delivery components</li>
                    <li>Internal thermal fans and heatpipe failure</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <h4 className="font-bold text-slate-900">7 Showrooms Nationwide Support:</h4>
                  <p className="text-xs text-slate-600">
                    Drop off at any LapMart service counter in Kandy Flagship, Bambalapitiya, Kurunegala, Anuradhapura, Borella, or Polonnaruwa with instant warranty serial tracking.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION: UP-SELL SIBLING ALTERNATIVES */}
        {siblingLaptops.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Compare With Similar Tier Upgrades
                </h3>
                <p className="text-xs text-slate-500">
                  Alternative rigs in the same power classification
                </p>
              </div>
              <Link href="/shop" className="text-xs font-bold text-rose-600 hover:text-rose-700">
                Explore All Rigs →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {siblingLaptops.map((sibling) => (
                <Link
                  key={sibling.id}
                  href={`/product/${getLaptopSlug(sibling)}`}
                  className="group bg-white p-4 rounded-3xl border border-slate-200/80 hover:border-rose-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 mb-3 flex items-center justify-center p-2">
                      <img
                        src={sibling.image}
                        alt={sibling.name}
                        className="max-h-28 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                      {sibling.brand} • {sibling.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 line-clamp-2 mt-1 leading-snug">
                      {sibling.name}
                    </h4>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 font-mono">
                      {formatLKR(sibling.price)}
                    </span>
                    <span className="text-[10px] font-bold text-rose-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      View Rig →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* MODAL: FREE GIFT ITEM INSPECTION MODAL */}
      {inspectGift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-left space-y-4">
            <button
              onClick={() => setInspectGift(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img src={inspectGift.image} alt={inspectGift.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-500 text-white font-mono font-black text-xs uppercase shadow-md">
                100% INCLUDED FREE
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-600 uppercase">
                  Complimentary Gift Item
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 line-through">
                  Retail Value: {formatLKR(inspectGift.retailValue)}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1">{inspectGift.title}</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{inspectGift.subtitle}</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {inspectGift.description}
            </p>

            {/* Highlights */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                Key Features:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {inspectGift.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setInspectGift(null)}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      {/* STICKY QUICK-BUY BAR (Slides up when scrolling past buy box on mobile and desktop) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-3 px-4 transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <img
              src={product.image}
              alt=""
              className="w-11 h-11 rounded-xl object-contain bg-slate-100 border border-slate-200 shrink-0 p-1"
            />
            <div className="truncate">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {product.name}
              </h4>
              <div className="text-[11px] text-slate-500 font-mono">
                {activeRamOption.label} • {activeStorageOption.label}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-400 block font-mono">Configured Total</span>
              <span className="text-base sm:text-lg font-black text-rose-600 font-mono">
                {formatLKR(configuredTotalPrice)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="py-2.5 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleWhatsAppConsultation}
              className="p-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors cursor-pointer"
              title="WhatsApp inquiry"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CompareDrawer />
      <QuickViewModal />
      <LapMartChatbot />

      {/* Footer */}
      <NexoraFooter />
    </div>
  );
}
