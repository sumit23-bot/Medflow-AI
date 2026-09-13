import React from 'react';

/**
 * Reusable FormInput Component (Step 56)
 * Accessible, high-contrast input with formal styling
 */
export default function FormInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  helperText = '',
  className = '',
  disabled = false,
  ...props
}) {
  const inputId = id || `input-${label ? label.toLowerCase().replace(/\s+/g, '-') : Math.random().toString(36).substring(7)}`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="font-sans text-xs font-semibold text-ink-950 uppercase tracking-wider flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-black ml-1 font-serif">*</span>}
          </span>
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 text-sm bg-white border rounded font-sans text-ink-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ink-900 focus:border-ink-900 disabled:bg-gray-100 disabled:cursor-not-allowed ${
          error ? 'border-black ring-1 ring-black' : 'border-gray-300 hover:border-gray-400'
        }`}
        {...props}
      />
      {error && <span className="text-xs text-black font-semibold mt-0.5">{error}</span>}
      {!error && helperText && <span className="text-xs text-gray-500 mt-0.5">{helperText}</span>}
    </div>
  );
}
