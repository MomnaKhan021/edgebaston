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
import { getTemplateSections } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Edgbaston College — Birmingham's Top-Performing Sixth Form College",
  description:
    "Edgbaston College is Birmingham's top-performing independent sixth form college, offering A-Level retakes, five-term and transfer pathways with small classes and outstanding results.",
};

export default async function HomePage() {
  const s = await getTemplateSections("home");
  return (
    <>
      <SiteAnnouncement />
      <Hero data={s.hero} />
      <FeatureStrip data={s["feature-strip"]} />
      <Reveal><PrincipalMessage data={s.principal} /></Reveal>
      <Reveal><Pathways data={s.pathways} /></Reveal>
      {/* Results manages its own staged reveals internally */}
      <Results data={s.results} />
      <Reveal><Stories data={s.stories} /></Reveal>
      <Reveal><WhyChoose data={s["why-choose"]} /></Reveal>
      <LearnMarquee data={s["learn-marquee"]} />
      <Reveal><Faq data={s.faq} /></Reveal>
      <Reveal><News data={s.news} /></Reveal>
      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
