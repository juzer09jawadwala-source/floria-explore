"use client";

import { motion } from "framer-motion";

interface HeroProps {
  onExploreClick: () => void;
  onCreaturesClick: () => void;
}

export default function Hero({ onExploreClick, onCreaturesClick }: HeroProps) {
  return (
    <section className="relative z-20 flex-1 w-full flex flex-col items-center justify-start text-center px-4 sm:px-6 md:px-8 pt-3 sm:pt-5 md:pt-7 pb-0 min-h-0">
      {/* Upper Content: Eyebrow, Dominant Headline, Subtitle, Description, CTA Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center z-30 select-none max-w-4xl mx-auto w-full will-change-transform"
      >
        {/* Eyebrow Tag — matching "THE WEEKLY DISPATCH · ISSUE Nº 142" */}
        <div className="mb-1.5 sm:mb-2">
          <span className="inline-block text-[10px] sm:text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#8E8A81] font-medium">
            THE LIVING CHRONICLES · ISSUE Nº 01
          </span>
        </div>

        {/* Dominant Hero Element — Oversized "FLORIA" */}
        <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] tracking-[0.10em] sm:tracking-[0.14em] md:tracking-[0.18em] font-light uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#ECE7DF] to-[#7A766F] leading-none mb-1.5 sm:mb-2 drop-shadow-[0_4px_30px_rgba(255,255,255,0.06)]">
          FLORIA
        </h1>

        {/* Supporting Text — "Enter a world where creatures come alive" */}
        <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light italic text-[#E5E0D5] tracking-normal leading-snug max-w-2xl mx-auto mb-1.5 sm:mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Enter a world where creatures come alive
        </h2>

        {/* Description — "An immersive world of curious creatures, magical places, and stories waiting to be discovered." */}
        <p className="text-xs sm:text-sm md:text-[15px] text-[#A8A49B] max-w-xl mx-auto leading-relaxed font-normal tracking-wide mb-3 sm:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          An immersive world of curious creatures, magical places, and stories waiting to be discovered.
        </p>

        {/* CTA Placement — Buttons: “Explore Floria →” and “Meet the Creatures →” */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onExploreClick}
            className="w-full sm:w-auto bg-[#F5F2EB] text-[#0A0A0A] hover:bg-white hover:shadow-[0_0_28px_rgba(255,255,255,0.25)] transition-all duration-300 px-7 sm:px-8 py-3.5 rounded-full font-medium text-xs sm:text-[13px] tracking-wider uppercase inline-flex items-center justify-center gap-2.5 group cursor-pointer shadow-lg will-change-transform"
          >
            <span>Explore Floria</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-sans">
              →
            </span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCreaturesClick}
            className="w-full sm:w-auto bg-black/40 backdrop-blur-md border border-white/[0.22] text-[#E0DDD5] hover:text-white hover:border-white/50 hover:bg-white/[0.12] transition-all duration-300 px-7 sm:px-8 py-3.5 rounded-full font-medium text-xs sm:text-[13px] tracking-wider uppercase inline-flex items-center justify-center gap-2.5 group cursor-pointer shadow-lg will-change-transform"
          >
            <span>Meet the Creatures</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-sans">
              →
            </span>
          </motion.button>
        </div>

        {/* Subtext under CTA */}
        <div className="mt-2 sm:mt-2.5">
          <p className="text-[11px] sm:text-xs text-[#8E8A81] italic tracking-wide">
            Free to wander. Unveil the sanctuary anytime.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
