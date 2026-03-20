console.log("SCRIPT STARTED");

const fs = require("fs");

const BOOK_MAP = {
  GEN: "Genesis",
  EXO: "Exodus",
  LEV: "Leviticus",
  NUM: "Numbers",
  DEU: "Deuteronomy",
  JOS: "Joshua",
  JDG: "Judges",
  RUT: "Ruth",
  "1SA": "1 Samuel",
  "2SA": "2 Samuel",
  "1KI": "1 Kings",
  "2KI": "2 Kings",
  "1CH": "1 Chronicles",
  "2CH": "2 Chronicles",
  EZR: "Ezra",
  NEH: "Nehemiah",
  EST: "Esther",
  JOB: "Job",
  PSA: "Psalms",
  PRO: "Proverbs",
  ECC: "Ecclesiastes",
  SNG: "Song of Solomon",
  ISA: "Isaiah",
  JER: "Jeremiah",
  LAM: "Lamentations",
  EZK: "Ezekiel",
  DAN: "Daniel",
  HOS: "Hosea",
  JOL: "Joel",
  AMO: "Amos",
  OBA: "Obadiah",
  JON: "Jonah",
  MIC: "Micah",
  NAM: "Nahum",
  HAB: "Habakkuk",
  ZEP: "Zephaniah",
  HAG: "Haggai",
  ZEC: "Zechariah",
  MAL: "Malachi",
  MAT: "Matthew",
  MRK: "Mark",
  LUK: "Luke",
  JHN: "John",
  ACT: "Acts",
  ROM: "Romans",
  "1CO": "1 Corinthians",
  "2CO": "2 Corinthians",
  GAL: "Galatians",
  EPH: "Ephesians",
  PHP: "Philippians",
  COL: "Colossians",
  "1TH": "1 Thessalonians",
  "2TH": "2 Thessalonians",
  "1TI": "1 Timothy",
  "2TI": "2 Timothy",
  TIT: "Titus",
  PHM: "Philemon",
  HEB: "Hebrews",
  JAS: "James",
  "1PE": "1 Peter",
  "2PE": "2 Peter",
  "1JN": "1 John",
  "2JN": "2 John",
  "3JN": "3 John",
  JUD: "Jude",
  REV: "Revelation"
};

function cleanText(str) {
  return str.replace(/\s+/g, " ").trim();
}

const xml = fs.readFileSync("web.xml", "utf8");

const bookMatches = xml.matchAll(/<book[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/book>/g);

const bible = {};

for (const bookMatch of bookMatches) {
  const bookCode = bookMatch[1];
  const bookName = BOOK_MAP[bookCode] || bookCode;
  const bookContent = bookMatch[2];

  const chapterMatches = bookContent.matchAll(/<c[^>]*id="([^"]+)"[^>]*>/g);

  let chapterPositions = [];
  for (const m of chapterMatches) {
    chapterPositions.push({ id: m[1], index: m.index });
  }

  for (let i = 0; i < chapterPositions.length; i++) {
    const chapterId = chapterPositions[i].id;
    const start = chapterPositions[i].index;
    const end = chapterPositions[i + 1]?.index || bookContent.length;

    const chapterText = bookContent.slice(start, end);

    const verseMatches = chapterText.matchAll(/<v[^>]*id="([^"]+)"[^>]*\/>([^<]+)/g);

    for (const v of verseMatches) {
      const verseId = v[1];
      const text = cleanText(v[2]);

      if (!text) continue;

      const ref = `${bookName} ${chapterId}:${verseId}`;
      bible[ref] = text;
    }
  }
}

fs.writeFileSync("bible-web.json", JSON.stringify(bible, null, 2));

console.log(`DONE: created bible-web.json with ${Object.keys(bible).length} verses`);