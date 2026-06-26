import type { Currency, CurrencyMeta, PlanDefinition, PlanId } from "@/types";

/**
 * Single source of truth for pricing — a genuine multi-dimensional matrix,
 * not per-currency hardcoded price cells. Every displayed number is
 * computed as baseRate(plan) × regionalTariff(currency) × (1 - discount
 * if annual). Nothing in the UI ever writes a literal price.
 */
export const CURRENCIES: CurrencyMeta[] = [
  { code: "USD", symbol: "$", label: "USD" },
  { code: "EUR", symbol: "€", label: "EUR" },
  { code: "INR", symbol: "₹", label: "INR" },
];

export const ANNUAL_DISCOUNT = 0.2; // flat 20% annual discount multiplier

/** Base tier rate, quoted in USD — the matrix's anchor dimension. */
export const BASE_RATE_USD: Record<PlanId, number> = {
  starter: 29,
  professional: 99,
  enterprise: 299,
};

/** Regional tariff variable applied to the base rate per currency. */
export const REGIONAL_TARIFF: Record<Currency, number> = {
  USD: 1,
  EUR: 0.93,
  INR: 83,
};

/** Rounding precision per currency — INR is conventionally quoted whole. */
const ROUNDING_STEP: Record<Currency, number> = {
  USD: 1,
  EUR: 1,
  INR: 1,
};

export function computeMonthlyPrice(planId: PlanId, currency: Currency): number {
  const raw = BASE_RATE_USD[planId] * REGIONAL_TARIFF[currency];
  const step = ROUNDING_STEP[currency];
  return Math.round(raw / step) * step;
}

export function computeAnnualMonthlyEquivalent(
  planId: PlanId,
  currency: Currency
): number {
  return computeMonthlyPrice(planId, currency) * (1 - ANNUAL_DISCOUNT);
}

export const PLANS: PlanDefinition[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For small teams automating their first pipeline.",
    ctaLabel: "Start free trial",
    features: [
      "Up to 5 active workflows",
      "10 GB managed data / month",
      "Pre-built connector library",
      "Email support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "For growing teams running production-grade automation.",
    isFeatured: true,
    ctaLabel: "Start free trial",
    features: [
      "Unlimited workflows",
      "250 GB managed data / month",
      "Custom transformation steps",
      "Priority support + SLA",
      "Role-based access control",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For organizations with compliance and scale requirements.",
    ctaLabel: "Talk to sales",
    features: [
      "Unlimited everything",
      "Dedicated infrastructure",
      "SSO, audit logs, VPC peering",
      "Dedicated solutions engineer",
      "Custom contractual SLA",
    ],
  },
];
