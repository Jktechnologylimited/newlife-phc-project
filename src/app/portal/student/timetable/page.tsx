import type { Metadata } from "next";
import { PortalStub } from "@/components/portal/portal-stub";

export const metadata: Metadata = { title: "Timetable" };

export default function Page() {
  return <PortalStub title="Timetable" description="Your full weekly class schedule, by day and period." />;
}
