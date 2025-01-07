// LipstickColorContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface LipstickColorContextType {
  lipstickColor: string | null;
  setLipstickColor: (color: string) => void;
}

const LipstickColorContext = createContext<LipstickColorContextType | undefined>(undefined);

export const useLipstickColor = () => {
  const context = useContext(LipstickColorContext);
  if (!context) {
    throw new Error('useLipstickColor must be used within a LipstickColorProvider');
  }
  return context;
};

// Fixing typing for children
export const LipstickColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lipstickColor, setLipstickColor] = useState<string | null>(null);

  return (
    <LipstickColorContext.Provider value={{ lipstickColor, setLipstickColor }}>
      {children}
    </LipstickColorContext.Provider>
  );
};
