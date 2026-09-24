'use client';

import React from 'react';
import { Doors } from './Doors';

interface CoverProps {
  isOpen: boolean;
  onTapOpen: () => void;
  onConfettiTrigger: () => void;
  onComplete: () => void;
}

export const Cover: React.FC<CoverProps> = (props) => {
  return <Doors {...props} />;
};
