import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "System Settings" };

export default function Page() {
  return <PortalStub title="System Settings" description="Site information, SEO, integrations, and global configuration." />;
}
