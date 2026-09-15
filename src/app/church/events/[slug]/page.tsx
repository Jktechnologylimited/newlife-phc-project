import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, MapPin, Clock, CalendarPlus } from "lucide-react";
import { churchEvents as sampleChurchEvents } from "@/lib/sample-data";
import { getEventBySlug } from "@/lib/data/content";
import { RsvpForm } from "@/components/forms/rsvp-form";

export const revalidate = 60; // re-fetch DB content at most once a minute

export function generateStaticParams() {
  return sampleChurchEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug("church", slug);
  return { title: event ? event.title : "Event" };
}

export default async function ChurchEventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug("church", slug);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
      <Link href="/church/events" className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to events
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-sm font-medium text-church-deep">{event.date}</p>
          <h1 className="mt-1 font-display text-4xl">{event.title}</h1>
          <div className="mt-4 space-y-2 text-sm text-slate">
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {event.time}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {event.location}
            </p>
          </div>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-slate">{event.description}</p>

          <div className="mt-8">
            <p className="mb-2 text-sm font-medium">Add to calendar</p>
            <div className="flex flex-wrap gap-2">
              {["Google Calendar", "Apple Calendar", "Outlook"].map((cal) => (
                <button key={cal} className="flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm hover:border-ink">
                  <CalendarPlus className="h-3.5 w-3.5" />
                  {cal}
                </button>
              ))}
            </div>
          </div>
        </div>

        <RsvpForm eventTitle={event.title} eventSlug={slug} site="church" />
      </div>
    </div>
  );
}
