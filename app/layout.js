import "./globals.css";
import Link from "next/link";
import { SITE, categories } from "../lib/data";
export const metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Texas Production Directory | Gear, Stages, Locations, Crew", template: "%s | Texas Production Directory" },
  description: "Rental houses, stages, film commissions and crew lists for shooting in Dallas, Fort Worth, Austin, Houston and San Antonio.",
  openGraph: { type: "website", siteName: "Texas Production Directory" },
};
export default function RootLayout({ children }) {
  return (<html lang="en"><body>
    <header className="top"><div className="wrap row">
      <Link href="/" className="brand">TEXAS PRODUCTION DIRECTORY</Link>
      <nav>{categories.map(c => <Link key={c.slug} href={`/c/${c.slug}`}>{c.short}</Link>)}<Link href="/featured">Get listed</Link></nav>
    </div></header>
    <main className="wrap">{children}</main>
    <footer className="wrap foot">
      <p>Kept by Geared Like A Machine, Dallas. Something wrong or missing? Email <a href="mailto:joey@gearedlikeamachine.com">joey@gearedlikeamachine.com</a>.</p>
      <p><Link href="/featured">Featured listings</Link> · <Link href="/sponsor">Sponsor</Link> · <a href="https://production-engine.com">Production Engine</a> · <a href="https://calltimes.app">CallSheet</a></p>
    </footer>
  </body></html>);
}
