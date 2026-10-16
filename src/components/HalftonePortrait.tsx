import { useEffect, useRef, useState } from 'react';
import { playStudioSound } from '../data/content';

interface HalftonePortraitProps {
  onScrollDown?: () => void;
  onOpenMenu?: () => void;
}

const GLYPH_SETS = [
  'WH-RE +RAHE MIODE SOAPR HIOL+AL OORRD=',
  'W*RO* S*R# +O= +--E **R*A* RO-E-E',
  'WRE-# -RRRS M*#RH HHA-R *S+--AO +0=*DE',
  'STAG +FORM 2026 BR-VE *#IDEAS IMP-SSIBLE'
];

export function HalftonePortrait({ onScrollDown }: HalftonePortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [glyphIndex, setGlyphIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [density, setDensity] = useState<'dense' | 'fine'>('fine');

  // Load and sample the stag image onto the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number | undefined;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/src/assets/images/stag_silhouette_portrait_1792095166306.jpg';

    let isLoaded = false;
    img.onload = () => {
      isLoaded = true;
      render();
    };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      if (isLoaded) render();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    function render() {
      if (!canvas || !ctx) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      if (!isLoaded) {
        ctx.fillStyle = '#1c1c1c';
        ctx.font = '14px monospace';
        ctx.fillText('INITIALIZING STAGFORM HALFTONE ENGINE...', width / 2 - 150, height / 2);
        return;
      }

      // Draw image offscreen to sample pixels
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      const sampleScale = density === 'fine' ? 0.16 : 0.12;
      offCanvas.width = Math.floor(width * sampleScale);
      offCanvas.height = Math.floor(height * sampleScale);

      // Fit image cover into offscreen canvas
      const imgAspect = img.width / img.height;
      const screenAspect = width / height;
      let drawW = offCanvas.width;
      let drawH = offCanvas.height;
      let drawX = 0;
      let drawY = 0;

      if (screenAspect > imgAspect) {
        drawH = offCanvas.width / imgAspect;
        drawY = (offCanvas.height - drawH) / 2;
      } else {
        drawW = offCanvas.height * imgAspect;
        drawX = (offCanvas.width - drawW) / 2;
      }

      offCtx.drawImage(img, drawX, drawY, drawW, drawH);
      const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
      const pixels = imgData.data;

      const step = density === 'fine' ? 7 : 10;
      const cols = Math.floor(width / step);
      const rows = Math.floor(height / step);

      const mx = mousePos.x;
      const my = mousePos.y;

      // Render halftone matrix
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * step + step / 2;
          const y = r * step + step / 2;

          // Sample pixel brightness
          const sampleX = Math.floor((x / width) * offCanvas.width);
          const sampleY = Math.floor((y / height) * offCanvas.height);
          const index = (sampleY * offCanvas.width + sampleX) * 4;

          const red = pixels[index] || 0;
          const green = pixels[index + 1] || 0;
          const blue = pixels[index + 2] || 0;
          const brightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;

          if (brightness < 0.04) {
            // Draw faint ambient dot grid
            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
            continue;
          }

          // Cursor interactive distance
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseInfluence = dist < 120 ? (1 - dist / 120) * 0.5 : 0;

          const dotRadius = Math.max(0.8, (brightness * (step * 0.52)) + mouseInfluence * 2.5);

          // Luminous color: white dots with occasional signal orange rim near mouse
          if (mouseInfluence > 0.1 && Math.random() < 0.15) {
            ctx.fillStyle = '#ff321c';
          } else {
            const alpha = 0.25 + brightness * 0.75;
            ctx.fillStyle = `rgba(245, 245, 242, ${alpha})`;
          }

          // Render square pixel or circular dot
          ctx.fillRect(x - dotRadius / 2, y - dotRadius / 2, dotRadius, dotRadius);
        }
      }
    }

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos, density]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleGlyphClick = () => {
    playStudioSound('shuffle');
    setGlyphIndex((prev) => (prev + 1) % GLYPH_SETS.length);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[640px] bg-[#0A0A0A] overflow-hidden select-none"
    >
      {/* Halftone Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Top Header Row within the Dark Animal Stage */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-6 md:px-10">
        {/* Circular Back / Navigation trigger matching the video */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playStudioSound('click');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Back to Top"
            className="w-11 h-11 rounded-full bg-[#1A1A1A] hover:bg-[#FF321C] border border-white/10 text-white flex items-center justify-center transition-all duration-200 shadow-md group"
          >
            <span className="text-lg font-mono-tech transition-transform group-hover:-translate-x-0.5">←</span>
          </button>
          <span className="hidden sm:inline-block text-[11px] font-mono-tech tracking-widest uppercase text-white/50">
            INDEX 00 / 04
          </span>
        </div>

        {/* Center Brand Identity */}
        <div className="text-center">
          <span className="font-serif-brand text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-1">
            STAGFORM<span className="text-[#FF321C]">.</span>
            <span className="text-[10px] text-white/40 font-mono-tech font-normal align-top">®</span>
          </span>
        </div>

        {/* Right Halftone & Audio Toggles */}
        <div className="flex items-center gap-3 text-xs font-mono-tech">
          <button
            onClick={() => {
              playStudioSound('click');
              setDensity((d) => (d === 'fine' ? 'dense' : 'fine'));
            }}
            className="hidden sm:inline-block px-3 py-1.5 rounded-full border border-white/20 hover:border-white/60 text-white/80 transition-colors uppercase text-[10px]"
          >
            MATRIX: {density.toUpperCase()}
          </button>
          <button
            onClick={() => {
              playStudioSound('hover');
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-1.5 rounded-full bg-[#FF321C] text-white font-medium hover:bg-white hover:text-black transition-colors text-[11px] tracking-wider uppercase"
          >
            WORK ↗
          </button>
        </div>
      </div>

      {/* Center Fragmented Typography Overlay - Matching frames 00:02, 00:03, 00:09, 00:15 */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-14 lg:p-20 pointer-events-none">
        <div className="max-w-4xl space-y-4">
          {/* Fragmented Kinetic Glyphs in Signal Orange */}
          <div
            onClick={handleGlyphClick}
            className="pointer-events-auto cursor-pointer inline-block group"
            title="Click to randomize typography fragments"
          >
            <div className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#FF321C] leading-[0.88] tracking-tighter uppercase select-none transition-all duration-300 drop-shadow-[0_4px_24px_rgba(255,50,28,0.35)]">
              {glyphIndex === 0 && (
                <>
                  <div>WE MAKE</div>
                  <div className="flex items-baseline gap-2">
                    <span>BRAVE</span>
                    <span className="text-white/80 text-2xl sm:text-4xl font-mono-tech">/*</span>
                  </div>
                  <div>IDEAS</div>
                  <div className="text-white">IMPOSSIBLE</div>
                  <div>TO IGNORE<span className="text-white">.</span></div>
                </>
              )}
              {glyphIndex === 1 && (
                <>
                  <div>WH-RE</div>
                  <div>+RAHE MIODE</div>
                  <div className="text-white">SOAPR HIOL+AL</div>
                  <div>OORRD=</div>
                </>
              )}
              {glyphIndex === 2 && (
                <>
                  <div>W*RO* S*R#</div>
                  <div className="text-white">+O= +--E</div>
                  <div>**R*A*</div>
                  <div>RO-E-E</div>
                </>
              )}
              {glyphIndex === 3 && (
                <>
                  <div>SHAPE</div>
                  <div className="text-white">DIGITAL</div>
                  <div>WORLDS</div>
                </>
              )}
            </div>
            <p className="mt-2 text-[10px] font-mono-tech text-white/40 tracking-wider">
              [ CLICK TO SCRAMBLE KINETIC GLYPHS · CYCLE 0{glyphIndex + 1}/04 ]
            </p>
          </div>

          {/* Small White Editorial Annotation matching reference:
              "[ I WE SHAPE BOLD IDENTITIES AND DIGITAL EXPERIENCES... ]" */}
          <div className="max-w-md pt-4 pointer-events-auto">
            <p className="text-xs sm:text-sm font-mono-tech text-white/70 leading-relaxed border-l-2 border-[#FF321C] pl-3">
              [ WE SHAPE BOLD IDENTITIES AND DIGITAL EXPERIENCES FOR BRANDS THAT VALUE
              CLEAR THINKING, TIMELESS CRAFT, AND IDEAS BUILT TO LAST. ]
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Right Scroll Indicator (matching the circular down-arrow button in reference) */}
      <div className="absolute bottom-8 right-8 z-30">
        <button
          onClick={() => {
            playStudioSound('shuffle');
            if (onScrollDown) {
              onScrollDown();
            } else {
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          aria-label="Scroll to selected works"
          className="w-14 h-14 rounded-full bg-white/10 hover:bg-[#FF321C] backdrop-blur-md border border-white/20 text-white flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 group"
        >
          <span className="text-xs font-mono-tech text-white/70 group-hover:text-white transition-colors">SCROLL</span>
          <span className="text-base font-mono-tech animate-bounce">↓</span>
        </button>
      </div>

      {/* Decorative Matrix Grid Edge Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF321C] to-transparent opacity-40 pointer-events-none" />
    </section>
  );
}
