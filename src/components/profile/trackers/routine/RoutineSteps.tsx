import React from 'react';

interface RoutineStepsProps {
  steps: string[];
  onStepClick: (step: string) => void;
}

export function RoutineSteps({ steps, onStepClick }: RoutineStepsProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="text-gray-500 space-y-2">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => onStepClick(step)}
            className="flex justify-between w-full py-2 hover:bg-gray-50 transition-colors px-2 rounded"
          >
            <span>{step}</span>
            <span>1:00</span>
          </button>
        ))}
      </div>
    </div>
  );
}