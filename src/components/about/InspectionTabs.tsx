"use client";

import { useState } from "react";

const TABS = [
  {
    key: "Letter from the Principal",
    title: "Letter From The Principal",
    body: "Dear Edgbaston College Community, I am thrilled to share the results of our most recent Ofsted inspection, which took place from the 12th to the 14th of March 2024. It was our first full inspection, and it is with great pleasure that I announce Edgbaston College has been rated 'Good' across all evaluated areas — including the Quality of Education, Behaviour and Attitudes, Personal Development, and Leadership and Management. I extend our deepest gratitude to our dedicated staff members, whose tireless efforts have been pivotal in achieving this result. Our students also deserve immense praise for showcasing the true spirit and qualities of our school.",
  },
  {
    key: "Education",
    title: "Quality of Education",
    body: "Inspectors recognised the strength of our teaching and the depth of subject knowledge across our staff. Small classes and personalised support ensure every student is challenged and stretched to reach their full potential.",
  },
  {
    key: "Careers",
    title: "Careers & Destinations",
    body: "Our careers guidance — including personalised UCAS support overseen by the Principal — was highlighted as a real strength, helping students progress to Russell Group and competitive university courses.",
  },
  {
    key: "Supportive Environment",
    title: "A Supportive Environment",
    body: "Behaviour and personal development were rated highly. Students told inspectors they feel safe, known and valued, reflecting our family-owned, open-door ethos.",
  },
  {
    key: "Looking Forward",
    title: "Looking Forward",
    body: "We are proud of this result and committed to building on it — continuing to raise standards and support every student to achieve their highest aspirations.",
  },
];

export function InspectionTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
      {/* Tab list */}
      <div className="eb-noscroll -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-0 lg:px-0">
        {TABS.map((t, i) => (
          <button
            key={t.key}
            onClick={() => setActive(i)}
            className={
              "shrink-0 whitespace-nowrap rounded-lg px-5 py-3 text-left text-sm font-bold uppercase tracking-wide transition lg:whitespace-normal lg:rounded-none lg:border-l-2 " +
              (i === active
                ? "bg-eb-navy text-white lg:border-eb-blue lg:bg-transparent lg:text-eb-navy"
                : "bg-eb-cream text-eb-navy/60 lg:border-transparent lg:bg-transparent")
            }
          >
            {t.key}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/about-owais-seated.png" alt="Principal Owais Ahmed" className="aspect-[4/3] w-full object-cover" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-eb-navy">{tab.title}</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">{tab.body}</p>
        </div>
      </div>
    </div>
  );
}
