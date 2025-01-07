import React from 'react';
import { MakeupOptionsMenu } from '../shared/MakeupOptionsMenu';
import { mascaraProducts } from './products/mascaraProducts';

interface MascaraMenuProps {
  onBack: () => void;
}

export function MascaraMenu({ onBack }: MascaraMenuProps) {
  return (
    <MakeupOptionsMenu 
      title="Mascara"
      onBack={onBack}
      products={mascaraProducts}
    />
  );
}