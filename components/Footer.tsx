"use client";

interface FooterProps {
  onOpenExplore?: () => void;
  onOpenCreatures?: () => void;
}

export default function Footer({ onOpenExplore, onOpenCreatures }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#000000] text-white pt-24 sm:pt-36 md:pt-44 pb-8 sm:pb-12 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-white/[0.08] overflow-hidden select-none z-30">
      {/* Subtle Ethereal Ambient Aura */}
      <div
        className="absolute top-0 inset-x-0 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(197, 160, 89, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto w-full">
        {/* =========================================================================
            TOP SECTION: EDITORIAL STATEMENT & CURATED NAVIGATION COLUMNS
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 sm:pb-28 border-b border-white/[0.08]">
          
          {/* Brand Statement / Art Book Colophon */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand Emblem */}
              <div className="flex items-center gap-3 mb-6">
                <span className="flex flex-col gap-[3px]">
                  <span className="flex gap-[3px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EDE8DE]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#999489]" />
                  </span>
                  <span className="flex gap-[3px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#999489]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EDE8DE]" />
                  </span>
                </span>
                <span className="font-cormorant text-2xl tracking-[0.22em] lowercase text-[#EDE8DE]">
                  floria
                </span>
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#C5A059] ml-2 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                  VOL. I
                </span>
              </div>

              {/* Short Brand Statement */}
              <p className="font-cormorant text-xl sm:text-2xl font-light italic text-[#E0DDD5] leading-relaxed max-w-md">
                “FLORIA is an ongoing archival chronicle documenting the quiet magic of forgotten landscapes, curious creatures, and nocturnal sanctuaries.”
              </p>

              <p className="text-xs sm:text-[13px] text-[#8E8A81] font-light leading-relaxed mt-4 max-w-md">
                Curated for wanderers, seekers, and dreamers. Designed as a living field journal at the intersection of myth, biology, and quiet wonder.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] text-[10px] font-mono text-[#736F67] tracking-[0.22em] uppercase">
              <span>SANCTUARY PRESS // MONOGRAPH ARCHIVE</span>
            </div>
          </div>

          {/* Navigation & Archive Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            
            {/* Column 1: Chronicles */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-[#C5A059] block mb-5 font-medium">
                CHRONICLES
              </span>
              <ul className="space-y-3.5 text-xs sm:text-[13px] text-[#A8A49B] font-light">
                <li>
                  <button
                    onClick={onOpenExplore}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    01 The Daytime River
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenExplore}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    02 Sanctuary Millbrook
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenCreatures}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    03 The Emerald Arbor
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenExplore}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    04 Subterranean Orchard
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenCreatures}
                    className="hover:text-[#C5A059] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Specimen Bestiary</span>
                    <span className="text-[9px] text-[#C5A059] font-mono">↗</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Manifesto & Lore */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-[#C5A059] block mb-5 font-medium">
                EXPLORATION
              </span>
              <ul className="space-y-3.5 text-xs sm:text-[13px] text-[#A8A49B] font-light">
                <li>
                  <button
                    onClick={onOpenExplore}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Cartography Folio
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenExplore}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Field Notes &amp; Logs
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenCreatures}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Botanical Herbaria
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenExplore}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Quiet Wonder Ethos
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenExplore}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Curator Archives
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Colophon & Channels */}
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-[#C5A059] block mb-5 font-medium">
                DISPATCHES
              </span>
              <ul className="space-y-3.5 text-xs sm:text-[13px] text-[#A8A49B] font-light">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Instagram</span>
                    <span className="text-[9px] text-[#736F67]">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Journal Letters</span>
                    <span className="text-[9px] text-[#736F67]">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>X // Dispatch</span>
                    <span className="text-[9px] text-[#736F67]">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Sanctuary Circle</span>
                    <span className="text-[9px] text-[#736F67]">↗</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={onOpenExplore}
                    className="hover:text-white transition-colors text-left"
                  >
                    Audio Soundscapes
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* =========================================================================
            MIDDLE ROW: COLOPHON METADATA & BACK TO TOP
            ========================================================================= */}
        <div className="pt-10 sm:pt-14 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[10px] sm:text-[11px] font-mono text-[#8E8A81]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 tracking-[0.22em] uppercase">
            <span>© 2026 FLORIA MONOGRAPH</span>
            <span className="hidden sm:inline">·</span>
            <span>ALL ARCHIVES RESERVED</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-[#C5A059]">SANCTUARY EDITION NO. 01</span>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 tracking-[0.24em] uppercase text-[#EDE8DE] hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            <span>RETURN TO SUMMIT</span>
            <span className="group-hover:-translate-y-1 transition-transform duration-300 text-[#C5A059]">
              ↑
            </span>
          </button>
        </div>

        {/* =========================================================================
            MONUMENTAL ART BOOK CLOSING STATEMENT: OVERSIZED FLORIA TYPOGRAPHY
            ========================================================================= */}
        <div className="pt-4 sm:pt-8 text-center select-none overflow-hidden">
          <h1 className="font-cormorant italic font-light text-[22vw] leading-[0.78] tracking-[-0.03em] lowercase text-transparent bg-clip-text bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-transparent select-none pointer-events-none drop-shadow-sm">
            floria
          </h1>
        </div>

      </div>
    </footer>
  );
}
