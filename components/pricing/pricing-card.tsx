import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/pricing/price";
import type { PlanDefinition } from "@/types";

interface PricingCardProps {
  plan: PlanDefinition;
}

/**
 * Memoized and intentionally does NOT read PriceContext — only its child
 * <Price /> does. Plan name, tagline, and feature list never re-render when
 * currency or billing changes.
 */
function PricingCardComponent({ plan }: PricingCardProps) {
  return (
    <div
      className={`flex h-full flex-col gap-6 rounded-3xl border p-8 ${
        plan.isFeatured
          ? "border-oceanic-noir bg-oceanic-noir text-arctic-powder shadow-xl"
          : "border-border bg-surface text-oceanic-noir"
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
          {plan.isFeatured ? (
            <span className="rounded-full bg-forsythia px-3 py-1 text-xs font-semibold text-oceanic-noir">
              Most popular
            </span>
          ) : null}
        </div>
        <p
          className={`text-sm leading-relaxed ${
            plan.isFeatured ? "text-arctic-powder/80" : "text-nocturnal-expedition/80"
          }`}
        >
          {plan.tagline}
        </p>
      </div>

      <Price planId={plan.id} inverted={plan.isFeatured} />

      <Button
        href="#"
        variant={plan.isFeatured ? "secondary" : "ghost"}
        className={`w-full ${plan.isFeatured ? "" : "bg-surface"}`}
      >
        {plan.ctaLabel}
      </Button>

      <ul className="flex flex-col gap-3 border-t pt-6 text-sm border-current/10">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className={`mt-2 size-1.5 shrink-0 rounded-full ${
                plan.isFeatured ? "bg-forsythia" : "bg-nocturnal-expedition"
              }`}
            />
            <span className={plan.isFeatured ? "text-arctic-powder/90" : "text-nocturnal-expedition/85"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const PricingCard = memo(PricingCardComponent);
