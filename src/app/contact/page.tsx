import type { Metadata } from "next";
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { GetDirections } from "@/components/contact/GetDirections";
import { Socials } from "@/components/contact/Socials";
import { ArrowUpRight } from "@/components/home/icons";
import { notFound, redirect } from "next/navigation";
import { getTemplateSections, getPagePublished, getPageMeta, getPageRedirect } from "@/lib/sections";
import { sectionDefaults, parseItems, isVisible, bgStyle, overlayOn } from "@/lib/templates";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta("contact");
  return {
    title: m.metaTitle ? { absolute: m.metaTitle } : "Contact",
    description:
      m.metaDescription ||
      "Get in touch with Edgbaston College — call, email or find directions to our Birmingham campus at 37 George Road, Edgbaston.",
  };
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6.5 4h3l1.2 4-2 1.4a12 12 0 005 5l1.4-2 4 1.2v3a2 2 0 01-2.2 2A16 16 0 014.5 6.2 2 2 0 016.5 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 6.5L12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-eb-navy/10 py-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-semibold text-eb-navy">{label}</span>
      <span className="text-[15px] text-neutral-600">{children}</span>
    </div>
  );
}

export default async function ContactPage() {
  if (!(await getPagePublished("contact"))) notFound();
  const redirectTo = await getPageRedirect("contact");
  if (redirectTo) redirect(redirectTo);
  const s = await getTemplateSections("contact");
  const d = (k: string) => ({ ...sectionDefaults("contact", k), ...s[k] });
  const hero = d("hero");
  const details = d("details");
  const company = d("company");
  const companyCards = parseItems(company.cards);
  const heroPhoneHref = "tel:" + (hero.phone || "").replace(/\s+/g, "");
  const detailsPhoneHref = "tel:" + (details.phone || "").replace(/\s+/g, "");
  return (
    <>
      <SiteAnnouncement />

      {/* Hero */}
      <section className="relative z-[60] isolate overflow-x-clip bg-eb-navy">
        <SiteNavbar />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.bgDesktop || "/figma/retake-hero.webp"} alt="Edgbaston College students" className="absolute inset-0 h-full w-full object-cover object-[center_30%]" fetchPriority="high" />
        {overlayOn(hero) && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-eb-navy/85 via-eb-navy/45 to-eb-navy/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-eb-navy/80 to-transparent" />
          </>
        )}
        <div className="relative mx-auto flex min-h-[420px] max-w-[1440px] flex-col justify-end px-4 pb-9 pt-32 lg:min-h-[520px] lg:px-16 lg:pb-12">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            {hero.heading}
          </h1>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {hero.phone && (
            <a
              href={heroPhoneHref}
              className="eb-cta group inline-flex items-center justify-between gap-3 rounded-full bg-eb-navy py-2 pl-5 pr-2 text-sm font-bold text-white ring-1 ring-white/20"
            >
              <span className="flex items-center gap-2"><PhoneIcon /> {hero.phone}</span>
              <span className="eb-square grid h-9 w-9 place-items-center rounded-md bg-eb-blue text-white"><ArrowUpRight className="h-5 w-5" /></span>
            </a>
            )}
            {hero.email && (
            <a
              href={`mailto:${hero.email}`}
              className="eb-cta group inline-flex items-center justify-between gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-bold text-eb-navy"
            >
              <span className="flex items-center gap-2"><MailIcon /> {hero.email}</span>
              <span className="eb-square grid h-9 w-9 place-items-center rounded-md bg-eb-blue text-white"><ArrowUpRight className="h-5 w-5" /></span>
            </a>
            )}
          </div>
        </div>
      </section>

      {/* Find us / Get directions */}
      {isVisible(details) && (
      <Reveal>
        <section className="bg-white" style={bgStyle(details)}>
          <div className="mx-auto max-w-[1320px] px-4 py-10 lg:px-16 lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-eb-navy/60">{details.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[42px]">{details.heading}</h2>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-14">
              {/* Contact details */}
              <div>
                <h3 className="text-xl font-bold text-eb-navy">Contact</h3>
                <div className="mt-4">
                  <DetailRow label="Principal">{details.principal}</DetailRow>
                  <DetailRow label={details.addressName}>{details.addressLine}</DetailRow>
                  <DetailRow label="Tel">
                    <a href={detailsPhoneHref} className="hover:text-eb-blue">{details.phone}</a>
                  </DetailRow>
                  <DetailRow label="E-Mail">
                    <a href={`mailto:${details.email}`} className="break-all hover:text-eb-blue">{details.email}</a>
                  </DetailRow>
                </div>
                <div className="mt-8">
                  <p className="text-sm font-semibold text-eb-navy">Follow Us</p>
                  <div className="mt-3">
                    <Socials />
                  </div>
                </div>
              </div>

              {/* Map + postcode */}
              <GetDirections />
            </div>
          </div>
        </section>
      </Reveal>
      )}

      {/* Company & Proprietor Information */}
      {isVisible(company) && (
      <Reveal>
        <section className="bg-eb-cream" style={bgStyle(company)}>
          <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:px-16 lg:py-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-eb-navy/60">{company.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-eb-ink lg:text-[38px]">
                {company.heading}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {companyCards.map((c, i) => (
                <div key={i} className="rounded-2xl bg-eb-navy p-6 text-white">
                  <p className="font-mono text-xs uppercase tracking-wide text-white/60">{c.label}</p>
                  <p className="mt-2 text-lg font-bold">{c.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      )}

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
