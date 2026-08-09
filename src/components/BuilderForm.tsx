import React from 'react';
import { BuilderData } from '../types';
import { User, Shield, Code, Zap } from 'lucide-react';

interface BuilderFormProps {
  data: BuilderData;
  onChangeData: (updated: Partial<BuilderData>) => void;
}

export const BuilderForm: React.FC<BuilderFormProps> = ({ data, onChangeData }) => {
  return (
    <div className="bg-goa-dark/90 p-4 rounded-2xl border-4 border-black shadow-card-solid space-y-3.5">
      <div className="flex items-center justify-between border-b-2 border-goa-green pb-2">
        <h3 className="font-bebas text-xl text-goa-yellow tracking-wide flex items-center gap-2">
          <User className="w-4 h-4 text-goa-pink" />
          <span>STEP 2: BUILDER PASSPORT DETAILS</span>
        </h3>
        <button
          type="button"
          onClick={() =>
            onChangeData({
              name: '',
              role: '',
              stack: '',
              buildingText: '',
              city: 'Goa, India',
              photoUrl: null,
              cropX: 0,
              cropY: 0,
              cropZoom: 1,
            })
          }
          className="font-mono text-xs bg-goa-darker hover:bg-goa-pink/30 text-goa-cream px-3 py-1.5 rounded-lg border border-black min-h-[36px] flex items-center"
        >
          RESET
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Name */}
        <div>
          <label className="flex items-center gap-1 font-mono text-xs text-goa-cream mb-1 font-semibold">
            <User className="w-3.5 h-3.5 text-goa-pink" /> BUILDER NAME
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChangeData({ name: e.target.value })}
            placeholder="e.g. SHUBHAM SAHU"
            className="w-full bg-goa-darker border-2 border-black rounded-xl p-3 text-sm text-goa-cream font-sans focus:border-goa-yellow outline-none min-h-[44px]"
          />
        </div>

        {/* Role */}
        <div>
          <label className="flex items-center gap-1 font-mono text-xs text-goa-cream mb-1 font-semibold">
            <Shield className="w-3.5 h-3.5 text-goa-yellow" /> ROLE / TITLE
          </label>
          <input
            type="text"
            value={data.role}
            onChange={(e) => onChangeData({ role: e.target.value })}
            placeholder="e.g. AI ENGINEER / SYSTEMS DEV"
            className="w-full bg-goa-darker border-2 border-black rounded-xl p-3 text-sm text-goa-cream font-sans focus:border-goa-yellow outline-none min-h-[44px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Stack */}
        <div>
          <label className="flex items-center gap-1 font-mono text-xs text-goa-cream mb-1 font-semibold">
            <Code className="w-3.5 h-3.5 text-goa-pink" /> STACK / SKILLS
          </label>
          <input
            type="text"
            value={data.stack}
            onChange={(e) => onChangeData({ stack: e.target.value })}
            placeholder="e.g. Python • React • AI • Web3"
            className="w-full bg-goa-darker border-2 border-black rounded-xl p-3 text-sm text-goa-cream font-sans focus:border-goa-yellow outline-none min-h-[44px]"
          />
        </div>

        {/* Location */}
        <div>
          <label className="flex items-center gap-1 font-mono text-xs text-goa-cream mb-1 font-semibold">
            LOCATION
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChangeData({ city: e.target.value })}
            placeholder="Goa, India"
            className="w-full bg-goa-darker border-2 border-black rounded-xl p-3 text-sm text-goa-cream font-sans focus:border-goa-yellow outline-none min-h-[44px]"
          />
        </div>
      </div>

      {/* Building Quote */}
      <div>
        <label className="flex items-center gap-1 font-mono text-xs text-goa-yellow font-bold mb-1">
          <Zap className="w-3.5 h-3.5 text-goa-pink" /> WHAT ARE YOU BUILDING IN GOA?
        </label>
        <textarea
          rows={2}
          value={data.buildingText}
          onChange={(e) => onChangeData({ buildingText: e.target.value })}
          placeholder="e.g. Building next-gen AI & Web3 applications on the sunny beaches of Goa!"
          className="w-full bg-goa-darker border-2 border-black rounded-xl p-3 text-sm text-goa-cream font-sans focus:border-goa-yellow outline-none resize-none"
        />
      </div>
    </div>
  );
};
