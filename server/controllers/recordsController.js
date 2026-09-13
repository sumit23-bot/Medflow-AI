const { supabase, isConfigured } = require('../supabaseClient');
const { generateFollowUpReminder } = require('../services/agentFollowUp');

/**
 * GET /api/records/search?q=...
 * Search across patients by name, token, or phone
 */
const searchRecords = async (req, res) => {
  try {
    const { q = '' } = req.query;
    const clinicId = req.user?.clinic_id || '11111111-1111-1111-1111-111111111111';

    if (!isConfigured) {
      // Mock patient search results
      const mockPatients = [
        {
          id: '33333333-3333-3333-3333-333333333333',
          name: 'Ramesh Kumar',
          phone: '+919811122233',
          age: 42,
          last_visit: '2026-09-13',
          latest_token: 101,
          latest_diagnosis: 'Viral Pharyngitis'
        },
        {
          id: 'mock-patient-2',
          name: 'Sunita Devi',
          phone: '+919811144455',
          age: 35,
          last_visit: '2026-09-12',
          latest_token: 98,
          latest_diagnosis: 'Acute Gastritis'
        }
      ].filter(p => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.phone.includes(q) || String(p.latest_token).includes(q));

      return res.status(200).json({ success: true, count: mockPatients.length, data: mockPatients });
    }

    let query = supabase
      .from('patients')
      .select(`
        id,
        name,
        phone,
        age,
        created_at,
        visits (
          id,
          token_number,
          diagnosis,
          status,
          created_at
        )
      `)
      .eq('clinic_id', clinicId);

    if (q) {
      query = query.or(`name.ilike.%${q}%,phone.ilike.%${q}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false }).limit(25);

    if (error) throw error;

    return res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    console.error('searchRecords error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * GET /api/records/:patientId
 * Get complete medical history for a patient
 */
const getPatientFullHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const clinicId = req.user?.clinic_id || '11111111-1111-1111-1111-111111111111';

    if (!isConfigured) {
      return res.status(200).json({
        success: true,
        data: {
          patient: {
            id: patientId,
            name: 'Ramesh Kumar',
            phone: '+919811122233',
            age: 42,
            gender: 'Male',
            clinic_id: clinicId
          },
          visits: [
            {
              id: '44444444-4444-4444-4444-444444444444',
              date: '2026-09-13',
              token_number: 101,
              symptom_raw: '3 din se tez bukhar aur gale me dard hai',
              symptom_summary_ai: { chief_complaint: 'High fever and sore throat', duration: '3 days' },
              diagnosis: 'Viral Pharyngitis',
              prescription_raw: 'Paracetamol 650mg TDS, Azithromycin 500mg OD',
              prescription_structured_ai: {
                medicines: [
                  { name: 'Paracetamol', dosage: '650mg', frequency: 'TDS (Three times a day)', duration: '3 days' },
                  { name: 'Azithromycin', dosage: '500mg', frequency: 'OD (Once daily)', duration: '3 days' }
                ],
                patient_instructions_local_language: 'Khana khane ke baad dawa lein, garam paani se garare karein.'
              },
              doctor_name: 'Dr. Rajesh Sharma',
              status: 'dispensed'
            }
          ]
        }
      });
    }

    const { data: patient, error: pErr } = await supabase
      .from('patients')
      .select('*')
      .eq('id', patientId)
      .eq('clinic_id', clinicId)
      .single();

    if (pErr) throw pErr;

    const { data: visits, error: vErr } = await supabase
      .from('visits')
      .select(`
        id,
        token_number,
        symptom_raw,
        symptom_summary_ai,
        diagnosis,
        prescription_raw,
        prescription_structured_ai,
        status,
        created_at,
        users (
          name
        )
      `)
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });

    if (vErr) throw vErr;

    return res.status(200).json({
      success: true,
      data: {
        patient,
        visits
      }
    });
  } catch (err) {
    console.error('getPatientFullHistory error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * POST /api/records/follow-up/:visitId
 * Generates an automated WhatsApp/SMS follow up reminder for a patient visit
 * (Wired to Gemini Agent 3 in Phase 3)
 */
const triggerFollowUp = async (req, res) => {
  try {
    const { visitId } = req.params;
    const { language = 'hi', follow_up_days = 3 } = req.body;

    if (!isConfigured) {
      const reminder = await generateFollowUpReminder({
        patient_name: 'Ramesh Kumar',
        diagnosis: 'Viral Pharyngitis',
        medicines: 'Paracetamol 650mg TDS, Azithromycin 500mg OD',
        follow_up_days,
        language
      });
      return res.status(200).json({ success: true, data: reminder });
    }

    const { data: visit, error } = await supabase
      .from('visits')
      .select('*, patients(name, phone), clinics(name)')
      .eq('id', visitId)
      .maybeSingle();

    const patientName = visit?.patients?.name || 'Ramesh Kumar';
    const clinicName = visit?.clinics?.name || 'Aarogya Seva Kendra';
    const diagnosis = visit?.diagnosis || 'Clinical Consultation';
    const medicines = visit?.prescription_raw || 'Prescribed medications';

    const reminder = await generateFollowUpReminder({
      patient_name: patientName,
      clinic_name: clinicName,
      diagnosis,
      medicines,
      follow_up_days,
      language
    });

    return res.status(200).json({ success: true, data: reminder });
  } catch (err) {
    console.error('triggerFollowUp error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  searchRecords,
  getPatientFullHistory,
  triggerFollowUp
};
