import { ArrowRight } from "./icons";

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

function CompactCard({
  name,
  img,
  from,
  to,
  course,
}: {
  name: string;
  img: string;
  from: string;
  to: string;
  course: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-eb-navy">
      <div className="relative aspect-[3/4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={name} className="h-full w-full object-cover" />
        <button aria-label="Expand" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-md bg-white text-eb-navy">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
        <span className="absolute bottom-16 left-4 text-2xl font-bold text-white drop-shadow">
          {name}
        </span>
      </div>
      <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white px-4 py-2.5">
        <GradeBadge from={from} to={to} />
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-neutral-600">
          {course}
        </p>
      </div>
    </div>
  );
}

export function Stories() {
  return (
    <section className="bg-eb-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-16 lg:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.12em] text-eb-navy/70">
              Success Stories
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-eb-ink lg:text-[58px]">
              Real Students. Real Grade Transformation.
            </h2>
          </div>
          <div className="flex gap-3">
            <button aria-label="Previous" className="grid h-12 w-12 place-items-center rounded-lg bg-white text-eb-navy shadow-sm">
              <ArrowRight className="h-5 w-5 rotate-180" />
            </button>
            <button aria-label="Next" className="grid h-12 w-12 place-items-center rounded-lg bg-white text-eb-navy shadow-sm">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Featured */}
          <div className="grid overflow-hidden rounded-2xl bg-white sm:grid-cols-2">
            <div className="relative aspect-[3/4] sm:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/pathway-2.png" alt="Alishba" className="h-full w-full object-cover" />
              <span className="absolute bottom-16 left-4 text-2xl font-bold text-white drop-shadow">
                Alishba
              </span>
              <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white px-4 py-2.5">
                <GradeBadge from="BB" to="A*A*" />
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-neutral-600">
                  Law at University of Cambridge
                </p>
              </div>
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

          {/* Two compact */}
          <div className="grid grid-cols-2 gap-6">
            <CompactCard name="Nicole" img="/figma/news-1.png" from="BB" to="A*A*" course="Dentistry at King's College London" />
            <CompactCard name="Tara" img="/figma/news-2.png" from="BB" to="AA" course="Medicine at Edge Hill University" />
          </div>
        </div>
      </div>
    </section>
  );
}
