import Link from "next/link";
import { Socials } from "@/components/contact/Socials";
import { FooterLinks } from "./FooterLinks";

const LINKS = [
  "Enquire About A Course",
  "One Year A-Level Retake Programme",
  "Two Year A-Level Programme",
  "Leavers' Destinations",
  "Results",
  "Sitemap",
  "Job Vacancies",
  "Terms of Use",
  "Privacy Policy",
  "Cookie Usage",
  "High Visibility Version",
];

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-1 shrink-0 text-eb-blue">
      <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FigmaFooter() {
  return (
    <footer className="bg-gradient-to-b from-eb-navy via-eb-navy to-[#245a8a] text-white">
      <div className="mx-auto max-w-[1440px] px-4 pt-12 lg:px-[60px]">
        {/* Top: principal + intro */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/owais-ahmed.png"
              alt="Owais Ahmed"
              className="h-12 w-12 rounded-md object-cover object-top sm:h-[89px] sm:w-[89px]"
              style={{ aspectRatio: "1 / 1" }}
            />
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

        <hr className="my-8 border-white/15 lg:my-12" />

        {/* Links + address + map */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.6fr] lg:gap-10">
          <FooterLinks links={LINKS} />

          <div className="rounded-2xl bg-eb-navy-2 p-6 sm:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wide">Address</h3>
                <p className="mt-8 font-mono text-sm text-white/70">Edgbaston College</p>
                <p className="mt-4 max-w-[220px] text-[15px] font-medium leading-relaxed">
                  37 George Road, Edgbaston, Birmingham, B15 1PL
                </p>
                <ul className="mt-10 space-y-4 text-[15px]">
                  <li><a href="tel:01213060182" className="flex items-start gap-3 hover:text-white"><Arrow /> 0121 306 0182</a></li>
                  <li><a href="mailto:enquiries@edgbastoncollege.co.uk" className="flex items-start gap-3 break-all hover:text-white"><Arrow /> enquiries@edgbastoncollege.co.uk</a></li>
                  <li><a href="https://www.google.com/maps/search/?api=1&query=37+George+Road+Edgbaston+Birmingham+B15+1PL" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white"><Arrow /> Get Directions</a></li>
                </ul>
                <p className="mt-10 text-sm font-semibold text-white/70">Follow Us</p>
                <div className="mt-3">
                  <Socials variant="dark" />
                </div>
              </div>
              <div className="min-h-[240px] overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/map.png" alt="Map to Edgbaston College" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Big brand lockup */}
        <div className="pt-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/logo-stacked.svg" alt="Edgbaston College" className="w-full" />
        </div>
        <div className="border-t border-white/10 py-6 text-xs text-white/55">
          © {new Date().getFullYear()} Edgbaston College. All rights reserved. ·{" "}
          <Link href="/admin" className="hover:text-white">Staff login</Link>
        </div>
      </div>
    </footer>
  );
}
