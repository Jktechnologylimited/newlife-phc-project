import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Assessments" };

export default function Page() {
  return <PortalStub title="Assessments" description="Create and grade assignments, tests, and results." />;
}
