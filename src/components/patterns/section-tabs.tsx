"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionTabs({
  tabs,
  accent = "school",
}: {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  accent?: "church" | "school";
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  const accentBg = accent === "church" ? "bg-church text-ink" : "bg-school text-paper";

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-line pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active === tab.id ? accentBg : "text-slate hover:bg-stone",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pt-8"
      >
        {tabs.find((t) => t.id === active)?.content}
      </motion.div>
    </div>
  );
}
