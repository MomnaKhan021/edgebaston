/**
 * Template/section registry for the admin "Templates" area.
 *
 * Each template (e.g. the home page) lists its sections; each section lists
 * the fields the client can edit (text, textarea, image, url) plus the
 * default value that matches what is currently hard-coded in the component.
 * Saved values are stored as JSON in the TemplateSection table and merged
 * over these defaults at render time, so an unsaved site looks identical.
 *
 * Convention: any `*Url` field left empty hides its button/link on the site.
 */

import type { CSSProperties } from "react";

export type FieldType = "text" | "textarea" | "image" | "url" | "color" | "toggle" | "list";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  hint?: string;
  /** For type "list": the editable fields of each item (card/menu item/…). */
  itemFields?: FieldDef[];
  /** For type "list": what one item is called in the admin, e.g. "Card". */
  itemLabel?: string;
};

export type SectionDef = {
  key: string;
  name: string;
  description: string;
  fields: FieldDef[];
  defaults: Record<string, string>;
};

export type TemplateDef = {
  key: string;
  name: string;
  description: string;
  sections: SectionDef[];
};

const url = (name: string, label: string, hint?: string): FieldDef => ({
  name,
  label,
  type: "url",
  hint: hint ?? "Leave empty to hide this button.",
});
const text = (name: string, label: string, hint?: string): FieldDef => ({ name, label, type: "text", hint });
const textarea = (name: string, label: string, hint?: string): FieldDef => ({ name, label, type: "textarea", hint });
const image = (name: string, label: string, hint?: string): FieldDef => ({ name, label, type: "image", hint });
const color = (name = "bgColor", label = "Background colour", hint = "Leave empty for the default colour."): FieldDef => ({
  name,
  label,
  type: "color",
  hint,
});
const toggle = (name = "visible", label = "Show this section", hint = "Untick to hide this section on the live site."): FieldDef => ({
  name,
  label,
  type: "toggle",
  hint,
});
const list = (name: string, label: string, itemLabel: string, itemFields: FieldDef[], hint?: string): FieldDef => ({
  name,
  label,
  type: "list",
  itemLabel,
  itemFields,
  hint: hint ?? `Add, remove and reorder ${itemLabel.toLowerCase()}s — changes go live on save.`,
});

/** True unless the section was explicitly hidden in the admin. */
export function isVisible(data: Record<string, string> | undefined): boolean {
  return (data?.visible ?? "1") !== "0";
}

/**
 * Parse a list-field value (JSON array of records). Falls back to legacy
 * "Label | /url" lines (mapped to {label, url}) so older saves keep working.
 */
export function parseItems(value: unknown): Record<string, string>[] {
  const norm = (arr: unknown[]) =>
    arr
      .filter((x) => x && typeof x === "object")
      .map((x) => Object.fromEntries(Object.entries(x as object).map(([k, v]) => [k, String(v ?? "")])));

  // Already an array of objects (e.g. stored un-stringified in the DB).
  if (Array.isArray(value)) return norm(value);

  const raw = String(value ?? "").trim();
  if (!raw) return [];
  if (raw.startsWith("[")) {
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return norm(arr);
    } catch {
      /* fall through to line parsing */
    }
  }
  return parseLinks(raw).map((l) => ({ label: l.label, url: l.href }));
}

/** Parse "Label | /url" lines from a textarea into link objects. */
export function parseLinks(value: string | undefined): { label: string; href: string }[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => {
      const [label, href] = line.split("|").map((s) => s.trim());
      return { label: label ?? "", href: href ?? "" };
    })
    .filter((l) => l.label && l.href);
}

