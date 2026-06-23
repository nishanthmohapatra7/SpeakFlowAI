import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BackgroundFlow() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const blobs = containerRef.current.querySelectorAll('.flow-blob');

    const ctx = gsap.context(() => {
      blobs.forEach((blob, idx) => {
        // Organic wandering / drift animation
        const xDrift = () => gsap.utils.random(-120, 120);
        const yDrift = () => gsap.utils.random(-120, 120);
        const rotationVal = () => gsap.utils.random(0, 360);
        const scaleVal = () => gsap.utils.random(0.85, 1.35);
        const floatDuration = gsap.utils.random(15, 30);

        gsap.to(blob, {
          x: xDrift,
          y: yDrift,
          rotation: rotationVal,
          scale: scaleVal,
          duration: floatDuration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 1.5,
        });

        // Dynamic organic warping of border-radius to look like fluids/liquid blobs
        const warpDuration = gsap.utils.random(10, 20);
        gsap.to(blob, {
          borderRadius: () => {
            const r1 = gsap.utils.random(35, 65);
            const r2 = 100 - r1;
            const r3 = gsap.utils.random(35, 65);
            const r4 = 100 - r3;
            const r5 = gsap.utils.random(35, 65);
            const r6 = 100 - r5;
            const r7 = gsap.utils.random(35, 65);
            const r8 = 100 - r7;
            return `${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%`;
          },
          duration: warpDuration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 0.8,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-80 dark:opacity-60 select-none"
    >
      {/* Blob 1 - Indigo/Deep Violet glow (Top Left) */}
      <div
        className="flow-blob absolute top-[10%] left-[5%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-[50%] bg-gradient-to-tr from-indigo-500/45 to-purple-500/35 blur-[100px] dark:from-indigo-600/30 dark:to-purple-600/20"
      />
      {/* Blob 2 - Bright Violet/Deep Pink glow (Bottom Right) */}
      <div
        className="flow-blob absolute bottom-[10%] right-[2%] w-[320px] h-[320px] md:w-[550px] md:h-[550px] rounded-[50%] bg-gradient-to-br from-violet-500/45 to-pink-500/35 blur-[110px] dark:from-violet-600/30 dark:to-pink-600/20"
      />
      {/* Blob 3 - Faint Cyan/Vibrant Blue glow (Bottom Left) */}
      <div
        className="flow-blob absolute bottom-[25%] left-[8%] w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-[50%] bg-gradient-to-tr from-cyan-400/35 to-blue-500/35 blur-[90px] dark:from-cyan-500/25 dark:to-blue-600/20"
      />
      {/* Blob 4 - Center-Top Amber/Magenta accent for warm color dynamics */}
      <div
        className="flow-blob absolute top-[25%] right-[25%] w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-[50%] bg-gradient-to-br from-amber-400/25 to-rose-500/30 blur-[120px] dark:from-amber-500/15 dark:to-rose-600/15"
      />
    </div>
  );
}

