export type Currency = "USD" | "EUR" | "INR";
export type BillingCycle = "monthly" | "annual";
export type PlanId = "starter" | "professional" | "enterprise";

export interface PlanDefinition {
  id: PlanId;
  name: string;
  tagline: string;
  isFeatured?: boolean;
  ctaLabel: string;
  features: string[];
}

export interface CurrencyMeta {
  code: Currency;
  symbol: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FeaturePanel {
  id: string;
  title: string;
  summary: string;
  detail: string;
  size: "lg" | "md" | "sm";
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  detail: string;
  trending?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface LogoItem {
  id: string;
  name: string;
}
