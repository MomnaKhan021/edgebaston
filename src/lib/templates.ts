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

export type FieldType = "text" | "textarea" | "image" | "url";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  hint?: string;
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
        text("badge", "Bold prefix"),
        text("message", "Announcement text", "Leave empty to hide the whole bar."),
        text("linkLabel", "Link label"),
        url("linkUrl", "Link URL", "Leave empty to hide the link."),
      ],
      defaults: {
        badge: "EXCITING NEWS:",
        message: "Admissions for Batch 2026 are Now Open! Visit our",
        linkLabel: "Admissions page",
        linkUrl: "/admissions",
      },
    },
    {
      key: "hero",
      name: "Home Banner",
      description: "Full-width banner: background images, heading, button and the stats card.",
      fields: [
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
      ],
      defaults: {
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
      },
    },
    {
      key: "feature-strip",
      name: "Highlights Ticker",
      description: "The scrolling white strip under the banner.",
      fields: [textarea("items", "Items", "One item per line.")],
      defaults: {
        items: [
          "Average Class Size of Seven",
          "Strong Pastoral Support",
          "Excellent Career & University Support",
          "Medicine & Dentistry Success",
          "Russell Group Progression",
        ].join("\n"),
      },
    },
    {
      key: "principal",
      name: "Message from the Principal",
      description: "Navy section with the principal's message and Read more button.",
      fields: [
        text("eyebrow", "Small label"),
        textarea("message", "Message"),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
      ],
      defaults: {
        eyebrow: "Message from the Principal",
        message:
          "Students arrive at the College aiming to excel academically and secure a place on a course at their preferred university. We achieve this with exceptional teaching, small classes, and individual attention and help for every pupil.",
        buttonLabel: "Read more",
        buttonUrl: "/about",
      },
    },
    {
      key: "pathways",
      name: "Courses We Offer",
      description: "Header of the course-pathways slider. (The three cards are edited in code; courses live under Courses.)",
      fields: [text("label", "Small label"), textarea("title", "Heading")],
      defaults: {
        label: "Courses We Offer",
        title: "Choose the A-Level Pathway That Fits Your Goal",
      },
    },
    {
      key: "results",
      name: "Results That Open Doors",
      description: "Outcome spotlight: door graphic, ranking cards and the blue stats bar.",
      fields: [
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
      ],
      defaults: {
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
      },
    },
    {
      key: "stories",
      name: "Success Stories",
      description: "Header of the student stories slider. (Story cards are edited in code.)",
      fields: [text("label", "Small label"), text("title", "Heading"), textarea("subtitle", "Subtitle")],
      defaults: {
        label: "Success Stories",
        title: "Meet Our Students",
        subtitle: "Real students, real grade jumps. Watch how their retake year went.",
      },
    },
    {
      key: "why-choose",
      name: "Why Students Choose Edgbaston",
      description: "Heading and the five reason cards.",
      fields: [
        textarea("heading", "Heading"),
        text("card1Title", "Card 1 title"),
        textarea("card1Body", "Card 1 text"),
        text("card2Title", "Card 2 title"),
        textarea("card2Body", "Card 2 text"),
        text("card3Title", "Card 3 title"),
        textarea("card3Body", "Card 3 text"),
        text("card4Title", "Card 4 title"),
        textarea("card4Body", "Card 4 text"),
        text("card5Title", "Card 5 title"),
        textarea("card5Body", "Card 5 text"),
        text("buttonLabel", "Mobile button label"),
        url("buttonUrl", "Mobile button link"),
      ],
      defaults: {
        heading: "Why Students Choose Edgbaston College",
        card1Title: "Small Classes",
        card1Body: "Maximum of 10 students per class, typically 7, so every student receives individual attention.",
        card2Title: "Progress",
        card2Body: "Students gain an average of 1.78 grades per subject, with jumps from BBB to A*AA not uncommon.",
        card3Title: "Guidance",
        card3Body: "Personalised UCAS reapplication guidance from Principal Owais Ahmed, who oversees applications.",
        card4Title: "Tailored",
        card4Body: "Every student starts with a one-to-one academic consultation to identify gaps and build a personalised retake plan.",
        card5Title: "Excellence",
        card5Body: "Weekly assessments, three mock exams, and targeted exam technique coaching help turn knowledge into marks.",
        buttonLabel: "View Results & Destinations",
        buttonUrl: "/courses",
      },
    },
    {
      key: "learn-marquee",
      name: "Learn Today Band",
      description: "The scrolling navy band.",
      fields: [text("message", "Scrolling text")],
      defaults: { message: "Learn Today. Lead Tomorrow." },
    },
    {
      key: "faq",
      name: "FAQ",
      description: "FAQ heading, subtitle and Contact Us button. (Questions are edited in code.)",
      fields: [
        textarea("heading", "Heading"),
        textarea("subtitle", "Subtitle"),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
      ],
      defaults: {
        heading: "A-Level retake & resit FAQ",
        subtitle: "Quick answers to the most common questions about retaking and resitting A-Levels in Birmingham.",
        buttonLabel: "Contact Us",
        buttonUrl: "/contact",
      },
    },
    {
      key: "news",
      name: "What's Happening (News)",
      description: "Header of the news slider. (Articles are edited in code.)",
      fields: [text("label", "Small label"), text("title", "Heading")],
      defaults: {
        label: "Find Your Local YDS Clinic",
        title: "What's happening at Edgbaston",
      },
    },
    {
      key: "offer-bar",
      name: "Sticky Offer Bar",
      description: "The countdown bar fixed to the bottom of every page.",
      fields: [
        text("title", "Offer title"),
        text("message", "Offer text", "Leave empty to hide the bar."),
        text("buttonLabel", "Button label"),
        url("buttonUrl", "Button link"),
      ],
      defaults: {
        title: "August Offer",
        message: "30% off course fees for the first 5 eligible applicants only.",
        buttonLabel: "Enquire About Course",
        buttonUrl: "/contact",
      },
    },
  ],
};

export const TEMPLATES: TemplateDef[] = [HOME_TEMPLATE];

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
