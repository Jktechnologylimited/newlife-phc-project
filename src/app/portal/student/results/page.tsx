import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Results" };

export default function Page() {
  return <PortalStub title="Results" description="Full academic results by term and subject, with progress over time." />;
}
