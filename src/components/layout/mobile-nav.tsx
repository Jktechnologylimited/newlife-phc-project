"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Church, BookOpen, Search, X, ArrowRightLeft } from "lucide-react";
import { churchNav, schoolNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/brand/mark";

export function MobileNav({
  open,
  onClose,
  onSearch,
  current,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
  current: "church" | "school" | null;
}) {
  const otherExperience = current === "church" ? "school" : "church";
  const links = current === "church" ? churchNav : current === "school" ? schoolNav : [];
  const OtherIcon = otherExperience === "church" ? Church : BookOpen;
  const otherLabel = otherExperience === "church" ? "Church" : "School";
  const otherAccent = otherExperience === "church" ? "text-church" : "text-school";
  const otherAccentBg = otherExperience === "church" ? "bg-church-tint" : "bg-school-tint";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-y-0 right-0 z-50 flex w-[86vw] max-w-sm flex-col bg-paper shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Wordmark tagline={false} />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full p-1.5 text-slate hover:bg-stone hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3">
              {current === null ? (
                // On the gateway (or another neutral page) there's no
                // "current" section to show links for — offer both.
                <div className="flex flex-col gap-2">
                  <Link
                    href="/church"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl bg-church-tint/40 p-4 transition-colors hover:bg-church-tint/70"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-church-tint text-church">
                      <Church className="h-4 w-4" />
                    </span>
                    <span className="font-display text-base">Church</span>
                  </Link>
                  <Link
                    href="/school"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl bg-school-tint/40 p-4 transition-colors hover:bg-school-tint/70"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-school-tint text-school">
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <span className="font-display text-base">School</span>
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="mb-4">
                    {links.map((link, i) => (
                      <li key={link.href} className={cn(i !== 0 && "border-t border-line")}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="block px-4 py-3 text-[0.95rem] text-ink/85 transition-colors hover:bg-stone/60 hover:text-ink"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* The only way to reach the other experience from here
                      — no cross-listed nav items, just the switch itself. */}
                  <Link
                    href={`/${otherExperience}`}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl bg-stone/50 p-4 transition-colors hover:bg-stone/70"
                  >
                    <span className={cn("flex h-9 w-9 items-center justify-center rounded-full", otherAccentBg, otherAccent)}>
                      <OtherIcon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="flex items-center gap-1.5 text-sm text-slate">
                        <ArrowRightLeft className="h-3 w-3" />
                        Switch to
                      </span>
                      <span className="font-display text-base">{otherLabel}</span>
                    </span>
                  </Link>
                </>
              )}
            </div>

            <div className="border-t border-line p-3">
              <button
                onClick={() => {
                  onClose();
                  onSearch();
                }}
                className="flex w-full items-center gap-2.5 rounded-xl border border-line px-4 py-3 text-sm text-slate"
              >
                <Search className="h-4 w-4" />
                Search…
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
