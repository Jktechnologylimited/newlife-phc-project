export const ministries = [
  {
    slug: "worship",
    name: "Worship",
    audience: "All ages",
    desc: "Musicians, vocalists, and tech volunteers who lead our services in song.",
  },
  {
    slug: "youth",
    name: "Youth",
    audience: "Grades 6–12",
    desc: "Weekly gatherings, retreats, and mentorship for middle and high schoolers.",
  },
  {
    slug: "children",
    name: "Children",
    audience: "Ages 0–11",
    desc: "Age-appropriate Bible teaching and childcare during every service.",
  },
  {
    slug: "men",
    name: "Men",
    audience: "Adults",
    desc: "Breakfast studies and service projects that build real friendships.",
  },
  {
    slug: "women",
    name: "Women",
    audience: "Adults",
    desc: "Small groups and retreats centered on scripture and community.",
  },
  {
    slug: "outreach",
    name: "Outreach",
    audience: "All ages",
    desc: "Food distribution, shelter partnerships, and local mission work.",
  },
];

export const smallGroups = [
  { name: "Young Adults", meets: "Tuesdays, weekly", desc: "Ages 18–30, figuring out faith and adulthood together." },
  { name: "Couples", meets: "2nd & 4th Fridays", desc: "Marriage-strengthening discussion over dinner." },
  { name: "Men's Group", meets: "Saturdays, weekly", desc: "Early mornings, coffee, and honest conversation." },
  { name: "Women's Circle", meets: "Wednesdays, weekly", desc: "Scripture study and prayer in members' homes." },
];

export const volunteerOpportunities = [
  { name: "Ushering", desc: "Greet, seat, and help guests feel at home on Sunday mornings." },
  { name: "Children's Ministry", desc: "Support and care for kids during services and events." },
  { name: "Media Team", desc: "Run sound, streaming, and slides for weekend services." },
  { name: "Hospitality", desc: "Serve coffee and connect with newcomers before service." },
];

export const testimonies = [
  { name: "Sarah Johnson", since: "Member since 2019", quote: "God restored my family and gave us a new beginning." },
  { name: "David Okafor", since: "Member since 2021", quote: "Through the prayer team, I found peace during a difficult season." },
  { name: "Blessing Eze", since: "Member since 2020", quote: "The small group has been a blessing in my spiritual growth and friendships." },
];

export const prayerRequestsSample = [
  { name: "Sister Adeola", request: "Healing for my mother", status: "Praying", date: "Apr 21, 2025" },
  { name: "Anonymous", request: "Job opportunity", status: "Praying", date: "Apr 18, 2025" },
  { name: "Brother Tunde", request: "Peace in my family", status: "Praying", date: "Apr 15, 2025" },
];

export const pastors = [
  {
    name: "Pastor Emmanuel Briggs",
    role: "Senior Pastor",
    initials: "EB",
    whatsapp: "2348031234567",
  },
  {
    name: "Pastor Joy Wokoma",
    role: "Associate Pastor",
    initials: "JW",
    whatsapp: "2348031234568",
  },
];

export const elders = [
  { name: "Elder Samuel Amadi", role: "Elder", initials: "SA" },
  { name: "Elder Comfort Pepple", role: "Elder", initials: "CP" },
];

export const deacons = [
  { name: "Deacon Friday Nwosu", role: "Deacon", initials: "FN" },
  { name: "Deacon Blessing Amachree", role: "Deacon", initials: "BA" },
  { name: "Deacon Ibrahim Sokari", role: "Deacon", initials: "IS" },
  { name: "Deacon Patience Wokocha", role: "Deacon", initials: "PW" },
];

