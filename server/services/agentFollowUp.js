const { callGemini } = require('./geminiClient');

/**
 * Agent 3: Automated Follow-Up Generator
 * Creates a short, polite WhatsApp/SMS-ready follow-up reminder message for patients
 * based on their visit data, diagnosis, and prescribed medicines.
 */
async function generateFollowUpReminder(visitData = {}) {
  const {
    patient_name = 'Patient',
    diagnosis = 'General Checkup',
    medicines = [],
    clinic_name = 'Aarogya Seva Kendra',
    doctor_name = 'Dr. Rajesh Sharma',
    follow_up_days = 3,
    language = 'hi'
  } = visitData;

  const systemInstruction = `You are a medical communications assistant for rural and community health clinics in India.
Your task is to craft a short, warm, and clear WhatsApp/SMS notification message (under 160 words) to remind a patient about their health, medication adherence, and follow-up consultation date.
Include emojis where appropriate for easy readability on phones.

Return strictly valid JSON:
{
  "reminder_message": "Complete text of the WhatsApp/SMS message",
  "language": "hi or en",
  "recommended_delivery_day": "e.g., Day 3 post-visit"
}
`;

  const medicineSummary = Array.isArray(medicines) 
    ? medicines.map(m => typeof m === 'string' ? m : `${m.name || ''} (${m.dosage || ''})`).join(', ')
    : String(medicines);

  const prompt = `Patient Name: ${patient_name}
Clinic Name: ${clinic_name}
Doctor: ${doctor_name}
Diagnosis: ${diagnosis}
Medicines: ${medicineSummary || 'Prescribed medicines'}
Follow-up expected in: ${follow_up_days} days
Language: ${language === 'hi' ? 'Hindi (Simple, respectful conversational Hindi)' : 'English'}

Generate follow-up reminder JSON:`;

  const fallbackFn = () => {
    const msgHi = `Namaste ${patient_name} ji, ${clinic_name} se ${doctor_name} ki salah ke anusaar kripya apni dawa samay par lein. Agar tabiyat me aaram na ho to ${follow_up_days} din baad clinic me sampark karein. Shubhkaamnayein!`;
    const msgEn = `Hello ${patient_name}, reminder from ${clinic_name}: Please continue taking your prescribed medications on schedule. If symptoms persist after ${follow_up_days} days, visit ${doctor_name} for a follow-up. Wishing you a speedy recovery!`;

    return {
      reminder_message: language === 'hi' ? msgHi : msgEn,
      language,
      recommended_delivery_day: `Day ${follow_up_days} post-visit`,
      fallback_used: true
    };
  };

  return await callGemini(prompt, { systemInstruction, fallbackFn });
}

module.exports = { generateFollowUpReminder };
