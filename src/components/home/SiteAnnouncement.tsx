import { getSection } from "@/lib/sections";
import { isVisible } from "@/lib/templates";
import { AnnouncementBar } from "./AnnouncementBar";

/** Server wrapper: feeds the admin-managed announcement content to the bar. */
export async function SiteAnnouncement() {
  const d = await getSection("home", "announcement");
  if (!isVisible(d)) return null;
  return (
    <AnnouncementBar
      badge={d.badge}
      message={d.message}
      linkLabel={d.linkLabel}
      linkUrl={d.linkUrl}
      bgColor={d.bgColor}
    />
  );
}
