"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { LaptopProduct, AccessoryProduct, CartItem, FilterState } from "@/types";
import { soundFX } from "@/utils/sound";

interface StoreContextType {
  cart: CartItem[];
  addToCart: (
    product: LaptopProduct | AccessoryProduct,
    quantity?: number,
    customConfig?: {
      ram?: string;
      storage?: string;
      warranty?: string;
      totalAdjustedPrice?: number;
    }
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  compareList: LaptopProduct[];
  addToCompare: (product: LaptopProduct) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;

  quickViewProduct: LaptopProduct | null;
  setQuickViewProduct: (product: LaptopProduct | null) => void;

  selectedBranch: string;
  setSelectedBranch: (branchId: string) => void;

  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  activeBrandTab: string;
  setActiveBrandTab: (brand: string) => void;

  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;

  formatLKR: (amount: number) => string;
}

const initialFilters: FilterState = {
  brand: "ALL",
  condition: "ALL",
  processor: "ALL",
  category: "ALL",
  priceRange: [50000, 1000000],
  searchQuery: "",
  sortBy: "featured",
  workflowPersona: "ALL"
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<LaptopProduct[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<LaptopProduct | null>(null);
  const [selectedBranch, setSelectedBranch] = useState("bambalapitiya");
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [activeBrandTab, setActiveBrandTab] = useState("ALL LAPTOPS");
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        soundFX.click();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Load cart and sound settings from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("lapmart_cart");
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem("lapmart_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedSound = localStorage.getItem("lapmart_sound");
      if (savedSound !== null) {
        const val = savedSound === "true";
        setSoundEnabled(val);
        soundFX.enabled = val;
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("lapmart_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("lapmart_wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundFX.enabled = next;
      if (next) soundFX.click();
      try {
        localStorage.setItem("lapmart_sound", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const addToCart = (
    product: LaptopProduct | AccessoryProduct,
    quantity = 1,
    customConfig?: {
      ram?: string;
      storage?: string;
      warranty?: string;
      totalAdjustedPrice?: number;
    }
  ) => {
    soundFX.success();
    setCart((prev) => {
      // If item has custom config, treat each unique configuration as its own cart item
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.customConfiguration?.ram === customConfig?.ram &&
          item.customConfiguration?.storage === customConfig?.storage &&
          item.customConfiguration?.warranty === customConfig?.warranty
      );

      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          product,
          quantity,
          selectedBranch,
          customConfiguration: customConfig
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    soundFX.click();
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    soundFX.click();
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) =>
      sum + (item.customConfiguration?.totalAdjustedPrice ?? item.product.price) * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    soundFX.click();
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addToCompare = (product: LaptopProduct) => {
    soundFX.switchTab();
    setCompareList((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      if (prev.length >= 3) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
    setIsCompareOpen(true);
  };

  const removeFromCompare = (productId: string) => {
    soundFX.click();
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    soundFX.click();
    setCompareList([]);
    setIsCompareOpen(false);
  };

  const resetFilters = () => {
    soundFX.click();
    setFilters(initialFilters);
    setActiveBrandTab("ALL LAPTOPS");
  };

  const formatLKR = (amount: number) => {
    return `Rs. ${amount.toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
        quickViewProduct,
        setQuickViewProduct,
        selectedBranch,
        setSelectedBranch,
        filters,
        setFilters,
        resetFilters,
        activeBrandTab,
        setActiveBrandTab,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
        formatLKR
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
