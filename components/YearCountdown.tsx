"use client";

import React, { useState, useEffect } from 'react';

export function YearCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use a microtask to avoid synchronous setState warning
    Promise.resolve().then(() => setMounted(true));

    const calculateTimeLeft = () => {
      const year = new Date().getFullYear();
      const difference = +new Date(`${year + 1}-01-01T00:00:00`) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return <div className="h-[46px] w-[220px] rounded-full border border-white/10 bg-[#0a0a0a]"></div>;

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  // Subtle chromatic aberration effect for the numbers
  const glitchShadow = '1px 0 2px rgba(255,0,0,0.4), -1px 0 2px rgba(0,255,255,0.4)';

  return (
    <div className="flex items-center gap-1.5 md:gap-3 px-3 md:px-6 py-1.5 md:py-2 rounded-full border border-white/10 bg-[#0a0a0a] text-white font-mono shadow-[0_0_15px_rgba(255,255,255,0.03)]">
      <div className="flex flex-col items-center justify-center min-w-[24px] md:min-w-[32px]">
        <span className="text-sm md:text-lg font-bold leading-none tracking-tighter" style={{ textShadow: glitchShadow }}>
          {formatNumber(timeLeft.days)}
        </span>
        <span className="text-[7px] md:text-[9px] text-gray-400 uppercase tracking-widest mt-0.5 md:mt-1">Días</span>
      </div>
      <span className="text-xs md:text-sm font-bold leading-none pb-2 md:pb-3 text-gray-500">:</span>
      <div className="flex flex-col items-center justify-center min-w-[20px] md:min-w-[28px]">
        <span className="text-sm md:text-lg font-bold leading-none tracking-tighter" style={{ textShadow: glitchShadow }}>
          {formatNumber(timeLeft.hours)}
        </span>
        <span className="text-[7px] md:text-[9px] text-gray-400 uppercase tracking-widest mt-0.5 md:mt-1">Horas</span>
      </div>
      <span className="text-xs md:text-sm font-bold leading-none pb-2 md:pb-3 text-gray-500">:</span>
      <div className="flex flex-col items-center justify-center min-w-[20px] md:min-w-[28px]">
        <span className="text-sm md:text-lg font-bold leading-none tracking-tighter" style={{ textShadow: glitchShadow }}>
          {formatNumber(timeLeft.minutes)}
        </span>
        <span className="text-[7px] md:text-[9px] text-gray-400 uppercase tracking-widest mt-0.5 md:mt-1">Min</span>
      </div>
      <span className="text-xs md:text-sm font-bold leading-none pb-2 md:pb-3 text-gray-500">:</span>
      <div className="flex flex-col items-center justify-center min-w-[20px] md:min-w-[28px]">
        <span className="text-sm md:text-lg font-bold leading-none tracking-tighter" style={{ textShadow: glitchShadow }}>
          {formatNumber(timeLeft.seconds)}
        </span>
        <span className="text-[7px] md:text-[9px] text-gray-400 uppercase tracking-widest mt-0.5 md:mt-1">Seg</span>
      </div>
    </div>
  );
}
