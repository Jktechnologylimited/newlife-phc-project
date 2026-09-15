import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Students" };

export default function Page() {
  return <PortalStub title="Students" description="Search and manage student records across your classes." />;
}
