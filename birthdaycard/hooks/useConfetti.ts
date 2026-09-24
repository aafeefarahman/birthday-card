'use client';

import { useCallback, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { PALETTE } from '@/content';

export function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiInstanceRef = useRef<confetti.CreateTypes | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Ensure canvas dimensions match viewport
    const updateSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: false,
    });
    confettiInstanceRef.current = myConfetti;

    return () => {
      window.removeEventListener('resize', updateSize);
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
      if (confettiInstanceRef.current) {
        confettiInstanceRef.current.reset();
      }
    };
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    if (confettiInstanceRef.current) {
      confettiInstanceRef.current.reset();
    }
  }, []);

  const checkReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    console.log('[Confetti] prefers-reduced-motion:', isReduced);
    return isReduced;
  }, []);

  // Helper to shoot confetti using custom instance or global fallback
  const shootConfetti = useCallback((options: confetti.Options) => {
    if (confettiInstanceRef.current) {
      confettiInstanceRef.current(options);
    } else {
      confetti(options);
    }
  }, []);

  const fireOpeningBurst = useCallback(() => {
    console.log('[Confetti Trigger] Opening Burst');
    const isReduced = checkReducedMotion();

    if (isReduced) {
      shootConfetti({
        particleCount: 60,
        spread: 60,
        origin: { x: 0.5, y: 0.7 },
        colors: PALETTE,
      });
      return;
    }

    // Left cannon
    shootConfetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0.1, y: 0.85 },
      colors: PALETTE,
      startVelocity: 45,
      gravity: 0.8,
      drift: 0.2,
      scalar: 1.1,
    });

    // Right cannon
    shootConfetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 0.9, y: 0.85 },
      colors: PALETTE,
      startVelocity: 45,
      gravity: 0.8,
      drift: -0.2,
      scalar: 1.1,
    });
  }, [checkReducedMotion, shootConfetti]);

  const fireSparkleBurst = useCallback(() => {
    console.log('[Confetti Trigger] Sparkle Burst ("Allah aapko Arsh ke rang lagaye")');
    const isReduced = checkReducedMotion();

    if (isReduced) {
      shootConfetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.5 },
        colors: PALETTE,
      });
      return;
    }

    shootConfetti({
      particleCount: 40,
      spread: 75,
      origin: { x: 0.5, y: 0.45 },
      colors: PALETTE,
      startVelocity: 25,
      gravity: 0.6,
      scalar: 1.0,
      ticks: 200,
    });
  }, [checkReducedMotion, shootConfetti]);

  const firePetalDrift = useCallback(() => {
    console.log('[Confetti Trigger] Petal Drift ("run to me.")');
    const isReduced = checkReducedMotion();

    if (isReduced) {
      shootConfetti({
        particleCount: 20,
        origin: { y: 0.3 },
        colors: ['#EFE4CF', '#B87A8F', '#F5EFE6'],
      });
      return;
    }

    shootConfetti({
      particleCount: 30,
      angle: 90,
      spread: 85,
      origin: { x: 0.5, y: 0.3 },
      colors: ['#EFE4CF', '#B87A8F', '#F5EFE6', '#7A1226', '#C9A24A'],
      startVelocity: 15,
      gravity: 0.4,
      drift: 0.1,
      scalar: 0.9,
      ticks: 250,
    });
  }, [checkReducedMotion, shootConfetti]);

  const fireFinaleSequence = useCallback(() => {
    console.log('[Confetti Trigger] 3-Wave Finale ("Happy Birthday, Choti Diiiiiiiiiiiiiii")');
    clearTimers();

    const isReduced = checkReducedMotion();
    if (isReduced) {
      shootConfetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.5 },
        colors: PALETTE,
      });
      return;
    }

    // Wave 1: Side cannons
    shootConfetti({
      particleCount: 75,
      angle: 60,
      spread: 70,
      origin: { x: 0.05, y: 0.8 },
      colors: PALETTE,
      startVelocity: 55,
    });
    shootConfetti({
      particleCount: 75,
      angle: 120,
      spread: 70,
      origin: { x: 0.95, y: 0.8 },
      colors: PALETTE,
      startVelocity: 55,
    });

    // Wave 2: Top-down rain for 5 seconds
    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      shootConfetti({
        particleCount: 3,
        angle: 90,
        spread: 120,
        origin: { x: Math.random(), y: -0.1 },
        colors: PALETTE,
        startVelocity: 15,
        gravity: 0.7,
        drift: Math.random() * 0.4 - 0.2,
        ticks: 300,
      });

      if (Date.now() < end) {
        const timer = setTimeout(frame, 120);
        timersRef.current.push(timer);
      }
    };
    frame();

    // Wave 3: Heart & gold burst at 3 seconds
    const wave3Timer = setTimeout(() => {
      shootConfetti({
        particleCount: 60,
        spread: 100,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#7A1226', '#C9A24A', '#F5EFE6', '#B87A8F'],
        startVelocity: 35,
        gravity: 0.5,
        scalar: 1.2,
      });
    }, 3000);
    timersRef.current.push(wave3Timer);
  }, [clearTimers, checkReducedMotion, shootConfetti]);

  const fireTapBurst = useCallback(
    (clientX: number, clientY: number) => {
      console.log('[Confetti Trigger] Mini Tap Burst at', clientX, clientY);
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;

      shootConfetti({
        particleCount: 15,
        spread: 60,
        origin: { x, y },
        colors: PALETTE,
        startVelocity: 20,
        gravity: 0.9,
        scalar: 0.8,
        ticks: 120,
      });
    },
    [shootConfetti]
  );

  return {
    canvasRef,
    fireOpeningBurst,
    fireSparkleBurst,
    firePetalDrift,
    fireFinaleSequence,
    fireTapBurst,
    clearTimers,
  };
}
