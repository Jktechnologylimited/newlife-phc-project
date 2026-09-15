"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { pastors } from "@/lib/sample-data";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsappGlyph } from "@/components/icons/social";
import { photoUrl, photoAlt } from "@/lib/photos";
import { faqEntries, matchFaq } from "@/lib/faq";

type ChatMessage = { role: "user" | "assistant"; content: string };

const GREETING_DELAY = 2200;
const GREETING_AUTO_HIDE = 10000;
const THINK_DELAY = 450; // a brief pause so replies don't feel instant/robotic

export function ChatWidget() {
  const pathname = usePathname();
  const experience: "church" | "school" | null = pathname.startsWith("/church")
    ? "church"
    : pathname.startsWith("/school")
      ? "school"
      : null;
  const showWhatsapp = experience === "church";

  const [chatOpen, setChatOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Notify once, shortly after the page loads — dismiss automatically if
  // ignored, or the moment either button is used.
  useEffect(() => {
    const showTimer = setTimeout(() => setGreeting(true), GREETING_DELAY);
    return () => clearTimeout(showTimer);
  }, []);
  useEffect(() => {
    if (!greeting) return;
    const hideTimer = setTimeout(() => setGreeting(false), GREETING_AUTO_HIDE);
    return () => clearTimeout(hideTimer);
  }, [greeting]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, chatOpen, thinking]);

  const isBareRoute =
    pathname.startsWith("/portal") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password";

  const accent = experience === "church" ? "bg-church text-ink" : experience === "school" ? "bg-school text-paper" : "bg-ink text-paper";
  const accentSoft = experience === "church" ? "bg-church-tint text-church-deep" : experience === "school" ? "bg-school-tint text-school-deep" : "bg-stone text-ink";

  function send(text: string) {
    const question = text.trim();
    if (!question || thinking) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const answer = matchFaq(question);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
      setThinking(false);
    }, THINK_DELAY);
  }

  if (isBareRoute) return null;

  const panelBottomClass = showWhatsapp ? "bottom-[9.5rem] sm:bottom-[10rem]" : "bottom-24 sm:bottom-28";

  return (
    <>
      {/* Greeting bubble */}
      <AnimatePresence>
        {greeting && !chatOpen && !whatsappOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed right-5 z-40 w-64 rounded-2xl bg-paper p-4 shadow-2xl sm:right-6",
              showWhatsapp ? "bottom-[9.75rem] sm:bottom-[10.25rem]" : "bottom-24 sm:bottom-28",
            )}
          >
            <button
              onClick={() => setGreeting(false)}
              aria-label="Dismiss"
              className="absolute right-2 top-2 rounded-full p-1 text-slate hover:bg-stone hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="pr-4 text-sm leading-relaxed text-ink">
              👋 Hi! Need help, or want to{" "}
              {showWhatsapp ? "chat with a pastor on WhatsApp" : "ask a quick question"}?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button stack */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {showWhatsapp && (
          <motion.button
            onClick={() => {
              setWhatsappOpen((v) => !v);
              setGreeting(false);
            }}
            aria-label={whatsappOpen ? "Close WhatsApp options" : "Chat on WhatsApp"}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:-translate-y-0.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {whatsappOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <WhatsappGlyph className="h-6 w-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}

        <motion.button
          onClick={() => {
            setChatOpen((v) => !v);
            setGreeting(false);
          }}
          aria-label={chatOpen ? "Close chat" : "Open chat"}
          className={cn("flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:-translate-y-0.5", accent)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {chatOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* WhatsApp popover */}
      <AnimatePresence>
        {whatsappOpen && (
          <motion.div
            role="dialog"
            aria-label="Chat with a pastor on WhatsApp"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-40 w-72 rounded-2xl bg-paper p-2 shadow-2xl sm:bottom-28 sm:right-6"
          >
            <p className="px-3 pb-1 pt-2.5 text-sm font-medium text-ink">Chat with a pastor</p>
            <p className="px-3 pb-2 text-xs text-slate">Opens a WhatsApp conversation, directly with them.</p>
            <div className="flex flex-col gap-1">
              {pastors.map((p) => (
                <a
                  key={p.name}
                  href={whatsappLink(p.whatsapp, `Hi ${p.name.split(" ").slice(-1)[0]}, I'd like to reach out through the New Life website.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWhatsappOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-paper-dim"
                >
                  <span className="relative shrink-0">
                    <span className="relative flex h-11 w-11 overflow-hidden rounded-full bg-stone">
                      <Image src={photoUrl(p.photoKey, 150)} alt={photoAlt(p.photoKey)} fill className="object-cover" />
                    </span>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#25D366] ring-2 ring-paper" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium leading-tight">{p.name}</span>
                    <span className="mt-0.5 flex items-center gap-1 text-xs text-[#1DA851]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                      Available — start a conversation
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Newlife Assistant chat"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed right-5 z-40 flex h-[min(32rem,70vh)] w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl bg-paper shadow-2xl sm:right-6",
              panelBottomClass,
            )}
          >
            <div className={cn("flex items-center gap-2.5 px-5 py-4", accent)}>
              <Sparkles className="h-4 w-4" />
              <div>
                <p className="font-display text-base leading-tight">Newlife Assistant</p>
                <p className="text-xs opacity-80">Quick answers about the church or school</p>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div>
                  <p className="text-sm leading-relaxed text-slate">
                    Hi! Tap a question below, or type your own.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {faqEntries.slice(0, 4).map(({ question }) => (
                      <button
                        key={question}
                        onClick={() => send(question)}
                        className="rounded-lg bg-paper-dim px-3.5 py-2.5 text-left text-sm text-ink transition-colors hover:bg-stone/60"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m, i) => (
                    <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                          m.role === "user" ? accentSoft : "bg-paper-dim text-ink",
                        )}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {thinking && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl bg-paper-dim px-3.5 py-2.5 text-sm text-ink">…</div>
                    </div>
                  )}
                </>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                disabled={thinking}
                className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-slate/70 focus:outline-none focus:ring-2 focus:ring-ink/15 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={thinking || !input.trim()}
                aria-label="Send message"
                className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-opacity disabled:opacity-40", accent)}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
