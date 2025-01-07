import React, { useState } from 'react';
import { Share2 } from 'lucide-react';

const ROUTINE_STEPS = [
  { name: 'Cleansing', time: '1:00' },
  { name: 'Moisturizing', time: '1:00' },
  { name: 'Priming', time: '1:00' },
  { name: 'Foundation', time: '1:00' },
  { name: 'BB Cream or Tinted Moisturizer', time: '1:00' },
  { name: 'Under-eye Concealer', time: '1:00' },
  { name: 'Blemish Concealer', time: '1:00' },
  { name: 'Contouring', time: '1:00' },
  { name: 'Highlighting', time: '1:00' },
  { name: 'Eyeshadow', time: '1:00' },
  { name: 'Eyeliner', time: '1:00' },
  { name: 'Mascara', time: '1:00' },
  { name: 'Shaping', time: '1:00' }
];

export function RoutineTracker() {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [showStepDetails, setShowStepDetails] = useState(false);

  const handleStepClick = (stepName: string) => {
    setSelectedStep(stepName);
    setShowStepDetails(true);
  };

  if (showStepDetails && selectedStep) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowStepDetails(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ‹
            </button>
            <h2 className="text-xl font-medium text-gray-800">{selectedStep}</h2>
          </div>
          <button className="text-blue-500 hover:text-blue-600">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Step Details Content */}
        <div className="grid grid-cols-2 gap-4">
          {/* Sponge Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-3">Sponge</h3>
            <div className="aspect-square bg-gray-100 rounded-lg mb-3" />
            <p className="text-gray-600 text-sm mb-2">Description</p>
            <a 
              href="#" 
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              Store Link
            </a>
          </div>

          {/* Soap Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-3">Soap</h3>
            <div className="aspect-square bg-gray-100 rounded-lg mb-3" />
            <p className="text-gray-600 text-sm mb-2">Description</p>
            <a 
              href="#" 
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              Store Link
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-800">Routine Tracker</h2>
        <button className="text-blue-500 hover:text-blue-600">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Routine Steps Box */}
        <div className="border border-gray-200 rounded-lg">
          <div className="max-h-[300px] overflow-y-auto">
            {ROUTINE_STEPS.map((step, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(step.name)}
                className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-50 text-left border-b border-gray-200 last:border-b-0"
              >
                <span className="text-gray-700">{step.name}</span>
                <span className="text-gray-500">{step.time}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Box */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-6">
          {/* Quote */}
          <p className="text-gray-600 text-sm italic">
            The more you practice thankfulness, the more you have to be thankful for.
          </p>

          {/* Daily Reminders */}
          <div>
            <h3 className="text-gray-700 font-medium mb-2">Daily Reminders:</h3>
            <p className="text-gray-600">Practice eyeliner today</p>
          </div>

          {/* Routine Notes */}
          <div>
            <h3 className="text-gray-700 font-medium mb-2">Routine Notes:</h3>
            <div className="text-gray-600 space-y-1">
              <p>Applied a lighter layer of foundation today.</p>
              <p>Struggled with eyeliner today – need to practice more.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}