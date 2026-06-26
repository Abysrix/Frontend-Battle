import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconChevronUp, IconCog, IconCube, IconLinkSolid } from "@/components/icons";
import { SceneBackdrop } from "@/components/scenes/scene-backdrop";
import { SCENE_FRAMES } from "@/constants/scenes";

const PANEL_ROWS = [
  { source: "orders.postgres", status: "synced", freshness: "12s ago" },
  { source: "events.kafka", status: "synced", freshness: "3s ago" },
  { source: "support.zendesk", status: "backfilling", freshness: "2m ago" },
  { source: "billing.stripe", status: "synced", freshness: "9s ago" },
];

export function DashboardShowcase() {
  return (
    <section id="showcase" className="py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Showcase"
          title="One control plane for every pipeline you run"
          description="See exactly what's flowing, what's stale, and what's been auto-corrected — without opening a separate observability tool."
        />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-oceanic-noir p-6 text-arctic-powder shadow-xl shadow-oceanic-noir/15 sm:p-8">
            <div className="absolute inset-0 opacity-50">
              <SceneBackdrop
                frames={SCENE_FRAMES.analytics}
                alt="A glass globe etched with circuitry, representing global-scale analytics"
                overlay={false}
              />
            </div>
            <div className="relative flex items-center justify-between">
              <h3 className="font-display text-base font-semibold">Source health</h3>
              <span className="text-xs font-medium text-mystic-mint">Auto-refreshing</span>
            </div>

            <table className="relative mt-6 w-full border-collapse text-left text-sm">
              <caption className="sr-only">Live status of connected data sources</caption>
              <thead>
                <tr className="text-xs uppercase tracking-wide text-arctic-powder/60">
                  <th scope="col" className="pb-3 font-medium">Source</th>
                  <th scope="col" className="pb-3 font-medium">Status</th>
                  <th scope="col" className="pb-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      Freshness
                      <IconChevronUp className="size-3" />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {PANEL_ROWS.map((row) => (
                  <tr key={row.source} className="border-t border-white/10">
                    <td className="py-3 font-display text-sm">{row.source}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                          row.status === "synced"
                            ? "bg-mystic-mint/20 text-mystic-mint"
                            : "bg-forsythia/20 text-forsythia"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            row.status === "synced" ? "bg-mystic-mint" : "bg-forsythia"
                          }`}
                          aria-hidden="true"
                        />
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 text-arctic-powder/75">{row.freshness}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                icon: IconCube,
                title: "Schema drift, caught instantly",
                body: "A new nullable column or renamed field is detected and mapped before a downstream job fails.",
              },
              {
                icon: IconCog,
                title: "Policy enforced at the edge",
                body: "PII fields are masked at ingest based on column-level tags, not after the fact.",
              },
              {
                icon: IconLinkSolid,
                title: "Full lineage, zero setup",
                body: "Every transform is recorded automatically, so audits start from an answer, not a spreadsheet.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-border bg-surface p-5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mystic-mint text-nocturnal-expedition">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-oceanic-noir">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-nocturnal-expedition/80">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
