import { Resend } from "resend";

// The app should never crash at build/boot time just because an env var
// isn't set yet (e.g. in local dev before secrets are configured), so we
// lazily construct the client and let callers check `isEmailConfigured()`.
let client: Resend | null = null;

export function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Newlife Baptist Church <hello@newlifebaptistchurch.org>";
export const OFFICE_EMAIL = process.env.OFFICE_EMAIL ?? "office@newlifebaptistchurch.org";
