import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, VolumeX } from 'lucide-react'; // Import icons
import firstVideo from './first.mp4';
import secondVideo from './second.mp4';
import thirdVideo from './third.mp4';

const VIDEO_SOURCES = [
  firstVideo,
  secondVideo,
  thirdVideo
];

const BREATHING_INSTRUCTIONS = [
  {
    text: "Inhale deeply through your nose.",
    textVoice: "Inhale... deeply through your nose.",
    duration: 4000
  },
  {
    text: "Hold for a moment...",
    textVoice: "..Hold... for a moment...",
    duration: 2000
  },
  {
    text: "Exhale slowly through your mouth.",
    textVoice: "...Exhale... slowly through your mouth.",
    duration: 4000
  },
  {
    text: "Pause and relax.",
    textVoice: "...Pause. and... relax.",
    duration: 3000
  },
  {
    text: "Inhale again, slowly and deeply.",
    textVoice: "Inhale again,... slowly and deeply.",
    duration: 4000
  },
  {
    text: "Exhale gently, releasing all tension.",
    textVoice: "..Exhale... gently,... releasing all tension.",
    duration: 4000
  }
];

interface GuidedBreathingProps {
  onClose: () => void;
}

export function GuidedBreathing({ onClose }: GuidedBreathingProps) {
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(-1);
  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // State to control mute
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSpeechPlaying, setIsSpeechPlaying] = useState(false); // To track if speech is playing
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null); // Store speech utterance

  // Function to play the speech for the current instruction
  const playInstructionVoice = (text: string) => {
    if (isMuted || isSpeechPlaying) return; // Skip speaking if muted or already speaking

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.8 ** 1.3; // Higher pitch for a cuter voice
    utterance.rate = 0.7 ** 1.2;  // Slightly faster for a playful tone
    utterance.volume = 0.95;  // Set volume level

    utterance.onstart = () => {
      setIsSpeechPlaying(true);
    };

    utterance.onend = () => {
      setIsSpeechPlaying(false);
    };

    // If the speech is muted, cancel the utterance immediately
    if (isMuted) {
      speechSynthesis.cancel();
      setIsSpeechPlaying(false);
    } else {
      speechSynthesis.speak(utterance);
      setSpeechUtterance(utterance); // Store the utterance to potentially cancel it later
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the muted property stays consistent on video change
    video.muted = isMuted; // Apply the muted state to the video element

    const handleEnded = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % VIDEO_SOURCES.length);
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [currentVideoIndex, isMuted]); // Add isMuted to dependencies to keep it updated

  useEffect(() => {
    if (isExerciseActive) {
      let timeoutId: NodeJS.Timeout;

      const runInstruction = (index: number) => {
        if (index < BREATHING_INSTRUCTIONS.length) {
          if (!isMuted) {
            setCurrentInstructionIndex(index);
            playInstructionVoice(BREATHING_INSTRUCTIONS[index].textVoice); // Play voice instruction
          }
          timeoutId = setTimeout(() => {
            runInstruction(index + 1);
          }, BREATHING_INSTRUCTIONS[index].duration);
        } else {
          runInstruction(0); // Loop back to the first instruction
        }
      };

      runInstruction(0); // Start from the first instruction

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isExerciseActive, isMuted]); // Include isMuted to ensure loop stops when muted

  const startExercise = () => {
    setIsExerciseActive(true);
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMutedState = !prev;

      // Apply mute to video
      if (videoRef.current) {
        videoRef.current.muted = newMutedState; // Mute/unmute the video
      }

      // If muted, stop ongoing speech
      if (newMutedState) {
        speechSynthesis.cancel(); // Cancel any ongoing speech synthesis
        setIsSpeechPlaying(false); // Set speech playing flag to false
      }

      return newMutedState;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-8"
      style={{
        background: "linear-gradient(135deg, #A2C2E4, #D5A8D2, #A4D3A7)", // Soft gradient background outside
        backgroundSize: "cover"
      }}
    >
      {/* Video Container with Frame */}
      <div className="relative w-full max-w-[1920px] bg-black rounded-xl overflow-hidden shadow-2xl border-8 border-white">

        {/* 16:9 Aspect Ratio Container */}
        <div className="relative w-full pt-[56.25%]">
          {/* Video */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              key={currentVideoIndex}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={VIDEO_SOURCES[currentVideoIndex]} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          </div>

          {/* Content Container */}
          <div className="absolute inset-0 flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 p-6">
              <button
                onClick={onClose}
                className="bg-white-200 hover:bg-green-600 p-1"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <h2 className="text-2xl font-light text-pink">Guided Breathing</h2>
            </div>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 bg-blue-500 p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-black" /> // Icon color is black when muted
              ) : (
                <Volume2 className="w-6 h-6 text-black" /> // Icon color is black when not muted
              )}
            </button>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-8">
              {!isExerciseActive ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="font-medium p-8 bg-blue-700 text-xl mb-8 font-light rounded-md">
                    Take a moment to breathe and find your center.
                  </p>
                  <button
                    onClick={startExercise}
                    className="font-medium px-20 py-4 bg-white/20 backdrop-blur-sm bg-pink-200 rounded-lg 
            hover:bg-green-500 transition-colors text-lg font-light text-blue-500"
                  >
                    Begin Breathing Exercise
                  </button>
                </motion.div>
              ) : (
                <div className="relative w-full max-w-4xl mx-4 bg-blue-200 rounded-lg p-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentInstructionIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          duration: 1,
                          ease: "easeOut"
                        }
                      }}
                      exit={{ 
                        opacity: 0,
                        y: -20,
                        transition: { 
                          duration: 1,
                          ease: "easeIn"
                        }
                      }}
                      className="relative"
                    >
                      {/* Breathing Circle Animation */}
                      <motion.div
                        animate={{
                          scale: currentInstructionIndex === 0 || currentInstructionIndex === 4 ? 1.5 : 1,
                          opacity: currentInstructionIndex === 2 || currentInstructionIndex === 5 ? 0.5 : 1
                        }}
                        transition={{
                          duration: BREATHING_INSTRUCTIONS[currentInstructionIndex]?.duration / 1000 || 4,
                          ease: "easeInOut"
                        }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 
                          bg-white/10 backdrop-blur-md rounded-full -z-10"
                      />

                      {/* Instruction Text */}
                      <div className="bg-blue-200 backdrop-blur-md rounded-2xl p-8 text-center">
                        <p className="text-2xl font-semibold text-pink-400 leading-relaxed font-light">
                          {BREATHING_INSTRUCTIONS[currentInstructionIndex]?.text}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
