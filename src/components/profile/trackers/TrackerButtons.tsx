import React from 'react';
import { Activity, Music, Clock, Heart } from 'lucide-react';
import { TrackerButton } from './TrackerButton';

const TRACKERS = [
  { icon: Activity, label: 'Confidence', sublabel: 'Tracker', type: 'confidence' as const },
  { icon: Music, label: 'Audio', sublabel: 'Journal', type: 'audio' as const },
  { icon: Clock, label: 'Sleep', sublabel: 'Tracker', type: 'sleep' as const },
  { icon: Heart, label: 'Routine', sublabel: 'Tracker', type: 'routine' as const }
];

export function TrackerButtons() {
  return (
    <div className="flex flex-col gap-6">
      {TRACKERS.map((tracker, index) => (
        <TrackerButton key={index} {...tracker} />
      ))}
    </div>
  );
}