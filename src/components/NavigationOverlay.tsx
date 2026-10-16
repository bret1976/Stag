import { useEffect } from 'react';
import { playStudioSound } from '../data/content';

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export function NavigationOverlay({ isOpen, onClose, onNavigate }: NavigationOverlayProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const links = [
    { label: 'HOME', id: 'hero', number: '00' },
    { label: 'WORK', id: 'work', number: '01' },
    { label: 'MANIFESTO', id: 'manifesto', number: '02' },
    { label: 'SERVICES', id: 'services', number: '03' },
    { label: 'PROCESS', id: 'process', number: '04' },
    { label: 'PHILOSOPHY', id: 'philosophy', number: '05' },
    { label: 'CONTACT', id: 'contact', number: '06' }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl text-[#F5F5F2] flex flex-col justify-between p-6 sm:p-12"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <span className="font-serif-brand text-2xl font-bold tracking-tight">
          STAGFORM<span className="text-[#FF321C]">.</span>
        </span>

        <button
          onClick={() => {
            playStudioSound('click');
            onClose();
          }}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#FF321C] text-white flex items-center justify-center font-mono-tech text-xl transition-all cursor-pointer"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="my-auto py-8 space-y-4">
        {links.map((link) => (
          <div key={link.id} className="overflow-hidden">
            <button
              onClick={() => {
                playStudioSound('click');
                onClose();
                onNavigate(link.id);
              }}
              className="group flex items-baseline gap-4 sm:gap-6 text-left cursor-pointer transition-transform hover:translate-x-3 duration-200"
            >
              <span className="font-mono-tech text-xs sm:text-sm text-white/40 group-hover:text-[#FF321C] transition-colors">
                {link.number}
              </span>
              <span className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase text-white group-hover:text-[#FF321C] transition-colors">
                {link.label}
              </span>
              <span className="opacity-0 group-hover:opacity-100 text-[#FF321C] text-2xl font-mono-tech transition-opacity">
                ↗
              </span>
            </button>
          </div>
        ))}
      </nav>

      {/* Bottom Footer Info */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono-tech text-white/60 gap-4">
        <div>
          INDEPENDENT CREATIVE DIGITAL STUDIO
        </div>
        <div>
          KYIV / WORLDWIDE · HELLO@STAGFORM.STUDIO
        </div>
        <div>
          [ ESC TO CLOSE ]
        </div>
      </div>
    </div>
  );
}
