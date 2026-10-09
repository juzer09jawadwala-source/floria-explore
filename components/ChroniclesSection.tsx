"use client";

interface ChroniclesSectionProps {
  onOpenExplore?: () => void;
  onOpenCreatures?: () => void;
}

export default function ChroniclesSection({
  onOpenExplore,
  onOpenCreatures,
}: ChroniclesSectionProps) {
  const realms = [
    {
      id: "01",
      title: "THE EMERALD ARBOR",
      subtitle: "High Canopies & Ancient Glades",
      coords: "45°18'N · 122°39'W",
      elevation: "820M",
      description:
        "Where towering firs touch the sky and sunlight filters in amber rays upon moss-blanketed cedar roots.",
      tag: "ALPINE REALM",
      specimen: "Lichen & Amber Blossom",
    },
    {
      id: "02",
      title: "WHISPERING CASCADE",
      subtitle: "Glacial Springs & Forgotten Shrines",
      coords: "45°12'N · 122°45'W",
      elevation: "410M",
      description:
        "Crystal torrents flowing from mountain ridges, nurturing the eternal hydrangeas that line the valley edge.",
      tag: "WATERWAY",
      specimen: "River Lily & Blue Quartz",
    },
    {
      id: "03",
      title: "THE TWILIGHT HOLLOW",
      subtitle: "Bioluminescent Groves & Secret Paths",
      coords: "45°09'N · 122°51'W",
      elevation: "290M",
      description:
        "At dusk, curious woodland creatures gather beneath lantern-lit canopies as the evening mist rolls over stone pathways.",
      tag: "SANCTUARY",
      specimen: "Glow Moss & Evening Primrose",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#000000] text-white py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col justify-between border-t border-white/[0.08] z-30">
      {/* Subtle ambient light */}
      <div 
        className="absolute top-0 inset-x-0 h-64 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(197, 160, 89, 0.08) 0%, transparent 70%)"
        }}
      />

      {/* Editorial Header */}
      <div className="relative max-w-5xl mx-auto w-full text-center mb-16 sm:mb-24">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.02] backdrop-blur-md mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#C5A059]">
            DISCOVERY INDEX // VOLUME 03
          </span>
        </div>

        <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.12em] font-light uppercase text-[#F2EEE4] leading-tight drop-shadow-md">
          THE LIVING REALMS
        </h2>

        <p className="font-cormorant text-lg sm:text-2xl md:text-3xl italic font-light text-[#A8A49B] max-w-3xl mx-auto mt-4 leading-relaxed">
          “Beyond the river bend lie sanctuaries untouched by iron and clockwork, where curious wanderers find quiet wonder.”
        </p>
      </div>

      {/* Grid of Realm Dossier Cards */}
      <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
        {realms.map((realm) => (
          <div
            key={realm.id}
            className="group relative rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-[#C5A059]/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          >
            {/* Card Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                <span className="font-mono text-xs text-[#C5A059] tracking-[0.25em]">
                  Nº {realm.id}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8E8A81] px-2 py-0.5 rounded bg-white/[0.03]">
                  {realm.tag}
                </span>
              </div>

              <h3 className="font-cinzel text-lg sm:text-xl tracking-[0.16em] uppercase text-[#EDE8DE] group-hover:text-white transition-colors">
                {realm.title}
              </h3>
              <p className="font-cormorant text-sm italic text-[#C5A059] mt-0.5 mb-3">
                {realm.subtitle}
              </p>

              <p className="text-xs sm:text-[13px] text-[#9E9A90] font-light leading-relaxed mb-6">
                {realm.description}
              </p>
            </div>

            {/* Card Metadata Footer */}
            <div className="pt-4 border-t border-white/[0.06] space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-[#8E8A81]">
                <span>COORDINATES</span>
                <span className="text-[#C5A059]">{realm.coords}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#8E8A81]">
                <span>ELEVATION</span>
                <span>{realm.elevation}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#8E8A81]">
                <span>SPECIMEN</span>
                <span className="italic font-serif text-[#EDE8DE]">{realm.specimen}</span>
              </div>

              <button
                onClick={onOpenExplore}
                className="w-full mt-4 py-2 rounded-xl border border-white/[0.1] bg-white/[0.02] text-[10px] font-mono uppercase tracking-[0.22em] text-[#EDE8DE] group-hover:bg-[#C5A059] group-hover:text-black group-hover:border-[#C5A059] transition-all duration-300 cursor-pointer text-center"
              >
                OPEN DOSSIER
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Section Bottom / Footer */}
      <div className="relative max-w-6xl mx-auto w-full pt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#8E8A81]">
        <div className="flex items-center gap-3">
          <div className="flex gap-[3px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EDE8DE]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#999489]" />
          </div>
          <span className="font-cormorant text-xl tracking-[0.18em] lowercase text-[#EDE8DE]">
            floria
          </span>
          <span className="font-mono text-[10px] tracking-widest text-[#736F67] ml-2">
            © FLORIA ARCHIVES · SANCTUARY 2026
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.2em] uppercase">
          <button 
            onClick={onOpenCreatures}
            className="hover:text-white transition-colors cursor-pointer"
          >
            FIELD GUIDE
          </button>
          <span>·</span>
          <button 
            onClick={onOpenExplore}
            className="hover:text-white transition-colors cursor-pointer"
          >
            CARTOGRAPHY
          </button>
          <span>·</span>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </section>
  );
}
