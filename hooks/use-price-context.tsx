"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BillingCycle, Currency } from "@/types";

interface PriceContextValue {
  currency: Currency;
  billing: BillingCycle;
  setCurrency: (currency: Currency) => void;
  setBilling: (billing: BillingCycle) => void;
}

const PriceContext = createContext<PriceContextValue | null>(null);

/**
 * Scoped to the Pricing section only — nothing outside it subscribes.
 * Only components that call usePriceContext() re-render when currency or
 * billing changes; PricingCard never reads this context, so its memoized
 * subtree (plan name, feature list, layout) is untouched. Only the inner
 * <Price /> leaf re-renders.
 */
export function PriceProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  const value = useMemo(
    () => ({ currency, billing, setCurrency, setBilling }),
    [currency, billing]
  );

  return <PriceContext.Provider value={value}>{children}</PriceContext.Provider>;
}

export function usePriceContext() {
  const ctx = useContext(PriceContext);
  if (!ctx) {
    throw new Error("usePriceContext must be used within a PriceProvider");
  }
  return ctx;
}
