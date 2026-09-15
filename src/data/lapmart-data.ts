import { LaptopProduct, AccessoryProduct, Branch } from "@/types";

export const LAPMART_BRANCHES: Branch[] = [
  {
    id: "anuradhapura",
    city: "Anuradhapura",
    hotline: "0761407320",
    displayPhone: "076 140 7320",
    address: "488/11, Maithripala Senanayake Mawatha, New Bus Stand, Anuradhapura",
    hours: "8:30 AM - 7:00 PM",
    status: "Open Now",
    coordinates: { lat: 8.3114, lng: 80.4037 }
  },
  {
    id: "kurunegala",
    city: "Kurunegala",
    hotline: "0761407321",
    displayPhone: "076 140 7321",
    address: "No. 42, Colombo Road, Kurunegala",
    hours: "9:00 AM - 7:00 PM",
    status: "Open Now",
    coordinates: { lat: 7.4863, lng: 80.3623 }
  },
  {
    id: "bambalapitiya",
    city: "Bambalapitiya",
    hotline: "0710595548",
    displayPhone: "071 059 5548",
    address: "Unity Plaza Commercial Complex, Galle Road, Bambalapitiya, Colombo 04",
    hours: "9:30 AM - 7:30 PM",
    status: "Open Now",
    coordinates: { lat: 6.8928, lng: 79.8556 }
  },
  {
    id: "borella",
    city: "Borella",
    hotline: "0761407323",
    displayPhone: "076 140 7323",
    address: "No. 18, D.S. Senanayake Mawatha, Borella, Colombo 08",
    hours: "9:00 AM - 7:00 PM",
    status: "Open Now",
    coordinates: { lat: 6.9147, lng: 79.8778 }
  },
  {
    id: "kandy",
    city: "Kandy",
    hotline: "0761407322",
    displayPhone: "076 140 7322",
    address: "No. 65, Dalada Veediya, Kandy City Center",
    hours: "9:00 AM - 7:00 PM",
    status: "Open Now",
    coordinates: { lat: 7.2906, lng: 80.6337 }
  },
  {
    id: "kandy-flagship",
    city: "Kandy Flagship",
    isFlagship: true,
    hotline: "0761407330",
    displayPhone: "076 140 7330",
    address: "LapMart CyberHub, Peradeniya Road, Kandy",
    hours: "8:30 AM - 8:00 PM",
    status: "Open Now",
    coordinates: { lat: 7.2755, lng: 80.6122 }
  },
  {
    id: "polonnaruwa",
    city: "Polonnaruwa",
    hotline: "0743600608",
    displayPhone: "074 360 0608",
    address: "Batticaloa Road, Kaduruwela, Polonnaruwa",
    hours: "9:00 AM - 6:30 PM",
    status: "Open Now",
    coordinates: { lat: 7.9403, lng: 81.0188 }
  }
];

export const MASTER_HOTLINE = "071 059 5548";
export const WHATSAPP_NUMBER = "94710595548";
export const LAPMART_EMAIL = "info@lapmart.lk";

