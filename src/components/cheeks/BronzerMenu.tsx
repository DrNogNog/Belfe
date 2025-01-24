import { MakeupOptionsMenu } from '../shared/MakeupOptionsMenu';
import { bronzerProducts } from './products/bronzerProducts';

interface BronzerMenuProps {
  onBack: () => void;
}

export function BronzerMenu({ onBack }: BronzerMenuProps) {
  return (
    <MakeupOptionsMenu 
      title="Bronzer"
      onBack={onBack}
      products={bronzerProducts}
    />
  );
}