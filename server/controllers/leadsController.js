const { supabase, isConfigured } = require('../supabaseClient');

/**
 * POST /api/leads
 * Public endpoint for capturing leads from marketing site & lead magnets
 * e.g., 'free-guide', 'roi-calculator', 'waitlist', 'contact', 'demo-request'
 */
const createLead = async (req, res) => {
  try {
    const { source, name, contact, clinic_name } = req.body;

    if (!source) {
      return res.status(400).json({ success: false, error: 'source is required' });
    }

    if (!contact && !name) {
      return res.status(400).json({ success: false, error: 'At least name or contact is required' });
    }

    if (!isConfigured) {
      return res.status(201).json({
        success: true,
        message: 'Lead captured successfully (demo mode)',
        data: {
          id: 'mock-lead-id',
          source,
          name: name || 'Anonymous',
          contact,
          clinic_name: clinic_name || null,
          created_at: new Date().toISOString()
        }
      });
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([{
        source,
        name: name || null,
        contact: contact || null,
        clinic_name: clinic_name || null
      }])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      message: 'Lead captured successfully',
      data
    });
  } catch (err) {
    console.error('createLead error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createLead
};