export const LAPTOP_PRODUCTS: LaptopProduct[] = [
  {
    id: "lap-acer-nitro",
    sku: "D001099",
    slug: "acer-nitro-16-ai-edition-ryzen-7-rtx-4060-d001099",
    name: "Acer Nitro 16 AI Edition | Ryzen 7 7840HS | 16GB DDR5 | 1TB NVMe | RTX 4060 8GB | 16\" 165Hz QHD+",
    brand: "Acer",
    condition: "Brand New",
    category: "Gaming",
    processor: "AMD Ryzen 7 7840HS (8 Cores / 16 Threads)",
    ram: "16GB DDR5 5600MHz",
    storage: "1TB PCIe Gen4 NVMe SSD",
    display: "16\" WQXGA (2560x1600) 165Hz sRGB 100% G-Sync",
    graphics: "NVIDIA GeForce RTX 4060 8GB GDDR6 (140W TGP)",
    price: 385000,
    originalPrice: 420000,
    rating: 4.9,
    reviewsCount: 42,
    inStock: true,
    stockCount: 14,
    featured: true,
    isHot: true,
    isSale: true,
    image: "/generated/products/nitro.webp",
    gallery: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      cores: "8 Cores, 16 Threads up to 5.1GHz",
      battery: "90Wh 4-Cell Li-ion, up to 8 hrs",
      weight: "2.6 kg (Titanium chassis)",
      os: "Windows 11 Pro 64-bit Genuine",
      ports: "Thunderbolt 4, USB 3.2 Gen 2, HDMI 2.1, RJ45 2.5G LAN",
      warranty: "2 Years LapMart Official Comprehensive Warranty",
      conditionGrade: "Brand New Factory Sealed"
    },
    scores: {
      gaming: 94,
      productivity: 91,
      batteryLife: 78,
      aiCompute: 88
    },
    availableBranches: ["anuradhapura", "kandy-flagship", "bambalapitiya", "kurunegala"]
  },
  {
    id: "lap-thinkpad-t490",
    sku: "D001052",
    slug: "lenovo-thinkpad-t490-touch-i5-8th-gen-d001052",
    name: "Lenovo ThinkPad T490 | i5 8th GEN | 8GB RAM | 256GB SSD | UHD Graphics | 14 inch | Touch | Used",
    brand: "Lenovo",
    condition: "Used",
    category: "Business",
    processor: "Intel Core i5-8365U Quad-Core",
    ram: "8GB DDR4 2666MHz (Upgradeable to 32GB)",
    storage: "256GB PCIe NVMe M.2 SSD",
    display: "14.0\" FHD (1920x1080) IPS Multi-Touch Antiglare",
    graphics: "Intel UHD Graphics 620",
    price: 97000,
    originalPrice: 100000,
    rating: 4.7,
    reviewsCount: 56,
    inStock: true,
    stockCount: 8,
    featured: true,
    isHot: false,
    isSale: true,
    image: "/generated/products/thinkpad.webp",
    gallery: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      cores: "4 Cores, 8 Threads up to 4.10GHz",
      battery: "50Wh Fast Charging battery (Tested 88% health)",
      weight: "1.55 kg Ultralight Magnesium Alloy",
      os: "Windows 11 Pro Genuine Activated",
      ports: "2x USB 3.1, 1x USB-C Thunderbolt 3, HDMI 1.4b, MicroSD",
      warranty: "6 Months LapMart Hardware Warranty + 2 Years Free Service",
      conditionGrade: "Grade A+"
    },
    scores: {
      gaming: 42,
      productivity: 82,
      batteryLife: 85,
      aiCompute: 45
    },
    availableBranches: ["anuradhapura", "borella", "kandy", "polonnaruwa"]
  },
  {
    id: "lap-hp-zbook",
    sku: "D001038",
    slug: "hp-zbook-14-g8-workstation-i5-10th-gen-d001038",
    name: "HP ZBOOK 14 G8 | i5 10th GEN | 8GB RAM | 256GB SSD | 14 FHD DISPLAY | Used",
    brand: "HP",
    condition: "Used",
    category: "Workstation",
    processor: "Intel Core i5-10310U vPro (10th Gen)",
    ram: "8GB DDR4 High-Speed RAM",
    storage: "256GB Turbo Drive TLC SSD",
    display: "14\" FHD (1920x1080) IPS 400 nits Low Power 100% sRGB",
    graphics: "Intel UHD 630 Workstation Edition",
    price: 121000,
    originalPrice: 125000,
    rating: 4.8,
    reviewsCount: 31,
    inStock: true,
    stockCount: 6,
    featured: true,
    isHot: false,
    isSale: true,
    image: "/generated/products/hp-zbook.webp",
    gallery: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      cores: "4 Cores, 8 Threads up to 4.4GHz",
      battery: "53Wh Li-ion polymer, 85%+ Health Verified",
      weight: "1.35 kg CNC Aluminum Unibody",
      os: "Windows 11 Pro 64-bit",
      ports: "2x Thunderbolt 3, 2x USB 3.1 Type-A, HDMI 1.4, Headphone/Mic",
      warranty: "6 Months Comprehensive Hardware Warranty",
      conditionGrade: "Mint"
    },
    scores: {
      gaming: 48,
      productivity: 86,
      batteryLife: 88,
      aiCompute: 52
    },
    availableBranches: ["anuradhapura", "kurunegala", "bambalapitiya"]
  },
  {
    id: "lap-msi-thin-a15",
    sku: "D001041",
    slug: "msi-thin-a15-b7uc-ryzen-7-rtx-3050-d001041",
    name: "MSI Thin A15 B7UC-653XAE | RYZEN 7 7735HS | 8GB RAM | 512GB SSD | RTX 3050 6GB | 15.6 inch | Brand New",
    brand: "MSI",
    condition: "Brand New",
    category: "Gaming",
    processor: "AMD Ryzen 7 7735HS (8 Cores / 16 Threads, up to 4.75GHz)",
    ram: "8GB DDR5 4800MHz (Dual slot up to 64GB)",
    storage: "512GB NVMe PCIe Gen4 SSD",
    display: "15.6\" FHD (1920x1080), 144Hz IPS-Level Gaming Panel",
    graphics: "NVIDIA GeForce RTX 3050 6GB GDDR6 (Upgraded 6GB VRAM)",
    price: 335000,
    originalPrice: 340000,
    rating: 4.9,
    reviewsCount: 19,
    inStock: true,
    stockCount: 11,
    featured: true,
    isHot: true,
    isSale: true,
    image: "/generated/products/msi-thin.webp",
    gallery: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      cores: "8 Cores, 16 Threads Zen 3+ Architecture",
      battery: "52.4Wh battery with Cooler Boost technology",
      weight: "1.86 kg Featherweight Gaming",
      os: "FreeDOS / Windows 11 Ready",
      ports: "1x Type-C USB3.2 Gen2 with DP, 3x Type-A USB3.2 Gen1, HDMI 2.1 (8K @ 60Hz / 4K @ 120Hz)",
      warranty: "2 Years LapMart Local Warranty",
      conditionGrade: "Brand New Factory Sealed"
    },
    scores: {
      gaming: 88,
      productivity: 89,
      batteryLife: 74,
      aiCompute: 81
    },
    availableBranches: ["kandy-flagship", "bambalapitiya", "borella", "anuradhapura"]
  },
  {
    id: "lap-macbook-pro-16",
    sku: "D001027",
    slug: "apple-macbook-pro-16-retina-core-i7-32gb-d001027",
    name: "MacBook Pro 16\" A2141 | Core i7 6-Core | 32GB RAM | 512GB SSD | 15.6 inch Retina | USED",
    brand: "Apple",
    condition: "Used",
    category: "Workstation",
    processor: "Intel 9th Gen 6-Core i7 2.6GHz (Turbo to 4.5GHz)",
    ram: "32GB 2666MHz DDR4 High Capacity Memory",
    storage: "512GB Ultra-fast PCIe Onboard SSD",
    display: "16-inch Retina Display with True Tone (3072x1920) 500 nits P3",
    graphics: "AMD Radeon Pro 5300M 4GB GDDR6 + Intel UHD 630",
    price: 185000,
    originalPrice: 190000,
    rating: 4.8,
    reviewsCount: 48,
    inStock: true,
    stockCount: 5,
    featured: true,
    isHot: true,
    isSale: true,
    image: "/generated/products/macbook-pro.webp",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      cores: "6 Cores, 12 Threads with 12MB shared L3 cache",
      battery: "100Wh Battery (Tested 92% health, low cycles)",
      weight: "2.0 kg Space Gray Unibody",
      os: "macOS Sonoma / Sequoia Ready",
      ports: "4x Thunderbolt 3 (USB-C), 3.5mm Headphone Jack",
      warranty: "6 Months Comprehensive Hardware Warranty",
      conditionGrade: "Grade A+"
    },
    scores: {
      gaming: 68,
      productivity: 93,
      batteryLife: 82,
      aiCompute: 75
    },
    availableBranches: ["bambalapitiya", "kandy-flagship", "borella"]
  },
  {
    id: "lap-asus-rog-strix-g16",
    sku: "D001088",
    slug: "asus-rog-strix-g16-core-i9-14900hx-rtx-4070-d001088",
    name: "ASUS ROG Strix G16 2030 Edition | Core i9 14900HX | 32GB DDR5 | 1TB Gen4 | RTX 4070 8GB | 240Hz Nebula",
    brand: "Asus",
    condition: "Brand New",
    category: "Gaming",
    processor: "Intel Core i9-14900HX 24-Cores / 32-Threads (up to 5.8GHz)",
    ram: "32GB DDR5 5600MHz Dual-Channel",
    storage: "1TB PCIe 4.0 NVMe M.2 Performance SSD",
    display: "16\" ROG Nebula QHD+ 240Hz 3ms 100% DCI-P3 Pantone Validated",
    graphics: "NVIDIA GeForce RTX 4070 8GB GDDR6 (140W max TGP with ROG Boost)",
    price: 545000,
    originalPrice: 580000,
    rating: 5.0,
    reviewsCount: 27,
    inStock: true,
    stockCount: 4,
    featured: true,
    isHot: true,
    isSale: true,
    image: "/generated/products/asus-rog.webp",
    gallery: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      cores: "24 Cores (8 P-cores + 16 E-cores), 32 Threads",
      battery: "90Wh 4-cell with 100W Type-C Fast Charge",
      weight: "2.50 kg Cyber Armor Design with Aura Sync Lightbar",
      os: "Windows 11 Home Genuine",
      ports: "1x Thunderbolt 4, 1x USB 3.2 Gen 2 Type-C (DP/PD), 2x USB 3.2 Gen 2 Type-A, HDMI 2.1 FRL",
      warranty: "2 Years ASUS Global / LapMart Comprehensive Warranty",
      conditionGrade: "Brand New Factory Sealed"
    },
    scores: {
      gaming: 98,
      productivity: 97,
      batteryLife: 70,
      aiCompute: 96
    },
    availableBranches: ["kandy-flagship", "bambalapitiya"]
  },
  {
    id: "lap-dell-xps-15",
    sku: "D001077",
    slug: "dell-xps-15-9530-3-5k-oled-touch-rtx-4050-d001077",
    name: "Dell XPS 15 9530 InfinityEdge | Core i7 13700H | 32GB RAM | 1TB NVMe | RTX 4050 | 3.5K OLED Touch",
    brand: "Dell",
    condition: "Brand New",
    category: "Ultrabook",
    processor: "Intel Core i7-13700H (14 Cores, up to 5.0 GHz)",
    ram: "32GB DDR5 4800MHz Dual-Channel",
    storage: "1TB M.2 PCIe NVMe Solid State Drive",
    display: "15.6\" 3.5K (3456x2160) OLED InfinityEdge Touch 400-Nit",
    graphics: "NVIDIA GeForce RTX 4050 6GB GDDR6",
    price: 465000,
    originalPrice: 490000,
    rating: 4.9,
    reviewsCount: 18,
    inStock: true,
    stockCount: 3,
    featured: false,
    isHot: true,
    isSale: false,
    image: "/generated/products/dell-xps.webp",
    gallery: [
      "/generated/products/dell-xps.webp"
    ],
    specs: {
      cores: "14 Cores, 20 Threads, 24MB Cache",
      battery: "86Whr Integrated Battery",
      weight: "1.92 kg CNC Machined Aluminum with Carbon Fiber Palmrest",
      os: "Windows 11 Pro 64-bit",
      ports: "2x Thunderbolt 4 with Power Delivery, 1x USB 3.2 Gen 2 Type-C, Full-size SD Card v6.0",
      warranty: "2 Years LapMart Premium Care Warranty",
      conditionGrade: "Brand New Factory Sealed"
    },
    scores: {
      gaming: 83,
      productivity: 95,
      batteryLife: 86,
      aiCompute: 89
    },
    availableBranches: ["bambalapitiya", "kandy-flagship", "borella"]
  },
  {
    id: "lap-hp-spectre-ai",
    sku: "D001064",
    slug: "hp-spectre-x360-neural-ai-oled-touch-d001064",
    name: "HP Spectre x360 2-in-1 2030 Neural | Intel Core Ultra 7 155H AI | 16GB LPDDR5X | 1TB SSD | 2.8K OLED",
    brand: "HP",
    condition: "Brand New",
    category: "Ultrabook",
    processor: "Intel Core Ultra 7 155H with Intel AI Boost NPU (16 Cores)",
    ram: "16GB LPDDR5x 7467 MHz onboard",
    storage: "1TB PCIe Gen4 NVMe M.2 Performance SSD",
    display: "14\" 2.8K (2880 x 1800) OLED 120Hz 0.2ms HDR 500 nits IMAX Enhanced",
    graphics: "Intel Arc Graphics (Next-Gen Integrated Xe)",
    price: 410000,
    originalPrice: 435000,
    rating: 4.8,
    reviewsCount: 14,
    inStock: true,
    stockCount: 7,
    featured: false,
    isHot: true,
    isSale: true,
    image: "/generated/products/razer-blade.webp",
    gallery: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      cores: "16 Cores, 22 Threads, dedicated dual neural compute engines",
      battery: "68Wh Li-ion polymer, up to 13 hours",
      weight: "1.44 kg Gem Cut Recycled Aluminum",
      os: "Windows 11 Pro with Microsoft Copilot AI Key",
      ports: "2x Thunderbolt 4, 1x USB-A 10Gbps, 3.5mm Combo Audio",
      warranty: "2 Years LapMart Official Warranty with HP Rechargeable MPP2.0 Tilt Pen included",
      conditionGrade: "Brand New Factory Sealed"
    },
    scores: {
      gaming: 72,
      productivity: 94,
      batteryLife: 95,
      aiCompute: 98
    },
    availableBranches: ["anuradhapura", "kandy", "bambalapitiya", "kurunegala"]
  }
];

