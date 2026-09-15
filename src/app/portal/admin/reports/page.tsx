import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Reports & Analytics" };

export default function Page() {
  return <PortalStub title="Reports & Analytics" description="Site traffic, enquiries, conversions, and engagement, all in one place." />;
}
