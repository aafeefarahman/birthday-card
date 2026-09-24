'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [overrideDesktop, setOverrideDesktop] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/cover.jpeg?v=3';
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true);

    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 520);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 w-full h-[100dvh] bg-[#1E140D] flex flex-col items-center justify-center space-y-4 text-[#F3E7D0]">
        <div className="w-9 h-9 border-2 border-[#7A1226] border-t-transparent rounded-full animate-spin" />
        <p className="font-special text-xs uppercase tracking-[0.2em] text-[#8B6B4A]">
          Preparing card...
        </p>
      </div>
    );
  }

  // Desktop view notice
  if (isDesktop && !overrideDesktop) {
    return (
      <div className="fixed inset-0 w-full h-[100dvh] bg-[#140D08] text-[#F3E7D0] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-sm parchment-bg p-8 rounded-xs border border-[#8B6B4A]/50 shadow-2xl flex flex-col items-center space-y-5 text-[#4A3426]">
          <div className="w-14 h-14 rounded-xs bg-[#7A1226]/15 border border-[#7A1226]/40 flex items-center justify-center text-[#7A1226]">
            <Smartphone className="w-7 h-7 animate-bounce" />
          </div>
          <h2 className="text-2xl font-pinyon font-bold text-[#7A1226]">
            Please open on your phone 📱
          </h2>
          <p className="text-base font-fell text-[#4A3426] leading-relaxed">
            This vintage card is handcrafted exclusively for mobile screens for the warmest experience.
          </p>
          <button
            onClick={() => setOverrideDesktop(true)}
            className="mt-2 px-5 py-2 rounded-xs bg-[#7A1226] text-[#F3E7D0] font-special text-xs uppercase tracking-[0.15em] border border-[#7A1226] shadow-md hover:bg-[#9b182e] transition-colors"
          >
            Preview Mobile View Here
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-[#140D08] flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-[430px] min-w-[360px] h-[100dvh] overflow-hidden bg-[#1E140D] shadow-2xl">
        {children}
      </div>
    </div>
  );
};
