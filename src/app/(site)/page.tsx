import Link from "next/link";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { CourseCard } from "@/components/site/CourseCard";

export default async function HomePage() {
  const [settings, featured, staff, stats] = await Promise.all([
    getSettings(),
    db.course.findMany({
      where: { published: true, featured: true },
      orderBy: { order: "asc" },
      take: 3,
    }),
    db.staff.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      take: 4,
    }),
    Promise.all([
      db.course.count({ where: { published: true } }),
      db.staff.count({ where: { published: true } }),
    ]),
  ]);
  const [courseCount, staffCount] = stats;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand text-white">
        {settings.heroImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={settings.heroImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
        )}
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="max-w-2xl">
            <p className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-accent">
              {settings.tagline}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              {settings.heroTitle}
            </h1>
            <p className="mt-5 text-lg text-white/80">
              {settings.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="rounded-lg bg-accent px-6 py-3 font-semibold text-brand-dark transition hover:brightness-105"
              >
                Explore courses
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Book a visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-muted">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 md:grid-cols-4">
          {[
            { value: `${courseCount}+`, label: "Courses" },
            { value: `${staffCount}+`, label: "Expert staff" },
            { value: "95%", label: "Graduate success" },
            { value: "20+", label: "Years of excellence" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-brand">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-brand">Featured courses</h2>
            <p className="mt-2 text-muted-foreground">
              Discover our most popular programmes.
            </p>
          </div>
          <Link
            href="/courses"
            className="hidden text-sm font-semibold text-accent hover:underline sm:block"
          >
            View all →
          </Link>
        </div>
        {featured.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No featured courses yet.</p>
        )}
      </section>

      {/* Staff highlight */}
      <section className="bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-3xl font-bold text-brand">
            Meet our people
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl border bg-background p-5 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-muted">
                  {member.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl font-bold text-brand/30">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-brand">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faculty"
              className="text-sm font-semibold text-accent hover:underline"
            >
              View all staff →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-brand px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to start your journey?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Applications are open. Speak to our admissions team and take the
            first step towards your future.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-brand-dark transition hover:brightness-105"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
