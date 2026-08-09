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
    <div className="bg-goa-dark/90 p-3.5 rounded-2xl border-4 border-black shadow-card-solid space-y-2">
      <label className="block font-mono text-[11px] text-goa-yellow font-bold uppercase tracking-wider">
        MAKE YOUR FRAME
      </label>
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onChangeFormat('BUILDER_ID')}
          className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border-2 border-black font-bebas text-base sm:text-lg transition-all ${
            format === 'BUILDER_ID'
              ? 'bg-goa-yellow text-black shadow-card-solid-pink font-bold -translate-y-0.5'
              : 'bg-goa-darker text-goa-cream hover:bg-goa-green/40 opacity-80'
          }`}
        >
          <IdCard className="w-4 h-4 shrink-0" />
          <span>BUILDER CARD</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeFormat('PFP')}
          className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border-2 border-black font-bebas text-base sm:text-lg transition-all ${
            format === 'PFP'
              ? 'bg-goa-pink text-white shadow-card-solid-yellow font-bold -translate-y-0.5'
              : 'bg-goa-darker text-goa-cream hover:bg-goa-green/40 opacity-80'
          }`}
        >
          <UserCheck className="w-4 h-4 shrink-0" />
          <span>PFP AVATAR</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeFormat('CREW')}
          className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border-2 border-black font-bebas text-base sm:text-lg transition-all ${
            format === 'CREW'
              ? 'bg-goa-green text-goa-yellow shadow-card-solid font-bold -translate-y-0.5'
              : 'bg-goa-darker text-goa-cream hover:bg-goa-green/40 opacity-80'
          }`}
        >
          <Users className="w-4 h-4 shrink-0" />
          <span>CREW FRAME</span>
        </button>
      </div>
    </div>
  );
};
