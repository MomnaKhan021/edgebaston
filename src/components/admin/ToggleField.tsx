"use client";

import { useState } from "react";

/** On/off switch that submits "1" (shown) or "0" (hidden). */
export function ToggleField({ name, defaultValue = "1" }: { name: string; defaultValue?: string }) {
  const [on, setOn] = useState(defaultValue !== "0");
  return (
    <label className="flex w-fit cursor-pointer items-center gap-3">
      <input type="hidden" name={name} value={on ? "1" : "0"} />
      <span
        role="switch"
        aria-checked={on}
        tabIndex={0}
        onClick={() => setOn((v) => !v)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOn((v) => !v)}
        className={
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors " +
          (on ? "bg-eb-blue" : "bg-neutral-300")
        }
      >
        <span
          className={
            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform " +
            (on ? "translate-x-[22px]" : "translate-x-0.5")
          }
        />
      </span>
      <span className="text-sm font-medium text-eb-navy">{on ? "Shown on the site" : "Hidden from the site"}</span>
    </label>
  );
}
