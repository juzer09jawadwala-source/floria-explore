"use client";

import { useState } from "react";

interface NavbarProps {
  onOpenExplore?: () => void;
  onOpenCreatures?: () => void;
}

export default function Navbar({ onOpenExplore, onOpenCreatures }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full px-6 sm:px-10 md:px-16 pt-7 md:pt-9 pb-4 flex items-center justify-between z-20">
      {/* Brand Logo - mimicking the 4-dot icon + lowercase editorial name */}
      <div 
        className="flex items-center gap-2.5 cursor-pointer group"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="flex flex-col gap-[3px] opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="flex gap-[3px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8E4DA]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#999489]" />
          </span>
          <span className="flex gap-[3px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#999489]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8E4DA]" />
          </span>
        </span>
        <span className="font-cormorant text-xl md:text-2xl tracking-[0.2em] font-normal text-[#EDE8DE] lowercase select-none group-hover:text-white transition-colors">
          floria
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[11px] tracking-[0.22em] font-medium text-[#9E9A90] uppercase select-none">
        <button
          onClick={onOpenCreatures}
          className="hover:text-[#F5F2EB] transition-colors cursor-pointer"
        >
          LATEST ISSUE
        </button>
        <button
          onClick={onOpenCreatures}
          className="hover:text-[#F5F2EB] transition-colors cursor-pointer"
        >
          ARCHIVE
        </button>
        <button
          onClick={onOpenExplore}
          className="hover:text-[#F5F2EB] transition-colors cursor-pointer"
        >
          ABOUT
        </button>
        <button
          onClick={onOpenExplore}
          className="hover:text-[#F5F2EB] transition-colors cursor-pointer"
        >
          MANIFESTO
        </button>
        <button
          onClick={onOpenExplore}
          className="text-[#EDE8DE] hover:text-white transition-colors cursor-pointer pb-0.5 border-b border-[#EDE8DE]/70 hover:border-white"
        >
          GET STARTED
        </button>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 text-[#EDE8DE] focus:outline-none"
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-px bg-white transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
        <span className={`block w-5 h-px bg-white transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
      </button>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-8 md:hidden animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8E4DA]" />
              <span className="font-cormorant text-2xl tracking-[0.2em] text-[#EDE8DE] lowercase">floria</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-400 hover:text-white text-2xl p-2"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-6 text-sm tracking-[0.25em] uppercase text-[#9E9A90] font-medium py-12">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCreatures?.(); }}
              className="text-left hover:text-white py-2 border-b border-white/5"
            >
              LATEST ISSUE
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCreatures?.(); }}
              className="text-left hover:text-white py-2 border-b border-white/5"
            >
              ARCHIVE
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenExplore?.(); }}
              className="text-left hover:text-white py-2 border-b border-white/5"
            >
              ABOUT
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenExplore?.(); }}
              className="text-left hover:text-white py-2 border-b border-white/5"
            >
              MANIFESTO
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenExplore?.(); }}
              className="text-left text-white py-2 underline underline-offset-8"
            >
              GET STARTED
            </button>
          </div>

          <p className="text-[10px] tracking-[0.25em] text-[#6A665E] uppercase text-center">
            THE CHRONICLES OF FLORIA · ISSUE Nº 01
          </p>
        </div>
      )}
    </header>
  );
}
