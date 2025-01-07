import { MakeupOptionsMenu } from '../shared/MakeupOptionsMenu';
import { eyeshadowProducts } from './products/eyeshadowProducts';

interface EyeshadowMenuProps {
  onBack: () => void;
}

export function EyeshadowMenu({ onBack }: EyeshadowMenuProps) {
  return (
    <MakeupOptionsMenu 
      title="Eyeshadow"
      onBack={onBack}
      products={eyeshadowProducts}
    />
  );
}