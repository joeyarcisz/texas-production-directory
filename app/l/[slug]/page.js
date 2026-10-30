import { notFound } from "next/navigation";
import Link from "next/link";
import Card from "../../Card";
import { listings, categories, SITE, NAME } from "../../../lib/data";
function postal(a) {
  const m = a.match(/^(.*),\s*([^,]+),\s*TX\s*(\d{5})$/);
  return m ? { "@type": "PostalAddress", streetAddress: m[1], addressLocality: m[2], addressRegion: "TX", postalCode: m[3], addressCountry: "US" }
    : { "@type": "PostalAddress", streetAddress: a, addressRegion: "TX", addressCountry: "US" };
}
export const generateStaticParams = () => listings.map(l => ({ slug: l.slug }));
export function generateMetadata({ params }) { const l = listings.find(x => x.slug === params.slug); return l ? { title: `${l.name}, ${l.city}`, description: l.note, alternates: { canonical: `/l/${l.slug}` }, openGraph: { type: "website", locale: "en_US", siteName: NAME, url: `/l/${l.slug}` } } : {}; }
export default function L({ params }) {
  const l = listings.find(x => x.slug === params.slug); if (!l) notFound();
  const c = categories.find(x => x.slug === l.cat);
  const city = l.city.split(" ")[0];
  const more = listings.filter(x => x.cat === l.cat && x.slug !== l.slug)
    .sort((a, b) => (b.city.includes(city) ? 1 : 0) - (a.city.includes(city) ? 1 : 0)).slice(0, 5);
  const type = l.cat === "locations" ? "GovernmentOrganization" : l.cat === "crew" ? "Organization" : "LocalBusiness";
  const ld = { "@context": "https://schema.org", "@type": type, name: l.name, url: l.url, description: l.note, areaServed: l.city + ", Texas",
    ...(l.phone && { telephone: l.phone }), ...(l.address && { address: postal(l.address) }) };
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: NAME, item: SITE },
    { "@type": "ListItem", position: 2, name: c.name, item: `${SITE}/c/${c.slug}` },
    { "@type": "ListItem", position: 3, name: l.name, item: `${SITE}/l/${l.slug}` } ] };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    <p className="meta"><Link href={`/c/${c.slug}`}>{c.name}</Link></p><Card l={l} as="h1" />
    <p className="lede">Listing info comes from the company's public site. If you run this business and something is off, email joey@gearedlikeamachine.com and we'll fix it the same day.</p>
    {more.length > 0 && <section><h2>More {c.name.toLowerCase()} in Texas</h2>
      <ul className="more">{more.map(x => <li key={x.slug}><Link href={`/l/${x.slug}`}>{x.name}</Link> <span className="meta">{x.city}</span></li>)}</ul>
      <p className="meta"><Link href={`/c/${c.slug}`}>See all {c.name.toLowerCase()}</Link></p></section>}</>);
}
