import { ArrowUpRight } from "./icons";
import { bgStyle } from "@/lib/templates";

export function LearnMarquee({ data }: { data?: Record<string, string> }) {
  const message = data?.message || "Learn Today. Lead Tomorrow.";
  const items = Array.from({ length: 8 });
  return (
    <div className="overflow-hidden bg-eb-navy py-4 sm:py-6 lg:py-10" style={bgStyle(data)}>
      <div className="eb-marquee-track eb-marquee-fast items-center">
        {items.map((_, i) => (
          <span key={i} className="flex items-center gap-3 pr-5 lg:gap-4">
            <ArrowUpRight className="h-5 w-5 shrink-0 text-eb-blue lg:h-7 lg:w-7" />
            <span className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-[48px]">
              {message}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
