const { callGemini } = require('./geminiClient');

/**
 * Agent 1: Clinical Symptom Structurer (Triage Agent)
 * Converts patient raw voice/text symptoms (Hindi/English/Hinglish) into structured clinical data
 * Returns: { chief_complaint, duration, severity_keywords }
 */
async function summarizeSymptoms(rawSymptomText, language = 'hi') {
  if (!rawSymptomText || !rawSymptomText.trim()) {
    throw new Error('rawSymptomText is required');
  }

  const systemInstruction = `You are an expert AI clinical triage assistant at an Indian primary healthcare clinic.
Your task is to analyze patients' free-form, casual symptom statements (which may be in Hindi, English, Hinglish, or regional dialect) and convert them into a structured medical triage JSON object.

Output MUST be strictly valid JSON conforming to this schema:
{
  "chief_complaint": "Clear concise summary of main medical issues (e.g., 'Acute high-grade fever with sore throat')",
  "duration": "Reported duration (e.g., '3 days', 'since last night', 'unspecified')",
  "severity_keywords": ["list", "of", "high-severity", "or", "urgent", "keywords", "present", "in", "the", "symptom", "description"]
}
`;

  const prompt = `Patient symptom statement: "${rawSymptomText.trim()}"
Language code: ${language}
Extract the chief complaint, duration, and severity keywords now as JSON:`;

  // Safe Fallback function if API is unavailable or rate-limited (Step 43)
  const fallbackFn = () => {
    // Deterministic rule-based extraction as safe fallback
    const lower = rawSymptomText.toLowerCase();
    let duration = 'Unspecified';
    if (lower.includes('din') || lower.includes('day')) {
      const match = lower.match(/(\d+|ek|do|teen|chaar|paanch|one|two|three)\s*(din|days?)/);
      duration = match ? match[0] : 'Few days';
    } else if (lower.includes('raat') || lower.includes('night')) {
      duration = 'Since last night';
    } else if (lower.includes('subah') || lower.includes('morning')) {
      duration = 'Since morning';
    }

    const severityWords = [];
    ['tez', 'severe', 'bahut', 'bohot', 'dard', 'khoon', 'blood', 'vomit', 'ulti', 'chakkaron'].forEach(word => {
      if (lower.includes(word)) severityWords.push(word);
    });

    return {
      chief_complaint: rawSymptomText.slice(0, 80),
      duration,
      severity_keywords: severityWords.length > 0 ? severityWords : ['mild/moderate reported'],
      fallback_used: true
    };
  };

  return await callGemini(prompt, { systemInstruction, fallbackFn });
}

module.exports = { summarizeSymptoms };
