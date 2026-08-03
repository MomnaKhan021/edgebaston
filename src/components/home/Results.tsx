import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { num, sectionDefaults, bgStyle, parseItems } from "@/lib/templates";

type Info = { label: string; title: string; body?: string; place?: string };

function InfoCard({ label, title, body, place }: Info) {
  return (
    <div className={"eb-card rounded-lg bg-eb-cream p-5 sm:rounded-xl sm:p-7 " + (place ?? "")}>
      <div>
        <p className="font-mono text-[12px] font-medium tracking-wide text-eb-blue sm:text-[16px]">{label}</p>
        <h4 className="mt-2 text-[18px] font-bold leading-tight text-eb-navy sm:mt-6 sm:text-[28px] lg:text-[32px]">{title}</h4>
      </div>
      {body && <p className="mt-2 text-[13px] leading-relaxed text-black sm:mt-[42px] sm:text-[16px]">{body}</p>}
    </div>
  );
}

/** Blue rosette medal with a ribbon hanger and a white star. */
function Medal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 52" fill="none" className={className} aria-hidden>
      <rect x="20.5" y="1.5" width="7" height="15" rx="3.5" fill="#1f6fb2" />
      <path
        d="M24 11 L27.11 14.41 L31.50 13.01 L32.49 17.51 L36.99 18.50 L35.59 22.89 L39.00 26.00 L35.59 29.11 L36.99 33.50 L32.49 34.49 L31.50 38.99 L27.11 37.59 L24.00 41.00 L20.89 37.59 L16.50 38.99 L15.51 34.49 L11.01 33.50 L12.41 29.11 L9.00 26.00 L12.41 22.89 L11.01 18.50 L15.51 17.51 L16.50 13.01 L20.89 14.41 Z"
        fill="#2781c8"
      />
      <path
        d="M24 19 L25.70 23.65 L30.66 23.84 L26.76 26.90 L28.11 31.66 L24.00 28.90 L19.89 31.66 L21.24 26.90 L17.34 23.84 L22.30 23.65 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function Results({ data }: { data?: Record<string, string> }) {
  const d = { ...sectionDefaults("home", "results"), ...data };
  const managed = parseItems(d.cards);
  const infoCards = managed.length
    ? managed
    : [
        { label: "Grade Performance", title: "A*-A / A*-B Results", body: "Clear academic proof showing how students perform across top grade bands." },
        { label: "Grade Improvement", title: "Value-Added Progress", body: "Shows how students improve from their starting point through personalised support." },
        { label: "Competitive Pathways", title: "Oxbridge Outcomes", body: "Support for ambitious students applying to Oxford, Cambridge, and high-tariff courses." },
        { label: "Specialist Routes", title: "Medicine & Dentistry", body: "Focused guidance for students aiming for medicine, dentistry, and clinical pathways." },
      ];
  const places = ["lg:col-start-1 lg:row-start-1", "lg:col-start-2 lg:row-start-1", "lg:col-start-1 lg:row-start-2", "lg:col-start-2 lg:row-start-2"];
  return (
    <section className="overflow-hidden bg-eb-navy" style={bgStyle(data)}>
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-10 lg:px-10 lg:pb-10 lg:pt-20">
        {/* Heading block (centered) */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[14px] font-medium tracking-[0.08em] text-white sm:text-[16px]">{d.eyebrow}</p>
            <h2 className="mt-4 text-[32px] font-extrabold leading-[1.05] tracking-tight text-white lg:text-[62px]">
              {d.heading}
            </h2>
          </div>
        </Reveal>

        {/* Door + flanking stat boxes (left higher, right lower).
            Fixed-width cards keep the curl arrows clear of them on every screen. */}
        <Reveal delay={120}>
          <div className="mx-auto mt-10 flex items-center justify-center sm:mt-[60px]">
            {/* Left box — higher */}
            <div className="z-10 w-[128px] shrink-0 -translate-y-8 rounded-xl bg-white/[0.08] px-3 py-4 text-center sm:w-[210px] sm:-translate-y-10 sm:p-[26px] lg:w-[240px] lg:-translate-y-12">
              <p className="font-mono text-[11px] font-medium text-white sm:text-[15px]">National Ranking</p>
              <CountUp to={num(d.rankingValue, 25)} prefix="#" className="my-1.5 block text-[34px] font-extrabold leading-none text-white sm:my-2 sm:text-5xl lg:text-[64px]" />
              <p className="text-[11px] leading-tight text-white/80 sm:text-[15px] sm:leading-snug">{d.rankingCaption}</p>
            </div>

            {/* Door. The horizontal margins are the “lanes” the curl arrows live in —
                each curl is narrower than its lane, so it never touches the cards or door. */}
            <div className="relative mx-1.5 shrink-0 sm:mx-16 lg:mx-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.doorImage || "/figma/door.svg"} alt="" className="h-32 w-auto sm:h-60 lg:h-72" loading="lazy" decoding="async" />
              {/* Lower-left curl: in the left lane, near the door base */}
              <svg className="pointer-events-none absolute right-full top-[62%] mr-0.5 w-4 sm:mr-2 sm:w-12 lg:mr-3 lg:w-[72px]" viewBox="0 0 104 69" fill="none" aria-hidden>
                <path d="M71.3764 68.2635C65.6291 67.2217 61.2657 64.6191 56.7708 61.0693C30.7677 63.7634 7.09109 22.8727 0.0488705 1.51722C-0.33552 0.351266 1.64699 -1.03145 2.51206 1.1517C8.31112 15.7843 15.6607 30.7346 26.3868 42.4145C27.8941 44.3315 30.4395 46.658 32.2214 48.3077C37.4787 53.1752 46.9654 58.8887 54.3524 58.4796C54.3069 58.4188 54.2619 58.3574 54.2174 58.2958C51.8907 55.053 49.5909 50.7676 50.3826 46.7695C51.7984 39.6199 60.7951 40.226 64.1295 45.5859C67.012 50.2195 66.8674 55.5793 62.3735 59.0223C61.7833 59.4747 60.9331 59.8355 60.2747 60.2718C60.3462 60.4628 60.4463 60.6231 60.6101 60.7469C69.7071 67.6215 83.1198 67.7935 93.1083 63.3167C95.182 62.4035 97.1777 61.3213 99.0753 60.0811C99.62 59.7201 101.371 58.4109 101.839 58.5152C105.082 59.2368 101.832 61.4527 100.941 62.0298C92.3095 67.6195 81.5418 70.4415 71.3764 68.2635ZM57.8369 44.0879C50.8637 43.3817 52.5547 51.2863 54.9701 54.8625C55.6579 55.8807 56.7846 57.5459 57.8232 58.2031C59.6695 57.7311 61.6265 56.7592 62.541 55.0222C64.7955 50.7406 62.5373 45.2363 57.8369 44.0879Z" fill="white" fillOpacity="0.85" />
              </svg>
              {/* Upper-right curl: in the right lane, near the door top */}
              <svg className="pointer-events-none absolute left-full top-[8%] ml-0.5 w-4 sm:ml-2 sm:w-12 lg:ml-3 lg:w-[72px]" viewBox="0 0 104 69" fill="none" aria-hidden>
                <path d="M31.8715 0.736496C37.6188 1.77827 41.9822 4.38091 46.4772 7.93071C72.4802 5.23661 96.1569 46.1273 103.199 67.4828C103.583 68.6487 101.601 70.0315 100.736 67.8483C94.9368 53.2157 87.5873 38.2654 76.8612 26.5855C75.3539 24.6685 72.8085 22.342 71.0266 20.6923C65.7693 15.8248 56.2826 10.1113 48.8955 10.5204C48.941 10.5812 48.986 10.6426 49.0306 10.7042C51.3573 13.947 53.657 18.2324 52.8653 22.2305C51.4495 29.3801 42.4528 28.774 39.1184 23.4141C36.2359 18.7805 36.3806 13.4207 40.8744 9.97769C41.4647 9.52528 42.3148 9.16446 42.9733 8.72823C42.9017 8.53723 42.8016 8.37693 42.6378 8.25308C33.5408 1.37851 20.1282 1.20648 10.1396 5.68328C8.06591 6.59653 6.07021 7.67869 4.17268 8.91887C3.62794 9.27992 1.87745 10.5891 1.40856 10.4848C-1.83426 9.76315 1.41579 7.54735 2.30696 6.97023C10.9385 1.38054 21.7062 -1.44152 31.8715 0.736496ZM45.4111 24.9121C52.3843 25.6183 50.6933 17.7137 48.2779 14.1375C47.5901 13.1193 46.4634 11.4541 45.4247 10.7969C43.5784 11.2689 41.6214 12.2408 40.707 13.9778C38.4525 18.2594 40.7107 23.7637 45.4111 24.9121Z" fill="white" fillOpacity="0.85" />
              </svg>
            </div>

            {/* Right box — lower, with rosette medal top-left */}
            <div className="relative z-10 w-[128px] shrink-0 translate-y-8 rounded-xl bg-white/[0.08] px-3 py-4 text-center sm:w-[210px] sm:translate-y-10 sm:p-[26px] lg:w-[240px] lg:translate-y-12">
              <Medal className="absolute right-2 top-2 h-5 w-5 sm:left-4 sm:right-auto sm:top-3 sm:h-8 sm:w-8" />
              <p className="font-mono text-[11px] font-medium text-white sm:text-[15px]">Value Added</p>
              <CountUp to={num(d.valueAddedValue, 1)} prefix="#" className="my-1.5 block text-[34px] font-extrabold leading-none text-white sm:my-2 sm:text-5xl lg:text-[64px]" />
              <p className="text-[11px] leading-tight text-white/80 sm:text-[15px] sm:leading-snug">{d.valueAddedCaption}</p>
            </div>
          </div>
        </Reveal>

        {/* Blue split bar (r12) — same visual width as the door composition */}
        <Reveal delay={240}>
          <div className="mx-auto mt-8 grid max-w-[860px] grid-cols-2 overflow-hidden rounded-xl bg-eb-blue sm:mt-10">
            <div className="flex items-center gap-2.5 border-r border-white/25 px-3.5 py-5 sm:gap-4 sm:px-7">
              <CountUp to={num(d.bar1Value, 96)} suffix="%" className="shrink-0 text-[28px] font-bold leading-none text-white sm:text-[32px] lg:text-[40px]" />
              <span className="text-[12px] leading-tight text-white sm:text-[14px] lg:text-[16px]">{d.bar1Text}</span>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 py-5 sm:gap-4 sm:px-7">
              <CountUp to={num(d.bar2Value, 72.7)} decimals={1} suffix="%" className="shrink-0 text-[28px] font-bold leading-none text-white sm:text-[32px] lg:text-[40px]" />
              <span className="text-[12px] leading-tight text-white sm:text-[14px] lg:text-[16px]">{d.bar2Text}</span>
            </div>
          </div>
        </Reveal>

        {/* White card (r12): 4 info cards + right column of tall card & button.
            The button bottom-aligns with the second row on desktop. */}
        <Reveal delay={360}>
          <div className="mt-10 lg:mx-5">
            <div className="rounded-xl bg-white p-3 sm:p-8 lg:p-10">
              <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:grid-rows-2">
                {infoCards.map((c, i) => (
                  <InfoCard key={i} label={c.label ?? ""} title={c.title ?? ""} body={c.body ?? ""} place={places[i % places.length]} />
                ))}

                {/* Right column: tall destinations card + button, bottom-aligned with the grid */}
                <div className="col-span-2 flex flex-col gap-3 sm:gap-6 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1">
                  <div className="eb-card flex flex-1 flex-col rounded-lg bg-eb-cream p-5 sm:rounded-xl sm:p-7">
                    <p className="font-mono text-[12px] font-medium tracking-wide text-eb-blue sm:text-[16px]">{d.destLabel}</p>
                    <h4 className="mt-2 text-[18px] font-bold leading-tight text-eb-navy sm:mt-6 sm:text-[28px] lg:text-[32px]">{d.destTitle}</h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-black sm:mt-[42px] sm:text-[16px] lg:mt-auto lg:pt-10">
                      {d.destBody}
                    </p>
                  </div>
                  {d.buttonUrl && (
                  <Link href={d.buttonUrl} className="eb-cta group flex shrink-0 items-center justify-between gap-4 rounded-lg bg-eb-cream py-2.5 pl-4 pr-2.5 text-left sm:py-3 sm:pl-5 sm:pr-3">
                    <span className="text-[12px] font-bold uppercase tracking-wide text-eb-navy sm:text-[14px]">{d.buttonLabel}</span>
                    <span className="eb-square grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-eb-blue text-white sm:h-11 sm:w-11">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
