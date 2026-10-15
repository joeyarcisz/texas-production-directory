import Link from "next/link";
import Card from "./Card";
import Signup from "./Signup";
import { listings, categories } from "../lib/data";
export default function Home() {
  const f = listings.filter(l => l.featured);
  return (<>
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
