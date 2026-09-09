import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function SchoolContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-school-deep">Contact</p>
      <h1 className="mt-2 font-display text-4xl">Get in touch with the school office</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        Questions about admissions, academics, or anything else — we&apos;re happy to help.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-5">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-school-deep" />
            <div>
              <p className="text-sm font-medium">Visit us</p>
              <p className="text-sm text-slate">Port Harcourt, Rivers State, Nigeria</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-school-deep" />
            <div>
              <p className="text-sm font-medium">Call us</p>
              <p className="text-sm text-slate">+234 803 123 4580</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-school-deep" />
            <div>
              <p className="text-sm font-medium">Email us</p>
              <p className="text-sm text-slate">admissions@newlifebaptistchurch.org</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-school-deep" />
            <div>
              <p className="text-sm font-medium">Office hours</p>
              <p className="text-sm text-slate">Mon–Fri · 8:00 AM – 4:00 PM</p>
            </div>
          </div>
        </div>
        <ContactForm site="school" />
      </div>
    </div>
  );
}
