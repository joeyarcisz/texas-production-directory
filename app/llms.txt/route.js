import { SITE, NAME, DESC, categories, listings, CONTACT } from "../../lib/data";

export const dynamic = "force-static";

export function GET() {
  const pages = [
    `- [Home](${SITE}/): Full directory by category`,
    `- [Featured listings](${SITE}/featured): How to get a featured spot on the home page and in a category`,
    ...categories.map(c => `- [${c.name}](${SITE}/c/${c.slug}): ${c.blurb}`),
  ];
  const body = [
    `# ${NAME}`,
    "",
    `> ${DESC}`,
    "",
    "A commercial crew and production directory for people shooting in Texas. Rental houses, stages, film commissions and crew lists for Dallas, Fort Worth, Austin, Houston and San Antonio.", // pragma: allowlist secret
    "Every listing is checked against the company's own site. Basic listings are free. This is not the official Texas Film Commission crew directory.",
    "",
    "## Key pages",
    "",
    ...pages,
    "",
    "## Listings",
    "",
    ...categories.flatMap(c => [
      `### ${c.name}`,
      "",
      ...listings.filter(l => l.cat === c.slug).map(l => `- [${l.name}](${SITE}/l/${l.slug}): ${l.city}`),
      "",
    ]),
    `Individual company pages live under ${SITE}/l/{slug}.`,
    "",
    `Contact: ${CONTACT}`,
    "Kept by Geared Like A Machine, Dallas.",
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
