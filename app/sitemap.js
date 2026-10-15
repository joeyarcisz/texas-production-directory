import { SITE, listings, categories } from "../lib/data";
export default function sitemap() { return ["", "/featured", "/sponsor", ...categories.map(c => `/c/${c.slug}`), ...listings.map(l => `/l/${l.slug}`)].map(p => ({ url: SITE + p })); }
