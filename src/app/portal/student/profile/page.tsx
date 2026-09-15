import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "My Profile" };

export default function Page() {
  return <PortalStub title="My Profile" description="Your personal details, contact information, and account preferences." />;
}
