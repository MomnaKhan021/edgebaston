import { ArrowUpRight } from "./icons";

export function LearnMarquee() {
  const items = Array.from({ length: 8 });
  return (
    <div className="overflow-hidden bg-eb-navy py-10">
      <div className="eb-marquee-track eb-marquee-fast items-center">
        {items.map((_, i) => (
          <span key={i} className="flex items-center gap-3 pr-5">
            <ArrowUpRight className="h-5 w-5 shrink-0 text-eb-blue" />
            <span className="text-xl font-extrabold tracking-tight text-white lg:text-[28px]">
              Learn Today. Lead Tomorrow.
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
