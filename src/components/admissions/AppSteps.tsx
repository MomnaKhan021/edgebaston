"use client";

import { useState } from "react";

const DEFAULT_STEPS = [
  {
    title: "Get in Touch",
    body: "Complete our online enquiry form, call us on 0121 306 0182, or email admissions@edgbastoncollege.co.uk. We are glad to answer any questions you have.",
  },
  { title: "A Look at the Application", body: "We review your application and previous results to understand your academic background." },
  { title: "A Conversation", body: "We arrange a friendly conversation to get to know you and discuss your goals." },
  { title: "An Offer", body: "Successful applicants receive an offer outlining their place and next steps." },
  { title: "Confirming a Place", body: "Confirm your place and we'll guide you through enrolment and induction." },
];

export function AppSteps({ steps }: { steps?: { title: string; body: string }[] }) {
  const STEPS = steps && steps.length > 0 ? steps : DEFAULT_STEPS;
  const [open, setOpen] = useState(0);
  return (
    <div>
      {STEPS.map((s, i) => {
        const active = open === i;
        return (
          <button
            key={s.title}
            onClick={() => setOpen(i)}
            className="block w-full border-b border-white/15 py-6 text-left last:border-0"
          >
            <div className="flex items-baseline gap-4">
              <span className={"font-mono text-sm " + (active ? "text-eb-blue" : "text-white/40")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={"text-2xl font-bold transition lg:text-[28px] " + (active ? "text-white" : "text-white/50")}>
                {s.title}
              </span>
            </div>
            <div
              className="grid transition-all duration-500 ease-out"
              style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-md pl-10 pt-3 text-[15px] leading-relaxed text-white/75">
                  {s.body}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
