import Link from "next/link";
import { FooterLinks } from "./FooterLinks";

const MAP_URL =
  "https://www.google.com/maps/place/Edgbaston+College/@52.4700978,-1.9147819,15z/data=!4m5!3m4!1s0x0:0xe22ea36ee96914c1!8m2!3d52.4700978!4d-1.9147819";

// Only pages that actually exist — placeholder links (Two Year Programme,
// Leavers' Destinations, Results, Sitemap, Job Vacancies, legal pages) are
// omitted until those pages are created in the admin dashboard.
const LINKS = [
  { label: "Enquire About A Course", href: "/contact" },
  { label: "One Year A-Level Retake Programme", href: "/one-year-a-level-retake" },
  { label: "Our Courses", href: "/courses" },
  { label: "Admissions Requirements", href: "/admissions-requirements" },
  { label: "About Us", href: "/about-us" },
  { label: "Our History", href: "/our-history" },
];

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-1 shrink-0 text-white">
      <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FigmaFooter() {
  return (
    <footer
      className="text-white"
      style={{
        background:
          "radial-gradient(110% 85% at 12% 100%, #2f7dc0 0%, rgba(47,125,192,0.35) 38%, rgba(47,125,192,0) 62%), #0e2f49",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-4 pt-12 lg:px-[60px] lg:pt-20">
        {/* Top: principal + intro */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/owais-ahmed.webp"
              alt="Owais Ahmed"
              className="h-12 w-12 rounded-md object-cover object-top sm:h-[89px] sm:w-[89px]"
              style={{ aspectRatio: "1 / 1" }} loading="lazy" decoding="async" />
            <div>
              <p className="text-[13px] text-white/70 sm:text-sm">Principal</p>
              <p className="text-base font-bold tracking-wide sm:text-lg">OWAIS AHMED</p>
            </div>
          </div>
          <p className="max-w-xl text-[14px] leading-relaxed text-white/85 sm:text-[15px] lg:text-right">
            Students arrive at the College aiming to excel academically and
            secure a place on a course at their preferred university. We achieve
            this with exceptional teaching, small classes, and individual
            attention and help for every pupil.
          </p>
        </div>

        <hr className="my-7 border-white/15 lg:my-12" />

        {/* Links + address + map */}
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.6fr] lg:gap-10">
          <FooterLinks links={LINKS} />

          <div className="rounded-xl bg-eb-navy-2 p-4 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wide">Address</h3>
                <p className="mt-6 font-mono text-sm text-white/70 sm:mt-8">Edgbaston College</p>
                <p className="mt-3 max-w-[220px] text-[15px] font-medium leading-relaxed sm:mt-4">
                  37 George Road, Edgbaston, Birmingham, B15 1PL
                </p>
                <ul className="mt-6 space-y-3.5 text-[15px] sm:mt-10 sm:space-y-4">
                  <li><a href="tel:01213060182" className="flex items-start gap-3 text-white/90 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"><Arrow /> 0121 306 0182</a></li>
                  <li><a href="mailto:enquiries@edgbastoncollege.co.uk" className="flex items-start gap-3 break-all text-white/90 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"><Arrow /> enquiries@edgbastoncollege.co.uk</a></li>
                  <li><a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/90 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"><Arrow /> Get Directions</a></li>
                </ul>
              </div>
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer" aria-label="Open Edgbaston College on Google Maps" className="block min-h-[240px] overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/map.webp" alt="Map to Edgbaston College" className="h-full w-full object-cover" loading="lazy" decoding="async" />
              </a>
            </div>
          </div>
        </div>

        {/* Big brand lockup */}
        <div className="pt-10 lg:pt-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/logo-stacked.svg" alt="Edgbaston College" className="w-full" loading="lazy" decoding="async" />
        </div>
        <div className="mt-6 border-t border-white/10 py-5 text-xs text-white/55 lg:mt-8">
          © {new Date().getFullYear()} Edgbaston College. All rights reserved. ·{" "}
          <Link href="/admin" className="hover:text-white">Staff login</Link>
        </div>
      </div>
    </footer>
  );
}
