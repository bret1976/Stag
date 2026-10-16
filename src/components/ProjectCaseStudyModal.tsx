import { useEffect } from 'react';
import { Project } from '../types';
import { playStudioSound } from '../data/content';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onContactClick: () => void;
}

export function ProjectCaseStudyModal({
  project,
  allProjects,
  onClose,
  onSelectProject,
  onContactClick
}: ProjectCaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0A0A0A]/95 backdrop-blur-xl text-[#F5F5F2] flex flex-col"
    >
      {/* Sticky Case Study Top Navigation */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 bg-[#0A0A0A]/90 border-b border-white/10 backdrop-blur-md">
        <button
          onClick={() => {
            playStudioSound('click');
            onClose();
          }}
          className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#FF321C] text-white transition-all text-xs font-mono-tech cursor-pointer group"
        >
          <span className="text-sm font-mono-tech transition-transform group-hover:-translate-x-1">←</span>
          <span>RETURN TO STACK</span>
        </button>

        <div className="text-center">
          <span className="font-mono-tech text-xs tracking-widest text-[#FF321C] uppercase font-semibold">
            {project.number} / {project.title}
          </span>
        </div>

        <button
          onClick={() => {
            playStudioSound('click');
            onClose();
          }}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF321C] text-white flex items-center justify-center font-mono-tech text-lg transition-colors cursor-pointer"
          aria-label="Close case study"
        >
          ✕
        </button>
      </div>

      {/* Case Study Content */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 md:py-16 space-y-16">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tech text-white/50 uppercase">
            <span>{project.category}</span>
            <span>·</span>
            <span>CLIENT: {project.client}</span>
            <span>·</span>
            <span>YEAR: {project.year}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.9]">
            {project.title}
          </h1>

          <p className="font-syne text-xl sm:text-2xl text-[#FF321C] font-bold uppercase tracking-tight pt-2">
            "{project.tagline}"
          </p>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed font-sans max-w-3xl pt-2">
            {project.description}
          </p>
        </div>

        {/* High-Fidelity Website Screenshot Showcase */}
        <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-900 group">
          <div className="h-10 px-4 bg-[#1F1F1F] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <span className="text-xs font-mono-tech text-white/60">
              https://{project.id}.stagform.studio/preview
            </span>
            <span className="text-xs font-mono-tech text-[#FF321C]">ACTIVE PROTOTYPE</span>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden bg-black">
            <img
              src={project.heroImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Narrative Split: Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-white/10">
          <div className="space-y-3">
            <span className="text-xs font-mono-tech text-[#FF321C] uppercase tracking-widest font-bold">
              THE CREATIVE CHALLENGE
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-white">
              BREAKING CONVENTIONAL PATTERNS
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              {project.challenge}
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono-tech text-[#FF321C] uppercase tracking-widest font-bold">
              OUR STRATEGIC SOLUTION
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-white">
              RADICAL IDENTITY & INTENTIONAL CRAFT
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Capabilities & Design System Palette */}
        <div className="p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono-tech text-white/50 uppercase tracking-widest block mb-1">
                DELIVERED CAPABILITIES
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono-tech text-white"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono-tech text-white/50 uppercase tracking-widest block mb-1">
                BRAND COLOR MATRIX
              </span>
              <div className="flex items-center gap-2 pt-1">
                {project.palette.map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-md border border-white/20 shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Next Project Footer & Contact Action */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 pb-8">
          <div>
            <span className="text-[11px] font-mono-tech text-white/40 uppercase block mb-1">
              READY TO BUILD?
            </span>
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="text-sm font-mono-tech text-[#FF321C] hover:text-white uppercase font-bold tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>DISCUSS A SIMILAR PROJECT WITH STAGFORM</span>
              <span>↗</span>
            </button>
          </div>

          <button
            onClick={() => {
              playStudioSound('shuffle');
              onSelectProject(nextProject);
            }}
            className="px-6 py-3 rounded-full bg-[#FF321C] hover:bg-white text-white hover:text-black transition-all text-xs font-mono-tech font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xl"
          >
            <span>NEXT PROJECT: {nextProject.title}</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
