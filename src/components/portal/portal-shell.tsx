"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, Bell } from "lucide-react";
import { logout } from "@/lib/auth/actions";
import { portalNavByRole, type PortalLink } from "@/lib/portal-nav";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/brand/mark";
import type { Role } from "@/lib/auth/session";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const roleLabel: Record<Role, string> = {
  student: "Student",
  parent: "Parent",
  staff: "Staff",
  admin: "Administrator",
};

function SidebarLinks({ links, pathname, onNavigate }: { links: PortalLink[]; pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              active ? "bg-ink text-paper" : "text-ink/75 hover:bg-stone/60 hover:text-ink",
            )}
          >
            <link.Icon className="h-4 w-4 shrink-0" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function PortalShell({
  role,
  name,
  children,
}: {
  role: Role;
  name: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = portalNavByRole[role];

  return (
    <div className="flex min-h-screen bg-paper">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-line px-4 py-6 lg:block">
        <Link href="/" className="block px-2">
          <Wordmark tagline={false} />
        </Link>
        <div className="mt-8">
          <SidebarLinks links={links} pathname={pathname} />
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-paper p-4 shadow-2xl">
            <div className="flex items-center justify-between px-2">
              <Wordmark tagline={false} />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-full p-1.5 hover:bg-stone">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-8">
              <SidebarLinks links={links} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-line px-5 lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2 hover:bg-stone lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="hidden text-sm text-slate lg:block">{roleLabel[role]} Portal</p>

          <div className="flex items-center gap-3">
            <button aria-label="Notifications" className="rounded-full p-2 text-ink/70 hover:bg-stone hover:text-ink">
              <Bell className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone text-xs font-medium text-ink">
                {initialsOf(name)}
              </span>
              <span className="hidden text-sm font-medium sm:block">{name}</span>
            </div>
            <form action={logout}>
              <button
                type="submit"
                aria-label="Sign out"
                className="flex items-center gap-1.5 rounded-full p-2 text-ink/70 hover:bg-stone hover:text-ink"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 px-5 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
