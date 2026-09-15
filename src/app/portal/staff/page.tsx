import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/get-session";
import { getStaffDashboard } from "@/lib/data/portal";

export const metadata: Metadata = { title: "Staff Dashboard" };

export default async function StaffPortalPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const d = await getStaffDashboard(session.userId);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-2xl">Welcome, {d.name}</h1>
      <p className="mt-1 text-sm text-slate">Manage your classes and track student progress.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-paper-dim p-5">
          <p className="font-display text-base">My classes</p>
          <p className="mt-1 text-xs text-slate">{d.studentCount} students total</p>
          <ul className="mt-3 space-y-2 text-sm">
            {d.myClasses.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-paper-dim p-5">
          <p className="font-display text-base">Today&apos;s schedule</p>
          <ul className="mt-3 space-y-2.5 text-sm">
            {d.todaySchedule.map((s) => (
              <li key={s.subject} className="flex items-center justify-between">
                <span>{s.subject}</span>
                <span className="text-slate">{s.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
