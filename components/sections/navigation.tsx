"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { IconSearch, IconXMark } from "@/components/icons";
import { NAV_LINKS } from "@/constants/content";
import { SITE_NAME } from "@/constants/seo";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 px-4">
      <Container>
        <nav
          aria-label="Primary"
          className="flex items-center justify-between rounded-2xl border border-border bg-surface/80 px-4 py-3 shadow-[0_1px_0_rgba(23,43,54,0.04)] backdrop-blur-md sm:px-6"
        >
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-oceanic-noir"
          >
            {SITE_NAME}
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-nocturnal-expedition transition-colors duration-150 ease-out hover:text-oceanic-noir"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              aria-label="Search"
              className="rounded-full p-2 text-nocturnal-expedition transition-colors duration-150 ease-out hover:bg-mystic-mint hover:text-oceanic-noir"
            >
              <IconSearch className="size-4" />
            </button>
            <Button href="#" variant="ghost" className="px-5 py-2.5">
              Sign in
            </Button>
            <Button href="#pricing" variant="secondary" className="px-5 py-2.5">
              Start free trial
            </Button>
          </div>

          <button
            type="button"
            className="relative flex size-9 items-center justify-center rounded-full text-oceanic-noir lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-panel"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? (
              <IconXMark className="size-6" />
            ) : (
              <span className="flex flex-col gap-1.5" aria-hidden="true">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            )}
          </button>
        </nav>

        {isOpen ? (
          <div
            id="mobile-nav-panel"
            className="mt-2 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm lg:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-oceanic-noir"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 border-t border-border pt-4">
              <Button href="#" variant="ghost">
                Sign in
              </Button>
              <Button href="#pricing" variant="secondary">
                Start free trial
              </Button>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
