"use client";

import { useActionState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { uploadBulletin, initialBulletinState } from "@/lib/admin/actions";

const fieldCls =
  "w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/70 focus:outline-none focus:ring-2 focus:ring-church/30";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export function BulletinUploadForm({
  defaultServiceDate,
  defaultTheme,
  defaultScripture,
  defaultSermonTitle,
  defaultSermonSpeaker,
  currentPdfFilename,
}: {
  defaultServiceDate?: string;
  defaultTheme?: string | null;
  defaultScripture?: string | null;
  defaultSermonTitle?: string | null;
  defaultSermonSpeaker?: string | null;
  currentPdfFilename?: string | null;
}) {
  const [state, formAction, pending] = useActionState(uploadBulletin, initialBulletinState);

  return (
    <div className="max-w-xl rounded-xl bg-paper-dim p-6">
      {currentPdfFilename && (
        <p className="mb-5 flex items-center gap-2 text-sm text-slate">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-church-deep" />
          Currently live: <span className="font-medium text-ink">{currentPdfFilename}</span>
        </p>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label htmlFor="serviceDate" className={labelCls}>Service date</label>
          <input
            id="serviceDate"
            name="serviceDate"
            type="date"
            required
            defaultValue={defaultServiceDate}
            className={fieldCls}
          />
        </div>

        <div>
          <label htmlFor="pdf" className={labelCls}>Bulletin PDF</label>
          <input
            id="pdf"
            name="pdf"
            type="file"
            accept="application/pdf"
            required
            className="w-full rounded-lg border border-dashed border-line bg-paper px-3.5 py-2.5 text-sm text-ink file:mr-3 file:rounded-full file:border-0 file:bg-church file:px-3.5 file:py-1.5 file:text-xs file:font-medium file:text-ink"
          />
          <p className="mt-1.5 text-xs text-slate">PDF only, up to 15MB.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="theme" className={labelCls}>Theme (optional)</label>
            <input id="theme" name="theme" defaultValue={defaultTheme ?? ""} className={fieldCls} placeholder="e.g. A Life of Prayer" />
          </div>
          <div>
            <label htmlFor="scripture" className={labelCls}>Scripture reading (optional)</label>
            <input id="scripture" name="scripture" defaultValue={defaultScripture ?? ""} className={fieldCls} placeholder="e.g. Philippians 4:6-7" />
          </div>
          <div>
            <label htmlFor="sermonTitle" className={labelCls}>Sermon title (optional)</label>
            <input id="sermonTitle" name="sermonTitle" defaultValue={defaultSermonTitle ?? ""} className={fieldCls} />
          </div>
          <div>
            <label htmlFor="sermonSpeaker" className={labelCls}>Speaker (optional)</label>
            <input id="sermonSpeaker" name="sermonSpeaker" defaultValue={defaultSermonSpeaker ?? ""} className={fieldCls} />
          </div>
        </div>

        {state.status !== "idle" && (
          <p className={`text-sm ${state.status === "error" ? "text-red-700" : "text-church-deep"}`}>{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="flex w-fit items-center gap-1.5 rounded-full bg-church px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <Upload className="h-3.5 w-3.5" />
          {pending ? "Uploading…" : "Upload bulletin"}
        </button>
      </form>
    </div>
  );
}
