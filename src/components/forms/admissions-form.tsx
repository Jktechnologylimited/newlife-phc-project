"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { submitAdmissionsInquiry, type AdmissionsState } from "@/lib/actions";

const initialState: AdmissionsState = { status: "idle", message: "" };

const fieldCls =
  "w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/70 focus:outline-none focus:ring-2 focus:ring-school/30";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export function AdmissionsForm() {
  const [state, formAction, pending] = useActionState(submitAdmissionsInquiry, initialState);

  return (
    <div className="rounded-2xl bg-paper-dim p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {state.status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-6 text-center"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-school-tint text-school-deep">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h3 className="mt-4 font-display text-2xl">You&apos;re on our list</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate">
              {state.message}
            </p>
            {state.reference && (
              <p className="mt-4 inline-block rounded-full bg-paper-dim px-4 py-1.5 font-mono text-xs text-ink/70">
                Reference {state.reference}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={formAction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="parentName" className={labelCls}>Your full name</label>
                <input id="parentName" name="parentName" required className={fieldCls} placeholder="Jane Rivera" />
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>Email address</label>
                <input id="email" name="email" type="email" required className={fieldCls} placeholder="jane@example.com" />
              </div>
              <div>
                <label htmlFor="phone" className={labelCls}>Phone number</label>
                <input id="phone" name="phone" required className={fieldCls} placeholder="0803 123 4567" />
              </div>
              <div>
                <label htmlFor="reason" className={labelCls}>I&apos;m looking to</label>
                <select id="reason" name="reason" required defaultValue="" className={fieldCls}>
                  <option value="" disabled>Select one</option>
                  <option value="Start an application">Start an application</option>
                  <option value="Schedule a tour">Schedule a campus tour</option>
                  <option value="Ask a general question">Ask a general question</option>
                </select>
              </div>
              <div>
                <label htmlFor="studentName" className={labelCls}>Student&apos;s name</label>
                <input id="studentName" name="studentName" required className={fieldCls} placeholder="Sam Rivera" />
              </div>
              <div>
                <label htmlFor="gradeLevel" className={labelCls}>Grade level</label>
                <select id="gradeLevel" name="gradeLevel" required defaultValue="" className={fieldCls}>
                  <option value="" disabled>Select a grade</option>
                  <option>Nursery</option>
                  <option>Primary (Years 1–6)</option>
                  <option>Secondary (Years 7–13)</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className={labelCls}>Anything we should know? (optional)</label>
              <textarea id="message" name="message" rows={3} className={fieldCls} placeholder="Questions, timing, anything at all." />
            </div>

            {state.status === "error" && (
              <p className="text-sm text-red-700">{state.message}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-school px-5 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-fit"
            >
              {pending ? "Sending…" : "Submit inquiry"}
            </button>
            <p className="text-xs text-slate">
              Your information is secure and only used to follow up about admissions.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
