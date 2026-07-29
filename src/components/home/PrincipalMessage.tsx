import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { WordReveal } from "./WordReveal";

export function PrincipalMessage() {
  return (
    <section className="bg-eb-navy">
      <div className="mx-auto max-w-[1440px] px-4 py-14 text-center lg:px-20 lg:py-20">
        <p className="text-[16px] font-medium text-white">
          Message from the Principal
        </p>
        <WordReveal
          text="Students arrive at the College aiming to excel academically and secure a place on a course at their preferred university. We achieve this with exceptional teaching, small classes, and individual attention and help for every pupil."
          className="mx-auto mt-6 max-w-5xl text-2xl font-semibold leading-[1.25] text-white sm:text-3xl lg:text-[48px]"
        />
        <Link
          href="/about"
          className="eb-cta group mt-10 inline-flex items-center gap-3 rounded bg-white py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-eb-navy"
        >
          Read more
          <span className="eb-square grid h-9 w-9 place-items-center rounded bg-eb-blue text-white">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
