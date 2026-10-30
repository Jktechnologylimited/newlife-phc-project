"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { containDialogFocus } from "@/lib/dialog-keyboard";
import { churchNav, schoolNav } from "@/lib/nav";
import { school, telephoneHref } from "@/lib/institution";
import { Wordmark } from "@/components/brand/mark";
import { cn } from "@/lib/utils";
export function SiteHeader() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);
  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1200) dialog.current?.close();
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);
  if (
    pathname.startsWith("/portal") ||
    ["/login", "/signup", "/forgot-password"].includes(pathname)
  )
    return null;
  const isChurch = pathname.startsWith("/church");
  const experience = isChurch ? "church" : "school";
  const links = isChurch ? churchNav : schoolNav;
  const contact = isChurch ? "/church/about" : "/school/contact";
  const cta = isChurch ? "Our story" : "School enquiries";
  return (
    <header className="site-header">
      <div className="header-topline">
        <div className="institution-wrap header-topline-inner">
          <span>
            {isChurch
              ? "Newlife Baptist Church & Schools"
              : "Learning and Growing in God"}
          </span>
          <span className="header-topline-right">
            {!isChurch && (
              <>
                <span>{school.locality}</span>
                {school.telephone && (
                  <a href={telephoneHref(school.telephone)}>
                    <Phone size={12} aria-hidden="true" />
                    {school.telephone}
                  </a>
                )}
              </>
            )}
            {isChurch && (
              <Link href="/">
                Discover the school{" "}
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            )}
          </span>
        </div>
      </div>
      <div className="institution-wrap header-main">
        <Link
          href={isChurch ? "/church" : "/"}
          aria-label={
            isChurch
              ? "Newlife Baptist Church home"
              : "Newlife Baptist Schools home"
          }
        >
          <Wordmark experience={experience} size={44} />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn("nav-link", pathname === link.href && "active")}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href={contact} className="button-primary header-enquiry">
            {cta}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            className="menu-button"
          >
            <Menu size={23} />
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        onKeyDown={containDialogFocus}
        aria-label="Navigation menu"
        className="navigation-dialog"
      >
        <div className="navigation-dialog-top">
          <Wordmark experience={experience} />
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close navigation menu"
            className="menu-close"
          >
            <X size={23} />
          </button>
        </div>
        <p className="eyebrow mt-8">Explore Newlife</p>
        <nav aria-label="Mobile navigation" className="mobile-nav">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => dialog.current?.close()}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              <span className="mobile-nav-index" aria-hidden="true">
                0{index + 1}
              </span>
              {link.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <Link
          href={contact}
          onClick={() => dialog.current?.close()}
          className="button-primary w-full justify-center"
        >
          {cta}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </dialog>
    </header>
  );
}
