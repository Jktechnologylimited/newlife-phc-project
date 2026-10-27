import { school, church, telephoneHref, whatsappHref } from "@/lib/institution";

export type GuideScope = "school" | "church";
export type GuideSource = { label: string; href: string };
export type GuideEntry = {
  id: string;
  title: string;
  question: string;
  aliases: string[];
  paragraphs: string[];
  sources: GuideSource[];
  scope?: GuideScope;
  handoff?: boolean;
};
export type GuideAnswer = {
  topic: string;
  title: string;
  paragraphs: string[];
  sources: GuideSource[];
  handoff: boolean;
  scope: GuideScope;
};
export const MAX_GUIDE_QUESTION = 400;
const page = (label: string, href: string): GuideSource => ({ label, href });
const schoolHome = page("School home", "/");
const schoolStory = page("Our school story", "/school/about");
const academics = page("Learning at Newlife", "/school/academics");
const gallery = page("School photographs", "/school/gallery");
const schoolContact = page("School contact & enquiries", "/school/contact");
const churchHome = page("Explore the church", "/church");
const churchStory = page("Church & school story", "/church/about");
const churchContact = page("Church enquiries", "/church/contact");

/** Uses approved institutional content, never the legacy demonstration data.
 * Update facts in institution.ts; add guide aliases here when a topic is added.
 */
