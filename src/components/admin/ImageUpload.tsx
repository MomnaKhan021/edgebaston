"use client";

import { useRef, useState } from "react";
import { IconUpload, IconImage, IconTrash } from "./icons";

/**
 * Image picker for the admin forms. Lets the client upload a photo from their
 * device (with an instant preview) or paste an image URL. The resulting image
 * source — a downscaled data URI for uploads, or the URL — is written to a
 * hidden input (`name`) so it submits with the form and appears on the live
 * site immediately after saving.
 */
export function ImageUpload({
  name,
  defaultValue = "",
  aspect = "aspect-[4/3]",
}: {
  name: string;
  defaultValue?: string;
  /** Tailwind aspect ratio for the preview box, e.g. "aspect-square". */
  aspect?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Please choose an image file.");
      return;
    }
    setBusy(true);
    try {
      setValue(await downscale(file));
    } catch {
      window.alert("Sorry, that image couldn't be processed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      {/* Preview */}
      <div
        className={
          "relative w-full shrink-0 overflow-hidden rounded-xl border bg-eb-cream sm:w-56 " +
          aspect
        }
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <IconImage className="h-8 w-8" />
            <span className="text-xs">No image yet</span>
          </div>
        )}
        {busy && (
          <div className="absolute inset-0 grid place-items-center bg-white/70 text-xs font-medium text-eb-navy">
            Processing…
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg bg-eb-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-eb-navy-2"
          >
            <IconUpload className="h-4 w-4" />
            {value ? "Replace photo" : "Upload photo"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => setValue("")}
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-eb-navy transition hover:bg-eb-cream"
            >
              <IconTrash className="h-4 w-4" />
              Remove
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowUrl((v) => !v)}
          className="self-start text-xs font-medium text-eb-blue hover:underline"
        >
          {showUrl ? "Hide URL field" : "Or paste an image URL"}
        </button>
        {showUrl && (
          <input
            type="url"
            value={value.startsWith("data:") ? "" : value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://…"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-eb-blue focus:ring-2 focus:ring-eb-blue/20"
          />
        )}

        <p className="text-xs text-muted-foreground">
          Upload a JPG or PNG from your device. It appears on the live site as
          soon as you save.
        </p>
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      <input type="hidden" name={name} value={value} />
    </div>
  );
}

/**
 * Read a file, downscale it to a sane maximum dimension and return a data URI.
 * Keeps stored images small so pages stay fast and the database stays lean.
 */
function downscale(file: File, maxDim = 1400, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode failed"));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const scale = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("no canvas context"));
        ctx.drawImage(img, 0, 0, width, height);
        // Keep PNGs (transparency) as PNG; everything else as JPEG for size.
        const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
        resolve(canvas.toDataURL(mime, quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
