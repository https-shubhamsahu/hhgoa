import React from 'react';
import { Heart, Repeat, Eye, X, ExternalLink, Sparkles } from 'lucide-react';

interface EngagementPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EngagementPopupModal: React.FC<EngagementPopupModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const targetPostUrl = 'https://x.com/isagi0011/status/2086526802378547645';

  const handleLikeAndRepost = () => {
    localStorage.setItem('hhgoa_popup_seen', 'true');
    window.open(targetPostUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleMaybeLater = () => {
    localStorage.setItem('hhgoa_popup_seen', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-goa-darker border-4 border-black rounded-3xl p-5 sm:p-7 max-w-md w-full shadow-card-solid-pink space-y-5 my-auto text-center relative">
        {/* Close Icon Button */}
        <button
          type="button"
          onClick={handleMaybeLater}
          className="absolute top-4 right-4 text-goa-cream/70 hover:text-white p-2 rounded-xl hover:bg-goa-green/40 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Badge & Title */}
        <div className="space-y-2 pt-2">
          <div className="inline-flex items-center gap-1.5 bg-goa-yellow text-black font-bebas text-xs px-3 py-1 rounded-lg border border-black font-bold">
            <Sparkles className="w-4 h-4 text-goa-pink" />
            <span>HH GOA 2026 IDENTITY LAB</span>
          </div>

          <h3 className="font-bebas text-3xl sm:text-4xl text-goa-yellow tracking-wide leading-none">
            🌴 YOU JUST BUILT WITH HH GOA!
          </h3>

          <p className="font-sans text-xs sm:text-sm text-goa-cream/90 font-medium">
            If you liked this little project, please help me out 😭
          </p>
        </div>

        {/* Playful Bullet Card Box */}
        <div className="bg-goa-dark p-4 rounded-2xl border-2 border-black space-y-3 text-left">
          <div className="flex items-center gap-3">
            <div className="bg-goa-pink/20 text-goa-pink p-2 rounded-xl border border-goa-pink shrink-0">
              <Heart className="w-5 h-5 fill-goa-pink" />
            </div>
            <span className="font-sans text-xs font-semibold text-goa-cream">
              Like the post
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-goa-green/40 text-goa-yellow p-2 rounded-xl border border-goa-yellow shrink-0">
              <Repeat className="w-5 h-5" />
            </div>
            <span className="font-sans text-xs font-semibold text-goa-cream">
              Repost it to spread the hype
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-goa-yellow/20 text-goa-yellow p-2 rounded-xl border border-goa-yellow shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <span className="font-sans text-xs font-semibold text-goa-cream">
              Tag someone who's going to Goa
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            onClick={handleLikeAndRepost}
            className="w-full flex items-center justify-center gap-2 bg-goa-pink hover:bg-pink-600 text-white font-bebas text-2xl py-3 px-4 rounded-xl border-3 border-black shadow-card-solid-yellow transition-all active:scale-[0.98] font-bold cursor-pointer min-h-[48px]"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>❤️ LIKE + REPOST</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </button>

          <button
            type="button"
            onClick={handleMaybeLater}
            className="w-full flex items-center justify-center gap-2 bg-goa-darker hover:bg-goa-dark text-goa-cream/70 hover:text-white font-mono text-xs py-2.5 px-4 rounded-xl border border-black/60 transition-all cursor-pointer min-h-[44px]"
          >
            <span>MAYBE LATER</span>
          </button>
        </div>
      </div>
    </div>
  );
};
