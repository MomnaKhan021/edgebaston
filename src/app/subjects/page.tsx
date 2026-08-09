import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { SharePage } from "@/components/site/SharePage";
import { DetailAccordion, type AccordionItem } from "@/components/site/DetailAccordion";
import { notFound, redirect } from "next/navigation";
import { getTemplateSections, getPagePublished, getPageMeta, getPageRedirect } from "@/lib/sections";
import { parseItems, isVisible, overlayOn } from "@/lib/templates";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta("subjects");
  return {
    title: m.metaTitle ? { absolute: m.metaTitle } : "Subjects",
    description:
      m.metaDescription ||
      "Explore the range of A-Level subjects offered at Edgbaston College, with a definition of what you'll study in each.",
  };
}

export default async function SubjectsPage() {
  if (!(await getPagePublished("subjects"))) notFound();
  const redirectTo = await getPageRedirect("subjects");
  if (redirectTo) redirect(redirectTo);
  const s = await getTemplateSections("subjects");
  const hero = s.hero ?? {};
  const list = s.list ?? {};

  const items: AccordionItem[] = parseItems(list.items).map((it, i) => ({
    id: String(i),
    title: it.title || "Untitled",
    imageUrl: it.image || undefined,
    html: it.html || undefined,
  }));

  return (
    <>
      <AnnouncementBar />

      {/* Hero */}
      <section className="relative z-[60] isolate overflow-x-clip bg-eb-navy">
        <SiteNavbar />
        {hero.bgDesktop && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero.bgDesktop} alt="Edgbaston College subjects" className="absolute inset-0 h-full w-full object-cover object-[center_30%]" fetchPriority="high" />
        )}
        {overlayOn(hero) && (
          <>
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
          </>
        )}
        <div className="relative mx-auto flex min-h-[360px] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-32 lg:min-h-[420px] lg:px-[60px] lg:pb-12">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            {hero.heading || "Subjects"}
          </h1>
        </div>
      </section>

      {/* Breadcrumb + share */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-[60px]">
          <div className="flex flex-col items-center gap-3 border-b border-black/10 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:py-5 sm:text-left">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-eb-navy">Home</Link>
              <span className="px-2 text-neutral-300">/</span>
              <Link href="/courses" className="hover:text-eb-navy">Courses</Link>
              <span className="px-2 text-neutral-300">/</span>
              <span className="font-medium text-eb-navy">{hero.heading || "Subjects"}</span>
            </nav>
            <SharePage title="Subjects — Edgbaston College" />
          </div>
        </div>
      </div>

      {/* Intro + accordion */}
      {isVisible(list) && (
        <Reveal>
          <section className="bg-white">
            <div className="mx-auto max-w-[1080px] px-4 py-10 lg:px-[60px] lg:py-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[40px]">{list.heading || "Subjects"}</h2>
              {list.intro && (
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-eb-navy/75">{list.intro}</p>
              )}
              <div className="mt-10">
                <DetailAccordion items={items} />
              </div>
            </div>
          </section>
        </Reveal>
      )}

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
