import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "@/components/brand/mark";

export const metadata: Metadata = { title: "Reset Password" };

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 inline-block">
          <Wordmark tagline={false} />
        </Link>
        <h1 className="font-display text-3xl">Reset your password</h1>
        <p className="mt-2 text-sm text-slate">
          Enter your email and, once this is connected, we&apos;ll send a link to reset your password.
        </p>

        <form className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/70 focus:outline-none focus:ring-2 focus:ring-ink/15"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            Send reset link
          </button>
        </form>

        <Link href="/login" className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
