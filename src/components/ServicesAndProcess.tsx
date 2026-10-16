import { useState } from 'react';
import { SERVICES, PROCESS_PHASES, STUDIO_MANIFESTO, PHILOSOPHY, playStudioSound } from '../data/content';
import { PixelDissolve } from './PixelDissolve';

export function ServicesAndProcess() {
  const [activeProcessTab, setActiveProcessTab] = useState(0);

  return (
    <div className="w-full bg-[#0A0A0A] text-[#F5F5F2]">
      {/* SECTION 02: STUDIO MANIFESTO (Matching Part 5 Section 02) */}
      <section id="manifesto" className="relative w-full py-20 px-6 sm:px-10 md:px-14 bg-[#FF321C] text-black">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-black/20 pb-4">
            <span className="font-mono-tech text-xs tracking-widest uppercase font-bold text-black/70">
              {STUDIO_MANIFESTO.eyebrow}
            </span>
            <span className="font-mono-tech text-xs tracking-widest uppercase text-black/60">
              STAGFORM THESIS
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.88] tracking-tighter uppercase">
            SAFE ISN'T A DESIGN STRATEGY.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-black/20">
            {STUDIO_MANIFESTO.paragraphs.map((p, i) => (
              <p key={i} className="font-syne text-sm sm:text-base font-bold uppercase leading-relaxed text-black/90">
                {p}
              </p>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-mono-tech text-black font-bold uppercase">
            <span>{STUDIO_MANIFESTO.closing}</span>
            <span className="text-xl">↗</span>
          </div>
        </div>
      </section>

      {/* Pixel Dissolve: Orange into Dark */}
      <PixelDissolve topColor="#FF321C" bottomColor="#0A0A0A" height={60} direction="down" />

      {/* SECTION 08: WHAT WE DO (03 / THE WORK) */}
      <section id="services" className="relative w-full py-24 px-6 sm:px-10 md:px-14 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
            <div>
              <span className="font-mono-tech text-xs text-[#FF321C] tracking-widest uppercase block mb-1">
                03 / THE WORK
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
                BIG IDEAS. BETTER EXECUTION.
              </h2>
            </div>
            <span className="hidden sm:inline-block font-mono-tech text-xs text-white/40">
              [ 06 CAPABILITIES ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="group p-6 sm:p-8 rounded-2xl bg-[#141414] hover:bg-[#1A1A1A] border border-white/10 hover:border-[#FF321C]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-tech text-white/40 mb-4">
                    <span>{srv.number}</span>
                    <span className="text-[#FF321C] group-hover:translate-x-1 transition-transform">↗</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-white mb-2">
                    {srv.title}
                  </h3>
                  <p className="font-syne text-xs text-[#FF321C] font-semibold uppercase mb-3">
                    {srv.headline}
                  </p>
                  <p className="text-xs text-white/70 leading-relaxed font-sans mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {srv.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono-tech text-white/50 bg-white/5 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 09: OUR PROCESS (04 / HOW WE THINK) */}
      <section id="process" className="relative w-full py-24 px-6 sm:px-10 md:px-14 bg-[#111111] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
            <div>
              <span className="font-mono-tech text-xs text-[#FF321C] tracking-widest uppercase block mb-1">
                04 / HOW WE THINK
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
                THINK BOLD. BUILD BETTER.
              </h2>
            </div>
            <p className="hidden md:block max-w-xs text-xs font-mono-tech text-white/50 text-right">
              THE STRONGEST CREATIVE WORK ISN'T ACCIDENTAL. IT COMES FROM AUDACIOUS EXPERIMENTATION.
            </p>
          </div>

          {/* Interactive Phase Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-white/10 pb-4">
            {PROCESS_PHASES.map((phase, idx) => {
              const isActive = idx === activeProcessTab;
              return (
                <button
                  key={phase.id}
                  onClick={() => {
                    playStudioSound('click');
                    setActiveProcessTab(idx);
                  }}
                  className={`text-left p-3 rounded-lg transition-all cursor-pointer ${
                    isActive ? 'bg-[#FF321C] text-white shadow-lg' : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] font-mono-tech uppercase block font-bold">
                    PHASE {phase.number}
                  </span>
                  <span className="font-syne text-xs sm:text-sm font-bold uppercase block truncate">
                    {phase.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Phase Details */}
          <div className="p-8 sm:p-12 rounded-2xl bg-[#191919] border border-white/10 flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-mono-tech text-[#FF321C] uppercase tracking-widest font-bold">
                PHASE {PROCESS_PHASES[activeProcessTab].number} // {PROCESS_PHASES[activeProcessTab].title}
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-white">
                {PROCESS_PHASES[activeProcessTab].headline}
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans">
                {PROCESS_PHASES[activeProcessTab].description}
              </p>
            </div>

            <div className="w-full md:w-72 shrink-0 p-5 rounded-xl bg-black/40 border border-white/10 space-y-3">
              <span className="text-[11px] font-mono-tech text-white/40 uppercase tracking-widest block">
                PHASE DELIVERABLES
              </span>
              <ul className="space-y-2 text-xs font-mono-tech text-white/80">
                {PROCESS_PHASES[activeProcessTab].deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF321C]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: PHILOSOPHY */}
      <section id="philosophy" className="relative w-full py-24 px-6 sm:px-10 md:px-14 bg-[#0A0A0A] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono-tech text-xs text-[#FF321C] tracking-widest uppercase block mb-1">
              {PHILOSOPHY.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
              {PHILOSOPHY.headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PHILOSOPHY.principles.map((pr, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-3">
                <span className="text-xs font-mono-tech text-[#FF321C] font-bold">
                  0{i + 1}
                </span>
                <h4 className="font-display text-xl font-bold uppercase text-white">
                  {pr.title}
                </h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                  {pr.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-8 text-center">
            <p className="font-syne text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#FF321C] tracking-tight">
              "{PHILOSOPHY.closing}"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
