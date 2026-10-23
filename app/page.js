import Link from "next/link";
import Card from "./Card";
import Signup from "./Signup";
import { listings, categories, SITE } from "../lib/data";
export const metadata = { alternates: { canonical: "/" }, openGraph: { type: "website", siteName: "Texas Production Directory", url: "/" } };
export default function Home() {
  const f = listings.filter(l => l.featured);
  const ld = { "@context": "https://schema.org", "@type": "WebSite", name: "Texas Production Directory", url: SITE,
    description: "Rental houses, stages, film commissions and crew lists for shooting in Dallas, Fort Worth, Austin, Houston and San Antonio.",
    inLanguage: "en-US", publisher: { "@type": "Organization", name: "Geared Like A Machine", url: "https://www.gearedlikeamachine.com" } };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <section className="hero"><h1>Shooting in Texas?<br/>Start with who to call.</h1>
      <p>Rental houses, stages, film commissions and crew lists for DFW, Austin, Houston and San Antonio. Every listing checked against the company's own site. No pay to play on the basics.</p></section>
    {f.map(l => <Card key={l.slug} l={l} />)}
    {categories.map(c => (<section key={c.slug}>
      <h2><Link href={`/c/${c.slug}`}>{c.name}</Link> <span className="count">{listings.filter(l => l.cat === c.slug).length}</span></h2>
      <p className="lede">{c.blurb}</p>
      <div className="grid">{listings.filter(l => l.cat === c.slug && !l.featured).map(l => <Card key={l.slug} l={l} />)}</div>
    </section>))}
    <Signup />
  </>);
}
