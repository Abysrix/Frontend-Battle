"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";
import { TESTIMONIALS } from "@/constants/content";

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="py-24">
      <Container className="flex flex-col gap-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Customers"
            title="Teams that stopped firefighting pipelines"
          />
          {/* Carousel controls only make sense on the snap-scroll mobile/tablet
              layout — the desktop grid shows all three at once. */}
          <div className="hidden shrink-0 items-center gap-2 sm:flex lg:hidden">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous testimonial"
              className="flex size-9 items-center justify-center rounded-full border border-border text-oceanic-noir transition-colors duration-150 ease-out hover:bg-mystic-mint"
            >
              <IconChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next testimonial"
              className="flex size-9 items-center justify-center rounded-full border border-border text-oceanic-noir transition-colors duration-150 ease-out hover:bg-mystic-mint"
            >
              <IconChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible"
        >
          {TESTIMONIALS.map((testimonial) => (
            <li
              key={testimonial.id}
              className="min-w-[85%] shrink-0 snap-center lg:min-w-0 lg:shrink"
            >
              <figure className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-surface p-7">
                <span
                  aria-hidden="true"
                  className="font-display text-4xl leading-none text-forsythia"
                >
                  &ldquo;
                </span>
                <blockquote className="flex-1 text-base leading-relaxed text-oceanic-noir">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="flex flex-col">
                  <span className="font-display text-sm font-semibold text-oceanic-noir">
                    {testimonial.name}
                  </span>
                  <span className="text-sm text-nocturnal-expedition/70">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
