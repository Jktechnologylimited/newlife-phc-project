import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Content Management" };

export default function Page() {
  return <PortalStub title="Content Management" description="Manage pages, posts, events, and media across both sites." />;
}
