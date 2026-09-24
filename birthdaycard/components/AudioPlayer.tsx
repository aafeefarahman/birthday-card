'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const playSoftAmbientNotes = () => {
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const freqs = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];

    const playNote = () => {
      if (!ctx || ctx.state !== 'running') return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = freqs[Math.floor(Math.random() * freqs.length)];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 3.6);
    };

    playNote();
    timerRef.current = setInterval(playNote, 2200);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.suspend();
      setIsPlaying(false);
    } else {
      playSoftAmbientNotes();
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed top-4 right-4 z-40 w-10 h-10 rounded-xs bg-[#F3E7D0]/90 backdrop-blur-md text-[#4A3426] border border-[#8B6B4A]/50 flex items-center justify-center shadow-md hover:bg-[#E8D5B0] transition-all focus:outline-none"
      aria-label="Toggle soft ambient music"
      title={isPlaying ? 'Mute ambient sound' : 'Play soft ambient sound'}
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-[#7A1226] animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4 opacity-70" />
      )}
    </button>
  );
};
