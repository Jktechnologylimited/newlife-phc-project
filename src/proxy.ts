import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

/**
 * This is a UX convenience (fast redirect before a page even renders),
 * not the actual security boundary — Next's proxy/middleware layer can
 * be bypassed (see CVE-2025-29927), so every /portal/* layout also
 * re-verifies the session itself server-side. See portal/layout.tsx.
 */
export async function proxy(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // /portal/[role]/... — keep people out of a portal that isn't theirs.
  const segments = req.nextUrl.pathname.split("/").filter(Boolean); // ["portal", "student", ...]
  const requestedRole = segments[1];
  const knownRoles = ["student", "parent", "staff", "admin"];
  if (requestedRole && knownRoles.includes(requestedRole) && requestedRole !== session.role) {
    return NextResponse.redirect(new URL(`/portal/${session.role}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
