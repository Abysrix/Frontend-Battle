import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProceduralScene } from "@/components/three/hero-scene";
import { IconCog, IconLinkSolid } from "@/components/icons";
import { TRUST_POINTS } from "@/constants/content";

const POINT_ICONS = [IconCog, IconLinkSolid, IconCog];

export function EnterpriseTrust() {
  return (
    <section className="py-24" aria-labelledby="trust-heading">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="trust-heading"
          eyebrow="Enterprise trust"
          title="Built to pass the security review before you ask"
          description="Governance isn't a separate product tier here — every plan inherits the same controls."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <ul className="grid gap-4 sm:grid-cols-3">
            {TRUST_POINTS.map((point, index) => {
              const Icon = POINT_ICONS[index % POINT_ICONS.length];
              return (
                <li
                  key={point.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-mystic-mint text-nocturnal-expedition">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-oceanic-noir">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-nocturnal-expedition/80">
                    {point.body}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="relative hidden overflow-hidden rounded-3xl border border-border bg-oceanic-noir lg:block">
            <ProceduralScene preset="trust" />
            <p className="sr-only">
              Animated visualization: data settling into a calm, stable
              lattice, representing governed and compliant infrastructure.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
