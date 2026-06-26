import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { ProblemStatement } from "@/components/sections/problem-statement";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { AIEngine } from "@/components/sections/ai-engine";
import { BentoFeatures } from "@/components/sections/bento-features";
import { DashboardShowcase } from "@/components/sections/dashboard-showcase";
import { Stats } from "@/components/sections/stats";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { EnterpriseTrust } from "@/components/sections/enterprise-trust";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { BackToTop } from "@/components/ui/back-to-top";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navigation />
      <main id="main-content" className="flex flex-1 flex-col">
        <Hero />
        <ProblemStatement />
        <LogoCloud />
        <AIEngine />
        <BentoFeatures />
        <DashboardShowcase />
        <Stats />
        <Pricing />
        <Testimonials />
        <EnterpriseTrust />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
