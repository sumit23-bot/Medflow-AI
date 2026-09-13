const { supabase, isConfigured } = require('../supabaseClient');

/**
 * GET /api/pharmacy/queue
 * Real-time list of pending prescriptions awaiting dispensing
 */
const getPharmacyQueue = async (req, res) => {
  try {
    const clinicId = req.user?.clinic_id || '11111111-1111-1111-1111-111111111111';

    if (!isConfigured) {
      return res.status(200).json({
        success: true,
        data: [
          {
            id: 'mock-pharm-1',
            visit_id: '44444444-4444-4444-4444-444444444444',
            token_number: 101,
            patient_name: 'Ramesh Kumar',
            patient_age: 42,
            diagnosis: 'Acute Bronchitis',
            prescription_raw: 'Amoxicillin 500mg TDS x 5 days, Paracetamol 650mg TDS x 3 days',
            status: 'at-pharmacy',
            updated_at: new Date().toISOString()
          }
        ]
      });
    }

    const { data, error } = await supabase
      .from('queue')
      .select(`
        id,
        status,
        updated_at,
        visits (
          id,
          token_number,
          diagnosis,
          prescription_raw,
          prescription_structured_ai,
          patients (
            id,
            name,
            phone,
            age
          )
        )
      `)
      .eq('clinic_id', clinicId)
      .eq('status', 'at-pharmacy')
      .order('updated_at', { ascending: true });

    if (error) throw error;

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('getPharmacyQueue error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * POST /api/pharmacy/dispense/:visitId
 * Marks visit as dispensed and updates queue status
 */
const dispenseMedicine = async (req, res) => {
  try {
    const { visitId } = req.params;

    if (!visitId) {
      return res.status(400).json({ success: false, error: 'visitId param is required' });
    }

    if (!isConfigured) {
      return res.status(200).json({
        success: true,
        message: 'Medicine dispensed successfully (demo mode)',
        data: {
          visit_id: visitId,
          status: 'dispensed',
          dispensed_at: new Date().toISOString()
        }
      });
    }

    // 1. Update visit status to dispensed
    const { data: visit, error: vErr } = await supabase
      .from('visits')
      .update({ status: 'dispensed' })
      .eq('id', visitId)
      .select()
      .single();

    if (vErr) throw vErr;

    // 2. Update queue status to dispensed
    const { data: queue, error: qErr } = await supabase
      .from('queue')
      .update({
        status: 'dispensed',
        updated_at: new Date().toISOString()
      })
      .eq('visit_id', visitId)
      .select()
      .single();

    if (qErr) throw qErr;

    return res.status(200).json({
      success: true,
      message: 'Prescription marked as dispensed',
      data: { visit, queue }
    });
  } catch (err) {
    console.error('dispenseMedicine error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getPharmacyQueue,
  dispenseMedicine
};
