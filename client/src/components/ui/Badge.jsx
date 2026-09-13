import React from 'react';

/**
 * Reusable Badge Component (Step 56)
 * Crisp, monochromatic status indicators
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) {
  const variants = {
    default: 'bg-gray-100 text-ink-900 border-gray-300',
    waiting: 'bg-white text-ink-900 border-ink-900 font-semibold',
    'in-consult': 'bg-charcoal-700 text-white border-charcoal-700',
    'at-pharmacy': 'bg-gray-200 text-ink-950 border-gray-400 font-semibold',
    dispensed: 'bg-gray-100 text-gray-600 border-gray-200 line-through',
    active: 'bg-black text-white border-black',
    tag: 'bg-gray-50 text-gray-700 border-gray-300'
  };

  const sizes = {
    sm: 'text-[10px] px-1.5 py-0.5 rounded-sm',
    md: 'text-xs px-2.5 py-1 rounded'
  };

  return (
    <span className={`inline-flex items-center font-mono border uppercase tracking-wider ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}>
      {children}
    </span>
  );
}
