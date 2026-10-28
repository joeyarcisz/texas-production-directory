import "./globals.css";
import Link from "next/link";
import { SITE, NAME, DESC, categories } from "../lib/data";
export const metadata = {
  metadataBase: new URL(SITE),
  title: { default: NAME, template: `%s | ${NAME}` },
  description: DESC,
  openGraph: { type: "website", locale: "en_US", siteName: NAME },
  twitter: { card: "summary" },
};
export default function RootLayout({ children }) {
  return (<html lang="en"><body>
    <header className="top"><div className="wrap row">
      <Link href="/" className="brand">{NAME.toUpperCase()}</Link>
      <nav>{categories.map(c => <Link key={c.slug} href={`/c/${c.slug}`}>{c.short}</Link>)}<Link href="/featured">Get listed</Link></nav>
    </div></header>
    <main className="wrap">{children}</main>
    <footer className="wrap foot">
      <p>Kept by Geared Like A Machine, Dallas. Something wrong or missing? Email <a href="mailto:joey@gearedlikeamachine.com">joey@gearedlikeamachine.com</a>.</p>
      <p><Link href="/featured">Featured listings</Link> · <Link href="/sponsor">Sponsor</Link> · <a href="https://production-engine.com">Production Engine</a> · <a href="https://calltimes.app">CallSheet</a></p>
    </footer>
  </body></html>);
}
