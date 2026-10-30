"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/brand/mark";
import { school, church } from "@/lib/institution";
import { schoolNav, churchNav } from "@/lib/nav";
import { ContactLinks } from "@/components/institution/sections";
export function SiteFooter() {
  const pathname = usePathname();
  const isBare =
    pathname.startsWith("/portal") ||
    ["/login", "/signup", "/forgot-password"].includes(pathname);
  const isChurch = pathname.startsWith("/church");
  const institution = isChurch ? church : school;
  if (isBare)
    return (
      <footer className="bare-attribution">
        Powered by Newlife Baptist Church Technical Team
      </footer>
    );
  return (
    <footer className="site-footer">
      <div className="institution-wrap">
        <div className="footer-heading">
          <Link
            href={isChurch ? "/church" : "/"}
            aria-label={isChurch ? "Church home" : "School home"}
          >
            <Wordmark experience={isChurch ? "church" : "school"} size={48} />
          </Link>
          <p>
            {isChurch
              ? "A shared story. A place in the Newlife family."
              : "Learning and Growing in God."}
          </p>
        </div>
        <div className="footer-grid">
          <div className="footer-introduction">
            <p>
              {isChurch
                ? "Newlife Baptist Church formally took ownership of the school in 1996, continuing a connection that began with its first four children."
                : "A school that began with four children in 1994, in Rumueme, Port Harcourt."}
            </p>
            <Link href={isChurch ? "/" : "/church"} className="text-link light">
              {isChurch ? "Visit our school" : "Discover our church"}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <nav aria-label="School footer navigation">
            <h2>Explore the school</h2>
            <ul>
              {schoolNav
                .filter((l) => l.label !== "Church")
                .map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
            </ul>
          </nav>
          <nav aria-label="Church footer navigation">
            <h2>Our church</h2>
            <ul>
              {churchNav
                .filter((l) => l.label !== "School")
                .map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
            </ul>
          </nav>
          <div>
            <h2>{isChurch ? "Our shared story" : "Get in touch"}</h2>
            {isChurch &&
            !church.telephone &&
            !church.email &&
            !church.whatsapp ? (
              <p className="footer-church-copy">
                Learn how the church became part of the school’s story.
                <br />
                <Link href="/church/about" className="text-link light">
                  About the church
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </p>
            ) : (
              <ContactLinks institution={institution} />
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Newlife Baptist Schools &amp; Church.
          </p>
          <p>Powered by Newlife Baptist Church Technical Team</p>
        </div>
      </div>
    </footer>
  );
}
