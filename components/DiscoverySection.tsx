"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface DiscoverySectionProps {
  onEnterWorld?: () => void;
  onSelectCreature?: (creatureId: string) => void;
}

interface DiscoveryItem {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  image: string;
  aspect: string;
  description: string;
  coords: string;
  elevation: string;
  status: string;
  specimenCode: string;
  colSpan: string;
  tiltClass: string;
  heightClass: string;
}

export default function DiscoverySection({
  onEnterWorld,
  onSelectCreature,
}: DiscoverySectionProps) {
  const items: DiscoveryItem[] = [
    {
      id: "fox",
      name: "The Ember Fox",
      scientificName: "Vulpes Lumen · Specimen 04",
      category: "FOREST SPIRIT FAUNA",
      image: "/discovery_fox.jpg",
      aspect: "3/4",
      description:
        "Observed resting upon ancient cedar roots at twilight. Its botanical tail emits a steady 420nm spore drift that stimulates wild moss growth.",
      coords: "45°18'22\"N · 122°39'10\"W",
      elevation: "680M",
      status: "BENIGN // NOCTURNAL",
      specimenCode: "FL-04-FOX",
      colSpan: "col-span-12 lg:col-span-5",
      tiltClass: "hover:-rotate-[0.8deg]",
      heightClass: "h-[540px] sm:h-[580px]",
    },
    {
      id: "orchard",
      name: "The Sunken Orchard",
      scientificName: "Hortus Silens · Sanctuary 11",
      category: "SUBTERRANEAN BOTANICAL",
      image: "/discovery_orchard.jpg",
      aspect: "16/9",
      description:
        "Ancient cherry trees blossoming within subterranean caverns. Floating water lanterns guide wanderers along glacial mountain tributaries.",
      coords: "45°12'05\"N · 122°44'30\"W",
      elevation: "-140M",
      status: "PERPETUAL BLOOM",
      specimenCode: "SN-11-ORCH",
      colSpan: "col-span-12 lg:col-span-7",
      tiltClass: "hover:rotate-[0.6deg]",
      heightClass: "h-[540px] sm:h-[580px]",
    },
    {
      id: "stag",
      name: "The Celestial Stag",
      scientificName: "Cervus Astralis · Specimen 09",
      category: "CELESTIAL UNGULATE",
      image: "/discovery_stag.jpg",
      aspect: "3/4",
      description:
        "Flowering antlers bloom beneath waxing crescents. Each hoofprint deposits luminous star-moss that gently dissipates before sunrise.",
      coords: "45°20'44\"N · 122°35'12\"W",
      elevation: "1,140M",
      status: "RARE // APEX GUARDIAN",
      specimenCode: "FL-09-STAG",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
      tiltClass: "hover:-rotate-[1deg] lg:translate-y-8",
      heightClass: "h-[500px] sm:h-[540px]",
    },
    {
      id: "owlet",
      name: "The Sundial Owlet",
      scientificName: "Glaucidium Saxum · Specimen 14",
      category: "AVIAN BOTANICAL",
      image: "/discovery_owlet.jpg",
      aspect: "3/4",
      description:
        "Perches upon ancient weathered sundials along northern ridges. Natural pine sprigs on its brow align with subtle solar declinations.",
      coords: "45°15'01\"N · 122°41'55\"W",
      elevation: "890M",
      status: "CONTEMPLATIVE",
      specimenCode: "FL-14-OWL",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
      tiltClass: "hover:rotate-[1.2deg] lg:-translate-y-4",
      heightClass: "h-[500px] sm:h-[540px]",
    },
    {
      id: "arch",
      name: "The Obsidian Threshold",
      scientificName: "Fornix Tenebris · Sanctuary 02",
      category: "MONOLITHIC PASSAGE",
      image: "/discovery_arch.jpg",
      aspect: "16/9",
      description:
        "A colossal basalt archway hanging above glacial fjords. Inscribed with archaic botanical sigils that hum faintly when mist rolls through.",
      coords: "45°22'18\"N · 122°30'04\"W",
      elevation: "1,420M",
      status: "TIMELESS // BOUNDARY",
      specimenCode: "SN-02-ARCH",
      colSpan: "col-span-12 lg:col-span-4",
      tiltClass: "hover:-rotate-[0.6deg] lg:translate-y-12",
      heightClass: "h-[500px] sm:h-[540px]",
    },
  ];

  return (
    <section
      className="relative w-full min-h-screen bg-[#000000] text-white py-24 sm:py-36 md:py-44 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden select-none z-30"
    >
      {/* =========================================================================
          BACKGROUND FLOATING OVERSIZED GHOST WORDS & SCIENTIFIC FIELD LABELS
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Subtle Ambient Fantasy Glow */}
        <div
          className="absolute top-1/4 -left-48 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, #4E6B56 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-2/3 -right-48 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-15"
          style={{ background: "radial-gradient(circle, #C5A059 0%, transparent 70%)" }}
        />

        {/* Ghost Typographic Watermarks */}
        <span className="font-cinzel text-[14vw] font-bold text-white/[0.015] tracking-[0.25em] uppercase absolute top-12 left-0 whitespace-nowrap leading-none">
          EXPEDITION
        </span>
        <span className="font-cormorant italic text-[18vw] font-light text-white/[0.015] tracking-widest absolute top-1/2 -right-20 whitespace-nowrap leading-none">
          Sanctuary
        </span>
        <span className="font-cinzel text-[16vw] font-bold text-white/[0.012] tracking-[0.3em] uppercase absolute bottom-40 left-10 whitespace-nowrap leading-none">
          ARCHIVES
        </span>

        {/* Tiny Scattered Field Journal Metadata Stamps */}
        <div className="absolute top-16 right-8 sm:right-16 font-mono text-[9px] sm:text-[10px] text-[#736F67] tracking-[0.3em] uppercase text-right">
          <span>CATALOGUE // FOLIO 02</span>
          <br />
          <span className="text-[#C5A059]/70">SECTOR 04 · NORTH BEND</span>
        </div>

        <div className="absolute top-[48%] left-4 sm:left-10 font-mono text-[9px] text-[#736F67] tracking-[0.25em] uppercase rotate-90 origin-left hidden xl:block">
          <span>SURVEY RECORD · LAT 45°14&apos;N</span>
        </div>

        <div className="absolute bottom-[28%] right-4 sm:right-10 font-mono text-[9px] text-[#736F67] tracking-[0.25em] uppercase -rotate-90 origin-right hidden xl:block">
          <span>SPECIMENS INDEXED · VOLUME 01</span>
        </div>
      </div>

      {/* =========================================================================
          SECTION HEADER: DISCOVER FLORIA TYPOGRAPHY & INTRODUCTION (FRAMER MOTION)
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-6xl mx-auto w-full text-center mb-20 sm:mb-28 md:mb-36 will-change-transform"
      >
        {/* Curated Field Journal Emblem */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.02] backdrop-blur-md mb-6 shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.32em] uppercase text-[#C5A059] font-medium">
            DIGITAL ARCHIVE // SPECIMEN DOSSIER
          </span>
          <span className="text-[9px] font-mono text-white/30 hidden sm:inline">· 05 ENTRIES</span>
        </div>

        {/* Large Elegant Headline */}
        <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.14em] font-light uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#EFECE5] to-[#8C877E] leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          DISCOVER FLORIA
        </h2>

        {/* Introduction Prose */}
        <p className="font-cormorant text-xl sm:text-2xl md:text-3xl font-light italic text-[#E5E0D5] max-w-3xl mx-auto mt-6 leading-relaxed drop-shadow-md">
          “An interactive chronicle of an unexplored world. Where luminous fauna wander through moss-veiled valleys, ancient stone arches frame eternal horizons, and quiet wonder rests in every shadow.”
        </p>

        {/* Field Journal Division Line */}
        <div className="mt-8 flex items-center justify-center gap-4 text-[10px] sm:text-[11px] font-mono tracking-[0.28em] text-[#8E8A81] uppercase">
          <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-white/20" />
          <span>FIELD JOURNAL · VOLUME 01</span>
          <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-white/20" />
        </div>
      </motion.div>

      {/* =========================================================================
          ASYMMETRIC EDITORIAL GRID OF CREATURE / REALM CARDS (FRAMER MOTION)
          ========================================================================= */}
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mb-28 sm:mb-40">
        {items.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
                scale: 1.015,
                transition: { duration: 0.35, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.98 }}
              className={`${item.colSpan} group relative rounded-[28px] sm:rounded-[34px] overflow-hidden border border-white/[0.08] hover:border-[#C5A059]/50 bg-[#060606] cursor-pointer ${item.tiltClass} hover:shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(197,160,89,0.08)] will-change-transform`}
              onClick={() => onSelectCreature?.(item.id)}
            >
              {/* Card Container Height */}
              <div className={`relative w-full ${item.heightClass} overflow-hidden`}>
                {/* Background Image Layer */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out select-none pointer-events-none"
                />

                {/* Dark Vignette & Multi-Layer Gradient Overlays for Editorial Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 group-hover:opacity-85 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

                {/* Ambient Corner Specimen Ring */}
                <div className="absolute inset-0 rounded-[28px] sm:rounded-[34px] ring-1 ring-inset ring-white/[0.06] group-hover:ring-[#C5A059]/30 transition-all duration-500 pointer-events-none" />

                {/* Top Card Bar: Category Badge & Specimen Code */}
                <div className="absolute top-5 sm:top-7 inset-x-5 sm:inset-x-7 flex items-center justify-between z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.12] group-hover:border-[#C5A059]/40 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-[#E5E0D5]">
                      {item.category}
                    </span>
                  </div>

                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.26em] uppercase text-[#8E8A81] group-hover:text-[#C5A059] transition-colors bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                    {item.specimenCode}
                  </span>
                </div>

                {/* Bottom Card Content: Title, Scientific Name, Description & Metadata */}
                <div className="absolute bottom-5 sm:bottom-7 inset-x-5 sm:inset-x-7 z-10">
                  {/* Scientific Subtitle */}
                  <span className="font-cormorant text-sm sm:text-base italic text-[#C5A059] block mb-1 drop-shadow">
                    {item.scientificName}
                  </span>

                  {/* Main Title */}
                  <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl tracking-[0.14em] uppercase text-[#F2EEE4] group-hover:text-white transition-colors leading-tight drop-shadow-md">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#A8A49B] font-light leading-relaxed mt-2.5 max-w-xl group-hover:text-[#D1CDC4] transition-colors line-clamp-3 sm:line-clamp-none">
                    {item.description}
                  </p>

                  {/* Expandable / Reactive Metadata Row */}
                  <div className="mt-4 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#8E8A81]">
                    <div className="flex items-center gap-3">
                      <span>COORD: <strong className="text-[#E0DDD5] font-normal">{item.coords}</strong></span>
                      <span className="hidden sm:inline">·</span>
                      <span className="hidden sm:inline">ELEV: <strong className="text-[#C5A059] font-normal">{item.elevation}</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      <span className="text-[#C5A059] uppercase tracking-[0.2em] font-medium text-[9px]">
                        INSPECT
                      </span>
                      <span className="text-[#C5A059]">→</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =========================================================================
          CENTERED STRONG CALL TO ACTION: "ENTER THE WORLD →" (FRAMER MOTION)
          ========================================================================= */}
      <div className="relative max-w-4xl mx-auto w-full text-center pb-20 sm:pb-32">
        <div className="relative inline-block">
          {/* Subtle Ambient Button Glow */}
          <div
            className="absolute -inset-2 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(197, 160, 89, 0.4) 0%, transparent 70%)",
            }}
          />

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEnterWorld}
            className="group relative inline-flex items-center gap-4 px-10 sm:px-14 py-5 sm:py-6 rounded-full border border-[#C5A059]/40 hover:border-[#C5A059] bg-gradient-to-r from-black/80 via-[#12110E] to-black/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(197,160,89,0.15)] hover:shadow-[0_20px_60px_rgba(197,160,89,0.3)] transition-all duration-300 cursor-pointer overflow-hidden will-change-transform"
          >
            {/* Shimmer sweep effect */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)",
              }}
            />

            <span className="w-2 h-2 rounded-full bg-[#C5A059] group-hover:scale-125 transition-transform" />

            <span className="font-cinzel text-sm sm:text-base md:text-lg tracking-[0.28em] uppercase text-[#F2EEE4] group-hover:text-white font-medium transition-colors">
              ENTER THE WORLD
            </span>

            <span className="text-base sm:text-lg text-[#C5A059] group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </motion.button>
        </div>

        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#736F67] mt-5">
          TOUCH THE ARCHIVE TO COMMENCE EXPEDITION
        </p>
      </div>
    </section>
  );
}

