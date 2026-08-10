import type { Metadata } from "next";
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { Hero } from "@/components/home/Hero";
import { FeatureStrip } from "@/components/home/FeatureStrip";
import { PrincipalMessage } from "@/components/home/PrincipalMessage";
import { Pathways } from "@/components/home/Pathways";
import { Results } from "@/components/home/Results";
import { Stories } from "@/components/home/Stories";
import { WhyChoose } from "@/components/home/WhyChoose";
import { LearnMarquee } from "@/components/home/LearnMarquee";
import { Faq } from "@/components/home/Faq";
import { News } from "@/components/home/News";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { notFound, redirect } from "next/navigation";
import { getTemplateSections, getPagePublished, getPageMeta, getPageRedirect } from "@/lib/sections";
import { isVisible } from "@/lib/templates";
import { getSettings } from "@/lib/settings";

// The homepage title/description: the Home template's own SEO fields win, then
// the site-wide SEO settings, then these sensible defaults. `absolute` lets the
// admin control the exact title (no "| Site name" suffix).
export async function generateMetadata(): Promise<Metadata> {
  const [settings, m] = await Promise.all([getSettings(), getPageMeta("home")]);
  const metaTitle = m.metaTitle || settings.metaTitle;
  const metaDescription = m.metaDescription || settings.metaDescription;
  return {
    title: metaTitle
      ? { absolute: metaTitle }
      : "Edgbaston College — Birmingham's Top-Performing Sixth Form College",
    description:
      metaDescription ||
      "Edgbaston College is Birmingham's top-performing independent sixth form college, offering A-Level retakes, five-term and transfer pathways with small classes and outstanding results.",
  };
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  if (!(await getPagePublished("home"))) notFound();
  const redirectTo = await getPageRedirect("home");
  if (redirectTo) redirect(redirectTo);
  const s = await getTemplateSections("home");
  return (
    <>
      <SiteAnnouncement />
      {isVisible(s.hero) && <Hero data={s.hero} />}
      {isVisible(s["feature-strip"]) && <FeatureStrip data={s["feature-strip"]} />}
      {isVisible(s.principal) && <Reveal><PrincipalMessage data={s.principal} /></Reveal>}
      {isVisible(s.pathways) && <Reveal><Pathways data={s.pathways} /></Reveal>}
      {/* Results manages its own staged reveals internally */}
      {isVisible(s.results) && <Results data={s.results} />}
      {isVisible(s.stories) && <Reveal><Stories data={s.stories} /></Reveal>}
      {isVisible(s["why-choose"]) && <Reveal><WhyChoose data={s["why-choose"]} /></Reveal>}
      {isVisible(s["learn-marquee"]) && <LearnMarquee data={s["learn-marquee"]} />}
      {isVisible(s.faq) && <Reveal><Faq data={s.faq} /></Reveal>}
      {isVisible(s.news) && <Reveal><News data={s.news} /></Reveal>}
      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
