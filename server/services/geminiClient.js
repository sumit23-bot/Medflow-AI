require('dotenv').config();

// In-Memory Response Cache to prevent burning free-tier quota (Step 42)
const responseCache = new Map();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Candidate models in priority order for quota spreading & high availability
const MODELS = [
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite'
];

/**
 * Generate structured content using Google Gemini API
 * @param {string} prompt - Prompt to send
 * @param {object} options - Options including systemInstruction, fallbackFn, timeoutMs
 */
async function callGemini(prompt, options = {}) {
  const apiKey = process.env.GEMINI_API_KEY;
  const { systemInstruction = '', fallbackFn = null, timeoutMs = 8000 } = options;

  // 1. Check in-memory cache (Step 42)
  const cacheKey = `${systemInstruction}:::${prompt.trim()}`;
  const cached = responseCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
    console.log('⚡ Returning cached Gemini response');
    return cached.data;
  }

  // 2. If API Key is missing, trigger fallback immediately
  if (!apiKey) {
    console.warn('⚠️ GEMINI_API_KEY missing. Using fallback response.');
    if (fallbackFn) return fallbackFn();
    throw new Error('GEMINI_API_KEY is not configured');
  }

  // 3. Try models in order with timeout
  for (const model of MODELS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      };

      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: systemInstruction }]
        };
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const result = await response.json();
        const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          try {
            const parsed = JSON.parse(rawText);
            // Cache successful result
            responseCache.set(cacheKey, { data: parsed, timestamp: Date.now() });
            return parsed;
          } catch (parseErr) {
            console.warn(`JSON parsing failed for ${model}:`, parseErr.message);
          }
        }
      } else {
        const errJson = await response.json().catch(() => ({}));
        console.warn(`Gemini API error with ${model} (${response.status}):`, errJson.error?.message || response.statusText);
      }
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      console.warn(`Attempt with ${model} failed:`, fetchErr.message);
    }
  }

  // 4. Safe fallback if all models fail or time out (Step 43)
  console.warn('⚠️ All Gemini calls failed or timed out. Triggering safe fallback.');
  if (fallbackFn) {
    return fallbackFn();
  }

  throw new Error('Gemini API call failed across all candidate models');
}

module.exports = {
  callGemini,
  responseCache
};
