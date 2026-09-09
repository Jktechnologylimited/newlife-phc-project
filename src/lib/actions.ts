"use server";

import { z } from "zod";
import { getResend, isEmailConfigured, FROM_EMAIL, OFFICE_EMAIL } from "@/lib/resend";

export type FormState = { status: "idle" | "success" | "error"; message: string };

const emailSchema = z.string().trim().email("Enter a valid email address.");

const admissionsSchema = z.object({
  parentName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(7, "Enter a phone number."),
  studentName: z.string().trim().min(2, "Enter your child's name."),
  gradeLevel: z.string().trim().min(1, "Select a grade level."),
  reason: z.string().trim().min(1, "Let us know what you're looking for."),
  message: z.string().trim().optional(),
});

export type AdmissionsState = FormState & { reference?: string };

const rsvpSchema = z.object({
  eventTitle: z.string().trim().min(1),
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().optional(),
  attendeeCount: z.string().trim().min(1),
});

export async function registerForEvent(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = rsvpSchema.safeParse({
    eventTitle: formData.get("eventTitle"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    attendeeCount: formData.get("attendeeCount"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }
  const data = parsed.data;

  // Phase 2: persist to the `event_registrations` table already defined
  // in the Neon schema, linked to the matching `events.id`.
  if (!isEmailConfigured()) {
    console.info("[rsvp] would register:", data);
    return { status: "success", message: "You're registered! (Demo mode — connect Resend to send real email.)" };
  }

  try {
    const resend = getResend()!;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `You're registered — ${data.eventTitle}`,
      text: `Hi ${data.fullName},\n\nYou're confirmed for ${data.eventTitle} (${data.attendeeCount} attending). We'll send any updates to this address.\n\n— Newlife Baptist Church`,
    });
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OFFICE_EMAIL,
      subject: `New RSVP — ${data.eventTitle}`,
      text: `${data.fullName} (${data.email}${data.phone ? `, ${data.phone}` : ""}) registered ${data.attendeeCount} attendee(s) for ${data.eventTitle}.`,
    });
    return { status: "success", message: "You're registered — check your inbox for confirmation." };
  } catch (err) {
    console.error("[rsvp] resend error", err);
    return { status: "error", message: "Something went wrong sending that. Please try again." };
  }
}

const contactSchema = z.object({
  site: z.string().trim().min(1),
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  subject: z.string().trim().optional(),
  message: z.string().trim().min(5, "Add a short message."),
});

export async function sendContactMessage(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    site: formData.get("site"),
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }
  const data = parsed.data;

  if (!isEmailConfigured()) {
    console.info("[contact] would send:", data);
    return { status: "success", message: "Message sent! (Demo mode — connect Resend to send real email.)" };
  }

  try {
    const resend = getResend()!;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OFFICE_EMAIL,
      subject: `[${data.site}] ${data.subject || "New message"} — from ${data.name}`,
      text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
    });
    return { status: "success", message: "Thanks — someone from our team will reply soon." };
  } catch (err) {
    console.error("[contact] resend error", err);
    return { status: "error", message: "Something went wrong sending that. Please try again." };
  }
}

const prayerSchema = z.object({
  name: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email address.").optional().or(z.literal("")),
  request: z.string().trim().min(5, "Share a little more detail."),
  isAnonymous: z.string().optional(),
});

export async function submitPrayerRequest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = prayerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    request: formData.get("request"),
    isAnonymous: formData.get("isAnonymous")?.toString(),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }
  const data = parsed.data;

  // Phase 2: persist to the `prayer_requests` table so the pastoral team
  // can track and follow up from the admin dashboard.
  if (!isEmailConfigured()) {
    console.info("[prayer] would submit:", data);
    return { status: "success", message: "Received. (Demo mode — connect Resend to send real email.)" };
  }

  try {
    const resend = getResend()!;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OFFICE_EMAIL,
      subject: `New prayer request${data.isAnonymous ? " (anonymous)" : ""}`,
      text: `From: ${data.isAnonymous ? "Anonymous" : data.name || "Unknown"}${data.email ? ` <${data.email}>` : ""}\n\n${data.request}`,
    });
    return { status: "success", message: "We've received your request — our prayer team is praying with you." };
  } catch (err) {
    console.error("[prayer] resend error", err);
    return { status: "error", message: "Something went wrong sending that. Please try again." };
  }
}

export async function submitAdmissionsInquiry(
  _prev: AdmissionsState,
  formData: FormData,
): Promise<AdmissionsState> {
  const parsed = admissionsSchema.safeParse({
    parentName: formData.get("parentName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    studentName: formData.get("studentName"),
    gradeLevel: formData.get("gradeLevel"),
    reason: formData.get("reason"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  const data = parsed.data;
  const reference = `NBCS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Phase 2: persist this inquiry to Neon (an `admissions_inquiries` table)
  // so the admin dashboard can track and follow up on it. For now it's
  // relayed straight to the office by email.
  if (!isEmailConfigured()) {
    console.info("[admissions] would notify office:", { ...data, reference });
    return {
      status: "success",
      message: "Thanks! (Demo mode — connect Resend to send real email.)",
      reference,
    };
  }

  try {
    const resend = getResend()!;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OFFICE_EMAIL,
      subject: `New admissions inquiry — ${data.studentName} (${data.gradeLevel})`,
      text: [
        `Reference: ${reference}`,
        `Reason: ${data.reason}`,
        `Parent/Guardian: ${data.parentName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Student: ${data.studentName}`,
        `Grade level: ${data.gradeLevel}`,
        `Message: ${data.message || "—"}`,
      ].join("\n"),
    });
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "We received your inquiry — Newlife Baptist Church School",
      text: `Hi ${data.parentName},\n\nThanks for reaching out about ${data.studentName}'s education. Your reference number is ${reference}. Our admissions team will follow up within two business days.\n\n— Newlife Baptist Church School`,
    });
    return {
      status: "success",
      message: "You're all set. Check your inbox for a confirmation email.",
      reference,
    };
  } catch (err) {
    console.error("[admissions] resend error", err);
    return { status: "error", message: "Something went wrong sending that. Please try again." };
  }
}

export async function subscribeNewsletter(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Enter a valid email address." };
  }
  const email = parsed.data;

  if (!isEmailConfigured()) {
    // No RESEND_API_KEY configured in this environment yet — don't break
    // the form, just log so local development still feels complete.
    console.info(`[newsletter] would subscribe: ${email}`);
    return { status: "success", message: "You're on the list! (Demo mode — connect Resend to send real email.)" };
  }

  try {
    const resend = getResend()!;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "You're subscribed to Newlife Baptist Church updates",
      text: "Thanks for subscribing! You'll hear from the church and school office with news, events, and updates.",
    });
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OFFICE_EMAIL,
      subject: "New newsletter subscriber",
      text: `${email} just subscribed to updates from the website.`,
    });
    return { status: "success", message: "You're on the list — check your inbox for a welcome note." };
  } catch (err) {
    console.error("[newsletter] resend error", err);
    return { status: "error", message: "Something went wrong sending that. Please try again." };
  }
}
