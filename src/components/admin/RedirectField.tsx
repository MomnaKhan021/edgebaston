"use client";

import { useState } from "react";
import { Input } from "@/components/admin/ui";

/**
 * Optional external-redirect control shared by the Page and Course editors.
 * When the checkbox is ticked, the public page/course is sent straight to the
 * URL below (a 307 redirect) instead of rendering its own content.
 */
export function RedirectField({
  defaultValue,
  noun = "page",
}: {
  defaultValue?: string;
  noun?: string;
}) {
  const [enabled, setEnabled] = useState(Boolean(defaultValue));

  return (
    <div>
      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="h-4 w-4 rounded border-border accent-[var(--brand)]"
        />
        Redirect this {noun} to another URL
      </label>
      <p className="mt-1 text-xs text-muted-foreground">
        When enabled, anyone opening this {noun} is sent straight to the link
        below instead of seeing its content.
      </p>

      {enabled ? (
        <div className="mt-3">
          <Input
            id="redirectUrl"
            name="redirectUrl"
            type="text"
            required
            defaultValue={defaultValue}
            placeholder="/courses/one-year-a-level-retake or https://example.com"
          />
        </div>
      ) : (
        // Keep the field in the form so unchecking clears any saved redirect.
        <input type="hidden" name="redirectUrl" value="" />
      )}
    </div>
  );
}
