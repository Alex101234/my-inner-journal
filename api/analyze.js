export default async function handler(req, res) {
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
        return res.status(500).json({ error: "no key" });
      }
  
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
  verse_distortion_ref
  verse_situation_ref
  
  Rules:
  - distortion_id must be exactly one of: ${IDS.join(", ")}
  - keep each field concise
  - fill every field
  - bilingual English and Spanish
  - do not include any text outside the JSON object
  
  Journal entry:
  ${entry.slice(0, 500)}
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
              maxOutputTokens: 700,
              responseMimeType: "application/json"
            }
          })
        }
      );
  
      const rawHttpText = await geminiRes.text();
  
      if (!geminiRes.ok) {
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
          verse_distortion_ref: "",
          verse_situation_ref: ""
        });
      }
  
      let geminiData;
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
  
      let parsed = null;
  
      if (candidateText) {
        try {
          parsed = JSON.parse(candidateText);
        } catch (e) {
          const match = candidateText.match(/\{[\s\S]*\}/);
          if (match) {
            try {
              parsed = JSON.parse(match[0]);
            } catch (err) {
              parsed = null;
            }
          }
        }
      }
  
      const safe = {
        acknowledgment_en:
          String(parsed?.acknowledgment_en || "").trim() ||
          "Your entry reflects a stressful situation.",
        acknowledgment_es:
          String(parsed?.acknowledgment_es || "").trim() ||
          "Tu entrada refleja una situación estresante.",
        distortion_id: IDS.includes(parsed?.distortion_id)
          ? parsed.distortion_id
          : "mental_filter",
        distortion_en:
          String(parsed?.distortion_en || "").trim() || "Mental Filter",
        distortion_es:
          String(parsed?.distortion_es || "").trim() || "Filtro Mental",
        why_en:
          String(parsed?.why_en || "").trim() ||
          "You may be focusing on feared outcomes more than the full picture.",
        why_es:
          String(parsed?.why_es || "").trim() ||
          "Puede que estés enfocándote más en los resultados temidos que en el panorama completo.",
        reframe_en:
          String(parsed?.reframe_en || "").trim() ||
          "Pause and separate facts from fears before assuming the worst.",
        reframe_es:
          String(parsed?.reframe_es || "").trim() ||
          "Haz una pausa y separa los hechos de los temores antes de asumir lo peor.",
        reflection_en:
          String(parsed?.reflection_en || "").trim() ||
          "What facts do I know for sure, and what am I predicting?",
        reflection_es:
          String(parsed?.reflection_es || "").trim() ||
          "¿Qué hechos sé con certeza y qué estoy anticipando?",
        verse_distortion_ref:
          String(parsed?.verse_distortion_ref || "").trim(),
        verse_situation_ref:
          String(parsed?.verse_situation_ref || "").trim()
      };
  
      return res.status(200).json(safe);
    } catch (e) {
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
        verse_distortion_ref: "",
        verse_situation_ref: ""
      });
    }
  }