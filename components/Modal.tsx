"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "explore" | "creatures" | null;
}

export default function Modal({ isOpen, onClose, type }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && type && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#000000] border border-white/[0.12] rounded-[24px] md:rounded-[32px] p-6 sm:p-10 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.9)] max-h-[85vh] overflow-y-auto will-change-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white text-xs tracking-[0.2em] uppercase font-mono px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 transition-all cursor-pointer"
            >
              ESC ✕
            </button>


        {type === "creatures" ? (
          <div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#8E8A81] font-medium block mb-3">
              ARCHIVE COMPENDIUM · ISSUE Nº 01
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl text-[#EDE8DE] mb-6">
              CREATURES OF FLORIA
            </h3>
            <p className="text-xs sm:text-sm text-[#9E9A91] leading-relaxed mb-8 font-light">
              Entities that walk the threshold between memory and myth. Each specimen is observed in complete silence.
            </p>

            <div className="space-y-6 border-t border-white/[0.08] pt-6">
              <div className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-cormorant text-lg sm:text-xl text-[#F2EDE4] italic">
                    01. The Luminescent Hart
                  </h4>
                  <span className="text-[10px] tracking-widest text-[#78756F] uppercase">Silver Canopy</span>
                </div>
                <p className="text-xs text-[#8E8A81] leading-relaxed">
                  Moving between twilight shadows, its antlers carry phosphorescent spores that illuminate dormant path markers for lost travelers.
                </p>
              </div>

              <div className="group border-t border-white/[0.05] pt-5">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-cormorant text-lg sm:text-xl text-[#F2EDE4] italic">
                    02. The Whispering Weaver
                  </h4>
                  <span className="text-[10px] tracking-widest text-[#78756F] uppercase">The Silt Valleys</span>
                </div>
                <p className="text-xs text-[#8E8A81] leading-relaxed">
                  Spins gossamer threads composed of forgotten nocturnal songs. Its webs do not ensnare prey, but preserve passing thoughts.
                </p>
              </div>

              <div className="group border-t border-white/[0.05] pt-5">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-cormorant text-lg sm:text-xl text-[#F2EDE4] italic">
                    03. The Obsidian Warden
                  </h4>
                  <span className="text-[10px] tracking-widest text-[#78756F] uppercase">Basalt Peaks</span>
                </div>
                <p className="text-xs text-[#8E8A81] leading-relaxed">
                  Carved from cold volcanic glass, it remains stationary for centuries until an honest question is spoken into the wind.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#8E8A81] font-medium block mb-3">
              THE EXPEDITION · MANIFESTO
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl text-[#EDE8DE] mb-6">
              ENTER FLORIA
            </h3>
            <p className="text-xs sm:text-sm text-[#9E9A91] leading-relaxed mb-6 font-light">
              Floria was never mapped by cartographers. It exists where curiosity overtakes certainty, and where the boundaries between flora, fauna, and story dissolve.
            </p>

            <div className="border-t border-white/[0.08] pt-6 space-y-4">
              <div className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
                <span className="text-[10px] tracking-[0.2em] text-[#8E8A81] uppercase block mb-1">PRINCIPLE I</span>
                <p className="text-xs text-[#D8D4CC]">
                  Leave no traces except quiet contemplation. What is discovered here remains untamed.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
                <span className="text-[10px] tracking-[0.2em] text-[#8E8A81] uppercase block mb-1">PRINCIPLE II</span>
                <p className="text-xs text-[#D8D4CC]">
                  The stories are not written by us; we merely transcribe the murmurs of the ancient groves.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={onClose}
                className="bg-[#F5F2EB] text-black px-6 py-2.5 rounded-full text-xs tracking-wider uppercase font-medium hover:bg-white transition-all cursor-pointer"
              >
                Return to Sanctuary
              </button>
            </div>
          </div>
        )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
}
