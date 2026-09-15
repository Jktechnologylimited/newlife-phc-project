"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Music } from "lucide-react";
import type { Hymn } from "@/lib/data/content";

export function HymnList({ hymns }: { hymns: Hymn[] }) {
  const [query, setQuery] = useState("");
  const filtered = hymns.filter((h) => h.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search hymns by title…"
          className="w-full rounded-full border border-line bg-paper py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-slate/70 focus:outline-none focus:ring-2 focus:ring-church/30"
        />
      </div>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {filtered.map((h) => (
          <li key={h.slug}>
            <Link href={`/church/hymns/${h.slug}`} className="group flex items-center justify-between gap-4 py-4">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-church-tint text-church-deep">
                  <Music className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-display text-base leading-snug group-hover:underline">{h.title}</span>
                  <span className="text-xs text-slate">
                    {h.author}
                    {h.year ? ` · ${h.year}` : ""}
                  </span>
                </span>
              </span>
              {h.hymnNumber && <span className="shrink-0 text-xs text-slate">No. {h.hymnNumber}</span>}
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-8 text-center text-sm text-slate">No hymns match &ldquo;{query}&rdquo;.</li>
        )}
      </ul>
    </div>
  );
}