export const ACCESSORY_PRODUCTS: AccessoryProduct[] = [
  {
    id: "acc-lexar-ddr5-16gb",
    sku: "A020125",
    name: "LEXAR DDR5 16GB 5600MHZ LAPTOP RAM",
    category: "Laptop Essentials",
    subCategory: "Laptop RAM",
    price: 18500,
    originalPrice: 21000,
    inStock: true,
    isSale: true,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
    specs: "DDR5 SODIMM 5600MHz CL46 1.1V On-die ECC High Stability"
  },
  {
    id: "acc-lexar-ddr4-16gb",
    sku: "A000125",
    name: "LEXAR DDR4 16GB 3200MHZ LAPTOP RAM",
    category: "Laptop Essentials",
    subCategory: "Laptop RAM",
    price: 12500,
    originalPrice: 14000,
    inStock: true,
    isSale: false,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
    specs: "DDR4 SODIMM 3200MHz PC4-25600 Low Power 1.2V"
  },
  {
    id: "acc-lexar-ddr4-8gb",
    sku: "A010031",
    name: "LEXAR DDR4 8GB 3200MHZ LAPTOP RAM",
    category: "Laptop Essentials",
    subCategory: "Laptop RAM",
    price: 7200,
    originalPrice: 8500,
    inStock: true,
    isSale: true,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
    specs: "DDR4 SODIMM 3200MHz Single 8GB Module"
  },
  {
    id: "acc-crucial-ddr5-16gb",
    sku: "A000118",
    name: "CRUCIAL DDR5 16GB 5600MHZ RAM",
    category: "Laptop Essentials",
    subCategory: "Laptop RAM",
    price: 19800,
    originalPrice: 22000,
    inStock: true,
    isSale: true,
    image: "https://images.unsplash.com/photo-1555617778-02518510b9fa?auto=format&fit=crop&w=600&q=80",
    specs: "Micron Die, DDR5-5600 SODIMM for Next-Gen Intel & AMD"
  },
  {
    id: "acc-webcam-1080",
    sku: "A020112",
    name: "WEB CAMERA 1080P FULL HD PRIVACY",
    category: "Audio & Visual",
    subCategory: "Camera",
    price: 3000,
    originalPrice: 3500,
    inStock: true,
    isSale: true,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    specs: "1080p 30fps with Dual Noise-Canceling Mics & Physical Shutter"
  },
  {
    id: "acc-macbook-charger-90w",
    sku: "A020186",
    name: "MACBOOK CHARGER 90W USB-C PD FAST CHARGE",
    category: "Laptop Essentials",
    subCategory: "Laptop Charger",
    price: 5000,
    originalPrice: 5500,
    inStock: true,
    isSale: true,
    image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=600&q=80",
    specs: "Universal PD 3.0 90W GaN Fast Charger for MacBook Pro & Air"
  },
  {
    id: "acc-samsung-990-pro",
    sku: "A030099",
    name: "SAMSUNG 990 PRO 2TB PCIE 4.0 NVME M.2 SSD",
    category: "Storage Solutions",
    subCategory: "NVMe SSD",
    price: 48000,
    originalPrice: 52000,
    inStock: true,
    isSale: true,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    specs: "Up to 7450 MB/s Read, 6900 MB/s Write with Nickel Coated Heat Spreader"
  },
  {
    id: "acc-razer-deathadder-v3",
    sku: "A040055",
    name: "RAZER DEATHADDER V3 PRO WIRELESS HYPERSPEED",
    category: "Gaming Gears",
    subCategory: "Gaming Mouse",
    price: 24500,
    originalPrice: 28000,
    inStock: true,
    isSale: true,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    specs: "63g Ultra-lightweight, Focus Pro 30K Optical Sensor, 90hr Battery"
  }
];

