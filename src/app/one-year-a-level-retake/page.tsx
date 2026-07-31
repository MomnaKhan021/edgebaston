import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { CountUp } from "@/components/home/CountUp";
import { ArrowUpRight } from "@/components/home/icons";
import { ProgressRing } from "@/components/course/ProgressRing";
import { OfferBand } from "@/components/course/OfferBand";
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
  { q: "Where can I retake my A-Levels in Birmingham?", a: "At Edgbaston College — Birmingham's specialist sixth-form college for A-Level retakes. We are based at 37 George Road, Edgbaston, a short walk from Five Ways station, and accept retake students from across Birmingham and beyond." },
  { q: "Can you retake A-Levels?", a: "Yes. Anyone can retake their A-Levels regardless of age or previous school. Most of our students complete their retake in a single year with us, sitting the full exams again in the summer." },
  { q: "Can you resit A-Levels in November?", a: "November resits are only available for a small number of subjects and exam boards. For most A-Levels, the next opportunity is the summer exam series — which is what our one-year programme prepares you for." },
  { q: "When can you resit your A-Levels?", a: "A-Level exams are sat in the summer window (May–June). Students join us in September, re-learn the full course during the year, and sit their exams the following summer." },
  { q: "How much does it cost to retake A-Levels?", a: "Fees depend on the number of subjects you retake. Contact us for current per-subject fees — flexible payment plans are available, and our July offer gives 30% off for the first five eligible applicants." },
  { q: "What happens if you do worse in a resit?", a: "Universities almost always consider your best result, so a resit is very low risk. With small classes and constant feedback, the overwhelming majority of our students improve on their previous grades." },
  { q: "How many times can you resit an A-Level?", a: "There is no limit — you can resit an A-Level as many times as you like. In practice, one well-structured retake year with the right support is usually all that's needed." },
  { q: "Can I take a new A-Level subject when I retake?", a: "Yes. Many students take up a brand-new subject alongside their retakes — for example adding a subject that better fits their target university course." },
  { q: "Do universities accept A-Level retakes?", a: "The vast majority do, including Russell Group universities. Some competitive courses like Medicine consider resit policies individually — we guide you through each university's stance as part of our UCAS support." },
  { q: "How will you predict my grades?", a: "Your predicted grades are based on your performance in our weekly assessments and three full mock exams, so they reflect genuine, evidenced progress — not guesswork." },
  { q: "What are your outcomes like?", a: "In 2025, 87.7% of grades were A*–B and 65.1% were A*–A, with students gaining an average of +1.78 grades per subject. 72.7% progressed to Russell Group universities." },
];

/* ------------------------------ Small pieces ----------------------------- */

