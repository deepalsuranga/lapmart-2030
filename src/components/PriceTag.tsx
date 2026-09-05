"use client";

import React from "react";

interface PriceTagProps {
  amount: number;
  className?: string;
  currencyClassName?: string;
  decimalClassName?: string;
  currency?: string;
}

export default function PriceTag({
  amount,
  className = "text-base font-black text-amber-600 font-mono tracking-tight",
  currencyClassName = "text-[0.8em] font-bold mr-1 opacity-90",
  decimalClassName = "text-[0.65em] font-semibold opacity-70 ml-0.5",
  currency = "Rs."
}: PriceTagProps) {
  const formatted = amount.toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const [integerPart, decimalPart] = formatted.split(".");

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      {currency && <span className={currencyClassName}>{currency}</span>}
      <span>{integerPart}</span>
      <span className={decimalClassName}>.{decimalPart || "00"}</span>
    </span>
  );
}

// Utility function to split price for inline text strings where needed
export function formatLKRParts(amount: number) {
  const formatted = amount.toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const [integerPart, decimalPart] = formatted.split(".");
  return {
    currency: "Rs.",
    integer: integerPart,
    decimal: `.${decimalPart || "00"}`
  };
}
