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
    <div className="rounded-2xl bg-eb-cream px-8 py-12 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" className="mx-auto h-14 w-14" />
      <h3 className="mt-6 text-2xl font-bold text-eb-navy">{title}</h3>
      <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-neutral-600">
        {body}
      </p>
    </div>
  );
}

export function WhyChoose() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:py-24">
        <h2 className="mx-auto max-w-3xl text-center text-4xl font-extrabold leading-[1.05] tracking-tight text-eb-ink lg:text-[58px]">
          Why Students Choose Edgbaston College
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.slice(0, 3).map((i) => (
            <Card key={i.title} {...i} />
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:mx-auto lg:max-w-[860px]">
          {ITEMS.slice(3).map((i) => (
            <Card key={i.title} {...i} />
          ))}
        </div>
      </div>
    </section>
  );
}