function StatRow({ label, grade, pct }: { label: string; grade: string; pct: number }) {
  return (
    <div className="rounded-lg bg-white px-3.5 pb-3.5 pt-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[13px] text-eb-navy/80">{label}</span>
        <span className="text-[17px] font-extrabold tracking-tight text-eb-navy">{grade}</span>
      </div>
      <div className="mt-2 h-3.5 overflow-hidden rounded-sm bg-eb-cream">
        <div className="h-full bg-eb-blue" style={{ width: pct + "%" }} />
      </div>
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

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2.5 text-center text-[12px] font-semibold text-eb-navy">
      {children}
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

      {/* Offer band (inline, per design) */}
      <OfferBand />

      {/* Intro */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 py-10 lg:px-[60px] lg:py-16">
            <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="order-2 overflow-hidden rounded-lg lg:order-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/retake-intro.webp" alt="Students at Edgbaston College" className="h-full w-full object-cover" style={{ aspectRatio: "4 / 3" }} loading="lazy" decoding="async" />
              </div>
              <div className="order-1 flex flex-col lg:order-2">
                <p className="font-mono text-[13px] text-eb-navy">Birmingham Retake Specialists</p>
                <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-eb-ink lg:text-[44px]">
                  Birmingham&apos;s most successful A-Level retake programme. Your A-Levels Online
                </h2>
                <p className="mt-6 text-[15px] leading-relaxed text-neutral-600 lg:mt-auto">
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
            <p className="font-mono text-[13px] text-eb-navy">2025 outcomes</p>
            <div className="mt-4 grid gap-5 lg:grid-cols-2">
              <div className="rounded-xl bg-eb-cream p-6 sm:p-8">
                <p className="text-6xl font-extrabold tracking-tight text-eb-blue lg:text-[76px]">
                  <CountUp to={87.7} decimals={1} />
                  <span className="ml-1 align-baseline text-3xl font-extrabold lg:text-4xl">%–</span>
                </p>
                <div className="mt-6 space-y-3">
                  <StatRow label="65.1%" grade="A*–A" pct={66} />
                  <StatRow label="87.7%" grade="A*–B" pct={83} />
                </div>
              </div>
              <div className="rounded-xl bg-eb-cream p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-6xl font-extrabold tracking-tight text-eb-blue lg:text-[76px]">
                    <CountUp to={1.78} decimals={2} prefix="+" />
                  </p>
                  <p className="pt-2 text-right text-lg font-bold leading-snug text-eb-navy lg:text-[21px]">
                    Grades gained<br />per subject
                  </p>
                </div>
                <div className="mt-6 space-y-3">
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
          <div className="mx-auto max-w-[1440px] px-4 pb-12 lg:px-[60px] lg:pb-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[13px] text-eb-navy">The Edgbaston Advantage</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[44px]">Why our retake students excel</h2>
            </div>
            <div className="eb-stagger mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {EXCEL.map(({ Icon, title, body }) => (
                <div key={title} className="eb-card rounded-xl bg-eb-cream px-6 py-7 text-center">
                  <Icon className="mx-auto h-9 w-9 text-eb-navy" />
                  <h3 className="mt-4 text-[17px] font-bold leading-snug text-eb-navy">{title}</h3>
                  <p className="mx-auto mt-2 max-w-[300px] text-[13px] leading-relaxed text-neutral-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* How the one-year retake works */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 pb-14 lg:px-[60px] lg:pb-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[13px] text-eb-navy">How It Works</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[44px]">How the one-year retake works</h2>
              <p className="mt-3 text-[14px] text-neutral-600">One year to master your subjects and lift your grades.</p>
            </div>
            <div className="eb-stagger mt-10 grid gap-5 md:grid-cols-3">
              {STEPS.map(({ n, title, body }) => (
                <div key={n} className="eb-card relative flex min-h-[280px] flex-col justify-end rounded-xl bg-eb-navy p-6 lg:min-h-[340px]">
                  <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/40 font-mono text-[13px] font-bold text-white">
                    {n}
                  </span>
                  <h3 className="text-xl font-bold text-white lg:text-[22px]">{title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/75">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex justify-center">
              <Link
                href="/contact"
                className="eb-cta group inline-flex items-center gap-3 rounded-lg bg-eb-cream py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy sm:text-[13px]"
              >
                See The List Of Available Subjects
                <span className="eb-square grid h-9 w-9 place-items-center rounded-lg bg-eb-blue text-white">
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
          <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-14 lg:px-[60px] lg:py-20">
            <div className="overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/retake-plan.webp" alt="A retake student working with a teacher" className="w-full object-cover" style={{ aspectRatio: "5 / 4" }} loading="lazy" decoding="async" />
            </div>
            <div className="eb-stagger">
              <p className="font-mono text-[13px] text-white/80">Personalised From Day One</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white lg:text-[44px]">A retake plan built around you</h2>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/75">
                No two students are the same. Every student starts with a one-to-one academic consultation, so we can target exactly what held your grades back last time.
              </p>
              <ul className="mt-8 space-y-3.5">
                {PLAN.map(({ Icon, text }) => (
                  <li key={text} className="eb-card flex items-center gap-4 rounded-lg bg-white px-5 py-4">
                    <Icon className="h-6 w-6 shrink-0 text-eb-navy" />
                    <span className="text-[14px] font-semibold leading-snug text-eb-navy sm:text-[15px]">{text}</span>
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
              <p className="font-mono text-[13px] text-eb-navy">Courses We Offer</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[44px]">Retake success stories</h2>
              <p className="mt-3 text-[14px] text-neutral-600">Real students, real grade jumps. Watch how their retake year went.</p>
            </div>
            <div className="mt-10">
              <StorySlider>
                {/* Featured: photo + quote */}
                <div className="grid w-[92%] shrink-0 snap-center grid-cols-1 gap-4 sm:w-[600px] sm:snap-start sm:grid-cols-[256px_1fr]">
                  <div className="relative h-[380px] sm:h-auto">
                    <StoryPhoto img="/figma/retake-story-1.webp" name="Alishba" from="BB" to="A*A*" course="University of Cambridge" />
                  </div>
                  <div className="flex flex-col justify-between rounded-xl bg-white p-6">
                    <p className="text-[15px] font-semibold leading-relaxed text-eb-navy">
                      &ldquo;The career guidance was absolutely transformative for me. Umar&apos;s Chemistry teaching helped me jump from a D to an A, whilst Owais&apos;s university advice gave me clear direction for my future. I&apos;m incredibly grateful for the comprehensive academic and careers support.&rdquo;
                    </p>
                    <p className="mt-6 text-right font-mono text-[11px] font-bold uppercase tracking-wide text-eb-navy">View Full Profile</p>
                  </div>
                </div>
                {/* Photo cards */}
                <div className="relative h-[380px] w-[78%] shrink-0 snap-center sm:w-[300px] sm:snap-start">
                  <StoryPhoto img="/figma/retake-story-2.webp" name="Nicole" from="BB" to="A*A*" course="Dentistry at King's College London" />
                </div>
                <div className="relative h-[380px] w-[78%] shrink-0 snap-center sm:w-[300px] sm:snap-start">
                  <StoryPhoto img="/figma/retake-story-3.webp" name="Tara" from="BB" to="AA" course="Medicine at Edge Hill University" />
                </div>
              </StorySlider>
            </div>
          </div>
        </section>
      </Reveal>

      {/* More 2025 transformations */}
      <Reveal>
        <section className="bg-eb-navy">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-[60px] lg:py-12">
            <div className="shrink-0">
              <h2 className="max-w-[240px] text-2xl font-extrabold leading-tight tracking-tight text-white lg:text-[28px]">
                More 2025 transformations
              </h2>
              <div className="mt-4">
                <UnderlineLink href="/contact">See All Our 2025 Grade Improvements</UnderlineLink>
              </div>
            </div>
            <div className="grid flex-1 gap-6 sm:grid-cols-3 lg:gap-8">
              {TRANSFORMATIONS.map((t) => (
                <div key={t.who}>
                  <p className="text-[20px] font-extrabold tracking-tight text-white">
                    {t.from} <span className="text-eb-blue">→</span> {t.to}
                  </p>
                  <p className="mt-1 text-[13px] text-white/70">{t.who}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* University & careers guidance */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[13px] text-eb-navy">From Grades To Offers</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[44px]">University &amp; careers guidance</h2>
              <p className="mt-4 text-[14px] leading-relaxed text-neutral-600">
                A better set of grades is only half the story. Every retake student gets personalised applications guidance from Principal Owais Ahmed, with a proven record on placement into competitive courses like Oxbridge, Medicine, Dentistry, Law and Economics.
              </p>
            </div>
            <div className="eb-stagger mt-12 grid items-stretch gap-5 md:grid-cols-3">
              <div className="rounded-xl border border-black/10 bg-white p-6">
                <div className="flex flex-col items-center">
                  <ProgressRing value={72.7} label="to Russell Group universities (2025)" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <MiniChip>Predicted grades</MiniChip>
                  <MiniChip>Personal statement &amp; UCAS</MiniChip>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/retake-uni-2.webp" alt="Edgbaston College students in class" className="h-full min-h-[280px] w-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="rounded-xl border border-black/10 bg-white p-6">
                <div className="flex flex-col items-center">
                  <ProgressRing value={96} label="Medicine & Dentistry offer success (2025)" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <MiniChip>University selection</MiniChip>
                  <MiniChip>Admissions tests &amp; interviews</MiniChip>
                </div>
              </div>
            </div>
            <p className="mx-auto mt-10 max-w-xl text-center text-[13px] leading-relaxed text-neutral-600">
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
          <div className="mx-auto max-w-[1440px] px-4 pb-12 lg:px-[60px] lg:pb-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[13px] text-eb-navy">Fees &amp; Admissions</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[44px]">Fees &amp; how to apply</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="eb-card flex flex-col rounded-xl bg-eb-navy p-7">
                <IconSupport className="h-8 w-8 text-white" />
                <h3 className="mt-4 text-xl font-bold text-white">Fees</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                  Fees depend on the number of subjects you retake. See current fees.
                </p>
                <div className="mt-8">
                  <UnderlineLink href="/contact">See Current Fees</UnderlineLink>
                </div>
              </div>
              <div className="eb-card flex flex-col rounded-xl bg-eb-navy p-7">
                <IconResults className="h-8 w-8 text-white" />
                <h3 className="mt-4 text-xl font-bold text-white">How to apply</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                  We accept retake applications on a rolling basis, but most students join us after results day in September. Spaces subject to availability. Complete our enquiry form or{" "}
                  <span className="font-bold text-white">Call 0121 306 0182.</span>
                </p>
                <div className="mt-8 flex flex-wrap gap-6">
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
          <div className="mx-auto grid max-w-[1440px] gap-10 px-4 pb-16 pt-4 lg:grid-cols-[380px_1fr] lg:gap-20 lg:px-[60px] lg:pb-24">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-eb-ink lg:text-[40px]">
                A-Level retake &amp; resit FAQ
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-neutral-600">
                Quick answers to the most common questions about retaking and resitting A-Levels in Birmingham.
              </p>
              <Link
                href="/contact"
                className="eb-cta group mt-7 inline-flex items-center gap-3 rounded-lg bg-eb-cream py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy sm:text-[13px]"
              >
                Contact Us
                <span className="eb-square grid h-9 w-9 place-items-center rounded-lg bg-eb-blue text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            </div>
            <FaqList items={FAQ} />
          </div>
        </section>
      </Reveal>

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
