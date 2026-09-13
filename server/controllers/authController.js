const { supabase } = require('../supabaseClient');

/**
 * POST /api/auth/login
 * Supabase auth wrapper endpoint for staff/admin login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const isConfigured = Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY));

    if (!isConfigured) {
      // Return demo doctor session
      return res.status(200).json({
        success: true,
        message: 'Login successful (demo mode)',
        token: 'mock-jwt-token-for-dev',
        user: {
          id: '22222222-2222-2222-2222-222222222222',
          email,
          role: email.includes('admin') ? 'admin' : (email.includes('pharm') ? 'pharmacist' : 'doctor'),
          name: 'Dr. Rajesh Sharma',
          clinic_id: '11111111-1111-1111-1111-111111111111'
        }
      });
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      return res.status(401).json({ success: false, error: authError.message });
    }

    // Fetch user profile from public.users
    const { data: userProfile } = await supabase
      .from('users')
      .select('id, clinic_id, role, name, contact')
      .eq('auth_id', authData.user.id)
      .maybeSingle();

    return res.status(200).json({
      success: true,
      token: authData.session.access_token,
      user: {
        id: userProfile ? userProfile.id : authData.user.id,
        email: authData.user.email,
        role: userProfile ? userProfile.role : 'patient',
        name: userProfile ? userProfile.name : authData.user.email,
        clinic_id: userProfile ? userProfile.clinic_id : null
      }
    });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * POST /api/auth/signup
 * New clinic onboarding signup wrapper
 */
const signup = async (req, res) => {
  try {
    const { email, password, clinic_name, name, role = 'admin' } = req.body;

    if (!email || !password || !clinic_name || !name) {
      return res.status(400).json({
        success: false,
        error: 'email, password, clinic_name, and name are required'
      });
    }

    const isConfigured = Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY));

    if (!isConfigured) {
      return res.status(201).json({
        success: true,
        message: 'Clinic registered successfully (demo mode)',
        user: {
          id: 'mock-admin-id',
          name,
          email,
          role,
          clinic_id: 'mock-clinic-id',
          clinic_name
        }
      });
    }

    // 1. Sign up in Supabase auth
    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email,
      password
    });

    if (authErr) {
      return res.status(400).json({ success: false, error: authErr.message });
    }

    // 2. Create clinic
    const { data: clinic, error: cErr } = await supabase
      .from('clinics')
      .insert([{ name: clinic_name, tier: 'community' }])
      .select()
      .single();

    if (cErr) throw cErr;

    // 3. Create user in public.users
    const { data: userProfile, error: uErr } = await supabase
      .from('users')
      .insert([{
        clinic_id: clinic.id,
        role,
        name,
        auth_id: authData.user.id
      }])
      .select()
      .single();

    if (uErr) throw uErr;

    return res.status(201).json({
      success: true,
      message: 'Clinic & admin account created successfully',
      user: {
        id: userProfile.id,
        name: userProfile.name,
        email: authData.user.email,
        role: userProfile.role,
        clinic_id: clinic.id,
        clinic_name: clinic.name
      }
    });
  } catch (err) {
    console.error('signup error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * GET /api/auth/me
 * Protected endpoint returning current user info
 */
const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
};

module.exports = {
  login,
  signup,
  getMe
};
