import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SITE_NAME } from "@/constants/seo";

const FOOTER_GROUPS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Showcase", href: "#showcase" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Customers", href: "#testimonials" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-16">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-3">
            <span className="font-display text-lg font-bold tracking-tight text-oceanic-noir">
              {SITE_NAME}
            </span>
            <p className="max-w-xs text-sm text-nocturnal-expedition/75">
              The AI data automation platform for teams that would rather
              build product than babysit pipelines.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-3 gap-8 sm:flex sm:gap-16"
          >
            {FOOTER_GROUPS.map((group) => (
              <div key={group.heading} className="flex flex-col gap-3">
                <h3 className="font-display text-xs font-semibold uppercase tracking-wide text-nocturnal-expedition/60">
                  {group.heading}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-nocturnal-expedition/85 hover:text-oceanic-noir"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 text-xs text-nocturnal-expedition/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p>Built for the AI Data Automation Hackathon.</p>
        </div>
      </Container>
    </footer>
  );
}
