import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { ArrowUpRight } from "@/components/home/icons";
import { ProgressRing } from "@/components/course/ProgressRing";
import { SharePage } from "@/components/site/SharePage";
import { StorySlider } from "@/components/course/StorySlider";
import { StoryCard, type Story } from "@/components/course/StoryCard";
import { FaqList } from "@/components/course/FaqList";
import {
  IconResults,
  IconPractice,
  IconTarget,
  IconClasses,
  IconSupport,
  IconWindow,
} from "@/components/course/RetakeIcons";

export const metadata: Metadata = {
  title: "Five Term A-Level",
  description:
    "The Five Term A-Level at Edgbaston College — a structured mid-year pathway starting in January that covers the full A-Level in five terms, with small classes and personalised support.",
};

/* --------------------------------- Data --------------------------------- */

const BENEFITS = [
  { Icon: IconCalendarYear, title: "No Gap Year", body: "Students can seamlessly continue their educational journey without the need for a 9-month break (between January and the following September)" },
  { Icon: IconGlobePerson, title: "Ideal for International Students", body: "This program suits students whose academic calendars may not align with a September start" },
  { Icon: IconHandshake, title: "Holistic Support", body: "Five-term students receive the same comprehensive support, including expert advice and guidance for university applications, as our two-year students." },
];

const OFFERS = [
  { Icon: IconResults, title: "Exceptional Grades", body: "Students consistently achieving outstanding A-Level exam results. (76% A*–B in 2023)" },
  { Icon: IconTarget, title: "Bespoke University & Careers Guidance", body: "Receive personalised support from your personal tutor, experienced advisors, and Principal Owais Ahmed throughout your application journey. Our proven track record of successful placements speaks for itself" },
  { Icon: IconClasses, title: "Individual Attention", body: "Benefit from small class sizes (average of 7 students) and dedicated one-on-one time with your personal tutor and subject teachers to ensure you reach your full potential" },
  { Icon: IconPractice, title: "Frequent Exam Practice & Continuous Feedback", body: "Our rigorous approach to exam preparation includes weekly assessments and 3 mock exams throughout the year, each with individualised feedback to pinpoint areas of improvement. This ensures you're always aware of your academic standing and making steady progress toward your goals" },
  { Icon: IconSupport, title: "Supportive environment", body: "As a family-run Sixth Form College, we offer a personal, socially relaxed and supportive environment where every student is encouraged to be ambitious, both academically and in their career" },
  { Icon: IconWindow, title: "Enrichment Program", body: "Enhance your experience with diverse range of clubs, events and exciting trips. Examples include debating society, sports teams, charity fundraisers, cultural excursions, and even go-karting adventures" },
];

const STRUCTURE = [
  { Icon: IconPractice, text: "Students may study between 3–4 subjects" },
  { Icon: IconResults, text: "Full coverage of the A-Level specifications in your chosen subjects" },
  { Icon: IconSupport, text: "Weekly timed assessments and three mock exams, all with personalised feedback, ensure you're on track for success" },
];

const CAREERS_PROGRAM = [
  { n: "01", title: "Regular Careers Trips", body: "Gaining valuable insights into potential career paths and academic choices through visits to universities and employers" },
  { n: "02", title: "Personal Development Sessions", body: "Enhancing their leadership, resilience, teamwork, and other key skills through fortnightly workshops" },
  { n: "03", title: "Guest Speaker Series", body: "Broadening their horizons and discovering diverse career possibilities by hearing from professionals in various fields, such as doctors, investment bankers, and engineers" },
];

const TRANSFORMATIONS = [
  { from: "DE", to: "AA", who: "Manelle · Medicine, Southampton" },
  { from: "UU", to: "AB", who: "Mohammed · Politics, KCL" },
  { from: "BB", to: "A*A*", who: "Adham · Medicine, Bristol" },
];

