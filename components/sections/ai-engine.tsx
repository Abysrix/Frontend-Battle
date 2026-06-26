import { Container } from "@/components/ui/container";
import { SceneBackdrop } from "@/components/scenes/scene-backdrop";
import { SCENE_FRAMES } from "@/constants/scenes";
import { ENGINE_POINTS } from "@/constants/content";

export function AIEngine() {
  return (
    <section className="py-24" aria-labelledby="engine-heading">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-nocturnal-expedition/70">
              The AI engine
            </span>
            <h2
              id="engine-heading"
              className="font-display max-w-lg text-3xl font-semibold tracking-tight text-oceanic-noir sm:text-4xl"
            >
              Every decision becomes automated.
            </h2>
          </div>

          <dl className="flex flex-col gap-6">
            {ENGINE_POINTS.map((point) => (
              <div key={point.id} className="flex flex-col gap-1.5 border-l-2 border-nocturnal-expedition pl-5">
                <dt className="font-display text-base font-semibold text-oceanic-noir">
                  {point.title}
                </dt>
                <dd className="text-sm leading-relaxed text-nocturnal-expedition/80">
                  {point.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-oceanic-noir sm:aspect-[4/3]">
          <SceneBackdrop
            frames={SCENE_FRAMES.aiEngine}
            alt="A humanoid AI figure connected to a network of reasoning modules — the brain of the platform"
          />
          <p className="sr-only">
            Animated visualization: an AI reasoning core connected to a live
            network of decision modules.
          </p>
        </div>
      </Container>
    </section>
  );
}
