import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Site Structure" };

export default function Page() {
  return <PortalStub title="Site Structure" description="Manage navigation, hierarchy, and page structure." />;
}