const STORIES: Story[] = [
  { name: "Alishba", img: "/figma/pathway-1.webp", from: "BB", to: "A*A*", course: "Law at University of Cambridge", quote: "The five-term structure gave me the time and support to completely turn my grades around." },
  { name: "Nicole", img: "/figma/news-1.webp", from: "BB", to: "A*A*", course: "Dentistry at King's College London", quote: "Small classes and weekly mocks gave me the confidence to jump from BB to A*A* and secure my dentistry place." },
  { name: "Tara", img: "/figma/news-2.webp", from: "BB", to: "AA", course: "Medicine at Edge Hill University", quote: "Starting in January suited me perfectly — the personalised UCAS support made all the difference." },
  { name: "Jacob", img: "/figma/pathway-3.webp", from: "CC", to: "A*A", course: "Engineering at University of Warwick", quote: "Weekly assessments kept me on track and my grades climbed two full levels across the year." },
  { name: "Manelle", img: "/figma/pathway-2.webp", from: "DE", to: "AA", course: "Medicine at University of Southampton", quote: "One focused pathway with the right support completely changed where I ended up." },
];

const RESIDENCES = [
  { label: "Closest", name: "Five Ways Residence", walk: "2–3 minute walk to college" },
  { label: "Closest", name: "Beech Gardens, Edgbaston", walk: "4–5 minute walk to college" },
];

const FAQ = [
  { q: "What is the Five Term A-Level?", a: "It's a flexible A-Level pathway that starts in January and covers the full A-Level over five terms — ideal for students who missed the September start but want a complete, well-structured route to university." },
  { q: "Who is the five-term pathway for?", a: "Students who need a mid-year start, are re-planning their sixth form, or want extra time and structure to cover the full A-Level content before sitting exams in the summer series." },
  { q: "When will I sit my exams?", a: "You sit the full A-Level exams in the standard summer series (May–June), fully prepared through weekly assessments and mock exams across the five terms." },
  { q: "How many subjects can I take?", a: "Most students take one to three A-Levels. We build your timetable around exactly the subjects you need for your target university course." },
  { q: "Will I receive UCAS support?", a: "Yes — personalised UCAS guidance from Principal Owais Ahmed is built into the programme, from university selection to your personal statement and interviews." },
  { q: "How do I apply?", a: "Enquire online or call 0121 306 0182. We review your goals, agree your subjects and target grades, and confirm your place — simple and quick." },
];

/* ------------------------------ Small pieces ----------------------------- */

function UnderlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-[12px] font-bold uppercase tracking-wide text-white underline underline-offset-[6px] transition hover:text-white/80">
      {children}
    </a>
  );
}

type IcoP = { className?: string };

/* Benefit-card icons (match the Figma glyphs). */
function IconCalendarYear({ className = "h-10 w-10" }: IcoP) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="7" y="9" width="26" height="24" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 15h26M13 6v5M27 6v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <text x="20" y="28" textAnchor="middle" fontSize="7.5" fontWeight="700" letterSpacing="0.3" fill="currentColor">YEAR</text>
    </svg>
  );
}
function IconGlobePerson({ className = "h-10 w-10" }: IcoP) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <circle cx="15" cy="13" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 30c0-5 4-8 9-8 2.2 0 4.2.6 5.7 1.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="27.5" cy="25.5" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 25.5h15M27.5 18c2.6 2.4 2.6 12.6 0 15M27.5 18c-2.6 2.4-2.6 12.6 0 15" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function IconHandshake({ className = "h-10 w-10" }: IcoP) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path d="M4 15l6-3 8 3 4-2 8 3 2-1v11l-4 1-6-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M22 16l-4 3a2.2 2.2 0 003 3l1-1 3 3a2 2 0 003-3l-1-1 1 1a2 2 0 003-3l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M4 15v10l3 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 8l2 2M14 6l1 2M20 7l1 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconScholarship({ className = "h-9 w-9" }: IcoP) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <circle cx="21" cy="13" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M18.6 13h4.8M21 10.4v5.2M19.8 10.8c1.7-.7 3 .4 3 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5 26c2.6-1.7 4.8-1.2 6.8.3l2.6 1.9h4.7c1.2 0 1.2 1.9 0 1.9h-4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 28.2c3.2 3.2 7 4.4 11 4.4 3.6 0 6.4-2.4 9.2-4.5 1-.8.2-2.4-1-2l-5.1 1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 25v6l2.5 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconEnvelope({ className = "h-9 w-9" }: IcoP) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="6" y="10" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 12l13 10 13-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoAward({ className = "h-6 w-6" }: IcoP) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 13.5 8 22l4-2.2L16 22l-1-8.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 6.6l.9 1.8 2 .3-1.45 1.4.34 2L12 11.15 10.2 12.1l.34-2L9.1 8.7l2-.3.9-1.8Z" fill="currentColor" />
    </svg>
  );
}
function IcoPerson({ className = "h-6 w-6" }: IcoP) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 13c-3.2 0-5 2.2-5 4.8 0 .7.4 1.2 1.2 1.2h7.6c.8 0 1.2-.5 1.2-1.2C17 15.2 15.2 13 12 13Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function IcoCap({ className = "h-6 w-6" }: IcoP) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6 11.5V16c0 1.3 2.7 2.6 6 2.6s6-1.3 6-2.6v-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 9.5V15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IcoBadge({ className = "h-6 w-6" }: IcoP) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="9" cy="10.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 16c0-1.7 1.4-2.8 3-2.8s3 1.1 3 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14.5 9.5H18M14.5 13H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

