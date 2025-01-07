import React from 'react';
import { Play, Pause } from 'lucide-react';

const GUIDES = [
  { title: 'Foundation...', instruction: 'apply a thin layer starting...' },
  { title: 'Concealer...', instruction: 'Dot the concealer under your eyes...' },
  { title: 'Contouring...', instruction: 'Start at your temples...' },
  { title: 'Highlighting...', instruction: 'Apply highlighter to the high...' },
  { title: 'Eyebrows...', instruction: 'Use small, light strokes to fill...' },
  { title: 'Eyeshadow...', instruction: 'Begin by applying a neutral shade...' },
  { title: 'Eyeliner...', instruction: 'Start by lining your upper lash line...' },
  { title: 'Mascara...', instruction: 'Start at the base of your lashes...' }
];

export function AudioGuides() {
  const [playing, setPlaying] = React.useState<number | null>(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-500 text-xl font-semibold">Audio Guides</h2>
        <button className="text-gray-500 flex items-center gap-2 border p-2">
          <span>Compliments</span>
          <span>🎵</span>
        </button>
      </div>

      <div className="text-gray-500 space-y-4">
        {GUIDES.map((guide, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div>
              <div className="font-medium">{guide.title}</div>
              <div className="text-sm text-gray-500">{guide.instruction}</div>
            </div>
            <button
              onClick={() => setPlaying(playing === index ? null : index)}
              className="p-2 hover:bg-white rounded-full transition-colors"
            >
              {playing === index ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}