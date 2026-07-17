import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
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

export const metadata: Metadata = {
  title: "Edgbaston College — Birmingham's Top-Performing Sixth Form College",
  description:
    "Edgbaston College is Birmingham's top-performing independent sixth form college, offering A-Level retakes, five-term and transfer pathways with small classes and outstanding results.",
};

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Hero />
      <FeatureStrip />
      <Reveal><PrincipalMessage /></Reveal>
      <Reveal><Pathways /></Reveal>
      <Reveal><Results /></Reveal>
      <Reveal><Stories /></Reveal>
      <Reveal><WhyChoose /></Reveal>
      <LearnMarquee />
      <Reveal><Faq /></Reveal>
      <Reveal><News /></Reveal>
      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
