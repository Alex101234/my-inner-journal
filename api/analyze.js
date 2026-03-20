export default async function handler(req, res) {
  const IDS = [
    "all_or_nothing",
    "overgeneralization",
    "mental_filter",
    "disqualifying_positive",
    "mind_reading",
    "fortune_telling",
    "catastrophizing",
    "minimization",
    "emotional_reasoning",
    "should_statements",
    "labeling",
    "personalization",
    "unfair_comparison",
    "magnification",
    "excessive_guilt",
    "learned_helplessness",
    "fallacy_control",
    "fallacy_fairness",
    "fallacy_change",
    "negative_globalization",
    "negative_confirmation_bias",
    "moral_generalization",
    "intolerance_uncertainty"
  ];

  const DISTORTION_VERSES = {
    all_or_nothing: [
      "Ecclesiastes 7:20","Zechariah 4:10","Proverbs 24:16","James 3:2","Philippians 1:6",
      "Romans 3:23","Psalm 37:23","Micah 7:8","2 Corinthians 12:9","Lamentations 3:22"
    ],
    overgeneralization: [
      "Lamentations 3:21","Ecclesiastes 3:1","Psalm 30:5","Isaiah 43:18","Job 8:7",
      "Romans 8:28","2 Corinthians 4:17","Hebrews 10:35","Psalm 126:5","Jeremiah 29:11"
    ],
    mental_filter: [
      "Philippians 4:8","Psalm 27:13","Psalm 103:2","Colossians 3:2","Isaiah 26:3",
      "2 Corinthians 10:5","Romans 12:2","Psalm 119:18","Proverbs 4:25","Lamentations 3:22"
    ],
    disqualifying_positive: [
      "James 1:17","Psalm 103:2","1 Thessalonians 5:18","Ecclesiastes 3:13","Romans 8:32",
      "Psalm 68:19","Deuteronomy 8:18","Psalm 84:11","Philippians 1:6","Ephesians 2:10"
    ],
    mind_reading: [
      "John 7:24","1 Samuel 16:7","Proverbs 3:5","Romans 14:4","James 4:12",
      "Matthew 7:1","Proverbs 18:13","Jeremiah 17:10","Psalm 139:1","Luke 6:37"
    ],
    fortune_telling: [
      "Matthew 6:34","James 4:13","Proverbs 27:1","Jeremiah 29:11","Isaiah 41:10",
      "Psalm 112:7","Romans 8:28","Psalm 37:5","Proverbs 16:9","Deuteronomy 31:8"
    ],
    catastrophizing: [
      "Matthew 6:34","Isaiah 41:10","Psalm 56:3","2 Timothy 1:7","Philippians 4:6",
      "Psalm 46:1","Nahum 1:7","John 14:27","1 Peter 5:7","Romans 8:31"
    ],
    minimization: [
      "Psalm 139:14","Ephesians 2:10","Matthew 5:14","1 Corinthians 15:58","Galatians 6:9",
      "Proverbs 31:25","Romans 12:6","1 Peter 4:10","Philippians 4:13","2 Timothy 1:6"
    ],
    emotional_reasoning: [
      "Jeremiah 17:9","John 17:17","Psalm 119:160","Proverbs 3:5","2 Corinthians 5:7",
      "Isaiah 55:8","Romans 8:6","Psalm 119:105","Hebrews 11:1","John 8:32"
    ],
    should_statements: [
      "Matthew 11:28","Romans 8:1","Galatians 5:1","2 Corinthians 3:17","James 3:17",
      "Micah 6:8","Colossians 3:15","Psalm 32:8","Proverbs 16:3","Philippians 2:13"
    ],
    labeling: [
      "Psalm 139:14","2 Corinthians 5:17","Romans 8:1","1 Peter 2:9","Isaiah 43:1",
      "Ephesians 2:10","John 1:12","Galatians 2:20","Zephaniah 3:17","1 John 3:1"
    ],
    personalization: [
      "Ezekiel 18:20","Galatians 6:5","Romans 14:12","Psalm 46:10","John 9:3",
      "James 1:13","Ecclesiastes 3:1","Proverbs 19:21","Isaiah 55:8","Deuteronomy 29:29"
    ],
    unfair_comparison: [
      "Galatians 6:4","2 Corinthians 10:12","John 21:22","Psalm 139:14","Romans 12:6",
      "1 Corinthians 12:18","Matthew 25:15","Ephesians 2:10","Hebrews 12:1","Philippians 3:13"
    ],
    magnification: [
      "Psalm 131:1","1 Peter 5:7","Philippians 4:6","Isaiah 41:10","Romans 8:18",
      "2 Corinthians 4:17","Psalm 46:1","Matthew 11:28","John 14:27","Proverbs 3:5"
    ],
    excessive_guilt: [
      "1 John 1:9","Romans 8:1","Psalm 103:12","Isaiah 1:18","Micah 7:18",
      "Hebrews 8:12","Colossians 2:13","Ephesians 1:7","Psalm 32:5","2 Corinthians 5:17"
    ],
    learned_helplessness: [
      "Philippians 4:13","Luke 1:37","Isaiah 40:31","2 Corinthians 12:9","Psalm 121:1",
      "Romans 8:37","Joshua 1:9","Zechariah 4:6","John 15:5","Psalm 18:29"
    ],
    fallacy_control: [
      "Proverbs 19:21","Psalm 46:10","Matthew 6:27","James 4:15","Proverbs 3:5",
      "Isaiah 26:3","Philippians 4:6","Romans 12:18","Ecclesiastes 3:1","Deuteronomy 29:29"
    ],
    fallacy_fairness: [
      "Matthew 5:45","Ecclesiastes 8:14","Romans 12:19","Micah 6:8","1 Peter 2:23",
      "Psalm 37:7","James 1:2","Habakkuk 2:3","Romans 8:28","Genesis 50:20"
    ],
    fallacy_change: [
      "Ezekiel 36:26","Proverbs 21:1","2 Timothy 2:25","Galatians 6:5","Romans 12:18",
      "James 1:5","Philippians 2:13","Psalm 51:10","Matthew 7:3","1 Peter 5:7"
    ],
    negative_globalization: [
      "Micah 7:8","Proverbs 24:16","Isaiah 43:18","Philippians 3:13","Lamentations 3:23",
      "2 Corinthians 5:17","Romans 8:1","Psalm 37:24","Job 17:9","Zechariah 4:10"
    ],
    negative_confirmation_bias: [
      "Philippians 4:8","Proverbs 18:17","John 8:32","Psalm 19:14","Isaiah 26:3",
      "Romans 12:2","2 Corinthians 10:5","Psalm 119:66","James 1:5","Proverbs 4:23"
    ],
    moral_generalization: [
      "Romans 14:5","Colossians 2:16","James 3:17","Micah 6:8","Matthew 23:23",
      "Romans 13:10","Galatians 5:22","Proverbs 15:1","Philippians 2:3","1 Corinthians 8:9"
    ],
    intolerance_uncertainty: [
      "Proverbs 3:5","Isaiah 26:3","Psalm 37:5","Matthew 6:34","James 1:5",
      "Hebrews 11:1","Psalm 46:10","Romans 8:28","Jeremiah 17:7","Deuteronomy 31:8"
    ]
  };

  const SITUATION_THEMES = [
    {
      id: "fear_anxiety",
      keywords: ["fear","afraid","scared","worried","worry","anxious","anxiety","panic","nervous","stress","stressed","terrified","overthinking","uneasy"],
      verses: ["Isaiah 41:10","2 Timothy 1:7","Psalm 56:3","Philippians 4:6","John 14:27","1 Peter 5:7","Psalm 46:1","Nahum 1:7","Joshua 1:9","Psalm 34:4","Psalm 94:19","Matthew 11:28","Isaiah 26:3","Deuteronomy 31:8","Romans 8:15","Psalm 23:4","Psalm 27:1","Mark 5:36","John 16:33","Psalm 121:1"]
    },
    {
      id: "work_pressure",
      keywords: ["work","job","boss","manager","coworker","career","office","transfer","write up","reprimand","schedule","money","pay","parking","tolls","employment"],
      verses: ["Colossians 3:23","Proverbs 16:3","James 1:5","Psalm 37:5","Ecclesiastes 3:13","Matthew 6:31","Philippians 4:19","Proverbs 3:6","Psalm 90:17","Deuteronomy 8:18","Proverbs 22:29","1 Corinthians 10:31","Psalm 128:2","Galatians 6:9","2 Thessalonians 3:10","Ephesians 6:7","Psalm 75:6","Proverbs 14:23","Isaiah 48:17","Psalm 121:2"]
    },
    {
      id: "people_opinion",
      keywords: ["respect","approval","rumors","what people think","judged","embarrassed","ashamed","rejected","accepted","opinion","criticism","gossip","reputation"],
      verses: ["Proverbs 29:25","Galatians 1:10","John 12:43","Isaiah 51:7","Psalm 118:6","Romans 8:31","1 Samuel 16:7","Luke 12:4","Psalm 27:1","John 7:24","Matthew 10:28","Hebrews 13:6","Isaiah 41:13","Psalm 56:11","1 Peter 3:14","Proverbs 3:26","Jeremiah 17:5","Psalm 146:3","John 5:44","2 Corinthians 10:18"]
    },
    {
      id: "family_relationship",
      keywords: ["wife","husband","marriage","family","kids","children","mother","father","relationship","partner","home","letting down","disappointing"],
      verses: ["1 Corinthians 13:4","Ecclesiastes 4:9","Colossians 3:13","Ephesians 4:2","Romans 12:10","Psalm 127:1","Joshua 24:15","Proverbs 24:3","1 Peter 4:8","Ephesians 5:2","Galatians 6:2","Colossians 3:14","Romans 15:5","Philippians 2:4","Psalm 133:1","Proverbs 17:17","Ephesians 4:32","1 Thessalonians 5:11","Hebrews 10:24","Psalm 128:1"]
    },
    {
      id: "guilt_shame",
      keywords: ["guilt","guilty","shame","ashamed","failure","failed","sin","dirty","condemned","regret","regrets","embarrassed"],
      verses: ["Romans 8:1","1 John 1:9","Psalm 103:12","Isaiah 1:18","Hebrews 8:12","Micah 7:18","Psalm 32:5","2 Corinthians 5:17","Ephesians 1:7","Colossians 2:13","Psalm 34:5","Joel 2:25","John 8:11","Lamentations 3:22","Titus 3:5","Isaiah 43:25","Romans 5:1","Psalm 51:10","1 Peter 2:24","John 3:17"]
    },
    {
      id: "guidance_decision",
      keywords: ["decision","choice","confused","direction","guidance","wisdom","what should i do","next step","path","discern","uncertain","uncertainty"],
      verses: ["James 1:5","Proverbs 3:5","Psalm 32:8","Isaiah 30:21","Psalm 119:105","Proverbs 16:9","Jeremiah 29:11","Psalm 25:4","John 16:13","Isaiah 48:17","Proverbs 11:14","Colossians 3:15","Psalm 37:23","Exodus 33:14","1 Kings 3:9","Proverbs 2:6","Romans 12:2","Psalm 143:10","Deuteronomy 31:8","Proverbs 4:26"]
    },
    {
      id: "identity_worth",
      keywords: ["worth","worthy","identity","respect for me","not enough","useless","loser","failure","value","self worth","rejected","unloved"],
      verses: ["Psalm 139:14","1 Peter 2:9","Isaiah 43:1","John 1:12","Ephesians 2:10","Zephaniah 3:17","Romans 8:15","1 John 3:1","2 Corinthians 5:17","Galatians 2:20","Jeremiah 31:3","Deuteronomy 7:6","Psalm 17:8","Matthew 10:31","Isaiah 49:16","Romans 8:38","Ephesians 1:4","Colossians 3:12","Titus 3:4","Psalm 100:3"]
    },
    {
      id: "future_uncertainty",
      keywords: ["future","what if","stuck","months","later","tomorrow","next","uncertain","uncertainty","unknown","going to happen","predicting"],
      verses: ["Matthew 6:34","Jeremiah 29:11","Proverbs 27:1","James 4:13","Romans 8:28","Psalm 37:5","Isaiah 41:10","Deuteronomy 31:8","Psalm 112:7","Lamentations 3:26","Hebrews 11:1","Ecclesiastes 3:11","Isaiah 43:19","Romans 15:13","Proverbs 16:9","Psalm 46:10","John 14:1","2 Corinthians 4:18","Psalm 31:15","Isaiah 26:4"]
    },
    {
      id: "conflict_tension",
      keywords: ["conflict","argument","fight","tension","boss","manager","coworker","angry","upset","frustrated","hurt","offended","harsh"],
      verses: ["Proverbs 15:1","Romans 12:18","James 1:19","Ephesians 4:29","Colossians 3:13","Matthew 5:9","Proverbs 16:32","Ecclesiastes 7:9","Philippians 2:3","1 Peter 3:9","Luke 6:31","Ephesians 4:2","Proverbs 17:27","James 3:17","Psalm 34:14","Romans 14:19","Colossians 4:6","Proverbs 12:18","Matthew 7:12","Galatians 5:22"]
    },
    {
      id: "provision_money",
      keywords: ["money","bills","rent","debt","gas","parking","tolls","income","afford","financial","paycheck","provision","broke"],
      verses: ["Philippians 4:19","Matthew 6:31","Psalm 37:25","2 Corinthians 9:8","Malachi 3:10","Psalm 23:1","Matthew 6:26","Luke 12:24","Deuteronomy 8:18","Proverbs 10:22","Hebrews 13:5","Psalm 34:10","1 Kings 17:14","Matthew 7:11","Psalm 84:11","Romans 8:32","Psalm 145:16","Proverbs 3:9","Ecclesiastes 5:19","Genesis 22:14"]
    },
    {
      id: "strength_endurance",
      keywords: ["tired","exhausted","burned out","burnout","weak","can't do this","overwhelmed","drained","heavy","burden","pressure"],
      verses: ["Isaiah 40:31","Matthew 11:28","2 Corinthians 12:9","Philippians 4:13","Psalm 46:1","Galatians 6:9","Hebrews 12:1","Nehemiah 8:10","Psalm 18:32","Joshua 1:9","John 16:33","Romans 8:37","Psalm 73:26","Habakkuk 3:19","Exodus 15:2","Psalm 28:7","Isaiah 41:10","Deuteronomy 33:25","1 Corinthians 15:58","Psalm 29:11"]
    },
    {
      id: "trust_surrender",
      keywords: ["control","surrender","trust","let go","release","can't control","helpless","need god","depending","wait on god"],
      verses: ["Proverbs 3:5","Psalm 46:10","Isaiah 26:3","Psalm 37:5","1 Peter 5:7","Matthew 6:27","Romans 8:28","Jeremiah 17:7","Psalm 62:8","Exodus 14:14","Isaiah 30:15","Nahum 1:7","Hebrews 13:5","John 14:1","Psalm 55:22","Philippians 4:6","Deuteronomy 31:8","Proverbs 16:3","Psalm 125:1","Isaiah 12:2"]
    }
  ];

  const FALLBACK_SITUATION_VERSES = [
    "Psalm 34:8",
    "Psalm 46:1",
    "Proverbs 3:5",
    "Isaiah 41:10",
    "Matthew 11:28",
    "John 14:27",
    "Romans 8:28",
    "Philippians 4:6",
    "Psalm 37:5",
    "1 Peter 5:7"
  ];

  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    return hash;
  }

  function unique(arr) {
    return [...new Set(arr)];
  }

  function pickFromPool(pool, seedStr) {
    if (!pool || pool.length === 0) return "";
    const idx = hashString(seedStr) % pool.length;
    return pool[idx];
  }

  function detectThemes(entry) {
    const text = entry.toLowerCase();
    const scored = [];

    for (const theme of SITUATION_THEMES) {
      let score = 0;
      for (const keyword of theme.keywords) {
        if (text.includes(keyword)) score += 1;
      }
      if (score > 0) scored.push({ id: theme.id, score, verses: theme.verses });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored;
  }

  function chooseDistortionVerse(distortionId, entry) {
    const pool = DISTORTION_VERSES[distortionId] || DISTORTION_VERSES.mental_filter;
    return pickFromPool(pool, `distortion|${distortionId}|${entry}`);
  }

  function chooseSituationVerse(entry, distortionVerse) {
    const matches = detectThemes(entry);
    let pool = [];

    for (const match of matches.slice(0, 3)) {
      pool.push(...match.verses);
    }

    if (pool.length === 0) {
      pool = [...FALLBACK_SITUATION_VERSES];
    }

    pool = unique(pool).filter((ref) => ref !== distortionVerse);

    if (pool.length === 0) {
      pool = unique(FALLBACK_SITUATION_VERSES);
    }

    return pickFromPool(pool, `situation|${entry}`);
  }

  function safeText(value, fallback = "") {
    return String(value || "").trim() || fallback;
  }

  function extractJson(text) {
    if (!text) return null;

    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch {}

    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const possible = cleaned.slice(firstBrace, lastBrace + 1);
      try {
        return JSON.parse(possible);
      } catch {}
    }

    return null;
  }

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "not allowed" });
    }

    const { entry } = req.body || {};
    if (!entry || typeof entry !== "string" || !entry.trim()) {
      return res.status(400).json({ error: "no entry" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "missing GEMINI_API_KEY" });
    }

    const prompt = `
Return ONLY one valid JSON object.
No markdown.
No backticks.
No explanation text.

Required fields:
acknowledgment_en
acknowledgment_es
distortion_id
distortion_en
distortion_es
why_en
why_es
reframe_en
reframe_es
reflection_en
reflection_es

Rules:
- distortion_id must be exactly one of: ${IDS.join(", ")}
- keep each field concise
- fill every field
- bilingual English and Spanish
- do not include any text outside the JSON object

Journal entry:
${entry.slice(0, 700)}
`.trim();

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 700
          }
        })
      }
    );

    const rawHttpText = await geminiRes.text();
    console.log("GEMINI RAW:", rawHttpText);

    let geminiData = null;
    try {
      geminiData = JSON.parse(rawHttpText);
    } catch (e) {
      geminiData = null;
    }

    const candidateText =
      geminiData?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || "")
        .join("")
        .trim() || "";

    let parsed = extractJson(candidateText);

    if (!parsed) {
      parsed = extractJson(rawHttpText);
    }

    const distortionId = IDS.includes(parsed?.distortion_id)
      ? parsed.distortion_id
      : "mental_filter";

    const verse_distortion_ref = chooseDistortionVerse(distortionId, entry);
    const verse_situation_ref = chooseSituationVerse(entry, verse_distortion_ref);

    const safe = {
      acknowledgment_en: safeText(
        parsed?.acknowledgment_en,
        "Your entry reflects a stressful situation."
      ),
      acknowledgment_es: safeText(
        parsed?.acknowledgment_es,
        "Tu entrada refleja una situación estresante."
      ),
      distortion_id: distortionId,
      distortion_en: safeText(parsed?.distortion_en, "Mental Filter"),
      distortion_es: safeText(parsed?.distortion_es, "Filtro Mental"),
      why_en: safeText(
        parsed?.why_en,
        "You may be focusing on feared outcomes more than the full picture."
      ),
      why_es: safeText(
        parsed?.why_es,
        "Puede que estés enfocándote más en los resultados temidos que en el panorama completo."
      ),
      reframe_en: safeText(
        parsed?.reframe_en,
        "Pause and separate facts from fears before assuming the worst."
      ),
      reframe_es: safeText(
        parsed?.reframe_es,
        "Haz una pausa y separa los hechos de los temores antes de asumir lo peor."
      ),
      reflection_en: safeText(
        parsed?.reflection_en,
        "What facts do I know for sure, and what am I predicting?"
      ),
      reflection_es: safeText(
        parsed?.reflection_es,
        "¿Qué hechos sé con certeza y qué estoy anticipando?"
      ),
      verse_distortion_ref,
      verse_situation_ref
    };

    return res.status(200).json(safe);
  } catch (e) {
    console.error("API ERROR:", e);
    return res.status(200).json({
      acknowledgment_en: "Your entry reflects a stressful situation.",
      acknowledgment_es: "Tu entrada refleja una situación estresante.",
      distortion_id: "mental_filter",
      distortion_en: "Mental Filter",
      distortion_es: "Filtro Mental",
      why_en: "You may be focusing on feared outcomes more than the full picture.",
      why_es: "Puede que estés enfocándote más en los resultados temidos que en el panorama completo.",
      reframe_en: "Pause and separate facts from fears before assuming the worst.",
      reframe_es: "Haz una pausa y separa los hechos de los temores antes de asumir lo peor.",
      reflection_en: "What facts do I know for sure, and what am I predicting?",
      reflection_es: "¿Qué hechos sé con certeza y qué estoy anticipando?",
      verse_distortion_ref: "Philippians 4:8",
      verse_situation_ref: "Isaiah 41:10"
    });
  }
}  