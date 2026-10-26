import { notFound } from "next/navigation";
import Card from "../../Card";
import { listings, categories, SITE, NAME } from "../../../lib/data";
export const generateStaticParams = () => categories.map(c => ({ slug: c.slug }));
export function generateMetadata({ params }) { const c = categories.find(x => x.slug === params.slug); return c ? { title: `${c.name} in Texas`, description: c.blurb, alternates: { canonical: `/c/${c.slug}` }, openGraph: { type: "website", locale: "en_US", siteName: NAME, url: `/c/${c.slug}` } } : {}; }
export default function Cat({ params }) {
  const c = categories.find(x => x.slug === params.slug); if (!c) notFound();
  const ls = listings.filter(l => l.cat === c.slug).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  const ld = { "@context": "https://schema.org", "@type": "ItemList", name: `${c.name} in Texas`, itemListElement: ls.map((l, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/l/${l.slug}`, name: l.name })) };
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: NAME, item: SITE },
    { "@type": "ListItem", position: 2, name: c.name, item: `${SITE}/c/${c.slug}` } ] };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    <h1>{c.name} in Texas</h1><p className="lede">{c.blurb}</p>
    <div className="grid">{ls.map(l => <Card key={l.slug} l={l} />)}</div></>);
}
