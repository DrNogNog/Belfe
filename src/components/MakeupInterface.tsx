// MakeupInterface.tsx
import { useState } from 'react';
import FaceMeshVideo from './facemesh/FaceMeshVideo';
import Menu from './Menu';
import { MirrorButton } from './MirrorButton';
import { LipstickColorProvider } from './lips/LipstickColorContext';
import { AnimatePresence } from 'framer-motion';

export function MakeupInterface() {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleMirrorClick = () => {
    console.log("Mirror button clicked");
  };

  return (
    <LipstickColorProvider>
      <div className="h-screen w-screen relative flex flex-col items-center">
        <FaceMeshVideo />
        <div className="absolute bottom-0 w-full flex flex-col items-center">
        <AnimatePresence>
          <Menu 
          />
        </AnimatePresence>
          <div className="mt-4">
            <MirrorButton onClick={handleMirrorClick} />
          </div>
        </div>
      </div>
    </LipstickColorProvider>
  );
}

