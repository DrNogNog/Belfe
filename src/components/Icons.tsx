import React from 'react';

export function MirrorIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
    </svg>
  );
}

export function MakeupIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 4a8 8 0 0 0-8 8v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a8 8 0 0 0-8-8z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 16v-4m3 4v-4m3 4v-4" strokeLinecap="round"/>
    </svg>
  );
}