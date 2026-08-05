import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { SharePage } from "@/components/site/SharePage";
import { DetailAccordion, type AccordionItem } from "@/components/site/DetailAccordion";

export const metadata: Metadata = {
  title: "Staff",
  description:
    "Meet the experienced team of teachers and staff at Edgbaston College, committed to helping every student reach their full potential.",
};

export default async function StaffPage() {
  // Read published staff, ordered. Fall back to empty on a DB hiccup.
  const staff = await db.staff
    .findMany({ where: { published: true }, orderBy: { order: "asc" } })
    .catch(() => [] as Awaited<ReturnType<typeof db.staff.findMany>>);

  const items: AccordionItem[] = staff.map((m) => ({
    id: m.id,
    title: m.role ? `${m.name} – ${m.role}` : m.name,
    imageUrl: m.photoUrl || undefined,
    html: m.bio || undefined,
  }));

  return (
    <>
      <AnnouncementBar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-eb-navy">
        <Navbar />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/history-hero.webp" alt="Edgbaston College staff and students" className="absolute inset-0 h-full w-full object-cover object-[center_30%]" fetchPriority="high" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="relative mx-auto flex min-h-[360px] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-32 lg:min-h-[420px] lg:px-[60px] lg:pb-12">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            Staff
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
              <Link href="/about-us" className="hover:text-eb-navy">About Us</Link>
              <span className="px-2 text-neutral-300">/</span>
              <span className="font-medium text-eb-navy">Staff</span>
            </nav>
            <SharePage title="Staff — Edgbaston College" />
          </div>
        </div>
      </div>

      {/* Intro + accordion */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1080px] px-4 py-10 lg:px-[60px] lg:py-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[40px]">Staff</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-eb-navy/75">
              Edgbaston College has a team of experienced teachers across a range of A-Level subjects. Our teachers are all committed to helping students reach their full potential, in both their academic and personal goals.
            </p>
            <div className="mt-10">
              <DetailAccordion items={items} />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
