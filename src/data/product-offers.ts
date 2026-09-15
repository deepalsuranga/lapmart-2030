import { FreeGiftItem, HardwareUpgradeOption, AccessoryProduct, LaptopProduct } from "@/types";
import { ACCESSORY_PRODUCTS } from "./lapmart-data";

/**
 * 6-Piece Complimentary VIP Gift Pack included FREE with every laptop purchase.
 * Total retail value: LKR 35,000.
 */
export const FREE_GIFT_ITEMS: FreeGiftItem[] = [
  {
    id: "gift-backpack",
    title: "LapMart CyberArmor™ Executive Backpack",
    subtitle: "Anti-Theft Ballistic Nylon • 16\" Padded Vault",
    retailValue: 8500,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    iconName: "Briefcase",
    badge: "FREE GIFT",
    description: "Reinforced water-repellent ballistic nylon chassis with 360-degree shock-absorbing EVA foam suspension for 15.6\"-16\" laptops. Features hidden anti-theft zipper compartments, ergonomic breathable mesh back panel, and built-in USB external passthrough port.",
    highlights: ["100% Water-repellent nylon", "Shock-absorbent laptop vault", "Ergonomic shoulder harness", "Anti-theft hidden pockets"]
  },
  {
    id: "gift-mouse",
    title: "LapMart Pro Dual-Mode Silent Wireless Mouse",
    subtitle: "2.4GHz + Bluetooth 5.2 • 2400 DPI • Whisper Silent",
    retailValue: 3500,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    iconName: "Mouse",
    badge: "FREE GIFT",
    description: "Ergonomic ambidextrous wireless mouse equipped with dual-connectivity (instant USB receiver or multi-device Bluetooth 5.2). Built-in 90% acoustic dampening switches provide whisper-quiet clicks in libraries, lecture halls, or corporate boardrooms.",
    highlights: ["Silent-click tactile microswitches", "Dual 2.4G & Bluetooth connectivity", "3-level DPI on-the-fly switch (800/1600/2400)", "Up to 12 months battery endurance"]
  },
  {
    id: "gift-keyboard-shield",
    title: "Silicone Precision Keyboard Dust & Spill Shield",
    subtitle: "0.1mm Ultra-thin • Washable • Antistatic",
    retailValue: 1500,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    iconName: "Shield",
    badge: "FREE GIFT",
    description: "Medical-grade thermal-resistant silicone skin contoured specifically for modern laptop keycaps. Shields delicate scissor switches and motherboard traces from accidental liquid spills, food crumbs, and dust ingress.",
    highlights: ["Ultra-thin 0.1mm zero-drag typing", "100% Washable & reusable", "Anti-spill liquid barrier", "Antistatic dirt repel"]
  },
  {
    id: "gift-cleaning-kit",
    title: "Nano Microfiber Screen Care & Diagnostics Kit",
    subtitle: "Alcohol-Free Eco Formula + Dual Plush Microfibers",
    retailValue: 1500,
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80",
    iconName: "Sparkles",
    badge: "FREE GIFT",
    description: "Formulated specifically for OLED, IPS, and anti-glare anti-reflective display coatings. Safely dissolves fingerprints, oil streaks, and static dust without streaking or degrading hydrophobic monitor layers.",
    highlights: ["Safe for OLED / IPS / Retina", "Ammonia & alcohol free formula", "High-density microfiber cloth", "Antistatic dust protection"]
  },
  {
    id: "gift-lab-certificate",
    title: "45-Point Hardware Diagnostics Lab Certificate",
    subtitle: "Thermal Stress Tested • Zero Dead-Pixel Lab Checked",
    retailValue: 5000,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    iconName: "CheckCircle",
    badge: "LAB CERTIFIED",
    description: "Official QA document signed by a LapMart Senior Hardware Engineer certifying that your machine underwent extensive stress-testing: FurMark thermal saturation, MemTest86 memory parity, CrystalDiskInfo SSD read/write health, and 100% color gamut calibration.",
    highlights: ["100% Dead-pixel inspected panel", "Thermals & fan curve calibrated", "SSD & Battery health certified", "Signed by QA Lead Engineer"]
  },
  {
    id: "gift-service-pass",
    title: "2-Year Lifetime Labor Free Service Privilege Card",
    subtitle: "Valid Across All 7 Islandwide Branches • Priority Queue",
    retailValue: 15000,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    iconName: "Award",
    badge: "VIP PRIVILEGE",
    description: "Exclusive lifetime labor waiver card providing zero-cost servicing at any LapMart branch (Kandy Flagship, Bambalapitiya, Kurunegala, Anuradhapura, Borella, Polonnaruwa). Includes complimentary annual thermal repasting, dust purge, and OS restoration.",
    highlights: ["Free thermal paste renewal (Arctic MX-6)", "Full chassis dust ultrasonic purge", "Free OS & driver re-installation", "Priority VIP counter routing"]
  }
];

export const TOTAL_FREE_GIFT_VALUE = FREE_GIFT_ITEMS.reduce((acc, item) => acc + item.retailValue, 0);

/**
 * Hardware Up-Sell Configurations by Laptop Tier
 */
