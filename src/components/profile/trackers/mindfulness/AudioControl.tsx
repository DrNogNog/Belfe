import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControlProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export function AudioControl({ isMuted, onToggleMute }: AudioControlProps) {
  return (
    <button
      onClick={onToggleMute}
      className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 
        backdrop-blur-sm hover:bg-white/20 transition-colors"
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6 text-white" />
      ) : (
        <Volume2 className="w-6 h-6 text-white" />
      )}
    </button>
  );
}