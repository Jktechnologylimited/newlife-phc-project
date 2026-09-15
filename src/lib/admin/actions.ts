"use server";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth/get-session";

export type BulletinFormState = { status: "idle" | "success" | "error"; message: string };
export const initialBulletinState: BulletinFormState = { status: "idle", message: "" };

const bulletinSchema = z.object({
  serviceDate: z.string().trim().min(1, "Choose a service date."),
  theme: z.string().trim().optional(),
  scripture: z.string().trim().optional(),
  sermonTitle: z.string().trim().optional(),
  sermonSpeaker: z.string().trim().optional(),
});

const MAX_PDF_BYTES = 15 * 1024 * 1024; // 15MB — plenty for a bulletin, keeps uploads fast

export async function uploadBulletin(_prev: BulletinFormState, formData: FormData): Promise<BulletinFormState> {
  // Defense in depth: the portal layout + proxy already restrict
  // /portal/admin/* to admin sessions, but a server action should never
  // trust that alone.
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return { status: "error", message: "You don't have permission to do that." };
  }

  const parsed = bulletinSchema.safeParse({
    serviceDate: formData.get("serviceDate"),
    theme: formData.get("theme"),
    scripture: formData.get("scripture"),
    sermonTitle: formData.get("sermonTitle"),
    sermonSpeaker: formData.get("sermonSpeaker"),
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  const file = formData.get("pdf");
  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Choose a PDF file to upload." };
  }
  if (file.type !== "application/pdf") {
    return { status: "error", message: "Please upload a PDF file." };
  }
  if (file.size > MAX_PDF_BYTES) {
    return { status: "error", message: "That file is too large — please keep it under 15MB." };
  }

  const db = getDb();
  if (!db) {
    return { status: "error", message: "The database isn't connected yet — set DATABASE_URL to enable uploads." };
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { status: "error", message: "File storage isn't connected yet — set BLOB_READ_WRITE_TOKEN to enable uploads." };
  }

  const { serviceDate, theme, scripture, sermonTitle, sermonSpeaker } = parsed.data;

  try {
    const blob = await put(`bulletins/${serviceDate}-${file.name}`, file, { access: "public" });

    await db`
      INSERT INTO bulletins (service_date, theme, scripture_reference, sermon_title, sermon_speaker, pdf_url, pdf_filename)
      VALUES (${serviceDate}, ${theme || null}, ${scripture || null}, ${sermonTitle || null}, ${sermonSpeaker || null}, ${blob.url}, ${file.name})
      ON CONFLICT (service_date) DO UPDATE SET
        theme = EXCLUDED.theme,
        scripture_reference = EXCLUDED.scripture_reference,
        sermon_title = EXCLUDED.sermon_title,
        sermon_speaker = EXCLUDED.sermon_speaker,
        pdf_url = EXCLUDED.pdf_url,
        pdf_filename = EXCLUDED.pdf_filename
    `;

    // Instant invalidation rather than waiting for the 60s ISR window —
    // the admin who just uploaded this should see it live immediately.
    revalidatePath("/church/bulletin");
    revalidatePath("/church");
    revalidatePath("/portal/admin/content");

    return { status: "success", message: "Uploaded — this week's bulletin is now live at /church/bulletin." };
  } catch (err) {
    console.error("[uploadBulletin] error:", err);
    return { status: "error", message: "Something went wrong uploading that. Please try again." };
  }
}
