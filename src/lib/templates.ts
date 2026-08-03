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
export function parseItems(value: string | undefined): Record<string, string>[] {
  const raw = String(value ?? "").trim();
  if (!raw) return [];
  if (raw.startsWith("[")) {
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return arr
          .filter((x) => x && typeof x === "object")
          .map((x) => Object.fromEntries(Object.entries(x).map(([k, v]) => [k, String(v ?? "")])));
      }
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
        text("q1", "Question 1"),
        textarea("a1", "Answer 1"),
        text("q2", "Question 2"),
        textarea("a2", "Answer 2"),
        text("q3", "Question 3"),
        textarea("a3", "Answer 3"),
        text("q4", "Question 4"),
        textarea("a4", "Answer 4"),
        text("q5", "Question 5"),
        textarea("a5", "Answer 5"),
        text("q6", "Question 6"),
        textarea("a6", "Answer 6"),
        text("q7", "Question 7", "Leave empty to hide."),
        textarea("a7", "Answer 7"),
        text("q8", "Question 8", "Leave empty to hide."),
        textarea("a8", "Answer 8"),
        text("q9", "Question 9", "Leave empty to hide."),
        textarea("a9", "Answer 9"),
        text("q10", "Question 10", "Leave empty to hide."),
        textarea("a10", "Answer 10"),
      ],
      defaults: {
        visible: "1",
        heading: "A-Level retake & resit FAQ",
        subtitle: "Quick answers to the most common questions about retaking and resitting A-Levels in Birmingham.",
        buttonLabel: "Contact Us",
        buttonUrl: "/contact",
        bgColor: "",
        q1: "How many A-Levels can I retake?",
        a1: "You can retake as many A-Levels as you need. Most students retake two or three subjects to strengthen their overall grade profile.",
        q2: "Can I retake only one subject?",
        a2: "Yes. Whether you need to improve a single grade or several, we build a plan around exactly the subjects you want to retake.",
        q3: "Will I receive UCAS support?",
        a3: "Absolutely. Every student receives personalised UCAS reapplication guidance, overseen by Principal Owais Ahmed.",
        q4: "How often are assessments?",
        a4: "We run weekly assessments and three full mock exams across the year, with targeted feedback after each one.",
        q5: "Is accommodation available?",
        a5: "We can advise on trusted local accommodation options for students relocating to study with us in Birmingham.",
        q6: "How do I apply?",
        a6: "Simply enquire through our contact page and our admissions team will guide you through every step of the application.",
        q7: "", a7: "", q8: "", a8: "", q9: "", a9: "", q10: "", a10: "",
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
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
        color(),
      ],
      defaults: {
        visible: "1",
        title: "August Offer",
        message: "30% off course fees for the first 5 eligible applicants only.",
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

export const TEMPLATES: TemplateDef[] = [HOME_TEMPLATE, HEADER_TEMPLATE, FOOTER_TEMPLATE];

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