/** Parse one-item-per-line textarea values. */
export function parseLines(value: string | undefined): string[] {
  return String(value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Build FAQ items from qN/aN fields, skipping empty questions. */
export function parseFaqItems(data: Record<string, string> | undefined, max = 10): { q: string; a: string }[] {
  if (!data) return [];
  const out: { q: string; a: string }[] = [];
  for (let i = 1; i <= max; i++) {
    const q = (data[`q${i}`] ?? "").trim();
    const a = (data[`a${i}`] ?? "").trim();
    if (q) out.push({ q, a });
  }
  return out;
}

/** Inline style for a section whose background colour is editable. */
export function bgStyle(data: Record<string, string> | undefined): CSSProperties | undefined {
  const c = (data?.bgColor ?? "").trim();
  return c ? { backgroundColor: c } : undefined;
}

export const HOME_TEMPLATE: TemplateDef = {
  key: "home",
  name: "Home Page",
  description: "Every section of the homepage — banner, principal message, results, FAQ and more.",
  sections: [
    {
      key: "announcement",
      name: "Announcement Bar",
      description: "The navy strip at the very top (shows on every page).",
      fields: [
        toggle(),
        text("badge", "Bold prefix"),
        text("message", "Announcement text", "Leave empty to hide the whole bar."),
        text("linkLabel", "Link label"),
        url("linkUrl", "Link URL", "Leave empty to hide the link."),
        color(),
      ],
      defaults: {
        visible: "1",
        badge: "EXCITING NEWS:",
        message: "Admissions for Batch 2026 are Now Open! Visit our",
        linkLabel: "Admissions page",
        linkUrl: "/admissions",
        bgColor: "",
      },
    },
    {
      key: "hero",
      name: "Home Banner",
      description: "Full-width banner: background images, heading, button and the stats card.",
      fields: [
        toggle(),
        image("bgDesktop", "Background image (desktop)"),
        image("bgMobile", "Background image (mobile)", "Optional — falls back to the desktop image."),
        textarea("heading", "Heading"),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
        text("statHeadline", "Stats card headline", "The big blue figure, e.g. #1"),
        text("statCaption", "Stats card caption"),
        text("stat1Label", "Stat row 1 label"),
        text("stat1Value", "Stat row 1 value (%)", "Number only, e.g. 24"),
        text("stat2Label", "Stat row 2 label"),
        text("stat2Value", "Stat row 2 value (%)", "Number only, e.g. 57"),
        color(),
      ],
      defaults: {
        visible: "1",
        bgDesktop: "/figma/hero-building.webp",
        bgMobile: "",
        heading: "Birmingham's Top-Performing Independent Sixth Form College",
        buttonLabel: "Enquire About Course",
        buttonUrl: "/contact",
        statHeadline: "#1",
        statCaption: "for Value-Added in Birmingham",
        stat1Label: "A Level Results A*-A",
        stat1Value: "24",
        stat2Label: "A Level Results A*-B",
        stat2Value: "57",
        bgColor: "",
      },
    },
    {
      key: "feature-strip",
      name: "Highlights Ticker",
      description: "The scrolling white strip under the banner.",
      fields: [
        toggle(),textarea("items", "Items", "One item per line."), color()],
      defaults: {
        visible: "1",
        items: [
          "Average Class Size of Seven",
          "Strong Pastoral Support",
          "Excellent Career & University Support",
          "Medicine & Dentistry Success",
          "Russell Group Progression",
        ].join("\n"),
        bgColor: "",
      },
    },
    {
      key: "principal",
      name: "Message from the Principal",
      description: "Navy section with the principal's message and Read more button.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        textarea("message", "Message"),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Message from the Principal",
        message:
          "Students arrive at the College aiming to excel academically and secure a place on a course at their preferred university. We achieve this with exceptional teaching, small classes, and individual attention and help for every pupil.",
        buttonLabel: "Read more",
        buttonUrl: "/about",
        bgColor: "",
      },
    },
    {
      key: "pathways",
      name: "Courses We Offer",
      description: "Header of the course-pathways slider. (The three cards are edited in code; courses live under Courses.)",
      fields: [
        toggle(),
        text("label", "Small label"),
        textarea("title", "Heading"),
        color(),
        list("cards", "Course cards", "Card", [
          text("title", "Title"),
          textarea("body", "Text"),
          text("stat", "Stat value (%)"),
          text("statLabel", "Stat label"),
          image("image", "Image"),
          url("url", "Card link", "Leave empty for no link."),
        ]),
      ],
      defaults: {
        visible: "1",
        label: "Courses We Offer",
        title: "Choose the A-Level Pathway That Fits Your Goal",
        bgColor: "",
        cards: "[{\"title\":\"One Year A-Level Retake\",\"body\":\"Focused retake support in a specialist environment. Small classes, regular mocks, and dedicated university guidance to help you secure the grades you need.\",\"stat\":\"16.0\",\"statLabel\":\"of 2025 A-Level grades achieved the top A* grade\",\"image\":\"/figma/course-retake.webp\",\"url\":\"/one-year-a-level-retake\"},{\"title\":\"Five Term A-Level\",\"body\":\"A flexible five-term pathway starting in January. Ideal for students who missed the September entry window but want a full and structured route to university.\",\"stat\":\"16.0\",\"statLabel\":\"of 2025 A-Level grades achieved the top A* grade\",\"image\":\"/figma/course-fiveterm.webp\",\"url\":\"/courses\"},{\"title\":\"Transfer into Year 13\",\"body\":\"Already in Year 12 elsewhere? Transfer mid-course into more focused, supportive environment where you'll receive the individual attention to push for top grades.\",\"stat\":\"72.7\",\"statLabel\":\"of students progressed to Russell Group universities\",\"image\":\"/figma/course-transfer.webp\",\"url\":\"/courses\"}]",
      },
    },
    {
      key: "results",
      name: "Results That Open Doors",
      description: "Outcome spotlight: door graphic, ranking cards and the blue stats bar.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        text("rankingValue", "National ranking (number)", "e.g. 25"),
        text("rankingCaption", "National ranking caption"),
        text("valueAddedValue", "Value-added rank (number)", "e.g. 1"),
        text("valueAddedCaption", "Value-added caption"),
        text("bar1Value", "Blue bar — left value (%)", "Number only, e.g. 96"),
        text("bar1Text", "Blue bar — left text"),
        text("bar2Value", "Blue bar — right value (%)", "Number only, e.g. 72.7"),
        text("bar2Text", "Blue bar — right text"),
        color(),
        image("doorImage", "Centre graphic", "The door illustration between the two ranking cards."),
        list("cards", "Info cards (white grid)", "Card", [
          text("label", "Small label"),
          text("title", "Title"),
          textarea("body", "Text"),
        ]),
        text("destLabel", "Tall card — small label"),
        text("destTitle", "Tall card — title"),
        textarea("destBody", "Tall card — text"),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Outcome Spotlight",
        heading: "Results That Open Doors",
        rankingValue: "25",
        rankingCaption: "Sixth form college in England",
        valueAddedValue: "1",
        valueAddedCaption: "For Value-Added in Birmingham",
        bar1Value: "96",
        bar1Text: "success rate in securing Medicine & Dentistry places",
        bar2Value: "72.7",
        bar2Text: "Russell Group Progression",
        bgColor: "",
        doorImage: "/figma/door.svg",
        cards: "[{\"label\":\"Grade Performance\",\"title\":\"A*-A / A*-B Results\",\"body\":\"Clear academic proof showing how students perform across top grade bands.\"},{\"label\":\"Grade Improvement\",\"title\":\"Value-Added Progress\",\"body\":\"Shows how students improve from their starting point through personalised support.\"},{\"label\":\"Competitive Pathways\",\"title\":\"Oxbridge Outcomes\",\"body\":\"Support for ambitious students applying to Oxford, Cambridge, and high-tariff courses.\"},{\"label\":\"Specialist Routes\",\"title\":\"Medicine & Dentistry\",\"body\":\"Focused guidance for students aiming for medicine, dentistry, and clinical pathways.\"}]",
        destLabel: "University Destinations",
        destTitle: "Russell Group & QS Top Universities",
        destBody: "A stronger way to show where students progress after Edgbaston College, from leading UK universities to competitive degree pathways.",
        buttonLabel: "View Results & Destinations",
        buttonUrl: "/courses",
      },
    },
    {
      key: "stories",
      name: "Success Stories",
      description: "Header of the student stories slider. (Story cards are edited in code.)",
      fields: [
        toggle(),
        text("label", "Small label"),
        text("title", "Heading"),
        textarea("subtitle", "Subtitle"),
        color(),
        list("students", "Student cards", "Student", [
          text("name", "Name"),
          image("image", "Photo"),
          text("grade", "Grade jump", "e.g. BB → A*A*"),
          text("course", "Course & university"),
          textarea("quote", "Quote"),
        ], "The first student is also shown as the large featured card on desktop."),
      ],
      defaults: {
        visible: "1",
        label: "Success Stories",
        title: "Meet Our Students",
        subtitle: "Real students, real grade jumps. Watch how their retake year went.",
        bgColor: "",
        students: "[{\"name\":\"Alishba\",\"image\":\"/figma/pathway-1.webp\",\"grade\":\"BB → A*A*\",\"course\":\"Law at University of Cambridge\",\"quote\":\"The career guidance was absolutely transformative for me. Umar's Chemistry teaching helped me jump from a D to an A, whilst Owais's university advice gave me clear direction.\"},{\"name\":\"Nicole\",\"image\":\"/figma/news-1.webp\",\"grade\":\"BB → A*A*\",\"course\":\"Dentistry at King's College London\",\"quote\":\"The small classes and mock exams gave me the confidence to jump from BB to A*A* and secure my dentistry place.\"},{\"name\":\"Tara\",\"image\":\"/figma/news-2.webp\",\"grade\":\"BB → AA\",\"course\":\"Medicine at Edge Hill University\",\"quote\":\"The personalised UCAS support was the difference — I reapplied and got my medicine offer.\"},{\"name\":\"Jacob\",\"image\":\"/figma/pathway-3.webp\",\"grade\":\"CC → A*A\",\"course\":\"Engineering at University of Warwick\",\"quote\":\"Weekly assessments kept me on track and my grades climbed two full levels over the year.\"}]",
      },
    },
    {
      key: "why-choose",
      name: "Why Students Choose Edgbaston",
      description: "Heading and the five reason cards.",
      fields: [
        toggle(),
        textarea("heading", "Heading"),
        list("cards", "Reason cards", "Card", [
          image("icon", "Icon"),
          text("title", "Title"),
          textarea("body", "Text"),
        ], "The first three cards form the top row; the rest fill the bottom row."),
        text("buttonLabel", "Mobile button label"),
        url("buttonUrl", "Mobile button link"),
        color(),
      ],
      defaults: {
        visible: "1",
        heading: "Why Students Choose Edgbaston College",
        cards: "[{\"icon\":\"/figma/why-1.svg\",\"title\":\"Small Classes\",\"body\":\"Maximum of 10 students per class, typically 7, so every student receives individual attention.\"},{\"icon\":\"/figma/why-2.svg\",\"title\":\"Progress\",\"body\":\"Students gain an average of 1.78 grades per subject, with jumps from BBB to A*AA not uncommon.\"},{\"icon\":\"/figma/why-3.svg\",\"title\":\"Guidance\",\"body\":\"Personalised UCAS reapplication guidance from Principal Owais Ahmed, who oversees applications.\"},{\"icon\":\"/figma/why-4.svg\",\"title\":\"Tailored\",\"body\":\"Every student starts with a one-to-one academic consultation to identify gaps and build a personalised retake plan.\"},{\"icon\":\"/figma/why-5.svg\",\"title\":\"Excellence\",\"body\":\"Weekly assessments, three mock exams, and targeted exam technique coaching help turn knowledge into marks.\"}]",
        buttonLabel: "View Results & Destinations",
        buttonUrl: "/courses",
        bgColor: "",
      },
    },
    {
      key: "learn-marquee",
      name: "Learn Today Band",
      description: "The scrolling navy band.",
      fields: [
        toggle(),text("message", "Scrolling text"), color()],
      defaults: {
        visible: "1", message: "Learn Today. Lead Tomorrow.", bgColor: "" },
    },
    {
      key: "faq",
      name: "FAQ",
      description: "FAQ heading, subtitle, Contact Us button and every question & answer.",
      fields: [
        toggle(),
        textarea("heading", "Heading"),
        textarea("subtitle", "Subtitle"),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
        color(),
        list("faqs", "Questions & Answers", "Question", [
          text("q", "Question"),
          textarea("a", "Answer"),
        ]),
      ],
      defaults: {
        visible: "1",
        heading: "A-Level retake & resit FAQ",
        subtitle: "Quick answers to the most common questions about retaking and resitting A-Levels in Birmingham.",
        buttonLabel: "Contact Us",
        buttonUrl: "/contact",
        bgColor: "",
        faqs: "[{\"q\":\"How many A-Levels can I retake?\",\"a\":\"You can retake as many A-Levels as you need. Most students retake two or three subjects to strengthen their overall grade profile.\"},{\"q\":\"Can I retake only one subject?\",\"a\":\"Yes. Whether you need to improve a single grade or several, we build a plan around exactly the subjects you want to retake.\"},{\"q\":\"Will I receive UCAS support?\",\"a\":\"Absolutely. Every student receives personalised UCAS reapplication guidance, overseen by Principal Owais Ahmed.\"},{\"q\":\"How often are assessments?\",\"a\":\"We run weekly assessments and three full mock exams across the year, with targeted feedback after each one.\"},{\"q\":\"Is accommodation available?\",\"a\":\"We can advise on trusted local accommodation options for students relocating to study with us in Birmingham.\"},{\"q\":\"How do I apply?\",\"a\":\"Simply enquire through our contact page and our admissions team will guide you through every step of the application.\"}]",
      },
    },
    {
      key: "news",
      name: "What's Happening (News)",
      description: "Header of the news slider. (Articles are edited in code.)",
      fields: [
        toggle(),
        text("label", "Small label"),
        text("title", "Heading"),
        color(),
        list("articles", "Articles", "Article", [
          text("date", "Date", "e.g. 22 Nov 2024"),
          text("title", "Title"),
          image("image", "Photo"),
          url("url", "Read Article link", "Leave empty to hide the Read Article button."),
        ]),
      ],
      defaults: {
        visible: "1",
        label: "Find Your Local YDS Clinic",
        title: "What's happening at Edgbaston",
        bgColor: "",
        articles: "[{\"date\":\"12 Sep 2024\",\"title\":\"Edgbaston College Celebrates Outstanding A-Level Results\",\"image\":\"/figma/news-results.webp\",\"url\":\"\"},{\"date\":\"22 Nov 2024\",\"title\":\"Maneek Wins the Great College Bake Off to Support Children…\",\"image\":\"/figma/news-cake.webp\",\"url\":\"\"},{\"date\":\"15 Oct 2024\",\"title\":\"Year 12 Students Explore Future Opportunities at UK University…\",\"image\":\"/figma/news-uni.webp\",\"url\":\"\"},{\"date\":\"3 Oct 2024\",\"title\":\"Edgbaston College Students Build Life-Saving Skills with St John…\",\"image\":\"/figma/news-firstaid.webp\",\"url\":\"\"},{\"date\":\"7 Oct 2024\",\"title\":\"Students Hit the Track for Karting Fun\",\"image\":\"/figma/news-karting.webp\",\"url\":\"\"}]",
      },
    },
    {
      key: "offer-bar",
      name: "Sticky Offer Bar",
      description: "The countdown bar fixed to the bottom of every page.",
      fields: [
        toggle(),
        text("title", "Offer title"),
        text("message", "Offer text", "Leave empty to hide the bar."),
        text(
          "endDate",
          "Offer ends (countdown target)",
          "When the countdown reaches zero. Format: YYYY-MM-DD HH:MM (24-hour), e.g. 2026-08-31 23:59. Leave empty to count down to the next 1st of August.",
        ),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
        color(),
      ],
      defaults: {
        visible: "1",
        title: "August Offer",
        message: "30% off course fees for the first 5 eligible applicants only.",
        endDate: "",
        buttonLabel: "Enquire About Course",
        buttonUrl: "/contact",
        bgColor: "",
      },
    },
  ],
};

export const HEADER_TEMPLATE: TemplateDef = {
  key: "header",
  name: "Header",
  description: "The site navigation shown at the top of every page.",
  sections: [
    {
      key: "navbar",
      name: "Navigation Bar",
      description: "Logo, menu links and the Contact button.",
      fields: [
        image("logoLight", "Logo (on dark banners)"),
        image("logoDark", "Logo (on white pages)"),
        list("links", "Menu items", "Menu item", [
          text("label", "Menu name"),
          url("url", "Menu link", "Where this menu item goes."),
        ]),
        text("contactLabel", "Contact button label"),
        url("contactUrl", "Contact button link"),
        color("pillColor", "Menu pill colour", "Background of the menu pills. Leave empty for white."),
      ],
      defaults: {
        logoLight: "/figma/logo.svg",
        logoDark: "/figma/logo-navy.svg",
        links: "[{\"label\":\"Courses\",\"url\":\"/courses\"},{\"label\":\"Admissions\",\"url\":\"/admissions\"},{\"label\":\"About Us\",\"url\":\"/about\"},{\"label\":\"Guides\",\"url\":\"#\"}]",
        contactLabel: "Contact us",
        contactUrl: "/contact",
        pillColor: "",
      },
    },
  ],
};

export const FOOTER_TEMPLATE: TemplateDef = {
  key: "footer",
  name: "Footer",
  description: "The footer shown at the bottom of every page.",
  sections: [
    {
      key: "intro",
      name: "Principal & Intro",
      description: "Principal photo, name and the introduction paragraph.",
      fields: [
        image("photo", "Principal photo"),
        text("role", "Role label"),
        text("name", "Principal name"),
        textarea("message", "Introduction text"),
        color("bgColor", "Footer background colour", "Solid colour override for the whole footer. Leave empty for the default gradient."),
      ],
      defaults: {
        photo: "/figma/owais-ahmed.webp",
        role: "Principal",
        name: "OWAIS AHMED",
        message:
          "Students arrive at the College aiming to excel academically and secure a place on a course at their preferred university. We achieve this with exceptional teaching, small classes, and individual attention and help for every pupil.",
        bgColor: "",
      },
    },
    {
      key: "links",
      name: "Useful Links",
      description: "The link list in the footer.",
      fields: [
        text("heading", "Heading"),
        list("items", "Links", "Link", [
          text("label", "Link name"),
          url("url", "Link URL", "Where this link goes."),
        ]),
      ],
      defaults: {
        heading: "Useful Links",
        items: "[{\"label\":\"Enquire About A Course\",\"url\":\"/contact\"},{\"label\":\"One Year A-Level Retake Programme\",\"url\":\"/one-year-a-level-retake\"},{\"label\":\"Our Courses\",\"url\":\"/courses\"},{\"label\":\"Admissions Requirements\",\"url\":\"/admissions-requirements\"},{\"label\":\"About Us\",\"url\":\"/about-us\"},{\"label\":\"Our History\",\"url\":\"/our-history\"}]",
      },
    },
    {
      key: "address",
      name: "Address & Contact",
      description: "The address card with phone, email, directions and the map.",
      fields: [
        text("heading", "Card heading"),
        text("orgName", "Organisation name"),
        textarea("address", "Address"),
        text("phone", "Phone number"),
        text("email", "Email address"),
        text("directionsLabel", "Directions link label"),
        url("mapUrl", "Google Maps link", "Used by the map image and the directions link."),
        image("mapImage", "Map image"),
        color("cardColor", "Card background colour", "Leave empty for the default navy."),
      ],
      defaults: {
        heading: "Address",
        orgName: "Edgbaston College",
        address: "37 George Road, Edgbaston, Birmingham, B15 1PL",
        phone: "0121 306 0182",
        email: "enquiries@edgbastoncollege.co.uk",
        directionsLabel: "Get Directions",
        mapUrl:
          "https://www.google.com/maps/place/Edgbaston+College/@52.4700978,-1.9147819,15z/data=!4m5!3m4!1s0x0:0xe22ea36ee96914c1!8m2!3d52.4700978!4d-1.9147819",
        mapImage: "/figma/map.webp",
        cardColor: "",
      },
    },
    {
      key: "brand",
      name: "Brand & Copyright",
      description: "The big logo lockup and the copyright line.",
      fields: [
        image("logo", "Large logo image"),
        text("copyright", "Copyright text", "The year is added automatically before this text."),
      ],
      defaults: {
        logo: "/figma/logo-stacked.svg",
        copyright: "Edgbaston College. All rights reserved.",
      },
    },
  ],
};

