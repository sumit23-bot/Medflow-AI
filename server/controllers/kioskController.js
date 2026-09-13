const { supabase } = require('../supabaseClient');

/**
 * POST /api/kiosk/symptom
 * Accepts raw symptom text or voice transcript, returns initial structured summary placeholder
 * (Wired to Gemini Agent 1 in Phase 3)
 */
const submitSymptom = async (req, res) => {
  try {
    const { symptom_raw, language = 'hi' } = req.body;

    if (!symptom_raw || symptom_raw.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'symptom_raw is required'
      });
    }

    // Baseline structure (will be enhanced by AI Agent 1 in Phase 3)
    const mockSummary = {
      chief_complaint: symptom_raw.slice(0, 50),
      duration: 'Not specified',
      severity_keywords: ['reported'],
      raw_text: symptom_raw,
      language
    };

    return res.status(200).json({
      success: true,
      data: mockSummary
    });
  } catch (err) {
    console.error('submitSymptom error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * POST /api/kiosk/token
 * Issues new token, creates or links patient, creates visit and queue entry
 */
const issueToken = async (req, res) => {
  try {
    const { clinic_id, patient = {}, symptom_raw, symptom_summary_ai } = req.body;

    const targetClinicId = clinic_id || '11111111-1111-1111-1111-111111111111';
    const patientName = patient.name || 'Walk-in Patient';
    const patientPhone = patient.phone || null;
    const patientAge = patient.age ? parseInt(patient.age, 10) : null;

    // Check if Supabase client is connected
    const isConfigured = Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY));

    if (!isConfigured) {
      // Return realistic mock response for testing before DB credentials
      const dummyToken = Math.floor(100 + Math.random() * 900);
      return res.status(201).json({
        success: true,
        message: 'Token issued successfully (demo mode)',
        data: {
          token_number: dummyToken,
          patient_id: 'dummy-patient-id',
          visit_id: 'dummy-visit-id',
          clinic_id: targetClinicId,
          status: 'waiting',
          created_at: new Date().toISOString()
        }
      });
    }

    // 1. Find or create patient
    let patientId;
    if (patientPhone) {
      const { data: existingPatient } = await supabase
        .from('patients')
        .select('id')
        .eq('clinic_id', targetClinicId)
        .eq('phone', patientPhone)
        .maybeSingle();

      if (existingPatient) {
        patientId = existingPatient.id;
      }
    }

    if (!patientId) {
      const { data: newPatient, error: pErr } = await supabase
        .from('patients')
        .insert([{
          clinic_id: targetClinicId,
          name: patientName,
          phone: patientPhone,
          age: patientAge
        }])
        .select('id')
        .single();

      if (pErr) throw pErr;
      patientId = newPatient.id;
    }

    // 2. Determine next token number for today
    const { count } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true })
      .eq('clinic_id', targetClinicId);

    const tokenNumber = (count || 0) + 1;

    // 3. Create visit
    const { data: visit, error: vErr } = await supabase
      .from('visits')
      .insert([{
        clinic_id: targetClinicId,
        patient_id: patientId,
        token_number: tokenNumber,
        symptom_raw: symptom_raw || '',
        symptom_summary_ai: symptom_summary_ai || null,
        status: 'waiting'
      }])
      .select()
      .single();

    if (vErr) throw vErr;

    // 4. Create queue entry
    const { data: queueEntry, error: qErr } = await supabase
      .from('queue')
      .insert([{
        clinic_id: targetClinicId,
        visit_id: visit.id,
        status: 'waiting'
      }])
      .select()
      .single();

    if (qErr) throw qErr;

    return res.status(201).json({
      success: true,
      message: 'Token issued successfully',
      data: {
        token_number: tokenNumber,
        patient_id: patientId,
        visit_id: visit.id,
        queue_id: queueEntry.id,
        status: 'waiting',
        created_at: visit.created_at
      }
    });
  } catch (err) {
    console.error('issueToken error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  submitSymptom,
  issueToken
};
