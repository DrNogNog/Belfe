import React from 'react';

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80";

export function PhotoGrid() {
  return (
    <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-lg">
      {Array.from({ length: 12 }).map((_, index) => (
        <div 
          key={index} 
          className="aspect-square bg-gray-200 rounded overflow-hidden"
          style={{
            border: '1px solid rgba(0,0,0,0.1)'
          }}
        >
          {index >= 9 && (
            <img
              src={PLACEHOLDER_IMAGE}
              alt={`Grid item ${index + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}