import React, { useRef, useState } from 'react';
import { BuilderData, Teammate } from '../types';
import { Users, Plus, Trash2, Camera, Image as ImageIcon, ChevronDown, ChevronUp, Download, Share2, Sparkles } from 'lucide-react';
import { optimizePhotoInput } from '../lib/image-optimizer';
import { shareToNativeOrX } from '../lib/share-x';

interface TeamBuilderSectionProps {
  data: BuilderData;
  onChangeData: (updated: Partial<BuilderData>) => void;
  onDownloadTeamPng: () => void;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  onDownloadComplete?: () => void;
}

export const TeamBuilderSection: React.FC<TeamBuilderSectionProps> = ({
  data,
  onChangeData,
  onDownloadTeamPng,
  canvasRef,
  onDownloadComplete,
}) => {
  const cameraInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const galleryInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAddTeammate = () => {
    if (data.teammates.length >= 3) {
      alert('Maximum 4 crew members (Leader + 3 Teammates) reached.');
      return;
    }

    const newId = `tm-${Date.now()}`;
    const newTeammate: Teammate = {
      id: newId,
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
    setExpandedId(newId);
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
      const dataUrl = await optimizePhotoInput(file);
      handleUpdateTeammate(id, { photoUrl: dataUrl });
    } catch (err) {
      console.error('Error processing teammate photo:', err);
    }
  };

  return (
    <div className="bg-goa-dark/95 p-4 sm:p-5 rounded-3xl border-4 border-black shadow-card-solid-pink space-y-4">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b-2 border-goa-green pb-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-goa-pink text-white p-2 rounded-xl border border-black">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bebas text-xl sm:text-2xl text-goa-cream tracking-wide">
              BUILD YOUR CREW (1-4 MEMBERS)
            </h3>
            <p className="font-mono text-[11px] text-goa-yellow font-semibold">
              Combine your team into ONE official 2048×1362 graphic!
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
            placeholder="e.g. OPTI-MYSTIC"
            className="w-full bg-goa-darker border-2 border-black rounded-xl p-3 text-sm text-goa-cream font-sans focus:border-goa-yellow outline-none min-h-[44px]"
          />
        </div>

        <div>
          <label className="block font-mono text-xs text-goa-yellow mb-1 font-bold">
            PROJECT / TEAM URL (FOR QR)
          </label>
          <input
            type="text"
            value={data.projectUrl || ''}
            onChange={(e) => onChangeData({ projectUrl: e.target.value })}
            placeholder="e.g. https://hhgoa.com"
            className="w-full bg-goa-darker border-2 border-black rounded-xl p-3 text-sm text-goa-cream font-sans focus:border-goa-yellow outline-none min-h-[44px]"
          />
        </div>
      </div>

      {/* Leader & Teammates Section */}
      <div className="space-y-3">
        <label className="block font-mono text-xs text-goa-yellow font-bold uppercase tracking-wider">
          CREW MEMBERS ({data.teammates.length + 1})
        </label>

        {/* Member 1: Leader (Current User) */}
        <div className="bg-goa-darker p-3 rounded-2xl border-2 border-goa-yellow/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-goa-green border border-black overflow-hidden flex items-center justify-center shrink-0">
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
          <span className="bg-goa-yellow text-black font-mono text-[10px] px-2.5 py-1 rounded-lg border border-black font-bold">
            CREW LEADER
          </span>
        </div>

        {/* Members 2 to 4 (Expandable Teammate Cards) */}
        {data.teammates.map((tm, idx) => {
          const isExpanded = expandedId === tm.id || data.teammates.length === 1;

          return (
            <div key={tm.id} className="bg-goa-darker rounded-2xl border-2 border-black overflow-hidden">
              {/* Card Accordion Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : tm.id)}
                className="p-3 bg-goa-dark/70 flex items-center justify-between cursor-pointer select-none border-b border-black/40 min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-goa-dark border border-black overflow-hidden flex items-center justify-center shrink-0">
                    {tm.photoUrl ? (
                      <img src={tm.photoUrl} alt={tm.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-4 h-4 text-goa-cream/40" />
                    )}
                  </div>
                  <div>
                    <p className="font-mono text-xs text-goa-pink font-bold leading-none">
                      MEMBER 0{idx + 2}: {tm.name || 'TEAMMATE'}
                    </p>
                    <p className="font-mono text-[10px] text-goa-cream/60">
                      {tm.role || 'BUILDER'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTeammate(tm.id);
                    }}
                    className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/20 min-w-[36px] min-h-[36px] flex items-center justify-center"
                    aria-label="Remove Teammate"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="text-goa-yellow p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              {isExpanded && (
                <div className="p-3.5 space-y-3 bg-goa-darker">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block font-mono text-[10px] text-goa-cream mb-1 font-bold uppercase">
                        Member Name
                      </label>
                      <input
                        type="text"
                        value={tm.name}
                        onChange={(e) => handleUpdateTeammate(tm.id, { name: e.target.value })}
                        placeholder="Teammate Name"
                        className="w-full bg-goa-dark border border-black rounded-xl p-2.5 text-xs text-goa-cream font-sans min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-goa-cream mb-1 font-bold uppercase">
                        Member Role / Title
                      </label>
                      <input
                        type="text"
                        value={tm.role}
                        onChange={(e) => handleUpdateTeammate(tm.id, { role: e.target.value })}
                        placeholder="Role e.g. Frontend Dev"
                        className="w-full bg-goa-dark border border-black rounded-xl p-2.5 text-xs text-goa-cream font-sans min-h-[44px]"
                      />
                    </div>
                  </div>

                  {/* Dual Photo Inputs (Camera vs Gallery) */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-goa-yellow font-bold uppercase">
                      Member Photo Input
                    </label>

                    <input
                      ref={(el) => (cameraInputRefs.current[tm.id] = el)}
                      type="file"
                      accept="image/*"
                      capture="user"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileChange(tm.id, e.target.files[0]);
                        }
                      }}
                    />

                    <input
                      ref={(el) => (galleryInputRefs.current[tm.id] = el)}
                      type="file"
                      accept="image/*,.heic,.heif"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileChange(tm.id, e.target.files[0]);
                        }
                      }}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => cameraInputRefs.current[tm.id]?.click()}
                        className="flex items-center justify-center gap-1.5 bg-goa-pink hover:bg-pink-600 text-white text-xs font-mono py-2.5 px-2 rounded-xl border border-black min-h-[44px] font-bold"
                      >
                        <Camera className="w-4 h-4 text-white" />
                        <span>CAMERA</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => galleryInputRefs.current[tm.id]?.click()}
                        className="flex items-center justify-center gap-1.5 bg-goa-green hover:bg-goa-green/80 text-goa-yellow text-xs font-mono py-2.5 px-2 rounded-xl border border-black min-h-[44px] font-bold"
                      >
                        <ImageIcon className="w-4 h-4 text-goa-yellow" />
                        <span>GALLERY</span>
                      </button>
                    </div>

                    {tm.photoUrl && (
                      <span className="inline-block text-goa-yellow text-[11px] font-mono font-bold mt-1">
                        ✓ Photo Loaded
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Teammate Button */}
      {data.teammates.length < 3 && (
        <button
          type="button"
          onClick={handleAddTeammate}
          className="w-full flex items-center justify-center gap-2 bg-goa-darker hover:bg-goa-green/40 text-goa-cream border-2 border-dashed border-goa-yellow/60 py-3.5 px-4 rounded-2xl font-mono text-xs font-bold transition-all min-h-[48px] cursor-pointer"
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
            onClick={() => {
              onDownloadTeamPng();
              if (onDownloadComplete) onDownloadComplete();
            }}
            className="flex items-center justify-center gap-2 bg-goa-yellow hover:bg-yellow-400 text-black font-bebas text-xl py-3 px-4 rounded-xl border-3 border-black shadow-card-solid font-bold min-h-[48px] cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>DOWNLOAD CREW FRAME</span>
          </button>

          <button
            type="button"
            onClick={() => shareToNativeOrX(canvasRef?.current || null, `${data.teamName || 'Crew'} Team`, data.format, data.projectUrl)}
            className="flex items-center justify-center gap-2 bg-goa-pink hover:bg-pink-600 text-white font-bebas text-xl py-3 px-4 rounded-xl border-3 border-black shadow-card-solid-yellow font-bold min-h-[48px] cursor-pointer"
          >
            <Share2 className="w-5 h-5" />
            <span>SHARE CREW FRAME</span>
          </button>
        </div>

        <p className="text-center font-mono text-[11px] text-goa-cream/60 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-goa-yellow" />
          <span>Generates ONE single combined 2048×1362 graphic!</span>
        </p>
      </div>
    </div>
  );
};
