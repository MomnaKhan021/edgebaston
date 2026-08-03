import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { WordReveal } from "./WordReveal";
import { sectionDefaults } from "@/lib/templates";

export function PrincipalMessage({ data }: { data?: Record<string, string> }) {
  const d = { ...sectionDefaults("home", "principal"), ...data };
  return (
    <section className="bg-eb-navy">
      <div className="mx-auto max-w-[1440px] px-4 py-10 text-center lg:px-20 lg:py-20">
        <p className="font-mono text-[14px] font-medium tracking-[0.08em] text-white sm:text-[16px]">
          {d.eyebrow}
        </p>
        <WordReveal
          text={d.message}
          className="mx-auto mt-4 max-w-5xl text-[22px] font-semibold leading-[1.35] text-white sm:mt-6 sm:text-3xl sm:leading-[1.25] lg:text-[48px]"
        />
        {d.buttonUrl && (
          <Link
            href={d.buttonUrl}
            className="eb-cta group mt-6 flex w-full items-center justify-between gap-3 rounded-lg bg-white py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-eb-navy sm:mt-10 sm:inline-flex sm:w-fit sm:justify-start"
          >
            {d.buttonLabel}
            <span className="eb-square grid h-9 w-9 place-items-center rounded-lg bg-eb-blue text-white">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
