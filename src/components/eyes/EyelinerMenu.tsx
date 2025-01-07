import React from 'react';
import { MakeupOptionsMenu } from '../shared/MakeupOptionsMenu';
import { eyelinerProducts } from './products/eyelinerProducts';

interface EyelinerMenuProps {
  onBack: () => void;
}

export function EyelinerMenu({ onBack }: EyelinerMenuProps) {
  return (
    <MakeupOptionsMenu 
      title="Eyeliner"
      onBack={onBack}
      products={eyelinerProducts}
    />
  );
}