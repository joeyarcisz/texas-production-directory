export const metadata = { title: "Featured listings", description: "Put your rental house, stage or crew service at the top of its category.", alternates: { canonical: "/featured" }, openGraph: { type: "website", siteName: "Texas Production Directory", url: "/featured" } };
export default function F() { return (<><h1>Featured listings</h1>
  <p className="lede">Basic listings are free and stay free. A featured spot puts you at the top of your category page and on the home page, with a longer write up and your own photos.</p>
  <ul className="plain"><li>Top of your category and the home page</li><li>Your photos, not stock</li><li>Mention in the weekly email</li></ul>
  <p>Pricing is set per category. Email <a href="mailto:joey@gearedlikeamachine.com?subject=Featured%20listing">joey@gearedlikeamachine.com</a> with your company name and which category you want.</p></>); }
