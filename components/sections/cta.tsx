import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { IconChevronRight } from "@/components/icons";
import { SceneBackdrop } from "@/components/scenes/scene-backdrop";
import { SCENE_FRAMES } from "@/constants/scenes";

export function CTA() {
  return (
    <section className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-oceanic-noir px-8 py-16 text-center sm:px-16">
          {/* Scene 8 — the emotional climax: every prior system unified. */}
          <div aria-hidden="true" className="absolute inset-0 opacity-60">
            <SceneBackdrop
              frames={SCENE_FRAMES.cta}
              alt="An AI figure surrounded by unified analytics and automation panels"
              overlay={false}
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-nocturnal-expedition/40 via-transparent to-transparent"
          />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="font-display max-w-xl text-3xl font-semibold tracking-tight text-arctic-powder sm:text-4xl">
              Stop maintaining pipelines. Start shipping with them.
            </h2>
            <p className="max-w-md text-base text-arctic-powder/75">
              Set up your first automated pipeline in under 20 minutes — no
              credit card required.
            </p>
            <Button href="#pricing" variant="secondary" className="px-7 py-3.5 text-base">
              Start free trial
              <IconChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
