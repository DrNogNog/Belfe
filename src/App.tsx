import React, { useState } from 'react';
import { MakeupInterface } from './components/MakeupInterface';
import { MirrorRipple } from './components/effects/MirrorRipple';

export default function App() {
  const [showMakeup, setShowMakeup] = useState(false);

  const handleClick = () => {
    setShowMakeup(true);
  };

  return (
    <div 
      className="min-h-screen bg-[#100F0F] text-white"
      onClick={handleClick}
    >
      {!showMakeup && <MirrorRipple isActive={true} />}
      {showMakeup && <MakeupInterface/>}
    </div>
  );
}