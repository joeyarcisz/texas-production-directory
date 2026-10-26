const fs = require("fs");
const path = require("path");

const KEY = /^[a-zA-Z0-9-]{8,128}$/;

function loadUrls() {
  const src = fs.readFileSync(path.join(__dirname, "..", "lib", "data.js"), "utf8");
  const site = /export const SITE = "([^"]+)"/.exec(src);
  if (!site) throw new Error("SITE is missing from lib/data.js");
  const catsBlock = src.split("export const categories")[1];
  const listBlock = src.split("export const listings")[1];
  if (!catsBlock || !listBlock) throw new Error("categories or listings missing from lib/data.js");
  const cats = [...catsBlock.split("export const listings")[0].matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
  const listings = [...listBlock.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
  return {
    site: site[1],
    urls: [site[1], `${site[1]}/featured`, `${site[1]}/sponsor`, ...cats.map(s => `${site[1]}/c/${s}`), ...listings.map(s => `${site[1]}/l/${s}`)],
  };
}

async function ping() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.log("IndexNow: INDEXNOW_KEY is not set; skipping ping");
    return;
  }
  if (!KEY.test(key)) {
    console.warn("IndexNow: INDEXNOW_KEY format is invalid; skipping ping");
    return;
  }
  const { site, urls } = loadUrls();
  const host = new URL(site).host;
  const body = { host, key, keyLocation: `${site}/${key}.txt`, urlList: urls };
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (res.ok || res.status === 202) {
      console.log(`IndexNow: submitted ${urls.length} URLs (${res.status})`);
    } else {
      console.warn(`IndexNow: ping returned ${res.status}`);
      if (text) console.warn(text.slice(0, 200));
    }
  } catch (err) {
    console.warn(`IndexNow: ping failed (${err.message})`);
  }
}

ping();
