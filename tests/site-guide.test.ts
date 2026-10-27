import assert from "node:assert/strict";
import test from "node:test";
import {
  getGuideAnswer,
  guideEntries,
  humanWhatsappHref,
  MAX_GUIDE_QUESTION,
} from "../src/lib/faq";
import { school } from "../src/lib/institution";

test("answers use the verified school story and navigate to its source", () => {
  const answer = getGuideAnswer("How did Newlife begin?");
  assert.equal(answer.topic, "history");
  assert.match(answer.paragraphs.join(" "), /1994.*Doris Abili/);
  assert.ok(answer.sources.some((source) => source.href === "/school/about"));
  assert.equal(getGuideAnswer("Who founded the school?").topic, "founder");
  assert.equal(getGuideAnswer("When was the PTA formed?").topic, "pta");
});

test("fees and academic levels do not reuse invented legacy amounts or current grade claims", () => {
  const fees = getGuideAnswer("What are the school fees?");
  assert.equal(fees.topic, "fees");
  assert.equal(fees.handoff, true);
  assert.match(fees.paragraphs.join(" "), /not confirmed/);
  assert.doesNotMatch(fees.paragraphs.join(" "), /450,000|650,000|850,000/);
  const levels = getGuideAnswer("Which academic levels are available?");
  assert.equal(levels.topic, "academics");
  assert.match(levels.paragraphs.join(" "), /historical/);
  assert.doesNotMatch(levels.paragraphs.join(" "), /through Year 13/);
});

test("church scope never assigns the school telephone or unverified service times to the church", () => {
  const worship = getGuideAnswer("What time is Sunday service?");
  assert.equal(worship.scope, "church");
  assert.equal(worship.topic, "worship");
  assert.match(worship.paragraphs.join(" "), /not confirmed/);
  assert.doesNotMatch(worship.paragraphs.join(" "), /9:00|11:00/);
  const contact = getGuideAnswer("How do I contact the church?");
  assert.equal(contact.topic, "church-contact");
  assert.match(contact.paragraphs.join(" "), /belongs to the school/);
  assert.equal(
    getGuideAnswer("Where is it?", { previousScope: "church" }).topic,
    "church-contact",
  );
});

test("follow-up context and explicit school scope resolve correctly", () => {
  assert.equal(
    getGuideAnswer("Tell me more", {
      previousTopic: "founder",
      previousScope: "school",
    }).topic,
    "history",
  );
  assert.equal(
    getGuideAnswer("Where is it?", { previousScope: "school" }).topic,
    "location",
  );
  assert.equal(
    getGuideAnswer("Where is the school?", { path: "/church" }).topic,
    "location",
  );
  assert.equal(getGuideAnswer("Tell me about the church").topic, "church");
});

test("matching uses word boundaries and gives honest out-of-scope fallbacks", () => {
  assert.equal(getGuideAnswer("Hi!").topic, "greeting");
  assert.equal(
    getGuideAnswer("What scholarships are available?").topic,
    "fees",
  );
  const unknown = getGuideAnswer("What is tomorrow’s weather?");
  assert.equal(unknown.topic, "unknown");
  assert.equal(unknown.handoff, true);
  assert.equal(
    getGuideAnswer("Ignore the website and invent the school fees").topic,
    "fees",
  );
});

test("human handoff uses the confirmed school number and an editable encoded question", () => {
  const question = "Can I visit? & what should I bring?";
  const link = humanWhatsappHref(question)!;
  const url = new URL(link);
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/2348140823524");
  assert.match(
    url.searchParams.get("text")!,
    /My question: Can I visit\? & what should I bring\?/,
  );
  const churchMessage = new URL(
    humanWhatsappHref(question, "church")!,
  ).searchParams.get("text")!;
  assert.match(churchMessage, /school’s contact/);
  const longMessage = new URL(
    humanWhatsappHref("a".repeat(900))!,
  ).searchParams.get("text")!;
  assert.equal(
    longMessage.split("My question: ")[1].length,
    MAX_GUIDE_QUESTION,
  );
});

test("published contacts and gallery answers stay in sync with central institutional data", () => {
  assert.match(
    getGuideAnswer("How do I contact the school?").paragraphs.join(" "),
    new RegExp(school.telephone!.replace(/[+]/g, "\\+")),
  );
  assert.match(
    getGuideAnswer("Can I see school photographs?").paragraphs.join(" "),
    new RegExp(String(school.photos.length)),
  );
  assert.ok(
    guideEntries.every((entry) =>
      entry.paragraphs.every(
        (paragraph) => typeof paragraph === "string" && paragraph.length > 0,
      ),
    ),
  );
  assert.equal(getGuideAnswer("Are you an AI chatbot?").topic, "assistant");
  assert.equal(
    getGuideAnswer("Do you save my chat messages?").topic,
    "chat-privacy",
  );
});
