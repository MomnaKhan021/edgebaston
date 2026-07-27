import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { ArrowUpRight } from "@/components/home/icons";
import { IconBulb, IconUsers, IconGear, IconCrest } from "@/components/history/HistoryIcons";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "The history of Edgbaston College — our commitment to excellence, founded in 2015, and our family-owned ethos.",
};

const COMMITMENTS = [
  { Icon: IconBulb, title: "Nurturing Potential", body: "We nurture each student's potential and encourage them to strive for excellence in every area." },
  { Icon: IconUsers, title: "Small Class Sizes", body: "We provide small class sizes to ensure every student receives focused support and attention." },
  { Icon: IconGear, title: "Excellent Teaching", body: "We provide excellent teaching to support students throughout their academic journeys." },
  { Icon: IconCrest, title: "Personalised Attention", body: "We give each student personalised attention and exceptional support for their future careers." },
];

function Share() {
  const item = "grid h-9 w-9 place-items-center rounded-full border text-eb-navy transition hover:bg-eb-cream";
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Share This Page</span>
      <a href="#" aria-label="Share on Facebook" className={item}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9.5 16V9h2l.3-2.3H9.5V5.2c0-.66.2-1.1 1.14-1.1H12V2.1C11.7 2.06 10.9 2 10 2 8.06 2 6.75 3.16 6.75 5v1.7H4.7V9h2.05v7h2.75Z"/></svg>
      </a>
      <a href="#" aria-label="Share on X" className={item}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M12.6 1.5h2.3L9.9 7.2l5.9 7.3h-4.6L7.6 9.9l-4.1 4.6H1.2l5.4-6.1L1 1.5h4.7l3.3 4.3 3.6-4.3Zm-.8 11.6h1.3L4.7 2.8H3.3l8.5 10.3Z"/></svg>
      </a>
      <a href="#" aria-label="Share by email" className={item}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="3.5" width="12" height="9" rx="1.5"/><path d="M2.5 4.5 8 8.5l5.5-4"/></svg>
      </a>
    </div>
  );
}

export default function OurHistoryPage() {
  return (
    <>
      <AnnouncementBar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-eb-navy">
        <Navbar />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/history-hero.png" alt="Edgbaston College students" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="relative mx-auto flex min-h-[440px] max-w-[1440px] flex-col justify-end px-6 pb-10 pt-36 lg:min-h-[520px] lg:px-16 lg:pb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[56px]">
            Edgbaston History
          </h1>
          <Link href="/contact" className="eb-cta group mt-6 inline-flex items-center gap-3 self-start rounded-full bg-white py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-eb-navy">
            Enquire About Course
            <span className="eb-square grid h-9 w-9 place-items-center rounded-md bg-eb-blue text-white"><ArrowUpRight className="h-5 w-5" /></span>
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-16">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-eb-navy">Home</Link>
            <span className="px-2">/</span>
            <Link href="/courses" className="hover:text-eb-navy">Courses</Link>
            <span className="px-2">/</span>
            <span className="text-eb-navy">Our History</span>
          </nav>
          <Share />
        </div>
      </div>

      {/* Our Commitment to Excellence */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1320px] px-6 py-14 lg:py-20">
            <div className="eb-stagger mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[44px]">Our Commitment to Excellence</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
                Our commitment to providing exceptional support for students&apos; academic journeys and future careers has resulted in first-class outcomes.
              </p>
            </div>
            <div className="eb-noscroll -mx-6 mt-10 flex snap-x gap-5 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
              {COMMITMENTS.map(({ Icon, title, body }) => (
                <div key={title} className="eb-card w-[78%] shrink-0 snap-start rounded-2xl bg-eb-cream p-7 sm:w-[300px] lg:w-auto">
                  <Icon className="h-9 w-9 text-eb-navy" />
                  <h3 className="mt-6 text-lg font-bold text-eb-navy">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Founded in 2015 */}
      <Reveal>
        <section className="bg-eb-navy">
          <div className="eb-stagger mx-auto max-w-[1320px] px-6 pt-16 lg:px-16 lg:pt-20">
            <p className="font-mono text-sm uppercase tracking-[0.14em] text-white/60">Founded In</p>
            <p className="mt-2 text-7xl font-extrabold leading-none text-white lg:text-[120px]">2015</p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85 lg:text-xl">
              Edgbaston College quickly gained recognition for its outstanding results. Growing steadily through word-of-mouth recommendations, our reputation for academic excellence and individualised learning has led to continuous expansion.
            </p>
          </div>
          {/* decorative vertical-line band */}
          <div
            className="mt-12 h-16"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.28) 0 1px, transparent 1px 12px)",
            }}
            aria-hidden
          />
        </section>
      </Reveal>

      {/* Content block A: image left, text right */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1320px] items-center gap-8 px-6 py-14 lg:grid-cols-2 lg:gap-14 lg:px-16 lg:py-20">
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/history-a.png" alt="Edgbaston student" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div>
              <p className="text-2xl font-bold leading-snug text-eb-navy lg:text-[28px]">
                Despite our growth, Edgbaston College remains family-owned, which allows us to prioritise what truly matters – creating a welcoming and supportive environment where each student is known and valued.
              </p>
              <p className="mt-6 text-[15px] leading-relaxed text-neutral-600">
                Our open-door policy ensures students and parents feel comfortable seeking guidance and support at any time, fostering a strong sense of community and shared purpose.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Content block B: text left, image right */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1320px] items-center gap-8 px-6 pb-16 lg:grid-cols-2 lg:gap-14 lg:px-16 lg:pb-24">
            <div className="order-2 lg:order-1">
              <p className="text-2xl font-bold leading-snug text-eb-navy lg:text-[28px]">
                Our unwavering dedication to student success has consistently placed us amongst the leading providers for students seeking admission to prestigious universities and competitive courses, including Oxbridge, Medicine, and Dentistry.
              </p>
              <p className="mt-6 text-[15px] leading-relaxed text-neutral-600">
                This outstanding track record is a testament to our commitment to empowering students to achieve their highest aspirations.
              </p>
            </div>
            <div className="order-1 overflow-hidden rounded-2xl lg:order-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/history-grass.png" alt="Edgbaston student outdoors" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
