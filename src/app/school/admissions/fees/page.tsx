import Link from "next/link";
import type { Metadata } from "next";
import { tuition } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Fees & Tuition" };

export default function FeesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-school-deep">Fees & tuition</p>
      <h1 className="mt-2 font-display text-4xl">Investing in your child&apos;s future</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        We keep tuition transparent and offer scholarships and financial aid
        to make quality education accessible.
      </p>

      <div className="mt-10 overflow-hidden rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-dim">
            <tr>
              <th className="px-5 py-3 font-medium">School level</th>
              <th className="px-5 py-3 font-medium">Annual tuition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {tuition.map((t) => (
              <tr key={t.level}>
                <td className="px-5 py-3.5">{t.level}</td>
                <td className="px-5 py-3.5 font-display">{t.annual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 rounded-xl p-6">
        <p className="font-display text-lg">Scholarships & financial aid</p>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Academic excellence, leadership, and community-service
          scholarships are available, along with need-based financial aid
          for qualifying families.
        </p>
        <Link
          href="/school/contact"
          className="mt-5 inline-block rounded-full bg-school px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Ask about financial aid
        </Link>
      </div>
    </div>
  );
}
