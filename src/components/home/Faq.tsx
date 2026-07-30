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
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-12 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:px-[60px] lg:py-20">
        {/* Heading + subtitle */}
        <div className="text-center lg:col-start-1 lg:row-start-1 lg:text-left">
          <h2 className="text-[26px] font-extrabold leading-[1.1] tracking-tight text-black sm:text-4xl sm:leading-[1.02] lg:text-[62px]">
            A-Level retake &amp; resit FAQ
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-neutral-600 sm:mt-6 sm:text-[15px] lg:mx-0">
            Quick answers to the most common questions about retaking and
            resitting A-Levels in Birmingham.
          </p>
        </div>

        {/* Accordion */}
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-dashed border-neutral-300">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-4 text-left sm:py-6"
                >
                  <span className="text-[16px] font-bold text-eb-navy sm:text-xl lg:text-[28px]">
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
                  <p className="-mt-1 pb-5 pr-10 text-[14px] leading-relaxed text-neutral-600 sm:-mt-2 sm:pb-6 sm:text-[15px]">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Us — full-width at the bottom on mobile, left column on desktop */}
        <Link
          href="/contact"
          className="eb-cta group flex w-full items-center justify-between gap-3 rounded bg-eb-cream py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-eb-navy lg:col-start-1 lg:row-start-2 lg:inline-flex lg:w-fit lg:justify-start lg:self-start"
        >
          Contact Us
          <span className="eb-square grid h-9 w-9 place-items-center rounded bg-eb-blue text-white">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
