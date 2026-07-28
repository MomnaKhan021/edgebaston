/** Line icons for the admin dashboard. Stroke uses currentColor. */
type P = { className?: string };
const base = "h-5 w-5";
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconOverview({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function IconCourses({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M3 8l9-4 9 4-9 4-9-4z" />
      <path d="M6.5 10v4.5c0 1.1 2.5 2.5 5.5 2.5s5.5-1.4 5.5-2.5V10" />
      <path d="M21 8v5" />
    </svg>
  );
}

export function IconStaff({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
      <path d="M16 5.2a3 3 0 010 5.6M17 20c0-2.6-1-4.5-2.8-5.4" />
    </svg>
  );
}

export function IconPages({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M6 3h8l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M14 3v4h4" />
      <path d="M8.5 12h7M8.5 15.5h7M8.5 8.5h2" />
    </svg>
  );
}

export function IconInquiries({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </svg>
  );
}

export function IconSettings({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M4.5 7.5l2 1.2M17.5 15.3l2 1.2M4.5 16.5l2-1.2M17.5 8.7l2-1.2" />
    </svg>
  );
}

export function IconExternal({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M14 4h6v6" />
      <path d="M20 4l-8 8" />
      <path d="M18 13v6a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h6" />
    </svg>
  );
}

export function IconSignOut({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M9 5H6a1 1 0 00-1 1v12a1 1 0 001 1h3" />
      <path d="M15 8l4 4-4 4" />
      <path d="M19 12H9" />
    </svg>
  );
}

export function IconPlus({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconMenu({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function IconClose({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
