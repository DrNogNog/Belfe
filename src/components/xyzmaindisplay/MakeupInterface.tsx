// MakeupInterface.tsx
import FaceMeshVideo from '../facemesh/FaceMeshVideo';
import Menu from '../Menu';
import { MirrorButton, MakeupButton } from './MirrorButton';
import { LipstickColorProvider } from '../lips/LipstickColorContext';
import { AnimatePresence } from 'framer-motion';
import { Calendar } from './Calendar';
import { Clock } from './Clock';
import { Weather } from './Weather';
import { useState } from 'react';

export function MakeupInterface() {
  const [isMakeupActive, setIsMakeupActive] = useState(false); // State to track if makeup is active

  const handleMakeupButtonClick = () => {
    setIsMakeupActive(true); // Activate makeup menu
  };

  const handleMirrorClick = () => {
    setIsMakeupActive(false); // Go back to the initial screen
  };

  return (
    <LipstickColorProvider>
      <div className="h-screen w-screen relative flex flex-col items-center">
      {/* Initial Screen */}
      {!isMakeupActive && (
        <>
          {/* Clock */}
          <div className="absolute top-0 mt-4 left-[23px] top-[25px]">
            <Clock />
          </div>
          {/* Calendar */}
          <div className="absolute top-[143px] mt-4 left-[23px]">
            <Calendar />
          </div>
          <div className="left-[1000px]">
            <Weather />
          </div>
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-row">
            <div className="absolute left-[30px]">
            <MirrorButton onClick={handleMirrorClick} />
            </div>
            <div className="absolute right-[30px]">
            <MakeupButton onClicktw={handleMakeupButtonClick} />
            </div>
            </div>
          </div>
        </>
      )}

      {/* Active Makeup Screen */}
      {isMakeupActive && (
        <>
          <FaceMeshVideo />
          <div className="absolute bottom-0 w-full flex flex-col items-center">
            <AnimatePresence>
              <Menu />
            </AnimatePresence>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <MirrorButton onClick={handleMirrorClick} />
              {/* MakeupButton is hidden when makeup menu is active */}
            </div>
          </div>
        </>
      )}
    </div>
    </LipstickColorProvider>
  );
}

