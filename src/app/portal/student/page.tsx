import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Clock, ClipboardList, BarChart3, MessageSquare } from "lucide-react";
import { getSession } from "@/lib/auth/get-session";
import { getStudentDashboard } from "@/lib/data/portal";

export const metadata: Metadata = { title: "Student Dashboard" };

export default async function StudentPortalPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const d = await getStudentDashboard(session.userId);
  const firstName = d.name.split(" ")[0];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-2xl">Good morning, {firstName}!</h1>
      <p className="mt-1 text-sm text-slate">Here&apos;s what&apos;s happening with your account.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-paper-dim p-5">
          <p className="flex items-center gap-2 font-display text-base">
            <Clock className="h-4 w-4 text-school-deep" />
            Upcoming classes
          </p>
          <ul className="mt-3 space-y-2.5">
            {d.upcomingClasses.map((c) => (
              <li key={c.subject} className="flex items-center justify-between text-sm">
                <span>{c.subject}</span>
                <span className="text-slate">{c.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-paper-dim p-5">
          <p className="flex items-center gap-2 font-display text-base">
            <ClipboardList className="h-4 w-4 text-school-deep" />
            Pending assignments
          </p>
          <ul className="mt-3 space-y-2.5">
            {d.pendingAssignments.map((a) => (
              <li key={a.title} className="text-sm">
                <span className="block">{a.title}</span>
                <span className="text-xs text-slate">{a.due}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-paper-dim p-5">
          <p className="flex items-center gap-2 font-display text-base">
            <BarChart3 className="h-4 w-4 text-school-deep" />
            Recent results
          </p>
          <ul className="mt-3 space-y-2.5">
            {d.recentResults.map((r) => (
              <li key={r.subject} className="flex items-center justify-between text-sm">
                <span>{r.subject}</span>
                <span className="font-medium text-ink">
                  {r.score}/{r.maxScore}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-paper-dim p-5">
          <p className="flex items-center gap-2 font-display text-base">
            <MessageSquare className="h-4 w-4 text-school-deep" />
            Messages
          </p>
          <ul className="mt-3 space-y-3">
            {d.messages.map((m) => (
              <li key={m.from} className="text-sm">
                <span className="block font-medium">{m.from}</span>
                <span className="text-slate">{m.preview}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-school-tint/50 p-5">
        <p className="text-sm text-ink/80">
          Your attendance this term is <span className="font-medium">{d.attendance}</span>.
        </p>
      </div>
    </div>
  );
}
