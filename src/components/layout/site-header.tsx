"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Church, BookOpen, Search, Menu } from "lucide-react";
import { churchNav, schoolNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/brand/mark";
import { ExperienceSwitcher } from "@/components/layout/experience-switcher";
import { GlobalSearch } from "@/components/layout/global-search";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader() {
  const pathname = usePathname();
  const experience: "church" | "school" | null = pathname.startsWith("/church")
    ? "church"
    : pathname.startsWith("/school")
      ? "school"
      : null;

  const navLinks = experience === "church" ? churchNav : experience === "school" ? schoolNav : [];

  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close any open overlay when the route changes. Adjusting state during
  // render (rather than in an effect) avoids an extra render pass — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setSwitcherOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cta =
    experience === "church"
      ? { label: "Give", href: "/church/give", cls: "bg-church text-ink hover:bg-church-deep hover:text-paper" }
      : experience === "school"
        ? { label: "Apply", href: "/school/admissions", cls: "bg-school text-paper hover:bg-school-deep" }
        : null;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-colors",
          scrolled ? "border-line bg-paper/90 backdrop-blur-md" : "border-transparent bg-paper/0",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="shrink-0">
            <Wordmark />
          </Link>

          {navLinks.length > 0 && (
            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[0.9rem] text-ink/75 transition-colors hover:text-ink",
                    pathname === link.href && "text-ink font-medium",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSwitcherOpen(true)}
              className="hidden items-center gap-1 rounded-full border border-line p-1 sm:flex"
              aria-label="Switch experience"
            >
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors",
                  experience === "church" ? "bg-ink text-paper" : "text-slate",
                )}
              >
                <Church className="h-3.5 w-3.5" />
                Church
              </span>
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors",
                  experience === "school" ? "bg-ink text-paper" : "text-slate",
                )}
              >
                <BookOpen className="h-3.5 w-3.5" />
                School
              </span>
            </button>

            {cta && (
              <Link
                href={cta.href}
                className={cn(
                  "hidden rounded-full px-4 py-2 text-sm font-medium transition-colors sm:block",
                  cta.cls,
                )}
              >
                {cta.label}
              </Link>
            )}

            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="rounded-full p-2 text-ink/80 transition-colors hover:bg-stone hover:text-ink"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="rounded-full p-2 text-ink/80 transition-colors hover:bg-stone hover:text-ink"
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </header>

      <ExperienceSwitcher open={switcherOpen} onClose={() => setSwitcherOpen(false)} current={experience} />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSearch={() => setSearchOpen(true)}
        current={experience}
      />
    </>
  );
}
