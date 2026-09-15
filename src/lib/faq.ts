export type FaqEntry = {
  question: string; // shown as a suggested-prompt button
  keywords: string[]; // lowercase words/phrases checked against user input
  answer: string;
};

export const faqEntries: FaqEntry[] = [
  {
    question: "What time is Sunday service?",
    keywords: ["service time", "sunday", "what time", "when is service", "worship time"],
    answer: "Sunday services are at 9:00 AM and 11:00 AM in the Main Sanctuary. Come as you are — there's no dress code!",
  },
  {
    question: "How do I apply for admissions?",
    keywords: ["admission", "apply", "enroll", "enrolment", "enrollment", "application"],
    answer: "You can start an application anytime at /school/admissions, or book a campus tour first if you'd like to see the school. The team follows up within two business days.",
  },
  {
    question: "Tell me about your ministries",
    keywords: ["ministry", "ministries", "get involved", "small group", "volunteer"],
    answer: "We have Worship, Youth (grades 6–12), Children (ages 0–11), Men, Women, and Outreach ministries. See /church/ministries to find where you fit.",
  },
  {
    question: "Where are you located?",
    keywords: ["location", "located", "address", "where are you", "directions"],
    answer: "We're in Port Harcourt, Rivers State, Nigeria. Reach out via the contact page for exact directions.",
  },
  {
    question: "What are the school fees?",
    keywords: ["fee", "fees", "tuition", "cost", "how much"],
    answer: "Annual tuition is ₦450,000 for Early Years, ₦650,000 for Primary, and ₦850,000 for Secondary. Scholarships and financial aid are available — see /school/admissions/fees.",
  },
  {
    question: "How do I give or donate?",
    keywords: ["give", "giving", "donate", "donation", "tithe", "offering"],
    answer: "You can give online, by bank transfer, or in person during any Sunday service. Visit /church/give for details.",
  },
  {
    question: "Who is the pastor?",
    keywords: ["pastor", "who leads", "leadership", "elder", "deacon"],
    answer: "Our Senior Pastor is Pastor Emmanuel Briggs, alongside Associate Pastor Joy Wokoma, our elders, and the diaconate. See /church/leadership for the full team.",
  },
  {
    question: "How do I contact the church or school?",
    keywords: ["contact", "phone", "email", "reach you", "office"],
    answer: "Church office: office@newlifebaptistchurch.org. School admissions: admissions@newlifebaptistchurch.org. Both are in Port Harcourt, Rivers State.",
  },
  {
    question: "I'd like to submit a prayer request",
    keywords: ["prayer", "pray for", "prayer request"],
    answer: "You can submit a prayer request — anonymously if you'd like — at /church/prayer. Our team prays over every request.",
  },
  {
    question: "What ages does the school serve?",
    keywords: ["age", "grade", "year", "nursery", "primary", "secondary"],
    answer: "The school serves Nursery through Year 13 — Early Years, Primary (Years 1–6), and Secondary (Years 7–13).",
  },
];

const FALLBACK =
  "I don't have an answer for that yet — please reach out through the contact page, or the church office at office@newlifebaptistchurch.org.";

export function matchFaq(input: string): string {
  const text = input.toLowerCase();
  let best: { entry: FaqEntry; score: number } | null = null;

  for (const entry of faqEntries) {
    const score = entry.keywords.filter((k) => text.includes(k)).length;
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  return best ? best.entry.answer : FALLBACK;
}
