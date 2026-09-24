'use client';

import React, { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useInView,
} from 'framer-motion';
import { STANZAS, StanzaContent, SALUTATION, SIGN_OFF } from '@/content';
import { ChevronDown } from 'lucide-react';
import { Polaroid } from './Polaroid';
import { HandwritingText } from './HandwritingText';
import { Highlighter } from './Highlighter';

interface ScrollableLetterProps {
  isOpen: boolean;
  onSparkleConfetti: () => void;
  onPetalConfetti: () => void;
  onFinaleConfetti: () => void;
  onTapCard: (clientX: number, clientY: number) => void;
  onReplay: () => void;
}

// Target phrases for Golden-Rose Highlighter Sweep
const HIGHLIGHT_PHRASES = [
  'my jigar',
  'a little piece of my own heart walking outside of me',
  'blessing in disguise',
  'run to me.',
  'My human Spotify',
  'somehow, He made her my sister.',
];

const renderLineText = (line: string) => {
  for (const phrase of HIGHLIGHT_PHRASES) {
    if (line.includes(phrase)) {
      const parts = line.split(phrase);
      return (
        <>
          {parts[0]}
          <Highlighter>{phrase}</Highlighter>
          {parts.slice(1).join(phrase)}
        </>
      );
    }
  }
  return line;
};