export const guideEntries: GuideEntry[] = [
  {
    id: "assistant",
    title: "Your Newlife site guide",
    question: "Are you an AI chatbot?",
    aliases: [
      "ai",
      "chatbot",
      "bot",
      "robot",
      "automated",
      "who are you",
      "how do you work",
    ],
    paragraphs: [
      "I’m an automated site guide that gives quick answers from Newlife’s confirmed website information and points you to relevant pages. For personal help or the latest details, you can speak with the school team on WhatsApp.",
    ],
    sources: [],
    handoff: true,
  },
  {
    id: "chat-privacy",
    title: "Your conversation",
    question: "Do you save my chat messages?",
    aliases: [
      "privacy",
      "save my",
      "save messages",
      "store messages",
      "chat history",
      "my data",
      "delete messages",
      "personal information",
    ],
    paragraphs: [
      "This guide keeps the conversation in this open browser tab. It does not create an account or send your questions to a remote AI service. Use the new-conversation button to clear the chat.",
      "If you choose the WhatsApp handoff, your latest question is placed in an editable message. Nothing is sent until you send it in WhatsApp.",
    ],
    sources: [],
  },

  {
    id: "school",
    title: "Welcome to Newlife",
    question: "Tell me about the school",
    aliases: [
      "about the school",
      "about newlife",
      "what is newlife",
      "school overview",
      "school information",
      "tell me about newlife",
    ],
    paragraphs: [
      school.introduction ?? school.name,
      `Our motto is “${school.motto}”. The school is in ${school.locality}. You can explore our story, photographs and school enquiry information on this website.`,
    ],
    sources: [schoolHome, schoolStory],
    scope: "school",
  },
  {
    id: "history",
    title: "Our school story",
    question: "How did Newlife begin?",
    aliases: [
      "history",
      "story",
      "founded",
      "established",
      "begin",
      "began",
      "started",
      "founding",
      "what year",
      "how old",
      "since when",
      "first children",
      "four children",
    ],
    paragraphs: school.story,
    sources: [schoolStory],
    scope: "school",
  },
  {
    id: "founder",
    title: "The people at the beginning",
    question: "Who founded the school?",
    aliases: [
      "founder",
      "who founded",
      "who started",
      "doris",
      "abili",
      "stella",
      "dodo",
      "first head teacher",
      "first headteacher",
      "pioneer",
    ],
    paragraphs: [school.story[0], school.story[1]],
    sources: [schoolStory],
    scope: "school",
  },
  {
    id: "ownership",
    title: "The church & school connection",
    question: "How are the church and school connected?",
    aliases: [
      "ownership",
      "owns",
      "owner",
      "owned",
      "connection",
      "connected",
      "relationship",
      "church and school",
      "church school",
      "1996",
      "apapa",
    ],
    paragraphs: [school.story[2]],
    sources: [schoolStory, churchStory],
  },
  {
    id: "pta",
    title: "The Parent–Teacher Association",
    question: "When was the PTA formed?",
    aliases: [
      "pta",
      "parent teacher",
      "parents teachers",
      "association",
      "1999",
      "ajibare",
      "lebari",
      "perimeter fence",
    ],
    paragraphs: [school.story[3]],
    sources: [schoolStory],
    scope: "school",
  },
  {
    id: "motto",
    title: "Learning and Growing in God",
    question: "What is the school motto?",
    aliases: [
      "motto",
      "slogan",
      "philosophy",
      "learning and growing",
      "educational approach",
      "christian",
      "faith",
      "school values",
      "school mission",
      "school vision",
    ],
    paragraphs: [
      `The school’s motto is “${school.motto}”. It expresses the connection between education and faith in Newlife’s identity.`,
      "A separate official mission or vision statement is not published on the main school pages. Please ask the school team if you need one.",
    ],
    sources: [academics, schoolStory],
    scope: "school",
  },
  {
    id: "academics",
    title: "Academic enquiries",
    question: "Which academic levels are available?",
    aliases: [
      "academic",
      "academics",
      "curriculum",
      "programmes",
      "programs",
      "subjects",
      "class",
      "classes",
      "levels",
      "ages",
      "age",
      "nursery",
      "primary",
      "secondary",
      "grade",
      "year 13",
      "year 12",
      "teaching",
      "learning",
    ],
    paragraphs: school.programmes.length
      ? school.programmes.map((p) => `${p.title}: ${p.description}`)
      : [
          "The official story describes Newlife’s beginnings as a nursery and primary school in 1994. That is historical information; it does not confirm today’s academic levels.",
          "For current levels, curriculum, subjects and entry requirements, please speak with the school team.",
        ],
    sources: [academics, schoolContact],
    scope: "school",
    handoff: !school.programmes.length,
  },
  {
    id: "admissions",
    title: "Joining the school",
    question: "How can I enquire about admission?",
    aliases: [
      "admission",
      "admissions",
      "apply",
      "application",
      "enrol",
      "enroll",
      "enrolment",
      "enrollment",
      "register",
      "registration",
      "entry",
      "requirements",
      "deadline",
      "admisson",
    ],
    paragraphs: [
      "Please contact the school team to discuss admission, available academic levels and entry requirements. Current application dates, documents and places are not confirmed on the main school pages.",
      `You can call ${school.telephone} or ask the school team on WhatsApp. You do not need a website account to make an enquiry.`,
    ],
    sources: [academics, schoolContact],
    scope: "school",
    handoff: true,
  },
  {
    id: "fees",
    title: "School fees",
    question: "What are the school fees?",
    aliases: [
      "fees",
      "fee",
      "tuition",
      "cost",
      "price",
      "prices",
      "payment",
      "pay",
      "scholarship",
      "scholarships",
      "financial aid",
      "how much",
    ],
    paragraphs: [
      "Current school fees, payment arrangements and any scholarship information are not confirmed in the main school information. I don’t want to give you an unverified amount.",
      "Please ask the school team for the current fee schedule for your child’s level.",
    ],
    sources: [schoolContact],
    scope: "school",
    handoff: true,
  },
  {
    id: "visit",
    title: "Planning a school visit",
    question: "Can I visit the school?",
    aliases: [
      "visit",
      "tour",
      "come to school",
      "see the school",
      "campus visit",
      "appointment",
    ],
    paragraphs: [
      `The school is in ${school.locality}. Please call or WhatsApp the school to confirm the exact location and arrange your visit before travelling.`,
      "Opening hours, term dates and visiting times are not confirmed on the main school pages.",
    ],
    sources: [schoolContact, gallery],
    scope: "school",
    handoff: true,
  },
  {
    id: "location",
    title: "Finding the school",
    question: "Where is the school located?",
    aliases: [
      "where",
      "located",
      "location",
      "address",
      "directions",
      "map",
      "rumueme",
      "port harcourt",
    ],
    paragraphs: [
      `${school.name} is in ${school.locality}.`,
      school.address ??
        "An exact street address and map link have not been confirmed. Please call or WhatsApp the school for directions before travelling.",
    ],
    sources: [schoolContact],
    scope: "school",
    handoff: !school.mapUrl,
  },
  {
    id: "hours",
    title: "School hours & dates",
    question: "What time does the school open?",
    aliases: [
      "opening",
      "opens",
      "school hours",
      "closing",
      "school time",
      "school day",
      "term",
      "term dates",
      "calendar",
      "resumption",
      "holiday",
      "holidays",
      "school events",
    ],
    paragraphs: [
      "Current school opening hours, term dates, resumption dates and event schedules are not confirmed on the main school pages. The school team can give you the latest arrangements.",
    ],
    sources: [schoolContact],
    scope: "school",
    handoff: true,
  },
  {
    id: "facilities",
    title: "About the school environment",
    question: "What facilities does the school have?",
    aliases: [
      "facilities",
      "facility",
      "boarding",
      "boarder",
      "transport",
      "bus",
      "buses",
      "uniform",
      "uniforms",
      "laboratory",
      "library",
      "sports",
      "population",
      "how many students",
      "how many pupils",
      "achievements",
      "accreditation",
      "results",
    ],
    paragraphs: [
      "The gallery shows client-supplied photographs of the school buildings, entrance and courtyard. It does not establish a full list of facilities, current enrolment, transport, boarding or academic results.",
      "Please ask the school team about the specific provision you need.",
    ],
    sources: [gallery, schoolContact],
    scope: "school",
    handoff: true,
  },
  {
    id: "gallery",
    title: "A closer look at Newlife",
    question: "Can I see school photographs?",
    aliases: [
      "photo",
      "photos",
      "photograph",
      "photographs",
      "picture",
      "pictures",
      "gallery",
      "building",
      "buildings",
      "courtyard",
      "environment",
      "school life",
      "images",
    ],
    paragraphs: [
      `The school gallery has ${school.photos.length} supplied photographs of Newlife’s buildings and surroundings in ${school.locality}. Select any photograph in the gallery to open a larger view.`,
    ],
    sources: [gallery],
    scope: "school",
  },
  {
    id: "contact",
    title: "Contact the school",
    question: "How do I contact the school?",
    aliases: [
      "contact",
      "number",
      "phone",
      "telephone",
      "call",
      "email",
      "office",
      "reach",
      "whatsapp",
      "whatsap",
    ],
    paragraphs: [
      `The confirmed school telephone and official WhatsApp number is ${school.telephone}.`,
      school.email
        ? `School email: ${school.email}.`
        : "A school email address is not confirmed. The school’s telephone and WhatsApp are the available enquiry channels.",
    ],
    sources: [
      schoolContact,
      page("Call the school", telephoneHref(school.telephone!)),
    ],
    scope: "school",
    handoff: true,
  },
  {
    id: "human",
    title: "Speak with a person",
    question: "Can I talk to a human?",
    aliases: [
      "human",
      "person",
      "someone",
      "agent",
      "representative",
      "help from staff",
      "speak to staff",
      "talk to staff",
      "more help",
      "not helpful",
    ],
    paragraphs: [
      `You can continue with the school team on WhatsApp at ${school.whatsapp}. Use the handoff button below to open an editable enquiry message.`,
      "This is the school’s confirmed contact. Messages are sent only when you choose to send them in WhatsApp; a live response time is not confirmed.",
    ],
    sources: [schoolContact],
    handoff: true,
  },
  {
    id: "church",
    title: "Newlife Baptist Church",
    question: "Tell me about the church",
    aliases: [
      "about the church",
      "church overview",
      "church story",
      "church history",
      "church founded",
      "church ownership",
      "church connection",
    ],
    paragraphs: [church.introduction!, ...church.story],
    sources: [churchHome, churchStory],
    scope: "church",
  },
  {
    id: "church-contact",
    title: "Church enquiries",
    question: "How do I contact the church?",
    aliases: [
      "contact",
      "number",
      "phone",
      "telephone",
      "email",
      "whatsapp",
      "human",
      "person",
      "pastor",
      "leadership",
      "elder",
      "deacon",
      "minister",
      "office",
      "where",
      "address",
      "location",
      "directions",
      "visit",
      "map",
    ],
    paragraphs: [
      "A separate church telephone, WhatsApp, exact meeting address and current leadership details are not confirmed in the main church information.",
      `The confirmed number ${school.telephone} belongs to the school, so I won’t present it as the church office. Please confirm church arrangements directly before travelling.`,
    ],
    sources: [churchContact, churchHome],
    scope: "church",
    handoff: true,
  },
  {
    id: "worship",
    title: "Worship & church information",
    question: "What time are church services?",
    aliases: [
      "service",
      "services",
      "worship",
      "sunday",
      "sermon",
      "sermons",
      "hymn",
      "hymns",
      "bible",
      "beliefs",
      "church mission",
      "church vision",
      "prayer",
      "pray",
      "ministry",
      "ministries",
      "volunteer",
      "small group",
      "donation",
      "donate",
      "giving",
      "tithe",
      "offering",
      "church events",
    ],
    paragraphs: church.services.length
      ? church.services.map((s) => `${s.title}: ${s.time}`)
      : [
          "Current worship times, service arrangements, church events and ministry details are not confirmed on the main church pages. Please verify them directly with the church.",
          "I can help you explore the verified church overview and its connection with the school.",
        ],
    sources: [churchHome, churchContact],
    scope: "church",
    handoff: true,
  },
  {
    id: "account",
    title: "Existing account access",
    question: "Where do I sign in?",
    aliases: [
      "login",
      "log in",
      "sign in",
      "portal",
      "account",
      "password",
      "dashboard",
    ],
    paragraphs: [
      "The website retains an existing sign-in area. I cannot access accounts, student records or passwords. For general school enquiries, use the school contact page; you do not need to sign in.",
    ],
    sources: [page("Existing sign-in", "/login"), schoolContact],
  },
  {
    id: "website",
    title: "Finding your way around",
    question: "What can I explore on this website?",
    aliases: [
      "website",
      "site",
      "navigation",
      "pages",
      "links",
      "browse",
      "sitemap",
      "explore",
      "everything",
    ],
    paragraphs: [
      "The main website puts the school first: its story, educational identity, photographs and contact information. There is also a dedicated church section with the verified church–school story.",
    ],
    sources: [
      schoolHome,
      schoolStory,
      academics,
      gallery,
      schoolContact,
      churchHome,
      churchStory,
      churchContact,
    ],
  },
  {
    id: "team",
    title: "The website team",
    question: "Who powers this website?",
    aliases: [
      "powered",
      "technical team",
      "built the website",
      "designed the website",
      "website team",
      "credit",
      "credits",
    ],
    paragraphs: ["Powered by Newlife Baptist Church Technical Team."],
    sources: [schoolHome],
  },
];