// Public-domain hymns only (pre-1900, well outside copyright) — a real
// church can add any hymn they hold rights or a license (e.g. CCLI) for
// via the database; this sample set is intentionally limited to texts
// that are unambiguously free to reproduce.
export const hymns = [
  {
    slug: "amazing-grace",
    title: "Amazing Grace",
    author: "John Newton",
    year: 1779,
    hymnNumber: "202",
    scripture: "Ephesians 2:8",
    verses: [
      "Amazing grace! How sweet the sound\nThat saved a wretch like me!\nI once was lost, but now am found;\nWas blind, but now I see.",
      "'Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed.",
      "Through many dangers, toils, and snares,\nI have already come;\n'Tis grace hath brought me safe thus far,\nAnd grace will lead me home.",
    ],
    chorus: null as string | null,
  },
  {
    slug: "it-is-well-with-my-soul",
    title: "It Is Well with My Soul",
    author: "Horatio Spafford",
    year: 1873,
    hymnNumber: "410",
    scripture: "Philippians 4:7",
    verses: [
      "When peace, like a river, attendeth my way,\nWhen sorrows like sea billows roll;\nWhatever my lot, Thou hast taught me to say,\nIt is well, it is well with my soul.",
      "Though Satan should buffet, though trials should come,\nLet this blest assurance control,\nThat Christ has regarded my helpless estate,\nAnd hath shed His own blood for my soul.",
    ],
    chorus: "It is well (it is well),\nWith my soul (with my soul),\nIt is well, it is well with my soul.",
  },
  {
    slug: "holy-holy-holy",
    title: "Holy, Holy, Holy",
    author: "Reginald Heber",
    year: 1826,
    hymnNumber: "1",
    scripture: "Revelation 4:8",
    verses: [
      "Holy, holy, holy! Lord God Almighty!\nEarly in the morning our song shall rise to Thee;\nHoly, holy, holy! Merciful and mighty!\nGod in three Persons, blessed Trinity!",
      "Holy, holy, holy! All the saints adore Thee,\nCasting down their golden crowns around the glassy sea;\nCherubim and seraphim falling down before Thee,\nWhich wert, and art, and evermore shalt be.",
    ],
    chorus: null as string | null,
  },
  {
    slug: "what-a-friend-we-have-in-jesus",
    title: "What a Friend We Have in Jesus",
    author: "Joseph Scriven",
    year: 1855,
    hymnNumber: "484",
    scripture: "1 Peter 5:7",
    verses: [
      "What a friend we have in Jesus,\nAll our sins and griefs to bear!\nWhat a privilege to carry\nEverything to God in prayer!\nO what peace we often forfeit,\nO what needless pain we bear,\nAll because we do not carry\nEverything to God in prayer!",
      "Have we trials and temptations?\nIs there trouble anywhere?\nWe should never be discouraged;\nTake it to the Lord in prayer.\nCan we find a friend so faithful\nWho will all our sorrows share?\nJesus knows our every weakness;\nTake it to the Lord in prayer!",
    ],
    chorus: null as string | null,
  },
];

export const bulletin = {
  serviceDate: "2026-09-20",
  theme: "A Life of Prayer",
  scripture: "Philippians 4:6-7",
  sermonTitle: "The Power of Prayer",
  sermonSpeaker: "Pastor Emmanuel Briggs",
  orderOfService: [
    { title: "Call to Worship", detail: "" },
    { title: "Opening Hymn", detail: "Holy, Holy, Holy" },
    { title: "Opening Prayer", detail: "" },
    { title: "Welcome & Announcements", detail: "" },
    { title: "Worship in Song", detail: "" },
    { title: "Scripture Reading", detail: "Philippians 4:6-7" },
    { title: "Sermon", detail: "The Power of Prayer — Pastor Emmanuel Briggs" },
    { title: "Hymn of Response", detail: "It Is Well with My Soul" },
    { title: "Offering", detail: "" },
    { title: "Closing Hymn", detail: "Amazing Grace" },
    { title: "Benediction", detail: "" },
  ],
  hymnSlugs: ["holy-holy-holy", "it-is-well-with-my-soul", "amazing-grace"],
  announcements: [
    { title: "Women's Conference", detail: "November 14, 9:00 AM – 4:00 PM, Newlife Fellowship Hall." },
    { title: "Youth Retreat", detail: "November 21, all day, Newlife Retreat Camp — registration closing soon." },
    { title: "New Members Class", detail: "Starts next Sunday after the 11:00 AM service. All welcome." },
  ],
};

export const departments = [
  {
    name: "Mathematics",
    lead: "Dr. Sarah Johnson, Head of Mathematics",
    focus: ["Core mathematics", "Advanced mathematics", "Problem solving & critical thinking"],
  },
  {
    name: "Science",
    lead: "Mr. Daniel Reyes, Head of Science",
    focus: ["Biology, chemistry & physics", "Hands-on lab work", "STEM integration"],
  },
  {
    name: "Humanities",
    lead: "Mrs. Aisha Bello, Head of Humanities",
    focus: ["History & geography", "Scripture & ethics", "Civic engagement"],
  },
  {
    name: "Creative Arts",
    lead: "Ms. Lauren Kim, Head of Creative Arts",
    focus: ["Visual art", "Music & performance", "Creative writing"],
  },
];

