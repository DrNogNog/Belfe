import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MOODS = [
  { label: 'Happy, Content, Cheerful, Excited, Silly, Proud', color: '#FFD700' },
  { label: 'Calm, Peaceful, Thankful, Relaxed, Caring', color: '#98FB98' },
  { label: 'Sad, Lonely, Bored, Tired, Depressed', color: '#87CEEB' },
  { label: 'Mad, Annoyed, Frustrated, Aggressive, Grumpy', color: '#FF6B6B' },
  { label: 'Worried, Scared, Nervous, Uncomfortable, Confused', color: '#DDA0DD' }
];

export function ConfidenceTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [journal, setJournal] = useState('');

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-gray-500 text-xl font-semibold mb-4">How confident did you feel about your look today?</h2>
      
      {/* Mood Checkboxes */}
      <div className="space-y-3 mb-6">
        {MOODS.map((mood, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedMood === index}
              onChange={() => setSelectedMood(index)}
              className="w-4 h-4 rounded"
            />
            <span style={{ color: mood.color }}>{mood.label}</span>
          </div>
        ))}
      </div>

      {/* Journal Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Journal</h3>
        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg resize-none"
          placeholder="Write your thoughts here..."
        />
      </div>

      {/* Mood Tracker Visualization */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-2">Mood counter</h3>
          <div className="flex gap-2">
            {['😊', '😐', '😢', '😠', '😰'].map((emoji, index) => (
              <div 
                key={index}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded"
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-2">Mood chart in this month</h3>
          <div className="h-24 bg-gray-50 rounded p-2">
            {/* Placeholder for mood chart */}
            <div className="h-full bg-gradient-to-r from-purple-200 to-pink-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}