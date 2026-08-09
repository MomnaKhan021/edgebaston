import type { Metadata } from "next";
import Link from "next/link";
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { CountUp } from "@/components/home/CountUp";
import { ArrowUpRight } from "@/components/home/icons";
import { ProgressRing } from "@/components/course/ProgressRing";
import { ProgressBar } from "@/components/course/ProgressBar";
import { SharePage } from "@/components/site/SharePage";
import { StorySlider } from "@/components/course/StorySlider";
import { StoryCard, type Story } from "@/components/course/StoryCard";
import { FaqList } from "@/components/course/FaqList";
import { RichText } from "@/components/site/RichText";
import { notFound, redirect } from "next/navigation";
import { getTemplateSections, getPagePublished, getPageMeta, getPageRedirect } from "@/lib/sections";
import { sectionDefaults, parseItems, parseFaqItems, isVisible, bgStyle, num, overlayOn } from "@/lib/templates";
import {
  IconResults,
  IconPractice,
  IconTarget,
  IconClasses,
  IconSupport,
  IconWindow,
} from "@/components/course/RetakeIcons";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta("retake");
  return {
    title: m.metaTitle ? { absolute: m.metaTitle } : "One Year A-Level Retake",
    description:
      m.metaDescription ||
      "Birmingham's most successful A-Level retake programme. Small classes, frequent mock exams and personalised UCAS support to transform your grades.",
  };
}

/* ------------------------------ Small pieces ----------------------------- */