// Subcomponent for each stanza with inView confetti, focus opacity, and ink reveal
const StanzaItem: React.FC<{
  stanza: StanzaContent;
  isFirst: boolean;
  onTriggerConfetti?: (type: 'sparkle' | 'petal' | 'finale') => void;
}> = ({ stanza, isFirst, onTriggerConfetti }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });
  const isCurrentlyCentered = useInView(ref, { margin: '-35% 0px -35% 0px' });
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (isInView && stanza.triggerConfetti && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      onTriggerConfetti?.(stanza.triggerConfetti);
    }
  }, [isInView, stanza.triggerConfetti, onTriggerConfetti]);

  const isHandwrittenLine = (line: string) => {
    const highlights = [
      'run to me.',
      'My chaos.',
      'My safe place.',
      'My blessing in disguise.',
      'When I called you my jigar.',
      'love you, beyond what these little words could ever hold🤍',
    ];
    return highlights.some((h) => line.trim() === h);
  };

  const isClosingLine = (line: string) => {
    return line.includes('love you, beyond what these little words could ever hold');
  };

  const hasHighlighterInLine = (line: string) => {
    return HIGHLIGHT_PHRASES.some((phrase) => line.includes(phrase));
  };

  return (
    <div
      ref={ref}
      className={`relative my-6 sm:my-8 transition-opacity duration-500 ${
        isCurrentlyCentered ? 'opacity-100' : 'opacity-60'
      }`}
    >
      {/* Ornamental Stanza Divider above subsequent stanzas */}
      {!isFirst && (
        <div className="text-center text-[#8B6B4A]/40 text-xs my-6 select-none">
          ❖
        </div>
      )}

      {/* Hero Title for Final Stanza */}
      {stanza.isHero && stanza.heroLine && (
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(3px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 text-center"
        >
          <h1 className="font-pinyon text-[42px] sm:text-[52px] leading-[1.15] text-[#7A1226] tracking-normal break-words max-w-full drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            {stanza.heroLine}
          </h1>
          <div className="flex items-center justify-center space-x-2 my-3 text-[#8B6B4A]/40">
            <span className="w-10 h-px bg-[#8B6B4A]/30" />
            <span className="text-xs">✦</span>
            <span className="w-10 h-px bg-[#8B6B4A]/30" />
          </div>
        </motion.div>
      )}

      {/* Lines inside Stanza with staggered ink reveal */}
      <div className="flex flex-col space-y-4">
        {stanza.lines.map((line, idx) => {
          const isFirstLineOnFirstStanza = isFirst && idx === 0;
          const isHandwritten = isHandwrittenLine(line);
          const isClosing = isClosingLine(line);
          const hasHighlight = hasHighlighterInLine(line);

          return (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(3px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.12,
                  ease: 'easeOut',
                }}
                className="relative"
              >
                <p
                  className={`leading-[1.85] tracking-[0.2px] ${
                    isClosing
                      ? 'font-handwritten text-2xl sm:text-3xl text-[#7A1226] text-right mt-4 -rotate-1'
                      : isHandwritten
                      ? 'font-handwritten text-2xl sm:text-3xl text-[#7A1226] text-center -rotate-1 my-1 inline-block w-full'
                      : stanza.isHero
                      ? 'font-fell text-[18px] sm:text-[19px] text-[#4A3426] text-center'
                      : 'font-fell text-[19px] sm:text-[20px] text-[#4A3426] text-left'
                  }`}
                >
                  {/* Clean 2-line Drop Cap for First Letter */}
                  {isFirstLineOnFirstStanza ? (
                    <>
                      <span className="float-left font-pinyon text-[46px] sm:text-[52px] leading-[0.75] mr-2 mt-0.5 text-[#7A1226] select-none pointer-events-none">
                        {line.charAt(0)}
                      </span>
                      {renderLineText(line.slice(1))}
                    </>
                  ) : (
                    renderLineText(line)
                  )}
                </p>

                {/* Animated Wax-Red Underline ONLY if line has no highlighter overlay */}
                {isHandwritten && !isClosing && !hasHighlight && (
                  <motion.div
                    className="h-0.5 bg-[#7A1226]/40 rounded-full mx-auto mt-0.5"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 0.7 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  />
                )}
              </motion.div>

              {/* Sign-off "— Afeefa" rendered right after closing line with handwriting draw-in */}
              {isClosing && (
                <div className="text-right mt-6 pr-2 pb-6">
                  <HandwritingText
                    text={SIGN_OFF}
                    className="text-2xl sm:text-3xl text-[#7A1226] -rotate-1"
                    duration={1.4}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const ScrollableLetter: React.FC<ScrollableLetterProps> = ({
  isOpen,
  onSparkleConfetti,
  onPetalConfetti,
  onFinaleConfetti,
  onTapCard,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  // Framer Motion Scroll Progress & Parallax
  const { scrollYProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const skewY = useTransform(scrollVelocity, [-0.5, 0.5], [-1, 1]);

  // Background Mood Shift
  const bgShift = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#1E140D', '#2A180E', '#2D1217']
  );

  // Floating Parallax Elements Offsets
  const floatingY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const floatingY3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Scroll hint opacity
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Pointer events (< 8px movement = tap)
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStartRef.current) return;
    const dx = Math.abs(e.clientX - pointerStartRef.current.x);
    const dy = Math.abs(e.clientY - pointerStartRef.current.y);
    const distance = Math.hypot(dx, dy);

    if (distance < 8) {
      onTapCard(e.clientX, e.clientY);
    }
    pointerStartRef.current = null;
  };

  const triggerConfettiHandler = (type: 'sparkle' | 'petal' | 'finale') => {
    if (type === 'sparkle') onSparkleConfetti();
    if (type === 'petal') onPetalConfetti();
    if (type === 'finale') onFinaleConfetti();
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex justify-center z-10 overflow-hidden"
      style={{ backgroundColor: bgShift }}
    >
      {/* Wax-Red Scroll Progress Bar at Top Edge */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#7A1226] z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Floating Parallax Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <motion.div
          style={{ y: floatingY1, skewY }}
          className="absolute top-[15%] left-[8%] w-3 h-3 rounded-full bg-[#D4AF37]/30 blur-xs"
        />
        <motion.div
          style={{ y: floatingY2, skewY }}
          className="absolute top-[35%] right-[10%] w-4 h-4 rounded-full bg-[#7A1226]/20 blur-xs"
        />
        <motion.div
          style={{ y: floatingY3, skewY }}
          className="absolute top-[60%] left-[12%] w-2.5 h-2.5 rounded-full bg-[#D9B382]/40 blur-xs"
        />
        <motion.div
          style={{ y: floatingY1, skewY }}
          className="absolute top-[80%] right-[15%] w-3 h-3 rounded-full bg-[#F5EFE6]/30 blur-xs"
        />
      </div>

      {/* Full-height Continuous Scroll Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative w-full h-[100dvh] overflow-y-auto overscroll-contain scrollbar-none px-3 sm:px-5 py-6 z-10 touch-pan-y"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Continuous Parchment Letter Sheet */}
        <div className="relative w-full max-w-md mx-auto parchment-bg rounded-[3px] double-border shadow-[0_12px_35px_rgba(0,0,0,0.5)] px-6 sm:px-8 pt-10 sm:pt-12 pb-24 flex flex-col text-[#4A3426]">
          {/* SALUTATION "Dear Choti Di," WITH HANDWRITING DRAW-IN */}
          <div className="mb-6">
            <HandwritingText
              text={SALUTATION}
              className="text-2xl sm:text-3xl text-[#7A1226] text-left font-semibold tracking-wide"
              duration={1.6}
            />
          </div>

          {/* Stanzas Stack with Polaroid Memories Inserted */}
          {STANZAS.map((stanza, index) => (
            <React.Fragment key={stanza.id}>
              <StanzaItem
                stanza={stanza}
                isFirst={index === 0}
                onTriggerConfetti={triggerConfettiHandler}
              />

              {/* Scroll Hint underneath First Stanza */}
              {index === 0 && (
                <motion.div
                  style={{ opacity: hintOpacity }}
                  className="flex flex-col items-center justify-center my-4 pointer-events-none text-[#8B6B4A]"
                >
                  <span className="font-special text-[11px] uppercase tracking-[0.2em] mb-1">
                    scroll
                  </span>
                  <ChevronDown className="w-4 h-4 animate-bounce text-[#7A1226]" />
                </motion.div>
              )}

              {/* POLAROID MEMORIES PLACEMENT */}
              {/* Photo 1: after Stanza 4 */}
              {stanza.id === 4 && (
                <Polaroid id={1} index={0} onTapPetals={onPetalConfetti} />
              )}

              {/* Photo 2: after Stanza 5 */}
              {stanza.id === 5 && (
                <Polaroid id={2} index={1} onTapPetals={onPetalConfetti} />
              )}

              {/* Photo 3: after Stanza 10 */}
              {stanza.id === 10 && (
                <Polaroid id={3} index={2} onTapPetals={onPetalConfetti} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
