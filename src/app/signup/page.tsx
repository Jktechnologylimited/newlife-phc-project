import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth/get-session";
import { SignupForm } from "@/components/forms/signup-form";
import { Wordmark } from "@/components/brand/mark";
import { Photo } from "@/components/media/photo";
import { photoUrl, photoAlt } from "@/lib/photos";

export const metadata: Metadata = { title: "Create Account" };

export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect(`/portal/${session.role}`);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Photo src={photoUrl("schoolExterior")} alt={photoAlt("schoolExterior")} className="absolute inset-0 h-full w-full" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/0" />
        <div className="relative z-10 flex h-full flex-col justify-end p-10">
          <Wordmark tagline={false} className="text-paper" />
          <h2 className="mt-6 font-display text-3xl text-paper">Join the family</h2>
          <p className="mt-2 max-w-xs text-sm text-paper/80">
            Create an account to track admissions, results, and everything in between.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-16">
        <div className="mb-8 lg:hidden">
          <Link href="/">
            <Wordmark tagline={false} />
          </Link>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
