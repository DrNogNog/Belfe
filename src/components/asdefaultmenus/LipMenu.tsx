import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, Smile, Heart, User, Scan } from 'lucide-react';
import { LipstickMenu } from '../lips/LipstickMenu';
import { LipGlossMenu } from '../lips/LipGlossMenu';
import { LipOilMenu } from '../lips/LipOilMenu';
import { LipLinerMenu } from '../lips/LipLinerMenu';

type SubMenu = 'lipstick' | 'lipgloss' | 'lipoil' | 'lipliner' | null;

interface LipMenuProps {
  onBack: () => void;
  onEyesClick: () => void;
  onCheeksClick: () => void;
  onFaceClick: () => void;
  onRelaxationClick: () => void;
  onGenerationClick: () => void;
}

export function LipMenu({ 
  onBack,
  onEyesClick,
  onCheeksClick,
  onFaceClick,
  // onRelaxationClick,
  // onGenerationClick
}: LipMenuProps) {
  const [currentSubMenu, setCurrentSubMenu] = useState<SubMenu>(null);

  const handleBack = () => {
    if (currentSubMenu) {
      setCurrentSubMenu(null);
    } else {
      onBack();
    }
  };

  if (currentSubMenu) {
    switch (currentSubMenu) {
      case 'lipstick':
        return <LipstickMenu 
        onBack={() => setCurrentSubMenu(null)} 
        titlebrand="Lipstick"  // Title for Brand menu, 
      />;
      case 'lipgloss':
        return <LipGlossMenu 
          onBack={() => setCurrentSubMenu(null)} 
          titlebrand="Lip Gloss"  // Title for Lip Gloss menu
        />;
      case 'lipoil':
        return <LipOilMenu 
          onBack={() => setCurrentSubMenu(null)} 
          titlebrand="Lip Oil"  // Title for Lip Oil menu
        />;
      case 'lipliner':
        return <LipLinerMenu 
          onBack={() => setCurrentSubMenu(null)} 
          titlebrand="Lip Liner"  // Title for Lip Liner menu
        />;
    }
  }

  return (
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

          <div>
            <button
              onClick={handleBack}
              className="w-full flex items-center gap-2 text-lg mb-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="flex items-center gap-3">
                <Smile className="w-5 h-5" />
                <span>Lips</span>
              </div>
            </button>
            <div className="pl-12 space-y-2">
              <button
                onClick={() => setCurrentSubMenu('lipstick')}
                className="w-full text-left text-lg hover:text-white/80 transition-colors"
              >
                Lipstick
              </button>
              <button
                onClick={() => setCurrentSubMenu('lipgloss')}
                className="w-full text-left text-lg hover:text-white/80 transition-colors"
              >
                Lip Gloss
              </button>
              <button
                onClick={() => setCurrentSubMenu('lipoil')}
                className="w-full text-left text-lg hover:text-white/80 transition-colors"
              >
                Lip Oil
              </button>
              <button
                onClick={() => setCurrentSubMenu('lipliner')}
                className="w-full text-left text-lg hover:text-white/80 transition-colors"
              >
                Lip Liner
              </button>
            </div>
          </div>

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

          <div className="pt-4">
            <button className="w-full flex items-center gap-3 text-lg">
              <Scan className="w-5 h-5" />
              <span>Scan & Match</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}