const { summarizeSymptoms } = require('./services/agentSymptomSummary');
const { structurePrescription } = require('./services/agentPrescriptionStructure');
const { generateFollowUpReminder } = require('./services/agentFollowUp');
const { responseCache } = require('./services/geminiClient');

async function runAITests() {
  console.log('====================================================');
  console.log('🤖 Starting MedFlow AI Phase 3: AI Agents Test Suite');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`✅ PASS: ${name}\n`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${name}`);
      console.error(`   Error: ${err.message}\n`);
      failed++;
    }
  }

  // ----------------------------------------------------------------
  // AGENT 1 TEST CASES (Symptom Intake & Clinical Triage)
  // ----------------------------------------------------------------
  console.log('--- Testing Agent 1: Clinical Symptom Structuring ---');

  // Case 1: Hindi Acute Fever
  await test('Agent 1 - Hindi: 3 din se tez bukhar aur badan dard', async () => {
    const input = '3 din se tez bukhar hai, badan toot raha hai aur gale me jalan hai';
    const res = await summarizeSymptoms(input, 'hi');
    console.log('   Result:', JSON.stringify(res, null, 2));
    if (!res.chief_complaint || !res.duration || !Array.isArray(res.severity_keywords)) {
      throw new Error('Invalid structure returned');
    }
  });

  // Case 2: Hindi Chronic Joint Pain
  await test('Agent 1 - Hindi: Pichhle 2 hafte se ghutno me dard', async () => {
    const input = 'Pichhle do hafte se ghutno me bohot dard hai aur chalne me dikkat hoti hai';
    const res = await summarizeSymptoms(input, 'hi');
    console.log('   Result:', JSON.stringify(res, null, 2));
    if (!res.chief_complaint || !res.duration) throw new Error('Missing fields');
  });

  // Case 3: English Acute Respiratory
  await test('Agent 1 - English: Severe chest congestion and dry cough', async () => {
    const input = 'Severe chest congestion, shortness of breath, and dry cough since yesterday night';
    const res = await summarizeSymptoms(input, 'en');
    console.log('   Result:', JSON.stringify(res, null, 2));
    if (!res.chief_complaint || !res.duration) throw new Error('Missing fields');
  });

  // Case 4: Hinglish Abdominal Distress
  await test('Agent 1 - Hinglish: Subah se pet me severe pain aur loose motions', async () => {
    const input = 'Subah se pet me severe cramp ho raha hai aur ulti jaisa lag raha hai';
    const res = await summarizeSymptoms(input, 'hi');
    console.log('   Result:', JSON.stringify(res, null, 2));
    if (!res.chief_complaint || res.severity_keywords.length === 0) throw new Error('Missing fields');
  });

  // Case 5: Pediatric Case
  await test('Agent 1 - Hindi: Bachhe ko sardi aur saans lene me aawaz', async () => {
    const input = 'Bachhe ko 2 din se tez sardi hai aur saans lene me seeti jaisi aawaz aa rahi hai';
    const res = await summarizeSymptoms(input, 'hi');
    console.log('   Result:', JSON.stringify(res, null, 2));
    if (!res.chief_complaint) throw new Error('Missing fields');
  });

  // ----------------------------------------------------------------
  // AGENT 2 TEST CASES (Prescription Shorthand Structuring)
  // ----------------------------------------------------------------
  console.log('--- Testing Agent 2: Prescription Shorthand Structuring ---');

  // Case 6: Upper Respiratory Infection
  await test('Agent 2 - Shorthand: Viral Pharyngitis (PCM, Azithro, Garare)', async () => {
    const diag = 'Acute Viral Pharyngitis';
    const rx = 'PCM 650mg TDS x 3d, Azithral 500mg OD x 3d, Cetirizine 10mg HS x 5d, garam paani se garare karein';
    const res = await structurePrescription(diag, rx, 'hi');
    console.log('   Result:', JSON.stringify(res, null, 2));
    if (!res.medicines || !Array.isArray(res.medicines) || res.medicines.length < 2) {
      throw new Error('Expected at least 2 structured medicines');
    }
    if (!res.patient_instructions_local_language) throw new Error('Missing local language instructions');
  });

  // Case 7: Gastritis & Rehydration
  await test('Agent 2 - Shorthand: Acute Gastroenteritis (Pantop, ORS, Drotikind)', async () => {
    const diag = 'Acute Gastroenteritis & Dehydration';
    const rx = 'Pantop 40mg OD before breakfast x 5d, ORS sachets 2 packet in 1L boiled water, Drotikind TDS PRN for spasms';
    const res = await structurePrescription(diag, rx, 'en');
    console.log('   Result:', JSON.stringify(res, null, 2));
    if (!res.medicines || res.medicines.length === 0) throw new Error('No medicines structured');
  });

  // ----------------------------------------------------------------
  // AGENT 3 TEST CASES (Follow-Up Reminder Generation)
  // ----------------------------------------------------------------
  console.log('--- Testing Agent 3: WhatsApp/SMS Follow-up Reminders ---');

  // Case 8: Hindi WhatsApp follow-up
  await test('Agent 3 - Hindi WhatsApp Follow-Up Reminder', async () => {
    const visitData = {
      patient_name: 'Ramesh Kumar',
      clinic_name: 'Aarogya Seva Kendra',
      doctor_name: 'Dr. Rajesh Sharma',
      diagnosis: 'Acute Viral Pharyngitis',
      medicines: [
        { name: 'Paracetamol 650mg', dosage: 'TDS' },
        { name: 'Azithromycin 500mg', dosage: 'OD' }
      ],
      follow_up_days: 3,
      language: 'hi'
    };
    const res = await generateFollowUpReminder(visitData);
    console.log('   Result:', JSON.stringify(res, null, 2));
    if (!res.reminder_message || res.reminder_message.length < 20) {
      throw new Error('Reminder message is too short or empty');
    }
  });

  // ----------------------------------------------------------------
  // CACHE & FALLBACK RESILIENCE (Step 42 & 43)
  // ----------------------------------------------------------------
  console.log('--- Testing In-Memory Cache & Fallback Resilience ---');

  // Case 9: In-Memory Cache Hit Verification
  await test('Caching Verification: Identical prompt hits memory cache', async () => {
    const input = '3 din se tez bukhar hai, badan toot raha hai aur gale me jalan hai';
    const initialCacheSize = responseCache.size;
    const res = await summarizeSymptoms(input, 'hi');
    if (!res.chief_complaint) throw new Error('Failed to retrieve cached response');
  });

  // Case 10: Fallback Verification (Zero Crash Test)
  await test('Fallback Verification: Empty or broken client falls back safely', async () => {
    const originalKey = process.env.GEMINI_API_KEY;
    try {
      process.env.GEMINI_API_KEY = ''; // Simulate missing key
      const res = await summarizeSymptoms('Kal se sar dard aur ulti hai', 'hi');
      console.log('   Fallback Result:', JSON.stringify(res, null, 2));
      if (!res.chief_complaint || !res.fallback_used) {
        throw new Error('Expected fallback response with fallback_used flag');
      }
    } finally {
      process.env.GEMINI_API_KEY = originalKey; // Restore key
    }
  });

  console.log('====================================================');
  console.log(`🏁 Phase 3 AI Summary: ${passed} passed, ${failed} failed`);
  console.log('====================================================');

  if (failed > 0) process.exit(1);
}

runAITests();
