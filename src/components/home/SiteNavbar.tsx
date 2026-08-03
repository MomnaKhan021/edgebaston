import { getSection } from "@/lib/sections";
import { Navbar } from "./Navbar";

/** Server wrapper: feeds the admin-managed header content to the navbar. */
export async function SiteNavbar({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const d = await getSection("header", "navbar");
  return <Navbar variant={variant} data={d} />;
}