export const RETAKE_TEMPLATE: TemplateDef = {
  key: "retake",
  name: "One Year A-Level Retake Page",
  description: "Every section of the retake course page — banner, intro, outcomes, cards, FAQ and more.",
  sections: [
    {
      key: "hero",
      name: "Banner",
      description: "Full-width banner at the top of the page.",
      fields: [
        toggle(),
        image("bgDesktop", "Background image"),
        textarea("heading", "Heading"),
      ],
      defaults: {
        visible: "1",
        bgDesktop: "/figma/retake-hero.webp",
        heading: "One Year A-Level Retake",
      },
    },
    {
      key: "intro",
      name: "Intro",
      description: "Photo + heading and introduction paragraph.",
      fields: [
        toggle(),
        image("image", "Image"),
        text("eyebrow", "Small label"),
        textarea("heading", "Heading"),
        textarea("body", "Body text"),
        color(),
      ],
      defaults: {
        visible: "1",
        image: "/figma/retake-intro.webp",
        eyebrow: "Birmingham Retake Specialists",
        heading: "Birmingham's most successful A-Level retake programme. Your A-Levels Online",
        body: "Yes, you can retake your A-Levels in Birmingham at Edgbaston College. We turn disappointing results into exceptional outcomes, winning students higher grades and places at top universities, including Medicine, Dentistry and the Russell Group.",
        bgColor: "",
      },
    },
    {
      key: "outcomes",
      name: "2025 Outcomes",
      description: "The two stat cards.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("card1Value", "Card 1 — big number"),
        text("card1Row1Label", "Card 1 — row 1 label"),
        text("card1Row1Grade", "Card 1 — row 1 grade"),
        text("card1Row2Label", "Card 1 — row 2 label"),
        text("card1Row2Grade", "Card 1 — row 2 grade"),
        text("card2Value", "Card 2 — big number"),
        text("card2Caption", "Card 2 — caption"),
        text("card2Row1Label", "Card 2 — row 1 label"),
        text("card2Row1Grade", "Card 2 — row 1 grade"),
        text("card2Row2Label", "Card 2 — row 2 label"),
        text("card2Row2Grade", "Card 2 — row 2 grade"),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "2025 outcomes",
        card1Value: "87.7",
        card1Row1Label: "65.1%",
        card1Row1Grade: "A*–A",
        card1Row2Label: "87.7%",
        card1Row2Grade: "A*–B",
        card2Value: "1.78",
        card2Caption: "Grades gained per subject",
        card2Row1Label: "Typical arrival",
        card2Row1Grade: "BBC",
        card2Row2Label: "Typical Result",
        card2Row2Grade: "A*AA",
        bgColor: "",
      },
    },
    {
      key: "excel",
      name: "Why Our Students Excel",
      description: "Heading and the reason cards.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        textarea("heading", "Heading"),
        list("cards", "Cards", "Card", [text("title", "Title"), textarea("body", "Text")]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "The Edgbaston Advantage",
        heading: "Why our retake students excel",
        cards: JSON.stringify([
          { title: "Exceptional Grade Improvement", body: "Jumps from BBB to A*AA are not uncommon, with an average gain of 1.78 grades per subject." },
          { title: "Frequent exam practice & feedback", body: "Weekly assessments under exam conditions and three mock exams, each with individual feedback." },
          { title: "Bespoke reapplication support", body: "Personalised UCAS reapplication guidance from Principal Owais Ahmed, who personally oversees all applications." },
          { title: "Genuinely small classes", body: "Maximum of 10 students per class (typically 7)." },
          { title: "Supportive environment", body: "Family-run college with a personal, relaxed atmosphere where every student is encouraged to be ambitious." },
          { title: "Focused revision & exam technique", body: "Targeted revision strategies and exam technique coaching that turn knowledge into marks under pressure." },
        ]),
        bgColor: "",
      },
    },
    {
      key: "how",
      name: "How It Works",
      description: "Heading and the numbered step cards + button.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        text("subtitle", "Subtitle"),
        list("cards", "Steps", "Step", [text("number", "Number"), text("title", "Title"), textarea("body", "Text")]),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "How It Works",
        heading: "How the one-year retake works",
        subtitle: "One year to master your subjects and lift your grades.",
        cards: JSON.stringify([
          { number: "01", title: "Choose your subjects", body: "retake one to three A-Levels, or take up a brand-new subject alongside them." },
          { number: "02", title: "Re-learn the whole course", body: "the complete A-Level specification, re-taught from the ground up in small classes." },
          { number: "03", title: "Constant assessment & feedback", body: "weekly timed assessments and three full mock exams, each with feedback and a parent report." },
        ]),
        buttonLabel: "See The List Of Available Subjects",
        buttonUrl: "/contact",
        bgColor: "",
      },
    },
    {
      key: "plan",
      name: "A Retake Plan Built Around You",
      description: "Image + heading and the white feature rows.",
      fields: [
        toggle(),
        image("image", "Image"),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("body", "Body text"),
        list("cards", "Feature rows", "Row", [text("text", "Text")]),
        color(),
      ],
      defaults: {
        visible: "1",
        image: "/figma/retake-plan.webp",
        eyebrow: "Personalised From Day One",
        heading: "A retake plan built around you",
        body: "No two students are the same. Every student starts with a one-to-one academic consultation, so we can target exactly what held your grades back last time.",
        cards: JSON.stringify([
          { text: "Review your previous results and scripts to see precisely where marks were lost." },
          { text: "Identify your strengths and weaknesses across each subject and topic." },
          { text: "Build a personalised retake plan with targeted support to close those gaps." },
        ]),
        bgColor: "",
      },
    },
    {
      key: "stories",
      name: "Success Stories",
      description: "Heading and the student cards.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("subtitle", "Subtitle"),
        list("cards", "Student cards", "Student", [
          text("name", "Name"),
          image("image", "Photo"),
          text("from", "Starting grades"),
          text("to", "Final grades"),
          text("course", "Course & university"),
          textarea("quote", "Quote"),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Courses We Offer",
        heading: "Retake success stories",
        subtitle: "Real students, real grade jumps. Watch how their retake year went.",
        cards: JSON.stringify([
          { name: "Alishba", image: "/figma/pathway-1.webp", from: "BB", to: "A*A*", course: "Law at University of Cambridge", quote: "The career guidance was absolutely transformative for me. Umar's Chemistry teaching helped me jump from a D to an A, whilst Owais's university advice gave me clear direction for my future." },
          { name: "Nicole", image: "/figma/news-1.webp", from: "BB", to: "A*A*", course: "Dentistry at King's College London", quote: "The small classes and weekly mock exams gave me the confidence to jump from BB to A*A* and secure my dentistry place." },
          { name: "Tara", image: "/figma/news-2.webp", from: "BB", to: "AA", course: "Medicine at Edge Hill University", quote: "The personalised UCAS support was the difference — I reapplied and finally got my medicine offer." },
          { name: "Jacob", image: "/figma/pathway-3.webp", from: "CC", to: "A*A", course: "Engineering at University of Warwick", quote: "Weekly assessments kept me on track and my grades climbed two full levels across the year." },
        ]),
        bgColor: "",
      },
    },
    {
      key: "transformations",
      name: "More 2025 Transformations",
      description: "Heading, the grade-jump items and the link.",
      fields: [
        toggle(),
        text("heading", "Heading"),
        list("cards", "Transformations", "Transformation", [
          text("from", "From grades"),
          text("to", "To grades"),
          text("who", "Student & course"),
        ]),
        text("linkLabel", "Link label"),
        url("linkUrl", "Link URL"),
        color(),
      ],
      defaults: {
        visible: "1",
        heading: "More 2025 transformations",
        cards: JSON.stringify([
          { from: "DE", to: "AA", who: "Manelle · Medicine, Southampton" },
          { from: "UU", to: "AB", who: "Mohammed · Politics, KCL" },
          { from: "BB", to: "A*A*", who: "Adham · Medicine, Bristol" },
        ]),
        linkLabel: "See All Our 2025 Grade Improvements",
        linkUrl: "/contact",
        bgColor: "",
      },
    },
    {
      key: "guidance",
      name: "University & Careers Guidance",
      description: "Heading, body, the two progress rings, image and note.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("body", "Body text"),
        image("image", "Centre image"),
        text("ring1Value", "Ring 1 — value (%)"),
        text("ring1Label", "Ring 1 — label"),
        text("ring2Value", "Ring 2 — value (%)"),
        text("ring2Label", "Ring 2 — label"),
        textarea("note", "Footnote"),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "From Grades To Offers",
        heading: "University & careers guidance",
        body: "A better set of grades is only half the story. Every retake student gets personalised applications guidance from Principal Owais Ahmed, with a proven record on placement into competitive courses like Oxbridge, Medicine, Dentistry, Law and Economics.",
        image: "/figma/adm-process.webp",
        ring1Value: "72.7",
        ring1Label: "to Russell Group universities (2025)",
        ring2Value: "96",
        ring2Label: "Medicine & Dentistry offer success (2025)",
        note: "See our leavers' destinations. If you are resitting for Medicine or Dentistry, read our guides on medical school and dental school resit policies.",
        bgColor: "",
      },
    },
    {
      key: "fees",
      name: "Fees & How To Apply",
      description: "The two navy info cards with their links.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        list("cards", "Cards", "Card", [
          text("title", "Title"),
          textarea("body", "Text"),
          text("link1Label", "Link 1 label"),
          url("link1Url", "Link 1 URL"),
          text("link2Label", "Link 2 label"),
          url("link2Url", "Link 2 URL"),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Fees & Admissions",
        heading: "Fees & how to apply",
        cards: JSON.stringify([
          { title: "Fees", body: "Fees depend on the number of subjects you retake. See current fees.", link1Label: "See Current Fees", link1Url: "/contact", link2Label: "", link2Url: "" },
          { title: "How to apply", body: "We accept retake applications on a rolling basis, but most students join us after results day in September. Spaces subject to availability. Complete our enquiry form or Call 0121 306 0182.", link1Label: "Complete Our Enquiry Form", link1Url: "/contact", link2Label: "Call 0121 306 0182.", link2Url: "tel:01213060182" },
        ]),
        bgColor: "",
      },
    },
    {
      key: "accommodation",
      name: "Accommodation",
      description: "Heading, body and the residence cards.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("body", "Body text"),
        list("cards", "Residences", "Residence", [
          text("label", "Small label"),
          text("name", "Name"),
          text("walk", "Distance"),
          text("note", "Footnote"),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Accommodation Support",
        heading: "Accommodation",
        body: "For students relocating to Birmingham, we've partnered with quality student accommodation just minutes from college.",
        cards: JSON.stringify([
          { label: "Closest", name: "Five Ways Residence", walk: "2–3 minute walk to college", note: "Bills included · Secure access · 24/7 support" },
          { label: "Closest", name: "Beech Gardens, Edgbaston", walk: "4–5 minute walk to college", note: "Bills included · Secure access · 24/7 support" },
        ]),
        bgColor: "",
      },
    },
    {
      key: "cta",
      name: "Call To Action",
      description: "The navy banner near the bottom with the two buttons.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        textarea("heading", "Heading"),
        text("subtitle", "Subtitle"),
        text("button1Label", "Button 1 label"),
        url("button1Url", "Button 1 link"),
        text("button2Label", "Button 2 label"),
        url("button2Url", "Button 2 link"),
        color("cardColor", "Banner colour", "Leave empty for the default navy."),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Take The Next Step",
        heading: "Start your A-Level retake in Birmingham",
        subtitle: "Fill out the online enquiry form, email us, or give us a call.",
        button1Label: "Enquire About Course",
        button1Url: "/contact",
        button2Label: "Call 0121 306 0182",
        button2Url: "tel:01213060182",
        cardColor: "",
      },
    },
    {
      key: "faq",
      name: "FAQ",
      description: "Heading, subtitle, Contact button and every question & answer.",
      fields: [
        toggle(),
        textarea("heading", "Heading"),
        textarea("subtitle", "Subtitle"),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
        color(),
        list("faqs", "Questions & Answers", "Question", [
          text("q", "Question"),
          textarea("a", "Answer"),
        ]),
      ],
      defaults: {
        visible: "1",
        heading: "A-Level retake & resit FAQ",
        subtitle: "Quick answers to the most common questions about retaking and resitting A-Levels in Birmingham.",
        buttonLabel: "Contact Us",
        buttonUrl: "/contact",
        bgColor: "",
        faqs: "[{\"q\":\"Where can I retake my A-Levels in Birmingham?\",\"a\":\"At Edgbaston College — Birmingham's specialist sixth-form college for A-Level retakes. We're based at 37 George Road, Edgbaston, a short walk from Five Ways station, and welcome retake students from across Birmingham and beyond.\"},{\"q\":\"Can you retake A-Levels?\",\"a\":\"Yes. Anyone can retake their A-Levels regardless of age or previous school. Most of our students complete their retake in a single year with us, sitting the full exams again in the summer.\"},{\"q\":\"Can you resit A-Levels in November?\",\"a\":\"November resits are only available for a small number of subjects and exam boards. For most A-Levels the next opportunity is the summer series — which is exactly what our one-year programme prepares you for.\"},{\"q\":\"When can you resit your A-Levels?\",\"a\":\"A-Level exams are sat in the summer window (May–June). Students join us in September, re-learn the full course through the year, and sit their exams the following summer.\"},{\"q\":\"How much does it cost to retake A-Levels?\",\"a\":\"Fees depend on the number of subjects you retake. Contact us for current per-subject fees — flexible payment plans are available, and our seasonal offer gives 30% off for the first five eligible applicants.\"},{\"q\":\"What happens if you do worse in a resit?\",\"a\":\"Universities almost always consider your best result, so a resit is very low risk. With small classes and constant feedback, the overwhelming majority of our students improve on their previous grades.\"},{\"q\":\"How many times can you resit an A-Level?\",\"a\":\"There's no limit — you can resit an A-Level as many times as you like. In practice, one well-structured retake year with the right support is usually all it takes.\"},{\"q\":\"Can I take a new A-Level subject when I retake?\",\"a\":\"Yes. Many students take up a brand-new subject alongside their retakes — for example adding one that better fits their target university course.\"},{\"q\":\"Do universities accept A-Level retakes?\",\"a\":\"The vast majority do, including Russell Group universities. A few competitive courses such as Medicine consider resit policies individually — we guide you through each university's stance as part of our UCAS support.\"},{\"q\":\"What are your outcomes like?\",\"a\":\"In 2025, 87.7% of grades were A*–B and 65.1% were A*–A, with students gaining an average of +1.78 grades per subject. 72.7% progressed to Russell Group universities.\"}]",
      },
    },
  ],
};

