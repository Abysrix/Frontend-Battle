import type { Currency } from "@/types";

const LOCALE_BY_CURRENCY: Record<Currency, string> = {
  USD: "en-US",
  EUR: "de-DE",
  INR: "en-IN",
};

export function formatCurrency(amount: number, currency: Currency): string {
  return new Intl.NumberFormat(LOCALE_BY_CURRENCY[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
