import React from 'react';

/**
 * Reusable Card Component (Step 56)
 * Formal bordered container with header and content sections
 */
export default function Card({
  title,
  subtitle,
  children,
  action,
  className = '',
  headerClassName = '',
  bodyClassName = ''
}) {
  return (
    <div className={`bg-white border border-gray-200 shadow-sm rounded ${className}`}>
      {(title || subtitle || action) && (
        <div className={`px-5 py-3.5 border-b border-gray-200 flex items-center justify-between bg-gray-50/50 ${headerClassName}`}>
          <div>
            {title && (
              <h3 className="font-serif font-bold text-ink-950 text-base leading-snug">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-gray-500 font-sans mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={`p-5 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
