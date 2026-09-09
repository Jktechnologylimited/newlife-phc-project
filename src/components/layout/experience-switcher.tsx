"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Church, BookOpen, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExperienceSwitcher({
  open,
  onClose,
  current,
}: {
  open: boolean;
  onClose: () => void;
  current: "church" | "school" | null;
}) {
  const options = [
    {
      key: "church" as const,
      href: "/church",
      label: "Church",
      blurb: "Worship, community, faith",
      Icon: Church,
      tint: "group-hover:bg-church-tint",
      ring: "focus-visible:ring-church",
    },
    {
      key: "school" as const,
      href: "/school",
      label: "School",
      blurb: "Learn, grow, lead",
      Icon: BookOpen,
      tint: "group-hover:bg-school-tint",
      ring: "focus-visible:ring-school",
    },
  ];

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
            aria-label="Switch between experiences"
            className="fixed left-1/2 top-24 z-50 w-[92vw] max-w-md -translate-x-1/2 rounded-2xl bg-paper p-2 shadow-xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-4 pb-2 pt-3">
              <p className="font-display text-lg">Switch experience</p>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1.5 text-slate hover:bg-stone hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-1 p-1">
              {options.map((opt) => (
                <Link
                  key={opt.key}
                  href={opt.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-stone/50",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full bg-stone text-ink transition-colors",
                        opt.tint,
                      )}
                    >
                      <opt.Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="block font-display text-base leading-tight">
                        {opt.label}
                      </span>
                      <span className="block text-sm text-slate">{opt.blurb}</span>
                    </span>
                  </span>
                  {current === opt.key && <Check className="h-4 w-4 text-ink" />}
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
