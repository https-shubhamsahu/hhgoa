import React from 'react';
import { Sparkles } from 'lucide-react';
import { BRAND_ASSETS } from '../lib/brand-tokens';

export const Header: React.FC = () => {
  return (
    <header className="border-b-4 border-black bg-goa-darker py-2.5 px-3 sm:px-8 sticky top-0 z-40 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Official Brand Logo Mark */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <img
            src={BRAND_ASSETS.logoHackerHouse}
            alt="Hacker House"
            className="h-7 sm:h-11 w-auto object-contain shrink-0"
          />
          <img
            src={BRAND_ASSETS.logoGoaHindi}
            alt="Goa"
            className="h-6 sm:h-10 w-auto object-contain hidden md:block shrink-0"
          />
          <span className="bg-goa-yellow text-black font-bebas text-[11px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded border border-black font-bold shrink-0">
            2026
          </span>
        </div>

        {/* Right Event Date Badge */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-goa-green/90 text-goa-cream px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-goa-yellow/50 font-mono text-[10px] sm:text-xs font-semibold shrink-0">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-goa-yellow shrink-0" />
          <span className="hidden sm:inline">28–31 OCT 2026 • GOA, INDIA</span>
          <span className="sm:hidden">28–31 OCT • GOA</span>
        </div>
      </div>
    </header>
  );
};
