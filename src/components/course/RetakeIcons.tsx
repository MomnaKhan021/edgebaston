type P = { className?: string };
const base = "h-8 w-8 text-eb-navy";

/** Exceptional results — upward chart. */
export function IconResults({ className = base }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M5 27h22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 22l6-7 5 4 7-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 9h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Frequent exam practice — document with lines. */
export function IconPractice({ className = base }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="7" y="5" width="18" height="22" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M11 11h10M11 16h10M11 21h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Bespoke reapplication — target. */
export function IconTarget({ className = base }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Genuinely small classes — group of people. */
export function IconClasses({ className = base }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M5 26c0-4.4 3.1-7 7-7s7 2.6 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 9.5a3.5 3.5 0 010 6.5M23 26c0-3.3-1.4-5.8-3.6-6.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Supportive environment — heart in hands. */
export function IconSupport({ className = base }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M16 24s-7-4.2-7-9.2A4 4 0 0116 12a4 4 0 017 2.8C23 19.8 16 24 16 24z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

/** Focused exam window — clock. */
export function IconWindow({ className = base }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2" />
      <path d="M16 10v6l4 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Small check used in the "plan built around you" cards. */
export function IconCheck({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
