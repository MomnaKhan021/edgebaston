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
import { getTemplateSections } from "@/lib/sections";
import { sectionDefaults, parseItems, isVisible, bgStyle, num } from "@/lib/templates";
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

/* ------------------------------ Small pieces ----------------------------- */

function UnderlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-[12px] font-bold uppercase tracking-wide text-white underline underline-offset-[6px] transition hover:text-white/80">
      {children}
    </a>
  );
}

type IcoP = { className?: string };

/** Corner-radius override for an image wrapper (a px number or a CSS length). */
function radiusStyle(v?: string): React.CSSProperties | undefined {
  const t = (v ?? "").trim();
  if (!t) return undefined;
  return { borderRadius: /^\d+$/.test(t) ? `${t}px` : t };
}

/** A card's icon: an uploaded image if provided, otherwise the default SVG. */
function CardMedia({
  src,
  Fallback,
  className,
}: {
  src?: string;
  Fallback: (p: IcoP) => React.ReactElement;
  className?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" className={`${className ?? ""} object-contain`} loading="lazy" decoding="async" />;
  }
  return <Fallback className={className} />;
}

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

export default async function FiveTermPage() {
  const s = await getTemplateSections("five-term");
  const d = (k: string) => ({ ...sectionDefaults("five-term", k), ...s[k] });
  const hero = d("hero");
  const intro = d("intro");
  const benefits = d("benefits");
  const offers = d("offers");
  const structure = d("structure");
  const careersSupport = d("careers-support");
  const careersProgram = d("careers-program");
  const stories = d("stories");
  const transformations = d("transformations");
  const guidance = d("guidance");
  const fees = d("fees");
  const accommodation = d("accommodation");
  const cta = d("cta");
  const faq = d("faq");

  const benefitCards = parseItems(benefits.cards);
  const benefitIcons = [IconCalendarYear, IconGlobePerson, IconHandshake];
  const offerCards = parseItems(offers.cards);
  const offerIcons = [IconResults, IconTarget, IconClasses, IconPractice, IconSupport, IconWindow];
  const structureRows = parseItems(structure.rows);
  const structureIcons = [IconPractice, IconResults, IconSupport];
  const programCards = parseItems(careersProgram.cards);
  const storyCards: Story[] = parseItems(stories.cards).map((c) => ({
    name: c.name ?? "", img: c.image || "/figma/pathway-1.webp", from: c.from ?? "", to: c.to ?? "", course: c.course ?? "", quote: c.quote ?? "",
  }));
  const transCards = parseItems(transformations.cards);
  const feesCards = parseItems(fees.cards);
  const residences = parseItems(accommodation.cards);
  const faqItems = parseItems(faq.faqs).map((x) => ({ q: x.q ?? "", a: x.a ?? "" })).filter((x) => x.q);

  return (
    <>
      <AnnouncementBar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-eb-navy">
        <Navbar />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.bgDesktop || "/figma/adm-process.webp"} alt="Edgbaston College five-term students" className="absolute inset-0 h-full w-full object-cover object-[center_25%]" fetchPriority="high" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="relative mx-auto flex min-h-[420px] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-32 lg:min-h-[460px] lg:px-[60px] lg:pb-12">
          <h1 className="max-w-[320px] text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:max-w-[420px] sm:text-5xl lg:max-w-[520px] lg:text-[56px]">
            {hero.heading}
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
      {isVisible(intro) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(intro)}>
          <div className="mx-auto grid max-w-[1440px] items-stretch gap-4 px-4 py-10 sm:gap-5 lg:grid-cols-2 lg:gap-6 lg:px-[60px] lg:py-16">
            <div className="order-1 overflow-hidden rounded-2xl" style={radiusStyle(intro.imageRadius)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={intro.image || "/figma/retake-intro.webp"} alt="Five-Term A-Level student studying at Edgbaston College" className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto" loading="lazy" decoding="async" />
            </div>
            {/* Text sits on a light card, matching the design */}
            <div className="order-2 flex flex-col justify-center rounded-2xl bg-eb-cream p-6 sm:p-8 lg:p-12">
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-eb-blue sm:text-[13px]">{intro.eyebrow}</p>
              <h2 className="mt-3 text-[30px] font-extrabold leading-[1.1] tracking-tight text-eb-ink sm:text-4xl lg:text-[44px]">
                {intro.heading}
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-eb-navy/75 sm:text-[15px]">
                {intro.body}
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-eb-navy/75 sm:text-[15px]">
                {intro.body2a}<strong className="font-semibold text-eb-navy">{intro.body2Strong}</strong>{intro.body2b}
              </p>
              {intro.buttonUrl && (
                <Link
                  href={intro.buttonUrl}
                  className="eb-cta group mt-6 inline-flex items-center gap-3 self-start rounded-lg bg-eb-navy py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-white sm:text-[13px]"
                >
                  {intro.buttonLabel}
                  <span className="eb-square grid h-9 w-9 place-items-center rounded-lg bg-eb-blue text-white"><ArrowUpRight className="h-5 w-5" /></span>
                </Link>
              )}
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Benefit of the Five-Term A-Level Course */}
      {isVisible(benefits) && (
      <Reveal>
        <section className="bg-eb-navy" style={bgStyle(benefits)}>
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/70 sm:text-[13px]">{benefits.eyebrow}</p>
              <h2 className="mt-2 text-[26px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-[44px]">{benefits.heading}</h2>
              <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
                {benefits.subtitle}
              </p>
            </div>
            <div className="eb-stagger mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
              {benefitCards.map((c, i) => {
                const Icon = benefitIcons[i % benefitIcons.length];
                return (
                <div key={i} className="eb-card rounded-2xl bg-eb-cream p-6 text-center sm:p-8">
                  <CardMedia src={c.icon} Fallback={Icon} className="mx-auto h-10 w-10 text-eb-navy" />
                  <h3 className="mt-4 text-[18px] font-bold text-eb-navy sm:text-[19px]">{c.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-eb-navy/70 sm:text-[14px]">{c.body}</p>
                </div>
                );
              })}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-white/70 sm:mt-10 sm:text-[14px]">
              {benefits.footnote}
            </p>
          </div>
        </section>
      </Reveal>
      )}

      {/* What Edgbaston College offers */}
      {isVisible(offers) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(offers)}>
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-eb-navy sm:text-[13px]">{offers.eyebrow}</p>
              <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">{offers.heading}</h2>
            </div>
            <div className="eb-stagger mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
              {offerCards.map((c, i) => {
                const Icon = offerIcons[i % offerIcons.length];
                return (
                <div key={i} className="eb-card rounded-2xl bg-eb-cream p-6 text-center sm:p-7">
                  <CardMedia src={c.icon} Fallback={Icon} className="mx-auto h-9 w-9 text-eb-navy" />
                  <h3 className="mt-4 text-[17px] font-bold text-eb-navy sm:text-[18px]">{c.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-eb-navy/70 sm:text-[14px]">{c.body}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Course Structure */}
      {isVisible(structure) && (
      <Reveal>
        <section className="bg-eb-navy" style={bgStyle(structure)}>
          <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:gap-14 lg:px-[60px] lg:py-16">
            {/* Image — top on mobile, right on desktop */}
            <div className="order-1 overflow-hidden rounded-2xl lg:order-2" style={radiusStyle(structure.imageRadius)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={structure.image || "/figma/adm-process.webp"} alt="Students working together at Edgbaston College" className="aspect-[4/3] h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="order-2 lg:order-1">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/70 sm:text-[13px]">{structure.eyebrow}</p>
              <h2 className="mt-2 text-[28px] font-extrabold tracking-tight text-white sm:text-3xl lg:text-[40px]">{structure.heading}</h2>
              <p className="mt-4 text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
                {structure.body}
                {structure.linkUrl
                  ? <Link href={structure.linkUrl} className="underline underline-offset-2 hover:text-white">{structure.linkLabel}</Link>
                  : structure.linkLabel}
                {structure.bodyAfter}
              </p>
              <p className="mt-6 text-[14px] font-bold text-white sm:text-[15px]">{structure.rowsIntro}</p>
              <div className="eb-stagger mt-4 flex flex-col gap-3">
                {structureRows.map((row, i) => {
                  const Icon = structureIcons[i % structureIcons.length];
                  return (
                  <div key={i} className="flex items-center gap-4 rounded-xl bg-white p-4 sm:p-5">
                    <CardMedia src={row.icon} Fallback={Icon} className="h-8 w-8 shrink-0 text-eb-navy" />
                    <p className="text-[13px] font-medium leading-snug text-eb-navy sm:text-[14px]">{row.text}</p>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Individualised Careers Support */}
      {isVisible(careersSupport) && (
      <Reveal>
        <section className="bg-eb-cream" style={bgStyle(careersSupport)}>
          <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-4 py-10 sm:gap-8 lg:grid-cols-2 lg:gap-14 lg:px-[60px] lg:py-16">
            <div className="order-1 overflow-hidden rounded-2xl" style={radiusStyle(careersSupport.imageRadius)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={careersSupport.image || "/figma/retake-intro.webp"} alt="Personalised careers support at Edgbaston College" className="aspect-square w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="order-2">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-eb-blue sm:text-[13px]">{careersSupport.eyebrow}</p>
              <h2 className="mt-2 text-[30px] font-extrabold leading-[1.1] tracking-tight text-eb-ink sm:text-4xl lg:text-[46px]">
                {careersSupport.heading}
              </h2>
              <p className="mt-6 text-[14px] leading-relaxed text-eb-navy/75 sm:mt-8 sm:text-[15px]">
                {careersSupport.body}<strong className="font-semibold text-eb-navy">{careersSupport.bodyStrong}</strong>{careersSupport.bodyAfter}
              </p>
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Comprehensive College Careers Program */}
      {isVisible(careersProgram) && (
      <Reveal>
        <section className="bg-eb-cream" style={bgStyle(careersProgram)}>
          <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-2 lg:px-[60px] lg:pb-16 lg:pt-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-eb-navy sm:text-[13px]">{careersProgram.eyebrow}</p>
              <h2 className="mt-2 text-[26px] font-extrabold leading-[1.1] tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">{careersProgram.heading}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-neutral-600 sm:text-[15px]">
                {careersProgram.subtitle}
              </p>
            </div>
            <div className="eb-stagger mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
              {programCards.map((c, i) => (
                <div key={i} className="eb-card relative flex min-h-[220px] flex-col justify-end rounded-xl bg-eb-navy p-5 sm:min-h-[280px] sm:p-6 lg:min-h-[300px]">
                  <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/40 font-mono text-[12px] font-bold text-white sm:right-5 sm:top-5 sm:h-11 sm:w-11 sm:text-[13px]">
                    {c.n}
                  </span>
                  <h3 className="text-[18px] font-bold text-white sm:text-xl lg:text-[22px]">{c.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/75 sm:mt-2 sm:text-[14px]">{c.body}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-neutral-600 sm:text-[14px]">
              {careersProgram.footnote}
            </p>
            {careersProgram.buttonUrl && (
            <div className="mt-6 flex justify-center">
              <Link
                href={careersProgram.buttonUrl}
                className="eb-cta group flex w-full items-center justify-between gap-3 rounded-lg bg-white py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy sm:inline-flex sm:w-auto sm:justify-start sm:text-[13px]"
              >
                {careersProgram.buttonLabel}
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

      {/* Success stories */}
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
                  <StoryCard key={i} story={story} className="h-[400px] w-[78%] snap-center sm:h-[420px] sm:w-[300px] sm:snap-start" />
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
              <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">
                {guidance.body}
              </p>
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
              <div className="overflow-hidden rounded-2xl" style={radiusStyle(guidance.imageRadius)}>
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
              <div className="mt-6 overflow-hidden rounded-2xl" style={radiusStyle(guidance.imageRadius)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={guidance.image || "/figma/adm-process.webp"} alt="Edgbaston College students in class" className="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async" />
              </div>
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

            <p className="mx-auto mt-8 max-w-xl text-center text-[13px] leading-relaxed text-neutral-600">
              <span className="font-bold text-eb-navy">{guidance.noteBold}</span>{" "}
              {guidance.note}
            </p>
          </div>
        </section>
      </Reveal>
      )}

      {/* Fees & how to apply */}
      {isVisible(fees) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(fees)}>
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-eb-navy sm:text-[13px]">{fees.eyebrow}</p>
              <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-eb-ink sm:text-3xl lg:text-[44px]">{fees.heading}</h2>
            </div>
            <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2">
              {feesCards.map((c, i) => {
                const Icon = i === 0 ? IconScholarship : IconEnvelope;
                return (
                <div key={i} className="flex flex-col rounded-2xl bg-eb-cream p-6 sm:p-8 lg:p-10">
                  <Icon className="h-9 w-9 text-eb-navy" />
                  <h3 className="mt-5 text-[20px] font-bold text-eb-navy sm:text-[22px]">{c.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-eb-navy/75 sm:text-[14px]">
                    {c.body}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 sm:mt-auto sm:pt-10">
                    {c.link1Url && c.link1Label && (
                      <a href={c.link1Url} className="text-[12px] font-bold uppercase tracking-wide text-eb-navy underline underline-offset-[6px] transition hover:text-eb-blue">
                        {c.link1Label}
                      </a>
                    )}
                    {c.link2Url && c.link2Label && (
                      <a href={c.link2Url} className="text-[12px] font-bold uppercase tracking-wide text-eb-navy underline underline-offset-[6px] transition hover:text-eb-blue">
                        {c.link2Label}
                      </a>
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

      {/* CTA — navy block wrapped in cream */}
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
            </div>
            <div>
              <FaqList items={faqItems} />
            </div>
          </div>
        </section>
      </Reveal>
      )}

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
