import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { IconSpark, IconUsers, IconCrest } from "@/components/history/HistoryIcons";
import { AppSteps } from "@/components/admissions/AppSteps";
import { Accordion } from "@/components/admissions/Accordion";

export const metadata: Metadata = {
  title: "Admissions Requirements",
  description:
    "Edgbaston College admissions requirements and application process — an inclusive, individual approach to every applicant.",
};

const LOOK_FOR = [
  { Icon: IconSpark, text: "Recognize students who show genuine potential and a real enthusiasm for learning." },
  { Icon: IconUsers, text: "Welcome students who will enjoy, and add to, the life of our community." },
  { Icon: IconCrest, text: "Treat every applicant fairly, openly and with care." },
];

function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 8c-2-1.5-5-2-8-2v18c3 0 6 .5 8 2 2-1.5 5-2 8-2V6c-3 0-6 .5-8 2Z" />
      <path d="M16 8v18" />
    </svg>
  );
}

const REQUIREMENTS = [
  {
    title: "A-Level (Two-Year / Five-Term / Year 13 Entry)",
    points: [
      "Many of our students arrive with an average GCSE score of around 6.7 (a mid to high grade B) or equivalent, typically across at least 6 GCSEs. This gives a helpful foundation, though it is a guide rather than a fixed bar.",
      "A strong grasp of the subjects to be studied at A-Level helps students get off to a confident start, particularly in Mathematics and Chemistry, which build on solid GCSE foundations.",
    ],
  },
  {
    title: "A-Level Retake (One Year)",
    points: [
      "More than anything, we look for the potential to achieve strong grades and the determination to improve university or career prospects.",
    ],
  },
];

const FAQS = [
  { q: "Resits", a: "We do not accept GCSE resits and will only consider your first GCSE attempt (and in one sitting). A-Level resits are considered for all programmes." },
  { q: "Mitigating circumstances", a: "If your grades were affected by illness or personal circumstances, let us know — we consider each application individually and take context into account." },
];

function Share() {
  const item = "grid h-9 w-9 place-items-center rounded-full border text-eb-navy transition hover:bg-eb-cream";
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Share This Page</span>
      <a href="#" aria-label="Facebook" className={item}><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9.5 16V9h2l.3-2.3H9.5V5.2c0-.66.2-1.1 1.14-1.1H12V2.1C11.7 2.06 10.9 2 10 2 8.06 2 6.75 3.16 6.75 5v1.7H4.7V9h2.05v7h2.75Z"/></svg></a>
      <a href="#" aria-label="X" className={item}><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M12.6 1.5h2.3L9.9 7.2l5.9 7.3h-4.6L7.6 9.9l-4.1 4.6H1.2l5.4-6.1L1 1.5h4.7l3.3 4.3 3.6-4.3Zm-.8 11.6h1.3L4.7 2.8H3.3l8.5 10.3Z"/></svg></a>
      <a href="#" aria-label="Email" className={item}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="3.5" width="12" height="9" rx="1.5"/><path d="M2.5 4.5 8 8.5l5.5-4"/></svg></a>
    </div>
  );
}

export default function AdmissionsRequirementsPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar variant="solid" />

      {/* Title + intro */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-16">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-eb-ink lg:text-[52px]">
            Admissions Requirements
          </h1>
          <p className="text-[15px] leading-relaxed text-neutral-600 lg:text-base">
            Edgbaston College is an academically ambitious yet inclusive learning
            community. Above all, we look for students who we believe have the
            potential to thrive here, and our admissions process is designed to get
            to know each applicant as an individual.
          </p>
        </div>
        {/* Group photo */}
        <div className="mx-auto max-w-[1440px] px-4 lg:px-16">
          <div className="overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/adm-group.png" alt="Edgbaston College students" className="aspect-[16/7] w-full object-cover" />
          </div>
        </div>
        {/* Breadcrumb + share */}
        <div className="mx-auto mt-6 flex max-w-[1440px] flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-16">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-eb-navy">Home</Link><span className="px-2">/</span>
            <Link href="/courses" className="hover:text-eb-navy">Courses</Link><span className="px-2">/</span>
            <span className="text-eb-navy">Admissions Requirements</span>
          </nav>
          <Share />
        </div>
      </section>

      {/* What we look for */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1320px] px-4 py-10 lg:py-16">
            <div className="eb-stagger mx-auto max-w-2xl text-center">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">What We Look For</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[42px]">
                When considering an application, we hope to:
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {LOOK_FOR.map(({ Icon, text }, i) => (
                <div key={i} className="eb-card rounded-2xl bg-eb-cream p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-eb-blue text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-6 text-[15px] leading-relaxed text-neutral-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Application process */}
      <Reveal>
        <section className="bg-eb-navy">
          <div className="mx-auto max-w-[1320px] px-4 py-10 lg:px-16 lg:py-16">
            <div className="eb-stagger text-center">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-white/50">How to Apply</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white lg:text-[42px]">Application Process</h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
                Places are limited and they can vary from year to year, so we always encourage families to get in touch early. We admit students on a rolling basis, and we are happy to talk things through at any stage. The process is straightforward:
              </p>
            </div>
            <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <AppSteps />
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/adm-process.png" alt="Students in class" className="aspect-[4/3] w-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Requirements cards */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1320px] px-4 py-10 lg:py-16">
            <div className="eb-stagger mx-auto max-w-2xl text-center">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">A Guide to Entry</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[42px]">Admissions Requirements</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
                We prefer to consider each student as an individual rather than apply a rigid set of rules, so please do talk to us even if you are unsure. As a general guide, students who join us tend to meet the following:
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {REQUIREMENTS.map((r) => (
                <div key={r.title} className="rounded-2xl bg-eb-navy p-8 text-white">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-eb-navy">
                    <BookIcon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{r.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {r.points.map((p, i) => (
                      <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-white/75">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-eb-blue" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[860px] px-4 py-10 lg:py-16">
            <div className="eb-stagger text-center">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">Good to Know</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[42px]">Frequently Asked Questions</h2>
            </div>
            <div className="mt-10">
              <Accordion items={FAQS} />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
