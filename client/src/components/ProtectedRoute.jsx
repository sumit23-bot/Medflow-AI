import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute Component (Step 49)
 * Checks authentication & role access before rendering /app/* routes
 */
export default function ProtectedRoute({ allowedRoles = [], children }) {
  // Check auth from localStorage
  const token = localStorage.getItem('medflow_token');
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('medflow_user'));
    } catch {
      return null;
    }
  })();

  // For hackathon / local development testing, allow demo access with default doctor role if token not set
  const isAuthenticated = Boolean(token || user);
  const activeRole = user?.role || 'doctor';

  if (!isAuthenticated && process.env.NODE_ENV === 'production') {
    return <Navigate to="/login" replace />;
  }

  // Check role authorization if restricted
  if (allowedRoles.length > 0 && activeRole !== 'super_admin' && !allowedRoles.includes(activeRole)) {
    return (
      <div className="p-8 text-center bg-white border border-gray-200 rounded max-w-lg mx-auto mt-12">
        <h2 className="font-serif text-xl font-bold text-ink-950 mb-2">Access Restricted</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your role (<span className="font-mono font-bold text-black">{activeRole}</span>) is not permitted to access this module.
        </p>
        <p className="text-xs text-gray-500">
          Required roles: {allowedRoles.join(', ')}
        </p>
      </div>
    );
  }

  return children ? children : <Outlet />;
}
