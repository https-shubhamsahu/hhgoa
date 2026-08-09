import React from 'react';
import { Download, Share2, MoveHorizontal, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shareToNativeOrX } from '../lib/share-x';

interface ExportBarProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  builderName?: string;
  format: string;
  onOpenCropper: () => void;
  hasPhoto: boolean;
  projectUrl?: string;
}

export const ExportBar: React.FC<ExportBarProps> = ({
  canvasRef,
  builderName,
  format,
  onOpenCropper,
  hasPhoto,
  projectUrl,
}) => {
  const handleDownload = () => {
    if (!canvasRef.current) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#006B3C', '#FF007A', '#FFB800', '#FFF9E8'],
      });
    } catch (e) {
      // Ignore
    }

    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    const sanitizedName = (builderName || 'builder').toLowerCase().replace(/[^a-z0-9]/g, '-');
    const filename =
      format === 'PFP'
        ? `hh-goa-pfp-${sanitizedName}.png`
        : format === 'CREW'
        ? `hh-goa-crew-${sanitizedName}.png`
        : `hh-goa-card-${sanitizedName}.png`;

    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    shareToNativeOrX(canvasRef.current, builderName, format, projectUrl);
  };

  return (
    <div className="bg-goa-dark/90 p-4 rounded-2xl border-4 border-black shadow-card-solid space-y-4">
      {/* Re-center / Adjust button */}
      {hasPhoto && (
        <button
          type="button"
          onClick={onOpenCropper}
          className="w-full flex items-center justify-center gap-2 bg-goa-darker hover:bg-goa-green/40 text-goa-yellow border-2 border-black py-3 rounded-xl font-mono text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-goa-yellow min-h-[44px] cursor-pointer"
        >
          <MoveHorizontal className="w-4 h-4 text-goa-yellow" />
          <span>RE-CENTER / CROP PHOTO</span>
        </button>
      )}

      {/* Main Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* 1. Download Image */}
        <button
          type="button"
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 bg-goa-yellow hover:bg-yellow-400 text-black font-bebas text-2xl py-3 px-4 rounded-xl border-3 border-black shadow-card-solid-pink transition-all active:translate-y-0.5 font-bold focus:outline-none focus:ring-2 focus:ring-black min-h-[48px] cursor-pointer"
        >
          <Download className="w-6 h-6 text-black" />
          <span>DOWNLOAD PNG</span>
        </button>

        {/* 2. Share on X */}
        <button
          type="button"
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 bg-goa-pink hover:bg-pink-600 text-white font-bebas text-2xl py-3 px-4 rounded-xl border-3 border-black shadow-card-solid-yellow transition-all active:translate-y-0.5 font-bold focus:outline-none focus:ring-2 focus:ring-white min-h-[48px] cursor-pointer"
        >
          <Share2 className="w-6 h-6 text-white" />
          <span>SHARE ON X</span>
        </button>
      </div>

      {/* Event Site CTA Buttons */}
      <div className="pt-2 border-t-2 border-black/40 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* CTA 1: CHECK THE HYPE */}
        <a
          href="https://hhgoa.com/#check-hype"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-goa-green hover:bg-emerald-800 text-goa-yellow font-bebas text-xl sm:text-2xl py-3 px-4 rounded-xl border-3 border-black shadow-card-solid transition-all hover:scale-[1.02] active:scale-[0.98] active:translate-y-0.5 font-bold focus:outline-none focus:ring-2 focus:ring-goa-yellow cursor-pointer min-h-[44px]"
        >
          <Sparkles className="w-5 h-5 text-goa-yellow" />
          <span>✦ CHECK THE HYPE</span>
        </a>

        {/* CTA 2: VISIT HH GOA */}
        <a
          href="https://hhgoa.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-goa-darker hover:bg-goa-dark text-goa-cream hover:text-white font-bebas text-xl sm:text-2xl py-3 px-4 rounded-xl border-3 border-black shadow-card-solid-pink transition-all hover:scale-[1.02] active:scale-[0.98] active:translate-y-0.5 font-bold focus:outline-none focus:ring-2 focus:ring-goa-pink cursor-pointer min-h-[44px]"
        >
          <span>VISIT HH GOA</span>
          <ExternalLink className="w-4 h-4 text-goa-pink" />
        </a>
      </div>

      <p className="text-center font-mono text-[11px] text-goa-cream/60">
        Pre-filled with mandatory <strong className="text-goa-pink">#FrameInGoa</strong> hashtag
      </p>
    </div>
  );
};
