import * as THREE from "three";

/**
 * Vanilla three.js (no React Three Fiber, no GSAP) particle engine.
 * Cycles a single point cloud through a configurable sequence of
 * formations on a loop. Each section instantiates this with a different
 * `stageSequence` / palette / scale so the scenes read as distinct chapters
 * rather than one canvas copy-pasted five times.
 */

export type Stage = "chaos" | "core" | "grid" | "pulse";

export interface ParticleFieldOptions {
  particleCount?: number;
  fieldRadius?: number;
  stageSequence?: Stage[];
  stageDurationMs?: number;
  transitionMs?: number;
  colors?: string[];
  /** Camera dollies in as the container scrolls past the top of the viewport. */
  scrollPushIn?: boolean;
  rotationSpeed?: number;
}

const DEFAULTS: Required<Omit<ParticleFieldOptions, "scrollPushIn">> = {
  particleCount: 900,
  fieldRadius: 3.2,
  stageSequence: ["chaos", "core", "grid", "pulse"],
  stageDurationMs: 3200,
  transitionMs: 1400,
  colors: ["#ffc801", "#ff9932", "#d9e8e2"],
  rotationSpeed: 0.0009,
};

function randomInSphere(radius: number, out: THREE.Vector3) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = radius * Math.cbrt(Math.random());
  out.set(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi)
  );
  return out;
}

function buildFormation(stage: Stage, particleCount: number, fieldRadius: number): Float32Array {
  const positions = new Float32Array(particleCount * 3);
  const v = new THREE.Vector3();

  for (let i = 0; i < particleCount; i++) {
    if (stage === "chaos") {
      randomInSphere(fieldRadius, v);
    } else if (stage === "core") {
      // Dense sphere converging toward the center — the "neural core".
      const radius = fieldRadius * 0.35 * Math.cbrt(Math.random());
      randomInSphere(radius, v);
    } else if (stage === "grid") {
      // Structured lattice — the "workflow" resolving into order.
      const side = Math.ceil(Math.cbrt(particleCount));
      const spacing = (fieldRadius * 1.6) / side;
      const ix = i % side;
      const iy = Math.floor(i / side) % side;
      const iz = Math.floor(i / (side * side)) % side;
      v.set(
        (ix - side / 2) * spacing,
        (iy - side / 2) * spacing,
        (iz - side / 2) * spacing
      );
    } else {
      // Pulse — a thin expanding shell, "automation radiating outward".
      randomInSphere(fieldRadius, v);
      v.normalize().multiplyScalar(fieldRadius * (0.7 + Math.random() * 0.3));
    }
    positions[i * 3] = v.x;
    positions[i * 3 + 1] = v.y;
    positions[i * 3 + 2] = v.z;
  }

  return positions;
}

export class ParticleFieldEngine {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private formations: Record<Stage, Float32Array>;
  private fromPositions: Float32Array;
  private current: Float32Array;
  private stageIndex = 0;
  private stageStartedAt = 0;
  private rafId: number | null = null;
  private disposed = false;
  private staticMode: boolean;
  private resizeObserver: ResizeObserver;

  private readonly opts: Required<Omit<ParticleFieldOptions, "scrollPushIn">>;
  private readonly scrollPushIn: boolean;
  private readonly baseCameraZ = 6.5;
  private scrollProgress = 0;
  private intensity = 1;

  constructor(
    canvas: HTMLCanvasElement,
    container: HTMLElement,
    staticMode: boolean,
    options: ParticleFieldOptions = {}
  ) {
    this.staticMode = staticMode;
    this.opts = { ...DEFAULTS, ...options };
    this.scrollPushIn = options.scrollPushIn ?? false;

    const { particleCount, fieldRadius, stageSequence } = this.opts;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
      // Without this, a single static-mode render (reduced-motion users, or
      // any pause in the rAF loop) can have its frame discarded by the
      // browser with nothing left to redraw it — a blank canvas.
      preserveDrawingBuffer: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20);
    this.camera.position.set(0, 0, this.baseCameraZ);

    const stagesNeeded = new Set(stageSequence);
    this.formations = {} as Record<Stage, Float32Array>;
    for (const stage of stagesNeeded) {
      this.formations[stage] = buildFormation(stage, particleCount, fieldRadius);
    }

    const initial = this.formations[stageSequence[0]];
    this.fromPositions = initial.slice();
    this.current = new Float32Array(particleCount * 3);
    this.current.set(initial);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.current, 3));

    const colorObjects = this.opts.colors.map((hex) => new THREE.Color(hex));
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const color = colorObjects[i % colorObjects.length];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    this.material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      depthWrite: false,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);

    this.resizeObserver = new ResizeObserver(() => this.handleResize(container));
    this.resizeObserver.observe(container);
    this.handleResize(container);

    if (staticMode) {
      // Land directly on the most resolved formation — calm, legible, no motion.
      const restState = this.formations.grid ?? this.formations.pulse ?? initial;
      this.current.set(restState);
      this.geometry.attributes.position.needsUpdate = true;
      this.render();
    }
  }

  private handleResize(container: HTMLElement) {
    const { clientWidth, clientHeight } = container;
    if (clientWidth === 0 || clientHeight === 0) return;
    this.renderer.setSize(clientWidth, clientHeight, false);
    this.camera.aspect = clientWidth / clientHeight;
    this.camera.updateProjectionMatrix();
    if (this.staticMode) this.render();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    if (this.staticMode || this.rafId !== null || this.disposed) return;
    this.stageStartedAt = performance.now();
    const tick = (now: number) => {
      if (this.disposed) return;
      this.advance(now);
      this.render();
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /** 0 = at rest, 1 = fully scrolled past — dollies the camera inward. */
  setScrollProgress(progress: number) {
    if (!this.scrollPushIn) return;
    this.scrollProgress = Math.min(1, Math.max(0, progress));
    this.camera.position.z = this.baseCameraZ - this.scrollProgress * 1.6;
    if (this.staticMode || this.rafId === null) this.render();
  }

  /** Hover-linked highlight: brighten + speed up without changing layout. */
  setIntensity(intensity: number) {
    this.intensity = Math.min(1.6, Math.max(0.6, intensity));
    this.material.opacity = 0.7 + this.intensity * 0.2;
    this.material.size = 0.045 * (0.85 + this.intensity * 0.15);
    if (this.staticMode) this.render();
  }

  private advance(now: number) {
    const { stageSequence, stageDurationMs, transitionMs, rotationSpeed } = this.opts;
    const elapsed = now - this.stageStartedAt;
    const target = this.formations[stageSequence[this.stageIndex]];

    if (elapsed < transitionMs) {
      const t = easeInOutCubic(elapsed / transitionMs);
      lerpPositions(this.current, this.fromPositions, target, t);
    } else {
      this.current.set(target);
    }
    this.geometry.attributes.position.needsUpdate = true;

    this.points.rotation.y += rotationSpeed * this.intensity;
    this.points.rotation.x = Math.sin(now * 0.00015) * 0.08;

    if (elapsed >= stageDurationMs) {
      this.fromPositions = target.slice();
      this.stageIndex = (this.stageIndex + 1) % stageSequence.length;
      this.stageStartedAt = now;
    }
  }

  dispose() {
    this.disposed = true;
    this.stop();
    this.resizeObserver.disconnect();
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerpPositions(
  out: Float32Array,
  from: Float32Array,
  to: Float32Array,
  t: number
) {
  for (let i = 0; i < out.length; i++) {
    out[i] = from[i] + (to[i] - from[i]) * t;
  }
}
