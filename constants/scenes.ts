/**
 * Strict scene-to-section asset mapping (per asset_package "Flow Scene
 * Mapping"). Scenes 1–7 are each a single curated high-resolution render
 * (replaced the original 300-frame ezgif exports — mixing the two styles
 * read as inconsistent). Scene 8 still uses its original 5-frame sequence
 * sampled at positions 1/75/150/225/300, since no replacement was supplied
 * for it. Frame 1 is always the poster: the crawlable, reduced-motion-safe
 * fallback that SceneBackdrop renders first.
 */
function framesFor(scene: number, count = 1): string[] {
  return Array.from({ length: count }, (_, i) => `/scenes/scene-${scene}/frame-${i + 1}.jpg`);
}

export const SCENE_FRAMES = {
  hero: framesFor(1), // Scene 1 — AI core resolving a stream of raw data
  problem: framesFor(2), // Scene 2 — shattered, fragmented data nodes
  aiEngine: framesFor(3), // Scene 3 — neural computation, the "brain"
  workflow: framesFor(4), // Scene 4 — automation pipelines, connected workflows
  analytics: framesFor(5), // Scene 5 — enterprise analytics / global scale
  performance: framesFor(6), // Scene 6 — reliability, speed, infrastructure
  trust: framesFor(7), // Scene 7 — unified reasoning + analytics + secure infra
  cta: framesFor(8, 5), // Scene 8 — emotional climax, unified platform
} as const;
