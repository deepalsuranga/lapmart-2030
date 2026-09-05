export interface LaptopProduct {
  id: string;
  sku: string;
  name: string;
  brand: "Acer" | "HP" | "Dell" | "Asus" | "MSI" | "Lenovo" | "Apple" | "Huawei";
  condition: "Brand New" | "Used";
  category: "Gaming" | "Workstation" | "Ultrabook" | "Business" | "Everyday";
  processor: string;
  ram: string;
  storage: string;
  display: string;
  graphics: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  isHot?: boolean;
  isSale?: boolean;
  image: string;
  gallery: string[];
  specs: {
    cores?: string;
    battery?: string;
    weight?: string;
    os?: string;
    ports?: string;
    warranty?: string;
    conditionGrade?: "Mint" | "Grade A+" | "Grade A" | "Brand New Factory Sealed";
  };
  scores: {
    gaming: number; // 0 - 100
    productivity: number; // 0 - 100
    batteryLife: number; // 0 - 100
    aiCompute: number; // 0 - 100
  };
  availableBranches: string[];
}

export interface AccessoryProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  image: string;
  isSale?: boolean;
  specs: string;
}

export interface Branch {
  id: string;
  city: string;
  isFlagship?: boolean;
  hotline: string;
  displayPhone: string;
  address: string;
  hours: string;
  status: "Open Now" | "Closing Soon" | "Closed";
  coordinates?: { lat: number; lng: number };
}

export interface CartItem {
  product: LaptopProduct | AccessoryProduct;
  quantity: number;
  selectedBranch?: string;
}

export interface FilterState {
  brand: string;
  condition: string;
  processor: string;
  category: string;
  priceRange: [number, number];
  searchQuery: string;
  sortBy: "featured" | "price-asc" | "price-desc" | "score";
  workflowPersona: "ALL" | "GAMING" | "3D_RENDER" | "CODING_UNI" | "BUSINESS";
}
