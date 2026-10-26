const fs = require("fs");
const path = require("path");

const KEY = /^[a-zA-Z0-9-]{8,128}$/;
const key = process.env.INDEXNOW_KEY;

if (!key) {
  console.log("IndexNow: INDEXNOW_KEY is not set; skipping key file");
  process.exit(0);
}
if (!KEY.test(key)) {
  console.warn("IndexNow: INDEXNOW_KEY must be 8-128 letters, numbers, or hyphens; skipping key file");
  process.exit(0);
}

const dir = path.join(__dirname, "..", "public");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, `${key}.txt`), key, "utf8");
console.log("IndexNow: wrote key file under public/");
