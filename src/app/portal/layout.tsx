import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/get-session";
import { PortalShell } from "@/components/portal/portal-shell";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  // Middleware already guards /portal/*, but a Server Component shouldn't
  // trust that alone — verify again here.
  if (!session) redirect("/login");

  return (
    <PortalShell role={session.role} name={session.name}>
      {children}
    </PortalShell>
  );
}
