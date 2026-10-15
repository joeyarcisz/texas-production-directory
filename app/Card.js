import Link from "next/link";
import { PE, CS, categories } from "../lib/data";
export default function Card({ l }) {
  const cat = categories.find(c => c.slug === l.cat);
  return (<article className={"card" + (l.featured ? " feat" : "")}>
    {l.featured && <span className="tag">Featured</span>}
    <h3><Link href={`/l/${l.slug}`}>{l.name}</Link></h3>
    <p className="meta">{l.city} · {cat.short}</p>
    <p>{l.note}</p>
    {(l.phone || l.address) && <p className="meta">{[l.phone, l.address].filter(Boolean).join(" · ")}</p>}
    <p className="ctas"><a href={l.url} rel="noopener">Website</a><a href={PE}>Build an estimate</a><a href={CS}>Send call times</a></p>
  </article>);
}
