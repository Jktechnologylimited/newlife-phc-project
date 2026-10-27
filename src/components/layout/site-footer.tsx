"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/brand/mark";
import { school, church } from "@/lib/institution";
import { schoolNav, churchNav } from "@/lib/nav";
import { ContactLinks } from "@/components/institution/sections";
export function SiteFooter() {
  const pathname = usePathname();
  if (
    pathname.startsWith("/portal") ||
    ["/login", "/signup", "/forgot-password"].includes(pathname)
  )
    return null;
  const institution = pathname.startsWith("/church") ? church : school;
  return (
    <footer className="border-t border-line bg-paper-dim">
      <div className="institution-wrap py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_0.7fr_0.7fr_1.3fr]">
          <div>
            <Link href="/" aria-label="School home">
              <Wordmark size={48} />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate">
              Newlife Baptist School &amp; Newlife Baptist Church.
            </p>
          </div>
          <nav aria-label="School footer navigation">
            <h2 className="mb-4 font-display text-xl">School</h2>
            <ul className="space-y-3 text-sm">
              {schoolNav
                .filter((l) => l.label !== "Church")
                .map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="hover:underline underline-offset-4"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          <nav aria-label="Church footer navigation">
            <h2 className="mb-4 font-display text-xl">Church</h2>
            <ul className="space-y-3 text-sm">
              {churchNav
                .filter((l) => l.label !== "School")
                .map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="hover:underline underline-offset-4"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          <div>
            <h2 className="mb-4 font-display text-xl">
              {institution.shortName} · enquiries
            </h2>
            <div className="text-sm">
              <ContactLinks institution={institution} />
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-line pt-6 text-xs leading-relaxed text-slate">
          © {new Date().getFullYear()} Newlife Baptist School &amp; Church. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