export const curriculumLevels = [
  { level: "Early Years", ages: "Ages 3–7", desc: "Play-based foundations for lifelong learning." },
  { level: "Primary", ages: "Years 3–6", desc: "Building core skills with confidence and curiosity." },
  { level: "Secondary", ages: "Years 7–13", desc: "Preparing students for higher education and beyond." },
];

export const clubs = [
  { name: "Debating Club", category: "Academic" },
  { name: "Drama Club", category: "Arts" },
  { name: "Football Club", category: "Sports" },
  { name: "Science Club", category: "Academic" },
  { name: "Music Club", category: "Arts" },
  { name: "Environmental Club", category: "Service" },
];

export const sportsList = ["Football", "Basketball", "Volleyball", "Athletics", "Swimming", "Tennis"];

export const artsList = [
  { name: "Visual Arts", desc: "Painting, design & photography" },
  { name: "Drama", desc: "Theatre, performance & film" },
  { name: "Music", desc: "Choirs & instrumental" },
  { name: "Creative Writing", desc: "Literature & storytelling" },
];

export const schoolNews = [
  {
    slug: "science-fair-showcase",
    title: "Annual Science Fair Showcases Student Innovation",
    date: "Apr 28, 2025",
    category: "Academics",
    excerpt: "Students from every grade presented original research to judges and families.",
  },
  {
    slug: "debate-championship",
    title: "Our Students Win Regional Debate Championship",
    date: "Apr 22, 2025",
    category: "Student Life",
    excerpt: "The senior debate team took first place for the second year running.",
  },
  {
    slug: "stem-lab-opens",
    title: "New STEM Lab Opens on Campus",
    date: "Apr 15, 2025",
    category: "Facilities",
    excerpt: "A newly renovated lab gives students hands-on access to modern equipment.",
  },
];

export const resources = [
  { name: "School Prospectus", type: "PDF · 2.4 MB", desc: "A full overview of programs, admissions, and campus life." },
  { name: "Admissions Guide", type: "PDF · 1.8 MB", desc: "Step-by-step guidance through the application process." },
  { name: "Academic Calendar", type: "PDF · 1.2 MB", desc: "Key term dates for the current school year." },
  { name: "Parent Handbook", type: "PDF · 1.6 MB", desc: "Policies and everyday information for school families." },
];

export const tuition = [
  { level: "Early Years", annual: "₦450,000" },
  { level: "Primary", annual: "₦650,000" },
  { level: "Secondary", annual: "₦850,000" },
];

export const admissionsFaq = [
  { q: "What documents are required?", a: "A completed application, birth certificate, and most recent report card or transcript." },
  { q: "When should I apply?", a: "Our main entry points are September and January, with applications reviewed on a rolling basis." },
  { q: "Can I visit the school before applying?", a: "Yes — book a campus tour any time from the admissions page." },
  { q: "Is there an entrance exam?", a: "Secondary applicants complete a short placement assessment; no exam is required for Early Years or Primary." },
];

export const academicCalendar = [
  { date: "Aug 12", event: "School reopens (Primary & Secondary)" },
  { date: "Aug 18", event: "Orientation week" },
  { date: "Aug 25", event: "Parent-teacher meeting" },
  { date: "Sep 1", event: "First term exams" },
  { date: "Sep 15", event: "Mid-term break" },
  { date: "Sep 29", event: "End of term 1" },
];

export const studentLeadership = [
  "Student Council",
  "Prefect System",
  "Leadership Programs",
  "Alumni Network",
];

/* ------------------------------ Portal demo data ------------------------------ */
export const studentDashboard = {
  name: "David Chinedu",
  gradeLevel: "Primary 5",
  upcomingClasses: [
    { subject: "Mathematics", time: "8:00 – 9:00 AM", room: "Room 5" },
    { subject: "English", time: "9:30 – 10:30 AM", room: "Room 5" },
    { subject: "Science", time: "11:00 AM – 12:00 PM", room: "Lab 2" },
  ],
  pendingAssignments: [
    { title: "Mathematics — Fractions worksheet", due: "Due in 2 days" },
    { title: "English — Book report", due: "Due in 5 days" },
  ],
  recentResults: [
    { subject: "Mathematics", score: 88, maxScore: 100, term: "Term 2" },
    { subject: "English", score: 76, maxScore: 100, term: "Term 2" },
    { subject: "Science", score: 91, maxScore: 100, term: "Term 2" },
  ],
  messages: [
    { from: "Mrs. Adaeze — Class Teacher", preview: "Great work on your project this week!", time: "2h ago" },
    { from: "School Office", preview: "Reminder: Parent-Teacher meeting on Friday.", time: "1d ago" },
  ],
  attendance: "95%",
};

