import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Notifications & Activity Log" };

export default function Page() {
  return <PortalStub title="Notifications & Activity Log" description="A full log of platform activity and system notifications." />;
}
