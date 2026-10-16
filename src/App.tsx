/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HalftonePortrait } from './components/HalftonePortrait';
import { FloatingWebsiteStack } from './components/FloatingWebsiteStack';
import { ServicesAndProcess } from './components/ServicesAndProcess';
import { ContactSection } from './components/ContactSection';
import { ProjectCaseStudyModal } from './components/ProjectCaseStudyModal';
import { NavigationOverlay } from './components/NavigationOverlay';
import { PROJECTS } from './data/projects';
import { Project } from './types';
import { playStudioSound } from './data/content';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F2] font-sans selection:bg-[#FF321C] selection:text-white">
      {/* Floating Menu Button (Top Left Overlay matching reference) */}
      <div className="fixed top-6 left-6 z-40">
        <button
          onClick={() => {
            playStudioSound('click');
            setIsNavOpen(true);
          }}
          aria-label="Open Studio Menu"
          className="w-12 h-12 rounded-full bg-black/80 hover:bg-[#FF321C] text-white flex items-center justify-center border border-white/20 backdrop-blur-md shadow-2xl transition-all duration-200 hover:scale-105 cursor-pointer group"
          title="Open Menu"
        >
          <div className="w-5 flex flex-col gap-1 items-center">
            <span className="w-5 h-0.5 bg-white rounded-full transition-transform group-hover:w-4" />
            <span className="w-3.5 h-0.5 bg-white rounded-full transition-transform group-hover:w-5" />
            <span className="w-5 h-0.5 bg-white rounded-full transition-transform group-hover:w-4" />
          </div>
        </button>
      </div>

      {/* Floating Contact Shortcut Button (Top Right) */}
      <div className="fixed top-6 right-6 z-40">
        <button
          onClick={() => {
            playStudioSound('click');
            handleNavigate('contact');
          }}
          className="px-4 py-2 rounded-full bg-black/80 hover:bg-[#FF321C] text-white border border-white/20 backdrop-blur-md text-xs font-mono-tech uppercase tracking-wider shadow-2xl transition-all hover:scale-105 cursor-pointer"
        >
          CONTACT ↗
        </button>
      </div>

      {/* SECTION 01: HALFTONE STAG PORTRAIT ENGINE & KINETIC TYPOGRAPHY */}
      <HalftonePortrait
        onScrollDown={() => handleNavigate('work')}
        onOpenMenu={() => setIsNavOpen(true)}
      />

      {/* SECTION 03: 3D FLOATING WEBSITE MOCKUP STACK (THE RECORDING'S SIGNATURE COMPOSITION) */}
      <FloatingWebsiteStack
        projects={PROJECTS}
        onSelectProject={(proj) => {
          setSelectedProject(proj);
        }}
        onBackToHero={() => handleNavigate('hero')}
      />

      {/* SECTIONS 02, 08, 09, 10: MANIFESTO, SERVICES, PROCESS & PHILOSOPHY */}
      <ServicesAndProcess />

      {/* SECTION 11 & 12: OVERSIZED CONTACT, RECTANGULAR FORM & EDITORIAL FOOTER */}
      <ContactSection />

      {/* FULL PROJECT CASE STUDY MODAL */}
      <ProjectCaseStudyModal
        project={selectedProject}
        allProjects={PROJECTS}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onContactClick={() => handleNavigate('contact')}
      />

      {/* FULLSCREEN STUDIO NAVIGATION DRAWER */}
      <NavigationOverlay
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
