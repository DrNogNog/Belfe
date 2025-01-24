import { MakeupOptionsMenu } from '../shared/MakeupOptionsMenu';
import { highlighterProducts } from './products/highlighterProducts';

interface HighlighterMenuProps {
  onBack: () => void;
}

export function HighlighterMenu({ onBack }: HighlighterMenuProps) {
  return (
    <MakeupOptionsMenu 
      title="Highlighter"
      onBack={onBack}
      products={highlighterProducts}
    />
  );
}