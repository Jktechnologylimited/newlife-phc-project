import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "My Classes" };

export default function Page() {
  return <PortalStub title="My Classes" description="Every class you teach, with rosters and schedules." />;
}
