import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, Smile, Heart, User, Scan, Sparkles, Wand2 } from 'lucide-react';
import { BlushMenu } from "../cheeks/BlushMenu";
import { HighlighterMenu } from '../cheeks/HighlighterMenu';
import { BronzerMenu } from '../cheeks/BronzerMenu';

interface CheeksMenuProps {
  onBack: () => void;
  onEyesClick: () => void;
  onLipClick: () => void;
  onFaceClick: () => void;
  onRelaxationClick: () => void;
  onGenerationClick: () => void;
}

type SubMenu = 'blush' | 'highlighter' | 'bronzer' | null;

export function CheeksMenu({ 
  onBack,
  onEyesClick,
  onLipClick,
  onFaceClick,
  onRelaxationClick,
  onGenerationClick
}: CheeksMenuProps) {
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
      case 'blush':
        return <BlushMenu onBack={handleBack} />;
      case 'highlighter':
        return <HighlighterMenu onBack={handleBack} />;
      case 'bronzer':
        return <BronzerMenu onBack={handleBack} />;
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

          <div>
            <button
              onClick={handleBack}
              className="w-full flex items-center gap-2 text-lg mb-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5" />
                <span>Cheeks</span>
              </div>
            </button>
            <div className="pl-12 space-y-2">
              <button
                onClick={() => setCurrentSubMenu('blush')}
                className="w-full text-left text-lg hover:text-white/80 transition-colors"
              >
                Blush
              </button>
              <button
                onClick={() => setCurrentSubMenu('highlighter')}
                className="w-full text-left text-lg hover:text-white/80 transition-colors"
              >
                Highlighter
              </button>
              <button
                onClick={() => setCurrentSubMenu('bronzer')}
                className="w-full text-left text-lg hover:text-white/80 transition-colors"
              >
                Bronzer
              </button>
            </div>
          </div>

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
  );
}