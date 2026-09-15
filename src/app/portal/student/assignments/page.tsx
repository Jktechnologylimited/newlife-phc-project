import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Assignments" };

export default function Page() {
  return <PortalStub title="Assignments" description="Every assignment, past and upcoming, with due dates and submission status." />;
}
