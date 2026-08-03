"use client";

import { useState } from "react";

/**
 * Colour field: a swatch picker synced with a hex text input. An empty value
 * means "use the site's default colour", so a Clear button is provided.
 */
export function ColorField({ name, defaultValue = "" }: { name: string; defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const valid = /^#[0-9a-fA-F]{6}$/.test(value);

  return (
    <div className="flex items-center gap-3">
      {/* The submitted value (may be empty = default) */}
      <input type="hidden" name={name} value={value} />
      <input
        type="color"
        aria-label="Pick a colour"
        value={valid ? value : "#0e2f49"}
        onChange={(e) => setValue(e.target.value)}
        className="h-10 w-14 cursor-pointer rounded-md border bg-background p-1"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
        placeholder="Default"
        className="w-32 rounded-lg border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-eb-blue"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="text-xs font-semibold text-muted-foreground underline-offset-2 hover:text-eb-navy hover:underline"
        >
          Clear (use default)
        </button>
      )}
    </div>
  );
}
