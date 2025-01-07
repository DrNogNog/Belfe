import React from 'react';

export function ProfileAvatar() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-48 h-48 rounded-lg mb-3 border-2 border-black overflow-hidden shadow-lg">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div className="w-3/4 bg-black h-full rounded-full" />
      </div>
    </div>
  );
}