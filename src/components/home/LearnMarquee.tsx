import { ArrowUpRight } from "./icons";

export function LearnMarquee() {
  const items = Array.from({ length: 8 });
  return (
    <div className="overflow-hidden bg-eb-navy py-5">
      <div className="eb-marquee-track eb-marquee-fast items-center">
        {items.map((_, i) => (
          <span key={i} className="flex items-center gap-6 pr-6">
            <span className="text-2xl font-extrabold tracking-tight text-white lg:text-[32px]">
              Learn Today. Lead Tomorrow.
            </span>
            <ArrowUpRight className="h-6 w-6 text-eb-blue" />
          </span>
        ))}
      </div>
    </div>
  );
}
