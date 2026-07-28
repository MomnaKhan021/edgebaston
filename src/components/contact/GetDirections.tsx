"use client";

import { useState } from "react";
import { directionsUrl } from "@/lib/site";
import { ArrowUpRight } from "@/components/home/icons";

/**
 * Map + postcode field. Entering a postcode and pressing "Get directions"
 * opens Google Maps in a new tab with turn-by-turn directions from that
 * postcode to Edgbaston College.
 */
export function GetDirections() {
  const [postcode, setPostcode] = useState("");

  const go = () => {
    window.open(directionsUrl(postcode), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <a
        href={directionsUrl("")}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label="Open Edgbaston College on Google Maps"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/map.png" alt="Map to Edgbaston College" className="h-64 w-full object-cover sm:h-80" />
      </a>
      <div className="p-5 sm:p-6">
        <p className="text-sm text-neutral-600">
          For maps and directions, please enter your postcode in the box below.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            go();
          }}
          className="mt-3 flex flex-col gap-3 sm:flex-row"
        >
          <input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter your postcode"
            aria-label="Your postcode"
            className="flex-1 rounded-full border px-5 py-3 text-sm outline-none focus:border-eb-blue focus:ring-2 focus:ring-eb-blue/20"
          />
          <button
            type="submit"
            className="eb-cta group inline-flex items-center justify-center gap-2 rounded-full bg-eb-navy py-3 pl-6 pr-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-eb-navy-2"
          >
            Get directions
            <span className="eb-square grid h-8 w-8 place-items-center rounded-md bg-eb-blue text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
