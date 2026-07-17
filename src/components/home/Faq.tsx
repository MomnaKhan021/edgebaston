"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "./icons";

const FAQS = [
  {
    q: "How many A-Levels can I retake?",
    a: "You can retake as many A-Levels as you need. Most students retake two or three subjects to strengthen their overall grade profile.",
  },
  {
    q: "Can I retake only one subject?",
    a: "Yes. Whether you need to improve a single grade or several, we build a plan around exactly the subjects you want to retake.",
  },
  {
    q: "Will I receive UCAS support?",
    a: "Absolutely. Every student receives personalised UCAS reapplication guidance, overseen by Principal Owais Ahmed.",
  },
  {
    q: "How often are assessments?",
    a: "We run weekly assessments and three full mock exams across the year, with targeted feedback after each one.",
  },
  {
    q: "Is accommodation available?",
    a: "We can advise on trusted local accommodation options for students relocating to study with us in Birmingham.",
  },
  {
    q: "How do I apply?",
    a: "Simply enquire through our contact page and our admissions team will guide you through every step of the application.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:py-24">
        <div>
          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-eb-ink lg:text-[58px]">
            A-Level retake &amp; resit FAQ
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-neutral-600">
            Quick answers to the most common questions about retaking and
            resitting A-Levels in Birmingham.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 rounded-lg bg-eb-cream py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-eb-navy transition hover:bg-eb-cream/70"
          >
            Contact Us
            <span className="grid h-9 w-9 place-items-center rounded-md bg-eb-blue text-white">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
        </div>

        <div>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-dashed border-neutral-300">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-xl font-bold text-eb-navy lg:text-2xl">
                    {item.q}
                  </span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center text-eb-navy">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M11 4v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={isOpen ? "opacity-0" : ""} />
                      <path d="M4 11h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <p className="-mt-2 pb-6 pr-10 text-[15px] leading-relaxed text-neutral-600">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
