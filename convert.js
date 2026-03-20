const fs = require("fs");

const xml = fs.readFileSync("./eng-us-oeb.osis.xml", "utf8");

const verseRegex = /<verse\s+sID="([^"]+)"[^>]*\/>([\s\S]*?)<verse\s+eID="[^"]+"\s*\/>/g;

const bible = {};

function clean(text) {
  return text
    .replace(/<note[\s\S]*?<\/note>/g, " ")
    .replace(/<title[\s\S]*?<\/title>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatRef(ref) {
  const parts = ref.split(".");
  if (parts.length === 3) {
    let book = parts[0];

    if (book === "Ps") book = "Psalms";
    if (book === "Phil") book = "Philippians";
    if (book === "Matt") book = "Matthew";
    if (book === "Mark") book = "Mark";
    if (book === "Luke") book = "Luke";
    if (book === "John") book = "John";

    return `${book} ${parts[1]}:${parts[2]}`;
  }
  return ref;
}

let match;
while ((match = verseRegex.exec(xml)) !== null) {
  const ref = formatRef(match[1]);
  const text = clean(match[2]);

  if (ref && text) {
    bible[ref] = text;
  }
}

fs.writeFileSync("./bible.json", JSON.stringify(bible, null, 2), "utf8");

console.log("DONE");
console.log("Verses:", Object.keys(bible).length);
console.log("Sample Psalms 119:18 =", bible["Psalms 119:18"]);
console.log("Sample Ruth 1:1 =", bible["Ruth 1:1"]);