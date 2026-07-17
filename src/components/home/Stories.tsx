import { Slider } from "./Slider";

function GradeBadge({ from, to }: { from: string; to: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-eb-navy">
      {from}
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
        <path d="M0 5h9M6 1l4 4-4 4M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {to}
    </span>
  );
}

function PhotoCaption({ name, from, to, course }: { name: string; from: string; to: string; course: string }) {
  return (
    <>
      <span className="absolute bottom-20 left-4 text-2xl font-bold text-white drop-shadow-lg">
        {name}
      </span>
      <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white px-4 py-2.5">
        <GradeBadge from={from} to={to} />
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-neutral-600">{course}</p>
      </div>
    </>
  );
}

const COMPACT = [
  { name: "Nicole", img: "/figma/news-1.png", from: "BB", to: "A*A*", course: "Dentistry at King's College London" },
  { name: "Tara", img: "/figma/news-2.png", from: "BB", to: "AA", course: "Medicine at Edge Hill University" },
  { name: "Jacob", img: "/figma/pathway-3.png", from: "CC", to: "A*A", course: "Engineering at University of Warwick" },
];

export function Stories() {
  return (
    <section className="bg-eb-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-16 lg:py-24">
        <Slider label="Success Stories" title="Real Students. Real Grade Transformation.">
          {/* Featured */}
          <div className="grid w-[90%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white sm:w-[640px] sm:grid-cols-2">
            <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/pathway-2.png" alt="Alishba" className="h-full w-full object-cover" />
              <PhotoCaption name="Alishba" from="BB" to="A*A*" course="Law at University of Cambridge" />
            </div>
            <div className="flex flex-col justify-between p-7">
              <p className="text-lg font-bold leading-relaxed text-eb-navy">
                &ldquo;The career guidance was absolutely transformative for me.
                Umar&apos;s Chemistry teaching helped me jump from a D to an A,
                whilst Owais&apos;s university advice gave me clear direction for
                my future. I&apos;m incredibly grateful for the comprehensive
                academic and careers support.&rdquo;
              </p>
              <button className="mt-6 self-start text-sm font-bold uppercase tracking-wide text-eb-navy underline underline-offset-4">
                View full profile
              </button>
            </div>
          </div>

          {/* Compact */}
          {COMPACT.map((c) => (
            <div key={c.name} className="relative w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl bg-eb-navy sm:w-[300px]">
              <div className="relative aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
                <button aria-label="Expand" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-md bg-white text-eb-navy">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                </button>
                <PhotoCaption name={c.name} from={c.from} to={c.to} course={c.course} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
