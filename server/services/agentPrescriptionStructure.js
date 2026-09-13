const { callGemini } = require('./geminiClient');

/**
 * Agent 2: Prescription Structurer
 * Converts doctor's short shorthand notes and diagnosis into structured medicine items
 * and patient-friendly instructions in local language (Hindi/English).
 * Returns: { diagnosis, medicines: [...], patient_instructions_local_language }
 */
async function structurePrescription(diagnosisText, rawPrescriptionNotes, language = 'hi') {
  const cleanDiag = (diagnosisText || '').trim();
  const cleanRx = (rawPrescriptionNotes || '').trim();

  if (!cleanDiag && !cleanRx) {
    throw new Error('diagnosis or prescription notes required');
  }

  const systemInstruction = `You are a clinical pharmacotherapy AI assistant at an Indian primary health centre.
Your job is to take a doctor's hurried diagnosis and short shorthand prescription notes (e.g., 'pcm 650 tds 3d, azithro 500 od 3d, or water garare') and structure it accurately.

Return strictly valid JSON with this structure:
{
  "diagnosis": "Standardized formal diagnosis name",
  "medicines": [
    {
      "name": "Generic or Brand medicine name",
      "dosage": "Strength (e.g. '650mg')",
      "frequency": "Timing / Frequency (e.g. 'TDS - 3 times daily after food')",
      "duration": "Duration (e.g. '3 days')"
    }
  ],
  "patient_instructions_local_language": "Clear, compassionate patient instructions in the requested local language (Hindi or English), explaining how to take medicines, dietary precautions, and when to return if symptoms persist."
}
`;

  const prompt = `Doctor Diagnosis: ${cleanDiag || 'Clinical assessment'}
Doctor Prescription Shorthand: ${cleanRx}
Target Local Language for Instructions: ${language === 'hi' ? 'Hindi (Devanagari or Hinglish readable)' : 'English'}

Provide structured prescription JSON:`;

  const fallbackFn = () => {
    // Safe deterministic fallback
    const rawLines = cleanRx.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
    const medicines = rawLines.map(line => ({
      name: line.split(' ')[0] || 'Prescribed Medicine',
      dosage: 'As advised by doctor',
      frequency: line.includes('tds') ? '3 times a day' : (line.includes('bd') ? '2 times a day' : 'Once daily'),
      duration: '3 to 5 days'
    }));

    return {
      diagnosis: cleanDiag || 'Clinical Consultation',
      medicines: medicines.length > 0 ? medicines : [{ name: cleanRx, dosage: 'Standard', frequency: 'As directed', duration: '3 days' }],
      patient_instructions_local_language: language === 'hi' 
        ? 'Dawa samay par aur khana khane ke baad lein. Paani khoob piyein aur aaram karein.'
        : 'Take medicines on time after meals. Stay well hydrated and take adequate rest.',
      fallback_used: true
    };
  };

  return await callGemini(prompt, { systemInstruction, fallbackFn });
}

module.exports = { structurePrescription };
