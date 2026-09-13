const { supabase } = require('../supabaseClient');

/**
 * GET /api/doctor/queue
 * Returns real-time list of waiting patients for the doctor's clinic
 */
const getDoctorQueue = async (req, res) => {
  try {
    const clinicId = req.user?.clinic_id || '11111111-1111-1111-1111-111111111111';
    const isConfigured = Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY));

    if (!isConfigured) {
      // Return dummy queue data for testing
      return res.status(200).json({
        success: true,
        data: [
          {
            id: 'mock-q-1',
            visit_id: '44444444-4444-4444-4444-444444444444',
            status: 'waiting',
            token_number: 101,
            patient_name: 'Ramesh Kumar',
            patient_age: 42,
            patient_phone: '+919811122233',
            symptom_raw: '3 din se tez bukhar aur gale me dard hai',
            created_at: new Date(Date.now() - 15 * 60000).toISOString()
          },
          {
            id: 'mock-q-2',
            visit_id: '55555555-5555-5555-5555-555555555555',
            status: 'waiting',
            token_number: 102,
            patient_name: 'Sunita Devi',
            patient_age: 35,
            patient_phone: '+919811144455',
            symptom_raw: 'Pet dard aur ulti ho rahi hai subah se',
            created_at: new Date(Date.now() - 5 * 60000).toISOString()
          }
        ]
      });
    }

    // Query queue joined with visits and patients
    const { data, error } = await supabase
      .from('queue')
      .select(`
        id,
        status,
        updated_at,
        visits (
          id,
          token_number,
          symptom_raw,
          symptom_summary_ai,
          created_at,
          patients (
            id,
            name,
            phone,
            age
          )
        )
      `)
      .eq('clinic_id', clinicId)
      .eq('status', 'waiting')
      .order('updated_at', { ascending: true });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    console.error('getDoctorQueue error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * GET /api/doctor/patient/:id
 * Returns patient profile, current visit symptom summary, and previous visit history
 */
const getPatientDetail = async (req, res) => {
  try {
    const { id: patientId } = req.params;
    const clinicId = req.user?.clinic_id || '11111111-1111-1111-1111-111111111111';
    const isConfigured = Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY));

    if (!isConfigured) {
      // Dummy patient profile + history
      return res.status(200).json({
        success: true,
        data: {
          patient: {
            id: patientId,
            name: 'Ramesh Kumar',
            age: 42,
            phone: '+919811122233',
            clinic_id: clinicId
          },
          current_visit: {
            id: '44444444-4444-4444-4444-444444444444',
            token_number: 101,
            symptom_raw: '3 din se tez bukhar aur gale me dard hai',
            symptom_summary_ai: {
              chief_complaint: 'High fever and sore throat',
              duration: '3 days',
              severity_keywords: ['tez bukhar', 'high fever']
            },
            status: 'waiting'
          },
          history: [
            {
              id: 'past-visit-01',
              date: '2026-08-10',
              diagnosis: 'Viral Pharyngitis',
              prescription_raw: 'Paracetamol 650mg TDS x 3 days, Azithromycin 500mg OD x 3 days'
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
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });

    if (vErr) throw vErr;

    return res.status(200).json({
      success: true,
      data: {
        patient,
        current_visit: visits[0] || null,
        history: visits.slice(1)
      }
    });
  } catch (err) {
    console.error('getPatientDetail error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * POST /api/doctor/prescription
 * Records diagnosis and prescription notes, transitions queue status to 'at-pharmacy'
 */
const submitPrescription = async (req, res) => {
  try {
    const { visit_id, diagnosis, prescription_raw, prescription_structured_ai } = req.body;
    const doctorId = req.user?.id || null;
    const isConfigured = Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY));

    if (!visit_id) {
      return res.status(400).json({ success: false, error: 'visit_id is required' });
    }

    if (!isConfigured) {
      return res.status(200).json({
        success: true,
        message: 'Prescription submitted and queued for pharmacy (demo mode)',
        data: {
          visit_id,
          doctor_id: doctorId,
          diagnosis: diagnosis || 'General viral syndrome',
          prescription_raw: prescription_raw || 'Paracetamol 500mg, Cetirizine 10mg',
          prescription_structured_ai: prescription_structured_ai || null,
          status: 'at-pharmacy',
          updated_at: new Date().toISOString()
        }
      });
    }

    // 1. Update visit
    const { data: updatedVisit, error: vErr } = await supabase
      .from('visits')
      .update({
        diagnosis,
        prescription_raw,
        prescription_structured_ai: prescription_structured_ai || null,
        doctor_id: doctorId,
        status: 'at-pharmacy'
      })
      .eq('id', visit_id)
      .select()
      .single();

    if (vErr) throw vErr;

    // 2. Update queue status to 'at-pharmacy'
    const { data: updatedQueue, error: qErr } = await supabase
      .from('queue')
      .update({
        status: 'at-pharmacy',
        updated_at: new Date().toISOString()
      })
      .eq('visit_id', visit_id)
      .select()
      .single();

    if (qErr) throw qErr;

    return res.status(200).json({
      success: true,
      message: 'Prescription saved and sent to pharmacy queue',
      data: {
        visit: updatedVisit,
        queue: updatedQueue
      }
    });
  } catch (err) {
    console.error('submitPrescription error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getDoctorQueue,
  getPatientDetail,
  submitPrescription
};
