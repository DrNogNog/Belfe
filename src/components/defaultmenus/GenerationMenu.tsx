import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Eye, Smile, Heart, User, Scan, Sparkles, Wand2, Baby, Crown } from 'lucide-react';
import { ProfessionsPage } from '../professions/ProfessionsPage';

interface GenerationMenuProps {
  onBack: () => void;
  onEyesClick: () => void;
  onLipClick: () => void;
  onCheeksClick: () => void;
  onFaceClick: () => void;
  onRelaxationClick: () => void;
}

export function GenerationMenu({ 
  onBack,
  onEyesClick,
  onLipClick,
  onCheeksClick,
  onFaceClick,
  onRelaxationClick
}: GenerationMenuProps) {
  const [showProfessions, setShowProfessions] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute bottom-0 left-0 w-64 bg-gradient-to-b from-gray-400/80 via-gray-500/80 to-black/80"
      >
        <div className="p-4">
          <h2 className="text-2xl font-light text-center mb-6">Make Up</h2>
          
          <div className="space-y-4">
            <button 
              onClick={onEyesClick}
              className="w-full flex items-center justify-between text-lg"
            >
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5" />
                <span>Eyes</span>
              </div>
              <span className="text-xl opacity-60">›</span>
            </button>

            <button 
              onClick={onLipClick}
              className="w-full flex items-center justify-between text-lg"
            >
              <div className="flex items-center gap-3">
                <Smile className="w-5 h-5" />
                <span>Lips</span>
              </div>
              <span className="text-xl opacity-60">›</span>
            </button>

            <button 
              onClick={onCheeksClick}
              className="w-full flex items-center justify-between text-lg"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5" />
                <span>Cheeks</span>
              </div>
              <span className="text-xl opacity-60">›</span>
            </button>

            <button 
              onClick={onFaceClick}
              className="w-full flex items-center justify-between text-lg"
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" />
                <span>Face</span>
              </div>
              <span className="text-xl opacity-60">›</span>
            </button>

            <button 
              onClick={onRelaxationClick}
              className="w-full flex items-center justify-between text-lg"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                <span>Relaxation & Profile</span>
              </div>
              <span className="text-xl opacity-60">›</span>
            </button>

            <div>
              <button
                onClick={onBack}
                className="w-full flex items-center gap-2 text-lg mb-2"
              >
                <ChevronLeft className="w-5 h-5" />
                <div className="flex items-center gap-3">
                  <Wand2 className="w-5 h-5" />
                  <span>Generation</span>
                </div>
              </button>
              <div className="pl-12 space-y-2">
                <button className="w-full text-left text-lg hover:text-white/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <Baby className="w-5 h-5" />
                    <span>Children & Parent</span>
                  </div>
                </button>
                <button className="w-full text-left text-lg hover:text-white/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5" />
                    <span>Mature Allure (45+)</span>
                  </div>
                </button>
                <button 
                  onClick={() => setShowProfessions(true)}
                  className="w-full text-left text-lg hover:text-white/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Smile className="w-5 h-5" />
                    <span>Professions</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full flex items-center gap-3 text-lg">
                <Scan className="w-5 h-5" />
                <span>Scan & Match</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showProfessions && (
          <ProfessionsPage onClose={() => setShowProfessions(false)} />
        )}
      </AnimatePresence>
    </>
  );
}