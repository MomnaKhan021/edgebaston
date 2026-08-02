import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { CountUp } from "@/components/home/CountUp";
import { ArrowUpRight } from "@/components/home/icons";
import { ProgressRing } from "@/components/course/ProgressRing";
import { ProgressBar } from "@/components/course/ProgressBar";
import { SharePage } from "@/components/site/SharePage";
import { StorySlider } from "@/components/course/StorySlider";
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
  title: "One Year A-Level Retake",
  description:
    "Birmingham's most successful A-Level retake programme. Small classes, frequent mock exams and personalised UCAS support to transform your grades.",
};

/* --------------------------------- Data --------------------------------- */

const EXCEL = [
  { Icon: IconResults, title: "Exceptional Grade Improvement", body: "Jumps from BBB to A*AA are not uncommon, with an average gain of 1.78 grades per subject." },
  { Icon: IconPractice, title: "Frequent exam practice & feedback", body: "Weekly assessments under exam conditions and three mock exams, each with individual feedback." },
  { Icon: IconTarget, title: "Bespoke reapplication support", body: "Personalised UCAS reapplication guidance from Principal Owais Ahmed, who personally oversees all applications." },
  { Icon: IconClasses, title: "Genuinely small classes", body: "Maximum of 10 students per class (typically 7)." },
  { Icon: IconSupport, title: "Supportive environment", body: "Family-run college with a personal, relaxed atmosphere where every student is encouraged to be ambitious." },
  { Icon: IconWindow, title: "Focused revision & exam technique", body: "Targeted revision strategies and exam technique coaching that turn knowledge into marks under pressure." },
];

const STEPS = [
  { n: "01", title: "Choose your subjects", body: "retake one to three A-Levels, or take up a brand-new subject alongside them." },
  { n: "02", title: "Re-learn the whole course", body: "the complete A-Level specification, re-taught from the ground up in small classes." },
  { n: "03", title: "Constant assessment & feedback", body: "weekly timed assessments and three full mock exams, each with feedback and a parent report." },
];

const PLAN = [
  { Icon: IconPractice, text: "Review your previous results and scripts to see precisely where marks were lost." },
  { Icon: IconSupport, text: "Identify your strengths and weaknesses across each subject and topic." },
  { Icon: IconTarget, text: "Build a personalised retake plan with targeted support to close those gaps." },
];

const TRANSFORMATIONS = [
  { from: "DE", to: "AA", who: "Manelle · Medicine, Southampton" },
  { from: "UU", to: "AB", who: "Mohammed · Politics, KCL" },
  { from: "BB", to: "A*A*", who: "Adham · Medicine, Bristol" },
];

const RESIDENCES = [
  { label: "Closest", name: "Five Ways Residence", walk: "2–3 minute walk to college" },
  { label: "Closest", name: "Beech Gardens, Edgbaston", walk: "4–5 minute walk to college" },
];

const FAQ = [
  { q: "How many A-Levels can I retake?", a: "As many as you need — most students retake one to three A-Levels, and you can take up a brand-new subject alongside them." },
  { q: "Can I retake only one subject?", a: "Yes. Many of our students join to retake a single subject. We build your timetable around exactly what you need to improve." },
  { q: "Will I receive UCAS support?", a: "Yes — personalised UCAS reapplication guidance from Principal Owais Ahmed is built into the programme, from university selection to your personal statement and interviews." },
  { q: "How often are assessments?", a: "Weekly. You sit timed assessments under exam conditions every week, plus three full mock exams across the year — each with individual feedback and a parent report." },
  { q: "Is accommodation available?", a: "Yes. We've partnered with quality student accommodation just minutes from college, including Five Ways Residence and Beech Gardens, Edgbaston — bills included, with secure access and 24/7 support." },
  { q: "How do I apply?", a: "Enquire online or call 0121 306 0182. We review your previous results, agree your subjects and target grades, and confirm your place — simple and quick." },
];

/* ------------------------------ Small pieces ----------------------------- */

