import React from 'react';
import { ZoomIn, ZoomOut, Move, Check, RotateCcw, X } from 'lucide-react';
import { CropState } from '../types';

interface ImageCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl: string | null;
  cropState: CropState;
  onChangeCrop: (c: CropState) => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  onClose,
  photoUrl,
  cropState,
  onChangeCrop,
}) => {
  if (!isOpen || !photoUrl) return null;

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeCrop({
      ...cropState,
      zoom: parseFloat(e.target.value),
    });
  };

  const handlePanX = (delta: number) => {
    onChangeCrop({
      ...cropState,
      x: cropState.x + delta,
    });
  };

  const handlePanY = (delta: number) => {
    onChangeCrop({
      ...cropState,
      y: cropState.y + delta,
    });
  };

  const handleReset = () => {
    onChangeCrop({ x: 0, y: 0, zoom: 1 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-goa-darker border-4 border-black rounded-3xl p-6 max-w-lg w-full shadow-card-solid-pink space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-goa-green pb-3">
          <div className="flex items-center gap-2">
            <Move className="w-5 h-5 text-goa-yellow" />
            <h3 className="font-bebas text-2xl text-goa-cream">ADJUST & CROP PHOTO</h3>
          </div>
          <button
            onClick={onClose}
            className="text-goa-cream/70 hover:text-white p-1 rounded-lg hover:bg-goa-green/40"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Live Preview Box */}
        <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-2xl border-4 border-goa-pink bg-black flex items-center justify-center shadow-lg">
          <img
            src={photoUrl}
            alt="Crop Preview"
            style={{
              transform: `translate(${cropState.x}px, ${cropState.y}px) scale(${cropState.zoom})`,
              transition: 'transform 0.05s ease-out',
            }}
            className="max-w-none max-h-none object-cover w-full h-full pointer-events-none select-none"
          />
          {/* Target Overlay Crosshair */}
          <div className="absolute inset-0 border border-white/20 pointer-events-none grid grid-cols-3 grid-rows-3">
            <div className="border border-white/10"></div>
            <div className="border border-white/10"></div>
            <div className="border border-white/10"></div>
            <div className="border border-white/10"></div>
            <div className="border border-white/10"></div>
            <div className="border border-white/10"></div>
            <div className="border border-white/10"></div>
            <div className="border border-white/10"></div>
            <div className="border border-white/10"></div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 bg-goa-dark p-4 rounded-xl border-2 border-black">
          {/* Zoom Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-goa-cream mb-1">
              <span className="flex items-center gap-1">
                <ZoomOut className="w-3.5 h-3.5" /> ZOOM
              </span>
              <span>{Math.round(cropState.zoom * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.05"
              value={cropState.zoom}
              onChange={handleZoomChange}
              className="w-full accent-goa-pink cursor-pointer"
            />
          </div>

          {/* Pan D-Pad Buttons */}
          <div>
            <span className="block text-xs font-mono text-goa-cream mb-2">PAN POSITION</span>
            <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto">
              <div></div>
              <button
                type="button"
                onClick={() => handlePanY(-20)}
                className="bg-goa-darker hover:bg-goa-pink text-white font-bold p-2 rounded-lg border border-black text-center"
              >
                ▲
              </button>
              <div></div>
              <button
                type="button"
                onClick={() => handlePanX(-20)}
                className="bg-goa-darker hover:bg-goa-pink text-white font-bold p-2 rounded-lg border border-black text-center"
              >
                ◀
              </button>
              <button
                type="button"
                onClick={handleReset}
                title="Reset Position"
                className="bg-goa-yellow text-black font-bold p-2 rounded-lg border border-black text-center flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handlePanX(20)}
                className="bg-goa-darker hover:bg-goa-pink text-white font-bold p-2 rounded-lg border border-black text-center"
              >
                ▶
              </button>
              <div></div>
              <button
                type="button"
                onClick={() => handlePanY(20)}
                className="bg-goa-darker hover:bg-goa-pink text-white font-bold p-2 rounded-lg border border-black text-center"
              >
                ▼
              </button>
              <div></div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-goa-yellow hover:bg-yellow-400 text-black font-bebas text-2xl py-3 rounded-xl border-2 border-black shadow-card-solid flex items-center justify-center gap-2"
        >
          <Check className="w-6 h-6" />
          <span>APPLY CROP & RETURN</span>
        </button>
      </div>
    </div>
  );
};
