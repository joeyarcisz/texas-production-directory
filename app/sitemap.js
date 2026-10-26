import { SITE, directoryPaths } from "../lib/data";
export default function sitemap() {
  return directoryPaths().map(p => ({ url: SITE + p, changeFrequency: "weekly", priority: p === "" || p === "/featured" || p.startsWith("/c/") ? 0.8 : 0.6 }));
}
