import React from 'react';
import { Share2, ArrowLeft } from 'lucide-react';

interface StepDetailProps {
  step: string;
  onBack: () => void;
}

export function StepDetail({ step, onBack }: StepDetailProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-gray-500 text-xl font-semibold">{step}</h2>
        </div>
        <button className="text-blue-500 hover:text-blue-600">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Sponge Section */}
        <div className="border rounded-lg p-4">
          <h3 className="text-gray-500 font-medium mb-3">Sponge</h3>
          <div className="aspect-square bg-gray-100 rounded-lg mb-3" />
          <p className="text-gray-500 mb-2">Description</p>
          <a 
            href="#" 
            className="text-blue-500 hover:text-blue-600"
          >
            Store Link
          </a>
        </div>

        {/* Soap Section */}
        <div className="border rounded-lg p-4">
          <h3 className="text-gray-500 font-medium mb-3">Soap</h3>
          <div className="aspect-square bg-gray-100 rounded-lg mb-3" />
          <p className="text-gray-500 mb-2">Description</p>
          <a 
            href="#" 
            className="text-blue-500 hover:text-blue-600"
          >
            Store Link
          </a>
        </div>
      </div>
    </div>
  );
}