"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { sendContactMessage, type FormState } from "@/lib/actions";
import { cn } from "@/lib/utils";

const initialState: FormState = { status: "idle", message: "" };

const fieldCls =
  "w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/70 focus:outline-none focus:ring-2 focus:ring-ink/15";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export function ContactForm({ site }: { site: "church" | "school" }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const accent = site === "church" ? "bg-church text-ink" : "bg-school text-paper";

  return (
    <div className="rounded-2xl bg-paper-dim p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {state.status === "success" ? (
          <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone text-ink">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h3 className="mt-4 font-display text-2xl">Message sent</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate">{state.message}</p>
          </motion.div>
        ) : (
          <motion.form key="form" action={formAction} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
            <input type="hidden" name="site" value={site} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelCls}>Your name</label>
                <input id="name" name="name" required className={fieldCls} />
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>Email address</label>
                <input id="email" name="email" type="email" required className={fieldCls} />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className={labelCls}>Subject</label>
              <input id="subject" name="subject" className={fieldCls} placeholder="What's this about?" />
            </div>
            <div>
              <label htmlFor="message" className={labelCls}>Message</label>
              <textarea id="message" name="message" required rows={4} className={fieldCls} />
            </div>
            {state.status === "error" && <p className="text-sm text-red-700">{state.message}</p>}
            <button
              type="submit"
              disabled={pending}
              className={cn("w-full rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-fit", accent)}
            >
              {pending ? "Sending…" : "Send message"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
