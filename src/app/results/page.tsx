import type { Metadata } from "next";
import Link from "next/link";
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { ArrowUpRight } from "@/components/home/icons";
import { SharePage } from "@/components/history/SharePage";
import { Accordion } from "@/components/admissions/Accordion";
import { StudentDestinations, type DestinationCard } from "@/components/results/StudentDestinations";
import { RichText } from "@/components/site/RichText";
import { notFound, redirect } from "next/navigation";
import { getTemplateSections, getPagePublished, getPageMeta, getPageRedirect } from "@/lib/sections";
import { sectionDefaults, parseItems, parseLines, isVisible, bgStyle, num, overlayOn } from "@/lib/templates";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta("results");
  return {
    title: m.metaTitle ? { absolute: m.metaTitle } : "Results & Destinations",
    description:
      m.metaDescription ||
      "Edgbaston College A-Level results and university destinations — outstanding grades, subject excellence and where our students progress.",
  };
}

/** A person icon; `filled` colours it blue, otherwise solid navy. */
function Person({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={"h-6 w-6 " + (filled ? "text-eb-blue" : "text-eb-navy")} fill="currentColor" aria-hidden>
      <circle cx="12" cy="6.5" r="3.5" />
      <path d="M5 21c0-4 3.1-7 7-7s7 3 7 7v.5H5V21Z" />
    </svg>
  );
}

/** Pictograph highlight: a bold label, 20 people filled to the percentage, big blue figure. */
function PeopleStat({ value, label }: { value: number; label: string }) {
  const total = 20;
  const filled = Math.round((value / 100) * total);
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
      <p className="text-sm font-bold text-eb-navy">{label}</p>
      <div className="mt-5 grid max-w-[300px] grid-cols-10 gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <Person key={i} filled={i < filled} />
        ))}
      </div>
      <p className="mt-6 text-6xl font-extrabold leading-none text-eb-blue lg:text-7xl">
        {value % 1 === 0 ? value : value.toFixed(1)}<span className="text-3xl align-top lg:text-4xl">%</span>
      </p>
    </div>
  );
}

