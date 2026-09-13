const { supabase, isConfigured } = require('../supabaseClient');

/**
 * GET /api/super-admin/clinics
 * Lists all onboarded clinics across the platform
 */
const getAllClinics = async (req, res) => {
  try {
    if (!isConfigured) {
      return res.status(200).json({
        success: true,
        data: [
          {
            id: '11111111-1111-1111-1111-111111111111',
            name: 'Aarogya Seva Kendra (Test Clinic)',
            tier: 'community',
            address: 'Ward 4, Primary Health Centre, Rural District',
            patient_count: 1420,
            created_at: '2026-08-01T00:00:00Z',
            status: 'active'
          },
          {
            id: 'mock-clinic-2',
            name: 'Jan Swasthya Clinic',
            tier: 'clinic_plus',
            address: 'Sector 9, Suburban Community Hospital',
            patient_count: 3200,
            created_at: '2026-08-15T00:00:00Z',
            status: 'active'
          }
        ]
      });
    }

    const { data, error } = await supabase
      .from('clinics')
      .select('id, name, tier, address, languages_supported, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    console.error('getAllClinics error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * GET /api/super-admin/analytics
 * Platform-wide usage & revenue metrics
 */
const getPlatformAnalytics = async (req, res) => {
  try {
    if (!isConfigured) {
      return res.status(200).json({
        success: true,
        data: {
          total_clinics: 12,
          total_patients_served: 28450,
          total_visits_digitized: 39120,
          active_monthly_clinics: 11,
          revenue_by_tier: {
            community: { clinics: 7, mrr_inr: 0 },
            clinic_plus: { clinics: 4, mrr_inr: 15996 },
            business: { clinics: 1, mrr_inr: 14999 }
          },
          total_mrr_inr: 30995
        }
      });
    }

    const { count: totalClinics } = await supabase
      .from('clinics')
      .select('*', { count: 'exact', head: true });

    const { count: totalPatients } = await supabase
      .from('patients')
      .select('*', { count: 'exact', head: true });

    const { count: totalVisits } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true });

    return res.status(200).json({
      success: true,
      data: {
        total_clinics: totalClinics || 1,
        total_patients_served: totalPatients || 1,
        total_visits_digitized: totalVisits || 1,
        revenue_by_tier: {
          community: { clinics: totalClinics || 1, mrr_inr: 0 }
        },
        total_mrr_inr: 0
      }
    });
  } catch (err) {
    console.error('getPlatformAnalytics error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllClinics,
  getPlatformAnalytics
};
