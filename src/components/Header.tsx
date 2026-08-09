import React from 'react';
import { Sparkles } from 'lucide-react';
import { BRAND_ASSETS } from '../lib/brand-tokens';

export const Header: React.FC = () => {
  return (
    <header className="border-b-4 border-black bg-goa-darker py-3 px-4 sm:px-8 sticky top-0 z-40 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Official Brand Logo Mark */}
        <div className="flex items-center gap-3">
          <img
            src={BRAND_ASSETS.logoHackerHouse}
            alt="Hacker House"
            className="h-9 sm:h-11 w-auto object-contain"
          />
          <img
            src={BRAND_ASSETS.logoGoaHindi}
            alt="Goa"
            className="h-8 sm:h-10 w-auto object-contain hidden xs:block"
          />
          <span className="bg-goa-yellow text-black font-bebas text-xs px-2 py-0.5 rounded border border-black font-bold">
            2026
          </span>
        </div>

        {/* Right Event Date Badge */}
        <div className="flex items-center gap-1.5 bg-goa-green/80 text-goa-cream px-3 py-1.5 rounded-lg border border-goa-yellow/40 font-mono text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-goa-yellow" />
          <span>28–31 OCT 2026 • GOA, INDIA</span>
        </div>
      </div>
    </header>
  );
};
