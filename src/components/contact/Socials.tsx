import { SITE } from "@/lib/site";

const ICONS: Record<string, React.ReactNode> = {
  Instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  ),
  Facebook: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
      <path d="M9.5 16V9h2l.3-2.3H9.5V5.2c0-.66.2-1.1 1.14-1.1H12V2.1C11.7 2.06 10.9 2 10 2 8.06 2 6.75 3.16 6.75 5v1.7H4.7V9h2.05v7h2.75Z" />
    </svg>
  ),
  YouTube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.6 7.2a2.5 2.5 0 00-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 001.76-1.77A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3-5.2 3z" />
    </svg>
  ),
  Twitter: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.6 1.5h2.3L9.9 7.2l5.9 7.3h-4.6L7.6 9.9l-4.1 4.6H1.2l5.4-6.1L1 1.5h4.7l3.3 4.3 3.6-4.3Zm-.8 11.6h1.3L4.7 2.8H3.3l8.5 10.3Z" />
    </svg>
  ),
};

/** Row of real Edgbaston social links. `variant` picks light/dark styling. */
export function Socials({ variant = "light" }: { variant?: "light" | "dark" }) {
  const cls =
    variant === "dark"
      ? "border-white/25 text-white hover:bg-white/10"
      : "border-eb-navy/15 text-eb-navy hover:bg-eb-cream";
  return (
    <div className="flex items-center gap-3">
      {SITE.socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={"grid h-10 w-10 place-items-center rounded-full border transition " + cls}
        >
          {ICONS[s.label]}
        </a>
      ))}
    </div>
  );
}
