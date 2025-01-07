import React from 'react';
import { MakeupOptionsMenu } from '../shared/MakeupOptionsMenu';
import { foundationProducts } from './products/foundationProducts';

interface FoundationMenuProps {
  onBack: () => void;
}

export function FoundationMenu({ onBack }: FoundationMenuProps) {
  return (
    <MakeupOptionsMenu 
      title="Foundation"
      onBack={onBack}
      products={foundationProducts}
    />
  );
}