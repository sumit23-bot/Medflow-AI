import React from 'react';

/**
 * Custom Emblem / Seal-style Logo (Step 57)
 * Original circular clinical seal conveying authority and institutional trust
 */
export default function EmblemLogo({ size = 42, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-ink-950 flex-shrink-0"
      >
        {/* Outer Ring */}
        <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="3" />
        {/* Inner Ring */}
        <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Deep Center Ring */}
        <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1.5" fill="#f9fafb" />

        {/* Central Clinical Medical Cross */}
        <rect x="45" y="32" width="10" height="36" rx="1.5" fill="currentColor" />
        <rect x="32" y="45" width="36" height="10" rx="1.5" fill="currentColor" />

        {/* Traditional Laurel / Trust Leaves */}
        <path d="M22 66C22 55 26 42 34 36C32 46 32 58 36 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M78 66C78 55 74 42 66 36C68 46 68 58 64 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

        {/* Institutional Star Accents */}
        <polygon points="50,14 52,19 57,19 53,22 55,27 50,24 45,27 47,22 43,19 48,19" fill="currentColor" />
        <circle cx="16" cy="50" r="2.5" fill="currentColor" />
        <circle cx="84" cy="50" r="2.5" fill="currentColor" />
      </svg>
      <div className="flex flex-col text-left">
        <span className="font-serif font-bold tracking-tight text-ink-950 text-base uppercase leading-tight">
          MedFlow AI
        </span>
        <span className="text-[10px] tracking-wider text-gray-600 font-sans uppercase font-medium">
          Primary Care Triage & Records
        </span>
      </div>
    </div>
  );
}
