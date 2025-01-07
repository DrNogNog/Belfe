import React from 'react';

interface RoutineOutputProps {
  reminders: string;
  notes: string;
}

export function RoutineOutput({ reminders, notes }: RoutineOutputProps) {
  return (
    <div className="space-y-6">
      {/* Daily Reminders */}
      <div className="border rounded-lg p-4">
        <h3 className="text-gray-500 font-medium mb-2">Daily Reminders:</h3>
        <div className="text-gray-600 whitespace-pre-line">
          {reminders}
        </div>
      </div>

      {/* Routine Notes */}
      <div className="border rounded-lg p-4">
        <h3 className="text-gray-500 font-medium mb-2">Routine Notes:</h3>
        <div className="text-gray-600 whitespace-pre-line">
          {notes}
        </div>
      </div>
    </div>
  );
}