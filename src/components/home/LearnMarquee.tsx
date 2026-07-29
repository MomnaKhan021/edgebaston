import { ArrowUpRight } from "./icons";

export function LearnMarquee() {
  const items = Array.from({ length: 8 });
  return (
    <div className="overflow-hidden bg-eb-navy py-10">
      <div className="eb-marquee-track eb-marquee-fast items-center">
        {items.map((_, i) => (
          <span key={i} className="flex items-center gap-4 pr-5">
            <ArrowUpRight className="h-7 w-7 shrink-0 text-eb-blue" />
            <span className="text-3xl font-bold tracking-tight text-white lg:text-[48px]">
              Learn Today. Lead Tomorrow.
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
