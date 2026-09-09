"use client";

import { useActionState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { churchFooterNav, schoolFooterNav } from "@/lib/nav";
import { subscribeNewsletter, type FormState } from "@/lib/actions";
import { Wordmark } from "@/components/brand/mark";
import { cn } from "@/lib/utils";
import { FacebookGlyph, InstagramGlyph, YoutubeGlyph, LinkedinGlyph } from "@/components/icons/social";

const initialState: FormState = { status: "idle", message: "" };

export function SiteFooter() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);
  const pathname = usePathname();
  const experience: "church" | "school" | null = pathname.startsWith("/church")
    ? "church"
    : pathname.startsWith("/school")
      ? "school"
      : null;

  const contactEmail =
    experience === "school" ? "admissions@newlifebaptistchurch.org" : "office@newlifebaptistchurch.org";

  return (
    <footer className="border-t border-line bg-paper-dim">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div
          className={cn(
            "grid gap-12",
            // On a section page, the footer only carries that section's
            // own links — the navbar switcher is how people move between
            // Church and School, so the footer doesn't need to repeat it.
            experience === null ? "lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]" : "lg:grid-cols-[1.3fr_1fr_1.2fr]",
          )}
        >
          <div>
            <Wordmark size={44} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">
              One campus, two front doors — a congregation and a school
              raising kids and grown-ups in the same direction.
            </p>
            <div className="mt-5 flex gap-3 text-ink/70">
              <a href="#" aria-label="Facebook" className="rounded-full p-1.5 hover:bg-stone hover:text-ink">
                <FacebookGlyph className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="rounded-full p-1.5 hover:bg-stone hover:text-ink">
                <InstagramGlyph className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="rounded-full p-1.5 hover:bg-stone hover:text-ink">
                <YoutubeGlyph className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-full p-1.5 hover:bg-stone hover:text-ink">
                <LinkedinGlyph className="h-4 w-4" />
              </a>
            </div>
          </div>

          {(experience === "church" || experience === null) && (
            <div>
              <p className="mb-3 font-display text-[0.95rem]">Church</p>
              <ul className="space-y-2.5 text-sm text-slate">
                {churchFooterNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(experience === "school" || experience === null) && (
            <div>
              <p className="mb-3 font-display text-[0.95rem]">School</p>
              <ul className="space-y-2.5 text-sm text-slate">
                {schoolFooterNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="mb-3 font-display text-[0.95rem]">Stay connected</p>
            <ul className="mb-5 space-y-2.5 text-sm text-slate">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                Port Harcourt, Rivers State, Nigeria
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                +234 803 123 4567
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                {contactEmail}
              </li>
            </ul>

            <form action={formAction} className="flex flex-col gap-2">
              <label htmlFor="footer-email" className="text-sm text-slate">
                Get news from the office
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="shrink-0 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {pending ? "…" : "Subscribe"}
                </button>
              </div>
              {state.message && (
                <p className={`text-xs ${state.status === "error" ? "text-red-700" : "text-school-deep"}`}>
                  {state.message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-slate sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Newlife Baptist Church &amp; School. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/terms" className="hover:text-ink">Terms</Link>
            <Link href="/accessibility" className="hover:text-ink">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
