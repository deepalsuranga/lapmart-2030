import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, AUTH_TOKEN_VALUE } from "@/lib/auth";
import {
  generateInitialDayInvoices,
  generateRandomInvoice,
  computeDailySummary
} from "@/data/sales-simulation";
import { BranchInvoice } from "@/types/sales";

// In-memory runtime persistence for today's invoices across server requests
let runtimeInvoices: BranchInvoice[] = [];

function getOrInitInvoices(): BranchInvoice[] {
  if (runtimeInvoices.length === 0) {
    runtimeInvoices = generateInitialDayInvoices();
  }
  return runtimeInvoices;
}

// Authentication verification helper for owner/admin
async function checkAuth(request: NextRequest): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return token === AUTH_TOKEN_VALUE;
}

export async function GET(request: NextRequest) {
  const isAuthorized = await checkAuth(request);
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized. Owner access only." }, { status: 401 });
  }

  const invoices = getOrInitInvoices();
  const summary = computeDailySummary(invoices);

  return NextResponse.json({
    success: true,
    summary,
    invoices: invoices.slice(0, 50), // Send latest 50 for the live feed
    serverTime: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  const isAuthorized = await checkAuth(request);
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized. Owner access only." }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { action = "generate_random", branchId } = body;

    let invoices = getOrInitInvoices();

    if (action === "reset_day") {
      runtimeInvoices = generateInitialDayInvoices();
      const summary = computeDailySummary(runtimeInvoices);
      return NextResponse.json({
        success: true,
        message: "Day re-initialized with fresh baseline",
        summary,
        invoices: runtimeInvoices.slice(0, 50)
      });
    }

    // Generate a fresh random invoice
    const newInvoice = generateRandomInvoice(branchId);
    runtimeInvoices = [newInvoice, ...runtimeInvoices];

    // Cap at 200 in-memory invoices for performance
    if (runtimeInvoices.length > 200) {
      runtimeInvoices = runtimeInvoices.slice(0, 200);
    }

    const summary = computeDailySummary(runtimeInvoices);

    return NextResponse.json({
      success: true,
      newInvoice,
      summary,
      invoices: runtimeInvoices.slice(0, 50)
    });
  } catch (error: any) {
    console.error("Sales API error:", error);
    return NextResponse.json({ error: "Failed to process sales event", details: error.message }, { status: 500 });
  }
}
