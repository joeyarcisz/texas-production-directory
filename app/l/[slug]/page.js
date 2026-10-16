import { notFound } from "next/navigation";
import Link from "next/link";
import Card from "../../Card";
import { listings, categories } from "../../../lib/data";
function postal(a) {
  const m = a.match(/^(.*),\s*([^,]+),\s*TX\s*(\d{5})$/);
  return m ? { "@type": "PostalAddress", streetAddress: m[1], addressLocality: m[2], addressRegion: "TX", postalCode: m[3], addressCountry: "US" }
    : { "@type": "PostalAddress", streetAddress: a, addressRegion: "TX", addressCountry: "US" };
}
export const generateStaticParams = () => listings.map(l => ({ slug: l.slug }));
export function generateMetadata({ params }) { const l = listings.find(x => x.slug === params.slug); return l ? { title: `${l.name}, ${l.city}`, description: l.note, alternates: { canonical: `/l/${l.slug}` } } : {}; }
export default function L({ params }) {
  const l = listings.find(x => x.slug === params.slug); if (!l) notFound();
  const c = categories.find(x => x.slug === l.cat);
  const type = l.cat === "locations" ? "GovernmentOrganization" : l.cat === "crew" ? "Organization" : "LocalBusiness";
  const ld = { "@context": "https://schema.org", "@type": type, name: l.name, url: l.url, description: l.note, areaServed: l.city + ", Texas",
    ...(l.phone && { telephone: l.phone }), ...(l.address && { address: postal(l.address) }) };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <p className="meta"><Link href={`/c/${c.slug}`}>{c.name}</Link></p><Card l={l} />
    <p className="lede">Listing info comes from the company's public site. If you run this business and something is off, email joey@gearedlikeamachine.com and we'll fix it the same day.</p></>);
}
