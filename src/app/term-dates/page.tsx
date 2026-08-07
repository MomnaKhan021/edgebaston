import type { Metadata } from "next";
import Link from "next/link";
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { SharePage } from "@/components/history/SharePage";
import { getTemplateSections } from "@/lib/sections";
import { sectionDefaults, parseItems, isVisible, bgStyle, overlayOn } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Term Dates",
  description:
    "Edgbaston College term dates — the Autumn, Spring and Summer term schedule, including half terms and key dates.",
};

/** Parse "Label | Value" lines from a term card's rows field. */
function parseRows(value: string | undefined): { label: string; value: string }[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => {
      const [label, val] = line.split("|").map((s) => s.trim());
      return { label: label ?? "", value: val ?? "" };
    })
    .filter((r) => r.label || r.value);
}

export default async function TermDatesPage() {
  const s = await getTemplateSections("term-dates");
  const d = (k: string) => ({ ...sectionDefaults("term-dates", k), ...s[k] });
  const hero = d("hero");
  const schedule = d("schedule");
  const terms = parseItems(schedule.terms);

  return (
    <>
      <SiteAnnouncement />

      {/* Banner */}
      {isVisible(hero) && (
        <section className="relative z-[60] isolate overflow-x-clip bg-eb-navy" style={bgStyle(hero)}>
          <SiteNavbar />
          {hero.bgDesktop && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hero.bgDesktop}
              alt="Edgbaston College"
              className="absolute inset-0 h-full w-full object-cover"
              fetchPriority="high"
            />
          )}
          {overlayOn(hero) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          )}
          <div className="relative mx-auto flex min-h-[420px] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-36 lg:min-h-[500px] lg:px-16 lg:pb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[56px]">
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
              <span className="text-eb-navy">{hero.heading || "Term Dates"}</span>
            </nav>
            <SharePage title="Edgbaston College — Term Dates" />
          </div>
        </div>
      </div>

      {/* Term schedule */}
      {isVisible(schedule) && (
        <Reveal>
          <section className="bg-white" style={bgStyle(schedule)}>
            <div className="mx-auto max-w-[900px] px-4 py-12 lg:py-16">
              <div className="eb-stagger text-center">
                <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">{schedule.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[42px]">
                  {schedule.heading}
                </h2>
              </div>

              <div className="mt-10 space-y-6">
                {terms.map((t, i) => {
                  const rows = parseRows(t.rows);
                  const barColor = (t.barColor ?? "").trim();
                  return (
                    <div key={i} className="overflow-hidden rounded-2xl bg-eb-cream shadow-sm ring-1 ring-black/5">
                      <div
                        className="flex items-center justify-between gap-4 bg-eb-navy px-5 py-4 sm:px-7"
                        style={barColor ? { backgroundColor: barColor } : undefined}
                      >
                        <h3 className="text-lg font-extrabold text-white sm:text-xl">{t.title}</h3>
                        <span className="text-sm font-semibold text-white/80 sm:text-base">{t.year}</span>
                      </div>
                      <div className="divide-y divide-black/5">
                        {rows.map((r, j) => (
                          <div key={j} className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-7">
                            <span className="text-[13px] text-neutral-600 sm:text-sm">{r.label}</span>
                            <span className="text-right text-[13px] font-semibold text-eb-navy sm:text-sm">{r.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
