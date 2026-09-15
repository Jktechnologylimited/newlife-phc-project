import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "My Children" };

export default function Page() {
  return <PortalStub title="My Children" description="Full profiles for each of your children — academics, attendance, and more." />;
}
