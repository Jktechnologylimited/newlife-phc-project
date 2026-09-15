import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Users & Roles" };

export default function Page() {
  return <PortalStub title="Users & Roles" description="Manage every account — students, parents, staff, and admins — and their permissions." />;
}
