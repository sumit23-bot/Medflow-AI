import React from 'react';

/**
 * Reusable Button Component (Step 56)
 * Styled in institutional monochrome black & white
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-ink-900 disabled:opacity-50 disabled:cursor-not-allowed text-center select-none border';

  const variants = {
    primary: 'bg-ink-900 text-white border-ink-900 hover:bg-black active:bg-ink-950',
    secondary: 'bg-gray-100 text-ink-900 border-gray-300 hover:bg-gray-200 active:bg-gray-300',
    outline: 'bg-transparent text-ink-900 border-ink-900 hover:bg-gray-100 active:bg-gray-200',
    subtle: 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:text-ink-900',
    danger: 'bg-black text-white border-black underline decoration-red-500 hover:bg-charcoal-800'
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 rounded-sm',
    md: 'text-sm px-4 py-2 rounded',
    lg: 'text-base px-6 py-2.5 rounded'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
