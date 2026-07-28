import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { Slider } from "@/components/home/Slider";
import { CountUp } from "@/components/home/CountUp";
import { ArrowUpRight } from "@/components/home/icons";
import { ProgressRing } from "@/components/course/ProgressRing";
import { Accordion } from "@/components/admissions/Accordion";
import {
  IconResults,
  IconPractice,
  IconTarget,
  IconClasses,
  IconSupport,
  IconWindow,
  IconCheck,
} from "@/components/course/RetakeIcons";

export const metadata: Metadata = {
  title: "One Year A-Level Retake",
  description:
    "Birmingham's most successful one-year A-Level retake programme. Small classes, frequent mock exams and personalised UCAS support to transform your grades.",
};

const EXCEL = [
  { Icon: IconResults, title: "Exceptional Results Improvement", body: "Our retake students improve by an average of 1.78 grades per subject — one of the strongest uplifts in the country." },
  { Icon: IconPractice, title: "Frequent Exam Practice & Support", body: "Regular mock exams under real conditions with detailed, personalised feedback after every assessment." },
  { Icon: IconTarget, title: "Bespoke Reapplication Support", body: "One-to-one UCAS guidance overseen by the Principal to help you secure your first-choice university offer." },
  { Icon: IconClasses, title: "Genuinely Small Classes", body: "Class sizes are kept deliberately small so every student is known, challenged and stretched to their potential." },
  { Icon: IconSupport, title: "Supportive Environment", body: "A family-owned, open-door ethos where students feel safe, valued and motivated throughout the year." },
  { Icon: IconWindow, title: "Focused Exam Window", body: "A structured, intensive one-year timetable built entirely around getting you exam-ready in time." },
];

const STEPS = [
  { n: "01", title: "Choose your subjects", body: "Pick the A-Levels you want to retake and we build a focused timetable around them." },
  { n: "02", title: "Sit your first mock exam", body: "A diagnostic mock benchmarks where you are so we can target the exact gaps." },
  { n: "03", title: "Commit to spaced mocks & feedback", body: "Regular assessments and one-to-one feedback keep you on an upward trajectory." },
];

const PLAN = [
  "A diagnostic first mock to benchmark every subject",
  "A personalised timetable built around your retake goals",
  "Regular mock exams sat under real exam conditions",
  "One-to-one UCAS and reapplication support",
  "Small classes with direct access to subject teachers",
];

const STORIES = [
  { name: "Alishba", img: "/figma/course-retake.png", from: "BB", to: "A*A*", course: "Law at University of Cambridge", quote: "The one-year retake completely changed my future — the small classes and constant mock practice got me from BB to A*A*." },
  { name: "Nicole", img: "/figma/course-fiveterm.png", from: "CC", to: "AA", course: "Dentistry at King's College London", quote: "The personalised UCAS support helped me reapply with confidence and land my dream dentistry offer." },
  { name: "Tara", img: "/figma/course-transfer.png", from: "DD", to: "A*A", course: "Medicine at University of Birmingham", quote: "Sitting frequent mocks under real conditions took the fear out of the real exams. My grades jumped two full levels." },
];

const RESIDENCES = [
  { name: "The Elgar Residences", body: "Modern en-suite student rooms a short walk from campus, with study spaces and 24/7 security." },
  { name: "Ernest Somers House", body: "Affordable shared accommodation with communal kitchens and quiet study areas." },
  { name: "Edgbaston Court", body: "Premium studios in the heart of Edgbaston, close to transport links and local amenities." },
];

const FAQ = [
  { q: "Can I retake just one A-Level subject?", a: "Yes. You can retake a single subject or several — we build your timetable around exactly the subjects you need to improve." },
  { q: "How much can my grades realistically improve?", a: "Our retake students improve by an average of 1.78 grades per subject, with many moving up two full grades over the year." },
  { q: "Do you support university reapplication?", a: "Absolutely. Personalised UCAS support, overseen by the Principal, is built into the programme to help you secure your first-choice offer." },
  { q: "When does the one-year retake start?", a: "The programme runs on a September–June academic year, with intensive preparation leading up to the summer exam window." },
  { q: "Are the exams sat at Edgbaston College?", a: "Yes — Edgbaston College is a registered exam centre, so you sit your final exams with us in a familiar environment." },
  { q: "Is accommodation available for retake students?", a: "Yes. We can help arrange student accommodation nearby, including The Elgar Residences, Ernest Somers House and Edgbaston Court." },
];

