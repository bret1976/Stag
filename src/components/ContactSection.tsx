import React, { useState } from 'react';
import { PixelDissolve } from './PixelDissolve';
import { playStudioSound } from '../data/content';

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    agreed: false
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim()) {
      setErrorMessage('Please enter your name and a valid email address.');
      setStatus('error');
      return;
    }
    if (!formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email format.');
      setStatus('error');
      return;
    }
    if (!formData.agreed) {
      setErrorMessage('Please confirm agreement to be contacted.');
      setStatus('error');
      return;
    }

    setErrorMessage('');
    setStatus('submitting');
    playStudioSound('submit');

    // Simulate reliable dispatch
    setTimeout(() => {
      setStatus('success');
      playStudioSound('click');
    }, 900);
  };

  const scrollToTop = () => {
    playStudioSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="relative w-full bg-white text-[#0A0A0A] overflow-hidden">
      {/* Top Signal Orange Pixel Dissolve dripping into white */}
      <PixelDissolve topColor="#FF321C" bottomColor="#FFFFFF" height={80} direction="down" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-8 pb-16">
        {/* Oversized CONTACT Display Typography (Matching reference frames 00:07, 00:13) */}
        <div className="relative select-none pointer-events-none">
          <h2 className="font-display text-[15vw] sm:text-[16vw] font-black leading-[0.8] tracking-tighter text-[#0A0A0A] uppercase">
            CONTACT
          </h2>
        </div>

        {/* Signal Orange Rectangular Form Block Overlapping CONTACT (Matching reference frames 00:01, 00:07, 00:13) */}
        <div className="relative -mt-[6vw] sm:-mt-[8vw] z-10 w-full bg-[#FF321C] text-white p-6 sm:p-10 md:p-14 shadow-2xl">
          <div className="mb-6 flex items-center justify-between border-b border-white/20 pb-4">
            <span className="font-mono-tech text-xs tracking-widest uppercase font-bold text-white/90">
              CONTACT US
            </span>
            <span className="font-mono-tech text-xs text-white/70">
              HELLO@STAGFORM.STUDIO
            </span>
          </div>

          {status === 'success' ? (
            <div className="py-12 text-center space-y-4">
              <span className="font-mono-tech text-xs tracking-widest uppercase px-3 py-1 bg-white text-black inline-block">
                TRANSMISSION RECEIVED
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase">
                THANK YOU, {formData.firstName.toUpperCase()}.
              </h3>
              <p className="max-w-md mx-auto text-sm text-white/90 font-mono-tech">
                Your message has arrived at the STAGFORM desk. We review new project inquiries within 24 hours.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({ firstName: '', lastName: '', email: '', message: '', agreed: false });
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-black text-white text-xs font-mono-tech hover:bg-white hover:text-black transition-colors"
              >
                SEND ANOTHER INQUIRY ↗
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && errorMessage && (
                <div className="p-3 bg-black/30 border border-white/40 text-xs font-mono-tech text-white">
                  ⚠ {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left Column: First Name, Last Name, Email */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-mono-tech uppercase tracking-wider text-white/80 mb-2">
                      First name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                      required
                      className="w-full bg-transparent border-b border-white/60 focus:border-white py-2 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-xs font-mono-tech uppercase tracking-wider text-white/80 mb-2">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full bg-transparent border-b border-white/60 focus:border-white py-2 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono-tech uppercase tracking-wider text-white/80 mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      required
                      className="w-full bg-transparent border-b border-white/60 focus:border-white py-2 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Right Column: Project Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono-tech uppercase tracking-wider text-white/80 mb-2">
                      Tell us about your project
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe your vision, scope, estimated timeline, or budget requirements..."
                      className="w-full bg-transparent border-b border-white/60 focus:border-white py-2 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none resize-none transition-colors"
                    />
                  </div>

                  {/* Agreement & Submit button row */}
                  <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="agreed"
                        checked={formData.agreed}
                        onChange={handleChange}
                        className="w-4 h-4 accent-black rounded cursor-pointer"
                      />
                      <span className="text-[11px] font-mono-tech text-white/90">
                        I agree to be contacted about this project.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="px-8 py-3 rounded-full bg-white text-black hover:bg-black hover:text-white text-xs font-mono-tech font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50"
                    >
                      <span>{status === 'submitting' ? 'SENDING...' : 'SEND'}</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* White Editorial Footer (Matching reference frames 00:01, 00:08, 00:14) */}
        <footer className="mt-16 pt-12 border-t border-black/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12">
            {/* Elegant Serif Wordmark */}
            <div className="space-y-1">
              <h3 className="font-serif-brand text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#0A0A0A]">
                STAGFORM<span className="text-[#FF321C]">.</span>
                <span className="text-base text-black/40 align-top ml-1 font-mono-tech">®</span>
              </h3>
            </div>

            {/* Studio Tagline on Right */}
            <div className="max-w-md">
              <p className="font-mono-tech text-xs sm:text-sm text-black/70 leading-relaxed uppercase">
                INDEPENDENT DESIGN STUDIO FOR BOLD IDENTITIES, DIGITAL EXPERIENCES AND IDEAS BUILT TO LAST.
              </p>
            </div>
          </div>

          {/* Three Metadata Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-t border-b border-black/10 font-mono-tech text-xs">
            <div>
              <span className="text-black/40 uppercase block mb-1">CONTACT</span>
              <a
                href="mailto:hello@stagform.studio"
                className="text-black hover:text-[#FF321C] transition-colors font-medium"
              >
                HELLO@STAGFORM.STUDIO
              </a>
            </div>

            <div>
              <span className="text-black/40 uppercase block mb-1">BASED IN</span>
              <p className="text-black font-medium uppercase">
                KYIV, UKRAINE / WORKING WORLDWIDE
              </p>
            </div>

            <div>
              <span className="text-black/40 uppercase block mb-1">FOLLOW</span>
              <div className="flex items-center gap-4 text-black uppercase font-medium">
                <a href="#hero" onClick={scrollToTop} className="hover:text-[#FF321C] transition-colors">
                  INSTAGRAM
                </a>
                <a href="#hero" onClick={scrollToTop} className="hover:text-[#FF321C] transition-colors">
                  BEHANCE
                </a>
                <a href="#hero" onClick={scrollToTop} className="hover:text-[#FF321C] transition-colors">
                  LINKEDIN
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar with Back to Top */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-[11px] font-mono-tech text-black/50 gap-3">
            <div>
              © 2026 STAGFORM. STUDIO — ALL RIGHTS RESERVED
            </div>
            <div>
              INDEPENDENT CREATIVE DIGITAL STUDIO
            </div>
            <div>
              <button
                onClick={scrollToTop}
                className="hover:text-[#FF321C] text-black font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>BACK TO TOP</span>
                <span>↑</span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
