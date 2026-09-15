"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { login } from "@/lib/auth/actions";
import { initialAuthState } from "@/lib/auth/types";
import { cn } from "@/lib/utils";

const roles = [
  { key: "student", label: "Student" },
  { key: "parent", label: "Parent" },
  { key: "staff", label: "Staff" },
  { key: "admin", label: "Admin" },
] as const;

const fieldCls =
  "w-full rounded-lg border border-line bg-paper py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-slate/70 focus:outline-none focus:ring-2 focus:ring-ink/15";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialAuthState);
  const [role, setRole] = useState<(typeof roles)[number]["key"]>("student");

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-display text-3xl">Sign In</h1>
      <p className="mt-2 text-sm text-slate">
        Use your email and password to continue.
      </p>

      <div className="mt-6 flex rounded-full border border-line p-1">
        {roles.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setRole(r.key)}
            className={cn(
              "flex-1 rounded-full py-1.5 text-sm font-medium transition-colors",
              role === r.key ? "bg-ink text-paper" : "text-slate hover:bg-stone",
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <input type="hidden" name="role" value={role} />
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
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-ink">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs text-slate hover:text-ink">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
            <input id="password" name="password" type="password" required autoComplete="current-password" placeholder="••••••••" className={fieldCls} />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate">
          <input type="checkbox" name="remember" className="h-4 w-4 rounded border-line" />
          Remember me
        </label>

        {state.status === "error" && <p className="text-sm text-red-700">{state.message}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign In"}
        </button>

        <p className="text-center text-sm text-slate">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-ink underline underline-offset-4">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
