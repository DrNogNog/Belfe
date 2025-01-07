import React from 'react';
import { MakeupOptionsMenu } from '../shared/MakeupOptionsMenu';
import { settingPowderProducts } from './products/settingPowderProducts';

interface SettingPowderMenuProps {
  onBack: () => void;
}

export function SettingPowderMenu({ onBack }: SettingPowderMenuProps) {
  return (
    <MakeupOptionsMenu 
      title="Setting Powder"
      onBack={onBack}
      products={settingPowderProducts}
    />
  );
}