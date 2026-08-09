import React, { useRef } from 'react';
import { BuilderData, Teammate } from '../types';
import { Users, Plus, Trash2, Upload, Sparkles, Download, Share2 } from 'lucide-react';
import { processUploadedFile } from '../lib/heic-converter';
import { shareToX } from '../lib/share-x';

interface TeamBuilderSectionProps {
  data: BuilderData;
  onChangeData: (updated: Partial<BuilderData>) => void;
  onDownloadTeamPng: () => void;
  onSelectCropperForTeammate?: (teammateId: string) => void;
}

export const TeamBuilderSection: React.FC<TeamBuilderSectionProps> = ({
  data,
  onChangeData,
  onDownloadTeamPng,
}) => {
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleAddTeammate = () => {
    if (data.teammates.length >= 3) {
      alert('Maximum 4 crew members (Leader + 3 Teammates) reached.');
      return;
    }

    const newTeammate: Teammate = {
      id: `tm-${Date.now()}`,
      name: `Teammate ${data.teammates.length + 2}`,
      role: 'Builder',
      photoUrl: null,
      cropX: 0,
      cropY: 0,
      cropZoom: 1,
    };

    onChangeData({
      teammates: [...data.teammates, newTeammate],
    });
  };

  const handleRemoveTeammate = (id: string) => {
    onChangeData({
      teammates: data.teammates.filter((t) => t.id !== id),
    });
  };

  const handleUpdateTeammate = (id: string, updated: Partial<Teammate>) => {
    onChangeData({
      teammates: data.teammates.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    });
  };

  const handleFileChange = async (id: string, file: File) => {
    try {
      const dataUrl = await processUploadedFile(file);
      handleUpdateTeammate(id, { photoUrl: dataUrl });
    } catch (err) {
      console.error('Error processing teammate photo:', err);
    }
  };

  return (
    <div className="bg-goa-dark/95 p-5 rounded-3xl border-4 border-black shadow-card-solid-pink space-y-5">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b-2 border-goa-green pb-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-goa-pink text-white p-2 rounded-xl border border-black">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bebas text-2xl text-goa-cream tracking-wide">
              BUILD YOUR CREW (COMBINED TEAM FRAME)
            </h3>
            <p className="font-mono text-xs text-goa-yellow font-semibold">
              Bring your teammates together into ONE official HH Goa graphic!
            </p>
          </div>
        </div>

        <span className="bg-goa-yellow text-black font-bebas text-sm px-2.5 py-1 rounded border border-black font-bold">
          {data.teammates.length + 1} / 4 MEMBERS
        </span>
      </div>

      {/* Team Name & Project URL Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-xs text-goa-cream mb-1 font-bold">
            TEAM / CREW NAME
          </label>
          <input
            type="text"
            value={data.teamName}
            onChange={(e) => onChangeData({ teamName: e.target.value })}
            placeholder="e.g. Goa AI Hackers"
            className="w-full bg-goa-darker border-2 border-black rounded-xl p-2.5 text-sm text-goa-cream font-sans focus:border-goa-yellow outline-none"
          />
        </div>

        <div>
          <label className="block font-mono text-xs text-goa-yellow mb-1 font-bold">
            OPTIONAL PROJECT / TEAM URL (FOR QR)
          </label>
          <input
            type="text"
            value={data.projectUrl || ''}
            onChange={(e) => onChangeData({ projectUrl: e.target.value })}
            placeholder="e.g. https://hhgoa.com"
            className="w-full bg-goa-darker border-2 border-black rounded-xl p-2.5 text-sm text-goa-cream font-sans focus:border-goa-yellow outline-none"
          />
        </div>
      </div>

      {/* Leader & Teammates List */}
      <div className="space-y-3">
        <label className="block font-mono text-xs text-goa-yellow font-bold uppercase tracking-wider">
          CREW MEMBERS ({data.teammates.length + 1})
        </label>

        {/* Leader (Current User) */}
        <div className="bg-goa-darker p-3 rounded-xl border-2 border-goa-yellow/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-goa-green border border-black overflow-hidden flex items-center justify-center">
              {data.photoUrl ? (
                <img src={data.photoUrl} alt="Leader" className="w-full h-full object-cover" />
              ) : (
                <Users className="w-5 h-5 text-goa-cream/50" />
              )}
            </div>
            <div>
              <p className="font-bebas text-lg text-goa-cream leading-none">
                {data.name.trim() || 'YOU (CREW LEADER)'}
              </p>
              <p className="font-mono text-[11px] text-goa-yellow">
                {data.role.trim() || 'LEAD BUILDER'}
              </p>
            </div>
          </div>
          <span className="bg-goa-yellow text-black font-mono text-[10px] px-2 py-0.5 rounded font-bold">
            CREW LEADER
          </span>
        </div>

        {/* Additional Teammates */}
        {data.teammates.map((tm, idx) => (
          <div key={tm.id} className="bg-goa-darker p-3 rounded-xl border-2 border-black space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-goa-pink font-bold">
                MEMBER 0{idx + 2}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveTeammate(tm.id)}
                className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/20"
                title="Remove Teammate"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={tm.name}
                onChange={(e) => handleUpdateTeammate(tm.id, { name: e.target.value })}
                placeholder="Teammate Name"
                className="bg-goa-dark border border-black rounded-lg p-2 text-xs text-goa-cream font-sans"
              />
              <input
                type="text"
                value={tm.role}
                onChange={(e) => handleUpdateTeammate(tm.id, { role: e.target.value })}
                placeholder="Role / Title"
                className="bg-goa-dark border border-black rounded-lg p-2 text-xs text-goa-cream font-sans"
              />
            </div>

            {/* Photo Upload for Teammate */}
            <div className="flex items-center gap-2">
              <input
                ref={(el) => (fileInputRefs.current[tm.id] = el)}
                type="file"
                accept="image/*,.heic,.heif"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(tm.id, e.target.files[0]);
                  }
                }}
              />

              <button
                type="button"
                onClick={() => fileInputRefs.current[tm.id]?.click()}
                className="flex items-center gap-1.5 bg-goa-green hover:bg-goa-green/80 text-goa-cream text-xs font-mono px-3 py-1.5 rounded-lg border border-black"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{tm.photoUrl ? 'CHANGE PHOTO' : 'UPLOAD PHOTO'}</span>
              </button>

              {tm.photoUrl && (
                <span className="text-goa-yellow text-xs font-mono">✓ Photo added</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Teammate Button */}
      {data.teammates.length < 3 && (
        <button
          type="button"
          onClick={handleAddTeammate}
          className="w-full flex items-center justify-center gap-2 bg-goa-darker hover:bg-goa-green/40 text-goa-cream border-2 border-dashed border-goa-yellow/60 p-3 rounded-xl font-mono text-xs font-bold transition-all"
        >
          <Plus className="w-4 h-4 text-goa-yellow" />
          <span>+ ADD TEAMMATE (UP TO 4 CREW MEMBERS)</span>
        </button>
      )}

      {/* Team Export Actions */}
      <div className="pt-2 border-t-2 border-goa-green/50 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onDownloadTeamPng}
            className="flex items-center justify-center gap-2 bg-goa-yellow hover:bg-yellow-400 text-black font-bebas text-xl py-3 px-4 rounded-xl border-2 border-black shadow-card-solid font-bold"
          >
            <Download className="w-5 h-5" />
            <span>DOWNLOAD COMBINED CREW FRAME</span>
          </button>

          <button
            type="button"
            onClick={() => shareToX(`${data.teamName || 'Crew'} Team`, data.format, data.projectUrl)}
            className="flex items-center justify-center gap-2 bg-goa-pink hover:bg-pink-600 text-white font-bebas text-xl py-3 px-4 rounded-xl border-2 border-black shadow-card-solid-yellow font-bold"
          >
            <Share2 className="w-5 h-5" />
            <span>SHARE CREW FRAME (#FrameInGoa)</span>
          </button>
        </div>

        <p className="text-center font-mono text-[11px] text-goa-cream/60 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-goa-yellow" />
          <span>Generates ONE single combined graphic featuring all crew members!</span>
        </p>
      </div>
    </div>
  );
};
