"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Clock, ChevronRight } from "lucide-react";
import { popularSearches } from "@/lib/nav";

const recentSearches = [
  { label: "Sunday service", href: "/church#service-times" },
  { label: "Admissions process", href: "/school/admissions" },
  { label: "Youth ministry", href: "/church/ministries" },
];

export function GlobalSearch({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear the field when the modal closes. Doing this during render (not
  // in an effect) avoids an extra render pass — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) setQuery("");
  }

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="fixed left-1/2 top-20 z-50 w-[92vw] max-w-xl -translate-x-1/2 rounded-2xl bg-paper shadow-xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <Search className="h-4 w-4 shrink-0 text-slate" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sermons, events, admissions, and more…"
                className="w-full bg-transparent text-[0.95rem] text-ink placeholder:text-slate focus:outline-none"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="rounded-full p-1 text-slate hover:bg-stone hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-4 py-4">
              <p className="mb-2 text-sm text-slate">Popular</p>
              <div className="mb-5 flex flex-wrap gap-2">
                {popularSearches.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    onClick={onClose}
                    className="rounded-full border border-line px-3 py-1.5 text-sm text-ink transition-colors hover:border-ink"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>

              <p className="mb-1 text-sm text-slate">Recent</p>
              <ul>
                {recentSearches.map((r) => (
                  <li key={r.label}>
                    <Link
                      href={r.href}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-lg px-2 py-2.5 text-[0.95rem] transition-colors hover:bg-stone/60"
                    >
                      <span className="flex items-center gap-2.5 text-ink">
                        <Clock className="h-3.5 w-3.5 text-slate" />
                        {r.label}
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
