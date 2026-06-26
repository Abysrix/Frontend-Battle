"use client";

import { useMemo } from "react";
import { usePriceContext } from "@/hooks/use-price-context";
import { computeAnnualMonthlyEquivalent, computeMonthlyPrice } from "@/constants/pricing";
import { formatCurrency } from "@/lib/format-currency";
import type { PlanId } from "@/types";

/**
 * The ONLY component in the pricing grid that subscribes to PriceContext.
 * React re-renders context consumers and their descendants on change — and
 * nothing else — so toggling currency/billing repaints just this node.
 */
export function Price({
  planId,
  inverted = false,
}: {
  planId: PlanId;
  inverted?: boolean;
}) {
  const { currency, billing } = usePriceContext();

  const { amount, suffix } = useMemo(() => {
    if (billing === "monthly") {
      return { amount: computeMonthlyPrice(planId, currency), suffix: "/month" };
    }
    return {
      amount: computeAnnualMonthlyEquivalent(planId, currency),
      suffix: "/month, billed annually",
    };
  }, [planId, currency, billing]);

  return (
    <p className="flex items-baseline gap-1.5">
      <span
        className={`font-display text-4xl font-semibold tracking-tight ${
          inverted ? "text-arctic-powder" : "text-oceanic-noir"
        }`}
      >
        {formatCurrency(amount, currency)}
      </span>
      <span className={`text-sm ${inverted ? "text-arctic-powder/70" : "text-nocturnal-expedition/70"}`}>
        {suffix}
      </span>
    </p>
  );
}
