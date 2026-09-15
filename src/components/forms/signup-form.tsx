"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { User, Mail, Lock } from "lucide-react";
import { signup } from "@/lib/auth/actions";
import { initialAuthState } from "@/lib/auth/types";
import { cn } from "@/lib/utils";

const fieldCls =
  "w-full rounded-lg border border-line bg-paper py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-slate/70 focus:outline-none focus:ring-2 focus:ring-ink/15";

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialAuthState);
  const [role, setRole] = useState<"student" | "parent">("parent");

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-display text-3xl">Create an account</h1>
      <p className="mt-2 text-sm text-slate">
        For students and parents. Staff and admin accounts are set up by the office.
      </p>

      <div className="mt-6 flex rounded-full border border-line p-1">
        {(["parent", "student"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={cn(
              "flex-1 rounded-full py-1.5 text-sm font-medium capitalize transition-colors",
              role === r ? "bg-ink text-paper" : "text-slate hover:bg-stone",
            )}
          >
            {r}
          </button>
        ))}
      </div>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <input type="hidden" name="role" value={role} />
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Full name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
            <input id="name" name="name" required autoComplete="name" placeholder="Jane Rivera" className={fieldCls} />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={fieldCls} />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
            <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" className={fieldCls} />
          </div>
        </div>

        {state.status === "error" && <p className="text-sm text-red-700">{state.message}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Creating account…" : "Create account"}
        </button>

        <p className="text-center text-sm text-slate">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-ink underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
