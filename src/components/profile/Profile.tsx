import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProfileModal } from './ProfileModal';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Profile({ isOpen, onClose }: ProfileProps) {
  return (
    <AnimatePresence>
      {isOpen && <ProfileModal onClose={onClose} />}
    </AnimatePresence>
  );
}