export function getRamUpgradeOptions(product: LaptopProduct): HardwareUpgradeOption[] {
  const isApple = product.brand === "Apple";
  const isDdr5 = product.ram.toLowerCase().includes("ddr5");

  if (isApple) {
    return [
      {
        id: "ram-stock",
        label: `${product.ram} Unified Memory`,
        detail: "Factory Integrated High-Bandwidth Architecture",
        additionalPrice: 0,
        recommended: true,
        inStock: true
      }
    ];
  }

  if (isDdr5) {
    return [
      {
        id: "ram-stock",
        label: product.ram,
        detail: "Standard Factory Dual-Channel Configuration",
        additionalPrice: 0,
        recommended: false,
        inStock: true
      },
      {
        id: "ram-32gb-ddr5",
        label: "Upgrade to 32GB High-Speed DDR5 (5600MHz)",
        detail: "Lexar / Crucial Dual-Channel Performance Kit (+16GB Module)",
        additionalPrice: 18500,
        recommended: true,
        inStock: true
      },
      {
        id: "ram-64gb-ddr5",
        label: "Upgrade to 64GB Extreme DDR5 (5600MHz)",
        detail: "Dual 32GB SODIMM for 4K Video Editing, Virtualization & Heavy AI",
        additionalPrice: 38000,
        recommended: false,
        inStock: true
      }
    ];
  }

  // DDR4 Laptops
  return [
    {
      id: "ram-stock",
      label: product.ram,
      detail: "Factory Standard Memory Configuration",
      additionalPrice: 0,
      recommended: false,
      inStock: true
    },
    {
      id: "ram-16gb-ddr4",
      label: "Upgrade to 16GB High-Speed DDR4 (3200MHz)",
      detail: "Doubled Bandwidth for Seamless Multitasking & Chrome Tabs",
      additionalPrice: 7200,
      recommended: true,
      inStock: true
    },
    {
      id: "ram-32gb-ddr4",
      label: "Upgrade to 32GB Max-Capacity DDR4 (3200MHz)",
      detail: "Maximum Supported Hardware Capability for Power Users",
      additionalPrice: 16500,
      recommended: false,
      inStock: true
    }
  ];
}

export function getStorageUpgradeOptions(product: LaptopProduct): HardwareUpgradeOption[] {
  const isApple = product.brand === "Apple";

  if (isApple) {
    return [
      {
        id: "ssd-stock",
        label: product.storage,
        detail: "Factory Apple High-Bandwidth NVMe Storage",
        additionalPrice: 0,
        recommended: true,
        inStock: true
      }
    ];
  }

  return [
    {
      id: "ssd-stock",
      label: product.storage,
      detail: "Standard Factory NVMe Solid State Drive",
      additionalPrice: 0,
      recommended: false,
      inStock: true
    },
    {
      id: "ssd-samsung-2tb",
      label: "Upgrade to 2TB Samsung 990 PRO Gen4 NVMe",
      detail: "Blazing 7,450 MB/s Read Speed + Nickel Coated Heat Spreader",
      additionalPrice: 48000,
      recommended: true,
      inStock: true
    },
    {
      id: "ssd-lexar-4tb",
      label: "Upgrade to 4TB Massive Ultra-Fast NVMe Gen4",
      detail: "Store 100+ AAA Games, RAW 8K Footage & Massive Datasets",
      additionalPrice: 89000,
      recommended: false,
      inStock: true
    }
  ];
}

export const WARRANTY_UPGRADE_OPTIONS: HardwareUpgradeOption[] = [
  {
    id: "warranty-standard",
    label: "Standard LapMart Warranty (Included)",
    detail: "Full Comprehensive Hardware & Diagnostics Coverage",
    additionalPrice: 0,
    recommended: false,
    inStock: true
  },
  {
    id: "warranty-care-plus",
    label: "LapMart Care+ 3-Year Extended VIP Protection",
    detail: "Zero-Deductible Liquid & Surge Shield + 1-to-1 Replacement Guarantee",
    additionalPrice: 14900,
    recommended: true,
    inStock: true
  }
];

/**
 * Cross-Sell Accessories ("Frequently Bought Together")
 */
export function getCrossSellAccessories(laptop: LaptopProduct): AccessoryProduct[] {
  const isGaming = laptop.category === "Gaming" || laptop.graphics.includes("RTX");
  const isApple = laptop.brand === "Apple";

  if (isGaming) {
    // Return Gaming Mouse, Samsung 990 Pro SSD, and 1080p Privacy Webcam
    return [
      ACCESSORY_PRODUCTS.find((a) => a.id === "acc-razer-deathadder-v3") || ACCESSORY_PRODUCTS[5],
      ACCESSORY_PRODUCTS.find((a) => a.id === "acc-samsung-990-pro") || ACCESSORY_PRODUCTS[4],
      ACCESSORY_PRODUCTS.find((a) => a.id === "acc-webcam-1080") || ACCESSORY_PRODUCTS[0]
    ];
  }

  if (isApple) {
    // Return 90W GaN Charger, 1080p Webcam, Samsung SSD
    return [
      ACCESSORY_PRODUCTS.find((a) => a.id === "acc-macbook-charger-90w") || ACCESSORY_PRODUCTS[1],
      ACCESSORY_PRODUCTS.find((a) => a.id === "acc-samsung-990-pro") || ACCESSORY_PRODUCTS[4],
      ACCESSORY_PRODUCTS.find((a) => a.id === "acc-webcam-1080") || ACCESSORY_PRODUCTS[0]
    ];
  }

  // Business / Ultrabook default bundle
  return [
    ACCESSORY_PRODUCTS.find((a) => a.id === "acc-macbook-charger-90w") || ACCESSORY_PRODUCTS[1],
    ACCESSORY_PRODUCTS.find((a) => a.id === "acc-samsung-990-pro") || ACCESSORY_PRODUCTS[4],
    ACCESSORY_PRODUCTS.find((a) => a.id === "acc-lexar-ddr5-16gb") || ACCESSORY_PRODUCTS[0]
  ];
}
