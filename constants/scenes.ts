/**
 * Strict scene-to-section asset mapping (per asset_package "Flow Scene
 * Mapping"). Each array holds 5 frames sampled evenly across the original
 * 300-frame sequence (positions 1/75/150/225/300) — enough to read as
 * ambient motion without shipping 300 images per section. Frame 1 is
 * always the poster: it is the crawlable, reduced-motion-safe fallback.
 *
 * Scene 7 was not supplied, so Pricing/Testimonials/Enterprise Trust keep
 * their existing procedural backdrop rather than borrowing another
 * scene's imagery.
 */
function framesFor(scene: number): string[] {
  return Array.from({ length: 5 }, (_, i) => `/scenes/scene-${scene}/frame-${i + 1}.jpg`);
}

export const SCENE_FRAMES = {
  hero: framesFor(1), // Scene 1 — Raw Data / AI Core / Intelligent Processing
  problem: framesFor(2), // Scene 2 — fragmented enterprise data
  aiEngine: framesFor(3), // Scene 3 — neural computation, the "brain"
  workflow: framesFor(4), // Scene 4 — automation pipelines, connected workflows
  analytics: framesFor(5), // Scene 5 — enterprise analytics / global scale
  performance: framesFor(6), // Scene 6 — reliability, speed, infrastructure
  cta: framesFor(8), // Scene 8 — emotional climax, unified platform
} as const;
