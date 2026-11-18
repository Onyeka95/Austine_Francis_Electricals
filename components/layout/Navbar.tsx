"use client"; // needed because the menu uses useState and usePathname

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navLinks } from "@/data/siteConfig";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu when the Escape key is pressed
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function isActive(href: string): boolean {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    // print:hidden hides the navbar when printing (GL-5)
    <header className="sticky top-0 z-40 bg-brand-navy shadow-md print:hidden">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-brand-amber"
                  : "text-white/90 hover:text-brand-amber"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/contact" className="hidden lg:inline-flex">
            Get a Quote
          </ButtonLink>

          {/* Hamburger button (mobile and tablet) */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md p-2 text-white lg:hidden"
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu panel */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-brand-navy-dark lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-md px-3 py-3 text-base font-medium ${
                  isActive(link.href)
                    ? "bg-white/10 text-brand-amber"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink
              href="/contact"
              size="lg"
              className="mt-4 w-full"
              onClick={closeMenu}
            >
              Get a Quote
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}