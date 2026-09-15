import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Attendance" };

export default function Page() {
  return <PortalStub title="Attendance" description="Attendance records for each of your children." />;
}
