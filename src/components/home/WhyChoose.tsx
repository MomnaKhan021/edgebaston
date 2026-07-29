const ITEMS = [
  {
    icon: "/figma/why-1.svg",
    title: "Small Classes",
    body: "Maximum of 10 students per class, typically 7, so every student receives individual attention.",
  },
  {
    icon: "/figma/why-2.svg",
    title: "Progress",
    body: "Students gain an average of 1.78 grades per subject, with jumps from BBB to A*AA not uncommon.",
  },
  {
    icon: "/figma/why-3.svg",
    title: "Guidance",
    body: "Personalised UCAS reapplication guidance from Principal Owais Ahmed, who oversees applications.",
  },
  {
    icon: "/figma/why-4.svg",
    title: "Tailored",
    body: "Every student starts with a one-to-one academic consultation to identify gaps and build a personalised retake plan.",
  },
  {
    icon: "/figma/why-5.svg",
    title: "Excellence",
    body: "Weekly assessments, three mock exams, and targeted exam technique coaching help turn knowledge into marks.",
  },
];

function Card({ icon, title, body }: (typeof ITEMS)[number]) {
  return (
    <div className="eb-card group flex-1 rounded-2xl bg-eb-cream p-[42px] text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        className="mx-auto h-20 w-20 transition duration-300 group-hover:scale-110"
        style={{ aspectRatio: "1 / 1" }}
      />
      <h3 className="mt-6 text-[28px] font-bold leading-tight text-eb-navy">{title}</h3>
      <p className="mx-auto mt-3 max-w-xs text-[16px] leading-relaxed tracking-[-0.01em] text-neutral-600">
        {body}
      </p>
    </div>
  );
}

export function WhyChoose() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-20">
        <h2 className="mx-auto max-w-4xl text-center text-4xl font-extrabold leading-[1.02] tracking-tight text-black lg:text-[62px]">
          Why Students Choose Edgbaston College
        </h2>
        {/* Top row: three cards */}
        <div className="mt-12 flex flex-col gap-4 lg:flex-row">
          {ITEMS.slice(0, 3).map((i) => (
            <Card key={i.title} {...i} />
          ))}
        </div>
        {/* Bottom row: remaining cards grow to fill the full width */}
        <div className="mt-4 flex flex-col gap-4 lg:flex-row">
          {ITEMS.slice(3).map((i) => (
            <Card key={i.title} {...i} />
          ))}
        </div>
      </div>
    </section>
  );
}
