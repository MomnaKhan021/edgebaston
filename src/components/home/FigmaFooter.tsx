import Link from "next/link";

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
      <div className="mx-auto max-w-[1440px] px-6 pt-16 lg:px-16">
        {/* Top: principal + intro */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/avatar-principal.png"
              alt="Owais Ahmed"
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div>
              <p className="text-sm text-white/70">Principal</p>
              <p className="text-lg font-bold tracking-wide">OWAIS AHMED</p>
            </div>
          </div>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/85 lg:text-right">
            Students arrive at the College aiming to excel academically and
            secure a place on a course at their preferred university. We achieve
            this with exceptional teaching, small classes, and individual
            attention and help for every pupil.
          </p>
        </div>

        <hr className="my-12 border-white/15" />

        {/* Links + address + map */}
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr]">
          <div>
            <h3 className="text-base font-bold uppercase tracking-wide">Useful Links</h3>
            <ul className="mt-8 space-y-5">
              {LINKS.map((l) => (
                <li key={l}>
                  <Link href="#" className="flex items-start gap-3 text-[15px] text-white/85 transition hover:text-white">
                    <Arrow /> {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white/[0.06] p-6 sm:p-8">
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
                  <li><a href="#" className="flex items-start gap-3 hover:text-white"><Arrow /> Get Directions</a></li>
                </ul>
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
