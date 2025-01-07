import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

const MINDFULNESS_PHRASES = [
  "Find a quiet and comfortable space, where you can sit or lie down without distractions. Close your eyes softly.",
  "Breathe in slowly, feel the cool air filling your lungs, expanding your chest and your belly. Let your body feel the breath as it nourishes you.",
  "Pause for a moment... feel the stillness in the air, the calmness in your being.",
  "Now, breathe out slowly, releasing the tension you may have been holding. Feel your body soften, your muscles relax, and your mind clear.",
  "With each inhale, feel yourself drawing in peace and calm. Let the air flow through you, cleansing your mind and body.",
  "Pause again... notice how your body feels in this stillness, in this calmness.",
  "As you exhale, release any worries or stress, letting them fade away like a gentle breeze.",
  "Now, continue with your natural breath, feeling your body deeply relax. With each breath in, feel more at peace. With each breath out, release anything that no longer serves you."
];

interface MindfulnessExerciseProps {
  onClose: () => void;
}

export function MindfulnessExercise({ onClose }: MindfulnessExerciseProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(-1);
  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (isExerciseActive && currentPhraseIndex < MINDFULNESS_PHRASES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentPhraseIndex(prev => prev + 1);
      }, 10000);
      return () => clearTimeout(timer);
    } else if (currentPhraseIndex === MINDFULNESS_PHRASES.length - 1) {
      const endTimer = setTimeout(() => {
        setIsExerciseActive(false);
        setCurrentPhraseIndex(-1);
      }, 10000);
      return () => clearTimeout(endTimer);
    }
  }, [currentPhraseIndex, isExerciseActive]);

  const startExercise = () => {
    setIsExerciseActive(true);
    setCurrentPhraseIndex(0);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsVideoLoaded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      {/* Background Video with Fallback */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Background */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            !isVideoLoaded || videoError ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 animate-gradient-shift" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>
        
        {/* Video Background */}
        {!videoError && (
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={handleVideoError}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
              ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source 
              src="https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4" 
              type="video/mp4"
            />
            <source 
              src="https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-and-palm-trees-1564-large.mp4" 
              type="video/mp4"
            />
          </video>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl mx-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <h2 className="text-2xl font-light text-white">Mindfulness Exercise</h2>
        </div>

        {/* Content */}
        <div className="min-h-[400px] flex items-center justify-center p-8">
          {!isExerciseActive ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="text-white/90 text-xl mb-8 font-light">
                Take a moment to center yourself with this guided mindfulness exercise.
              </p>
              <button
                onClick={startExercise}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-lg 
                  hover:bg-white/30 transition-colors text-lg font-light"
              >
                Begin Exercise
              </button>
            </motion.div>
          ) : (
            <div className="w-full max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhraseIndex}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 2,
                      ease: "easeOut"
                    }
                  }}
                  exit={{ 
                    opacity: 0,
                    y: -40,
                    transition: { 
                      duration: 2,
                      ease: "easeIn"
                    }
                  }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8"
                >
                  <p className="text-2xl text-white text-center leading-relaxed font-light">
                    {MINDFULNESS_PHRASES[currentPhraseIndex]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}