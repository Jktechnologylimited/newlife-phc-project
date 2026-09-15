import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/get-session";
import { getParentDashboard } from "@/lib/data/portal";

export const metadata: Metadata = { title: "Parent Dashboard" };

export default async function ParentPortalPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const d = await getParentDashboard(session.userId);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-2xl">Welcome, {d.name}</h1>
      <p className="mt-1 text-sm text-slate">Here&apos;s an overview of your children&apos;s progress.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {d.children.map((child) => (
          <div key={child.name} className="rounded-xl bg-paper-dim p-5">
            <p className="font-display text-lg">{child.name}</p>
            <p className="text-xs text-slate">{child.gradeLevel}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-paper p-3">
                <p className="text-xs text-slate">Progress</p>
                <p className="mt-1 text-sm font-medium">{child.progress}</p>
              </div>
              <div className="rounded-lg bg-paper p-3">
                <p className="text-xs text-slate">Attendance</p>
                <p className="mt-1 text-sm font-medium">{child.attendance}</p>
              </div>
              <div className="rounded-lg bg-paper p-3">
                <p className="text-xs text-slate">Fees</p>
                <p className="mt-1 text-sm font-medium">{child.fees}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="mb-3 font-display text-lg">Recent updates</p>
        <ul className="space-y-3">
          {d.recentUpdates.map((u) => (
            <li key={u.text} className="rounded-xl bg-paper-dim p-4 text-sm">
              <span className="block">{u.text}</span>
              <span className="text-xs text-slate">{u.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
