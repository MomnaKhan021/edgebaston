import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { SharePage } from "@/components/site/SharePage";
import { TypeformEmbed } from "@/components/site/TypeformEmbed";
import { getTemplateSections } from "@/lib/sections";
import { isVisible } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Make an Enquiry",
  description:
    "Enquire about A-Level courses and admissions at Edgbaston College — fill in the form and our team will get back to you.",
};

export default async function InquiryPage() {
  const s = await getTemplateSections("inquiry");
  const hero = s.hero ?? {};
  const form = s.form ?? {};

  return (
    <>
      <AnnouncementBar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-eb-navy">
        <SiteNavbar />
        {hero.bgDesktop && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero.bgDesktop} alt="Edgbaston College enquiry" className="absolute inset-0 h-full w-full object-cover object-[center_30%]" fetchPriority="high" />
        )}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="relative mx-auto flex min-h-[360px] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-32 lg:min-h-[420px] lg:px-[60px] lg:pb-12">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            {hero.heading || "Make an Enquiry"}
          </h1>
          {hero.subtext && (
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85">{hero.subtext}</p>
          )}
        </div>
      </section>

      {/* Breadcrumb + share */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-[60px]">
          <div className="flex flex-col items-center gap-3 border-b border-black/10 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:py-5 sm:text-left">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-eb-navy">Home</Link>
              <span className="px-2 text-neutral-300">/</span>
              <Link href="/contact" className="hover:text-eb-navy">Contact</Link>
              <span className="px-2 text-neutral-300">/</span>
              <span className="font-medium text-eb-navy">Enquiry</span>
            </nav>
            <SharePage title="Make an Enquiry — Edgbaston College" />
          </div>
        </div>
      </div>

      {/* Enquiry form */}
      {isVisible(form) && (
        <Reveal>
          <section className="bg-white">
            <div className="mx-auto max-w-[900px] px-4 py-10 lg:px-[60px] lg:py-16">
              {(form.heading || form.intro) && (
                <div className="mb-8 text-center">
                  {form.heading && (
                    <h2 className="text-[26px] font-extrabold tracking-tight text-eb-ink sm:text-3xl lg:text-[40px]">{form.heading}</h2>
                  )}
                  {form.intro && (
                    <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-eb-navy/75">{form.intro}</p>
                  )}
                </div>
              )}
              <TypeformEmbed formId={form.formId || ""} />
            </div>
          </section>
        </Reveal>
      )}

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
