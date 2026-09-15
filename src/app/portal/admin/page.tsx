import type { Metadata } from "next";
import Link from "next/link";
import { Users, GraduationCap, Layers, ClipboardCheck, UserPlus, FileText, BarChart3 } from "lucide-react";
import { getAdminDashboard } from "@/lib/data/portal";

export const metadata: Metadata = { title: "Admin Dashboard" };

const quickActions = [
  { label: "Add Student", href: "/portal/admin/users", Icon: UserPlus },
  { label: "Add Staff", href: "/portal/admin/users", Icon: UserPlus },
  { label: "Create Page", href: "/portal/admin/content", Icon: FileText },
  { label: "View Reports", href: "/portal/admin/reports", Icon: BarChart3 },
];

export default async function AdminPortalPage() {
  const d = await getAdminDashboard();
  const stats = [
    { label: "Total Students", value: d.totalStudents, Icon: GraduationCap },
    { label: "Total Staff", value: d.totalStaff, Icon: Users },
    { label: "Total Classes", value: d.totalClasses, Icon: Layers },
    { label: "Pending Admissions", value: d.pendingAdmissions, Icon: ClipboardCheck },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-2xl">Good morning, Admin</h1>
      <p className="mt-1 text-sm text-slate">Here&apos;s what&apos;s happening with your platform today.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, Icon }) => (
          <div key={label} className="rounded-xl bg-paper-dim p-5">
            <Icon className="h-5 w-5 text-church-deep" />
            <p className="mt-3 font-display text-2xl">{value}</p>
            <p className="text-sm text-slate">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl bg-paper-dim p-5">
          <p className="font-display text-base">Recent activity</p>
          <ul className="mt-3 space-y-3">
            {d.recentActivity.map((a) => (
              <li key={a.text} className="text-sm">
                <span className="block">{a.text}</span>
                <span className="text-xs text-slate">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-paper-dim p-5">
          <p className="font-display text-base">Quick actions</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {quickActions.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-start gap-2 rounded-lg bg-paper p-3 text-sm transition-colors hover:bg-stone/60"
              >
                <Icon className="h-4 w-4 text-church-deep" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
