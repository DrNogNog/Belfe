import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { ConfidenceTracker } from './confidence/ConfidenceTracker';
import { AudioGuides } from './audio/AudioGuides';
import { RoutineTracker } from './routine/RoutineTracker';
import { SkillTracker } from './skill/SkillTracker';

interface TrackerModalProps {
  type: 'confidence' | 'audio' | 'sleep' | 'routine';
  onClose: () => void;
}

export function TrackerModal({ type, onClose }: TrackerModalProps) {
  const getTitle = () => {
    switch (type) {
      case 'confidence':
        return 'Confidence Tracker';
      case 'audio':
        return 'Audio Guides';
      case 'sleep':
        return 'Sleep Tracker';
      case 'routine':
        return 'Routine Tracker';
      default:
        return '';
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'confidence':
        return <ConfidenceTracker />;
      case 'audio':
        return <AudioGuides />;
      case 'sleep':
        return <SkillTracker />;
      case 'routine':
        return <RoutineTracker />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl w-full max-w-2xl">
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-medium text-gray-800">{getTitle()}</h2>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </motion.div>
  );
}