import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { SectionTabs } from "@/components/patterns/section-tabs";
import { curriculumLevels, departments, academicCalendar } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Academics" };

function CurriculumTab() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {curriculumLevels.map((l) => (
        <div key={l.level} className="rounded-xl p-5">
          <p className="font-display text-lg">{l.level}</p>
          <p className="mt-1 text-xs text-slate">{l.ages}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate">{l.desc}</p>
        </div>
      ))}
    </div>
  );
}

function DepartmentsTab() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {departments.map((d) => (
        <div key={d.name} className="rounded-xl p-5">
          <p className="font-display text-lg">{d.name}</p>
          <p className="mt-1 text-sm text-slate">{d.lead}</p>
          <ul className="mt-3 space-y-1 text-sm text-ink/75">
            {d.focus.map((f) => (
              <li key={f}>· {f}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function CalendarTab() {
  return (
    <div className="max-w-md divide-y divide-line rounded-xl">
      {academicCalendar.map((c) => (
        <div key={c.event} className="flex items-center gap-3 px-4 py-3">
          <CalendarDays className="h-4 w-4 shrink-0 text-school-deep" />
          <p className="text-sm">
            <span className="font-medium">{c.date}</span> — {c.event}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function AcademicsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-school-deep">Academics</p>
      <h1 className="mt-2 font-display text-4xl">A challenging, nurturing academic environment</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        A well-rounded curriculum that builds knowledge, character, and
        purpose — across every stage of school.
      </p>

      <div className="mt-10">
        <SectionTabs
          tabs={[
            { id: "curriculum", label: "Curriculum", content: <CurriculumTab /> },
            { id: "departments", label: "Departments", content: <DepartmentsTab /> },
            { id: "calendar", label: "Academic Calendar", content: <CalendarTab /> },
          ]}
        />
      </div>
    </div>
  );
}
