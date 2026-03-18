export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"not allowed"});
  const { entry } = req.body;
  if (!entry) return res.status(400).json({error:"no entry"});
  const IDS = "all_or_nothing,overgeneralization,mental_filter,disqualifying_positive,mind_reading,fortune_telling,catastrophizing,minimization,emotional_reasoning,should_statements,labeling,personalization,unfair_comparison,magnification,excessive_guilt,learned_helplessness,fallacy_control,fallacy_fairness,fallacy_change,negative_globalization,negative_confirmation_bias,moral_generalization,intolerance_uncertainty";
  const prompt = "Analyze this journal entry using Beck Cognitive Therapy. Pick ONE distortion ID from: "+IDS+". Return ONLY a JSON object, no markdown, no backticks: {acknowledgment_en,acknowledgment_es,distortion_id,distortion_en,distortion_es,why_en,why_es,reframe_en,reframe_es,reflection_en,reflection_es,verse_distortion_ref,verse_situation_ref}. Keep each field under 100 words. Entry: "+entry.substring(0,500);
  try {
    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+process.env.GEMINI_API_KEY,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.4,maxOutputTokens:600}})});
    const d = await r.json();
    const t = (d.candidates?.[0]?.content?.parts?.[0]?.text||"" ).trim();
    const start = t.indexOf("{");
    const end = t.lastIndexOf("}");
    if(start===-1||end===-1) throw new Error("No JSON found: "+t.substring(0,100));
    const parsed = JSON.parse(t.substring(start,end+1));
    res.status(200).json(parsed);
  } catch(e) {
    console.error("Error:",e.message);
    res.status(500).json({error:e.message});
  }
}
