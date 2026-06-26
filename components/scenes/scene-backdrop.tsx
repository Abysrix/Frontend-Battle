import Image from "next/image";

interface SceneBackdropProps {
  frames: readonly string[];
  alt: string;
  priority?: boolean;
  /** Tint the imagery toward the dark brand surface it usually sits on. */
  overlay?: boolean;
  className?: string;
}

/**
 * Real Flow-clip imagery, not procedural filler. Frame 1 renders as a
 * plain, eagerly-paintable, crawlable <Image> — the SSR'd fallback for
 * reduced-motion users and the LCP candidate where priority is set.
 * Remaining frames sit on top as aria-hidden, CSS-keyframe crossfade
 * layers (no JS animation library), staggered so the scene drifts slowly
 * between frames rather than hard-cutting.
 */
export function SceneBackdrop({
  frames,
  alt,
  priority = false,
  overlay = true,
  className = "",
}: SceneBackdropProps) {
  const [poster, ...accents] = frames;

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Image
        src={poster}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      {accents.map((src, index) => (
        <div
          key={src}
          aria-hidden="true"
          className="scene-crossfade-layer absolute inset-0"
          style={{ animationDelay: `${index * 1.8}s` }}
        >
          <Image
            src={src}
            alt=""
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ))}
      {overlay ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-oceanic-noir/70 via-oceanic-noir/10 to-transparent"
        />
      ) : null}
    </div>
  );
}