export const CATEGORY_TAXONOMY = [
  {
    title: "Gaming Gears",
    icon: "Gamepad2",
    items: ["Gaming Casing", "Gaming Headset", "Gaming Keyboard", "Gaming Mouse", "Gaming Mouse Pad"]
  },
  {
    title: "Laptop Essentials",
    icon: "Laptop",
    items: ["Laptop Charger", "Laptop Keyboard", "Laptop RAM", "Laptop Fan", "Laptop Pouch", "Laptop Table", "Laptop Wingle"]
  },
  {
    title: "Power & Connect",
    icon: "Zap",
    items: ["Adaptor", "Cable", "Connector", "Hub", "Plug Port", "Power Supply", "USB Hub", "Converter"]
  },
  {
    title: "Storage Solutions",
    icon: "HardDrive",
    items: ["Pen Drive", "NVMe SSD", "SSD", "SSD M2", "SSD SATA", "HDD", "HDD Kit"]
  },
  {
    title: "Tech Maintenance",
    icon: "Wrench",
    items: ["Cleaner", "Cleaning Kit", "Heatsink", "Tool", "Virus Guard"]
  },
  {
    title: "Audio & Visual",
    icon: "Headphones",
    items: ["Camera", "Display", "Mic", "Presenter", "Smart Watch", "Speaker", "TV Box", "TV Card"]
  },
  {
    title: "Office Productivity",
    icon: "Briefcase",
    items: ["Bag", "Mouse Pad", "Touch Pad", "Touch Pen", "Wall Bracket", "Wireless Keyboard", "Wireless Mouse"]
  },
  {
    title: "Portable Power",
    icon: "BatteryCharging",
    items: ["Power Bank", "Car Charger"]
  },
  {
    title: "Refurbished Tech",
    icon: "Cpu",
    items: ["Used Desktop", "Used Hard", "Used SSD"]
  },
  {
    title: "Computer Components",
    icon: "CircuitBoard",
    items: ["Motherboard", "Desktop RAM", "DVD Writer", "Battery", "NVMe", "UPS", "VGA Connectors"]
  }
];

export const SEARCH_TAGS = [
  "DDR5-RAM", "8GB RAM", "16GB RAM", "14 INCH", "256GB SSD", "512GB SSD", "ADAPTOR",
  "BATTERY", "BRAND NEW", "CABLE", "COMBO PACK", "CONVERTER", "COOLING PAD", "ENCLOSURE",
  "GAMING HEADSET", "GAMING KEYBOARD", "GAMING MOUSE", "HP", "I5 10TH GEN", "I5 8TH GEN",
  "I5 12TH", "I5 13TH", "KEYBOARD", "LAP CHARGER", "LAP KEYBOARD", "LAP RAM", "LENOVO",
  "MACBOOK", "MIC", "MOUSE PAD", "OTG", "PEN DRIVE", "PROBOOK", "ROUTER", "SKIN PACK",
  "SPEAKER", "SSD", "TOUCH", "UHD 620", "USED", "WIFI ADAPTER", "WIRED MOUSE", "WIRELESS MOUSE"
];
