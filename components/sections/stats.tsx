import { Container } from "@/components/ui/container";
import { IconArrowTrendingUp } from "@/components/icons";
import { SceneBackdrop } from "@/components/scenes/scene-backdrop";
import { SCENE_FRAMES } from "@/constants/scenes";
import { STATS } from "@/constants/content";

export function Stats() {
  return (
    <section className="py-20" aria-labelledby="stats-heading">
      <Container>
        <h2 id="stats-heading" className="sr-only">
          Dataflow by the numbers
        </h2>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-oceanic-noir">
          <SceneBackdrop
            frames={SCENE_FRAMES.performance}
            alt="A guardian-like AI figure standing in an infrastructure corridor, representing platform reliability"
          />
          <dl className="relative grid grid-cols-2 gap-8 p-8 sm:p-10 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.id} className="flex flex-col gap-1">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="flex items-baseline gap-1.5 font-display text-3xl font-semibold tracking-tight text-arctic-powder sm:text-4xl">
                  {stat.value}
                  {stat.trending ? (
                    <IconArrowTrendingUp className="size-4 text-forsythia" />
                  ) : null}
                </dd>
                <p className="text-sm font-medium text-mystic-mint">{stat.label}</p>
                <p className="text-xs text-arctic-powder/60">{stat.detail}</p>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
