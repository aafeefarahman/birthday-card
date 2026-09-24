'use client';

import React from 'react';

interface ConfettiCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({ canvasRef }) => {
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
};
