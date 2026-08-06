import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <SiteNavbar variant="solid" />
      <main className="flex-1 bg-white">{children}</main>
      <FigmaFooter />
    </>
  );
}
