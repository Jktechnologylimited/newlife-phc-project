import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ChurchContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-church-deep">Contact</p>
      <h1 className="mt-2 font-display text-4xl">Get in touch</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        We&apos;d love to hear from you — reach out or visit during office hours.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-5">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-church-deep" />
            <div>
              <p className="text-sm font-medium">Visit us</p>
              <p className="text-sm text-slate">123 Community Drive, Riverside, CA 92501</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-church-deep" />
            <div>
              <p className="text-sm font-medium">Call us</p>
              <p className="text-sm text-slate">(555) 123-4567</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-church-deep" />
            <div>
              <p className="text-sm font-medium">Email us</p>
              <p className="text-sm text-slate">office@newlife.church</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-church-deep" />
            <div>
              <p className="text-sm font-medium">Office hours</p>
              <p className="text-sm text-slate">Mon–Fri · 9:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>
        <ContactForm site="church" />
      </div>
    </div>
  );
}
