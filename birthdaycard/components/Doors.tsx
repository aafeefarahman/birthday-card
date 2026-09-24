'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { CoverFallingPetals } from './CoverFallingPetals';

interface DoorsProps {
  isOpen: boolean;
  onTapOpen: () => void;
  onConfettiTrigger: () => void;
  onComplete: () => void;
}

export const Doors: React.FC<DoorsProps> = ({
  isOpen,
  onTapOpen,
  onConfettiTrigger,
  onComplete,
}) => {
  const leftDoorControls = useAnimationControls();
  const rightDoorControls = useAnimationControls();
  const shadowControls = useAnimationControls();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Subtle 3D tilt when closed
  useEffect(() => {
    if (isOpen) return;

    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 6;
      const y = (e.clientY / innerHeight - 0.5) * -6;
      setTilt({ x, y });
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.min(Math.max(e.gamma / 5, -8), 8);
        const y = Math.min(Math.max(e.beta / 10, -8), 8);
        setTilt({ x, y });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [isOpen]);

  // Open sequence timeline
  useEffect(() => {
    if (!isOpen) {
      leftDoorControls.set({ rotateY: 0 });
      rightDoorControls.set({ rotateY: 0 });
      shadowControls.set({ opacity: 0 });
      return;
    }

    let confettiFired = false;
    // Fired when doors pass ~50 degrees open (~700ms into sequence)
    const confettiTimer = setTimeout(() => {
      if (!confettiFired) {
        confettiFired = true;
        onConfettiTrigger();
      }
    }, 700);

    const runSequence = async () => {
      await new Promise((r) => setTimeout(r, 200));

      shadowControls.start({
        opacity: [0, 0.75, 0.95],
        transition: { duration: 1.8, ease: 'easeOut' },
      });

      await Promise.all([
        leftDoorControls.start({
          rotateY: -115,
          transition: { duration: 1.8, ease: [0.25, 1, 0.5, 1] },
        }),
        rightDoorControls.start({
          rotateY: 115,
          transition: { duration: 1.8, ease: [0.25, 1, 0.5, 1] },
        }),
      ]);

      onComplete();
    };

    runSequence();

    return () => clearTimeout(confettiTimer);
  }, [isOpen, leftDoorControls, rightDoorControls, shadowControls, onConfettiTrigger, onComplete]);

  return (
    <>
      {/* DRIFTING PETALS ON COVER OPEN */}
      <CoverFallingPetals isOpen={isOpen} />

      <div
        className={`absolute inset-0 w-full h-full ${
          isOpen ? 'pointer-events-none z-0' : 'pointer-events-auto z-20'
        }`}
        style={{ perspective: '1200px' }}
        onClick={!isOpen ? onTapOpen : undefined}
      >
        {/* 3D Tilt Wrapper */}
        <motion.div
          className="w-full h-full relative transform-gpu cursor-pointer"
          animate={
            isOpen
              ? { rotateX: 0, rotateY: 0 }
              : { rotateX: tilt.y, rotateY: tilt.x }
          }
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* LEFT DOOR (0% to 50%) */}
          <motion.div
            className="absolute inset-0 w-full h-full overflow-hidden shadow-2xl transform-gpu"
            style={{
              clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)',
              transformOrigin: '0% 50%',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
            animate={leftDoorControls}
            initial={{ rotateY: 0 }}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/cover.jpeg?v=3)' }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_60%,_rgba(30,20,13,0.3)_100%)] pointer-events-none" />

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/80 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={shadowControls}
            />
          </motion.div>

          {/* RIGHT DOOR (50% to 100%) */}
          <motion.div
            className="absolute inset-0 w-full h-full overflow-hidden shadow-2xl transform-gpu"
            style={{
              clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
              transformOrigin: '100% 50%',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
            animate={rightDoorControls}
            initial={{ rotateY: 0 }}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/cover.jpeg?v=3)' }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_60%,_rgba(30,20,13,0.3)_100%)] pointer-events-none" />

            <motion.div
              className="absolute inset-0 bg-gradient-to-l from-transparent via-black/40 to-black/80 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={shadowControls}
            />
          </motion.div>

          {/* Typewriter "tap to open" label */}
          {!isOpen && (
            <motion.div
              className="absolute top-[71%] left-[50%] -translate-x-1/2 z-40 text-center pointer-events-none w-max"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: [0.4, 0.95, 0.4], y: 0 }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="font-special text-[11px] uppercase tracking-[0.2em] text-[#3c2817] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] px-3.5 py-1 bg-[#F5EFE6]/80 rounded-xs border border-[#8B6B4A]/50 backdrop-blur-xs shadow-sm">
                ✦ tap to open ✦
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};
