import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Eye, Smile, Heart, User, Scan, Sparkles, Wand2, Wind, Brain, UserCircle } from 'lucide-react';
import { Profile } from '../profile/Profile';
import { MindfulnessMenu } from '../profile/trackers/mindfulness/MindfulnessMenu';
import { GuidedBreathing } from '../profile/trackers/breathing/GuidedBreathing';

interface RelaxationMenuProps {
  onBack: () => void;
  onEyesClick: () => void;
  onLipClick: () => void;
  onCheeksClick: () => void;
  onFaceClick: () => void;
  onGenerationClick: () => void;
}

export function RelaxationMenu({ 
  onBack,
  onEyesClick,
  onLipClick,
  onCheeksClick,
  onFaceClick,
  onGenerationClick
}: RelaxationMenuProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [showMindfulness, setShowMindfulness] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);

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

            <div>
              <button
                onClick={onBack}
                className="w-full flex items-center gap-2 text-lg mb-2"
              >
                <ChevronLeft className="w-5 h-5" />
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  <span>Relaxation & Profile</span>
                </div>
              </button>
              <div className="pl-12 space-y-2">
                <button 
                  onClick={() => setShowBreathing(true)}
                  className="w-full text-left text-lg hover:text-white/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Wind className="w-5 h-5" />
                    <span>Guided Breathing</span>
                  </div>
                </button>
                <button 
                  onClick={() => setShowMindfulness(true)}
                  className="w-full text-left text-lg hover:text-white/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5" />
                    <span>Mindfulness Exercise</span>
                  </div>
                </button>
                <button 
                  onClick={() => setShowProfile(true)}
                  className="w-full text-left text-lg hover:text-white/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <UserCircle className="w-5 h-5" />
                    <span>Profile</span>
                  </div>
                </button>
              </div>
            </div>

            <button 
              onClick={onGenerationClick}
              className="w-full flex items-center justify-between text-lg"
            >
              <div className="flex items-center gap-3">
                <Wand2 className="w-5 h-5" />
                <span>Generation</span>
              </div>
              <span className="text-xl opacity-60">›</span>
            </button>

            <div className="pt-4">
              <button className="w-full flex items-center gap-3 text-lg">
                <Scan className="w-5 h-5" />
                <span>Scan & Match</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showProfile && (
          <Profile 
            isOpen={showProfile} 
            onClose={() => setShowProfile(false)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMindfulness && (
          <MindfulnessMenu onClose={() => setShowMindfulness(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBreathing && (
          <GuidedBreathing onClose={() => setShowBreathing(false)} />
        )}
      </AnimatePresence>
    </>
  );
}