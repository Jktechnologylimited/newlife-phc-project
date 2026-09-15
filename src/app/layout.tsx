import type { Metadata } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/public-sans/index.css";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ChatWidget } from "@/components/chat/chat-widget";

export const metadata: Metadata = {
  title: {
    default: "Newlife Baptist Church & School",
    template: "%s · Newlife Baptist Church",
  },
  description:
    "Newlife Baptist Church and Newlife Baptist Church School, Port Harcourt — share one campus, one family, and one website: worship, sermons, events, admissions, and academics all in one place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-paper text-ink antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <ChatWidget />
      </body>
    </html>
  );
}