function normalize(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
function includesPhrase(text: string, phrase: string) {
  return ` ${text} `.includes(` ${normalize(phrase)} `);
}

export function getGuideAnswer(
  input: string,
  context: {
    path?: string;
    previousTopic?: string;
    previousScope?: GuideScope;
  } = {},
): GuideAnswer {
  const text = normalize(input.slice(0, MAX_GUIDE_QUESTION));
  const schoolNamed = includesPhrase(text, "school");
  const churchNamed = includesPhrase(text, "church");
  let scope: GuideScope =
    churchNamed && !schoolNamed
      ? "church"
      : schoolNamed
        ? "school"
        : (context.previousScope ??
          (context.path?.startsWith("/church") ? "church" : "school"));
  // Worship-specific questions imply the church even from a school page.
  if (
    !schoolNamed &&
    /\b(service|services|worship|sunday|sermon|sermons|hymns|pastor|prayer|ministries|tithe|donation)\b/.test(
      text,
    )
  )
    scope = "church";
  const response = (entry: GuideEntry): GuideAnswer => ({
    topic: entry.id,
    title: entry.title,
    paragraphs: entry.paragraphs,
    sources: entry.sources,
    handoff: Boolean(entry.handoff),
    scope,
  });
  if (
    /^(hi|hello|hey|good morning|good afternoon|good evening)( there)?$/.test(
      text,
    )
  )
    return {
      topic: "greeting",
      title: "Welcome to Newlife",
      paragraphs: [
        "Hello! I’m the automated Newlife site guide. I can help with the school’s story, academic enquiries, photographs, contacts and the church section. What would you like to know?",
      ],
      sources: [],
      handoff: false,
      scope,
    };
  if (
    /^(thanks|thank you|thank you very much|great thanks|ok thanks)$/.test(text)
  )
    return {
      topic: "thanks",
      title: "You’re very welcome",
      paragraphs: [
        "You’re welcome! Ask another question whenever you like, or continue with the school team on WhatsApp for more help.",
      ],
      sources: [],
      handoff: false,
      scope,
    };
  if (
    /^(tell me more|more|go on|continue|more details|explain more)$/.test(text)
  ) {
    const previous = guideEntries.find((e) => e.id === context.previousTopic);
    if (previous)
      return response(
        previous.id === "founder" || previous.id === "ownership"
          ? guideEntries.find((e) => e.id === "history")!
          : previous,
      );
  }
  if (text === "school")
    return response(guideEntries.find((e) => e.id === "school")!);
  if (text === "church")
    return response(guideEntries.find((e) => e.id === "church")!);
  const ranked = guideEntries
    .filter((entry) => !entry.scope || entry.scope === scope)
    .map((entry) => {
      const aliases = [entry.question, ...entry.aliases];
      const score = Math.max(
        ...aliases.map((alias) =>
          text === normalize(alias)
            ? 100
            : includesPhrase(text, alias)
              ? 4 + normalize(alias).split(" ").length * 3
              : 0,
        ),
      );
      return { entry, score };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score);
  if (ranked[0]) return response(ranked[0].entry);
  return {
    topic: "unknown",
    title: "Let’s find the right information",
    paragraphs: [
      "I don’t have a confirmed answer to that in the main site information. I can help you explore Newlife’s story, academic enquiries, photographs, contacts and church overview.",
      scope === "church"
        ? "For church-specific arrangements, please confirm directly with the church. The WhatsApp handoff below is to the school team, not a verified church office contact."
        : "For a more specific answer, you can continue with the school team on WhatsApp.",
    ],
    sources:
      scope === "church"
        ? [churchHome, churchContact]
        : [schoolContact, schoolHome],
    handoff: true,
    scope,
  };
}

export function humanWhatsappHref(question = "", scope: GuideScope = "school") {
  if (!school.whatsapp) return undefined;
  const enquiry = question.trim().slice(0, MAX_GUIDE_QUESTION);
  const message = `Hello, I’m visiting the Newlife website and would like to speak with the school team.${scope === "church" ? " I have a church-related enquiry and understand this is the school’s contact." : ""}${enquiry ? `\n\nMy question: ${enquiry}` : ""}`;
  return (
    whatsappHref(school.whatsapp, school.name).split("?")[0] +
    `?text=${encodeURIComponent(message)}`
  );
}
export const suggestedQuestions = {
  school: [
    "Tell me about the school",
    "How can I enquire about admission?",
    "Where is the school located?",
    "Can I see school photographs?",
  ],
  church: [
    "Tell me about the church",
    "How are the church and school connected?",
    "What time are church services?",
    "How do I contact the church?",
  ],
};

/** Retained for existing callers; the widget uses structured answers and sources. */
export function matchFaq(input: string) {
  return getGuideAnswer(input).paragraphs.join("\n\n");
}
