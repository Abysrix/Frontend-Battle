import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PriceProvider } from "@/hooks/use-price-context";
import { PricingControls } from "@/components/pricing/pricing-controls";
import { PricingCard } from "@/components/pricing/pricing-card";
import { PLANS } from "@/constants/pricing";

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Pricing"
          title="Pricing that scales with your data, not your headcount"
          description="Switch currency or billing cycle below — only the price updates, instantly."
        />

        {/* Scoped provider: currency/billing state never leaves this section,
            so nothing outside Pricing can be affected by it. */}
        <PriceProvider>
          <PricingControls />
          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </PriceProvider>
      </Container>
    </section>
  );
}
