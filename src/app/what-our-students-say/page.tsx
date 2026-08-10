import type { Metadata } from "next";
import Link from "next/link";
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { StoryCard, type Story } from "@/components/course/StoryCard";
import { notFound, redirect } from "next/navigation";
import { getTemplateSections, getPagePublished, getPageMeta, getPageRedirect } from "@/lib/sections";
import { sectionDefaults, parseItems, isVisible, bgStyle } from "@/lib/templates";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta("success-stories");
  return {
    title: m.metaTitle ? { absolute: m.metaTitle } : "What Our Students Say",
    description:
      m.metaDescription ||
      "Real success stories from Edgbaston College students — grade jumps and university places.",
  };
}

export const dynamic = "force-dynamic";

export default async function WhatOurStudentsSayPage() {
  if (!(await getPagePublished("success-stories"))) notFound();
  const redirectTo = await getPageRedirect("success-stories");
  if (redirectTo) redirect(redirectTo);
  const s = await getTemplateSections("success-stories");
  const d = (k: string) => ({ ...sectionDefaults("success-stories", k), ...s[k] });
  const hero = d("hero");
  const stories = d("stories");

  const cards: Story[] = parseItems(stories.cards).map((c) => ({
    name: c.name ?? "",
    img: c.image || "/figma/pathway-1.webp",
    from: c.from ?? "",
    to: c.to ?? "",
    course: c.course ?? "",
    quote: c.quote ?? "",
  }));
  const hasImage = Boolean(hero.bgDesktop);

  return (
    <>
      <SiteAnnouncement />
      <SiteNavbar variant="solid" />

      {/* Banner */}
      {isVisible(hero) && (
        <section className={"relative isolate overflow-hidden " + (hasImage ? "bg-eb-navy" : "bg-eb-cream")} style={bgStyle(hero)}>
          {hasImage && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.bgDesktop} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/30" />
            </>
          )}
          <div className="relative mx-auto max-w-[1320px] px-4 py-14 lg:px-16 lg:py-20">
            <p className={"font-mono text-sm uppercase tracking-[0.14em] " + (hasImage ? "text-white/70" : "text-eb-blue")}>
              {hero.eyebrow}
            </p>
            <h1 className={"mt-3 text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl " + (hasImage ? "text-white" : "text-eb-ink")}>
              {hero.heading}
            </h1>
          </div>
        </section>
      )}

      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1320px] px-4 lg:px-16">
          <nav className="border-b py-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-eb-navy">Home</Link>
            <span className="px-2">/</span>
            <span className="text-eb-navy">What Our Students Say</span>
          </nav>
        </div>
      </div>

      {/* Success stories */}
      {isVisible(stories) && (
        <Reveal>
          <section className="bg-white" style={bgStyle(stories)}>
            <div className="mx-auto max-w-[1320px] px-4 py-12 lg:px-16 lg:py-16">
              <div className="mx-auto max-w-2xl text-center">
                <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">{stories.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[42px]">{stories.heading}</h2>
                {stories.subtitle && <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-600">{stories.subtitle}</p>}
              </div>
              {cards.length > 0 && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {cards.map((story, i) => (
                    <StoryCard key={i} story={story} className="h-[400px] w-full sm:h-[420px]" />
                  ))}
                </div>
              )}
            </div>
          </section>
        </Reveal>
      )}

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
