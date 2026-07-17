const ITEMS = [
  "Average Class Size of Seven",
  "Strong Pastoral Support",
  "Excellent Career & University Support",
  "Medicine & Dentistry Success",
  "Russell Group Progression",
];

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="mx-6 shrink-0 text-eb-blue">
      <path d="M7 0l1.6 4.4L13 6 8.6 7.6 7 12 5.4 7.6 1 6l4.4-1.6L7 0z" fill="currentColor" />
    </svg>
  );
}

export function FeatureStrip() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-eb-navy py-4">
      <div className="eb-marquee-track">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-[15px] font-medium text-white/90">{item}</span>
            <Star />
          </span>
        ))}
      </div>
    </div>
  );
}
