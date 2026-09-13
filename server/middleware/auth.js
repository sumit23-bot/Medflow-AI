const { supabase } = require('../supabaseClient');

/**
 * Auth Middleware
 * Verifies Supabase JWT token from Authorization header,
 * fetches user's profile (role, clinic_id) from 'users' table,
 * and attaches req.user = { id, auth_id, role, clinic_id, name }.
 */
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    // Developer bypass for testing / dummy data testing in dev mode
    if (process.env.NODE_ENV !== 'production' && (req.headers['x-dev-user-id'] || req.headers['x-dev-role'])) {
      req.user = {
        id: req.headers['x-dev-user-id'] || '22222222-2222-2222-2222-222222222222',
        role: req.headers['x-dev-role'] || 'doctor',
        clinic_id: req.headers['x-dev-clinic-id'] || '11111111-1111-1111-1111-111111111111',
        name: req.headers['x-dev-name'] || 'Dev User'
      };
      return next();
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        error: 'Authorization token missing or malformed. Use Bearer <token>' 
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token with Supabase Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid or expired session token',
        details: authError ? authError.message : null
      });
    }

    // Fetch user details from public.users table (role, clinic_id)
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('id, clinic_id, role, name, contact')
      .eq('auth_id', user.id)
      .maybeSingle();

    if (profileError) {
      return res.status(500).json({
        success: false,
        error: 'Error retrieving user profile',
        details: profileError.message
      });
    }

    // Attach req.user
    req.user = {
      id: userProfile ? userProfile.id : user.id,
      auth_id: user.id,
      role: userProfile ? userProfile.role : 'patient',
      clinic_id: userProfile ? userProfile.clinic_id : null,
      name: userProfile ? userProfile.name : user.email
    };

    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({ 
      success: false, 
      error: 'Authentication internal server error' 
    });
  }
};

module.exports = { requireAuth };
