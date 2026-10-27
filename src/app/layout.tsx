import type { Metadata } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/public-sans/index.css";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { ChatWidget } from "@/components/chat/chat-widget";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: {
    default: "Newlife Baptist School & Church",
    template: "%s · Newlife",
  },
  description:
    "Welcome to Newlife Baptist School and Newlife Baptist Church. School information, church information and enquiries.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-paper text-ink antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ChatWidget />
      </body>
    </html>
  );
}
