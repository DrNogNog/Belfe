import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { TrackerModal } from './TrackerModal';

interface TrackerButtonProps {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  type: 'confidence' | 'audio' | 'sleep' | 'routine';
}

export function TrackerButton({ icon: Icon, label, sublabel, type }: TrackerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 text-black hover:bg-gray-50 p-3 rounded-lg 
          border border-gray-200 shadow-sm transition-all duration-200
          hover:border-gray-300 hover:shadow-md"
      >
        <Icon className="w-6 h-6" />
        <div className="text-left">
          <div className="font-medium text-sm">{label}</div>
          <div className="text-gray-500 text-xs">{sublabel}</div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <TrackerModal 
            type={type}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}