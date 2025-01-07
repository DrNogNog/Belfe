import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { OrnateFrame } from './frame/OrnateFrame';
import { TrackerButtons } from './trackers/TrackerButtons';
import { ProfileAvatar } from './avatar/ProfileAvatar';
import { PhotoGrid } from './photos/PhotoGrid';

interface ProfileModalProps {
  onClose: () => void;
}

export function ProfileModal({ onClose }: ProfileModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <motion.div 
        className="relative bg-white w-full max-w-[540px] h-[800px] overflow-hidden"
      >
        <OrnateFrame />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-10 text-black hover:text-gray-700"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Content */}
        <div className="h-full flex flex-col p-12">
          {/* Top Section with Trackers */}
          <div className="flex justify-between mb-12">
            {/* Left Side - Tracker Buttons */}
            <TrackerButtons />
            
            {/* Right Side - Profile Avatar */}
            <div className="w-48">
              <ProfileAvatar />
            </div>
          </div>

          {/* Photo Grid */}
          <div className="flex-1 overflow-hidden">
            <PhotoGrid />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}