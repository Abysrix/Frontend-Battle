import type { ParticleFieldOptions } from "@/lib/three/particle-field-engine";

/**
 * Only "trust" remains: every other section now uses real Scene
 * frame imagery via SceneBackdrop. Enterprise Trust kept its procedural
 * backdrop because no Scene 7 frames were supplied for it.
 */
export const SCENE_PRESETS: Record<string, ParticleFieldOptions> = {
  /** Enterprise Trust: calm, settled, stable — no chaos stage at all. */
  trust: {
    particleCount: 500,
    fieldRadius: 2.6,
    stageSequence: ["grid", "pulse"],
    stageDurationMs: 3400,
    transitionMs: 1600,
    colors: ["#d9e8e2", "#ffc801", "#114c5a"],
    rotationSpeed: 0.0005,
  },
};

export type ScenePresetName = keyof typeof SCENE_PRESETS;
