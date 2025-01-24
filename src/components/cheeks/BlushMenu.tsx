import { MakeupOptionsMenu } from '../shared/MakeupOptionsMenu';
import { blushProducts } from './products/blushProducts';

interface BlushMenuProps {
  onBack: () => void;
}

export function BlushMenu({ onBack }: BlushMenuProps) {
  return (
    <MakeupOptionsMenu 
      title="Blush"
      onBack={onBack}
      products={blushProducts}
    />
  );
}