/** Compact "Contact Us" button — cream label with a detached blue arrow square. */
function ContactBtn({ className = "" }: { className?: string }) {
  return (
    <Link href="/contact" className={"eb-cta group items-stretch gap-1 " + className}>
      <span className="flex flex-1 items-center bg-eb-cream px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-eb-navy lg:flex-none">
        Contact Us
      </span>
      <span className="eb-square grid w-10 shrink-0 place-items-center rounded-sm bg-eb-blue text-white">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

function StatRow({ label, grade, pct }: { label: string; grade: string; pct: number }) {
  return (
    <div className="rounded-lg bg-white px-3 pb-3 pt-2.5 sm:px-3.5 sm:pb-3.5 sm:pt-3">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[12px] text-eb-navy/80 sm:text-[13px]">{label}</span>
        <span className="text-[15px] font-extrabold tracking-tight text-eb-navy sm:text-[17px]">{grade}</span>
      </div>
      {/* Fills slowly from 0 → pct when the row scrolls into view */}
      <ProgressBar pct={pct} className="mt-2" />
    </div>
  );
}

function DoubleArrow() {
  return (
    <svg width="15" height="10" viewBox="0 0 15 10" fill="none" aria-hidden className="inline-block">
      <path d="M1.5 1l4 4-4 4M7.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Open hand holding a coin marked with a pound sign (Fees). */
function IconFees({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <circle cx="16" cy="9.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14.3 9.5h3.4M16 7.2v4.6M15.1 7.4c1.4-.5 2.5.3 2.5 1.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4 20.5c2.2-1.4 4-1 5.7.2l2.1 1.5h3.9c1 0 1 1.5 0 1.5h-3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.6 22.3c2.7 2.7 5.9 3.7 9.2 3.7 3 0 5.4-2 7.7-3.8.9-.7.2-2-.9-1.7l-4.3 1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Head in profile with a question mark (How to apply). */
function IconApply({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path d="M7 26v-4.2C4.9 20 3.5 17.2 3.5 14A10.5 10.5 0 0 1 24 11.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 26h9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M18 12.6c0-1.6 1.3-2.9 2.9-2.9 1.6 0 3 1.1 3 2.7 0 1.9-2.1 2.2-2.6 3.6-.15.42-.2.85-.2 1.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="20.4" r="0.95" fill="currentColor" />
    </svg>
  );
}

function GradePill({ from, to, course }: { from: string; to: string; course: string }) {
  return (
    <div className="absolute inset-x-2.5 bottom-2.5 rounded-md bg-white px-3 py-2">
      <span className="flex items-center gap-1.5 font-mono text-[12px] font-bold text-eb-navy">
        {from} <DoubleArrow /> {to}
      </span>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-neutral-600">{course}</p>
    </div>
  );
}

function PlusBtn() {
  return (
    <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-md bg-white text-eb-navy shadow-sm">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function StoryPhoto({ img, name, from, to, course, wide = false }: { img: string; name: string; from: string; to: string; course: string; wide?: boolean }) {
  return (
    <div className={"relative shrink-0 overflow-hidden rounded-xl bg-eb-navy " + (wide ? "aspect-[3/4] w-full" : "h-full w-full")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={name} className="h-full w-full object-cover" />
      <PlusBtn />
      <span className="absolute bottom-16 left-4 text-2xl font-bold text-white drop-shadow">{name}</span>
      <GradePill from={from} to={to} course={course} />
    </div>
  );
}

/* Chip icons for the guidance cards (match the Figma glyphs). */
type IcoP = { className?: string };
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

/** Small white chip: icon above label on desktop, icon-left row on mobile. */
function MiniChip({ Icon, children }: { Icon: (p: IcoP) => React.ReactElement; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-white px-3 py-3 text-[12px] font-semibold leading-snug text-eb-navy sm:flex-col sm:gap-2 sm:py-4 sm:text-center">
      <Icon className="h-6 w-6 shrink-0 text-eb-navy sm:h-7 sm:w-7" />
      <span>{children}</span>
    </div>
  );
}

type Chip = { Icon: (p: IcoP) => React.ReactElement; text: React.ReactNode };

/** Guidance stat card: light-grey shell around a white ring card + two chips. */
function RingCard({ value, label, chips }: { value: number; label: string; chips: [Chip, Chip] }) {
  return (
    <div className="flex h-full flex-col gap-2.5 rounded-2xl bg-eb-cream p-2.5">
      <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-white px-5 py-8">
        <ProgressRing value={value} label={label} />
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {chips.map((c, i) => (
          <MiniChip key={i} Icon={c.Icon}>
            {c.text}
          </MiniChip>
        ))}
      </div>
    </div>
  );
}

function UnderlineLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-[12px] font-bold uppercase tracking-wide text-white underline underline-offset-[6px] transition hover:text-white/80"
    >
      {children}
    </a>
  );
}

/* --------------------------------- Page ---------------------------------- */

export default function RetakePage() {
  return (
    <>
      <AnnouncementBar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-eb-navy">
        <Navbar />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/retake-hero.webp" alt="Edgbaston College retake students" className="absolute inset-0 h-full w-full object-cover object-[center_30%]" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-eb-navy/85 via-eb-navy/45 to-eb-navy/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-eb-navy/70 to-transparent" />
        <div className="relative mx-auto flex min-h-[420px] max-w-[1440px] flex-col justify-end px-4 pb-16 pt-32 lg:min-h-[460px] lg:px-[60px] lg:pb-12">
          <h1 className="max-w-[320px] text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:max-w-[420px] sm:text-5xl lg:max-w-[520px] lg:text-[56px]">
            One Year A-Level Retake
          </h1>
        </div>
      </section>

      {/* Breadcrumb + share */}
      <div className="relative z-10 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-[60px]">
          <div className="-mt-9 flex flex-col rounded-xl bg-white px-4 py-3.5 shadow-[0_12px_30px_rgba(14,47,73,0.14)] ring-1 ring-black/5 sm:mt-0 sm:flex-row sm:items-center sm:justify-between sm:rounded-none sm:px-0 sm:py-4 sm:shadow-none sm:ring-0">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-eb-navy">Home</Link>
              <span className="px-2 text-neutral-300">/</span>
              <Link href="/courses" className="hover:text-eb-navy">Courses</Link>
              <span className="px-2 text-neutral-300">/</span>
              <span className="font-medium text-eb-navy">One Year A-Level Retake</span>
            </nav>
            <div className="mt-3 hidden sm:mt-0 sm:block">
              <SharePage title="One Year A-Level Retake — Edgbaston College" />
            </div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 py-10 lg:px-[60px] lg:py-16">
            <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
              <div className="order-2 overflow-hidden rounded-xl lg:order-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/retake-intro.webp" alt="Students at Edgbaston College" className="h-full w-full object-cover" style={{ aspectRatio: "4 / 3" }} loading="lazy" decoding="async" />
              </div>
              {/* Only the text block carries the cream background */}
              <div className="order-1 flex flex-col rounded-xl bg-eb-cream p-6 sm:p-8 lg:order-2 lg:p-10">
                <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-eb-navy sm:text-[13px]">Birmingham Retake Specialists</p>
                <h2 className="mt-3 text-[26px] font-extrabold leading-[1.1] tracking-tight text-eb-ink sm:text-3xl lg:mt-4 lg:text-[44px]">
                  Birmingham&apos;s most successful A-Level retake programme. Your A-Levels Online
                </h2>
                <p className="mt-5 text-[14px] leading-relaxed text-neutral-600 sm:text-[15px] lg:mt-auto lg:pt-10">
                  Yes, you can retake your{" "}
                  <span className="font-semibold text-eb-navy">A-Levels in Birmingham at Edgbaston College</span>. We turn disappointing results into exceptional outcomes, winning students higher grades and places at top universities, including Medicine, Dentistry and the Russell Group.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 2025 outcomes */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 pb-12 lg:px-[60px] lg:pb-16">
            <p className="font-mono text-[12px] text-eb-navy sm:text-[13px]">2025 outcomes</p>
            <div className="mt-4 grid gap-4 sm:gap-5 lg:grid-cols-2">
              <div className="rounded-xl bg-eb-cream p-5 sm:p-8">
                <p className="text-[44px] font-extrabold leading-none tracking-tight text-eb-blue sm:text-6xl lg:text-[76px]">
                  <CountUp to={87.7} decimals={1} />
                  <span className="ml-1 align-baseline text-2xl font-extrabold sm:text-3xl lg:text-4xl">%–</span>
                </p>
                <div className="mt-5 space-y-3 sm:mt-6">
                  <StatRow label="65.1%" grade="A*–A" pct={66} />
                  <StatRow label="87.7%" grade="A*–B" pct={83} />
                </div>
              </div>
              <div className="rounded-xl bg-eb-cream p-5 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[44px] font-extrabold leading-none tracking-tight text-eb-blue sm:text-6xl lg:text-[76px]">
                    <CountUp to={1.78} decimals={2} prefix="+" />
                  </p>
                  <p className="pt-1 text-right text-[15px] font-bold leading-snug text-eb-navy sm:pt-2 sm:text-lg lg:text-[21px]">
                    Grades gained<br />per subject
                  </p>
                </div>
                <div className="mt-5 space-y-3 sm:mt-6">
                  <StatRow label="Typical arrival" grade="BBC" pct={66} />
                  <StatRow label="Typical Result" grade="A*AA" pct={77} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Why our retake students excel */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 pb-14 lg:px-[60px] lg:pb-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-eb-navy sm:text-[13px]">The Edgbaston Advantage</p>
              <h2 className="mx-auto mt-3 max-w-[320px] text-[26px] font-extrabold leading-[1.15] tracking-tight text-eb-ink sm:max-w-none sm:text-3xl lg:text-[44px]">Why our retake students excel</h2>
            </div>
            <div className="eb-stagger mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {EXCEL.map(({ Icon, title, body }) => (
                <div key={title} className="eb-card flex flex-col items-center rounded-xl bg-eb-cream px-6 py-8 text-center sm:px-7 sm:py-9">
                  <Icon className="h-11 w-11 text-eb-navy sm:h-12 sm:w-12" />
                  <h3 className="mt-5 text-[18px] font-bold leading-snug text-eb-navy sm:mt-6">{title}</h3>
                  <p className="mx-auto mt-2.5 max-w-[320px] text-[14px] leading-relaxed text-neutral-600 sm:mt-3 sm:text-[15px]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* How the one-year retake works */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 pb-10 lg:px-[60px] lg:pb-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] text-eb-navy sm:text-[13px]">How It Works</p>
              <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">How the one-year retake works</h2>
              <p className="mt-2 text-[14px] text-neutral-600 sm:mt-3">One year to master your subjects and lift your grades.</p>
            </div>
            <div className="eb-stagger mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-3">
              {STEPS.map(({ n, title, body }) => (
                <div key={n} className="eb-card relative flex min-h-[220px] flex-col justify-end rounded-xl bg-eb-navy p-5 sm:min-h-[280px] sm:p-6 lg:min-h-[340px]">
                  <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/40 font-mono text-[12px] font-bold text-white sm:right-5 sm:top-5 sm:h-11 sm:w-11 sm:text-[13px]">
                    {n}
                  </span>
                  <h3 className="text-[18px] font-bold text-white sm:text-xl lg:text-[22px]">{title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/75 sm:mt-2 sm:text-[14px]">{body}</p>
                </div>
              ))}
            </div>
            {/* Button sits below the cards on every size; full-width on mobile */}
            <div className="mt-4 flex justify-center sm:mt-8">
              <Link
                href="/contact"
                className="eb-cta group flex w-full items-center justify-between gap-3 rounded-lg bg-eb-cream py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy sm:inline-flex sm:w-auto sm:justify-start sm:text-[13px]"
              >
                See The List Of Available Subjects
                <span className="eb-square grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-eb-blue text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* A retake plan built around you */}
      <Reveal>
        <section className="bg-eb-navy">
          <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-4 py-10 sm:gap-8 lg:grid-cols-2 lg:gap-14 lg:px-[60px] lg:py-20">
            {/* Image first on mobile, per the design */}
            <div className="overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/retake-plan.webp" alt="A retake student working with a teacher" className="w-full object-cover" style={{ aspectRatio: "5 / 4" }} loading="lazy" decoding="async" />
            </div>
            <div className="eb-stagger">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white sm:text-[13px]">Personalised From Day One</p>
              <h2 className="mt-2.5 text-[24px] font-extrabold leading-[1.15] tracking-tight text-white sm:mt-3 sm:text-3xl lg:text-[44px]">A retake plan built around you</h2>
              <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-white/75 sm:mt-3 sm:text-[14px]">
                No two students are the same. Every student starts with a one-to-one academic consultation, so we can target exactly what held your grades back last time.
              </p>
              <ul className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3.5">
                {PLAN.map(({ Icon, text }) => (
                  <li key={text} className="eb-card flex items-center gap-3.5 rounded-lg bg-white px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4">
                    <Icon className="h-6 w-6 shrink-0 text-eb-navy" />
                    <span className="text-[13px] font-semibold leading-snug text-eb-navy sm:text-[15px]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Retake success stories */}
      <Reveal>
        <section className="bg-eb-cream">
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-eb-navy sm:text-[13px]">Courses We Offer</p>
              <h2 className="mt-3 text-[26px] font-extrabold leading-[1.15] tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">Retake success stories</h2>
              <p className="mx-auto mt-2.5 max-w-[300px] text-[13px] leading-relaxed text-neutral-600 sm:mt-3 sm:max-w-none sm:text-[14px]">Real students, real grade jumps. Watch how their retake year went.</p>
            </div>
            <div className="mt-8 sm:mt-10">
              <StorySlider>
                {/* Featured: photo + quote (quote hidden on mobile → uniform photo card) */}
                <div className="grid w-[78%] shrink-0 snap-center grid-cols-1 gap-4 sm:w-[600px] sm:snap-start sm:grid-cols-[256px_1fr]">
                  <div className="relative h-[380px] sm:h-auto">
                    <StoryPhoto img="/figma/pathway-1.webp" name="Alishba" from="BB" to="A*A*" course="University of Cambridge" />
                  </div>
                  <div className="hidden flex-col justify-between rounded-xl bg-white p-6 sm:flex">
                    <p className="text-[15px] font-semibold leading-relaxed text-eb-navy">
                      &ldquo;The career guidance was absolutely transformative for me. Umar&apos;s Chemistry teaching helped me jump from a D to an A, whilst Owais&apos;s university advice gave me clear direction for my future. I&apos;m incredibly grateful for the comprehensive academic and careers support.&rdquo;
                    </p>
                    <p className="mt-6 text-right font-mono text-[11px] font-bold uppercase tracking-wide text-eb-navy">View Full Profile</p>
                  </div>
                </div>
                {/* Photo cards */}
                <div className="relative h-[380px] w-[78%] shrink-0 snap-center sm:w-[300px] sm:snap-start">
                  <StoryPhoto img="/figma/news-1.webp" name="Nicole" from="BB" to="A*A*" course="Dentistry at King's College London" />
                </div>
                <div className="relative h-[380px] w-[78%] shrink-0 snap-center sm:w-[300px] sm:snap-start">
                  <StoryPhoto img="/figma/news-2.webp" name="Tara" from="BB" to="AA" course="Medicine at Edge Hill University" />
                </div>
              </StorySlider>
            </div>
          </div>
        </section>
      </Reveal>

      {/* More 2025 transformations */}
      <Reveal>
        <section className="bg-eb-navy">
          {/* Desktop: heading+link left, transformations right. Mobile: heading
              centered on top, transformations, link centered at the bottom. */}
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
                A better set of grades is only half the story. Every retake student gets personalised applications guidance from Principal Owais Ahmed, with a proven record on placement into competitive courses like Oxbridge, Medicine, Dentistry, Law and Economics.
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
              {/* Track stays within the section's 16px padding; cards peek the
                  next one on the right. */}
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
              If you are resitting for Medicine or Dentistry, read our guides on{" "}
              <span className="font-bold text-eb-navy">medical school</span> and{" "}
              <span className="font-bold text-eb-navy">dental school</span> resit policies.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Fees & how to apply */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 pb-14 lg:px-[60px] lg:pb-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-eb-navy sm:text-[13px]">Fees &amp; Admissions</p>
              <h2 className="mt-3 text-[26px] font-extrabold leading-[1.15] tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">Fees &amp; how to apply</h2>
            </div>
            <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 md:gap-6">
              <div className="eb-card flex min-h-[280px] flex-col rounded-2xl bg-eb-navy p-6 sm:min-h-[320px] sm:p-8">
                <IconFees className="h-9 w-9 text-white" />
                <h3 className="mt-5 text-[20px] font-bold text-white sm:mt-6">Fees</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-white/75">
                  Fees depend on the number of subjects you retake. See current fees.
                </p>
                <div className="mt-auto pt-8">
                  <UnderlineLink href="/contact">See Current Fees</UnderlineLink>
                </div>
              </div>
              <div className="eb-card flex min-h-[280px] flex-col rounded-2xl bg-eb-navy p-6 sm:min-h-[320px] sm:p-8">
                <IconApply className="h-9 w-9 text-white" />
                <h3 className="mt-5 text-[20px] font-bold text-white sm:mt-6">How to apply</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-white/75">
                  We accept retake applications on a rolling basis, but most students join us after results day in September. Spaces subject to availability. Complete our enquiry form or{" "}
                  <span className="font-bold text-white">Call 0121 306 0182.</span>
                </p>
                <div className="mt-auto flex flex-wrap gap-x-8 gap-y-3 pt-8">
                  <UnderlineLink href="/contact">Complete Our Enquiry Form</UnderlineLink>
                  <UnderlineLink href="tel:01213060182" external>Call 0121 306 0182.</UnderlineLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Accommodation */}
      <Reveal>
        <section className="bg-eb-cream">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-[60px] lg:py-20">
            <div>
              <p className="font-mono text-[13px] text-eb-navy">Accommodation Support</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[44px]">Accommodation</h2>
              <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-neutral-600">
                For students relocating to Birmingham, we&apos;ve partnered with quality student accommodation just minutes from college.
              </p>
            </div>
            <div className="eb-stagger grid gap-4 sm:grid-cols-2">
              {RESIDENCES.map((r) => (
                <div key={r.name} className="eb-card rounded-xl border border-black/10 bg-white p-5">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wide text-eb-blue">{r.label}</p>
                  <h3 className="mt-2 text-lg font-bold text-eb-navy">{r.name}</h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-neutral-600">
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

      {/* CTA */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-16">
            <div className="rounded-2xl bg-eb-navy px-6 py-12 text-center lg:py-16">
              <p className="font-mono text-[13px] text-white/80">Take The Next Step</p>
              <h2 className="mx-auto mt-3 max-w-md text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-[40px]">
                Start your A-Level retake in Birmingham
              </h2>
              <p className="mt-3 text-[14px] text-white/75">Fill out the online enquiry form, email us, or give us a call.</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="eb-cta group inline-flex items-center gap-3 rounded-lg bg-white py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy sm:text-[13px]"
                >
                  Enquire About Course
                  <span className="eb-square grid h-9 w-9 place-items-center rounded-lg bg-eb-blue text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
                <a
                  href="tel:01213060182"
                  className="inline-flex items-center rounded-lg border border-white/40 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/10 sm:text-[13px]"
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
                A-Level retake &amp; resit FAQ
              </h2>
              <p className="mx-auto mt-2.5 max-w-[320px] text-[12.5px] leading-relaxed text-eb-navy/80 lg:mx-0 lg:mt-3 lg:max-w-[300px] lg:text-[13px]">
                Quick answers to the most common questions about retaking and resitting A-Levels in Birmingham.
              </p>
              <ContactBtn className="mt-5 hidden lg:inline-flex" />
            </div>
            <div>
              <FaqList items={FAQ} />
              <ContactBtn className="mt-6 flex w-full lg:hidden" />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
