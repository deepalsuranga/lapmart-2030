"use client";

import React, { useRef } from "react";
import { useStore } from "@/context/StoreContext";
import { WHATSAPP_NUMBER, LAPMART_BRANCHES } from "@/data/lapmart-data";
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  ShieldCheck,
  Truck,
  ArrowRight
} from "lucide-react";
import confetti from "canvas-confetti";
import PriceTag from "@/components/PriceTag";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    selectedBranch,
    formatLKR
  } = useStore();

  const currentBranch = LAPMART_BRANCHES.find((b) => b.id === selectedBranch) || LAPMART_BRANCHES[2];

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}*\n   SKU: ${item.product.sku}\n   Qty: ${item.quantity} x ${formatLKR(item.product.price)} = ${formatLKR(item.product.price * item.quantity)}`
      )
      .join("\n\n");

    const message = `*LAPMART 2030 ONLINE ORDER INQUIRY*\n----------------------------------------\n*Preferred Branch:* LapMart ${currentBranch.city} (${currentBranch.displayPhone})\n\n*Ordered Items:*\n${itemsList}\n\n----------------------------------------\n*Estimated Total:* ${formatLKR(cartTotal)}\n*Delivery Method:* Islandwide Fast Courier / Showroom Pickup\n\nPlease confirm availability and dispatch instructions!`;

    try {
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel bg-white/95 border-l border-slate-200 shadow-2xl flex flex-col justify-between p-6">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Your Cart</h3>
                <span className="text-xs font-mono text-slate-500">
                  {cartCount} {cartCount === 1 ? "Item" : "Items"} • Dispatching from {currentBranch.city}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Add gaming laptops, used workstations, or accessories to your cart to reserve stock.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      SKU: {item.product.sku}
                    </span>
                    <span className="text-xs font-black text-amber-600 font-mono">
                      <PriceTag amount={item.product.price} />
                    </span>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden text-xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="p-1 hover:bg-slate-100 text-slate-600"
                        title="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="p-1 hover:bg-slate-100 text-slate-600"
                        title="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold text-slate-900">
                    <PriceTag amount={cartTotal} />
                  </span>
                </div>
                <div className="flex justify-between items-center text-emerald-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Islandwide Courier Dispatch
                  </span>
                  <span className="font-mono font-bold uppercase">FREE</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-500" /> Warranty Included
                  </span>
                  <span>Direct Invoice</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex justify-between items-baseline">
                <span className="text-xs font-bold text-amber-900 uppercase">Estimated Total</span>
                <span className="text-xl font-black text-amber-700 font-mono tracking-tight">
                  <PriceTag amount={cartTotal} decimalClassName="text-[0.6em] font-bold opacity-75 ml-0.5" />
                </span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Order on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