export const parentDashboard = {
  name: "Mrs. Ngozi Chinedu",
  children: [
    { name: "David Chinedu", gradeLevel: "Primary 5", progress: "On track", attendance: "95%", fees: "Paid" },
    { name: "Grace Chinedu", gradeLevel: "Primary 3", progress: "On track", attendance: "98%", fees: "₦0 owed" },
  ],
  recentUpdates: [
    { text: "David scored 88% in Mathematics", time: "Today, 10:24 AM" },
    { text: "School fees payment received", time: "Apr 26, 2025" },
    { text: "Grace's attendance is 100% this week", time: "Apr 22, 2025" },
  ],
};

export const staffDashboard = {
  name: "Mr. Emeka Wosu",
  myClasses: ["Primary 5 — Mathematics", "Primary 5 — English", "Primary 6 — Science"],
  studentCount: 96,
  todaySchedule: [
    { subject: "Primary 5 — Mathematics", time: "8:00 – 9:00 AM" },
    { subject: "Primary 5 — English", time: "9:30 – 10:30 AM" },
    { subject: "Primary 6 — Science", time: "11:00 AM – 12:00 PM" },
  ],
};

export const adminDashboard = {
  totalStudents: 842,
  totalStaff: 68,
  totalClasses: 24,
  pendingAdmissions: 32,
  recentActivity: [
    { text: "New page published: Admissions", time: "2 hours ago" },
    { text: "Event updated: Annual School Fair", time: "4 hours ago" },
    { text: "User role changed: Tunde B. → Staff", time: "6 hours ago" },
    { text: "New admissions inquiry received", time: "8 hours ago" },
  ],
};

export const sermons = [
  {
    slug: "the-power-of-prayer",
    title: "The Power of Prayer",
    speaker: "Pastor Emmanuel Briggs",
    date: "Mar 16, 2025",
    duration: "43:36",
    description:
      "Discover the transformative power of prayer and how it can change your life, your family, and your community. This message walks through what it looks like to bring the whole of ordinary life honestly before God.",
  },
  {
    slug: "walking-in-faith",
    title: "Walking in Faith",
    speaker: "Pastor Emmanuel Briggs",
    date: "Mar 9, 2025",
    duration: "38:12",
    description:
      "Faith isn't the absence of doubt — it's choosing to take the next step anyway. A message on trusting God when the way forward isn't clear.",
  },
  {
    slug: "grace-changes-everything",
    title: "Grace Changes Everything",
    speaker: "Pastor Emmanuel Briggs",
    date: "Mar 2, 2025",
    duration: "41:07",
    description:
      "None of us earn our way to God — and that's the whole point. A look at what changes when grace, not performance, becomes the foundation.",
  },
];

export const churchEvents = [
  {
    slug: "easter-sunday-service",
    date: "APR 12",
    title: "Easter Sunday Service",
    time: "9:00 & 11:00 AM",
    location: "Main Sanctuary",
    description: "A morning of worship celebrating the resurrection — both services include full kids' programming.",
  },
  {
    slug: "womens-conference",
    date: "APR 18",
    title: "Women's Conference",
    time: "9:00 AM – 4:00 PM",
    location: "Newlife Fellowship Hall",
    description: "A day of teaching, worship, and connection for women of every age and season of life.",
  },
  {
    slug: "youth-retreat",
    date: "APR 26",
    title: "Youth Retreat",
    time: "All day",
    location: "Newlife Retreat Camp",
    description: "A weekend away for grades 6–12 — games, worship, and small group discussion in the mountains.",
  },
];

export const schoolEvents = [
  {
    slug: "open-house-campus-tour",
    date: "MAY 12",
    title: "Open House & Campus Tour",
    time: "9:00 AM – 12:00 PM",
    location: "Main Campus",
    description: "Meet our faculty, tour every classroom, and get your admissions questions answered in person.",
  },
  {
    slug: "spirit-day",
    date: "MAY 18",
    title: "Spirit Day",
    time: "8:00 AM – 3:00 PM",
    location: "School Field",
    description: "A school-wide day of games, team colors, and friendly house competition.",
  },
  {
    slug: "arts-festival",
    date: "MAY 26",
    title: "Arts Festival",
    time: "10:00 AM – 3:00 PM",
    location: "Arts Centre",
    description: "Student art, music, and drama on display for the whole Newlife community.",
  },
];
