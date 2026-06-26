"use client";

import { useEffect, useRef } from "react";
import { ParticleFieldEngine, type ParticleFieldOptions } from "@/lib/three/particle-field-engine";

interface ParticleSceneProps {
  options?: ParticleFieldOptions;
  /** 0.6–1.6: brighten/speed the scene without affecting layout — used to
   *  link hover state on sibling UI to the ambient scene's intensity. */
  intensity?: number;
}

/**
 * Mounts a single canvas-bound three.js engine instance. Pauses the
 * animation loop (not just visually, the actual rAF loop) whenever the
 * canvas leaves the viewport or the tab is backgrounded, and renders one
 * static frame instead of looping when the user has asked for reduced
 * motion — so this never burns CPU/battery for an ambient decoration.
 */
export function ParticleScene({ options, intensity = 1 }: ParticleSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ParticleFieldEngine | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const engine = new ParticleFieldEngine(canvas, container, prefersReducedMotion, options);
    engineRef.current = engine;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && document.visibilityState === "visible") {
          engine.start();
        } else {
          engine.stop();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleVisibility = () => {
      if (document.visibilityState !== "visible") {
        engine.stop();
      } else if (
        containerRef.current &&
        containerRef.current.getBoundingClientRect().top < window.innerHeight
      ) {
        engine.start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let scrollRafId: number | null = null;
    const handleScroll = () => {
      if (scrollRafId !== null) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
        engine.setScrollProgress(progress);
      });
    };
    if (options?.scrollPushIn) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (options?.scrollPushIn) window.removeEventListener("scroll", handleScroll);
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
      engine.dispose();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options/scrollPushIn are static per scene instance
  }, []);

  useEffect(() => {
    engineRef.current?.setIntensity(intensity);
  }, [intensity]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
