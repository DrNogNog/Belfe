import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, Smile, Heart, User, Scan, Sparkles, Wand2 } from 'lucide-react';
import { MascaraMenu } from '../eyes/MascaraMenu';
import { EyeshadowMenu } from '../eyes/EyeshadowMenu';
import { EyelinerMenu } from '../eyes/EyelinerMenu';

interface EyesMenuProps {
  onBack: () => void;
  onLipClick: () => void;
  onCheeksClick: () => void;
  onFaceClick: () => void;
  onRelaxationClick: () => void;
  onGenerationClick: () => void;
}

type SubMenu = 'mascara' | 'eyeshadow' | 'eyeliner' | null;

export function EyesMenu({ 
  onBack,
  onLipClick,
  onCheeksClick,
  onFaceClick,
  onRelaxationClick,
  onGenerationClick
}: EyesMenuProps) {
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
      case 'mascara':
        return <MascaraMenu onBack={handleBack} />;
      case 'eyeshadow':
        return <EyeshadowMenu onBack={handleBack} />;
      case 'eyeliner':
        return <EyelinerMenu onBack={handleBack} />;
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
          <div>
            <button
              onClick={handleBack}
              className="w-full flex items-center gap-2 text-lg mb-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5" />
                <span>Eyes</span>
              </div>
            </button>
            <div className="pl-12 space-y-2">
              <button
                onClick={() => setCurrentSubMenu('mascara')}
                className="w-full text-left text-lg hover:text-white/80 transition-colors"
              >
                Mascara
              </button>
              <button
                onClick={() => setCurrentSubMenu('eyeshadow')}
                className="w-full text-left text-lg hover:text-white/80 transition-colors"
              >
                Eyeshadow
              </button>
              <button
                onClick={() => setCurrentSubMenu('eyeliner')}
                className="w-full text-left text-lg hover:text-white/80 transition-colors"
              >
                Eyeliner
              </button>
            </div>
          </div>

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