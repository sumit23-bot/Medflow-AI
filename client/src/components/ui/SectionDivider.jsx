import React from 'react';

/**
 * Reusable SectionDivider Component (Step 56)
 * Formal section break with optional label in official aesthetic
 */
export default function SectionDivider({ label, className = '' }) {
  if (!label) {
    return <hr className={`border-t border-gray-300 my-6 ${className}`} />;
  }

  return (
    <div className={`relative flex items-center justify-center my-8 ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative bg-white px-4">
        <span className="font-serif text-xs uppercase tracking-widest text-gray-600 font-bold bg-white">
          {label}
        </span>
      </div>
    </div>
  );
}
