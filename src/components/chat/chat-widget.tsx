"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Church,
  Clock,
  Images,
  Compass,
  MapPin,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { WhatsappGlyph } from "@/components/icons/social";
import { containDialogFocus } from "@/lib/dialog-keyboard";
import {
  getGuideAnswer,
  humanWhatsappHref,
  MAX_GUIDE_QUESTION,
  suggestedQuestions,
  type GuideAnswer,
  type GuideScope,
} from "@/lib/faq";

// Conversations stay in this tab's React state. No account, storage or remote AI API.
type ChatMessage =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; answer: GuideAnswer };
const quickIcons = {
  school: [BookOpen, Compass, MapPin, Images],
  church: [Church, BookOpen, Clock, MessageCircle],
};

export function ChatWidget() {
  const pathname = usePathname();
  const scope: GuideScope = pathname.startsWith("/church")
    ? "church"
    : "school";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const context = useRef<{
    previousTopic?: string;
    previousScope?: GuideScope;
  }>({});
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    dialogRef.current?.close();
    context.current = {
      previousScope: pathname.startsWith("/church") ? "church" : "school",
    };
  }, [pathname]);
  useEffect(
    () => () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    },
    [],
  );
  useLayoutEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = messages.length ? log.scrollHeight : 0;
  }, [messages, busy, open]);

  const isBare =
    pathname.startsWith("/portal") ||
    ["/login", "/signup", "/forgot-password"].includes(pathname);
  if (isBare) return null;

  const lastQuestion = [...messages]
    .reverse()
    .find((message) => message.role === "user");
  const lastAnswer = [...messages]
    .reverse()
    .find((message) => message.role === "assistant");
  const handoffScope =
    scope === "church"
      ? "church"
      : lastAnswer?.role === "assistant"
        ? lastAnswer.answer.scope
        : scope;
  const handoff = humanWhatsappHref(
    lastQuestion?.role === "user" ? lastQuestion.text : "",
    handoffScope,
  );
  const needsHuman =
    lastAnswer?.role === "assistant" && lastAnswer.answer.handoff;

  function close() {
    dialogRef.current?.close();
  }
  function reset() {
    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = null;
    setMessages([]);
    setInput("");
    setBusy(false);
    context.current = { previousScope: scope };
    inputRef.current?.focus();
  }
  function send(raw: string) {
    const question = raw.trim().slice(0, MAX_GUIDE_QUESTION);
    if (!question || replyTimer.current) return;
    const answer = getGuideAnswer(question, {
      path: pathname,
      ...context.current,
    });
    setMessages((previous) => [
      ...previous.slice(-38),
      { id: ++nextId.current, role: "user", text: question },
    ]);
    setInput("");
    setBusy(true);
    // A brief visual response state; answers are retrieved locally from site facts.
    replyTimer.current = setTimeout(() => {
      context.current = {
        previousTopic: answer.topic,
        previousScope: answer.scope,
      };
      setMessages((previous) => [
        ...previous,
        { id: ++nextId.current, role: "assistant", answer },
      ]);
      replyTimer.current = null;
      setBusy(false);
    }, 280);
  }

  return (
    <>
      <button
        className="guide-launcher"
        type="button"
        aria-label="Open Newlife site guide"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="newlife-site-guide"
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
      >
        <span className="guide-launcher-icon">
          <MessageCircle size={19} aria-hidden="true" />
        </span>
        <span>Ask Newlife</span>
        <Sparkles size={13} aria-hidden="true" />
      </button>
      <dialog
        id="newlife-site-guide"
        ref={dialogRef}
        className="guide-dialog"
        aria-labelledby="guide-title"
        aria-describedby="guide-description"
        onKeyDown={containDialogFocus}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            close();
        }}
      >
        <div className="guide-shell">
          <header className="guide-header">
            <span className="guide-brand-icon">
              <Sparkles size={21} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <h2 id="guide-title">
                Newlife guide<span>.</span>
              </h2>
              <p id="guide-description">
                School &amp; Church · Automated site guide
              </p>
            </div>
            <div className="guide-header-actions">
              <button
                type="button"
                onClick={reset}
                disabled={!messages.length && !busy}
                aria-label="Start a new conversation"
                title="Start a new conversation"
              >
                <RotateCcw size={17} />
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close Newlife site guide"
              >
                <X size={21} />
              </button>
            </div>
          </header>
          <div className="guide-reading-area" ref={logRef}>
            {!messages.length ? (
              <div className="guide-welcome">
                <span className="guide-welcome-label">
                  A little guidance. A warm welcome.
                </span>
                <h3>How can we help?</h3>
                <p>
                  Ask about Newlife’s story, school enquiries, photographs or
                  church information. I’ll help you find your way.
                </p>
                <div
                  className="guide-suggestions"
                  aria-label="Suggested questions"
                >
                  {suggestedQuestions[scope].map((question, index) => {
                    const Icon = quickIcons[scope][index];
                    return (
                      <button
                        key={question}
                        type="button"
                        disabled={busy}
                        onClick={() => send(question)}
                      >
                        <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                        <span>{question}</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <div
              className="guide-log"
              role="log"
              aria-label="Conversation"
              aria-live="polite"
              aria-relevant="additions text"
              aria-busy={busy}
            >
              {messages.map((message) =>
                message.role === "user" ? (
                  <div key={message.id} className="guide-user-message">
                    <span className="sr-only">You: </span>
                    <p>{message.text}</p>
                  </div>
                ) : (
                  <article key={message.id} className="guide-answer">
                    <div className="guide-answer-label">
                      <Sparkles size={12} aria-hidden="true" />
                      <span>Newlife guide</span>
                    </div>
                    <h3>{message.answer.title}</h3>
                    {message.answer.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                    {message.answer.sources.length > 0 && (
                      <div
                        className="guide-sources"
                        aria-label="Related site pages"
                      >
                        {message.answer.sources.map((source) =>
                          source.href.startsWith("/") ? (
                            <Link
                              href={source.href}
                              key={source.href}
                              onClick={close}
                            >
                              {source.label}
                              <ArrowRight size={14} aria-hidden="true" />
                            </Link>
                          ) : (
                            <a href={source.href} key={source.href}>
                              {source.label}
                              <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                          ),
                        )}
                      </div>
                    )}
                    {message.answer.handoff && (
                      <span className="guide-confirm-note">
                        For the latest or more specific details, continue with a
                        person.
                      </span>
                    )}
                  </article>
                ),
              )}
              {busy && (
                <div className="guide-typing" role="status">
                  <span />
                  <span />
                  <span />
                  <span className="sr-only">Finding site information</span>
                </div>
              )}
            </div>
          </div>
          {handoff && (
            <aside
              className={`guide-handoff${needsHuman ? " guide-handoff-highlight" : ""}`}
            >
              <div className="guide-handoff-heading">
                <span>Prefer a conversation with a person?</span>
                <span>School team</span>
              </div>
              <a
                href={handoff}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Talk to the school team on WhatsApp"
              >
                <WhatsappGlyph className="h-5 w-5" />
                <span>Talk to the school team</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              {handoffScope === "church" && (
                <p>
                  This is the school’s contact, not a verified church office
                  number.
                </p>
              )}
              <p>
                Your latest question opens as an editable message. Nothing is
                sent automatically.
              </p>
            </aside>
          )}
          <form
            className="guide-form"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <label className="sr-only" htmlFor="guide-question">
              Your question about Newlife
            </label>
            <input
              id="guide-question"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={MAX_GUIDE_QUESTION}
              placeholder="Ask a question about Newlife…"
              autoComplete="off"
              enterKeyHint="send"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send question"
            >
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
          <p className="guide-footnote">
            Automated guidance · No account needed
          </p>
        </div>
      </dialog>
    </>
  );
}
