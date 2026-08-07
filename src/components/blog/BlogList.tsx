"use client";

import { useState } from "react";
import Link from "next/link";

export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
};

const ALL = "__all__";

// Soft brand-tinted placeholders for cards without a cover image.
const TINTS = ["bg-eb-cream", "bg-eb-blue/10", "bg-eb-navy/5", "bg-[#f0ece6]"];

export function BlogList({
  posts,
  categories,
  categoriesLabel,
  allLabel,
}: {
  posts: PostCard[];
  categories: string[];
  categoriesLabel: string;
  allLabel: string;
}) {
  const [active, setActive] = useState(ALL);
  const filtered = active === ALL ? posts : posts.filter((p) => p.category === active);

  const chip = (selected: boolean) =>
    "shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition " +
    (selected
      ? "border-eb-blue bg-eb-blue text-white"
      : "border-eb-navy/15 text-eb-navy hover:border-eb-navy/40");

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1320px] px-4 py-10 lg:px-16 lg:py-14">
        {/* Category filter */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="shrink-0 text-lg font-extrabold text-eb-navy">{categoriesLabel}</span>
          <div className="eb-noscroll -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1">
            <button type="button" onClick={() => setActive(ALL)} className={chip(active === ALL)}>{allLabel}</button>
            {categories.map((c) => (
              <button key={c} type="button" onClick={() => setActive(c)} className={chip(active === c)}>{c}</button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm font-semibold text-eb-navy">
          Showing {filtered.length === 0 ? 0 : 1} - {filtered.length} of {filtered.length} Post{filtered.length === 1 ? "" : "s"}
        </p>

        {filtered.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed py-16 text-center text-sm text-neutral-500">
            No posts here yet — check back soon.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="eb-card group flex flex-col">
                <div className={`overflow-hidden rounded-2xl ${p.imageUrl ? "" : TINTS[i % TINTS.length]}`}>
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageUrl} alt={p.title} className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.03]" loading="lazy" decoding="async" />
                  ) : (
                    <div className="aspect-[16/10] w-full" />
                  )}
                </div>
                <div className="mt-4 flex flex-1 flex-col">
                  {p.category && (
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-eb-blue">{p.category}</span>
                  )}
                  <h3 className="mt-1.5 text-[20px] font-extrabold leading-snug tracking-tight text-eb-ink transition group-hover:text-eb-blue">
                    {p.title}
                  </h3>
                  {p.excerpt && <p className="mt-2 text-[14px] leading-relaxed text-neutral-600 line-clamp-3">{p.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
