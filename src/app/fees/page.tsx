import type { Metadata } from "next";
import Link from "next/link";
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { SharePage } from "@/components/history/SharePage";
import { RichText } from "@/components/site/RichText";
import { notFound, redirect } from "next/navigation";
import { getTemplateSections, getPagePublished, getPageMeta, getPageRedirect } from "@/lib/sections";
import { sectionDefaults, parseItems, isVisible, bgStyle } from "@/lib/templates";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta("fees");
  return {
    title: m.metaTitle ? { absolute: m.metaTitle } : "Fees",
    description:
      m.metaDescription ||
      "Edgbaston College fees — full-time A-Level, one-year retake, private tuition and Medicine & Dentistry pathway prices, charged per term.",
  };
}

/** Parse "Label | exc | inc" rows from a comparison card's rows field. */
function parsePriceRows(value: string | undefined): { label: string; exc: string; inc: string }[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => {
      const [label, exc, inc] = line.split("|").map((s) => s.trim());
      return { label: label ?? "", exc: exc ?? "", inc: inc ?? "" };
    })
    .filter((r) => r.label);
}

const n2 = (i: number) => String(i + 1).padStart(2, "0");

export default async function FeesPage() {
  if (!(await getPagePublished("fees"))) notFound();
  const redirectTo = await getPageRedirect("fees");
  if (redirectTo) redirect(redirectTo);
  const s = await getTemplateSections("fees");
  const d = (k: string) => ({ ...sectionDefaults("fees", k), ...s[k] });
  const intro = d("intro");
  const fulltime = d("fulltime");
  const retake = d("retake");
  const tuition = d("tuition");
  const medicine = d("medicine");
  const other = d("other");
  const notes = d("notes");

  const fulltimeRows = parseItems(fulltime.rows);
  const retakeCards = parseItems(retake.cards);
  const medicineRows = parseItems(medicine.rows);
  const otherRows = parseItems(other.rows);
  const noteCards = parseItems(notes.cards);

  return (
    <>
      <SiteAnnouncement />
      <SiteNavbar variant="solid" />

      {/* Title + intro */}
      {isVisible(intro) && (
        <section className="bg-white" style={bgStyle(intro)}>
          <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-16 lg:py-12">
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-eb-ink lg:text-[64px]">
              {intro.heading}
            </h1>
            <RichText html={intro.body} className="text-[15px] leading-relaxed text-neutral-600 lg:text-base" />
          </div>
          {intro.image && (
            <div className="mx-auto max-w-[1440px] px-4 lg:px-16">
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={intro.image}
                  alt="Edgbaston College"
                  className="aspect-[16/7] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          )}
          <div className="mx-auto mt-4 flex max-w-[1440px] flex-col items-center gap-3 border-t px-4 py-4 text-center sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-16">
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-eb-navy">Home</Link><span className="px-2">/</span>
              <Link href="/admissions-requirements" className="hover:text-eb-navy">Admissions</Link><span className="px-2">/</span>
              <span className="text-eb-navy">{intro.heading || "Fees"}</span>
            </nav>
            <SharePage title="Edgbaston College — Fees" />
          </div>
        </section>
      )}

      {/* Full-Time A-Level Programmes */}
      {isVisible(fulltime) && (
        <Reveal>
          <section className="bg-eb-navy" style={bgStyle(fulltime)}>
            <div className="mx-auto max-w-[1200px] px-4 py-10 lg:py-20">
              <div className="eb-stagger text-center">
                <p className="font-mono text-sm uppercase tracking-[0.14em] text-white/50">{fulltime.eyebrow}</p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white lg:text-[48px]">{fulltime.heading}</h2>
                <p className="mt-3 text-[15px] text-white/70">{fulltime.subtitle}</p>
              </div>

              <div className="mt-10 overflow-hidden rounded-2xl bg-white">
                <div className="hidden grid-cols-[1fr_auto_auto] items-center gap-6 border-b border-black/10 px-8 py-4 md:grid">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{fulltime.colProgramme}</span>
                  <span className="w-40 text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{fulltime.colExc}</span>
                  <span className="w-40 text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{fulltime.colInc}</span>
                </div>
                {fulltimeRows.map((r, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 gap-2 border-b border-black/5 px-6 py-5 last:border-0 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-6 md:px-8 md:py-6"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-eb-blue">{n2(i)}</span>
                      <span className="text-lg font-bold text-eb-ink">{r.name}</span>
                    </div>
                    <div className="flex items-center justify-between md:w-40 md:justify-end">
                      <span className="text-[11px] uppercase tracking-wide text-neutral-500 md:hidden">{fulltime.colExc}</span>
                      <span className="text-base text-neutral-700 md:text-lg">{r.exc}</span>
                    </div>
                    <div className="flex items-center justify-between md:w-40 md:justify-end">
                      <span className="text-[11px] uppercase tracking-wide text-neutral-500 md:hidden">{fulltime.colInc}</span>
                      <span className="text-lg font-bold text-eb-ink md:text-xl">{r.inc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {fulltime.note && (
                <p className="mx-auto mt-6 max-w-2xl text-center text-[13px] leading-relaxed text-white/60">
                  <span className="font-semibold text-white/80">Note:</span> {fulltime.note}
                </p>
              )}
            </div>
          </section>
        </Reveal>
      )}

      {/* One-Year A-Level Retake */}
      {isVisible(retake) && (
        <Reveal>
          <section className="bg-eb-cream" style={bgStyle(retake)}>
            <div className="mx-auto max-w-[1200px] px-4 py-10 lg:py-20">
              <div className="eb-stagger mx-auto max-w-2xl text-center">
                <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">{retake.eyebrow}</p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[48px]">{retake.heading}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">{retake.subtitle}</p>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {retakeCards.map((c, i) => {
                  const rows = parsePriceRows(c.rows);
                  return (
                    <div key={i} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 lg:p-8">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-eb-blue">
                          <span className="h-1.5 w-1.5 rounded-full bg-eb-blue" />
                          {c.badge ? "Online" : "In-person"}
                        </span>
                        {c.badge && (
                          <span className="rounded-full bg-eb-blue/10 px-2.5 py-1 text-[11px] font-semibold text-eb-blue">{c.badge}</span>
                        )}
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-eb-ink lg:text-2xl">{c.title}</h3>
                      <p className="mt-2 text-sm text-neutral-500">{c.subtitle}</p>
                      <div className="mt-6 divide-y divide-black/5 border-t border-black/5">
                        {rows.map((r, j) => (
                          <div key={j} className="flex items-end justify-between gap-4 py-4">
                            <div>
                              <p className="font-semibold text-eb-ink">{r.label}</p>
                              <p className="mt-1 text-[11px] uppercase tracking-wide text-neutral-400">Per term (exc VAT)</p>
                              <p className="text-sm text-neutral-600">{r.exc}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[11px] uppercase tracking-wide text-neutral-400">Per term (inc VAT)</p>
                              <p className="text-xl font-bold text-eb-ink">{r.inc}</p>
                            </div>
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

      {/* Private Tuition band */}
      {isVisible(tuition) && (
        <Reveal>
          <section className="relative z-[60] isolate overflow-x-clip bg-eb-navy">
            {tuition.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={tuition.image} alt="Private tuition" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
            <div className="relative mx-auto flex min-h-[280px] max-w-[1200px] flex-col justify-center px-4 py-10 lg:min-h-[360px] lg:px-16 lg:py-16">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-white/60">{tuition.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white lg:text-[48px]">{tuition.heading}</h2>
              <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-white/95 p-6 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:max-w-2xl lg:p-7">
                <p className="text-lg font-bold text-eb-ink">{tuition.label}</p>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-[11px] uppercase tracking-wide text-neutral-400">{tuition.feeLabel}</p>
                  <p className="text-2xl font-extrabold text-eb-ink">{tuition.feeValue}</p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* Medicine & Dentistry Pathway */}
      {isVisible(medicine) && (
        <Reveal>
          <section className="bg-eb-navy" style={bgStyle(medicine)}>
            <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-16 lg:py-20">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
                <div className="eb-stagger">
                  <p className="font-mono text-sm uppercase tracking-[0.14em] text-white/50">{medicine.eyebrow}</p>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white lg:text-[44px]">{medicine.heading}</h2>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">{medicine.body}</p>
                </div>
                <div>
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-white/15 pb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">{medicine.colService}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">{medicine.colFee}</span>
                  </div>
                  {medicineRows.map((r, i) => (
                    <div key={i} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/10 py-5 last:border-0">
                      <span className="font-mono text-sm text-white/40">{n2(i)}</span>
                      <span className="text-[15px] text-white/90 lg:text-base">{r.service}</span>
                      <span className="text-right font-bold text-white">{r.fee}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* Other Fees */}
      {isVisible(other) && (
        <Reveal>
          <section className="bg-eb-cream" style={bgStyle(other)}>
            <div className="mx-auto max-w-[900px] px-4 py-10 lg:py-20">
              <div className="eb-stagger text-center">
                <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">{other.eyebrow}</p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[48px]">{other.heading}</h2>
              </div>
              <div className="mt-10 overflow-hidden rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5 sm:p-4">
                <div className="hidden grid-cols-[1fr_auto] items-center gap-4 border-b border-black/10 px-6 py-3 sm:grid">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{other.colItem}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{other.colFee}</span>
                </div>
                {otherRows.map((r, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 border-b border-black/5 px-6 py-5 last:border-0">
                    <span className="text-[15px] text-eb-ink">{r.item}</span>
                    <span className="font-bold text-eb-ink">{r.fee}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* Important fee information */}
      {isVisible(notes) && (
        <Reveal>
          <section className="bg-white" style={bgStyle(notes)}>
            <div className="mx-auto max-w-[1200px] px-4 py-10 lg:py-20">
              <div className="eb-stagger text-center">
                <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">{notes.eyebrow}</p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[48px]">{notes.heading}</h2>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {noteCards.map((c, i) => (
                  <div key={i} className="flex flex-col rounded-2xl bg-eb-navy p-7 text-white">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 font-mono text-sm text-white/80">
                      {n2(i)}
                    </span>
                    <p className="mt-8 text-[15px] leading-relaxed text-white/85">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
