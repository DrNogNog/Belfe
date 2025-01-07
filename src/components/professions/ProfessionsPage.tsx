import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { TranscendPage } from './TranscendPage';

interface ProfessionsPageProps {
  onClose: () => void;
}

export function ProfessionsPage({ onClose }: ProfessionsPageProps) {
  const [searchQuery, setSearchQuery] = React.useState('Artist');
  const [showTranscend, setShowTranscend] = useState(false);

  const skills = [
    'Creativity',
    'Attention to Detail',
    'Technical Proficiency',
    'Color Theory',
    'Composition',
    'Drawing and Sketching',
    'Digital Art Skills',
    'Problem Solving',
    'Time Management',
    'Artistic Vision'
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />

        {/* Modal */}
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="relative w-full max-w-2xl mx-4 bg-gradient-to-b from-gray-400/80 via-gray-500/80 to-black/80 
            rounded-[40px] p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 left-6 text-white/80 hover:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg 
                  py-4 px-6 text-xl text-white placeholder-white/60"
                placeholder="Type..."
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60">✓</div>
            </div>
          </div>

          {/* Main Image */}
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80"
              alt="Professional"
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>

          {/* Transcend Button */}
          <div className="flex justify-center mb-8">
            <button 
              onClick={() => setShowTranscend(true)}
              className="px-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 
                rounded-full text-xl text-white hover:bg-white/20 transition-colors"
            >
              Transcend
            </button>
          </div>

          {/* Skills */}
          <div className="text-center">
            <p className="text-white/80 leading-relaxed">
              Skills: {skills.join(', ')}
            </p>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showTranscend && (
          <TranscendPage onBack={() => setShowTranscend(false)} />
        )}
      </AnimatePresence>
    </>
  );
}