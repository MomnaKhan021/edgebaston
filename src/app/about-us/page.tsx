import type { Metadata } from "next";
import Link from "next/link";
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { Navbar } from "@/components/home/Navbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { Slider } from "@/components/home/Slider";
import { ArrowUpRight } from "@/components/home/icons";
import { InspectionTabs } from "@/components/about/InspectionTabs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Edgbaston College — a family-owned, top-performing sixth form college in Birmingham. Meet our principal, our mission, our history and our teachers.",
};

const APPROACH = [
  { n: "01", title: "Expert Teaching", body: "Our teachers are highly skilled and dedicated to providing exceptional teaching, tailored to meet each student's unique needs and aspirations." },
  { n: "02", title: "Constant Feedback", body: "We give students constant feedback and support, helping them continuously improve across their academic, personal and career pursuits." },
  { n: "03", title: "Modern & Forward-Thinking", body: "Our culture is modern and forward-thinking. We use technology, real-time data and step-by-step feedback to help students learn effectively." },
  { n: "04", title: "Career-Focused", body: "We focus on personal growth and career guidance, with regular career meetings and personal development sessions that build vital life skills, including interview technique and personal statements." },
];

const HISTORY = [
  { t: "Since day one", b: "Edgbaston College has always aimed to nurture potential and drive excellence in every area through small class sizes, consistent teaching and personalised attention for each student." },
  { t: "Founded in 2015", b: "Founded in 2015, Edgbaston College quickly gained recognition for its outstanding results. Growing steadily through word-of-mouth, our reputation for academic excellence has led to continuous expansion." },
  { t: "Family-owned", b: "Despite our growth, Edgbaston College remains family-owned, which allows us to prioritise what truly matters — a welcoming, supportive environment where each student is known and valued." },
  { t: "Oxbridge, Medicine & Dentistry", b: "Our dedication to student success has placed us amongst the leading providers for admission to prestigious universities and competitive courses, including Oxbridge, Medicine and Dentistry." },
];

const STAFF = [
  { name: "Brian Ray", role: "Principal", img: "/figma/staff-1.webp", body: "Created and led Edgbaston College in 2015 and previously worked as an MBA banker at UBS and J.P. Morgan." },
  { name: "David Morriss", role: "Vice Principal & Biology Teacher", img: "/figma/staff-2.webp", body: "An experienced teacher with over 20 years' experience; previously Head of Sixth Form at a grammar school." },
  { name: "Jeffrey", role: "Vice Principal & Maths Teacher", img: "/figma/staff-3.webp", body: "A qualified Maths and Physics teacher who has been with Edgbaston College for six years." },
  { name: "Dan", role: "Economics Teacher", img: "/figma/staff-4.webp", body: "A highly experienced Economics teacher with over 30 years' experience; formerly an Assistant Headteacher before joining the College." },
];

function Share() {
  const item = "grid h-9 w-9 place-items-center rounded-full border text-eb-navy transition hover:bg-eb-cream";
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Share This Page</span>
      <a href="#" aria-label="Facebook" className={item}><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9.5 16V9h2l.3-2.3H9.5V5.2c0-.66.2-1.1 1.14-1.1H12V2.1C11.7 2.06 10.9 2 10 2 8.06 2 6.75 3.16 6.75 5v1.7H4.7V9h2.05v7h2.75Z"/></svg></a>
      <a href="#" aria-label="X" className={item}><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M12.6 1.5h2.3L9.9 7.2l5.9 7.3h-4.6L7.6 9.9l-4.1 4.6H1.2l5.4-6.1L1 1.5h4.7l3.3 4.3 3.6-4.3Zm-.8 11.6h1.3L4.7 2.8H3.3l8.5 10.3Z"/></svg></a>
      <a href="#" aria-label="Email" className={item}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="3.5" width="12" height="9" rx="1.5"/><path d="M2.5 4.5 8 8.5l5.5-4"/></svg></a>
    </div>
  );
}

const STUDENTS = [
  { name: "Nicole", img: "/figma/news-1.webp", from: "BB", to: "A*A*", course: "Dentistry at King's College London" },
  { name: "Tara", img: "/figma/news-2.webp", from: "BB", to: "AA", course: "Medicine at Edge Hill University" },
];

function GradeBadge({ from, to }: { from: string; to: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-eb-navy">
      {from}
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h9M6 1l4 4-4 4M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
      {to}
    </span>
  );
}

