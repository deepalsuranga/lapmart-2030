import { LAPTOP_PRODUCTS, ACCESSORY_PRODUCTS, LAPMART_BRANCHES } from "@/data/lapmart-data";
import { BranchInvoice, InvoiceItem, PaymentMethod, BranchSalesStats, DailySalesSummary } from "@/types/sales";

const SRI_LANKAN_CUSTOMERS = [
  { name: "Kasun Perera", phone: "077 123 4567", city: "Colombo" },
  { name: "Sachini Jayawardena", phone: "071 892 1102", city: "Kandy" },
  { name: "Nimal Fernando", phone: "076 443 9821", city: "Negombo" },
  { name: "Dilshan Wickramasinghe", phone: "070 332 5590", city: "Kurunegala" },
  { name: "Tharindu Bandara", phone: "077 884 1209", city: "Anuradhapura" },
  { name: "Praveen Silva", phone: "071 509 3324", city: "Gampaha" },
  { name: "Dinusha Senanayake", phone: "078 612 9011", city: "Polonnaruwa" },
  { name: "Malith Weerasinghe", phone: "075 921 7743", city: "Matale" },
  { name: "Chamari Dissanayake", phone: "076 201 4455", city: "Kandy" },
  { name: "Kaveen Ratnayake", phone: "077 650 8891", city: "Colombo" },
  { name: "Hasitha Alwis", phone: "071 334 1120", city: "Kurunegala" },
  { name: "Suresh Pathirana", phone: "070 882 1904", city: "Anuradhapura" },
  { name: "Anuki De Silva", phone: "076 771 2309", city: "Colombo 07" },
  { name: "Ruwan Jayatillake", phone: "072 409 8812", city: "Galle" },
  { name: "Vimukthi Ranasinghe", phone: "077 554 9918", city: "Peradeniya" }
];

const CASHIERS = [
  { id: "CSH-01", name: "Sunil Kumara" },
  { id: "CSH-02", name: "Amila Madushanka" },
  { id: "CSH-03", name: "Nadeeka Perera" },
  { id: "CSH-04", name: "Pradeep Gamage" },
  { id: "CSH-05", name: "Ramesh Dassanayake" }
];

const PAYMENT_METHODS: PaymentMethod[] = [
  "Visa / Mastercard",
  "Koko 0% Installment",
  "Mintpay 0% Installment",
  "Cash on Counter",
  "Direct Bank Transfer"
];

// Branch target revenues for today (in LKR)
export const BRANCH_TARGETS: Record<string, number> = {
  anuradhapura: 1200000,
  "kandy-flagship": 1800000,
  bambalapitiya: 1600000,
  kurunegala: 950000,
  borella: 850000,
  kandy: 750000,
  polonnaruwa: 600000
};

let invoiceCounter = 1040;

