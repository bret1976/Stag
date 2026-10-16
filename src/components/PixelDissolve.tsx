import { useEffect, useRef, useState } from 'react';

interface PixelDissolveProps {
  topColor?: string;
  bottomColor?: string;
  height?: number;
  direction?: 'down' | 'up';
}

export function PixelDissolve({
  topColor = '#FF321C',
  bottomColor = '#FFFFFF',
  height = 96,
  direction = 'down'
}: PixelDissolveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pixelSeed] = useState(() => Math.random());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.width = width;
      canvas.height = height;

      // Draw background bottom color
      ctx.fillStyle = bottomColor;
      ctx.fillRect(0, 0, width, height);

      const pixelSize = 16;
      const cols = Math.ceil(width / pixelSize);
      const rows = Math.ceil(height / pixelSize);

      ctx.fillStyle = topColor;

      for (let c = 0; c < cols; c++) {
        // Compute pseudo-random stepped pixel cascade depth per column
        const noise = Math.sin(c * 0.45 + pixelSeed * 10) * 0.4 +
                      Math.cos(c * 0.9 + pixelSeed * 5) * 0.35 +
                      Math.sin(c * 0.15) * 0.25;
        const normalized = (noise + 1) / 2; // 0 to 1
        const maxSolidRow = Math.floor(normalized * (rows - 2));

        for (let r = 0; r < rows; r++) {
          const x = c * pixelSize;
          const y = direction === 'down' ? r * pixelSize : (rows - 1 - r) * pixelSize;

          let shouldFill = false;

          if (r <= maxSolidRow) {
            shouldFill = true;
          } else if (r === maxSolidRow + 1) {
            shouldFill = ((c * 7 + r * 13) % 10) > 3;
          } else if (r === maxSolidRow + 2) {
            shouldFill = ((c * 11 + r * 17) % 10) > 6;
          } else if (r === maxSolidRow + 3) {
            shouldFill = ((c * 5 + r * 23) % 10) > 8;
          }

          if (shouldFill) {
            ctx.fillRect(x, y, pixelSize, pixelSize);
          }
        }
      }
    };

    render();
    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render);
  }, [topColor, bottomColor, height, direction, pixelSeed]);

  return (
    <div className="relative w-full overflow-hidden select-none pointer-events-none" style={{ height }}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
