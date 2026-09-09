"use client";

import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { submitPrayerRequest, type FormState } from "@/lib/actions";

const initialState: FormState = { status: "idle", message: "" };

const fieldCls =
  "w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/70 focus:outline-none focus:ring-2 focus:ring-church/30";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export function PrayerForm() {
  const [state, formAction, pending] = useActionState(submitPrayerRequest, initialState);
  const [anonymous, setAnonymous] = useState(false);

  return (
    <div className="rounded-2xl bg-paper-dim p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {state.status === "success" ? (
          <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-church-tint text-church-deep">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h3 className="mt-4 font-display text-2xl">We&apos;re praying</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate">{state.message}</p>
          </motion.div>
        ) : (
          <motion.form key="form" action={formAction} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
            <div>
              <label htmlFor="request" className={labelCls}>Your prayer request</label>
              <textarea id="request" name="request" required rows={4} className={fieldCls} placeholder="Share as much or as little as you'd like." />
            </div>
            {!anonymous && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelCls}>Your name</label>
                  <input id="name" name="name" className={fieldCls} />
                </div>
                <div>
                  <label htmlFor="email" className={labelCls}>Email (optional)</label>
                  <input id="email" name="email" type="email" className={fieldCls} />
                </div>
              </div>
            )}
            <label className="flex items-center gap-2 text-sm text-slate">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="h-4 w-4 rounded border-line"
              />
              Submit anonymously
            </label>
            {state.status === "error" && <p className="text-sm text-red-700">{state.message}</p>}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-church px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-fit"
            >
              {pending ? "Sending…" : "Submit a prayer request"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
