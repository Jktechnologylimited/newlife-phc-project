import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Settings" };

export default function Page() {
  return <PortalStub title="Settings" description="Manage your password, notifications, and account preferences." />;
}
