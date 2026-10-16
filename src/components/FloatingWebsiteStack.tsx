import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { playStudioSound } from '../data/content';

interface FloatingWebsiteStackProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onBackToHero?: () => void;
}

export function FloatingWebsiteStack({
  projects,
  onSelectProject,
  onBackToHero
}: FloatingWebsiteStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Tilt perspective based on mouse coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 14, y: y * 14 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const nextProject = useCallback(() => {
    playStudioSound('shuffle');
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevProject = useCallback(() => {
    playStudioSound('shuffle');
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Touch and drag support for mobile & desktop
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.changedTouches[0].clientX - dragStartX.current;
    if (diff > 50) {
      prevProject();
    } else if (diff < -50) {
      nextProject();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextProject();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject]);

  const currentProject = projects[activeIndex];

  return (
    <section
      id="work"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-screen bg-[#FF321C] text-white py-8 px-4 sm:px-8 md:px-12 flex flex-col justify-between overflow-hidden select-none transition-colors duration-500"
    >
      {/* Top Header Row with Back Button & Studio Indicator */}
      <div className="relative z-30 flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Circular Back Button matching the video (top-left black circle with left arrow) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              playStudioSound('click');
              if (onBackToHero) {
                onBackToHero();
              } else {
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label="Back to Top"
            className="w-12 h-12 rounded-full bg-[#0A0A0A] hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xl group cursor-pointer"
          >
            <span className="text-xl font-mono-tech transition-transform group-hover:-translate-x-1">←</span>
          </button>
          <div className="hidden sm:block">
            <span className="font-syne font-bold text-xs tracking-widest uppercase text-black/70">
              SELECTED WORKS / 0{activeIndex + 1} OF 0{projects.length}
            </span>
          </div>
        </div>

        {/* Minimal Studio Wordmark */}
        <div className="font-serif-brand font-bold text-xl md:text-2xl text-black tracking-tight">
          STAGFORM<span className="text-white">.</span>
        </div>

        {/* Quick Action to open current project */}
        <button
          onClick={() => {
            playStudioSound('click');
            onSelectProject(currentProject);
          }}
          className="px-4 py-2 rounded-full bg-[#0A0A0A] hover:bg-black text-white text-xs font-mono-tech uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
        >
          <span>VIEW STUDY</span>
          <span>↗</span>
        </button>
      </div>

      {/* Main Interactive Stage: Left Index Menu + Center 3D Floating Mockups */}
      <div className="relative z-20 flex-1 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto my-6 gap-8">
        {/* Left Side: Project Index Column (Matching reference video frames 00:00, 00:04, 00:06, 00:11, 00:17) */}
        <div className="w-full lg:w-72 shrink-0 flex flex-row lg:flex-col justify-start gap-4 lg:gap-3 py-2 overflow-x-auto lg:overflow-visible border-b lg:border-b-0 lg:border-l border-black/20 lg:pl-6">
          {projects.map((proj, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  playStudioSound('click');
                  setActiveIndex(idx);
                }}
                className={`text-left group flex items-center gap-3 py-1 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive ? 'opacity-100 translate-x-1' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <span className="font-mono-tech text-xs tracking-widest text-black/80 font-bold">
                  {proj.number}
                </span>
                <span
                  className={`font-syne text-xs sm:text-sm md:text-base font-black tracking-tight uppercase transition-colors ${
                    isActive ? 'text-black underline underline-offset-4 decoration-2' : 'text-black/80 group-hover:text-black'
                  }`}
                >
                  {proj.title}
                </span>
                {isActive && (
                  <span className="hidden lg:inline-block w-2 h-2 rounded-full bg-black ml-auto" />
                )}
              </button>
            );
          })}

          {/* Project Capabilities & Metadata for active card */}
          <div className="hidden lg:block mt-8 pt-6 border-t border-black/20 text-black">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-black/60 block mb-1">
              CATEGORY
            </span>
            <p className="text-xs font-syne font-bold uppercase tracking-tight mb-4">
              {currentProject.category}
            </p>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-black/60 block mb-1">
              CAPABILITIES
            </span>
            <ul className="text-xs font-mono-tech text-black/80 space-y-1">
              {currentProject.capabilities.map((c) => (
                <li key={c} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-black/60" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center: The Iconic 3D Overlapping Floating Website Mockups */}
        <div
          className="relative flex-1 w-full h-[520px] sm:h-[600px] md:h-[660px] flex items-center justify-center perspective-stage"
          style={{
            perspective: '1400px'
          }}
        >
          {projects.map((proj, idx) => {
            const offset = (idx - activeIndex + projects.length) % projects.length;
            const isCurrent = offset === 0;

            let transformStyle = '';
            let zIndex = 10;
            let opacity = 1;

            if (isCurrent) {
              zIndex = 40;
              transformStyle = `
                translate3d(${mouseOffset.x * 1.4}px, ${mouseOffset.y * 1.4}px, 60px)
                rotateY(${mouseOffset.x * 0.7 - 2}deg)
                rotateX(${-mouseOffset.y * 0.7 + 2}deg)
                rotateZ(-1deg)
                scale(1.02)
              `;
            } else if (offset === 1) {
              zIndex = 30;
              transformStyle = `
                translate3d(60px, 30px, -40px)
                rotateY(6deg)
                rotateZ(4deg)
                scale(0.94)
              `;
              opacity = 0.88;
            } else if (offset === 2) {
              zIndex = 20;
              transformStyle = `
                translate3d(-70px, -20px, -120px)
                rotateY(-8deg)
                rotateZ(-5deg)
                scale(0.88)
              `;
              opacity = 0.72;
            } else {
              zIndex = 10;
              transformStyle = `
                translate3d(120px, 60px, -200px)
                rotateY(10deg)
                rotateZ(7deg)
                scale(0.82)
              `;
              opacity = 0.55;
            }

            return (
              <div
                key={proj.id}
                onClick={() => {
                  if (isCurrent) {
                    playStudioSound('click');
                    onSelectProject(proj);
                  } else {
                    playStudioSound('shuffle');
                    setActiveIndex(idx);
                  }
                }}
                className={`absolute w-[300px] sm:w-[380px] md:w-[440px] h-[480px] sm:h-[560px] md:h-[620px] rounded-2xl bg-[#F5F5F2] text-[#0A0A0A] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] overflow-hidden transition-all duration-500 ease-out cursor-pointer preserve-3d border border-black/10 group ${
                  isCurrent ? 'ring-2 ring-black/40' : 'hover:opacity-95'
                }`}
                style={{
                  transform: transformStyle,
                  zIndex,
                  opacity
                }}
              >
                {/* Browser Window Chrome */}
                <div className="h-9 px-4 bg-[#EAEAEA] border-b border-black/10 flex items-center justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/10" />
                  </div>
                  <div className="px-3 py-0.5 rounded-md bg-white text-[10px] font-mono-tech text-black/60 truncate max-w-[180px]">
                    {proj.id}.stagform.studio
                  </div>
                  <div className="text-[10px] font-mono-tech text-black/40">
                    {proj.number}
                  </div>
                </div>

                {/* Simulated Realistic Website Interface inside the Mockup */}
                <div className="h-[calc(100%-36px)] overflow-y-auto overflow-x-hidden p-4 sm:p-5 flex flex-col justify-between bg-white text-[#0A0A0A]">
                  {/* Mockup Header Navigation */}
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-black/10 text-[10px] font-mono-tech uppercase">
                      <span className="font-bold tracking-tight text-xs">{proj.title}</span>
                      <div className="hidden sm:flex items-center gap-2 text-black/60">
                        {proj.websitePreview.navigation.slice(0, 3).map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </div>

                    {/* Mockup Hero Headline & Subtitle */}
                    <div className="pt-4 pb-2">
                      <p className="text-[10px] font-mono-tech uppercase tracking-widest text-[#FF321C] font-semibold mb-1">
                        {proj.category.split('/')[0]}
                      </p>
                      <h4 className="font-display text-xl sm:text-2xl font-black leading-tight tracking-tight uppercase">
                        {proj.websitePreview.heroTitle}
                      </h4>
                      <p className="mt-1.5 text-xs text-black/70 leading-relaxed font-sans line-clamp-2">
                        {proj.websitePreview.heroSubtitle}
                      </p>
                    </div>

                    {/* Mockup Main Hero Imagery */}
                    <div className="my-3 relative rounded-xl overflow-hidden aspect-[16/10] bg-neutral-900 border border-black/10 group-hover:shadow-md transition-shadow">
                      <img
                        src={proj.heroImage}
                        alt={proj.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {proj.websitePreview.highlightMetric && (
                        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm text-white text-[10px] font-mono-tech flex items-center gap-1.5">
                          <span className="text-[#FF321C] font-bold">
                            {proj.websitePreview.highlightMetric}
                          </span>
                          <span className="text-white/80">
                            {proj.websitePreview.highlightLabel}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mockup Lower Editorial Content Section */}
                  <div className="pt-2 border-t border-black/10">
                    <p className="font-syne text-[11px] font-bold uppercase tracking-tight text-black/80 mb-2">
                      "{proj.websitePreview.statement}"
                    </p>
                    <div className="flex items-center justify-between text-[10px] font-mono-tech text-black/50">
                      <span>{proj.websitePreview.taglineBottom || 'INDEPENDENT CONCEPT'}</span>
                      <span className="text-[#FF321C] font-bold group-hover:translate-x-1 transition-transform">
                        EXPLORE ↗
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtle Hover Action Pill Overlay on Foreground Card */}
                {isCurrent && (
                  <div className="absolute bottom-4 right-4 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-3 py-1.5 rounded-full bg-black text-white text-[11px] font-mono-tech shadow-xl">
                      CLICK TO OPEN ↗
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Controls Row: Arrows + Indicator + Manifesto Teaser */}
      <div className="relative z-30 flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl mx-auto pt-4 border-t border-black/20 gap-4">
        {/* Project Name and Year */}
        <div className="flex items-center gap-4 text-black">
          <span className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight">
            {currentProject.title}
          </span>
          <span className="font-mono-tech text-xs bg-black text-white px-2 py-0.5 rounded">
            {currentProject.year}
          </span>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevProject}
            aria-label="Previous project"
            className="w-10 h-10 rounded-full bg-black/10 hover:bg-black text-black hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ←
          </button>
          <div className="flex items-center gap-1.5 px-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playStudioSound('shuffle');
                  setActiveIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? 'w-8 bg-black' : 'w-2 bg-black/30 hover:bg-black/60'
                }`}
                aria-label={`Jump to project ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextProject}
            aria-label="Next project"
            className="w-10 h-10 rounded-full bg-black/10 hover:bg-black text-black hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            →
          </button>
        </div>

        {/* Next Section Anchor */}
        <div className="hidden md:block">
          <button
            onClick={() => {
              playStudioSound('click');
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-mono-tech text-black/70 hover:text-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
          >
            <span>SERVICES & PROCESS</span>
            <span>↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
