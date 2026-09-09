"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Church, BookOpen, Search, X } from "lucide-react";
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
  const [expanded, setExpanded] = useState<"church" | "school">(
    current === "school" ? "school" : "church",
  );

  const sections = [
    { key: "church" as const, label: "Church", Icon: Church, links: churchNav, accent: "text-church" },
    { key: "school" as const, label: "School", Icon: BookOpen, links: schoolNav, accent: "text-school" },
  ];

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
            className="fixed inset-y-0 right-0 z-50 flex w-[86vw] max-w-sm flex-col border-l border-line bg-paper"
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
              {sections.map((section) => {
                const isOpen = expanded === section.key;
                return (
                  <div key={section.key} className="mb-2 overflow-hidden rounded-xl border border-line">
                    <button
                      onClick={() => setExpanded(section.key)}
                      className="flex w-full items-center justify-between px-4 py-3.5"
                    >
                      <span className="flex items-center gap-2.5 font-display text-base">
                        <section.Icon className={cn("h-4 w-4", section.accent)} />
                        {section.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-slate transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-line"
                        >
                          {section.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                className="block px-5 py-2.5 text-[0.95rem] text-ink/80 transition-colors hover:bg-stone/60 hover:text-ink"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
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