type Chip = { Icon: (p: IcoP) => React.ReactElement; text: React.ReactNode };

function MiniChip({ Icon, children }: { Icon: (p: IcoP) => React.ReactElement; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-white px-3 py-3 text-[12px] font-semibold leading-snug text-eb-navy sm:flex-col sm:gap-2 sm:py-4 sm:text-center">
      <Icon className="h-6 w-6 shrink-0 text-eb-navy sm:h-7 sm:w-7" />
      <span>{children}</span>
    </div>
  );
}

function RingCard({ value, label, chips }: { value: number; label: string; chips: [Chip, Chip] }) {
  return (
    <div className="flex h-full flex-col gap-2.5 rounded-2xl bg-eb-cream p-2.5">
      <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-white px-5 py-8">
        <ProgressRing value={value} label={label} />
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {chips.map((c, i) => (
          <MiniChip key={i} Icon={c.Icon}>{c.text}</MiniChip>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- Page ---------------------------------- */

export default function FiveTermPage() {
  return (
    <>
      <AnnouncementBar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-eb-navy">
        <Navbar />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/adm-process.webp" alt="Edgbaston College five-term students" className="absolute inset-0 h-full w-full object-cover object-[center_25%]" fetchPriority="high" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="relative mx-auto flex min-h-[420px] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-32 lg:min-h-[460px] lg:px-[60px] lg:pb-12">
          <h1 className="max-w-[320px] text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:max-w-[420px] sm:text-5xl lg:max-w-[520px] lg:text-[56px]">
            Five Term A-Level
          </h1>
        </div>
      </section>

      {/* Breadcrumb + share */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-[60px]">
          <div className="flex flex-col items-center gap-3 border-b border-black/10 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:py-5 sm:text-left">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-eb-navy">Home</Link>
              <span className="px-2 text-neutral-300">/</span>
              <Link href="/courses" className="hover:text-eb-navy">Courses</Link>
              <span className="px-2 text-neutral-300">/</span>
              <span className="font-medium text-eb-navy">Five Term A-Level</span>
            </nav>
            <SharePage title="Five Term A-Level — Edgbaston College" />
          </div>
        </div>
      </div>

      {/* Intro: image + copy */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1440px] items-stretch gap-4 px-4 py-10 sm:gap-5 lg:grid-cols-2 lg:gap-6 lg:px-[60px] lg:py-16">
            <div className="order-1 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/retake-intro.webp" alt="Five-Term A-Level student studying at Edgbaston College" className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto" loading="lazy" decoding="async" />
            </div>
            {/* Text sits on a light card, matching the design */}
            <div className="order-2 flex flex-col justify-center rounded-2xl bg-eb-cream p-6 sm:p-8 lg:p-12">
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-eb-blue sm:text-[13px]">Five-Term A-Level Course</p>
              <h2 className="mt-3 text-[30px] font-extrabold leading-[1.1] tracking-tight text-eb-ink sm:text-4xl lg:text-[44px]">
                Achieve Top Grades In 18 Months
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-eb-navy/75 sm:text-[15px]">
                Our Five-Term (18 Month) A-Level course starts in January of Year 12 and students complete Year 12 A-Level content within the first two terms, with additional support provided by the College. The remaining three terms (Year 13) allow you to progress at a normal pace, culminating in June A-Level exams alongside traditional two-year students.
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-eb-navy/75 sm:text-[15px]">
                We have consistently empowered students to achieve top grades, <strong className="font-semibold text-eb-navy">securing acceptance to prestigious universities and competitive courses</strong>. With an average class size of just 7 students, our teaching is tailored to each individual&apos;s needs. Weekly assessments and regular mock exams provide continuous, individualised feedback, ensuring steady progress and a clear understanding of where students are academically. Our comprehensive careers program further enhances student success, guiding them towards fulfilling and rewarding career paths. This holistic approach has led to outstanding academic achievements and excellent career outcomes for our students.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Benefit of the Five-Term A-Level Course */}
      <Reveal>
        <section className="bg-eb-navy">
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/70 sm:text-[13px]">Five-Term A-Level Benefits</p>
              <h2 className="mt-2 text-[26px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-[44px]">Benefit of the Five-Term A-Level Course</h2>
              <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
                Sometimes a September start isn&apos;t always possible. Whether you&apos;re looking for a fresh start or your academic calendar doesn&apos;t fit the traditional schedule, our Five-Term A-Level course could be the solution.
              </p>
            </div>
            <div className="eb-stagger mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
              {BENEFITS.map(({ Icon, title, body }) => (
                <div key={title} className="eb-card rounded-2xl bg-eb-cream p-6 text-center sm:p-8">
                  <Icon className="mx-auto h-10 w-10 text-eb-navy" />
                  <h3 className="mt-4 text-[18px] font-bold text-eb-navy sm:text-[19px]">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-eb-navy/70 sm:text-[14px]">{body}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-white/70 sm:mt-10 sm:text-[14px]">
              The 18-month A-Level course offers a unique opportunity for motivated students to fast-track their studies without compromising the quality of their education or the personalised support they receive.
            </p>
          </div>
        </section>
      </Reveal>

      {/* What Edgbaston College offers */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-eb-navy sm:text-[13px]">Why Choose Edgbaston College</p>
              <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">What Edgbaston College offers</h2>
            </div>
            <div className="eb-stagger mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
              {OFFERS.map(({ Icon, title, body }) => (
                <div key={title} className="eb-card rounded-2xl bg-eb-cream p-6 text-center sm:p-7">
                  <Icon className="mx-auto h-9 w-9 text-eb-navy" />
                  <h3 className="mt-4 text-[17px] font-bold text-eb-navy sm:text-[18px]">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-eb-navy/70 sm:text-[14px]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Course Structure */}
      <Reveal>
        <section className="bg-eb-navy">
          <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:gap-14 lg:px-[60px] lg:py-16">
            {/* Image — top on mobile, right on desktop */}
            <div className="order-1 overflow-hidden rounded-2xl lg:order-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/adm-process.webp" alt="Students working together at Edgbaston College" className="aspect-[4/3] h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="order-2 lg:order-1">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/70 sm:text-[13px]">How The Structure Works</p>
              <h2 className="mt-2 text-[28px] font-extrabold tracking-tight text-white sm:text-3xl lg:text-[40px]">Course Structure</h2>
              <p className="mt-4 text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
                Students study 3–4 A-Level subjects over two years. The two-year course starts each September and students sit their final A-Level examinations at the end of their two years of study. Students may choose from the whole range of A-Level <Link href="/courses" className="underline underline-offset-2 hover:text-white">subjects offered</Link> in any combination that suits them.
              </p>
              <p className="mt-6 text-[14px] font-bold text-white sm:text-[15px]">Here&apos;s how the structure works:</p>
              <div className="eb-stagger mt-4 flex flex-col gap-3">
                {STRUCTURE.map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-4 rounded-xl bg-white p-4 sm:p-5">
                    <Icon className="h-8 w-8 shrink-0 text-eb-navy" />
                    <p className="text-[13px] font-medium leading-snug text-eb-navy sm:text-[14px]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Individualised Careers Support */}
      <Reveal>
        <section className="bg-eb-cream">
          <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-4 py-10 sm:gap-8 lg:grid-cols-2 lg:gap-14 lg:px-[60px] lg:py-16">
            <div className="order-1 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/retake-intro.webp" alt="Personalised careers support at Edgbaston College" className="aspect-square w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="order-2">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-eb-blue sm:text-[13px]">The Edgbaston Experience</p>
              <h2 className="mt-2 text-[30px] font-extrabold leading-[1.1] tracking-tight text-eb-ink sm:text-4xl lg:text-[46px]">
                Individualised Careers Support
              </h2>
              <p className="mt-6 text-[14px] leading-relaxed text-eb-navy/75 sm:mt-8 sm:text-[15px]">
                Students receive personalised guidance and support with their university and career aspirations. Their dedicated personal tutors, Principal Owais Ahmed, and our experienced educational consultants at <strong className="font-semibold text-eb-navy">Edgbaston Education</strong> work closely with each student to develop a tailored plan, ensuring students are equipped to achieve their individual goals. We offer expert advice on course selection, university applications (including Oxbridge, Medicine, Dentistry, and Law), personal statement crafting, interview preparation, and admissions test support. Our proven track record of successful placements demonstrates our commitment to student success.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Comprehensive College Careers Program */}
      <Reveal>
        <section className="bg-eb-cream">
          <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-2 lg:px-[60px] lg:pb-16 lg:pt-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-eb-navy sm:text-[13px]">The Edgbaston Experience</p>
              <h2 className="mt-2 text-[26px] font-extrabold leading-[1.1] tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">Comprehensive College Careers Program</h2>
              <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-neutral-600 sm:text-[15px]">
                Complementing our one-on-one guidance, our comprehensive careers program provides a wealth of resources and opportunities to explore their options and develop essential skills. Students benefit from:
              </p>
            </div>
            <div className="eb-stagger mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
              {CAREERS_PROGRAM.map(({ n, title, body }) => (
                <div key={n} className="eb-card relative flex min-h-[220px] flex-col justify-end rounded-xl bg-eb-navy p-5 sm:min-h-[280px] sm:p-6 lg:min-h-[300px]">
                  <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/40 font-mono text-[12px] font-bold text-white sm:right-5 sm:top-5 sm:h-11 sm:w-11 sm:text-[13px]">
                    {n}
                  </span>
                  <h3 className="text-[18px] font-bold text-white sm:text-xl lg:text-[22px]">{title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/75 sm:mt-2 sm:text-[14px]">{body}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-neutral-600 sm:text-[14px]">
              This dual approach – combining personalised guidance with a robust college-wide program – ensures that our students receive the support and resources necessary to make informed decisions and thrive in their chosen paths.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/courses"
                className="eb-cta group flex w-full items-center justify-between gap-3 rounded-lg bg-white py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy sm:inline-flex sm:w-auto sm:justify-start sm:text-[13px]"
              >
                Leavers&apos; Destinations
                <span className="eb-square grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-eb-blue text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Success stories */}
      <Reveal>
        <section className="bg-eb-cream">
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-eb-navy sm:text-[13px]">Success Stories</p>
              <h2 className="mt-3 text-[26px] font-extrabold leading-[1.15] tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">Five-term success stories</h2>
              <p className="mx-auto mt-2.5 max-w-[300px] text-[13px] leading-relaxed text-neutral-600 sm:mt-3 sm:max-w-none sm:text-[14px]">Real students, real grade jumps. See how their year went.</p>
            </div>
            <div className="mt-8 sm:mt-10">
              <StorySlider>
                {STORIES.map((s) => (
                  <StoryCard key={s.name} story={s} className="h-[400px] w-[78%] snap-center sm:h-[420px] sm:w-[300px] sm:snap-start" />
                ))}
              </StorySlider>
            </div>
          </div>
        </section>
      </Reveal>

      {/* More 2025 transformations */}
      <Reveal>
        <section className="bg-eb-navy">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-4 py-9 text-center lg:grid lg:grid-cols-[minmax(0,auto)_1fr] lg:items-center lg:gap-x-12 lg:gap-y-4 lg:px-[60px] lg:py-12 lg:text-left">
            <h2 className="order-1 max-w-[260px] text-[22px] font-extrabold leading-tight tracking-tight text-white sm:text-2xl lg:col-start-1 lg:row-start-1 lg:max-w-[240px] lg:text-[28px]">
              More 2025 transformations
            </h2>
            <div className="order-2 grid w-full grid-cols-3 gap-3 sm:gap-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:gap-8">
              {TRANSFORMATIONS.map((t) => (
                <div key={t.who}>
                  <p className="text-[15px] font-extrabold tracking-tight text-white sm:text-[20px]">
                    {t.from} <span className="text-eb-blue">→</span> {t.to}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-white/70 sm:text-[13px]">{t.who}</p>
                </div>
              ))}
            </div>
            <div className="order-3 lg:col-start-1 lg:row-start-2">
              <UnderlineLink href="/contact">See All Our 2025 Grade Improvements</UnderlineLink>
            </div>
          </div>
        </section>
      </Reveal>

      {/* University & careers guidance */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 py-10 lg:px-[60px] lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-eb-navy sm:text-[13px]">From Grades To Offers</p>
              <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">University &amp; careers guidance</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">
                A better set of grades is only half the story. Every five-term student gets personalised applications guidance from Principal Owais Ahmed, with a proven record on placement into competitive courses like Oxbridge, Medicine, Dentistry, Law and Economics.
              </p>
            </div>

            {/* Desktop: ring · image · ring */}
            <div className="mt-8 hidden items-stretch gap-5 md:grid md:grid-cols-3">
              <RingCard
                value={72.7}
                label="to Russell Group universities (2025)"
                chips={[
                  { Icon: IcoAward, text: "Predicted grades" },
                  { Icon: IcoPerson, text: <>Personal statement &amp; UCAS</> },
                ]}
              />
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/adm-process.webp" alt="Edgbaston College students in class" className="h-full min-h-[280px] w-full object-cover" loading="lazy" decoding="async" />
              </div>
              <RingCard
                value={96}
                label="Medicine & Dentistry offer success (2025)"
                chips={[
                  { Icon: IcoCap, text: "University selection" },
                  { Icon: IcoBadge, text: <>Admissions tests &amp; interviews</> },
                ]}
              />
            </div>

            {/* Mobile: image first, then a peek slider of the two ring cards */}
            <div className="md:hidden">
              <div className="mt-6 overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/adm-process.webp" alt="Edgbaston College students in class" className="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="eb-noscroll mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1">
                <div className="w-[calc(100%-40px)] shrink-0 snap-start">
                  <RingCard
                    value={96}
                    label="Medicine & Dentistry offer success (2025)"
                    chips={[
                      { Icon: IcoCap, text: "University selection" },
                      { Icon: IcoBadge, text: <>Admissions tests &amp; interviews</> },
                    ]}
                  />
                </div>
                <div className="w-[calc(100%-40px)] shrink-0 snap-start">
                  <RingCard
                    value={72.7}
                    label="to Russell Group universities (2025)"
                    chips={[
                      { Icon: IcoAward, text: "Predicted grades" },
                      { Icon: IcoPerson, text: <>Personal statement &amp; UCAS</> },
                    ]}
                  />
                </div>
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-xl text-center text-[13px] leading-relaxed text-neutral-600">
              <span className="font-bold text-eb-navy">See our leavers&apos; destinations.</span>{" "}
              If you are aiming for Medicine or Dentistry, ask us about specialist admissions support.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Fees & how to apply */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-eb-navy sm:text-[13px]">Scholarships &amp; Contact Us</p>
              <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">Fees &amp; how to apply</h2>
            </div>
            <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2">
              {/* Scholarships */}
              <div className="flex flex-col rounded-2xl bg-eb-cream p-6 sm:p-8 lg:p-10">
                <IconScholarship className="h-9 w-9 text-eb-navy" />
                <h3 className="mt-5 text-[20px] font-bold text-eb-navy sm:text-[22px]">Scholarships</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-eb-navy/75 sm:text-[14px]">
                  Please visit the page below for further information on scholarships.
                </p>
                <div className="mt-8 sm:mt-auto sm:pt-10">
                  <Link href="/contact" className="text-[12px] font-bold uppercase tracking-wide text-eb-navy underline underline-offset-[6px] transition hover:text-eb-blue">
                    Scholarships
                  </Link>
                </div>
              </div>
              {/* Contact Us */}
              <div className="flex flex-col rounded-2xl bg-eb-cream p-6 sm:p-8 lg:p-10">
                <IconEnvelope className="h-9 w-9 text-eb-navy" />
                <h3 className="mt-5 text-[20px] font-bold text-eb-navy sm:text-[22px]">Contact Us</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-eb-navy/75 sm:text-[14px]">
                  For more information about the Five-Term A-Level course and how to apply, you can call us or fill out the online enquiry form and we will get in touch as soon as possible. Please also feel free to email or call us.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 sm:mt-auto sm:pt-10">
                  <a href="mailto:enquiries@edgbastoncollege.co.uk" className="text-[12px] font-bold uppercase tracking-wide text-eb-navy underline underline-offset-[6px] transition hover:text-eb-blue">
                    enquiries@edgbastoncollege.co.uk
                  </a>
                  <a href="tel:01213060182" className="text-[12px] font-bold uppercase tracking-wide text-eb-navy underline underline-offset-[6px] transition hover:text-eb-blue">
                    Call 0121 306 0182.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Accommodation */}
      <Reveal>
        <section className="bg-eb-cream">
          <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-10 text-center sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-[60px] lg:py-20 lg:text-left">
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-eb-navy sm:text-[13px]">Accommodation Support</p>
              <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-eb-ink sm:text-3xl lg:mt-3 lg:text-[44px]">Accommodation</h2>
              <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-eb-navy/70 lg:mx-0">
                For students relocating to Birmingham, we&apos;ve partnered with quality student accommodation just minutes from college.
              </p>
            </div>
            <div className="eb-stagger grid gap-4 sm:grid-cols-2">
              {RESIDENCES.map((r) => (
                <div key={r.name} className="eb-card rounded-2xl bg-white p-5 text-left sm:p-6">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-eb-blue">{r.label}</p>
                  <h3 className="mt-2.5 text-[18px] font-bold text-eb-navy sm:text-[19px]">{r.name}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-[13px] text-eb-navy/80">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden className="shrink-0 text-eb-navy">
                      <path d="M6.5 1a4 4 0 014 4c0 2.7-4 7-4 7s-4-4.3-4-7a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="6.5" cy="5" r="1.4" stroke="currentColor" strokeWidth="1.1" />
                    </svg>
                    {r.walk}
                  </p>
                  <hr className="my-4 border-black/10" />
                  <p className="text-[12px] text-neutral-500">Bills included · Secure access · 24/7 support</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA — navy block wrapped in cream */}
      <Reveal>
        <section className="bg-eb-cream">
          <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-2 lg:px-[60px] lg:pb-20 lg:pt-4">
            <div className="rounded-2xl bg-eb-navy px-5 py-10 text-center sm:px-6 lg:py-16">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/80 sm:text-[13px]">Take The Next Step</p>
              <h2 className="mx-auto mt-3 max-w-[560px] text-[28px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[52px]">
                Start your Five-Term A-Level in Birmingham
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[14px] text-white/75">Fill out the online enquiry form, email us, or give us a call.</p>
              <div className="mx-auto mt-7 flex max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="eb-cta group flex items-center justify-between gap-3 rounded-lg bg-white py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy sm:inline-flex sm:justify-start sm:text-[13px]"
                >
                  Enquire About Course
                  <span className="eb-square grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-eb-blue text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
                <a
                  href="tel:01213060182"
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/10 sm:py-3 sm:text-[13px]"
                >
                  Call 0121 306 0182
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-14 pt-6 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-24 lg:px-[60px] lg:pb-24 lg:pt-10">
            <div className="text-center lg:sticky lg:top-24 lg:self-start lg:text-left">
              <h2 className="mx-auto max-w-[300px] text-[22px] font-extrabold leading-[1.15] tracking-tight text-eb-ink lg:mx-0 lg:max-w-none lg:text-[40px]">
                Five Term A-Level FAQ
              </h2>
              <p className="mx-auto mt-2.5 max-w-[320px] text-[12.5px] leading-relaxed text-eb-navy/80 lg:mx-0 lg:mt-3 lg:max-w-[300px] lg:text-[13px]">
                Quick answers to the most common questions about the five-term A-Level pathway in Birmingham.
              </p>
            </div>
            <div>
              <FaqList items={FAQ} />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