export const FIVE_TERM_TEMPLATE: TemplateDef = {
  key: "five-term",
  name: "Five Term A-Level Page",
  description: "Every section of the Five Term A-Level course page — banner, intro, benefits, offers, structure, careers, stories, fees, accommodation and FAQ.",
  sections: [
    {
      key: "hero",
      name: "Banner",
      description: "Full-width banner at the top of the page.",
      fields: [
        toggle(),
        image("bgDesktop", "Background image"),
        textarea("heading", "Heading"),
      ],
      defaults: {
        visible: "1",
        bgDesktop: "/figma/adm-process.webp",
        heading: "Five Term A-Level",
      },
    },
    {
      key: "intro",
      name: "Intro",
      description: "Photo + heading and the two introduction paragraphs.",
      fields: [
        toggle(),
        image("image", "Image"),
        text("eyebrow", "Small label"),
        textarea("heading", "Heading"),
        textarea("body", "Paragraph 1"),
        textarea("body2a", "Paragraph 2 — before highlight"),
        text("body2Strong", "Paragraph 2 — highlighted phrase"),
        textarea("body2b", "Paragraph 2 — after highlight"),
        text("imageRadius", "Image corner radius", "Rounding in px, e.g. 0, 16 or 24. Empty = default."),
        text("buttonLabel", "Button label", "Leave empty to hide the button."),
        url("buttonUrl", "Button link"),
        color(),
      ],
      defaults: {
        visible: "1",
        image: "/figma/retake-intro.webp",
        eyebrow: "Five-Term A-Level Course",
        heading: "Achieve Top Grades In 18 Months",
        body: "Our Five-Term (18 Month) A-Level course starts in January of Year 12 and students complete Year 12 A-Level content within the first two terms, with additional support provided by the College. The remaining three terms (Year 13) allow you to progress at a normal pace, culminating in June A-Level exams alongside traditional two-year students.",
        body2a: "We have consistently empowered students to achieve top grades, ",
        body2Strong: "securing acceptance to prestigious universities and competitive courses",
        body2b: ". With an average class size of just 7 students, our teaching is tailored to each individual's needs. Weekly assessments and regular mock exams provide continuous, individualised feedback, ensuring steady progress and a clear understanding of where students are academically. Our comprehensive careers program further enhances student success, guiding them towards fulfilling and rewarding career paths. This holistic approach has led to outstanding academic achievements and excellent career outcomes for our students.",
        imageRadius: "",
        buttonLabel: "See Results",
        buttonUrl: "",
        bgColor: "",
      },
    },
    {
      key: "benefits",
      name: "Benefits",
      description: "Navy section: heading, intro, the three benefit cards and the footnote.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        textarea("heading", "Heading"),
        textarea("subtitle", "Intro text"),
        list("cards", "Benefit cards", "Card", [image("icon", "Icon / image", "Optional — upload to replace the default icon."), text("title", "Title"), textarea("body", "Text")]),
        textarea("footnote", "Footnote"),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Five-Term A-Level Benefits",
        heading: "Benefit of the Five-Term A-Level Course",
        subtitle: "Sometimes a September start isn't always possible. Whether you're looking for a fresh start or your academic calendar doesn't fit the traditional schedule, our Five-Term A-Level course could be the solution.",
        cards: JSON.stringify([
          { title: "No Gap Year", body: "Students can seamlessly continue their educational journey without the need for a 9-month break (between January and the following September)" },
          { title: "Ideal for International Students", body: "This program suits students whose academic calendars may not align with a September start" },
          { title: "Holistic Support", body: "Five-term students receive the same comprehensive support, including expert advice and guidance for university applications, as our two-year students." },
        ]),
        footnote: "The 18-month A-Level course offers a unique opportunity for motivated students to fast-track their studies without compromising the quality of their education or the personalised support they receive.",
        bgColor: "",
      },
    },
    {
      key: "offers",
      name: "What Edgbaston College Offers",
      description: "Heading and the six feature cards.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        list("cards", "Cards", "Card", [image("icon", "Icon / image", "Optional — upload to replace the default icon."), text("title", "Title"), textarea("body", "Text")]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Why Choose Edgbaston College",
        heading: "What Edgbaston College offers",
        cards: JSON.stringify([
          { title: "Exceptional Grades", body: "Students consistently achieving outstanding A-Level exam results. (76% A*–B in 2023)" },
          { title: "Bespoke University & Careers Guidance", body: "Receive personalised support from your personal tutor, experienced advisors, and Principal Owais Ahmed throughout your application journey. Our proven track record of successful placements speaks for itself" },
          { title: "Individual Attention", body: "Benefit from small class sizes (average of 7 students) and dedicated one-on-one time with your personal tutor and subject teachers to ensure you reach your full potential" },
          { title: "Frequent Exam Practice & Continuous Feedback", body: "Our rigorous approach to exam preparation includes weekly assessments and 3 mock exams throughout the year, each with individualised feedback to pinpoint areas of improvement. This ensures you're always aware of your academic standing and making steady progress toward your goals" },
          { title: "Supportive environment", body: "As a family-run Sixth Form College, we offer a personal, socially relaxed and supportive environment where every student is encouraged to be ambitious, both academically and in their career" },
          { title: "Enrichment Program", body: "Enhance your experience with diverse range of clubs, events and exciting trips. Examples include debating society, sports teams, charity fundraisers, cultural excursions, and even go-karting adventures" },
        ]),
        bgColor: "",
      },
    },
    {
      key: "structure",
      name: "Course Structure",
      description: "Image + heading, body (with an inline link) and the three feature rows.",
      fields: [
        toggle(),
        image("image", "Image"),
        text("imageRadius", "Image corner radius", "Rounding in px, e.g. 0, 16 or 24. Empty = default."),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("body", "Body text — before the link"),
        text("linkLabel", "Inline link label"),
        url("linkUrl", "Inline link URL", "Leave empty to show the label as plain text."),
        textarea("bodyAfter", "Body text — after the link"),
        text("rowsIntro", "Rows intro (bold line)"),
        list("rows", "Feature rows", "Row", [image("icon", "Icon / image", "Optional — upload to replace the default icon."), text("text", "Text")]),
        color(),
      ],
      defaults: {
        visible: "1",
        image: "/figma/adm-process.webp",
        eyebrow: "How The Structure Works",
        heading: "Course Structure",
        body: "Students study 3–4 A-Level subjects over two years. The two-year course starts each September and students sit their final A-Level examinations at the end of their two years of study. Students may choose from the whole range of A-Level ",
        linkLabel: "subjects offered",
        linkUrl: "/courses",
        bodyAfter: " in any combination that suits them.",
        rowsIntro: "Here's how the structure works:",
        rows: JSON.stringify([
          { text: "Students may study between 3–4 subjects" },
          { text: "Full coverage of the A-Level specifications in your chosen subjects" },
          { text: "Weekly timed assessments and three mock exams, all with personalised feedback, ensure you're on track for success" },
        ]),
        bgColor: "",
      },
    },
    {
      key: "careers-support",
      name: "Individualised Careers Support",
      description: "Image + heading and the body paragraph (with a highlighted phrase).",
      fields: [
        toggle(),
        image("image", "Image"),
        text("imageRadius", "Image corner radius", "Rounding in px, e.g. 0, 16 or 24. Empty = default."),
        text("eyebrow", "Small label"),
        textarea("heading", "Heading"),
        textarea("body", "Body text — before highlight"),
        text("bodyStrong", "Highlighted phrase"),
        textarea("bodyAfter", "Body text — after highlight"),
        color(),
      ],
      defaults: {
        visible: "1",
        image: "/figma/retake-intro.webp",
        eyebrow: "The Edgbaston Experience",
        heading: "Individualised Careers Support",
        body: "Students receive personalised guidance and support with their university and career aspirations. Their dedicated personal tutors, Principal Owais Ahmed, and our experienced educational consultants at ",
        bodyStrong: "Edgbaston Education",
        bodyAfter: " work closely with each student to develop a tailored plan, ensuring students are equipped to achieve their individual goals. We offer expert advice on course selection, university applications (including Oxbridge, Medicine, Dentistry, and Law), personal statement crafting, interview preparation, and admissions test support. Our proven track record of successful placements demonstrates our commitment to student success.",
        bgColor: "",
      },
    },
    {
      key: "careers-program",
      name: "College Careers Program",
      description: "Heading, intro, the three numbered cards, footnote and button.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        textarea("heading", "Heading"),
        textarea("subtitle", "Intro text"),
        list("cards", "Cards", "Card", [text("n", "Number"), text("title", "Title"), textarea("body", "Text")]),
        textarea("footnote", "Footnote"),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "The Edgbaston Experience",
        heading: "Comprehensive College Careers Program",
        subtitle: "Complementing our one-on-one guidance, our comprehensive careers program provides a wealth of resources and opportunities to explore their options and develop essential skills. Students benefit from:",
        cards: JSON.stringify([
          { n: "01", title: "Regular Careers Trips", body: "Gaining valuable insights into potential career paths and academic choices through visits to universities and employers" },
          { n: "02", title: "Personal Development Sessions", body: "Enhancing their leadership, resilience, teamwork, and other key skills through fortnightly workshops" },
          { n: "03", title: "Guest Speaker Series", body: "Broadening their horizons and discovering diverse career possibilities by hearing from professionals in various fields, such as doctors, investment bankers, and engineers" },
        ]),
        footnote: "This dual approach – combining personalised guidance with a robust college-wide program – ensures that our students receive the support and resources necessary to make informed decisions and thrive in their chosen paths.",
        buttonLabel: "Leavers' Destinations",
        buttonUrl: "/courses",
        bgColor: "",
      },
    },
    {
      key: "stories",
      name: "Success Stories",
      description: "Heading and the student cards.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("subtitle", "Subtitle"),
        list("cards", "Student cards", "Student", [
          text("name", "Name"),
          image("image", "Photo"),
          text("from", "Starting grades"),
          text("to", "Final grades"),
          text("course", "Course & university"),
          textarea("quote", "Quote"),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Success Stories",
        heading: "Five-term success stories",
        subtitle: "Real students, real grade jumps. See how their year went.",
        cards: JSON.stringify([
          { name: "Alishba", image: "/figma/pathway-1.webp", from: "BB", to: "A*A*", course: "Law at University of Cambridge", quote: "The five-term structure gave me the time and support to completely turn my grades around." },
          { name: "Nicole", image: "/figma/news-1.webp", from: "BB", to: "A*A*", course: "Dentistry at King's College London", quote: "Small classes and weekly mocks gave me the confidence to jump from BB to A*A* and secure my dentistry place." },
          { name: "Tara", image: "/figma/news-2.webp", from: "BB", to: "AA", course: "Medicine at Edge Hill University", quote: "Starting in January suited me perfectly — the personalised UCAS support made all the difference." },
          { name: "Jacob", image: "/figma/pathway-3.webp", from: "CC", to: "A*A", course: "Engineering at University of Warwick", quote: "Weekly assessments kept me on track and my grades climbed two full levels across the year." },
          { name: "Manelle", image: "/figma/pathway-2.webp", from: "DE", to: "AA", course: "Medicine at University of Southampton", quote: "One focused pathway with the right support completely changed where I ended up." },
        ]),
        bgColor: "",
      },
    },
    {
      key: "transformations",
      name: "More 2025 Transformations",
      description: "Heading, the grade-jump items and the link.",
      fields: [
        toggle(),
        text("heading", "Heading"),
        list("cards", "Transformations", "Transformation", [
          text("from", "From grades"),
          text("to", "To grades"),
          text("who", "Student & course"),
        ]),
        text("linkLabel", "Link label"),
        url("linkUrl", "Link URL"),
        color(),
      ],
      defaults: {
        visible: "1",
        heading: "More 2025 transformations",
        cards: JSON.stringify([
          { from: "DE", to: "AA", who: "Manelle · Medicine, Southampton" },
          { from: "UU", to: "AB", who: "Mohammed · Politics, KCL" },
          { from: "BB", to: "A*A*", who: "Adham · Medicine, Bristol" },
        ]),
        linkLabel: "See All Our 2025 Grade Improvements",
        linkUrl: "/contact",
        bgColor: "",
      },
    },
    {
      key: "guidance",
      name: "University & Careers Guidance",
      description: "Heading, body, the two progress rings, image and note.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("body", "Body text"),
        image("image", "Centre image"),
        text("imageRadius", "Image corner radius", "Rounding in px, e.g. 0, 16 or 24. Empty = default."),
        text("ring1Value", "Ring 1 — value (%)"),
        text("ring1Label", "Ring 1 — label"),
        text("ring2Value", "Ring 2 — value (%)"),
        text("ring2Label", "Ring 2 — label"),
        text("noteBold", "Footnote — bold lead"),
        textarea("note", "Footnote — rest"),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "From Grades To Offers",
        heading: "University & careers guidance",
        body: "A better set of grades is only half the story. Every five-term student gets personalised applications guidance from Principal Owais Ahmed, with a proven record on placement into competitive courses like Oxbridge, Medicine, Dentistry, Law and Economics.",
        image: "/figma/adm-process.webp",
        ring1Value: "72.7",
        ring1Label: "to Russell Group universities (2025)",
        ring2Value: "96",
        ring2Label: "Medicine & Dentistry offer success (2025)",
        noteBold: "See our leavers' destinations.",
        note: "If you are aiming for Medicine or Dentistry, ask us about specialist admissions support.",
        bgColor: "",
      },
    },
    {
      key: "fees",
      name: "Fees & How To Apply",
      description: "The two cream info cards with their links.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        list("cards", "Cards", "Card", [
          text("title", "Title"),
          textarea("body", "Text"),
          text("link1Label", "Link 1 label"),
          url("link1Url", "Link 1 URL"),
          text("link2Label", "Link 2 label"),
          url("link2Url", "Link 2 URL"),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Scholarships & Contact Us",
        heading: "Fees & how to apply",
        cards: JSON.stringify([
          { title: "Scholarships", body: "Please visit the page below for further information on scholarships.", link1Label: "Scholarships", link1Url: "/contact", link2Label: "", link2Url: "" },
          { title: "Contact Us", body: "For more information about the Five-Term A-Level course and how to apply, you can call us or fill out the online enquiry form and we will get in touch as soon as possible. Please also feel free to email or call us.", link1Label: "enquiries@edgbastoncollege.co.uk", link1Url: "mailto:enquiries@edgbastoncollege.co.uk", link2Label: "Call 0121 306 0182.", link2Url: "tel:01213060182" },
        ]),
        bgColor: "",
      },
    },
    {
      key: "accommodation",
      name: "Accommodation",
      description: "Heading, body and the residence cards.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("body", "Body text"),
        list("cards", "Residences", "Residence", [
          text("label", "Small label"),
          text("name", "Name"),
          text("walk", "Distance"),
          text("note", "Footnote"),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Accommodation Support",
        heading: "Accommodation",
        body: "For students relocating to Birmingham, we've partnered with quality student accommodation just minutes from college.",
        cards: JSON.stringify([
          { label: "Closest", name: "Five Ways Residence", walk: "2–3 minute walk to college", note: "Bills included · Secure access · 24/7 support" },
          { label: "Closest", name: "Beech Gardens, Edgbaston", walk: "4–5 minute walk to college", note: "Bills included · Secure access · 24/7 support" },
        ]),
        bgColor: "",
      },
    },
    {
      key: "cta",
      name: "Call To Action",
      description: "The navy banner near the bottom with the two buttons.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        textarea("heading", "Heading"),
        text("subtitle", "Subtitle"),
        text("button1Label", "Button 1 label"),
        url("button1Url", "Button 1 link"),
        text("button2Label", "Button 2 label"),
        url("button2Url", "Button 2 link"),
        color("cardColor", "Banner colour", "Leave empty for the default navy."),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Take The Next Step",
        heading: "Start your Five-Term A-Level in Birmingham",
        subtitle: "Fill out the online enquiry form, email us, or give us a call.",
        button1Label: "Enquire About Course",
        button1Url: "/contact",
        button2Label: "Call 0121 306 0182",
        button2Url: "tel:01213060182",
        cardColor: "",
      },
    },
    {
      key: "faq",
      name: "FAQ",
      description: "Heading, subtitle and every question & answer.",
      fields: [
        toggle(),
        textarea("heading", "Heading"),
        textarea("subtitle", "Subtitle"),
        color(),
        list("faqs", "Questions & Answers", "Question", [
          text("q", "Question"),
          textarea("a", "Answer"),
        ]),
      ],
      defaults: {
        visible: "1",
        heading: "Five Term A-Level FAQ",
        subtitle: "Quick answers to the most common questions about the five-term A-Level pathway in Birmingham.",
        bgColor: "",
        faqs: JSON.stringify([
          { q: "What is the Five Term A-Level?", a: "It's a flexible A-Level pathway that starts in January and covers the full A-Level over five terms — ideal for students who missed the September start but want a complete, well-structured route to university." },
          { q: "Who is the five-term pathway for?", a: "Students who need a mid-year start, are re-planning their sixth form, or want extra time and structure to cover the full A-Level content before sitting exams in the summer series." },
          { q: "When will I sit my exams?", a: "You sit the full A-Level exams in the standard summer series (May–June), fully prepared through weekly assessments and mock exams across the five terms." },
          { q: "How many subjects can I take?", a: "Most students take one to three A-Levels. We build your timetable around exactly the subjects you need for your target university course." },
          { q: "Will I receive UCAS support?", a: "Yes — personalised UCAS guidance from Principal Owais Ahmed is built into the programme, from university selection to your personal statement and interviews." },
          { q: "How do I apply?", a: "Enquire online or call 0121 306 0182. We review your goals, agree your subjects and target grades, and confirm your place — simple and quick." },
        ]),
      },
    },
  ],
};

