import React from 'react';
import { Activity, Music, Clock, Heart } from 'lucide-react';

export function TrackerButtons() {
  const buttons = [
    { icon: Activity, label: 'Confidence', sublabel: 'Tracker' },
    { icon: Music, label: 'Audio', sublabel: 'Journal' },
    { icon: Clock, label: 'Sleep', sublabel: 'Tracker' },
    { icon: Heart, label: 'Routine', sublabel: 'Tracker' }
  ];

  return (
    <div className="flex flex-col gap-4">
      {buttons.map(({ icon: Icon, label, sublabel }, index) => (
        <button
          key={index}
          className="flex items-center gap-2 text-black hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <Icon className="w-5 h-5" />
          <div className="text-left text-xs">
            <div className="font-medium">{label}</div>
            <div className="text-gray-500">{sublabel}</div>
          </div>
        </button>
      ))}
    </div>
  );
}