export default function AboutUsPage() {
  return (
    <>
      <SiteAnnouncement />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-eb-navy">
        <Navbar />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/course-retake.webp" alt="Edgbaston College student" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="relative mx-auto flex min-h-[380px] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-36 lg:min-h-[460px] lg:px-16 lg:pb-12">
          <h1 className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[52px]">
            About Edgbaston College
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-16">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-eb-navy">Home</Link><span className="px-2">/</span>
            <Link href="/courses" className="hover:text-eb-navy">Courses</Link><span className="px-2">/</span>
            <span className="text-eb-navy">About Us</span>
          </nav>
          <Share />
        </div>
      </div>

      {/* Principal's Welcome */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/owais-ahmed.webp" alt="Principal Owais Ahmed" className="aspect-[4/5] w-full object-cover object-top" loading="lazy" decoding="async" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[40px]">Principal&apos;s Welcome</h2>
              <p className="mt-6 text-[15px] leading-relaxed text-neutral-600">
                Welcome to Edgbaston College, Birmingham&apos;s highest-performing sixth form college. As Principal and founder, I&apos;m incredibly proud of what we&apos;ve built over the past eight years. When I established the college, I wanted to create something special: a place focused on getting the very best from every single student. Today, I believe we&apos;ve achieved something remarkable.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
                Our value-added score of +0.59 in the most recent academic year makes us number one in Birmingham and 25th in England. What does this mean for your child? Students who might be predicted mid-B/BBB grades elsewhere are achieving AAA with us.
              </p>
              <blockquote className="mt-6 border-l-4 border-eb-blue pl-5 text-lg font-bold text-eb-navy">
                &ldquo;That&apos;s what happens when you combine small classes, exceptional teaching, and genuine individual attention.&rdquo;
              </blockquote>
              <Link href="/contact" className="eb-cta group mt-8 inline-flex items-center gap-3 rounded-full bg-eb-navy py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-white">
                About Owais Ahmed
                <span className="eb-square grid h-9 w-9 place-items-center rounded-md bg-eb-blue text-white"><ArrowUpRight className="h-5 w-5" /></span>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Education with a Purpose */}
      <Reveal>
        <section className="bg-eb-navy">
          <div className="mx-auto max-w-[1320px] px-4 py-12 lg:px-16 lg:py-16">
            <div className="eb-stagger text-center">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-white/50">Our Mission</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white lg:text-[42px]">Education with a Purpose</h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
                At Edgbaston College, our core mission is simple: to ensure students achieve top A-Level grades while equipping them with the skills and knowledge needed for excellent university and career outcomes.
              </p>
              <p className="mt-8 inline-block rounded-full bg-white/10 px-5 py-2 font-mono text-xs uppercase tracking-widest text-white/70">Our Approach</p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {APPROACH.map((a) => (
                <div key={a.n} className="rounded-2xl bg-white/[0.06] p-6">
                  <span className="font-mono text-sm text-eb-blue">{a.n}</span>
                  <h3 className="mt-4 text-lg font-bold text-white">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Our History */}
      <Reveal>
        <section className="bg-eb-cream">
          <div className="mx-auto max-w-[1320px] px-4 py-12 lg:py-16">
            <div className="eb-stagger text-center">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">Our Story</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[42px]">Our History</h2>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {HISTORY.map((h) => (
                <div key={h.t} className="border-t-2 border-eb-navy/15 pt-5">
                  <h3 className="text-lg font-bold text-eb-navy">{h.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{h.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Experienced teachers */}
      <Reveal>
        <section className="bg-eb-navy">
          <div className="mx-auto max-w-[1320px] px-4 py-12 lg:px-16 lg:py-16">
            <div className="eb-stagger text-center">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-white/50">Staff</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white lg:text-[42px]">Edgbaston College experienced teachers</h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
                Edgbaston College has a team of experienced teachers across a range of A-Level subjects, all committed to helping students reach their full potential — academically and personally.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STAFF.map((s) => (
                <div key={s.name} className="overflow-hidden rounded-2xl bg-white/[0.04]">
                  <div className="aspect-[4/5] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.img} alt={s.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white">{s.name}</h3>
                    <p className="text-sm font-medium text-eb-blue">{s.role}</p>
                    <p className="mt-3 text-[13px] leading-relaxed text-white/65">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Inspection Reports */}
      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1320px] px-4 py-12 lg:py-16">
            <div className="eb-stagger">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-eb-navy/60">Reports</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[42px]">Inspection Reports</h2>
            </div>
            <div className="mt-10">
              <InspectionTabs />
            </div>
          </div>
        </section>
      </Reveal>

      {/* What our students say */}
      <Reveal>
        <section className="bg-eb-cream">
          <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-16 lg:py-16">
            <Slider label="Student Success" title="What our students say">
              {/* Featured */}
              <div className="eb-card grid w-[90%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white sm:w-[640px] sm:grid-cols-2">
                <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[420px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/pathway-1.webp" alt="Alishba" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  <span className="absolute bottom-20 left-4 text-2xl font-bold text-white drop-shadow-lg">Alishba</span>
                  <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white px-4 py-2.5">
                    <GradeBadge from="BB" to="A*A*" />
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-neutral-600">Law at University of Cambridge</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-7">
                  <p className="text-lg font-bold leading-relaxed text-eb-navy">
                    &ldquo;The career guidance was absolutely transformative for me. Umar&apos;s Chemistry teaching helped me jump from a D to an A, whilst Owais&apos;s university advice gave me clear direction for my future. I&apos;m incredibly grateful for the comprehensive academic and careers support.&rdquo;
                  </p>
                  <button className="mt-6 self-start text-sm font-bold uppercase tracking-wide text-eb-navy underline underline-offset-4">View full profile</button>
                </div>
              </div>
              {STUDENTS.map((c) => (
                <div key={c.name} className="eb-card group relative w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl bg-eb-navy sm:w-[300px]">
                  <div className="relative aspect-[3/4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute bottom-20 left-4 text-2xl font-bold text-white drop-shadow-lg">{c.name}</span>
                    <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white px-4 py-2.5">
                      <GradeBadge from={c.from} to={c.to} />
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-neutral-600">{c.course}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </Reveal>

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}
