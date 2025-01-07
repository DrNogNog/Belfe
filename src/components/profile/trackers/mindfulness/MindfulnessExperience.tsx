import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { QuoteBox } from './QuoteBox';
import { AudioControl } from './AudioControl';
import { mindfulnessThemes } from './themes/mindfulnessThemes';

interface MindfulnessExperienceProps {
  themeId: string;
  quotes: string[];
  onClose: () => void;
}

export function MindfulnessExperience({ themeId, quotes, onClose }: MindfulnessExperienceProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(-1);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const theme = mindfulnessThemes.find(t => t.id === themeId)!;

  useEffect(() => {
    if (isActive) {
      let timeoutId: NodeJS.Timeout;
      
      const showNextQuote = (index: number) => {
        if (index < quotes.length) {
          setCurrentQuoteIndex(index);
          timeoutId = setTimeout(() => {
            showNextQuote(index + 1);
          }, 8000); // Each quote shows for 8 seconds
        } else {
          showNextQuote(0); // Loop back to start
        }
      };

      showNextQuote(0);
      return () => clearTimeout(timeoutId);
    }
  }, [isActive, quotes]);

  const handleStart = () => {
    setIsActive(true);
    if (videoRef.current) videoRef.current.play();
    if (audioRef.current) audioRef.current.play();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) audioRef.current.muted = !isMuted;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-8"
    >
      <div className="relative w-full max-w-[1920px] bg-black rounded-xl overflow-hidden shadow-2xl">
        <div className="relative w-full pt-[56.25%]">
          {/* Video Background */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={theme.videoUrl} type="video/mp4" />
            </video>
            <audio
              ref={audioRef}
              loop
              src={theme.audioUrl}
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white p-1"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <h2 className="text-2xl font-light text-white">{theme.title}</h2>
              </div>
              <AudioControl isMuted={isMuted} onToggleMute={toggleMute} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-8">
              {!isActive ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-white/90 text-xl mb-8 font-light">
                    {theme.description}
                  </p>
                  <button
                    onClick={handleStart}
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-lg 
                      hover:bg-white/30 transition-colors text-lg font-light"
                  >
                    Begin Experience
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  {currentQuoteIndex >= 0 && (
                    <QuoteBox quote={quotes[currentQuoteIndex]} />
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}