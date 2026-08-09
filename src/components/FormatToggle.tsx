import React from 'react';
import { FrameFormat } from '../types';
import { IdCard, UserCheck, Users } from 'lucide-react';

interface FormatToggleProps {
  format: FrameFormat;
  onChangeFormat: (f: FrameFormat) => void;
}

export const FormatToggle: React.FC<FormatToggleProps> = ({
  format,
  onChangeFormat,
}) => {
  return (
    <div className="bg-goa-dark/90 p-3.5 sm:p-4 rounded-2xl border-4 border-black shadow-card-solid space-y-2">
      <label className="block font-mono text-xs text-goa-yellow font-bold uppercase tracking-wider">
        SELECT FRAME FORMAT
      </label>
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onChangeFormat('BUILDER_ID')}
          className={`min-h-[48px] flex items-center justify-center gap-1 sm:gap-1.5 p-2 rounded-xl border-2 border-black font-bebas text-sm sm:text-lg transition-all cursor-pointer ${
            format === 'BUILDER_ID'
              ? 'bg-goa-yellow text-black shadow-card-solid-pink font-bold -translate-y-0.5'
              : 'bg-goa-darker text-goa-cream hover:bg-goa-green/40 opacity-80'
          }`}
          aria-label="Select Builder Card format"
        >
          <IdCard className="w-4 h-4 shrink-0" />
          <span className="truncate">BUILDER CARD</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeFormat('PFP')}
          className={`min-h-[48px] flex items-center justify-center gap-1 sm:gap-1.5 p-2 rounded-xl border-2 border-black font-bebas text-sm sm:text-lg transition-all cursor-pointer ${
            format === 'PFP'
              ? 'bg-goa-pink text-white shadow-card-solid-yellow font-bold -translate-y-0.5'
              : 'bg-goa-darker text-goa-cream hover:bg-goa-green/40 opacity-80'
          }`}
          aria-label="Select PFP Avatar format"
        >
          <UserCheck className="w-4 h-4 shrink-0" />
          <span className="truncate">PFP AVATAR</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeFormat('CREW')}
          className={`min-h-[48px] flex items-center justify-center gap-1 sm:gap-1.5 p-2 rounded-xl border-2 border-black font-bebas text-sm sm:text-lg transition-all cursor-pointer ${
            format === 'CREW'
              ? 'bg-goa-green text-goa-yellow shadow-card-solid font-bold -translate-y-0.5'
              : 'bg-goa-darker text-goa-cream hover:bg-goa-green/40 opacity-80'
          }`}
          aria-label="Select Crew Frame format"
        >
          <Users className="w-4 h-4 shrink-0" />
          <span className="truncate">CREW FRAME</span>
        </button>
      </div>
    </div>
  );
};
