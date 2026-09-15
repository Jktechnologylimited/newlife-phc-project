import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Academics" };

export default function Page() {
  return <PortalStub title="Academics" description="Detailed academic progress and results for each of your children." />;
}
