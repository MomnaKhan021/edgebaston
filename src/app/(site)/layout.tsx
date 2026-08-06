import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar variant="solid" />
      <main className="flex-1 bg-white">{children}</main>
      <FigmaFooter />
    </>
  );
}
