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
import { getTemplateSections } from "@/lib/sections";
import { sectionDefaults, parseItems, parseLines, isVisible, bgStyle, num } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Results & Destinations",
  description:
    "Edgbaston College A-Level results and university destinations — outstanding grades, subject excellence and where our students progress.",
};

/** A person icon; `filled` colours it blue, otherwise a faint navy. */
function Person({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={"h-5 w-5 " + (filled ? "text-eb-blue" : "text-eb-navy/15")} fill="currentColor" aria-hidden>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8v1H4v-1Z" />
    </svg>
  );
}

/** Desktop pictograph: 20 people, a share of them filled to the percentage. */
function PeopleStat({ value, label }: { value: number; label: string }) {
  const total = 20;
  const filled = Math.round((value / 100) * total);
  return (
    <div>
      <div className="grid max-w-[280px] grid-cols-10 gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <Person key={i} filled={i < filled} />
        ))}
      </div>
      <p className="mt-5 text-5xl font-extrabold text-eb-navy lg:text-6xl">
        {value % 1 === 0 ? value : value.toFixed(1)}<span className="text-eb-blue">%</span>
      </p>
      <p className="mt-2 max-w-[260px] text-sm leading-snug text-neutral-600">{label}</p>
    </div>
  );
}

export default async function ResultsPage() {
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
        <section className="relative isolate overflow-hidden bg-eb-navy" style={bgStyle(hero)}>
          <SiteNavbar />
          {hero.bgDesktop && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.bgDesktop} alt="Edgbaston College students with their results" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
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
              <span className="text-eb-navy">Results &amp; Destinations</span>
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

      {/* Results summary */}
      {isVisible(summary) && (
        <Reveal>
          <section className="bg-white" style={bgStyle(summary)}>
            <div className="mx-auto max-w-[1320px] px-4 py-10 lg:px-16 lg:py-14">
              <div className="rounded-3xl bg-eb-cream p-5 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">{summary.eyebrow}</p>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[40px]">{summary.heading}</h2>
                  </div>
                  {/* Success-story card */}
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
                    {summary.storyImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={summary.storyImage} alt="" className="h-12 w-12 rounded-xl object-cover" loading="lazy" decoding="async" />
                    )}
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wide text-eb-navy/50">{summary.storyLabel}</p>
                      {summary.storyLinkUrl && (
                        <Link href={summary.storyLinkUrl} className="inline-flex items-center gap-1.5 text-sm font-bold text-eb-navy hover:text-eb-blue">
                          {summary.storyLinkLabel}
                          <ArrowUpRight className="h-4 w-4 text-eb-blue" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-neutral-600">{summary.body}</p>

                {/* Three headline stats */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {stats.map((st, i) => (
                    <div key={i} className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5">
                      <p className="text-4xl font-extrabold text-eb-navy lg:text-5xl">
                        {num(st.value, 0)}<span className="text-eb-blue">%</span>
                      </p>
                      <p className="mt-2 text-[13px] leading-snug text-neutral-600">{st.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* Subject excellence + grades gained */}
      {isVisible(subjectsSec) && (
        <Reveal>
          <section className="bg-white" style={bgStyle(subjectsSec)}>
            <div className="mx-auto grid max-w-[1320px] gap-6 px-4 pb-10 lg:grid-cols-[1.6fr_1fr] lg:items-stretch lg:px-16 lg:pb-14">
              {/* Subject bars */}
              <div className="rounded-3xl bg-eb-cream p-5 sm:p-8">
                <h3 className="text-xl font-extrabold text-eb-navy lg:text-2xl">{subjectsSec.heading}</h3>
                <p className="mt-1 text-sm text-neutral-600">{subjectsSec.subtitle}</p>
                <div className="mt-6 space-y-5">
                  {subjectBars.map((b, i) => {
                    const pct = num(b.percent, 0);
                    return (
                      <div key={i}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-semibold text-eb-navy">
                            {b.name} <span className="ml-1 font-mono text-xs text-eb-navy/50">{b.grade}</span>
                          </span>
                          <span className="font-bold text-eb-navy">{pct}%</span>
                        </div>
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-eb-navy/10">
                          <div className="h-full rounded-full bg-eb-blue" style={{ width: `${Math.min(100, pct)}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Grades gained ring */}
              <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-eb-navy p-8 text-center">
                <div className="relative grid h-40 w-40 place-items-center">
                  <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="12" />
                    <circle cx="80" cy="80" r="70" fill="none" stroke="var(--eb-blue, #2781c8)" strokeWidth="12" strokeLinecap="round" strokeDasharray={2 * Math.PI * 70} strokeDashoffset={2 * Math.PI * 70 * 0.16} />
                  </svg>
                  <span className="absolute text-3xl font-extrabold text-white">{subjectsSec.gradesValue}</span>
                </div>
                <p className="max-w-[200px] text-sm font-medium text-white/80">{subjectsSec.gradesLabel}</p>
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* University destinations highlights */}
      {isVisible(destinations) && (
        <Reveal>
          <section className="bg-white" style={bgStyle(destinations)}>
            <div className="mx-auto max-w-[1320px] px-4 pb-10 lg:px-16 lg:pb-16">
              <div className="rounded-3xl border p-5 sm:p-8 lg:p-10">
                <h3 className="text-xl font-extrabold text-eb-navy lg:text-2xl">{destinations.heading}</h3>
                <div className="mt-8 grid gap-10 sm:grid-cols-2">
                  <PeopleStat value={num(destinations.dest1Value, 0)} label={destinations.dest1Label} />
                  <PeopleStat value={num(destinations.dest2Value, 0)} label={destinations.dest2Label} />
                </div>
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
