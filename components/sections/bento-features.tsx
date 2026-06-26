"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  IconArrowPath,
  IconChartPie,
  IconChevronDown,
  IconCog,
  IconCube,
  IconLinkSolid,
} from "@/components/icons";
import { SceneBackdrop } from "@/components/scenes/scene-backdrop";
import { SCENE_FRAMES } from "@/constants/scenes";
import { FEATURE_PANELS } from "@/constants/content";
import { useActivePanel } from "@/hooks/use-active-panel";
import type { FeaturePanel } from "@/types";

const SPAN_CLASSES: Record<FeaturePanel["size"], string> = {
  lg: "sm:col-span-2 lg:col-span-2",
  md: "sm:col-span-1 lg:col-span-2",
  sm: "sm:col-span-1 lg:col-span-1",
};

const PANEL_ICONS: Record<string, typeof IconCube> = {
  ingest: IconCube,
  clean: IconArrowPath,
  transform: IconLinkSolid,
  orchestrate: IconCog,
  govern: IconChartPie,
};

export function BentoFeatures() {
  // One state, one mounted tree — desktop bento and mobile accordion are
  // CSS reflows of the same markup, so this id survives a resize.
  const { activeId, toggle } = useActivePanel(FEATURE_PANELS[0].id);
  // Hovering any card subtly highlights the shared workflow scene above —
  // a deliberate simplification of "each card references its own clip"
  // (one real Scene 4 backdrop rather than five bespoke clips).
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="features" className="py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Platform"
          title="One platform, five jobs your pipeline used to need scripts for"
          description="Each capability below is a real, composable unit — not a checkbox feature. Open any card for detail; on mobile it behaves as an accordion using the exact same state."
        />

        <div
          aria-hidden="true"
          className={`relative h-40 overflow-hidden rounded-3xl border border-border bg-oceanic-noir transition-[filter] duration-200 ease-out sm:h-48 ${
            hoveredId ? "brightness-110 saturate-125" : ""
          }`}
        >
          <SceneBackdrop
            frames={SCENE_FRAMES.workflow}
            alt="Automated pipelines routing data through connected workflow stations"
          />
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_PANELS.map((panel) => {
            const isActive = panel.id === activeId;
            const Icon = PANEL_ICONS[panel.id] ?? IconCube;
            return (
              <li
                key={panel.id}
                className={SPAN_CLASSES[panel.size]}
                onMouseEnter={() => setHoveredId(panel.id)}
                onMouseLeave={() =>
                  setHoveredId((current) => (current === panel.id ? null : current))
                }
              >
                <div className="h-full rounded-2xl border border-border bg-surface">
                  <button
                    type="button"
                    onClick={() => toggle(panel.id)}
                    aria-expanded={isActive}
                    aria-controls={`panel-detail-${panel.id}`}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left"
                  >
                    <div className="flex gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-mystic-mint text-nocturnal-expedition">
                        <Icon className="size-5" />
                      </span>
                      <div className="flex flex-col gap-2">
                        <h3 className="font-display text-lg font-semibold text-oceanic-noir">
                          {panel.title}
                        </h3>
                        <p className="text-sm text-nocturnal-expedition/80">
                          {panel.summary}
                        </p>
                      </div>
                    </div>
                    <IconChevronDown
                      className={`mt-1 size-5 shrink-0 text-nocturnal-expedition transition-transform duration-200 ease-out ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={`panel-detail-${panel.id}`}
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-[350ms] ease-in-out ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden px-6 pb-6">
                      <p className="border-t border-border pt-4 text-sm leading-relaxed text-nocturnal-expedition/85">
                        {panel.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
