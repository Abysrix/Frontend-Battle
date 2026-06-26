"use client";

import { usePriceContext } from "@/hooks/use-price-context";
import { CURRENCIES, ANNUAL_DISCOUNT } from "@/constants/pricing";

export function PricingControls() {
  const { currency, billing, setCurrency, setBilling } = usePriceContext();

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
      <div
        role="radiogroup"
        aria-label="Billing cycle"
        className="flex items-center gap-1 rounded-full border border-border bg-surface p-1"
      >
        {(["monthly", "annual"] as const).map((cycle) => (
          <button
            key={cycle}
            type="button"
            role="radio"
            aria-checked={billing === cycle}
            onClick={() => setBilling(cycle)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors duration-200 ease-out ${
              billing === cycle
                ? "bg-oceanic-noir text-arctic-powder"
                : "text-nocturnal-expedition hover:bg-mystic-mint"
            }`}
          >
            {cycle === "annual" ? `Annual (save ${ANNUAL_DISCOUNT * 100}%)` : "Monthly"}
          </button>
        ))}
      </div>

      <div
        role="radiogroup"
        aria-label="Currency"
        className="flex items-center gap-1 rounded-full border border-border bg-surface p-1"
      >
        {CURRENCIES.map((item) => (
          <button
            key={item.code}
            type="button"
            role="radio"
            aria-checked={currency === item.code}
            onClick={() => setCurrency(item.code)}
            className={`min-w-12 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ease-out ${
              currency === item.code
                ? "bg-oceanic-noir text-arctic-powder"
                : "text-nocturnal-expedition hover:bg-mystic-mint"
            }`}
          >
            {item.symbol}
          </button>
        ))}
      </div>
    </div>
  );
}
