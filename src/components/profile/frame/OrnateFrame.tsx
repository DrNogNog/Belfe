import React from 'react';

export function OrnateFrame() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 border-[18px] border-black">
        <div className="absolute inset-0 border-[6px] border-white">
          <div className="absolute inset-0 border-[3px] border-black" />
        </div>
      </div>
      
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-6 border-l-6 border-black" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-6 border-r-6 border-black" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-6 border-l-6 border-black" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-6 border-r-6 border-black" />
    </div>
  );
}