import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { IconArrowPath, IconChevronDown, IconChevronRight, IconLink } from "@/components/icons";
import { SceneBackdrop } from "@/components/scenes/scene-backdrop";
import { SCENE_FRAMES } from "@/constants/scenes";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-20 h-[640px] bg-gradient-to-b from-mystic-mint via-arctic-powder to-arctic-powder"
      />

      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="motion-safe-fade-up flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold text-nocturnal-expedition">
            <IconArrowPath className="size-4 text-deep-saffron" />
            Now with self-healing pipelines
          </span>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-oceanic-noir sm:text-5xl lg:text-6xl">
            Every workflow starts with data.
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-nocturnal-expedition/85">
            Dataflow ingests, cleans, and routes your data with AI agents that
            catch drift before it breaks a dashboard — so every insight
            becomes action instead of a support ticket.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#pricing" variant="secondary" className="px-7 py-3.5 text-base">
              Start free trial
              <IconChevronRight className="size-4" />
            </Button>
            <Button href="#showcase" variant="ghost" className="px-7 py-3.5 text-base">
              See it in action
            </Button>
          </div>

          <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3 text-sm text-nocturnal-expedition/75">
            <div className="flex items-center gap-2">
              <IconLink className="size-4 text-nocturnal-expedition" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <IconLink className="size-4 text-nocturnal-expedition" />
              <span>14-day full access</span>
            </div>
          </dl>
        </div>

        <div className="relative motion-safe-fade-up [animation-delay:100ms]">
          {/* Scene 1 — the largest visual emphasis. Frame 1 is a real,
              SSR'd, crawlable <Image> (LCP candidate); remaining frames
              drift in via CSS-only crossfade. */}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-oceanic-noir shadow-2xl shadow-oceanic-noir/20 sm:aspect-[4/5]">
            <SceneBackdrop
              frames={SCENE_FRAMES.hero}
              alt="An AI processing core resolving raw data into structured, connected pipelines"
              priority
            />
            <p className="sr-only">
              Animated visualization: raw data particles flowing through an
              AI core and resolving into a structured pipeline grid.
            </p>
          </div>

          <div
            className="absolute -left-6 -top-6 hidden rounded-2xl border border-border bg-surface px-4 py-3 shadow-lg sm:block"
            aria-hidden="true"
          >
            <p className="font-display text-2xl font-semibold text-oceanic-noir">99.99%</p>
            <p className="text-xs text-nocturnal-expedition/70">Uptime this month</p>
          </div>

          <div
            className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-border bg-surface px-4 py-3 shadow-lg sm:block"
            aria-hidden="true"
          >
            <p className="font-display text-2xl font-semibold text-oceanic-noir">4.2T</p>
            <p className="text-xs text-nocturnal-expedition/70">Rows processed / mo</p>
          </div>
        </div>
      </Container>

      <a
        href="#features"
        aria-label="Scroll to platform features"
        className="absolute inset-x-0 bottom-4 mx-auto hidden w-fit animate-bounce text-nocturnal-expedition/50 motion-reduce:animate-none sm:flex"
      >
        <IconChevronDown className="size-5" />
      </a>
    </section>
  );
}
