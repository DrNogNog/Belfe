import React from 'react';

export function ProfileAvatar() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 bg-gray-100 rounded-lg mb-2 border-2 border-black">
        {/* Stick figure */}
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full p-4 text-gray-400"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
        >
          <circle cx="12" cy="8" r="3" />
          <line x1="12" y1="11" x2="12" y2="17" />
          <line x1="9" y1="20" x2="12" y2="17" />
          <line x1="15" y1="20" x2="12" y2="17" />
        </svg>
      </div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full">
        <div className="w-3/4 bg-black h-full rounded-full" />
      </div>
    </div>
  );
}