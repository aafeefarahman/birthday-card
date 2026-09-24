'use client';

import React, { useState } from 'react';
import { MobileContainer } from '@/components/MobileContainer';
import { Doors } from '@/components/Doors';
import { ScrollableLetter } from '@/components/ScrollableLetter';
import { AudioPlayer } from '@/components/AudioPlayer';
import { ConfettiCanvas } from '@/components/ConfettiCanvas';
import { useConfetti } from '@/hooks/useConfetti';

export default function BirthdayCardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);

  const {
    canvasRef,
    fireOpeningBurst,
    fireSparkleBurst,
    firePetalDrift,
    fireFinaleSequence,
    fireTapBurst,
    clearTimers,
  } = useConfetti();

  const handleTapOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleDoorsComplete = () => {
    setIsFullyOpen(true);
  };

  const handleReplay = () => {
    clearTimers();
    setIsOpen(false);
    setIsFullyOpen(false);
  };

  const handleTapCard = (clientX: number, clientY: number) => {
    if (isOpen) {
      fireTapBurst(clientX, clientY);
    }
  };

  return (
    <MobileContainer>
      {/* Full screen canvas for canvas-confetti (pointer-events: none) */}
      <ConfettiCanvas canvasRef={canvasRef} />

      {/* Audio player toggle button */}
      <AudioPlayer />

      {/* Main Card Viewport */}
      <div className="relative w-full h-full">
        {/* CONTINUOUS SCROLLABLE LETTER (Revealed behind doors) */}
        {isOpen && (
          <ScrollableLetter
            isOpen={isOpen}
            onSparkleConfetti={fireSparkleBurst}
            onPetalConfetti={firePetalDrift}
            onFinaleConfetti={fireFinaleSequence}
            onTapCard={handleTapCard}
            onReplay={handleReplay}
          />
        )}

        {/* 3D GATEFOLD DOORS OVERLAY */}
        <Doors
          isOpen={isOpen}
          onTapOpen={handleTapOpen}
          onConfettiTrigger={fireOpeningBurst}
          onComplete={handleDoorsComplete}
        />
      </div>
    </MobileContainer>
  );
}
