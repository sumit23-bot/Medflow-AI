import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * AuthLogin.jsx
 * Route: /app/auth/login
 * Purpose: In-app authentication fallback (B18)
 */
export default function AuthLogin() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      <div className="border-b border-gray-300 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="tag">/app/auth/login</Badge>
          <Badge variant="waiting">Product App</Badge>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 tracking-tight">
          Staff Authentication
        </h1>
        <p className="text-sm text-gray-600 font-sans mt-1">
          In-app authentication fallback (B18)
        </p>
      </div>

      <Card
        title="Module Status"
        subtitle="Phase 4 Routing Skeleton Active"
      >
        <div className="bg-gray-50 border border-gray-200 p-6 rounded text-center space-y-3">
          <p className="text-sm font-sans text-gray-700">
            This route is actively registered in the multi-page routing table and ready for production logic.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded text-xs font-mono text-gray-600">
            <span>Component:</span>
            <strong>AuthLogin.jsx</strong>
          </div>
        </div>
      </Card>
    </div>
  );
}