export const HISTORY_TEMPLATE: TemplateDef = {
  key: "history",
  name: "Our History Page",
  description: "Every section of the Our History page.",
  sections: [
    {
      key: "hero",
      name: "Banner",
      description: "Top banner with heading and button.",
      fields: [
        toggle(),
        image("bgDesktop", "Background image"),
        textarea("heading", "Heading"),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
      ],
      defaults: {
        visible: "1",
        bgDesktop: "/figma/history-hero.webp",
        heading: "Edgbaston History",
        buttonLabel: "Enquire About Course",
        buttonUrl: "/contact",
      },
    },
    {
      key: "commitment",
      name: "Commitment to Excellence",
      description: "Heading, intro and the four commitment cards.",
      fields: [
        toggle(),
        text("heading", "Heading"),
        textarea("body", "Intro text"),
        list("cards", "Cards", "Card", [text("title", "Title"), textarea("body", "Text")]),
        color(),
      ],
      defaults: {
        visible: "1",
        heading: "Our Commitment to Excellence",
        body: "Our commitment to providing exceptional support for students' academic journeys and future careers has resulted in first-class outcomes.",
        cards: JSON.stringify([
          { title: "Nurturing Potential", body: "We nurture each student's potential and encourage them to strive for excellence in every area." },
          { title: "Small Class Sizes", body: "We provide small class sizes to ensure every student receives focused support and attention." },
          { title: "Excellent Teaching", body: "We provide excellent teaching to support students throughout their academic journeys." },
          { title: "Personalised Attention", body: "We give each student personalised attention and exceptional support for their future careers." },
        ]),
        bgColor: "",
      },
    },
    {
      key: "founded",
      name: "Founded In",
      description: "The big year figure and the paragraph beside it.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("year", "Big figure"),
        textarea("body", "Paragraph"),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Founded In",
        year: "2015",
        body: "Edgbaston College quickly gained recognition for its outstanding results. Growing steadily through word-of-mouth recommendations, our reputation for academic excellence and individualised learning has led to continuous expansion.",
        bgColor: "",
      },
    },
    {
      key: "blockA",
      name: "Content Block — Image Left",
      description: "Image on the left, bold lead and note on the right.",
      fields: [
        toggle(),
        image("image", "Image"),
        textarea("lead", "Lead text (bold)"),
        textarea("note", "Note text"),
        color(),
      ],
      defaults: {
        visible: "1",
        image: "/figma/history-a.webp",
        lead: "Despite our growth, Edgbaston College remains family-owned, which allows us to prioritise what truly matters – creating a welcoming and supportive environment where each student is known and valued.",
        note: "Our open-door policy ensures students and parents feel comfortable seeking guidance and support at any time, fostering a strong sense of community and shared purpose.",
        bgColor: "",
      },
    },
    {
      key: "blockB",
      name: "Content Block — Image Right",
      description: "Bold lead and note on the left, image on the right.",
      fields: [
        toggle(),
        image("image", "Image"),
        textarea("lead", "Lead text (bold)"),
        textarea("note", "Note text"),
        color(),
      ],
      defaults: {
        visible: "1",
        image: "/figma/history-grass.webp",
        lead: "Our unwavering dedication to student success has consistently placed us amongst the leading providers for students seeking admission to prestigious universities and competitive courses, including Oxbridge, Medicine, and Dentistry.",
        note: "This outstanding track record is a testament to our commitment to empowering students to achieve their highest aspirations.",
        bgColor: "",
      },
    },
  ],
};

