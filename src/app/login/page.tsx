import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth/get-session";
import { LoginForm } from "@/components/forms/login-form";
import { Wordmark } from "@/components/brand/mark";
import { Photo } from "@/components/media/photo";
import { photoUrl, photoAlt } from "@/lib/photos";

export const metadata: Metadata = { title: "Sign In" };

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect(`/portal/${session.role}`);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Photo src={photoUrl("churchExterior")} alt={photoAlt("churchExterior")} className="absolute inset-0 h-full w-full" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/0" />
        <div className="relative z-10 flex h-full flex-col justify-end p-10">
          <Wordmark tagline={false} className="text-paper" />
          <h2 className="mt-6 font-display text-3xl text-paper">Welcome back</h2>
          <p className="mt-2 max-w-xs text-sm text-paper/80">
            Sign in to access your portal and resources.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-16">
        <div className="mb-8 lg:hidden">
          <Link href="/">
            <Wordmark tagline={false} />
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
