import type { Metadata } from "next";
import { getBulletin } from "@/lib/data/content";
import { BulletinUploadForm } from "@/components/forms/bulletin-upload-form";

export const metadata: Metadata = { title: "Content Management" };

function nextSunday(): string {
  const d = new Date();
  const day = d.getUTCDay();
  const daysUntilSunday = (7 - day) % 7 || 7;
  d.setUTCDate(d.getUTCDate() + daysUntilSunday);
  return d.toISOString().slice(0, 10);
}

export default async function AdminContentPage() {
  const bulletin = await getBulletin();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl">Content Management</h1>
      <p className="mt-1 max-w-lg text-sm text-slate">
        Upload this week&apos;s bulletin — it goes live on /church/bulletin
        immediately. Other content types (pages, events, sermons) are
        still on the roadmap; see the README.
      </p>

      <div className="mt-8">
        <p className="mb-3 font-display text-lg">Sunday bulletin</p>
        <BulletinUploadForm
          defaultServiceDate={bulletin?.serviceDate?.slice(0, 10) ?? nextSunday()}
          defaultTheme={bulletin?.theme}
          defaultScripture={bulletin?.scripture}
          defaultSermonTitle={bulletin?.sermonTitle}
          defaultSermonSpeaker={bulletin?.sermonSpeaker}
          currentPdfFilename={bulletin?.pdfFilename}
        />
      </div>
    </div>
  );
}
