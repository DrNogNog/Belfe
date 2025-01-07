import React from 'react';
import { MakeupOptionsMenu } from '../shared/MakeupOptionsMenu';
import { concealerProducts } from './products/concealerProducts';

interface ConcealerMenuProps {
  onBack: () => void;
}

export function ConcealerMenu({ onBack }: ConcealerMenuProps) {
  return (
    <MakeupOptionsMenu 
      title="Concealer"
      onBack={onBack}
      products={concealerProducts}
    />
  );
}