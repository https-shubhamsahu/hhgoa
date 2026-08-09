import React from 'react';
import { Sparkles, Frame, Users } from 'lucide-react';
import { BRAND_ASSETS } from '../lib/brand-tokens';

interface HeaderProps {
  activeTab: 'generator' | 'about';
  onSelectTab: (tab: 'generator' | 'about') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  return (
    <header className="border-b-4 border-black bg-goa-darker py-2.5 px-3 sm:px-8 sticky top-0 z-40 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Official Brand Logo Mark */}
        <div
          onClick={() => onSelectTab('generator')}
          className="flex items-center gap-1.5 sm:gap-3 shrink-0 cursor-pointer"
        >
          <img
            src={BRAND_ASSETS.logoHackerHouse}
            alt="Hacker House"
            className="h-7 sm:h-10 w-auto object-contain shrink-0"
          />
          <img
            src={BRAND_ASSETS.logoGoaHindi}
            alt="Goa"
            className="h-6 sm:h-9 w-auto object-contain hidden md:block shrink-0"
          />
          <span className="bg-goa-yellow text-black font-bebas text-[11px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded border border-black font-bold shrink-0">
            2026
          </span>
        </div>

        {/* Center / Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => onSelectTab('generator')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl border-2 border-black font-bebas text-xs sm:text-sm font-bold transition-all min-h-[36px] cursor-pointer ${
              activeTab === 'generator'
                ? 'bg-goa-yellow text-black shadow-card-solid-pink'
                : 'bg-goa-dark text-goa-cream hover:bg-goa-green/40 opacity-80'
            }`}
          >
            <Frame className="w-3.5 h-3.5" />
            <span>FRAME LAB</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('about')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl border-2 border-black font-bebas text-xs sm:text-sm font-bold transition-all min-h-[36px] cursor-pointer ${
              activeTab === 'about'
                ? 'bg-goa-pink text-white shadow-card-solid-yellow'
                : 'bg-goa-dark text-goa-cream hover:bg-goa-green/40 opacity-80'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>ABOUT US</span>
          </button>
        </div>

        {/* Right Event Date Badge */}
        <div className="hidden lg:flex items-center gap-1.5 bg-goa-green/90 text-goa-cream px-3 py-1.5 rounded-lg border border-goa-yellow/50 font-mono text-xs font-semibold shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-goa-yellow shrink-0" />
          <span>28–31 OCT 2026 • GOA</span>
        </div>
      </div>
    </header>
  );
};
