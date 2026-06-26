"use client";

import dynamic from "next/dynamic";
import { SCENE_PRESETS, type ScenePresetName } from "@/lib/three/scene-presets";

/**
 * Code-split + client-only: the three.js bundle never ships in the
 * server-rendered HTML and never delays TTI. The gradient fallback below
 * paints instantly and stays as the backdrop once the canvas mounts.
 *
 * Used only where no real Scene frames were supplied (Enterprise Trust —
 * Scene 7 is missing from the asset pack). Every other section uses
 * SceneBackdrop with real imagery instead.
 */
const ParticleScene = dynamic(
  () => import("@/components/three/particle-scene").then((m) => m.ParticleScene),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-nocturnal-expedition via-oceanic-noir to-oceanic-noir"
      />
    ),
  }
);

interface SceneProps {
  preset: ScenePresetName;
  intensity?: number;
}

export function ProceduralScene({ preset, intensity = 1 }: SceneProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-nocturnal-expedition via-oceanic-noir to-oceanic-noir" />
      <ParticleScene options={SCENE_PRESETS[preset]} intensity={intensity} />
    </div>
  );
}