export const CONTACT_TEMPLATE: TemplateDef = {
  key: "contact",
  name: "Contact Page",
  description: "Every section of the Contact page.",
  sections: [
    {
      key: "hero",
      name: "Banner",
      description: "Top banner with heading, phone and email buttons.",
      fields: [
        toggle(),
        image("bgDesktop", "Background image"),
        textarea("heading", "Heading"),
        text("phone", "Phone number"),
        text("email", "Email address"),
      ],
      defaults: {
        visible: "1",
        bgDesktop: "/figma/retake-hero.webp",
        heading: "Contact Edgbaston College.",
        phone: "0121 306 0182",
        email: "enquiries@edgbastoncollege.co.uk",
      },
    },
    {
      key: "details",
      name: "Find Us / Contact Details",
      description: "Heading and the contact detail rows (the map is managed automatically).",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        text("principal", "Principal"),
        text("addressName", "Address label"),
        textarea("addressLine", "Address"),
        text("phone", "Phone number"),
        text("email", "Email address"),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Find us",
        heading: "Get Directions",
        principal: "Owais Ahmed",
        addressName: "Edgbaston College",
        addressLine: "37 George Road, Edgbaston, Birmingham, B15 1PL",
        phone: "0121 306 0182",
        email: "enquiries@edgbastoncollege.co.uk",
        bgColor: "",
      },
    },
    {
      key: "company",
      name: "Company & Proprietor Info",
      description: "Heading and the information cards.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        textarea("heading", "Heading"),
        list("cards", "Info cards", "Card", [text("label", "Label"), text("value", "Value")]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Company Details",
        heading: "Company & Proprietor Information",
        cards: JSON.stringify([
          { label: "Proprietor", value: "Edgbaston College Ltd" },
          { label: "Company Number", value: "09463572" },
          { label: "Proprietor email", value: "enquiries@edgbastoncollege.co.uk" },
          { label: "Proprietor Address", value: "746 Old Lode Lane, Solihull, B928NH" },
        ]),
        bgColor: "",
      },
    },
  ],
};