export function generateRandomInvoice(specificBranchId?: string, forcedTime?: Date): BranchInvoice {
  invoiceCounter += Math.floor(Math.random() * 3) + 1;
  const invNumber = `INV-2030-${String(invoiceCounter).padStart(5, "0")}`;

  // Pick branch
  const branch = specificBranchId
    ? LAPMART_BRANCHES.find((b) => b.id === specificBranchId) || LAPMART_BRANCHES[0]
    : LAPMART_BRANCHES[Math.floor(Math.random() * LAPMART_BRANCHES.length)];

  // Pick customer
  const customer = SRI_LANKAN_CUSTOMERS[Math.floor(Math.random() * SRI_LANKAN_CUSTOMERS.length)];

  // Pick cashier
  const cashier = CASHIERS[Math.floor(Math.random() * CASHIERS.length)];

  // Pick payment method
  const paymentMethod = PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)];

  // Pick items: 1 primary laptop, occasionally 1 peripheral
  const items: InvoiceItem[] = [];
  const isMultiItem = Math.random() > 0.45;

  const randomLaptop = LAPTOP_PRODUCTS[Math.floor(Math.random() * LAPTOP_PRODUCTS.length)];
  items.push({
    id: randomLaptop.id,
    name: randomLaptop.name,
    sku: randomLaptop.sku,
    price: randomLaptop.price,
    quantity: 1,
    category: randomLaptop.category
  });

  // Always include free 6-piece VIP Gift Pack as 0-value item
  items.push({
    id: "gift-vip-pack",
    name: "LapMart 6-Piece VIP Complimentary Gift Pack (Backpack, Silent Mouse, Shield, Care Kit)",
    sku: "GIFT-VIP-35K",
    price: 0,
    quantity: 1,
    category: "Peripherals",
    isFreeGift: true
  });

  if (isMultiItem && ACCESSORY_PRODUCTS.length > 0) {
    const randomAccessory = ACCESSORY_PRODUCTS[Math.floor(Math.random() * ACCESSORY_PRODUCTS.length)];
    items.push({
      id: randomAccessory.id,
      name: randomAccessory.name,
      sku: randomAccessory.sku,
      price: randomAccessory.price,
      quantity: 1,
      category: "Peripherals"
    });
  }

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const now = forcedTime || new Date();
  const timeFormatted = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  const warrantyPeriod =
    randomLaptop.condition === "Brand New"
      ? "2 Years Comprehensive Company Warranty"
      : "6 Months Hardware Warranty + 2 Years Free Labor Service";

  const certNum = `LM-DIAG-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    id: `inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    invoiceNumber: invNumber,
    branchId: branch.id,
    branchName: branch.city + (branch.isFlagship ? " (Flagship CyberHub)" : ""),
    branchCity: branch.city,
    customerName: customer.name,
    customerPhone: customer.phone,
    customerCity: customer.city,
    timestamp: now.toISOString(),
    timeFormatted,
    items,
    totalAmount,
    paymentMethod,
    cashierId: cashier.id,
    cashierName: cashier.name,
    warrantyPeriod,
    diagnosticsCertNumber: certNum
  };
}

// Generate realistic baseline seed invoices for today starting from 9:00 AM
export function generateInitialDayInvoices(): BranchInvoice[] {
  const seedInvoices: BranchInvoice[] = [];
  const today = new Date();
  
  // Create 15-20 baseline transactions across earlier hours today
  const hoursDistribution = [
    { hour: 9, count: 2 },
    { hour: 10, count: 3 },
    { hour: 11, count: 4 },
    { hour: 12, count: 2 },
    { hour: 13, count: 2 },
    { hour: 14, count: 3 },
    { hour: 15, count: 4 },
    { hour: 16, count: 3 }
  ];

  hoursDistribution.forEach(({ hour, count }) => {
    for (let i = 0; i < count; i++) {
      const invDate = new Date(today);
      invDate.setHours(hour, Math.floor(Math.random() * 55), Math.floor(Math.random() * 55));
      const inv = generateRandomInvoice(undefined, invDate);
      seedInvoices.push(inv);
    }
  });

  // Sort descending by timestamp (newest first)
  seedInvoices.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return seedInvoices;
}

