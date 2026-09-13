/**
 * Role Check Middleware
 * @param {string[]} allowedRoles - Array of roles permitted to access the endpoint
 * (e.g., ['doctor', 'admin'])
 */
const roleCheck = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Authentication required before role verification'
      });
    }

    const userRole = req.user.role;

    // super_admin always bypasses role checks
    if (userRole === 'super_admin' || allowedRoles.includes(userRole)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error: `Forbidden: User role '${userRole}' is not authorized to access this resource`,
      allowedRoles
    });
  };
};

module.exports = { roleCheck };
