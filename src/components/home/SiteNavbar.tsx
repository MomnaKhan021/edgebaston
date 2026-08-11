import { getSection } from "@/lib/sections";
import { isVisible } from "@/lib/templates";
import { Navbar } from "./Navbar";

/** Server wrapper: feeds the admin-managed header content to the navbar. */
export async function SiteNavbar({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const d = await getSection("header", "navbar");
  // Admin can hide the header site-wide (Templates → Header → Show the header).
  if (!isVisible(d)) return null;
  return <Navbar variant={variant} data={d} />;
}
