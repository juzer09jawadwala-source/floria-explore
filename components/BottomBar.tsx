"use client";

interface BottomBarProps {
  baseMode?: "bg1" | "black";
  revealMode?: "bg2" | "character";
  onToggleBase?: () => void;
  onToggleReveal?: () => void;
}

export default function BottomBar({
  baseMode = "bg1",
  revealMode = "bg2",
  onToggleBase,
  onToggleReveal,
}: BottomBarProps) {
  return (
    <footer className="w-full px-6 sm:px-10 md:px-16 py-5 sm:py-6 border-t border-white/[0.08] text-[10px] sm:text-[11px] tracking-[0.22em] text-[#8E8A81] uppercase font-medium select-none z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
        {/* Left segment */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5E0D5]/70 inline-block" />
          <span className="text-[#C2BEB5]">EDITION Nº 01 · THE FLORIA CHRONICLES</span>
        </div>

        {/* Center: Interactive Asset Switcher */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleReveal}
            className="px-3 py-1 rounded-full border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] text-white transition-all text-[9px] tracking-[0.18em] cursor-pointer flex items-center gap-1.5"
            title="Toggle between Moonlit Realm (BG_IMAGE_2) and Character"
          >
            <span className="text-[#8E8A81]">REVEAL:</span>
            <span className="text-[#F5F2EB] font-semibold">{revealMode === "bg2" ? "MOONLIT (BG_IMAGE_2)" : "CHARACTER"}</span>
            <span className="text-[#8E8A81]">↺</span>
          </button>

          <button
            type="button"
            onClick={onToggleBase}
            className="px-3 py-1 rounded-full border border-white/10 hover:border-white/25 bg-black/40 hover:bg-white/[0.05] text-[#A09C94] hover:text-white transition-all text-[9px] tracking-[0.18em] cursor-pointer flex items-center gap-1.5"
            title="Toggle between Daytime River (BG_IMAGE_1) and Pure Black"
          >
            <span className="text-[#706C64]">BASE:</span>
            <span>{baseMode === "bg1" ? "DAYTIME (BG_IMAGE_1)" : "PURE BLACK"}</span>
            <span className="text-[#706C64]">↺</span>
          </button>
        </div>

        {/* Right segment */}
        <div className="flex items-center gap-4 text-[#A09C94]">
          <span className="hidden lg:inline">COORDINATES: 45°12&apos;N 122°40&apos;W</span>
          <span className="text-[#C2BEB5]">VOL. I · EST. MMXXIV</span>
        </div>
      </div>
    </footer>
  );
}
