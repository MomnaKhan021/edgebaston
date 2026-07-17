import Link from "next/link";
import { ArrowUpRight } from "./icons";

export function PrincipalMessage() {
  return (
    <section className="bg-eb-navy">
      <div className="mx-auto max-w-[1080px] px-6 py-20 text-center lg:py-28">
        <p className="font-mono text-sm uppercase tracking-[0.12em] text-white/60">
          Message from the Principal
        </p>
        <p className="mx-auto mt-8 max-w-4xl text-2xl font-medium leading-[1.35] text-white sm:text-3xl lg:text-[40px] lg:leading-[1.3]">
          Students arrive at the College aiming to excel academically and secure
          a place on a course at their preferred university. We achieve this with
          exceptional teaching, small classes, and individual attention and help
          for every pupil.
        </p>
        <Link
          href="/about"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-eb-navy transition hover:bg-white/90"
        >
          Read more
          <span className="grid h-9 w-9 place-items-center rounded-md bg-eb-blue text-white">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
