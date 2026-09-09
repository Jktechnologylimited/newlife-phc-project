import Link from "next/link";
import { Skyline } from "@/components/brand/skyline";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center lg:px-8">
      <p className="font-display text-8xl text-ink/15">404</p>
      <h1 className="mt-4 font-display text-3xl">Page not found</h1>
      <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-slate">
        The page you&apos;re looking for doesn&apos;t exist, or it moved
        somewhere we haven&apos;t linked yet.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
      <Skyline className="mt-16 h-auto w-full max-w-md text-ink opacity-70" accentClassName="text-ink" animate={false} />
    </div>
  );
}
