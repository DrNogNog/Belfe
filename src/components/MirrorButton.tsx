import React from 'react';

interface MirrorButtonProps {
  onClick: () => void;
}

export function MirrorButton({ onClick }: MirrorButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center text-white/80 hover:text-white transition-colors"
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
        className="w-12 h-12 mb-2"
      >
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
      <span className="text-lg">Mirror</span>
    </button>
  );
}