/** Small outline icons for the subject rows. */
const SUBJECT_ICONS = [
  // Leaf (Biology)
  (c: string) => (<svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 19c0-8 5-13 14-13 0 9-5 14-13 14M5 19c3-5 6-7 10-9" /></svg>),
  // Flask (Chemistry)
  (c: string) => (<svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3M7.5 15h9" /></svg>),
  // Sigma (Mathematics)
  (c: string) => (<svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M17 5H7l5 7-5 7h10" /></svg>),
];

/** Small PDF/document glyph for the success-story card. */
function PdfIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

export default async function ResultsPage() {
  if (!(await getPagePublished("results"))) notFound();
  const redirectTo = await getPageRedirect("results");
  if (redirectTo) redirect(redirectTo);
  const s = await getTemplateSections("results");
  const d = (k: string) => ({ ...sectionDefaults("results", k), ...s[k] });
  const hero = d("hero");
  const yearbar = d("yearbar");
  const summary = d("summary");
  const subjectsSec = d("subjects");
  const destinations = d("destinations");
  const students = d("students");
  const faq = d("faq");

  const years = parseLines(yearbar.years);
  const stats = [
    { value: summary.stat1Value, label: summary.stat1Label },
    { value: summary.stat2Value, label: summary.stat2Label },
    { value: summary.stat3Value, label: summary.stat3Label },
  ];
  const subjectBars = parseItems(subjectsSec.subjects);
  const cards = parseItems(students.cards).map((c) => ({
    name: c.name ?? "", year: c.year ?? "", course: c.course ?? "",
    university: c.university ?? "", photo: c.photo ?? "", logo: c.logo ?? "",
  })) as DestinationCard[];
  const faqItems = parseItems(faq.faqs).map((x) => ({ q: x.q ?? "", a: x.a ?? "" })).filter((x) => x.q);

  return (
    <>
      <SiteAnnouncement />

      {/* Banner */}
      {isVisible(hero) && (
        <section className="relative z-[60] isolate overflow-x-clip bg-eb-navy" style={bgStyle(hero)}>
          <SiteNavbar />
          {hero.bgDesktop && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.bgDesktop} alt="Edgbaston College students with their results" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
          )}
          {overlayOn(hero) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          )}
          <div className="relative mx-auto flex min-h-[420px] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-36 lg:min-h-[500px] lg:px-16 lg:pb-12">
            <h1 className="max-w-[16ch] text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
              {hero.heading}
            </h1>
          </div>
        </section>
      )}

      {/* Breadcrumb + share */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-16">
          <div className="flex flex-col items-center gap-3 border-b py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left sm:py-5">
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-eb-navy">Home</Link>
              <span className="px-2">/</span>
              <Link href="/admissions-requirements" className="hover:text-eb-navy">Admissions</Link>
              <span className="px-2">/</span>
              <span className="text-eb-navy">{hero.heading || "Results & Destinations"}</span>
            </nav>
            <SharePage title="Edgbaston College — Results & Destinations" />
          </div>
        </div>
      </div>

      {/* Year bar */}
      {isVisible(yearbar) && (
        <section className="bg-eb-navy" style={bgStyle(yearbar)}>
          <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between lg:px-16">
            <div className="eb-noscroll -mx-1 flex gap-1.5 overflow-x-auto px-1">
              {years.map((y) => {
                const active = y === yearbar.activeYear;
                return (
                  <span
                    key={y}
                    className={
                      "shrink-0 rounded-md px-3 py-1.5 text-sm font-semibold transition " +
                      (active ? "bg-eb-blue text-white" : "text-white/70 hover:bg-white/10")
                    }
                  >
                    {y}
                  </span>
                );
              })}
            </div>
            {yearbar.buttonUrl && (
              <Link href={yearbar.buttonUrl} className="eb-cta group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy">
                {yearbar.buttonLabel}
                <span className="eb-square grid h-8 w-8 place-items-center rounded-md bg-eb-blue text-white"><ArrowUpRight className="h-4 w-4" /></span>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Results detail — one light container holding summary, subjects and destinations */}
      {(isVisible(summary) || isVisible(subjectsSec) || isVisible(destinations)) && (
        <Reveal>
          <section className="bg-white">
            <div className="mx-auto max-w-[1320px] px-4 py-10 lg:px-16 lg:py-14">
              <div className="space-y-6 rounded-[28px] bg-eb-cream p-4 sm:p-6 lg:p-8" style={bgStyle(summary)}>

                {/* Summary */}
                {isVisible(summary) && (
                  <div>
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-2xl">
                        <p className="font-mono text-xs uppercase tracking-[0.14em] text-eb-navy/60">{summary.eyebrow}</p>
                        <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight text-eb-ink lg:text-[40px]">{summary.heading}</h2>
                      </div>
                      {/* Success-story card */}
                      <div className="w-full shrink-0 rounded-2xl bg-white p-4 ring-1 ring-black/5 lg:w-[300px]">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-eb-navy">{summary.storyLabel}</p>
                          <PdfIcon className="h-5 w-5 shrink-0 text-eb-navy/70" />
                        </div>
                        {summary.storyLinkUrl && (
                          <Link href={summary.storyLinkUrl} className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-eb-navy/15 py-2 pl-4 pr-2 transition hover:border-eb-blue">
                            <span className="text-xs font-bold uppercase tracking-wide text-eb-navy">{summary.storyLinkLabel}</span>
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-eb-blue text-white"><ArrowUpRight className="h-4 w-4" /></span>
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 max-w-3xl space-y-3 text-[15px] leading-relaxed text-neutral-600">
                      <RichText html={summary.body} />
                      <RichText html={summary.body2} />
                    </div>

                    {/* Three headline stats */}
                    <div className="mt-6 grid grid-cols-1 divide-y divide-black/5 overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                      {stats.map((st, i) => (
                        <div key={i} className="p-6 text-center">
                          <p className="text-3xl font-extrabold text-eb-navy lg:text-4xl">{st.value}%</p>
                          <p className="mt-1 text-sm font-bold text-eb-blue">{st.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subject excellence + grades gained */}
                {isVisible(subjectsSec) && (
                  <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-stretch">
                    <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5 sm:p-7">
                      <h3 className="text-xl font-extrabold text-eb-navy lg:text-2xl">{subjectsSec.heading}</h3>
                      <p className="mt-1 text-sm text-neutral-600">{subjectsSec.subtitle}</p>
                      <div className="mt-6 space-y-5">
                        {subjectBars.map((b, i) => {
                          const pct = num(b.percent, 0);
                          const icon = SUBJECT_ICONS[i % SUBJECT_ICONS.length];
                          return (
                            <div key={i} className="flex items-center gap-3 sm:gap-4">
                              <span className="shrink-0 text-eb-navy">{icon("h-6 w-6")}</span>
                              <div className="flex w-28 shrink-0 items-center gap-2 sm:w-40">
                                <span className="text-sm font-semibold text-eb-navy">{b.name}</span>
                                {b.grade && <span className="rounded bg-eb-blue/10 px-2 py-0.5 text-[11px] font-bold text-eb-navy">{b.grade}</span>}
                              </div>
                              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-eb-navy/10">
                                <div className="h-full rounded-full bg-eb-blue" style={{ width: `${Math.min(100, pct)}%` }} />
                              </div>
                              <span className="w-14 shrink-0 text-right text-sm font-bold text-eb-navy">{pct.toFixed(1)}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* Grades gained ring — white card, blue ring */}
                    <div className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-black/5">
                      <h3 className="text-lg font-extrabold text-eb-navy">{subjectsSec.gradesLabel}</h3>
                      <div className="flex flex-1 items-center justify-center py-4">
                        <div className="relative grid h-40 w-40 place-items-center">
                          <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
                            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(14,47,73,0.10)" strokeWidth="14" />
                            <circle cx="80" cy="80" r="70" fill="none" stroke="var(--eb-blue, #2781c8)" strokeWidth="14" strokeLinecap="round" strokeDasharray={2 * Math.PI * 70} strokeDashoffset={2 * Math.PI * 70 * 0.14} />
                          </svg>
                          <span className="absolute text-4xl font-extrabold text-eb-blue">{subjectsSec.gradesValue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* University destinations highlights */}
                {isVisible(destinations) && (
                  <div>
                    <h3 className="text-xl font-extrabold text-eb-navy lg:text-2xl">{destinations.heading}</h3>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <PeopleStat value={num(destinations.dest1Value, 0)} label={destinations.dest1Label} />
                      <PeopleStat value={num(destinations.dest2Value, 0)} label={destinations.dest2Label} />
                    </div>
                  </div>
                )}

              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* Where our students go next */}
      {isVisible(students) && (
        <Reveal>
          <section className="bg-white" style={bgStyle(students)}>
            <div className="mx-auto max-w-[1320px] px-4 pb-12 lg:px-16 lg:pb-16">
              <div className="mb-8 text-center">
                <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">{students.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[42px]">{students.heading}</h2>
              </div>
              <StudentDestinations
                cards={cards}
                destLabel={students.filterDestLabel}
                yearLabel={students.filterYearLabel}
                resetLabel={students.resetLabel}
              />
            </div>
          </section>
        </Reveal>
      )}

      {/* FAQ */}
      {isVisible(faq) && (
        <Reveal>
          <section className="bg-white" style={bgStyle(faq)}>
            <div className="mx-auto grid max-w-[1320px] gap-8 px-4 pb-14 lg:grid-cols-[0.8fr_1.6fr] lg:gap-14 lg:px-16 lg:pb-20">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[40px]">{faq.heading}</h2>
                {faq.buttonUrl && (
                  <Link href={faq.buttonUrl} className="eb-cta group mt-6 inline-flex items-center gap-3 rounded-full bg-eb-navy py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-white">
                    {faq.buttonLabel}
                    <span className="eb-square grid h-9 w-9 place-items-center rounded-md bg-eb-blue text-white"><ArrowUpRight className="h-5 w-5" /></span>
                  </Link>
                )}
              </div>
              <Accordion items={faqItems} />
            </div>
          </section>
        </Reveal>
      )}

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
