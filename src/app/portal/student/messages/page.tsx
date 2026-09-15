import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Messages" };

export default function Page() {
  return <PortalStub title="Messages" description="Messages from your teachers and the school office." />;
}