// Compute comprehensive real-time daily stats and branch leaderboard
export function computeDailySummary(invoices: BranchInvoice[]): DailySalesSummary {
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalInvoices = invoices.length;

  let totalLaptopsSold = 0;
  let totalAccessoriesSold = 0;

  const categoryCounts: Record<string, { count: number; amount: number }> = {
    Gaming: { count: 0, amount: 0 },
    Workstation: { count: 0, amount: 0 },
    Ultrabook: { count: 0, amount: 0 },
    Business: { count: 0, amount: 0 },
    Everyday: { count: 0, amount: 0 },
    Peripherals: { count: 0, amount: 0 }
  };

  invoices.forEach((inv) => {
    inv.items.forEach((item) => {
      if (!item.isFreeGift) {
        if (item.category === "Peripherals") {
          totalAccessoriesSold += item.quantity;
        } else {
          totalLaptopsSold += item.quantity;
        }
        if (categoryCounts[item.category]) {
          categoryCounts[item.category].count += item.quantity;
          categoryCounts[item.category].amount += item.price * item.quantity;
        }
      }
    });
  });

  const averageOrderValue = totalInvoices > 0 ? Math.round(totalRevenue / totalInvoices) : 0;
  const targetRevenue = Object.values(BRANCH_TARGETS).reduce((a, b) => a + b, 0);

  // Group by branch
  const branchMap: Record<string, BranchSalesStats> = {};

  LAPMART_BRANCHES.forEach((b) => {
    branchMap[b.id] = {
      branchId: b.id,
      branchName: b.city + (b.isFlagship ? " (CyberHub)" : ""),
      branchCity: b.city,
      isFlagship: b.isFlagship,
      targetRevenue: BRANCH_TARGETS[b.id] || 1000000,
      currentRevenue: 0,
      invoiceCount: 0,
      laptopsSold: 0,
      accessoriesSold: 0,
      topProduct: "Acer Nitro 16 AI",
      lastInvoiceAt: undefined
    };
  });

  // Track product frequency per branch
  const branchProductFreq: Record<string, Record<string, number>> = {};

  invoices.forEach((inv) => {
    const stats = branchMap[inv.branchId];
    if (stats) {
      stats.currentRevenue += inv.totalAmount;
      stats.invoiceCount += 1;
      if (!stats.lastInvoiceAt || new Date(inv.timestamp) > new Date(stats.lastInvoiceAt)) {
        stats.lastInvoiceAt = inv.timeFormatted;
      }

      if (!branchProductFreq[inv.branchId]) {
        branchProductFreq[inv.branchId] = {};
      }

      inv.items.forEach((item) => {
        if (!item.isFreeGift) {
          if (item.category === "Peripherals") {
            stats.accessoriesSold += item.quantity;
          } else {
            stats.laptopsSold += item.quantity;
          }
          branchProductFreq[inv.branchId][item.name] = (branchProductFreq[inv.branchId][item.name] || 0) + item.quantity;
        }
      });
    }
  });

  // Resolve top product for each branch
  Object.keys(branchMap).forEach((branchId) => {
    const freq = branchProductFreq[branchId] || {};
    let topName = "Acer Nitro 16 AI";
    let maxCount = -1;
    Object.entries(freq).forEach(([pName, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topName = pName;
      }
    });
    branchMap[branchId].topProduct = topName;
  });

  // Rank branches by revenue
  const branchesList = Object.values(branchMap).sort((a, b) => b.currentRevenue - a.currentRevenue);
  branchesList.forEach((b, idx) => {
    b.rank = idx + 1;
  });

  // Hourly distribution (from 9:00 to 19:00)
  const hourlySlots = [
    { hour: "09", label: "09:00 AM" },
    { hour: "10", label: "10:00 AM" },
    { hour: "11", label: "11:00 AM" },
    { hour: "12", label: "12:00 PM" },
    { hour: "13", label: "01:00 PM" },
    { hour: "14", label: "02:00 PM" },
    { hour: "15", label: "03:00 PM" },
    { hour: "16", label: "04:00 PM" },
    { hour: "17", label: "05:00 PM" },
    { hour: "18", label: "06:00 PM" },
    { hour: "19", label: "07:00 PM" }
  ];

  const hourlyDistribution = hourlySlots.map((slot) => {
    let amount = 0;
    let count = 0;
    invoices.forEach((inv) => {
      const invHour = new Date(inv.timestamp).getHours().toString().padStart(2, "0");
      if (invHour === slot.hour) {
        amount += inv.totalAmount;
        count += 1;
      }
    });
    return {
      hour: slot.hour,
      label: slot.label,
      amount,
      count
    };
  });

  const categoryBreakdown = Object.entries(categoryCounts).map(([cat, data]) => ({
    category: cat,
    count: data.count,
    amount: data.amount,
    percentage: totalRevenue > 0 ? Math.round((data.amount / totalRevenue) * 100) : 0
  })).sort((a, b) => b.amount - a.amount);

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return {
    date: todayStr,
    totalRevenue,
    totalInvoices,
    totalLaptopsSold,
    totalAccessoriesSold,
    averageOrderValue,
    targetRevenue,
    branches: branchesList,
    hourlyDistribution,
    categoryBreakdown
  };
}
