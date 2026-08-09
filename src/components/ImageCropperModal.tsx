import React, { useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Move, Check, RotateCcw, X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; dist: number } | null>(null);
  const cropRef = useRef(cropState);
  cropRef.current = cropState;

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

  // Touch gesture handlers for touch drag & pinch-to-zoom
  const getTouchDistance = (e: React.TouchEvent) => {
    if (e.touches.length < 2) return 0;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX - cropRef.current.x,
        y: e.touches[0].clientY - cropRef.current.y,
        dist: 0,
      };
    } else if (e.touches.length === 2) {
      touchStartRef.current = {
        x: cropRef.current.x,
        y: cropRef.current.y,
        dist: getTouchDistance(e),
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    if (e.touches.length === 1) {
      // 1 Finger Drag Pan
      const newX = e.touches[0].clientX - touchStartRef.current.x;
      const newY = e.touches[0].clientY - touchStartRef.current.y;
      onChangeCrop({
        ...cropRef.current,
        x: newX,
        y: newY,
      });
    } else if (e.touches.length === 2 && touchStartRef.current.dist > 0) {
      // 2 Finger Pinch Zoom
      const newDist = getTouchDistance(e);
      const scale = newDist / touchStartRef.current.dist;
      const newZoom = Math.min(Math.max(cropRef.current.zoom * scale, 0.5), 3.0);

      onChangeCrop({
        ...cropRef.current,
        zoom: newZoom,
      });
      touchStartRef.current.dist = newDist;
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="bg-goa-darker border-4 border-black rounded-3xl p-4 sm:p-6 max-w-lg w-full shadow-card-solid-pink space-y-4 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-goa-green pb-3">
          <div className="flex items-center gap-2">
            <Move className="w-5 h-5 text-goa-yellow" />
            <h3 className="font-bebas text-2xl text-goa-cream">CROP & RE-CENTER PHOTO</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-goa-cream/70 hover:text-white p-2 rounded-xl hover:bg-goa-green/40 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close Crop Editor"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Live Touch Crop Area */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto overflow-hidden rounded-full border-4 border-goa-yellow bg-black flex items-center justify-center shadow-2xl cursor-move touch-none select-none"
        >
          <img
            src={photoUrl}
            alt="Crop Preview"
            style={{
              transform: `translate(${cropState.x}px, ${cropState.y}px) scale(${cropState.zoom})`,
              transition: 'transform 0.02s linear',
            }}
            className="max-w-none max-h-none object-cover w-full h-full pointer-events-none select-none"
          />
          {/* Touch Helper Hint Overlay */}
          <div className="absolute inset-0 border-2 border-dashed border-goa-yellow/50 rounded-full pointer-events-none flex items-center justify-center">
            <span className="bg-black/70 text-goa-cream text-[10px] font-mono px-2 py-1 rounded font-bold">
              TOUCH DRAG / PINCH TO ZOOM
            </span>
          </div>
        </div>

        {/* Touch-Friendly Controls */}
        <div className="space-y-4 bg-goa-dark p-3.5 sm:p-4 rounded-2xl border-2 border-black">
          {/* Zoom Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-goa-cream mb-1">
              <span className="flex items-center gap-1 text-goa-yellow font-bold">
                <ZoomOut className="w-4 h-4" /> ZOOM
              </span>
              <span className="font-bold text-white">{Math.round(cropState.zoom * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.05"
              value={cropState.zoom}
              onChange={handleZoomChange}
              className="w-full h-3 accent-goa-pink cursor-pointer bg-goa-darker rounded-lg"
            />
          </div>

          {/* D-Pad Buttons (Min 44px Target) */}
          <div>
            <span className="block text-xs font-mono text-goa-cream mb-2 text-center font-bold">
              FINE PAN CONTROLS
            </span>
            <div className="grid grid-cols-3 gap-2 max-w-[210px] mx-auto">
              <div></div>
              <button
                type="button"
                onClick={() => handlePanY(-20)}
                className="bg-goa-darker hover:bg-goa-pink text-white font-bold p-3 rounded-xl border-2 border-black flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label="Pan Up"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
              <div></div>

              <button
                type="button"
                onClick={() => handlePanX(-20)}
                className="bg-goa-darker hover:bg-goa-pink text-white font-bold p-3 rounded-xl border-2 border-black flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label="Pan Left"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                title="Reset Position"
                className="bg-goa-yellow text-black font-bold p-3 rounded-xl border-2 border-black flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label="Reset Position"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handlePanX(20)}
                className="bg-goa-darker hover:bg-goa-pink text-white font-bold p-3 rounded-xl border-2 border-black flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label="Pan Right"
              >
                <ArrowRight className="w-5 h-5" />
              </button>

              <div></div>
              <button
                type="button"
                onClick={() => handlePanY(20)}
                className="bg-goa-darker hover:bg-goa-pink text-white font-bold p-3 rounded-xl border-2 border-black flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label="Pan Down"
              >
                <ArrowDown className="w-5 h-5" />
              </button>
              <div></div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[52px] bg-goa-yellow hover:bg-yellow-400 text-black font-bebas text-2xl py-3 rounded-xl border-3 border-black shadow-card-solid flex items-center justify-center gap-2 font-bold cursor-pointer"
        >
          <Check className="w-6 h-6" />
          <span>USE PHOTO & RETURN</span>
        </button>
      </div>
    </div>
  );
};
