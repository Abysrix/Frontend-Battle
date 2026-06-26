import { Container } from "@/components/ui/container";
import { SceneBackdrop } from "@/components/scenes/scene-backdrop";
import { SCENE_FRAMES } from "@/constants/scenes";
import { PROBLEM_POINTS } from "@/constants/content";

export function ProblemStatement() {
  return (
    <section className="py-24" aria-labelledby="problem-heading">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-oceanic-noir sm:aspect-[4/3]">
          <SceneBackdrop
            frames={SCENE_FRAMES.problem}
            alt="Disconnected, fragmented data nodes drifting in isolation"
          />
          <p className="sr-only">
            Animated visualization: fragmented data nodes drifting
            disconnected from one another, representing unmanaged pipelines.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-nocturnal-expedition/70">
              The problem
            </span>
            <h2
              id="problem-heading"
              className="font-display max-w-lg text-3xl font-semibold tracking-tight text-oceanic-noir sm:text-4xl"
            >
              Most data teams aren&rsquo;t short on data. They&rsquo;re short on
              order.
            </h2>
          </div>

          <dl className="flex flex-col gap-6">
            {PROBLEM_POINTS.map((point) => (
              <div key={point.id} className="flex flex-col gap-1.5 border-l-2 border-forsythia pl-5">
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
      </Container>
    </section>
  );
}