export const ABOUT_TEMPLATE: TemplateDef = {
  key: "about",
  name: "About Us Page",
  description: "Every section of the About Us page.",
  sections: [
    {
      key: "hero",
      name: "Banner",
      description: "Top banner image and heading.",
      fields: [toggle(), image("bgDesktop", "Background image"), textarea("heading", "Heading")],
      defaults: { visible: "1", bgDesktop: "/figma/course-retake.webp", heading: "About Edgbaston College" },
    },
    {
      key: "principal",
      name: "Principal's Welcome",
      description: "Photo, heading, paragraphs, pull-quote and button.",
      fields: [
        toggle(),
        image("image", "Photo"),
        text("heading", "Heading"),
        textarea("para1", "Paragraph 1"),
        textarea("para2", "Paragraph 2"),
        textarea("quote", "Pull-quote"),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
        color(),
      ],
      defaults: {
        visible: "1",
        image: "/figma/owais-ahmed.webp",
        heading: "Principal's Welcome",
        para1: "Welcome to Edgbaston College, Birmingham's highest-performing sixth form college. As Principal and founder, I'm incredibly proud of what we've built over the past eight years. When I established the college, I wanted to create something special: a place focused on getting the very best from every single student. Today, I believe we've achieved something remarkable.",
        para2: "Our value-added score of +0.59 in the most recent academic year makes us number one in Birmingham and 25th in England. What does this mean for your child? Students who might be predicted mid-B/BBB grades elsewhere are achieving AAA with us.",
        quote: "That's what happens when you combine small classes, exceptional teaching, and genuine individual attention.",
        buttonLabel: "About Owais Ahmed",
        buttonUrl: "/contact",
        bgColor: "",
      },
    },
    {
      key: "mission",
      name: "Education with a Purpose",
      description: "Mission heading, intro and the approach cards.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("body", "Intro text"),
        text("approachLabel", "Approach pill label"),
        list("cards", "Approach cards", "Card", [text("n", "Number"), text("title", "Title"), textarea("body", "Text")]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Our Mission",
        heading: "Education with a Purpose",
        body: "At Edgbaston College, our core mission is simple: to ensure students achieve top A-Level grades while equipping them with the skills and knowledge needed for excellent university and career outcomes.",
        approachLabel: "Our Approach",
        cards: JSON.stringify([
          { n: "01", title: "Expert Teaching", body: "Our teachers are highly skilled and dedicated to providing exceptional teaching, tailored to meet each student's unique needs and aspirations." },
          { n: "02", title: "Constant Feedback", body: "We give students constant feedback and support, helping them continuously improve across their academic, personal and career pursuits." },
          { n: "03", title: "Modern & Forward-Thinking", body: "Our culture is modern and forward-thinking. We use technology, real-time data and step-by-step feedback to help students learn effectively." },
          { n: "04", title: "Career-Focused", body: "We focus on personal growth and career guidance, with regular career meetings and personal development sessions that build vital life skills, including interview technique and personal statements." },
        ]),
        bgColor: "",
      },
    },
    {
      key: "history",
      name: "Our History",
      description: "Heading and the history columns.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        list("cards", "History columns", "Column", [text("title", "Title"), textarea("body", "Text")]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Our Story",
        heading: "Our History",
        cards: JSON.stringify([
          { title: "Since day one", body: "Edgbaston College has always aimed to nurture potential and drive excellence in every area through small class sizes, consistent teaching and personalised attention for each student." },
          { title: "Founded in 2015", body: "Founded in 2015, Edgbaston College quickly gained recognition for its outstanding results. Growing steadily through word-of-mouth, our reputation for academic excellence has led to continuous expansion." },
          { title: "Family-owned", body: "Despite our growth, Edgbaston College remains family-owned, which allows us to prioritise what truly matters — a welcoming, supportive environment where each student is known and valued." },
          { title: "Oxbridge, Medicine & Dentistry", body: "Our dedication to student success has placed us amongst the leading providers for admission to prestigious universities and competitive courses, including Oxbridge, Medicine and Dentistry." },
        ]),
        bgColor: "",
      },
    },
    {
      key: "teachers",
      name: "Experienced Teachers",
      description: "Heading, intro and the staff cards.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("body", "Intro text"),
        list("cards", "Staff", "Teacher", [
          text("name", "Name"),
          text("role", "Role"),
          image("image", "Photo"),
          textarea("body", "Bio"),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Staff",
        heading: "Edgbaston College experienced teachers",
        body: "Edgbaston College has a team of experienced teachers across a range of A-Level subjects, all committed to helping students reach their full potential — academically and personally.",
        cards: JSON.stringify([
          { name: "Brian Ray", role: "Principal", image: "/figma/staff-1.webp", body: "Created and led Edgbaston College in 2015 and previously worked as an MBA banker at UBS and J.P. Morgan." },
          { name: "David Morriss", role: "Vice Principal & Biology Teacher", image: "/figma/staff-2.webp", body: "An experienced teacher with over 20 years' experience; previously Head of Sixth Form at a grammar school." },
          { name: "Jeffrey", role: "Vice Principal & Maths Teacher", image: "/figma/staff-3.webp", body: "A qualified Maths and Physics teacher who has been with Edgbaston College for six years." },
          { name: "Dan", role: "Economics Teacher", image: "/figma/staff-4.webp", body: "A highly experienced Economics teacher with over 30 years' experience; formerly an Assistant Headteacher before joining the College." },
        ]),
        bgColor: "",
      },
    },
    {
      key: "inspection",
      name: "Inspection Reports",
      description: "Heading of the inspection-reports block. (The report tabs are managed in code.)",
      fields: [toggle(), text("eyebrow", "Small label"), text("heading", "Heading"), color()],
      defaults: { visible: "1", eyebrow: "Reports", heading: "Inspection Reports", bgColor: "" },
    },
    {
      key: "testimonials",
      name: "What Our Students Say",
      description: "Heading and the student cards (the first is the large featured card with a quote).",
      fields: [
        toggle(),
        text("label", "Small label"),
        text("title", "Heading"),
        list("cards", "Student cards", "Student", [
          text("name", "Name"),
          image("image", "Photo"),
          text("from", "Starting grades"),
          text("to", "Final grades"),
          text("course", "Course & university"),
          textarea("quote", "Quote (featured card only)"),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        label: "Student Success",
        title: "What our students say",
        cards: JSON.stringify([
          { name: "Alishba", image: "/figma/pathway-1.webp", from: "BB", to: "A*A*", course: "Law at University of Cambridge", quote: "The career guidance was absolutely transformative for me. Umar's Chemistry teaching helped me jump from a D to an A, whilst Owais's university advice gave me clear direction for my future. I'm incredibly grateful for the comprehensive academic and careers support." },
          { name: "Nicole", image: "/figma/news-1.webp", from: "BB", to: "A*A*", course: "Dentistry at King's College London", quote: "" },
          { name: "Tara", image: "/figma/news-2.webp", from: "BB", to: "AA", course: "Medicine at Edge Hill University", quote: "" },
        ]),
        bgColor: "",
      },
    },
  ],
};

export const ADMISSIONS_TEMPLATE: TemplateDef = {
  key: "admissions",
  name: "Admissions Requirements Page",
  description: "Every section of the Admissions Requirements page.",
  sections: [
    {
      key: "intro",
      name: "Title & Intro",
      description: "Heading, intro paragraph and the group photo.",
      fields: [
        toggle(),
        textarea("heading", "Heading"),
        textarea("body", "Intro paragraph"),
        image("image", "Group photo"),
        color(),
      ],
      defaults: {
        visible: "1",
        heading: "Admissions Requirements",
        body: "Edgbaston College is an academically ambitious yet inclusive learning community. Above all, we look for students who we believe have the potential to thrive here, and our admissions process is designed to get to know each applicant as an individual.",
        image: "/figma/adm-group.webp",
        bgColor: "",
      },
    },
    {
      key: "lookFor",
      name: "What We Look For",
      description: "Eyebrow, heading and the three cards.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        textarea("heading", "Heading"),
        list("cards", "Cards", "Card", [textarea("text", "Text")]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "What We Look For",
        heading: "When considering an application, we hope to:",
        cards: JSON.stringify([
          { text: "Recognize students who show genuine potential and a real enthusiasm for learning." },
          { text: "Welcome students who will enjoy, and add to, the life of our community." },
          { text: "Treat every applicant fairly, openly and with care." },
        ]),
        bgColor: "",
      },
    },
    {
      key: "process",
      name: "Application Process",
      description: "Eyebrow, heading, intro, the numbered steps and the photo.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("body", "Intro text"),
        image("image", "Photo"),
        list("cards", "Steps", "Step", [text("title", "Title"), textarea("body", "Text")]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "How to Apply",
        heading: "Application Process",
        body: "Places are limited and they can vary from year to year, so we always encourage families to get in touch early. We admit students on a rolling basis, and we are happy to talk things through at any stage. The process is straightforward:",
        image: "/figma/adm-process.webp",
        cards: JSON.stringify([
          { title: "Get in Touch", body: "Complete our online enquiry form, call us on 0121 306 0182, or email admissions@edgbastoncollege.co.uk. We are glad to answer any questions you have." },
          { title: "A Look at the Application", body: "We review your application and previous results to understand your academic background." },
          { title: "A Conversation", body: "We arrange a friendly conversation to get to know you and discuss your goals." },
          { title: "An Offer", body: "Successful applicants receive an offer outlining their place and next steps." },
          { title: "Confirming a Place", body: "Confirm your place and we'll guide you through enrolment and induction." },
        ]),
        bgColor: "",
      },
    },
    {
      key: "requirements",
      name: "Requirements Cards",
      description: "Eyebrow, heading, intro and the requirement cards (each with bullet points).",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("body", "Intro text"),
        list("cards", "Requirement cards", "Card", [
          text("title", "Title"),
          textarea("points", "Bullet points", "One point per line."),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "A Guide to Entry",
        heading: "Admissions Requirements",
        body: "We prefer to consider each student as an individual rather than apply a rigid set of rules, so please do talk to us even if you are unsure. As a general guide, students who join us tend to meet the following:",
        cards: JSON.stringify([
          {
            title: "A-Level (Two-Year / Five-Term / Year 13 Entry)",
            points: "Many of our students arrive with an average GCSE score of around 6.7 (a mid to high grade B) or equivalent, typically across at least 6 GCSEs. This gives a helpful foundation, though it is a guide rather than a fixed bar.\nA strong grasp of the subjects to be studied at A-Level helps students get off to a confident start, particularly in Mathematics and Chemistry, which build on solid GCSE foundations.",
          },
          {
            title: "A-Level Retake (One Year)",
            points: "More than anything, we look for the potential to achieve strong grades and the determination to improve university or career prospects.",
          },
        ]),
        bgColor: "",
      },
    },
    {
      key: "faq",
      name: "FAQ",
      description: "Eyebrow, heading and the questions & answers.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        list("faqs", "Questions & Answers", "Question", [text("q", "Question"), textarea("a", "Answer")]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Good to Know",
        heading: "Frequently Asked Questions",
        faqs: JSON.stringify([
          { q: "Resits", a: "We do not accept GCSE resits and will only consider your first GCSE attempt (and in one sitting). A-Level resits are considered for all programmes." },
          { q: "Mitigating circumstances", a: "If your grades were affected by illness or personal circumstances, let us know — we consider each application individually and take context into account." },
        ]),
        bgColor: "",
      },
    },
  ],
};

export const FEES_TEMPLATE: TemplateDef = {
  key: "fees",
  name: "Fees Page",
  description: "Every section of the Fees page — intro, programme price tables, tuition band and fee notes.",
  sections: [
    {
      key: "intro",
      name: "Title & Intro",
      description: "Heading, intro paragraph and the wide photo below.",
      fields: [
        toggle(),
        textarea("heading", "Heading"),
        textarea("body", "Intro paragraph"),
        image("image", "Photo"),
        color(),
      ],
      defaults: {
        visible: "1",
        heading: "Fees",
        body: "All tuition fees are charged per term over a three-term academic year. Fees can be paid termly in full, or spread across eight equal monthly instalments from September to April.",
        image: "/figma/fees-hero.webp",
        bgColor: "",
      },
    },
    {
      key: "fulltime",
      name: "Full-Time A-Level Programmes",
      description: "Navy section with the eyebrow, heading, subtitle, price table and note.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        text("subtitle", "Subtitle"),
        text("colProgramme", "Table column 1 label"),
        text("colExc", "Table column 2 label"),
        text("colInc", "Table column 3 label"),
        list("rows", "Programme rows", "Programme", [
          text("name", "Programme name"),
          text("exc", "Per term (exc VAT)"),
          text("inc", "Per term (inc VAT)"),
        ]),
        textarea("note", "Note", "Small note shown under the table. Leave empty to hide it."),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Programme",
        heading: "Full-Time A-Level Programmes",
        subtitle: "Per term, at our Edgbaston campus.",
        colProgramme: "Programme",
        colExc: "Per term (exc VAT)",
        colInc: "Per term (inc VAT)",
        rows: JSON.stringify([
          { name: "Two-Year A-Level (3 subjects)", exc: "£6,000", inc: "£7,200" },
          { name: "Five-Term A-Level (3 subjects)", exc: "£6,000", inc: "£7,200" },
          { name: "Transfer into Year 13", exc: "£6,000", inc: "£7,200" },
        ]),
        note: "There is no additional fee for students who take a fourth subject on the Two-Year or Five-Term programme.",
        bgColor: "",
      },
    },
    {
      key: "retake",
      name: "One-Year A-Level Retake",
      description: "Cream section with the two comparison cards (in-person / online).",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("subtitle", "Subtitle"),
        list("cards", "Cards", "Card", [
          text("title", "Title"),
          text("subtitle", "Subtitle"),
          text("badge", "Badge", "Small badge, e.g. 20% lower. Leave empty for none."),
          textarea("rows", "Price rows", 'One row per line as "Label | exc VAT | inc VAT".'),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "One-Year Retake",
        heading: "One-Year A-Level Retake",
        subtitle: "Two ways to complete the retake year — compare in-person study at our Edgbaston campus with our fully online programme.",
        cards: JSON.stringify([
          {
            title: "One-Year A-Level Retake In-person",
            subtitle: "Per term, at our Edgbaston campus.",
            badge: "",
            rows: "One A-Level subject | £3,750 | £4,500\nTwo A-Level subjects | £6,250 | £7,500\nThree A-Level subjects | £7,500 | £9,000",
          },
          {
            title: "One-Year A-Level Retake Online",
            subtitle: "Per term, delivered fully online. 20% lower than our in-person programme.",
            badge: "20% lower",
            rows: "One A-Level subject | £3,000 | £3,600\nTwo A-Level subjects | £5,000 | £6,000\nThree A-Level subjects | £6,000 | £7,200",
          },
        ]),
        bgColor: "",
      },
    },
    {
      key: "tuition",
      name: "Private Tuition",
      description: "Full-width photo band with the eyebrow, heading and the price callout.",
      fields: [
        toggle(),
        image("image", "Background photo"),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        text("label", "Callout label"),
        text("feeLabel", "Fee caption"),
        text("feeValue", "Fee value"),
      ],
      defaults: {
        visible: "1",
        image: "/figma/fees-tuition.webp",
        eyebrow: "Programme",
        heading: "Private Tuition",
        label: "Individual Tuition (online only) — one lesson",
        feeLabel: "Fee (inc VAT)",
        feeValue: "From £90 / hour",
      },
    },
    {
      key: "medicine",
      name: "Medicine & Dentistry Pathway",
      description: "Navy section with the eyebrow, heading, body and the service list.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        textarea("body", "Body text"),
        text("colService", "List column 1 label"),
        text("colFee", "List column 2 label"),
        list("rows", "Services", "Service", [
          text("service", "Service"),
          text("fee", "Fee (inc VAT)"),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Programme",
        heading: "Medicine & Dentistry Pathway",
        body: "Medical and Dental School support is available to internal students only.",
        colService: "Service",
        colFee: "Fee (inc VAT)",
        rows: JSON.stringify([
          { service: "Two-Year A-Level (3 subjects)", fee: "FREE" },
          { service: "Interview Course", fee: "FREE" },
          { service: "MMI Circuit", fee: "FREE" },
          { service: "Personal Statement Workshop", fee: "FREE" },
          { service: "Private Tuition with a Doctor or Dentist", fee: "£90 per hour" },
        ]),
        bgColor: "",
      },
    },
    {
      key: "other",
      name: "Other Fees",
      description: "Cream section with the eyebrow, heading and the additional-fees table.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        text("colItem", "Table column 1 label"),
        text("colFee", "Table column 2 label"),
        list("rows", "Fee rows", "Fee", [
          text("item", "Item"),
          text("fee", "Fee (inc VAT)"),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Additional",
        heading: "Other Fees",
        colItem: "Item",
        colFee: "Fee (inc VAT)",
        rows: JSON.stringify([
          { item: "A-Level exam entry (per subject)", fee: "£500" },
          { item: "Registration fee (non-refundable)", fee: "£400" },
        ]),
        bgColor: "",
      },
    },
    {
      key: "notes",
      name: "Important Fee Information",
      description: "The eyebrow, heading and the three note cards.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        list("cards", "Note cards", "Note", [textarea("text", "Text")]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Please note",
        heading: "Important fee information",
        cards: JSON.stringify([
          { text: "Fees are normally reviewed annually by the Proprietor." },
          { text: "Families with at least two children enrolled at Edgbaston College at the same time receive a 20% discount on the eldest child's fees." },
          { text: "VAT is charged at the prevailing rate (currently 20%) on tuition and registration fees." },
        ]),
        bgColor: "",
      },
    },
  ],
};

export const TERM_DATES_TEMPLATE: TemplateDef = {
  key: "term-dates",
  name: "Term Dates Page",
  description: "Every section of the Term Dates page — the banner and the term schedule cards.",
  sections: [
    {
      key: "hero",
      name: "Banner",
      description: "Top banner: background image, heading and background colour.",
      fields: [
        toggle(),
        image("bgDesktop", "Background image", "Leave empty to show a plain colour banner."),
        textarea("heading", "Heading"),
        color("bgColor", "Banner colour", "The colour behind the image (and the whole banner if no image is set)."),
      ],
      defaults: {
        visible: "1",
        bgDesktop: "/figma/retake-hero.webp",
        heading: "Term Dates",
        bgColor: "",
      },
    },
    {
      key: "schedule",
      name: "Term Schedule",
      description: "The eyebrow, heading and every term card. Add, remove and reorder term cards — changes go live on save.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        textarea("heading", "Heading"),
        color(),
        list(
          "terms",
          "Term cards",
          "Term",
          [
            text("title", "Term name", "e.g. Autumn Term"),
            text("year", "Academic year", "Shown on the right of the header, e.g. 2026/27"),
            textarea(
              "rows",
              "Rows",
              'One row per line as "Label | Value", e.g. "First day of term | 3rd Sep 2026".',
            ),
            text("barColor", "Header colour", "Hex colour for this card's header bar, e.g. #0e2f49. Leave empty for navy."),
          ],
        ),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Term Schedule",
        heading: "Term Dates",
        bgColor: "",
        terms: JSON.stringify([
          {
            title: "Autumn Term",
            year: "2026/27",
            rows: "First day of term | 3rd Sep 2026\nHalf Term | 22nd Oct 2026 - 30th Oct 2026\nLast day of term | 17th Dec 2026",
            barColor: "",
          },
          {
            title: "Spring Term",
            year: "2026/27",
            rows: "First day of term | 6th Jan 2027\nHalf Term | 15th Feb 2027 - 19th Feb 2027\nLast day of term | 29th Mar 2027",
            barColor: "",
          },
          {
            title: "Summer Term",
            year: "2026/27",
            rows: "First day of term | 12th Apr 2027\nHalf Term | 25th Jun 2027\nFurther information | Monday 3rd - 31st May 2027",
            barColor: "",
          },
        ]),
      },
    },
  ],
};

export const RESULTS_TEMPLATE: TemplateDef = {
  key: "results",
  name: "Results & Destinations Page",
  description: "Every section of the Results & Destinations page — banner, year bar, the results breakdown, destinations and FAQ.",
  sections: [
    {
      key: "hero",
      name: "Banner",
      description: "Top banner: background image, heading and background colour.",
      fields: [
        toggle(),
        image("bgDesktop", "Background image", "Leave empty to show a plain colour banner."),
        textarea("heading", "Heading"),
        color("bgColor", "Banner colour", "The colour behind the image (and the whole banner if no image is set)."),
      ],
      defaults: {
        visible: "1",
        bgDesktop: "/figma/retake-hero.webp",
        heading: "Results & Destinations",
        bgColor: "",
      },
    },
    {
      key: "yearbar",
      name: "Year Bar",
      description: "The navy strip under the banner with the year buttons and the enquire button.",
      fields: [
        toggle(),
        textarea("years", "Years", "One year per line — shown as buttons left to right."),
        text("activeYear", "Highlighted year", "Which year button is highlighted, e.g. 2025."),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
        color(),
      ],
      defaults: {
        visible: "1",
        years: ["2020", "2021", "2022", "2023", "2024", "2025"].join("\n"),
        activeYear: "2025",
        buttonLabel: "Enquire About Course",
        buttonUrl: "/contact",
        bgColor: "",
      },
    },
    {
      key: "summary",
      name: "Results Summary",
      description: "The heading, intro paragraph, success-story card and the three headline percentages.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        textarea("heading", "Heading"),
        textarea("body", "Intro paragraph"),
        textarea("body2", "Second paragraph"),
        text("storyLabel", "Story card — small label"),
        text("storyLinkLabel", "Story card — button label"),
        url("storyLinkUrl", "Story card — button link"),
        text("stat1Value", "Stat 1 — value (%)", "Number only, e.g. 16.0"),
        text("stat1Label", "Stat 1 — label", "Grade band, e.g. A*"),
        text("stat2Value", "Stat 2 — value (%)", "Number only, e.g. 65.1"),
        text("stat2Label", "Stat 2 — label", "Grade band, e.g. A*–A"),
        text("stat3Value", "Stat 3 — value (%)", "Number only, e.g. 87.7"),
        text("stat3Label", "Stat 3 — label", "Grade band, e.g. A*–B"),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "2025 Results",
        heading: "2025 A-Level Results: Outstanding Achievement",
        body: "Congratulations to our students who have achieved exceptional results this year. These outstanding grades reflect the incredible hard work, determination and commitment shown throughout the year. Every student should be immensely proud of what they have accomplished — these results are thoroughly well-deserved.",
        body2: "Many students join us each year to retake their A-Levels in Birmingham, improving by an average of 1.78 grades in 2025.",
        storyLabel: "See Success Story's",
        storyLinkLabel: "See Success Story's",
        storyLinkUrl: "/one-year-a-level-retake",
        stat1Value: "16.0",
        stat1Label: "A*",
        stat2Value: "65.1",
        stat2Label: "A*–A",
        stat3Value: "87.7",
        stat3Label: "A*–B",
        bgColor: "",
      },
    },
    {
      key: "subjects",
      name: "Subject Excellence & Grades Gained",
      description: "The subject bars and the 'grades gained per subject' figure.",
      fields: [
        toggle(),
        text("heading", "Heading"),
        text("subtitle", "Subtitle"),
        list("subjects", "Subject bars", "Subject", [
          text("name", "Subject name"),
          text("grade", "Grade band", "e.g. A*–A"),
          text("percent", "Percentage (%)", "Number only, e.g. 71.5"),
        ]),
        text("gradesValue", "Grades gained — figure", "e.g. +1.78"),
        text("gradesLabel", "Grades gained — label"),
        color(),
      ],
      defaults: {
        visible: "1",
        heading: "Subject Excellence",
        subtitle: "Performance in our most popular subjects.",
        subjects: JSON.stringify([
          { name: "Biology", grade: "A*–A", percent: "71.0" },
          { name: "Chemistry", grade: "A*–A", percent: "67.0" },
          { name: "Mathematics", grade: "A*–A", percent: "58.0" },
        ]),
        gradesValue: "+1.78",
        gradesLabel: "Grades Gained Per Subject",
        bgColor: "",
      },
    },
    {
      key: "destinations",
      name: "University Destinations Highlights",
      description: "The two pictograph highlights (Russell Group progression and Medicine & Dentistry).",
      fields: [
        toggle(),
        text("heading", "Heading"),
        text("dest1Label", "Highlight 1 — label"),
        text("dest1Value", "Highlight 1 — value (%)", "Number only, e.g. 72.7"),
        text("dest2Label", "Highlight 2 — label"),
        text("dest2Value", "Highlight 2 — value (%)", "Number only, e.g. 92"),
        color(),
      ],
      defaults: {
        visible: "1",
        heading: "University Destinations Highlights",
        dest1Label: "Our learners head — Russell Group Progression",
        dest1Value: "72.7",
        dest2Label: "Medicine & Dentistry / Success Rate",
        dest2Value: "92",
        bgColor: "",
      },
    },
    {
      key: "students",
      name: "Where Our Students Go Next",
      description: "The heading, filter labels and every destination card. Add, remove and reorder cards — changes go live on save.",
      fields: [
        toggle(),
        text("eyebrow", "Small label"),
        text("heading", "Heading"),
        text("filterDestLabel", "Filter — destination label"),
        text("filterYearLabel", "Filter — year label"),
        text("resetLabel", "Reset button label"),
        list("cards", "Destination cards", "Student", [
          text("name", "Student name"),
          text("year", "Year", "e.g. 2025"),
          text("course", "Course"),
          text("university", "University"),
          image("photo", "Student photo"),
          image("logo", "University logo", "Optional — the university name is shown if no logo is set."),
        ]),
        color(),
      ],
      defaults: {
        visible: "1",
        eyebrow: "Destinations",
        heading: "Where our students go next.",
        filterDestLabel: "Filter by Destination",
        filterYearLabel: "Filter by Year",
        resetLabel: "Reset",
        cards: JSON.stringify([
          { name: "Alishba Khan", year: "2025", course: "Law", university: "King's College London", photo: "/figma/pathway-1.webp", logo: "" },
          { name: "Chloe Field", year: "2025", course: "Biomedical Science", university: "University of Leeds", photo: "/figma/news-1.webp", logo: "" },
          { name: "Richard Williams", year: "2025", course: "Engineering", university: "University of Manchester", photo: "/figma/pathway-3.webp", logo: "" },
          { name: "Poppy Robinson", year: "2025", course: "Economics", university: "University College London", photo: "/figma/news-2.webp", logo: "" },
          { name: "Hassan Alfalaha", year: "2024", course: "Medicine", university: "University of Manchester", photo: "/figma/staff-2.webp", logo: "" },
          { name: "Maya Ahmed", year: "2024", course: "Politics", university: "University College London", photo: "/figma/pathway-2.webp", logo: "" },
          { name: "Usha Patel", year: "2024", course: "Dentistry", university: "University of Leeds", photo: "/figma/staff-3.webp", logo: "" },
          { name: "Aaliyah Noor", year: "2023", course: "Law", university: "King's College London", photo: "/figma/staff-4.webp", logo: "" },
        ]),
        bgColor: "",
      },
    },
    {
      key: "faq",
      name: "FAQ",
      description: "Heading, Contact button and every question & answer.",
      fields: [
        toggle(),
        textarea("heading", "Heading"),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
        color(),
        list("faqs", "Questions & Answers", "Question", [text("q", "Question"), textarea("a", "Answer")]),
      ],
      defaults: {
        visible: "1",
        heading: "A-Level retake & resit FAQ",
        buttonLabel: "Contact Us",
        buttonUrl: "/contact",
        bgColor: "",
        faqs: JSON.stringify([
          { q: "Where can I retake my A-Levels in Birmingham?", a: "At Edgbaston College — Birmingham's specialist sixth-form college for A-Level retakes, based at 37 George Road, Edgbaston, a short walk from Five Ways station." },
          { q: "Can you retake A-Levels?", a: "Yes. Anyone can retake their A-Levels regardless of age or previous school. Most of our students complete their retake in a single year with us." },
          { q: "Can you resit A-Levels in November?", a: "November resits are only available for a small number of subjects and exam boards. For most A-Levels the next opportunity is the summer series." },
          { q: "When can you resit your A-Levels?", a: "A-Level exams are sat in the summer window (May–June). Students join us in September, re-learn the full course, and sit their exams the following summer." },
          { q: "How much does it cost to retake A-Levels?", a: "Fees depend on the number of subjects you retake. Contact us for current per-subject fees — flexible payment plans are available." },
          { q: "What happens if you do worse in a resit?", a: "Universities almost always consider your best result, so a resit is very low risk. The overwhelming majority of our students improve on their previous grades." },
          { q: "How many times can you resit an A-Level?", a: "There's no limit — you can resit an A-Level as many times as you like. In practice, one well-structured retake year is usually all it takes." },
          { q: "Can I take a new A-Level subject when I retake?", a: "Yes. Many students take up a brand-new subject alongside their retakes to better fit their target university course." },
          { q: "Do universities accept A-Level retakes?", a: "The vast majority do, including Russell Group universities. We guide you through each university's stance as part of our UCAS support." },
          { q: "How will you predict my grades?", a: "Predicted grades are based on your performance in our regular assessments and mock exams, ensuring they are realistic and well-evidenced." },
          { q: "What are your outcomes like?", a: "In 2025, 87.7% of grades were A*–B and 65.1% were A*–A, with students gaining an average of +1.78 grades per subject." },
        ]),
      },
    },
  ],
};

export const TEMPLATES: TemplateDef[] = [
  HOME_TEMPLATE,
  RETAKE_TEMPLATE,
  FIVE_TERM_TEMPLATE,
  ABOUT_TEMPLATE,
  HISTORY_TEMPLATE,
  ADMISSIONS_TEMPLATE,
  FEES_TEMPLATE,
  TERM_DATES_TEMPLATE,
  RESULTS_TEMPLATE,
  CONTACT_TEMPLATE,
  HEADER_TEMPLATE,
  FOOTER_TEMPLATE,
];

export function getTemplateDef(key: string) {
  return TEMPLATES.find((t) => t.key === key);
}

export function getSectionDef(template: string, key: string) {
  return getTemplateDef(template)?.sections.find((s) => s.key === key);
}

/** Parse a numeric field (e.g. "72.7" or "96%") with a safe fallback. */
export function num(value: string | undefined, fallback: number): number {
  const n = parseFloat(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : fallback;
}

/** Code defaults for a section (used by components when no data is passed). */
export function sectionDefaults(template: string, key: string): Record<string, string> {
  return getSectionDef(template, key)?.defaults ?? {};
}
