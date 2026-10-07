export interface InvoiceItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  category: "Gaming" | "Workstation" | "Ultrabook" | "Business" | "Everyday" | "Peripherals";
  isFreeGift?: boolean;
}

export type PaymentMethod =
  | "Visa / Mastercard"
  | "Koko 0% Installment"
  | "Mintpay 0% Installment"
  | "Cash on Counter"
  | "Direct Bank Transfer";

export interface BranchInvoice {
  id: string;
  invoiceNumber: string;
  branchId: string;
  branchName: string;
  branchCity: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  timestamp: string; // ISO string
  timeFormatted: string; // e.g. "04:45 PM"
  items: InvoiceItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  cashierId: string;
  cashierName: string;
  warrantyPeriod: string;
  diagnosticsCertNumber: string;
}

export interface BranchSalesStats {
  branchId: string;
  branchName: string;
  branchCity: string;
  isFlagship?: boolean;
  targetRevenue: number;
  currentRevenue: number;
  invoiceCount: number;
  laptopsSold: number;
  accessoriesSold: number;
  topProduct: string;
  lastInvoiceAt?: string;
  rank?: number;
}

export interface DailySalesSummary {
  date: string;
  totalRevenue: number;
  totalInvoices: number;
  totalLaptopsSold: number;
  totalAccessoriesSold: number;
  averageOrderValue: number;
  targetRevenue: number;
  branches: BranchSalesStats[];
  hourlyDistribution: { hour: string; label: string; amount: number; count: number }[];
  categoryBreakdown: { category: string; count: number; amount: number; percentage: number }[];
}