/** Compact "Contact Us" button — cream label with a detached blue arrow square. */
function ContactBtn({ className = "", href = "/contact", label = "Contact Us" }: { className?: string; href?: string; label?: string }) {
  return (
    <Link href={href} className={"eb-cta group items-stretch gap-1 " + className}>
      <span className="flex flex-1 items-center bg-eb-cream px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-eb-navy lg:flex-none">
        {label}
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

export default async function RetakePage() {
  if (!(await getPagePublished("retake"))) notFound();
  const redirectTo = await getPageRedirect("retake");
  if (redirectTo) redirect(redirectTo);
  const s = await getTemplateSections("retake");
  const d = (k: string) => ({ ...sectionDefaults("retake", k), ...s[k] });
  const hero = d("hero");
  const intro = d("intro");
  const outcomes = d("outcomes");
  const excel = d("excel");
  const how = d("how");
  const plan = d("plan");
  const stories = d("stories");
  const transformations = d("transformations");
  const guidance = d("guidance");
  const fees = d("fees");
  const accommodation = d("accommodation");
  const cta = d("cta");
  const faq = d("faq");

  const excelCards = parseItems(excel.cards);
  const howSteps = parseItems(how.cards);
  const planRows = parseItems(plan.cards);
  const storyCards: Story[] = parseItems(stories.cards).map((c) => ({
    name: c.name ?? "", img: c.image || "/figma/pathway-1.webp", from: c.from ?? "", to: c.to ?? "", course: c.course ?? "", quote: c.quote ?? "",
  }));
  const transCards = parseItems(transformations.cards);
  const feesCards = parseItems(fees.cards);
  const residences = parseItems(accommodation.cards);
  const excelIcons = [IconResults, IconPractice, IconTarget, IconClasses, IconSupport, IconWindow];
  const planIcons = [IconPractice, IconSupport, IconTarget];
  const faqListed = parseItems(faq.faqs).map((x) => ({ q: x.q ?? "", a: x.a ?? "" })).filter((x) => x.q);
  const faqLegacy = parseFaqItems(faq);
  const faqItems = faqListed.length > 0 ? faqListed : faqLegacy;

  return (
    <>
      <SiteAnnouncement />

      {/* Hero */}
      <section className="relative z-[60] isolate overflow-x-clip bg-eb-navy">
        <SiteNavbar />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.bgDesktop || "/figma/retake-hero.webp"} alt="Edgbaston College retake students" className="absolute inset-0 h-full w-full object-cover object-[center_30%]" fetchPriority="high" />
        {/* Neutral darkening for text legibility (no blue tint) */}
        {overlayOn(hero) && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
          </>
        )}
        <div className="relative mx-auto flex min-h-[420px] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-32 lg:min-h-[460px] lg:px-[60px] lg:pb-12">
          <h1 className="max-w-[320px] text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:max-w-[420px] sm:text-5xl lg:max-w-[520px] lg:text-[56px]">
            {hero.heading}
          </h1>
        </div>
      </section>

      {/* Breadcrumb + share — bordered on both breakpoints; stacks into two
          centred rows on mobile, single row on desktop (matches Our History). */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-[60px]">
          <div className="flex flex-col items-center gap-3 border-b border-black/10 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:py-5 sm:text-left">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-eb-navy">Home</Link>
              <span className="px-2 text-neutral-300">/</span>
              <Link href="/courses" className="hover:text-eb-navy">Courses</Link>
              <span className="px-2 text-neutral-300">/</span>
              <span className="font-medium text-eb-navy">{hero.heading || "One Year A-Level Retake"}</span>
            </nav>
            <SharePage title="One Year A-Level Retake — Edgbaston College" />
          </div>
        </div>
      </div>

      {/* Intro */}
      {isVisible(intro) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(intro)}>
          <div className="mx-auto max-w-[1440px] px-4 py-10 lg:px-[60px] lg:py-16">
            <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
              <div className="order-2 overflow-hidden rounded-xl lg:order-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={intro.image || "/figma/retake-intro.webp"} alt="Students at Edgbaston College" className="h-full w-full object-cover" style={{ aspectRatio: "4 / 3" }} loading="lazy" decoding="async" />
              </div>
              {/* Only the text block carries the cream background */}
              <div className="order-1 flex flex-col rounded-xl bg-eb-cream p-6 sm:p-8 lg:order-2 lg:p-10">
                <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-eb-navy sm:text-[13px]">{intro.eyebrow}</p>
                <h2 className="mt-3 text-[26px] font-extrabold leading-[1.1] tracking-tight text-eb-ink sm:text-3xl lg:mt-4 lg:text-[44px]">
                  {intro.heading}
                </h2>
                <RichText html={intro.body} className="mt-5 text-[14px] leading-relaxed text-neutral-600 sm:text-[15px] lg:mt-auto lg:pt-10" />
              </div>
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* 2025 outcomes */}
      {isVisible(outcomes) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(outcomes)}>
          <div className="mx-auto max-w-[1440px] px-4 pb-12 lg:px-[60px] lg:pb-16">
            <p className="font-mono text-[12px] text-eb-navy sm:text-[13px]">{outcomes.eyebrow}</p>
            <div className="mt-4 grid gap-4 sm:gap-5 lg:grid-cols-2">
              <div className="rounded-xl bg-eb-cream p-5 sm:p-8">
                <p className="text-[44px] font-extrabold leading-none tracking-tight text-eb-blue sm:text-6xl lg:text-[76px]">
                  <CountUp to={num(outcomes.card1Value, 87.7)} decimals={1} />
                  <span className="ml-1 align-baseline text-2xl font-extrabold sm:text-3xl lg:text-4xl">%–</span>
                </p>
                <div className="mt-5 space-y-3 sm:mt-6">
                  <StatRow label={outcomes.card1Row1Label} grade={outcomes.card1Row1Grade} pct={66} />
                  <StatRow label={outcomes.card1Row2Label} grade={outcomes.card1Row2Grade} pct={83} />
                </div>
              </div>
              <div className="rounded-xl bg-eb-cream p-5 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[44px] font-extrabold leading-none tracking-tight text-eb-blue sm:text-6xl lg:text-[76px]">
                    <CountUp to={num(outcomes.card2Value, 1.78)} decimals={2} prefix="+" />
                  </p>
                  <p className="pt-1 text-right text-[15px] font-bold leading-snug text-eb-navy sm:pt-2 sm:text-lg lg:text-[21px]">
                    {outcomes.card2Caption}
                  </p>
                </div>
                <div className="mt-5 space-y-3 sm:mt-6">
                  <StatRow label={outcomes.card2Row1Label} grade={outcomes.card2Row1Grade} pct={66} />
                  <StatRow label={outcomes.card2Row2Label} grade={outcomes.card2Row2Grade} pct={77} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Why our retake students excel */}
      {isVisible(excel) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(excel)}>
          <div className="mx-auto max-w-[1440px] px-4 pb-14 lg:px-[60px] lg:pb-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-eb-navy sm:text-[13px]">{excel.eyebrow}</p>
              <h2 className="mx-auto mt-3 max-w-[320px] text-[26px] font-extrabold leading-[1.15] tracking-tight text-eb-ink sm:max-w-none sm:text-3xl lg:text-[44px]">{excel.heading}</h2>
            </div>
            <div className="eb-stagger mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {excelCards.map((c, i) => {
                const Icon = excelIcons[i % excelIcons.length];
                return (
                <div key={i} className="eb-card flex flex-col items-center rounded-xl bg-eb-cream px-6 py-8 text-center sm:px-7 sm:py-9">
                  <Icon className="h-11 w-11 text-eb-navy sm:h-12 sm:w-12" />
                  <h3 className="mt-5 text-[18px] font-bold leading-snug text-eb-navy sm:mt-6">{c.title}</h3>
                  <p className="mx-auto mt-2.5 max-w-[320px] text-[14px] leading-relaxed text-neutral-600 sm:mt-3 sm:text-[15px]">{c.body}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* How the one-year retake works */}
      {isVisible(how) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(how)}>
          <div className="mx-auto max-w-[1440px] px-4 pb-10 lg:px-[60px] lg:pb-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] text-eb-navy sm:text-[13px]">{how.eyebrow}</p>
              <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">{how.heading}</h2>
              <p className="mt-2 text-[14px] text-neutral-600 sm:mt-3">{how.subtitle}</p>
            </div>
            <div className="eb-stagger mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-3">
              {howSteps.map((c, i) => (
                <div key={i} className="eb-card relative flex min-h-[220px] flex-col justify-end rounded-xl bg-eb-navy p-5 sm:min-h-[280px] sm:p-6 lg:min-h-[340px]">
                  <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/40 font-mono text-[12px] font-bold text-white sm:right-5 sm:top-5 sm:h-11 sm:w-11 sm:text-[13px]">
                    {c.number}
                  </span>
                  <h3 className="text-[18px] font-bold text-white sm:text-xl lg:text-[22px]">{c.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/75 sm:mt-2 sm:text-[14px]">{c.body}</p>
                </div>
              ))}
            </div>
            {/* Button sits below the cards on every size; full-width on mobile */}
            {how.buttonUrl && (
            <div className="mt-4 flex justify-center sm:mt-8">
              <Link
                href={how.buttonUrl}
                className="eb-cta group flex w-full items-center justify-between gap-3 rounded-lg bg-eb-cream py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy sm:inline-flex sm:w-auto sm:justify-start sm:text-[13px]"
              >
                {how.buttonLabel}
                <span className="eb-square grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-eb-blue text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            </div>
            )}
          </div>
        </section>
      </Reveal>
      )}

      {/* A retake plan built around you */}
      {isVisible(plan) && (
      <Reveal>
        <section className="bg-eb-navy" style={bgStyle(plan)}>
          <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-4 py-10 sm:gap-8 lg:grid-cols-2 lg:gap-14 lg:px-[60px] lg:py-20">
            {/* Image first on mobile, per the design */}
            <div className="overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={plan.image || "/figma/retake-plan.webp"} alt="A retake student working with a teacher" className="w-full object-cover" style={{ aspectRatio: "5 / 4" }} loading="lazy" decoding="async" />
            </div>
            <div className="eb-stagger">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white sm:text-[13px]">{plan.eyebrow}</p>
              <h2 className="mt-2.5 text-[24px] font-extrabold leading-[1.15] tracking-tight text-white sm:mt-3 sm:text-3xl lg:text-[44px]">{plan.heading}</h2>
              <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-white/75 sm:mt-3 sm:text-[14px]">
                {plan.body}
              </p>
              <ul className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3.5">
                {planRows.map((row, i) => {
                  const Icon = planIcons[i % planIcons.length];
                  return (
                  <li key={i} className="eb-card flex items-center gap-3.5 rounded-lg bg-white px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4">
                    <Icon className="h-6 w-6 shrink-0 text-eb-navy" />
                    <span className="text-[13px] font-semibold leading-snug text-eb-navy sm:text-[15px]">{row.text}</span>
                  </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Retake success stories */}
      {isVisible(stories) && (
      <Reveal>
        <section className="bg-eb-cream" style={bgStyle(stories)}>
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-eb-navy sm:text-[13px]">{stories.eyebrow}</p>
              <h2 className="mt-3 text-[26px] font-extrabold leading-[1.15] tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">{stories.heading}</h2>
              <p className="mx-auto mt-2.5 max-w-[300px] text-[13px] leading-relaxed text-neutral-600 sm:mt-3 sm:max-w-none sm:text-[14px]">{stories.subtitle}</p>
            </div>
            <div className="mt-8 sm:mt-10">
              <StorySlider>
                {storyCards.map((story, i) => (
                  <StoryCard
                    key={i}
                    story={story}
                    className="h-[400px] w-[78%] snap-center sm:h-[420px] sm:w-[300px] sm:snap-start"
                  />
                ))}
              </StorySlider>
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* More 2025 transformations */}
      {isVisible(transformations) && (
      <Reveal>
        <section className="bg-eb-navy" style={bgStyle(transformations)}>
          {/* Desktop: heading+link left, transformations right. Mobile: heading
              centered on top, transformations, link centered at the bottom. */}
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-4 py-9 text-center lg:grid lg:grid-cols-[minmax(0,auto)_1fr] lg:items-center lg:gap-x-12 lg:gap-y-4 lg:px-[60px] lg:py-12 lg:text-left">
            <h2 className="order-1 max-w-[260px] text-[22px] font-extrabold leading-tight tracking-tight text-white sm:text-2xl lg:col-start-1 lg:row-start-1 lg:max-w-[240px] lg:text-[28px]">
              {transformations.heading}
            </h2>
            <div className="order-2 grid w-full grid-cols-3 gap-3 sm:gap-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:gap-8">
              {transCards.map((t, i) => (
                <div key={i}>
                  <p className="text-[15px] font-extrabold tracking-tight text-white sm:text-[20px]">
                    {t.from} <span className="text-eb-blue">→</span> {t.to}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-white/70 sm:text-[13px]">{t.who}</p>
                </div>
              ))}
            </div>
            {transformations.linkUrl && (
            <div className="order-3 lg:col-start-1 lg:row-start-2">
              <UnderlineLink href={transformations.linkUrl}>{transformations.linkLabel}</UnderlineLink>
            </div>
            )}
          </div>
        </section>
      </Reveal>
      )}

      {/* University & careers guidance */}
      {isVisible(guidance) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(guidance)}>
          <div className="mx-auto max-w-[1440px] px-4 py-10 lg:px-[60px] lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-eb-navy sm:text-[13px]">{guidance.eyebrow}</p>
              <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">{guidance.heading}</h2>
              <RichText html={guidance.body} className="mt-3 text-[14px] leading-relaxed text-neutral-600" />
            </div>

            {/* Desktop: ring · image · ring */}
            <div className="mt-8 hidden items-stretch gap-5 md:grid md:grid-cols-3">
              <RingCard
                value={num(guidance.ring1Value, 72.7)}
                label={guidance.ring1Label}
                chips={[
                  { Icon: IcoAward, text: "Predicted grades" },
                  { Icon: IcoPerson, text: <>Personal statement &amp; UCAS</> },
                ]}
              />
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={guidance.image || "/figma/adm-process.webp"} alt="Edgbaston College students in class" className="h-full min-h-[280px] w-full object-cover" loading="lazy" decoding="async" />
              </div>
              <RingCard
                value={num(guidance.ring2Value, 96)}
                label={guidance.ring2Label}
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
                <img src={guidance.image || "/figma/adm-process.webp"} alt="Edgbaston College students in class" className="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async" />
              </div>
              {/* Track stays within the section's 16px padding; cards peek the
                  next one on the right. */}
              <div className="eb-noscroll mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1">
                <div className="w-[calc(100%-40px)] shrink-0 snap-start">
                  <RingCard
                    value={num(guidance.ring2Value, 96)}
                    label={guidance.ring2Label}
                    chips={[
                      { Icon: IcoCap, text: "University selection" },
                      { Icon: IcoBadge, text: <>Admissions tests &amp; interviews</> },
                    ]}
                  />
                </div>
                <div className="w-[calc(100%-40px)] shrink-0 snap-start">
                  <RingCard
                    value={num(guidance.ring1Value, 72.7)}
                    label={guidance.ring1Label}
                    chips={[
                      { Icon: IcoAward, text: "Predicted grades" },
                      { Icon: IcoPerson, text: <>Personal statement &amp; UCAS</> },
                    ]}
                  />
                </div>
              </div>
            </div>

            {guidance.note && (
            <p className="mx-auto mt-8 max-w-xl text-center text-[13px] leading-relaxed text-neutral-600">
              {guidance.note}
            </p>
            )}
          </div>
        </section>
      </Reveal>
      )}

      {/* Fees & how to apply */}
      {isVisible(fees) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(fees)}>
          <div className="mx-auto max-w-[1440px] px-4 pb-14 lg:px-[60px] lg:pb-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-eb-navy sm:text-[13px]">{fees.eyebrow}</p>
              <h2 className="mt-3 text-[26px] font-extrabold leading-[1.15] tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">{fees.heading}</h2>
            </div>
            <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 md:gap-6">
              {feesCards.map((c, i) => {
                const Icon = i === 0 ? IconFees : IconApply;
                return (
                <div key={i} className="eb-card flex min-h-[280px] flex-col rounded-2xl bg-eb-navy p-6 sm:min-h-[320px] sm:p-8">
                  <Icon className="h-9 w-9 text-white" />
                  <h3 className="mt-5 text-[20px] font-bold text-white sm:mt-6">{c.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-white/75">{c.body}</p>
                  <div className="mt-auto flex flex-wrap gap-x-8 gap-y-3 pt-8">
                    {c.link1Url && c.link1Label && (
                      <UnderlineLink href={c.link1Url} external={/^(https?:|tel:|mailto:)/.test(c.link1Url)}>{c.link1Label}</UnderlineLink>
                    )}
                    {c.link2Url && c.link2Label && (
                      <UnderlineLink href={c.link2Url} external={/^(https?:|tel:|mailto:)/.test(c.link2Url)}>{c.link2Label}</UnderlineLink>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Accommodation */}
      {isVisible(accommodation) && (
      <Reveal>
        <section className="bg-eb-cream" style={bgStyle(accommodation)}>
          <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-10 text-center sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-[60px] lg:py-20 lg:text-left">
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-eb-navy sm:text-[13px]">{accommodation.eyebrow}</p>
              <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-eb-ink sm:text-3xl lg:mt-3 lg:text-[44px]">{accommodation.heading}</h2>
              <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-eb-navy/70 lg:mx-0">
                {accommodation.body}
              </p>
            </div>
            <div className="eb-stagger grid gap-4 sm:grid-cols-2">
              {residences.map((r, i) => (
                <div key={i} className="eb-card rounded-2xl bg-white p-5 text-left sm:p-6">
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
                  <p className="text-[12px] text-neutral-500">{r.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* CTA */}
      {isVisible(cta) && (
      <Reveal>
        <section className="bg-eb-cream">
          <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-2 lg:px-[60px] lg:pb-20 lg:pt-4">
            <div className="rounded-2xl bg-eb-navy px-5 py-10 text-center sm:px-6 lg:py-16" style={cta.cardColor?.trim() ? { backgroundColor: cta.cardColor } : undefined}>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/80 sm:text-[13px]">{cta.eyebrow}</p>
              <h2 className="mx-auto mt-3 max-w-[560px] text-[28px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[52px]">
                {cta.heading}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[14px] text-white/75">{cta.subtitle}</p>
              <div className="mx-auto mt-7 flex max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
                {cta.button1Url && (
                <Link
                  href={cta.button1Url}
                  className="eb-cta group flex items-center justify-between gap-3 rounded-lg bg-white py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy sm:inline-flex sm:justify-start sm:text-[13px]"
                >
                  {cta.button1Label}
                  <span className="eb-square grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-eb-blue text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
                )}
                {cta.button2Url && (
                <a
                  href={cta.button2Url}
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/10 sm:py-3 sm:text-[13px]"
                >
                  {cta.button2Label}
                </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* FAQ */}
      {isVisible(faq) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(faq)}>
          <div className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-14 pt-6 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-24 lg:px-[60px] lg:pb-24 lg:pt-10">
            <div className="text-center lg:sticky lg:top-24 lg:self-start lg:text-left">
              <h2 className="mx-auto max-w-[300px] text-[22px] font-extrabold leading-[1.15] tracking-tight text-eb-ink lg:mx-0 lg:max-w-none lg:text-[40px]">
                {faq.heading}
              </h2>
              <p className="mx-auto mt-2.5 max-w-[320px] text-[12.5px] leading-relaxed text-eb-navy/80 lg:mx-0 lg:mt-3 lg:max-w-[300px] lg:text-[13px]">
                {faq.subtitle}
              </p>
              {faq.buttonUrl && <ContactBtn href={faq.buttonUrl} label={faq.buttonLabel} className="mt-5 hidden lg:inline-flex" />}
            </div>
            <div>
              <FaqList items={faqItems} />
              {faq.buttonUrl && <ContactBtn href={faq.buttonUrl} label={faq.buttonLabel} className="mt-6 flex w-full lg:hidden" />}
            </div>
          </div>
        </section>
      </Reveal>
      )}

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
