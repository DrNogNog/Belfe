import React from 'react';
import { Activity, Music, Clock, Heart } from 'lucide-react';

export function TrackerSection() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center gap-2 text-black">
        <Activity className="w-5 h-5" />
        <div className="text-sm">
          <div className="font-medium">Confidence</div>
          <div className="text-gray-500">Tracker</div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-black">
        <Music className="w-5 h-5" />
        <div className="text-sm">
          <div className="font-medium">Audio</div>
          <div className="text-gray-500">Journal</div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-black">
        <Clock className="w-5 h-5" />
        <div className="text-sm">
          <div className="font-medium">Sleep</div>
          <div className="text-gray-500">Tracker</div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-black">
        <Heart className="w-5 h-5" />
        <div className="text-sm">
          <div className="font-medium">Routine</div>
          <div className="text-gray-500">Tracker</div>
        </div>
      </div>
    </div>
  );
}