import Link from "next/link";
import type { NavLink } from "./Header";

export function Footer({
  siteName,
  tagline,
  email,
  phone,
  address,
  navLinks,
}: {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  navLinks: NavLink[];
}) {
  return (
    <footer className="mt-auto bg-brand text-white/90">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-sm font-bold">
              {siteName.charAt(0)}
            </span>
            <span className="text-lg font-bold text-white">{siteName}</span>
          </div>
          <p className="text-sm text-white/70">{tagline}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/60">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/60">
            Get in touch
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>{address}</li>
            <li>
              <a href={`mailto:${email}`} className="hover:text-accent">
                {email}
              </a>
            </li>
            <li>
              <a href={`tel:${phone}`} className="hover:text-accent">
                {phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/60 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <Link href="/admin" className="hover:text-accent">
            Staff / Admin login
          </Link>
        </div>
      </div>
    </footer>
  );
}
