"use client";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { school, whatsappHref } from "@/lib/institution";
import { WhatsappGlyph } from "@/components/icons/social";
export function SchoolEnquiry() {
  const path = usePathname();
  if ((path !== "/" && !path.startsWith("/school")) || !school.whatsapp)
    return null;
  return (
    <a
      className="whatsapp-enquiry"
      aria-label="School enquiry on WhatsApp"
      href={whatsappHref(school.whatsapp, school.name)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsappGlyph className="h-5 w-5" />
      <span>WhatsApp</span>
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