function EnquireBtn({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/contact"
      className={
        "eb-cta group inline-flex items-center gap-3 self-start rounded-full py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide " +
        (dark ? "bg-white text-eb-navy" : "bg-eb-navy text-white")
      }
    >
      Enquire About Course
      <span className="eb-square grid h-9 w-9 place-items-center rounded-md bg-eb-blue text-white">
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </Link>
  );
}

export default function RetakePage() {
  return (
    <>
      <AnnouncementBar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-eb-navy">
        <Navbar />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/adm-group.png" alt="Edgbaston College retake students" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-eb-navy/90 via-eb-navy/40 to-eb-navy/40" />
        <div className="relative mx-auto flex min-h-[380px] max-w-[1440px] flex-col justify-end px-4 pb-9 pt-32 lg:min-h-[460px] lg:px-16 lg:pb-12">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/70">A-Level Programme</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            One Year A-Level Retake
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <nav className="mx-auto max-w-[1440px] px-4 py-4 text-sm text-muted-foreground lg:px-16">
          <Link href="/" className="hover:text-eb-navy">Home</Link>
          <span className="px-2">/</span>
          <Link href="/courses" className="hover:text-eb-navy">Courses</Link>
          <span className="px-2">/</span>
          <span className="text-eb-navy">One Year A-Level Retake</span>
        </nav>
      </div>

      {/* Intro + stats */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1320px] px-4 py-10 lg:px-16 lg:py-16">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/history-hero.png" alt="Students at Edgbaston College" className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className="eb-stagger">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-eb-navy/60">The Retake Programme</p>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-eb-ink lg:text-[40px]">
                  Birmingham&apos;s most successful A-Level retake programme. Your A-Levels, online or in person.
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-neutral-600">
                  Our intensive one-year programme is designed for students who want to significantly improve their grades and reapply to top universities — with the small classes, frequent exam practice and personalised support that make the difference.
                </p>
              </div>
            </div>

            {/* Stat cards */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="eb-card rounded-2xl bg-eb-cream p-8">
                <p className="text-5xl font-extrabold text-eb-navy lg:text-6xl">
                  <CountUp to={87.7} decimals={1} suffix="%" />
                </p>
                <p className="mt-3 text-sm font-medium text-neutral-600">Achieved A*–B grades in 2025</p>
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-eb-blue" style={{ width: "87.7%" }} />
                </div>
              </div>
              <div className="eb-card rounded-2xl bg-eb-cream p-8">
                <p className="text-5xl font-extrabold text-eb-navy lg:text-6xl">
                  <CountUp to={1.78} decimals={2} prefix="+" />
                </p>
                <p className="mt-3 text-sm font-medium text-neutral-600">Average grade improvement per subject</p>
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-eb-blue" style={{ width: "78%" }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Why our retake students excel */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1320px] px-4 pb-10 lg:px-16 lg:pb-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-eb-navy/60">The Difference</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[40px]">Why our retake students excel</h2>
            </div>
            <div className="eb-stagger mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {EXCEL.map(({ Icon, title, body }) => (
                <div key={title} className="eb-card rounded-2xl bg-eb-cream p-7">
                  <Icon />
                  <h3 className="mt-6 text-lg font-bold text-eb-navy">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* How the one-year retake works */}
      <Reveal>
        <section className="bg-eb-navy">
          <div className="mx-auto max-w-[1320px] px-4 py-12 lg:px-16 lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white lg:text-[40px]">How the one-year retake works</h2>
            </div>
            <div className="eb-stagger mt-10 grid gap-5 md:grid-cols-3">
              {STEPS.map(({ n, title, body }) => (
                <div key={n} className="eb-card rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
                  <span className="font-mono text-sm font-bold text-eb-blue">{n}</span>
                  <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <EnquireBtn dark />
            </div>
          </div>
        </section>
      </Reveal>

      {/* A retake plan built around you */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1320px] items-center gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-14 lg:px-16 lg:py-16">
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/course-fiveterm.png" alt="A retake student" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="eb-stagger">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-eb-navy/60">Personalised</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[40px]">A retake plan built around you</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
                Every retake student follows a plan tailored to their target grades and university ambitions.
              </p>
              <ul className="mt-6 space-y-3">
                {PLAN.map((item) => (
                  <li key={item} className="eb-card flex items-start gap-3 rounded-xl bg-eb-cream px-5 py-4">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-eb-blue text-white">
                      <IconCheck />
                    </span>
                    <span className="text-sm font-medium text-eb-navy">{item}</span>
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
          <div className="mx-auto max-w-[1440px] px-4 py-10 lg:px-16 lg:py-16">
            <Slider label="Success Stories" title="Retake success stories">
              {STORIES.map((s) => (
                <div key={s.name} className="eb-card grid w-[90%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white sm:w-[560px] sm:grid-cols-2">
                  <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[360px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.img} alt={s.name} className="h-full w-full object-cover" />
                    <span className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow-lg">{s.name}</span>
                  </div>
                  <div className="flex flex-col justify-between p-7">
                    <p className="text-[15px] font-semibold leading-relaxed text-eb-navy">&ldquo;{s.quote}&rdquo;</p>
                    <div className="mt-5">
                      <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-eb-navy">
                        {s.from}
                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
                          <path d="M0 5h9M6 1l4 4-4 4M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {s.to}
                      </span>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-neutral-600">{s.course}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </Reveal>

      {/* University & careers guidance */}
      <Reveal>
        <section className="bg-eb-navy">
          <div className="mx-auto max-w-[1320px] px-4 py-12 lg:px-16 lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">More 2025 Transformations</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white lg:text-[40px]">University &amp; careers guidance</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                Personalised UCAS support that helps our retake students progress to Russell Group and competitive courses.
              </p>
            </div>
            <div className="eb-stagger mt-12 grid gap-10 sm:grid-cols-3">
              <ProgressRing value={87} label="Progress to their first-choice university" />
              <ProgressRing value={72} label="Secure a Russell Group offer" />
              <ProgressRing value={95} label="Improve on their previous grades" />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Fees & how to apply */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1320px] px-4 py-10 lg:px-16 lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-eb-navy/60">Getting Started</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[40px]">Fees &amp; how to apply</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="eb-card rounded-2xl bg-eb-cream p-8">
                <h3 className="text-xl font-bold text-eb-navy">Fees</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Transparent per-subject fees with flexible payment plans available. Our 30% August offer applies to the first five eligible applicants. Contact us for a full fee breakdown tailored to your subject choices.
                </p>
              </div>
              <div className="eb-card rounded-2xl bg-eb-cream p-8">
                <h3 className="text-xl font-bold text-eb-navy">How to apply</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Enquire online or call us to arrange a short consultation. We&apos;ll review your previous results, agree your subjects and target grades, and confirm your place — simple and quick.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Accommodation */}
      <Reveal>
        <section className="bg-eb-navy">
          <div className="mx-auto max-w-[1320px] px-4 py-12 lg:px-16 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-14">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">Living in Birmingham</p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white lg:text-[40px]">Accommodation</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                  We can help retake students find comfortable, well-connected accommodation close to campus.
                </p>
              </div>
              <div className="eb-stagger space-y-3">
                {RESIDENCES.map((r) => (
                  <div key={r.name} className="eb-card rounded-xl bg-white/5 p-6 ring-1 ring-white/10">
                    <h3 className="text-lg font-bold text-white">{r.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{r.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA band */}
      <Reveal>
        <section className="bg-eb-blue">
          <div className="mx-auto flex max-w-[1320px] flex-col items-start gap-6 px-4 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-16">
            <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-[40px]">
              Start your A-Level retake in Birmingham
            </h2>
            <Link href="/contact" className="eb-cta group inline-flex shrink-0 items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-eb-navy">
              Enquire About Course
              <span className="eb-square grid h-9 w-9 place-items-center rounded-md bg-eb-navy text-white">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[900px] px-4 py-12 lg:px-16 lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-eb-navy/60">Questions</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[40px]">A-Level retake &amp; resit FAQ</h2>
            </div>
            <div className="mt-10">
              <Accordion items={FAQ} />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
