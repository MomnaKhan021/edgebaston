/**
 * Real Edgbaston College contact details (sourced from edgbastoncollege.co.uk).
 * Central place so the footer, contact page and elsewhere stay consistent.
 */
export const SITE = {
  principal: "Owais Ahmed",
  phone: "0121 306 0182",
  phoneHref: "tel:01213060182",
  email: "enquiries@edgbastoncollege.co.uk",
  addressName: "Edgbaston College",
  addressLine: "37 George Road, Edgbaston, Birmingham, B15 1PL",
  /** Destination used for Google Maps directions. */
  mapsDestination: "Edgbaston College, 37 George Road, Edgbaston, Birmingham B15 1PL",
  company: {
    name: "Edgbaston College Ltd",
    number: "09463572",
    email: "enquiries@edgbastoncollege.co.uk",
    address: "746 Old Lode Lane, Solihull, B928NH",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/edgbastoncollege/" },
    { label: "Facebook", href: "https://www.facebook.com/EdgbastonCollege/" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UC3E7YvzyKiXpeLmpJSyy-xA" },
    { label: "Twitter", href: "https://www.twitter.com/Edgbaston_Coll" },
  ] as const,
} as const;

/** Google Maps directions URL from a user's postcode to the college. */
export function directionsUrl(origin: string) {
  const base = "https://www.google.com/maps/dir/?api=1";
  const params = new URLSearchParams({
    destination: SITE.mapsDestination,
  });
  if (origin.trim()) params.set("origin", origin.trim());
  return `${base}&${params.toString()}`;
}
