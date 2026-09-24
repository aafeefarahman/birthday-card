'use client';

import React, { useState, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageContent } from '@/content';
import { ChevronRight, RotateCcw } from 'lucide-react';

interface LetterPageProps {
  pages: PageContent[];
  currentPageIndex: number;
  onNextPage: () => void;
  onReplay: () => void;
  onTapCard: (clientX: number, clientY: number) => void;
}

export const LetterPage: React.FC<LetterPageProps> = ({
  pages,
  currentPageIndex,
  onNextPage,
  onReplay,
  onTapCard,
}) => {
  const currentPage = pages[currentPageIndex];
  const isFinalPage = currentPageIndex === pages.length - 1;
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Swipe up detection
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientY;
    const diffY = touchStart - touchEnd;

    if (diffY > 40 && !isFinalPage) {
      onNextPage();
    }
    setTouchStart(null);
  };

  const handleClickCard = (e: React.MouseEvent) => {
    onTapCard(e.clientX, e.clientY);
    if (!isFinalPage) {
      onNextPage();
    }
  };

  // Helper to determine if a line should be rendered as emotional handwritten highlight
  const isHandwrittenLine = (line: string) => {
    const highlights = [
      'run to me.',
      'My chaos.',
      'My safe place.',
      'My blessing in disguise.',
      'My jigar.',
      'When I called you my jigar.',
      'love you, beyond what these little words could ever hold🤍',
    ];
    return highlights.some((h) => line.trim() === h);
  };

  const isClosingLine = (line: string) => {
    return line.includes('love you, beyond what these little words could ever hold');
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-between p-5 sm:p-7 select-none touch-pan-y text-[#4A3426]"
      onClick={handleClickCard}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Decor & Page Counter */}
      <div className="flex items-center justify-between pt-2 pb-1 border-b border-[#8B6B4A]/25 text-xs font-special uppercase tracking-[0.15em] text-[#8B6B4A]">
        <span className="flex items-center space-x-1">
          <span className="text-xs">❦</span>
          <span>with love</span>
        </span>
        <span>
          {currentPageIndex + 1} / {pages.length}
        </span>
      </div>

      {/* Main Vintage Letter Content Area */}
      <div className="flex-1 flex flex-col justify-center my-auto py-3 overflow-y-auto max-h-[68dvh] scrollbar-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage.id}
            initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="flex flex-col space-y-4 my-auto px-2"
          >
            {/* Fleur-de-lis / Wax mark above first stanza on Page 1 */}
            {currentPageIndex === 0 && (
              <div className="text-center text-[#7A1226]/70 text-lg mb-1">
                ❦
              </div>
            )}

            {/* HERO LINE FOR FINAL PAGE */}
            {currentPage.isHero && currentPage.heroLine && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-3 text-center"
              >
                <h1 className="font-pinyon text-[42px] sm:text-[50px] leading-[1.15] text-[#7A1226] tracking-normal break-words max-w-full drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  {currentPage.heroLine}
                </h1>
                <div className="flex items-center justify-center space-x-2 my-2 text-[#8B6B4A]/50">
                  <span className="w-8 h-px bg-[#8B6B4A]/40" />
                  <span className="text-xs">✦</span>
                  <span className="w-8 h-px bg-[#8B6B4A]/40" />
                </div>
              </motion.div>
            )}

            {/* STAGGERED FADE-IN LINES WITH INK BLUR REVEAL */}
            {currentPage.lines.map((line: string, idx: number) => {
              const isFirstLineOnPageOne = currentPageIndex === 0 && idx === 0;
              const isHandwritten = isHandwrittenLine(line);
              const isClosing = isClosingLine(line);

              return (
                <React.Fragment key={idx}>
                  {/* Optional Ornamental Stanza Divider for multi-line pages */}
                  {idx > 0 && currentPage.lines.length > 2 && idx % 2 === 0 && !currentPage.isHero && (
                    <div className="text-center text-[#8B6B4A]/40 text-xs py-0.5 select-none">
                      ❖
                    </div>
                  )}

                  <motion.p
                    initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.6,
                      delay: (currentPage.isHero ? 0.5 : 0.2) + idx * 0.22,
                      ease: 'easeOut',
                    }}
                    className={`leading-[1.85] tracking-[0.2px] ${
                      isClosing
                        ? 'font-handwritten text-2xl sm:text-3xl text-[#7A1226] text-right mt-4 -rotate-1'
                        : isHandwritten
                        ? 'font-handwritten text-2xl sm:text-3xl text-[#7A1226] text-center -rotate-1 my-1'
                        : currentPage.isHero
                        ? 'font-fell text-[17px] sm:text-[18px] text-[#4A3426] text-center'
                        : 'font-fell text-[19px] sm:text-[20px] text-[#4A3426] text-left'
                    }`}
                  >
                    {/* Drop Cap for first letter of Page 1 */}
                    {isFirstLineOnPageOne ? (
                      <>
                        <span className="float-left font-pinyon text-5xl leading-none mr-2 mt-0.5 text-[#7A1226] select-none font-normal">
                          {line.charAt(0)}
                        </span>
                        {line.slice(1)}
                      </>
                    ) : (
                      line
                    )}
                  </motion.p>
                </React.Fragment>
              );
            })}

            {/* Small Fleur-de-lis mark at end of final page */}
            {currentPage.isHero && (
              <div className="text-center text-[#7A1226]/60 text-base pt-2">
                ❦
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation & Typewriter Controls */}
      <div className="pt-2 pb-1 flex flex-col items-center space-y-3 z-20">
        {/* Progress Dots */}
        <div className="flex items-center space-x-1.5">
          {pages.map((p, idx) => (
            <motion.div
              key={p.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentPageIndex
                  ? 'w-4 bg-[#7A1226]'
                  : 'w-1.5 bg-[#8B6B4A]/30'
              }`}
              animate={{
                scale: idx === currentPageIndex ? 1.1 : 1,
              }}
            />
          ))}
        </div>

        {/* Action Controls */}
        <div className="w-full flex items-center justify-between px-1">
          {!isFinalPage ? (
            <>
              <span className="font-special text-[11px] uppercase tracking-[0.15em] text-[#8B6B4A] opacity-80">
                tap to continue
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onNextPage();
                }}
                className="px-3 py-1.5 rounded-xs bg-[#E8D5B0] text-[#4A3426] font-special text-xs uppercase tracking-[0.15em] border border-[#8B6B4A]/40 flex items-center space-x-1 shadow-xs hover:bg-[#F3E7D0] transition-colors focus:outline-none"
                aria-label="Next page"
              >
                <span>next</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#7A1226]" />
              </motion.button>
            </>
          ) : (
            <div className="w-full flex justify-center pt-1">
              {/* Typewriter stamp Replay Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onReplay();
                }}
                className="px-5 py-2 rounded-xs bg-[#F3E7D0] text-[#4A3426] font-special text-xs uppercase tracking-[0.15em] border border-[#8B6B4A]/60 flex items-center space-x-2 shadow-md hover:bg-[#E8D5B0] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#7A1226]" />
                <span>Replay</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
