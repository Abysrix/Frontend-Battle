import { Container } from "@/components/ui/container";
import { LOGOS } from "@/constants/content";

export function LogoCloud() {
  return (
    <section className="py-16" aria-labelledby="logo-cloud-heading">
      <Container>
        <h2
          id="logo-cloud-heading"
          className="text-center text-sm font-medium text-nocturnal-expedition/70"
        >
          Trusted by data teams at
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {LOGOS.map((logo) => (
            <li
              key={logo.id}
              className="flex items-center justify-center font-display text-sm font-semibold text-nocturnal-expedition/50 grayscale transition-colors hover:text-oceanic-noir hover:grayscale-0"
            >
              {logo.name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
