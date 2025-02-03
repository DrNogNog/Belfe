import { motion } from 'framer-motion';
import { Eye, Smile, Heart, User, Scan } from 'lucide-react';


export function FilterMenu({ 
  onEyesClick,
  onLipClick,
  onCheeksClick,
  onFaceClick,
  // onRelaxationClick,
  // onGenerationClick
}: any) {
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