export interface TechReview {
  id: string;
  name: string;
  handle?: string;
  avatar: string;
  role: string;
  category: "all" | "creators" | "engineers" | "gamers" | "artists";
  branch: string;
  verifiedTag: string;
  date: string;
  rating: number;
  productName: string;
  productSku: string;
  productSlug: string;
  productImage: string;
  productPrice: number;
  benchmarkBadge: string;
  shortReview: string;
  fullReview: string;
  metrics: {
    label: string;
    value: string;
  }[];
  helpfulCount: number;
  hasVideoTeaser?: boolean;
}

export const SRI_LANKA_TECH_REVIEWS: TechReview[] = [
  {
    id: "rev-chamindu-nitro",
    name: "Chamindu Senanayake",
    handle: "@SLTechBreakdown_LK",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    role: "Tech YouTuber & Hardware Analyst • 85K Subscribers",
    category: "creators",
    branch: "Kandy CyberHub Flagship",
    verifiedTag: "Verified Tech Creator",
    date: "3 days ago",
    rating: 5,
    productName: "Acer Nitro 16 AI Edition | Ryzen 7 7840HS | RTX 4060 8GB (140W)",
    productSku: "D001099",
    productSlug: "acer-nitro-16-ai-edition-ryzen-7-rtx-4060-d001099",
    productImage: "/generated/products/nitro.webp",
    productPrice: 385000,
    benchmarkBadge: "🔥 Cinebench R23: 17,890 pts • 74°C Max Ambient (31°C Room)",
    shortReview: "Tested this Nitro 16 AI edition under full 140W TGP for 4 hours of continuous Cyberpunk 2077 rendering. LapMart's 45-point lab test report was 100% accurate. Thermals never exceeded 76°C in Sri Lankan tropical weather without AC. The complimentary 6-piece VIP pack alone saves over Rs. 35,000.",
    fullReview: "As an independent hardware reviewer in Sri Lanka, I often see retail units throttling due to dried-out thermal paste or grey market imports with locked BIOS. LapMart's units are pre-calibrated in their Diagnostics Lab. Cinebench R23 multi-core scored 17,890 on the Ryzen 7 7840HS. Zero dead pixels on the 165Hz QHD panel. Handled pickup at Peradeniya Road Kandy Flagship within 20 minutes.",
    metrics: [
      { label: "GPU TGP Sustained", value: "140W Peak" },
      { label: "Display Delta E", value: "< 1.2 sRGB" },
      { label: "Max Thermals", value: "74°C" }
    ],
    helpfulCount: 342,
    hasVideoTeaser: true
  },
  {
    id: "rev-tharindu-xps",
    name: "Tharindu Wickramasinghe",
    handle: "@colombo_dev_lead",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    role: "Lead Full-Stack Architect • Tech Startup Colombo 07",
    category: "engineers",
    branch: "Unity Plaza Bambalapitiya",
    verifiedTag: "Verified Enterprise Buyer",
    date: "1 week ago",
    rating: 5,
    productName: "Dell XPS 15 9530 InfinityEdge | Core i7 13700H | 3.5K OLED Touch",
    productSku: "D001077",
    productSlug: "dell-xps-15-9530-3-5k-oled-touch-rtx-4050-d001077",
    productImage: "/generated/products/dell-xps.webp",
    productPrice: 465000,
    benchmarkBadge: "⚡ Docker + 4 VS Code Workspaces • 64GB RAM Upgrade Zero Lag",
    shortReview: "Purchased with the 64GB RAM upgrade for heavy microservice dev and Docker containers. Display color calibration out of the box was 100% DCI-P3 accurate. Delivered to Colombo 04 within 2 hours of WhatsApp confirmation. Unmatched reliability.",
    fullReview: "As someone running dozens of local containers, Android emulators, and Next.js builds daily, the XPS 15 13700H paired with LapMart's memory upgrade is an absolute dream workstation. Unity Plaza team let me run CrystalDiskInfo and MemTest on their test bench before billing. That level of transparency is rare in Sri Lanka.",
    metrics: [
      { label: "Compile Speed", value: "3.2x Faster" },
      { label: "Battery in VS Code", value: "8.5 Hours" },
      { label: "RAM Capacity", value: "64GB DDR5" }
    ],
    helpfulCount: 289,
    hasVideoTeaser: false
  },
  {
    id: "rev-kavishka-rog",
    name: "Kavishka 'Viper' Fernando",
    handle: "@gamerlk_viper",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    role: "Competitive Esports Player • Sri Lanka National Clan",
    category: "gamers",
    branch: "Kurunegala Tech Store",
    verifiedTag: "Esports Pro Verified",
    date: "5 days ago",
    rating: 5,
    productName: "ASUS ROG Strix G16 2030 Edition | i9 14900HX | RTX 4070 8GB | 240Hz",
    productSku: "D001088",
    productSlug: "asus-rog-strix-g16-core-i9-14900hx-rtx-4070-d001088",
    productImage: "/generated/products/asus-rog.webp",
    productPrice: 545000,
    benchmarkBadge: "🎮 240Hz Nebula Display • 380+ FPS Valorant Locked",
    shortReview: "The 240Hz ROG Nebula display combined with the i9 14900HX delivers rock-solid frame times. Zero micro-stuttering in ranked matches. LapMart Kurunegala branch staff know high-end hardware inside out.",
    fullReview: "Competitive esports requires zero display latency and 100% reliable 140W TGP. Tested on FurMark and 3DMark Time Spy at the store. The liquid metal application is pristine. Also bundled the Razer DeathAdder V3 Pro with their 5% bundle discount. Highly recommend for any serious gamer in SL.",
    metrics: [
      { label: "Valorant Locked", value: "380+ FPS" },
      { label: "Display Latency", value: "3ms G-Sync" },
      { label: "Cooler Boost", value: "Tri-Fan Active" }
    ],
    helpfulCount: 412,
    hasVideoTeaser: true
  },
  {
    id: "rev-shenal-macbook",
    name: "Shenal De Silva",
    handle: "@lanka_3d_render",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    role: "3D Motion Designer & Video Editor • Colombo",
    category: "creators",
    branch: "Borella Cyber Center",
    verifiedTag: "Certified Refurbished Audit",
    date: "2 weeks ago",
    rating: 5,
    productName: "MacBook Pro 16\" A2141 | Core i7 6-Core | 32GB RAM | Retina Display",
    productSku: "D001027",
    productSlug: "apple-macbook-pro-16-retina-core-i7-32gb-d001027",
    productImage: "/generated/products/macbook-pro.webp",
    productPrice: 185000,
    benchmarkBadge: "🎬 4K ProRes 422 HQ Export • 92% Battery Health Verified",
    shortReview: "Was skeptical about buying a used MacBook, but LapMart's Grade A+ condition is genuinely spotless. Battery health verified at 92%, zero chassis scuffs, and 6 months full hardware warranty sealed the deal.",
    fullReview: "Finding high-grade used Apple machines in Sri Lanka with honest battery cycle counts is almost impossible. LapMart provided the complete diagnostics battery report and thermal chart. Edited three 4K wedding reels on DaVinci Resolve with zero fan noise. The free Armor backpack fits the 16-inch chassis like a glove.",
    metrics: [
      { label: "Cycle Count", value: "118 Cycles" },
      { label: "Battery Health", value: "92% Verified" },
      { label: "Cosmetic Grade", value: "Grade A+ Mint" }
    ],
    helpfulCount: 198,
    hasVideoTeaser: false
  },
  {
    id: "rev-dulaj-thinkpad",
    name: "Dulaj Sandaruwan",
    handle: "@mora_coders",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    role: "Computer Science Undergraduate • University of Moratuwa",
    category: "engineers",
    branch: "Anuradhapura Tech Counter",
    verifiedTag: "Uni Tech Community",
    date: "1 week ago",
    rating: 5,
    productName: "Lenovo ThinkPad T490 | i5 8th Gen | 8GB RAM | 256GB SSD | Multi-Touch",
    productSku: "D001052",
    productSlug: "lenovo-thinkpad-t490-touch-i5-8th-gen-d001052",
    productImage: "/generated/products/thinkpad.webp",
    productPrice: 97000,
    benchmarkBadge: "💻 Linux Ubuntu 24.04 Dual Boot • 8+ Hours Battery Life",
    shortReview: "Best laptop under 100K for coding students in Sri Lanka! The legendary ThinkPad keyboard is unmatched, battery health tested at 88%, and LapMart's 2-year free labor service card gives complete peace of mind.",
    fullReview: "Ordered online with free islandwide courier delivery to Anuradhapura. Arrived in 24 hours in triple-layered bubble wrap with original charger and free gifts (mouse, keyboard silicone shield, and cleaning kit). Linux dual boot setup was seamless with 100% driver compatibility.",
    metrics: [
      { label: "Battery Life", value: "8+ Hours" },
      { label: "Chassis Weight", value: "1.55 kg" },
      { label: "Price / Value", value: "Under 100K" }
    ],
    helpfulCount: 315,
    hasVideoTeaser: false
  },
  {
    id: "rev-sithumini-spectre",
    name: "Sithumini Alwis",
    handle: "@sithu_designs",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    role: "UI/UX Designer & Digital Illustrator • Colombo & Kandy",
    category: "artists",
    branch: "Polonnaruwa Branch",
    verifiedTag: "Verified Creative Lead",
    date: "4 days ago",
    rating: 5,
    productName: "HP Spectre x360 2-in-1 Neural AI | Intel Core Ultra 7 | 2.8K OLED",
    productSku: "D001064",
    productSlug: "hp-spectre-x360-neural-ai-oled-touch-d001064",
    productImage: "/generated/products/razer-blade.webp",
    productPrice: 410000,
    benchmarkBadge: "🎨 2.8K OLED IMAX 120Hz • 100% DCI-P3 Color Fidelity",
    shortReview: "The 2.8K OLED screen with pen tilt support is breathtaking for Figma and Photoshop. The Intel AI NPU handles generative fill instantly. Thank you LapMart for genuine islandwide warranty.",
    fullReview: "Color accuracy is everything for my UI/UX client work. Tested with X-Rite ColorChecker at the store — Delta E < 1.0 out of the box. 2-in-1 convertible hinge is solid aluminum. The complimentary executive backpack is super comfortable for daily commutes.",
    metrics: [
      { label: "Color Gamut", value: "100% DCI-P3" },
      { label: "Display Spec", value: "2.8K OLED 120Hz" },
      { label: "Form Factor", value: "360° Foldable" }
    ],
    helpfulCount: 224,
    hasVideoTeaser: true
  }
];

export const TECH_COMMUNITY_STATS = {
  averageRating: 4.9,
  totalReviews: 2840,
  zeroDeadPixelPassRate: "100%",
  islandwideBranches: 7,
  recommendationRate: "98.8%"
};
