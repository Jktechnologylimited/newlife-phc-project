import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Payments" };

export default function Page() {
  return <PortalStub title="Payments" description="School fees, payment history, and outstanding balances." />;
}
