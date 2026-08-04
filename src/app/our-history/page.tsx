import type { Metadata } from "next";
import Link from "next/link";
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { ArrowUpRight } from "@/components/home/icons";
import { IconBulb, IconUsers, IconGear, IconCrest } from "@/components/history/HistoryIcons";
import { SharePage } from "@/components/history/SharePage";
import { RichText } from "@/components/site/RichText";
import { getTemplateSections } from "@/lib/sections";
import { sectionDefaults, parseItems, isVisible, bgStyle } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "The history of Edgbaston College — our commitment to excellence, founded in 2015, and our family-owned ethos.",
};

const COMMIT_ICONS = [IconBulb, IconUsers, IconGear, IconCrest];

export default async function OurHistoryPage() {
  const s = await getTemplateSections("history");
  const d = (k: string) => ({ ...sectionDefaults("history", k), ...s[k] });
  const hero = d("hero");
  const commitment = d("commitment");
  const founded = d("founded");
  const blockA = d("blockA");
  const blockB = d("blockB");
  const commitCards = parseItems(commitment.cards);
  return (
    <>
      <SiteAnnouncement />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-eb-navy">
        <SiteNavbar />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.bgDesktop || "/figma/history-hero.webp"} alt="Edgbaston College students" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="relative mx-auto flex min-h-[440px] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-36 lg:min-h-[520px] lg:px-16 lg:pb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[56px]">
            {hero.heading}
          </h1>
          {hero.buttonUrl && (
          <Link href={hero.buttonUrl} className="eb-cta group mt-6 inline-flex items-center gap-3 self-start rounded-full bg-white py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-eb-navy">
            {hero.buttonLabel}
            <span className="eb-square grid h-9 w-9 place-items-center rounded-md bg-eb-blue text-white"><ArrowUpRight className="h-5 w-5" /></span>
          </Link>
          )}
        </div>
      </section>

      {/* Breadcrumb — the divider is inset by the page padding (not full-bleed);
          breadcrumb + share icons stack centered on mobile */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-16">
          <div className="flex flex-col items-center gap-3 border-b py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left sm:py-5">
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-eb-navy">Home</Link>
              <span className="px-2">/</span>
              <Link href="/courses" className="hover:text-eb-navy">Courses</Link>
              <span className="px-2">/</span>
              <span className="text-eb-navy">Our History</span>
            </nav>
            <SharePage title="Edgbaston College — Our History" />
          </div>
        </div>
      </div>

      {/* Our Commitment to Excellence */}
      {isVisible(commitment) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(commitment)}>
          <div className="mx-auto max-w-[1320px] px-4 py-8 lg:py-14">
            <div className="eb-stagger mx-auto max-w-2xl text-center">
              <h2 className="text-[24px] font-extrabold tracking-tight text-eb-ink sm:text-3xl lg:text-[40px]">{commitment.heading}</h2>
              <RichText html={commitment.body} className="mt-3 text-[14px] leading-relaxed text-neutral-600 sm:text-[15px]" />
            </div>
            <div className="eb-noscroll -mx-4 mt-7 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mt-10 sm:gap-5 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
              {commitCards.map((c, i) => {
                const Icon = COMMIT_ICONS[i % COMMIT_ICONS.length];
                return (
                <div key={i} className="eb-card w-[78%] shrink-0 snap-start rounded-2xl bg-eb-cream p-5 sm:w-[300px] sm:p-6 lg:w-auto">
                  <Icon className="h-8 w-8 text-eb-navy sm:h-9 sm:w-9" />
                  <h3 className="mt-3 text-[16px] font-bold text-eb-navy sm:text-lg">{c.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-neutral-600 sm:text-sm">{c.body}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Founded in 2015 */}
      {isVisible(founded) && (
      <Reveal>
        <section className="bg-eb-navy" style={bgStyle(founded)}>
          <div className="eb-stagger mx-auto max-w-[1320px] px-4 pt-8 sm:pt-12 lg:px-16 lg:pt-14">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 sm:text-sm">{founded.eyebrow}</p>
            <p className="mt-2 text-[52px] font-extrabold leading-none text-white sm:text-7xl lg:text-[100px]">{founded.year}</p>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-white/85 sm:mt-6 sm:text-lg lg:text-xl">
              {founded.body}
            </p>
          </div>
          {/* decorative vertical-line band */}
          <div
            className="mt-8 h-10 sm:mt-12 sm:h-16"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.28) 0 1px, transparent 1px 12px)",
            }}
            aria-hidden
          />
        </section>
      </Reveal>
      )}

      {/* Content block A: image left, text right */}
      {isVisible(blockA) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(blockA)}>
          <div className="mx-auto grid max-w-[1320px] items-stretch gap-4 px-4 py-8 lg:grid-cols-2 lg:gap-10 lg:px-16 lg:py-14">
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={blockA.image || "/figma/history-a.webp"} alt="Edgbaston student" className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto" loading="lazy" decoding="async" />
            </div>
            {/* Light card, same height as the image; intro top, note pinned bottom */}
            <div className="flex flex-col justify-between gap-8 rounded-2xl bg-eb-cream p-5 sm:p-8 lg:gap-12 lg:p-10">
              <p className="text-[18px] font-bold leading-snug text-eb-navy sm:text-[20px] lg:text-[24px]">
                {blockA.lead}
              </p>
              <p className="text-[13px] leading-relaxed text-eb-navy/80 sm:text-[14px]">
                {blockA.note}
              </p>
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Content block B: text left, image right */}
      {isVisible(blockB) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(blockB)}>
          <div className="mx-auto grid max-w-[1320px] items-stretch gap-4 px-4 pb-12 lg:grid-cols-2 lg:gap-10 lg:px-16 lg:pb-20">
            {/* Light card, same height as the image; intro top, note pinned bottom */}
            <div className="order-2 flex flex-col justify-between gap-8 rounded-2xl bg-eb-cream p-5 sm:p-8 lg:order-1 lg:gap-12 lg:p-10">
              <p className="text-[18px] font-bold leading-snug text-eb-navy sm:text-[20px] lg:text-[24px]">
                {blockB.lead}
              </p>
              <p className="text-[13px] leading-relaxed text-eb-navy/80 sm:text-[14px]">
                {blockB.note}
              </p>
            </div>
            <div className="order-1 overflow-hidden rounded-2xl lg:order-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={blockB.image || "/figma/history-grass.webp"} alt="Edgbaston student outdoors" className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto" loading="lazy" decoding="async" />
            </div>
          </div>
        </section>
      </Reveal>
      )}

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
