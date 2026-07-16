import { Header, type NavLink } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSettings } from "@/lib/settings";
import { db } from "@/lib/db";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, navPages] = await Promise.all([
    getSettings(),
    db.page.findMany({
      where: { published: true, showInNav: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Faculty", href: "/faculty" },
    { label: "About", href: "/about" },
    ...navPages.map((p) => ({ label: p.title, href: `/p/${p.slug}` })),
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <Header siteName={settings.siteName} navLinks={navLinks} />
      <main className="flex-1">{children}</main>
      <Footer
        siteName={settings.siteName}
        tagline={settings.tagline}
        email={settings.email}
        phone={settings.phone}
        address={settings.address}
        navLinks={navLinks}
      />
    </>
  );
}
