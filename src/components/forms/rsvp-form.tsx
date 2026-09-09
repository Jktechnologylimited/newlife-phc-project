"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { registerForEvent, type FormState } from "@/lib/actions";
import { cn } from "@/lib/utils";

const initialState: FormState = { status: "idle", message: "" };

const fieldCls =
  "w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/70 focus:outline-none focus:ring-2 focus:ring-ink/15";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export function RsvpForm({
  eventTitle,
  accent = "church",
}: {
  eventTitle: string;
  accent?: "church" | "school";
}) {
  const [state, formAction, pending] = useActionState(registerForEvent, initialState);
  const accentTint = accent === "church" ? "bg-church-tint text-church-deep" : "bg-school-tint text-school-deep";
  const accentBtn = accent === "church" ? "bg-church text-ink" : "bg-school text-paper";

  return (
    <div className="rounded-2xl bg-paper-dim p-6">
      <AnimatePresence mode="wait">
        {state.status === "success" ? (
          <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="py-4 text-center">
            <span className={cn("mx-auto flex h-12 w-12 items-center justify-center rounded-full", accentTint)}>
              <CheckCircle2 className="h-6 w-6" />
            </span>
            <h3 className="mt-3 font-display text-xl">You&apos;re registered!</h3>
            <p className="mx-auto mt-1.5 max-w-xs text-sm text-slate">{state.message}</p>
          </motion.div>
        ) : (
          <motion.form key="form" action={formAction} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
            <input type="hidden" name="eventTitle" value={eventTitle} />
            <p className="font-display text-lg">Register for {eventTitle}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className={labelCls}>Full name</label>
                <input id="fullName" name="fullName" required className={fieldCls} />
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>Email address</label>
                <input id="email" name="email" type="email" required className={fieldCls} />
              </div>
              <div>
                <label htmlFor="phone" className={labelCls}>Phone (optional)</label>
                <input id="phone" name="phone" className={fieldCls} />
              </div>
              <div>
                <label htmlFor="attendeeCount" className={labelCls}>Number attending</label>
                <select id="attendeeCount" name="attendeeCount" defaultValue="1" className={fieldCls}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
            {state.status === "error" && <p className="text-sm text-red-700">{state.message}</p>}
            <button
              type="submit"
              disabled={pending}
              className={cn("w-full rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-fit", accentBtn)}
            >
              {pending ? "Registering…" : "Register now"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
