import type { Metadata } from "next";
import Link from "next/link";
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { Slider } from "@/components/home/Slider";
import { ArrowUpRight } from "@/components/home/icons";
import { InspectionTabs } from "@/components/about/InspectionTabs";
import { RichText } from "@/components/site/RichText";
import { getTemplateSections } from "@/lib/sections";
import { sectionDefaults, parseItems, isVisible, bgStyle } from "@/lib/templates";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Edgbaston College — a family-owned, top-performing sixth form college in Birmingham. Meet our principal, our mission, our history and our teachers.",
};

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

function GradeBadge({ from, to }: { from: string; to: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-eb-navy">
      {from}
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h9M6 1l4 4-4 4M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
      {to}
    </span>
  );
}

export default async function AboutUsPage() {
  const s = await getTemplateSections("about");
  const d = (k: string) => ({ ...sectionDefaults("about", k), ...s[k] });
  const hero = d("hero");
  const principal = d("principal");
  const mission = d("mission");
  const history = d("history");
  const teachers = d("teachers");
  const inspection = d("inspection");
  const testimonials = d("testimonials");
  const approachCards = parseItems(mission.cards);
  const historyCards = parseItems(history.cards);
  const staffCards = parseItems(teachers.cards);
  const studentCards = parseItems(testimonials.cards);
  const featured = studentCards[0];
  const restStudents = studentCards.slice(1);
  return (
    <>
      <SiteAnnouncement />

      {/* Hero */}
      <section className="relative z-[60] isolate overflow-x-clip bg-eb-navy">
        <SiteNavbar />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.bgDesktop || "/figma/course-retake.webp"} alt="Edgbaston College student" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="relative mx-auto flex min-h-[380px] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-36 lg:min-h-[460px] lg:px-16 lg:pb-12">
          <h1 className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[52px]">
            {hero.heading}
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-16">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-eb-navy">Home</Link><span className="px-2">/</span>
            <Link href="/courses" className="hover:text-eb-navy">Courses</Link><span className="px-2">/</span>
            <span className="text-eb-navy">About Us</span>
          </nav>
          <Share />
        </div>
      </div>

      {/* Principal's Welcome */}
      {isVisible(principal) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(principal)}>
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={principal.image || "/figma/owais-ahmed.webp"} alt="Principal" className="aspect-[4/5] w-full object-cover object-top" loading="lazy" decoding="async" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[40px]">{principal.heading}</h2>
              <RichText html={principal.para1} className="mt-6 text-[15px] leading-relaxed text-neutral-600" />
              <RichText html={principal.para2} className="mt-4 text-[15px] leading-relaxed text-neutral-600" />
              {principal.quote && (
              <blockquote className="mt-6 border-l-4 border-eb-blue pl-5 text-lg font-bold text-eb-navy">
                &ldquo;{principal.quote}&rdquo;
              </blockquote>
              )}
              {principal.buttonUrl && (
              <Link href={principal.buttonUrl} className="eb-cta group mt-8 inline-flex items-center gap-3 rounded-full bg-eb-navy py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-white">
                {principal.buttonLabel}
                <span className="eb-square grid h-9 w-9 place-items-center rounded-md bg-eb-blue text-white"><ArrowUpRight className="h-5 w-5" /></span>
              </Link>
              )}
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Education with a Purpose */}
      {isVisible(mission) && (
      <Reveal>
        <section className="bg-eb-navy" style={bgStyle(mission)}>
          <div className="mx-auto max-w-[1320px] px-4 py-12 lg:px-16 lg:py-16">
            <div className="eb-stagger text-center">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-white/50">{mission.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white lg:text-[42px]">{mission.heading}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
                {mission.body}
              </p>
              {mission.approachLabel && <p className="mt-8 inline-block rounded-full bg-white/10 px-5 py-2 font-mono text-xs uppercase tracking-widest text-white/70">{mission.approachLabel}</p>}
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {approachCards.map((a, i) => (
                <div key={i} className="rounded-2xl bg-white/[0.06] p-6">
                  <span className="font-mono text-sm text-eb-blue">{a.n}</span>
                  <h3 className="mt-4 text-lg font-bold text-white">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Our History */}
      {isVisible(history) && (
      <Reveal>
        <section className="bg-eb-cream" style={bgStyle(history)}>
          <div className="mx-auto max-w-[1320px] px-4 py-12 lg:py-16">
            <div className="eb-stagger text-center">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">{history.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[42px]">{history.heading}</h2>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {historyCards.map((h, i) => (
                <div key={i} className="border-t-2 border-eb-navy/15 pt-5">
                  <h3 className="text-lg font-bold text-eb-navy">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{h.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Experienced teachers */}
      {isVisible(teachers) && (
      <Reveal>
        <section className="bg-eb-navy" style={bgStyle(teachers)}>
          <div className="mx-auto max-w-[1320px] px-4 py-12 lg:px-16 lg:py-16">
            <div className="eb-stagger text-center">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-white/50">{teachers.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white lg:text-[42px]">{teachers.heading}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
                {teachers.body}
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {staffCards.map((st, i) => (
                <div key={i} className="overflow-hidden rounded-2xl bg-white/[0.04]">
                  <div className="aspect-[4/5] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={st.image} alt={st.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white">{st.name}</h3>
                    <p className="text-sm font-medium text-eb-blue">{st.role}</p>
                    <p className="mt-3 text-[13px] leading-relaxed text-white/65">{st.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Inspection Reports */}
      {isVisible(inspection) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(inspection)}>
          <div className="mx-auto max-w-[1320px] px-4 py-12 lg:py-16">
            <div className="eb-stagger">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">{inspection.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[42px]">{inspection.heading}</h2>
            </div>
            <div className="mt-10">
              <InspectionTabs />
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* What our students say */}
      {isVisible(testimonials) && (
      <Reveal>
        <section className="bg-eb-cream" style={bgStyle(testimonials)}>
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-16 lg:py-16">
            <Slider label={testimonials.label} title={testimonials.title}>
              {/* Featured */}
              {featured && (
              <div className="eb-card grid w-[90%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white sm:w-[640px] sm:grid-cols-2">
                <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[420px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featured.image} alt={featured.name} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  <span className="absolute bottom-20 left-4 text-2xl font-bold text-white drop-shadow-lg">{featured.name}</span>
                  <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white px-4 py-2.5">
                    <GradeBadge from={featured.from} to={featured.to} />
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-neutral-600">{featured.course}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-7">
                  <p className="text-lg font-bold leading-relaxed text-eb-navy">
                    &ldquo;{featured.quote}&rdquo;
                  </p>
                  <button className="mt-6 self-start text-sm font-bold uppercase tracking-wide text-eb-navy underline underline-offset-4">View full profile</button>
                </div>
              </div>
              )}
              {restStudents.map((c, i) => (
                <div key={i} className="eb-card group relative w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl bg-eb-navy sm:w-[300px]">
                  <div className="relative aspect-[3/4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute bottom-20 left-4 text-2xl font-bold text-white drop-shadow-lg">{c.name}</span>
                    <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white px-4 py-2.5">
                      <GradeBadge from={c.from} to={c.to} />
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-neutral-600">{c.course}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </Reveal>
      )}

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
