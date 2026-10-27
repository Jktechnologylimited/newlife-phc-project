"use client";

import { containDialogFocus } from "@/lib/dialog-keyboard";
import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { churchNav, schoolNav } from "@/lib/nav";
import { Wordmark } from "@/components/brand/mark";
import { cn } from "@/lib/utils";
export function SiteHeader() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  if (
    pathname.startsWith("/portal") ||
    ["/login", "/signup", "/forgot-password"].includes(pathname)
  )
    return null;
  const isChurch = pathname.startsWith("/church");
  const links = isChurch ? churchNav : schoolNav;
  const contact = isChurch ? "/church/contact" : "/school/contact";
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="institution-wrap flex min-h-20 items-center justify-between gap-3">
        <Link href="/" aria-label="Newlife Baptist School home">
          <Wordmark />
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn(
                "py-3 text-sm hover:underline underline-offset-8",
                pathname === link.href
                  ? "font-semibold text-ink"
                  : "text-slate",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={contact}
            className="site-button hidden bg-ink text-paper hover:bg-church-deep sm:inline-flex"
          >
            Contact {isChurch ? "the Church" : "the School"}
          </Link>
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            className="rounded-full border border-line p-3 lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
      <dialog
        onKeyDown={containDialogFocus}
        ref={dialog}
        aria-label="Navigation menu"
        className="fixed inset-0 m-auto max-h-[90dvh] w-[min(92vw,28rem)] overflow-y-auto rounded-2xl bg-paper p-6 text-ink shadow-xl backdrop:bg-ink/60"
      >
        <div className="flex items-center justify-between gap-4">
          <Wordmark />
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close navigation menu"
            className="rounded-full border border-line p-3"
          >
            <X size={22} />
          </button>
        </div>
        <nav
          aria-label="Mobile navigation"
          className="my-6 flex flex-col divide-y divide-line"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => dialog.current?.close()}
              aria-current={pathname === link.href ? "page" : undefined}
              className="py-4 text-lg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href={contact}
          onClick={() => dialog.current?.close()}
          className="site-button w-full justify-center bg-ink text-paper"
        >
          Contact {isChurch ? "the Church" : "the School"}
        </Link>
      </dialog>
    </header>
  );
}
