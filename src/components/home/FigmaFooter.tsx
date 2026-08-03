import Link from "next/link";
import { FooterLinks } from "./FooterLinks";
import { getTemplateSections } from "@/lib/sections";
import { parseLinks, sectionDefaults } from "@/lib/templates";

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-1 shrink-0 text-white">
      <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Site footer — every block is editable in Admin → Templates → Footer. */
export async function FigmaFooter() {
  let s: Record<string, Record<string, string>>;
  try {
    s = await getTemplateSections("footer");
  } catch {
    s = {};
  }
  const intro = s.intro ?? sectionDefaults("footer", "intro");
  const links = s.links ?? sectionDefaults("footer", "links");
  const address = s.address ?? sectionDefaults("footer", "address");
  const brand = s.brand ?? sectionDefaults("footer", "brand");

  const linkItems = parseLinks(links.items);
  const mapUrl = address.mapUrl || "#";
  const phoneHref = "tel:" + (address.phone || "").replace(/\s+/g, "");
  const linkCls =
    "flex items-start gap-3 text-white/90 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline";

  return (
    <footer
      className="text-white"
      style={{
        background:
          intro.bgColor?.trim() ||
          "radial-gradient(110% 85% at 12% 100%, #2f7dc0 0%, rgba(47,125,192,0.35) 38%, rgba(47,125,192,0) 62%), #0e2f49",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-4 pt-12 lg:px-[60px] lg:pt-20">
        {/* Top: principal + intro */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={intro.photo || "/figma/owais-ahmed.webp"}
              alt={intro.name || "Principal"}
              className="h-12 w-12 rounded-md object-cover object-top sm:h-[89px] sm:w-[89px]"
              style={{ aspectRatio: "1 / 1" }}
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="text-[13px] text-white/70 sm:text-sm">{intro.role}</p>
              <p className="text-base font-bold tracking-wide sm:text-lg">{intro.name}</p>
            </div>
          </div>
          <p className="max-w-xl text-[14px] leading-relaxed text-white/85 sm:text-[15px] lg:text-right">
            {intro.message}
          </p>
        </div>

        <hr className="my-7 border-white/15 lg:my-12" />

        {/* Links + address + map */}
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.6fr] lg:gap-10">
          <FooterLinks links={linkItems} heading={links.heading} />

          <div
            className="rounded-xl bg-eb-navy-2 p-4 sm:p-8"
            style={address.cardColor?.trim() ? { backgroundColor: address.cardColor } : undefined}
          >
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wide">{address.heading}</h3>
                <p className="mt-6 font-mono text-sm text-white/70 sm:mt-8">{address.orgName}</p>
                <p className="mt-3 max-w-[220px] text-[15px] font-medium leading-relaxed sm:mt-4">
                  {address.address}
                </p>
                <ul className="mt-6 space-y-3.5 text-[15px] sm:mt-10 sm:space-y-4">
                  {address.phone && (
                    <li><a href={phoneHref} className={linkCls}><Arrow /> {address.phone}</a></li>
                  )}
                  {address.email && (
                    <li><a href={`mailto:${address.email}`} className={`${linkCls} break-all`}><Arrow /> {address.email}</a></li>
                  )}
                  {address.mapUrl && address.directionsLabel && (
                    <li><a href={mapUrl} target="_blank" rel="noopener noreferrer" className={linkCls}><Arrow /> {address.directionsLabel}</a></li>
                  )}
                </ul>
              </div>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${address.orgName} on Google Maps`}
                className="block min-h-[240px] overflow-hidden rounded-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={address.mapImage || "/figma/map.webp"}
                  alt={`Map to ${address.orgName}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Big brand lockup */}
        {brand.logo && (
          <div className="pt-10 lg:pt-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logo} alt={address.orgName || "Edgbaston College"} className="w-full" loading="lazy" decoding="async" />
          </div>
        )}
        <div className="mt-6 border-t border-white/10 py-5 text-xs text-white/55 lg:mt-8">
          © {new Date().getFullYear()} {brand.copyright}{" "}·{" "}
          <Link href="/admin" className="hover:text-white">Staff login</Link>
        </div>
      </div>
    </footer>
  );
}
