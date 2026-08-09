import React, { useRef, useState } from 'react';
import { Camera, Image as ImageIcon, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { optimizePhotoInput } from '../lib/image-optimizer';

interface UploadDropzoneProps {
  onPhotoSelected: (dataUrl: string) => void;
  hasPhoto: boolean;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onPhotoSelected,
  hasPhoto,
}) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const handleFileSelected = async (file: File) => {
    setLoading(true);
    setCameraError(null);
    try {
      const dataUrl = await optimizePhotoInput(file);
      onPhotoSelected(dataUrl);
    } catch (err) {
      console.error('Photo optimization error:', err);
      setCameraError('Could not process photo. Please try choosing a photo from your gallery instead.');
    } finally {
      setLoading(false);
    }
  };

  const handleCameraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    } else {
      setCameraError('Camera access was blocked or cancelled. You can upload a photo from your gallery instead.');
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-3 bg-goa-dark/90 p-4 rounded-2xl border-4 border-black shadow-card-solid">
      {/* Hidden File Inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleCameraChange}
        className="hidden"
      />

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*,.heic,.heif"
        onChange={handleGalleryChange}
        className="hidden"
      />

      {/* Header Label */}
      <div className="flex items-center justify-between font-mono text-xs">
        <label className="text-goa-yellow font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-goa-pink" />
          <span>{hasPhoto ? 'PHOTO READY • CHANGE PHOTO' : 'STEP 1: ADD YOUR PHOTO'}</span>
        </label>
        <span className="text-goa-cream/60 text-[10px]">Mobile-Optimized</span>
      </div>

      {/* Loading Overlay */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-6 bg-goa-darker rounded-xl border-2 border-goa-yellow space-y-2">
          <Loader2 className="w-8 h-8 text-goa-yellow animate-spin" />
          <span className="font-mono text-xs text-goa-cream font-bold">
            Optimizing photo for mobile...
          </span>
        </div>
      ) : (
        /* Dual Mobile Input Buttons */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Button 1: Take Photo */}
          <button
            type="button"
            onClick={() => {
              setCameraError(null);
              cameraInputRef.current?.click();
            }}
            className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-goa-pink hover:bg-pink-600 text-white font-bebas text-xl px-4 py-3 rounded-xl border-3 border-black shadow-card-solid-yellow transition-all active:scale-[0.98] cursor-pointer font-bold"
            aria-label="Take Photo using Camera"
          >
            <Camera className="w-5 h-5 text-white" />
            <span>📷 TAKE PHOTO</span>
          </button>

          {/* Button 2: Choose from Gallery */}
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-goa-yellow hover:bg-yellow-400 text-black font-bebas text-xl px-4 py-3 rounded-xl border-3 border-black shadow-card-solid-pink transition-all active:scale-[0.98] cursor-pointer font-bold"
            aria-label="Choose Photo from Gallery"
          >
            <ImageIcon className="w-5 h-5 text-black" />
            <span>🖼️ CHOOSE FROM GALLERY</span>
          </button>
        </div>
      )}

      {/* Camera Permission / Error Warning Callout */}
      {cameraError && (
        <div className="bg-red-950/80 border-2 border-red-500 p-3 rounded-xl flex items-start gap-2 text-xs font-mono text-red-200">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-white">Camera Access Error</p>
            <p>{cameraError}</p>
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="mt-1 flex items-center gap-1 bg-red-800 hover:bg-red-700 text-white px-2.5 py-1 rounded text-[11px] font-bold border border-black"
            >
              <RefreshCw className="w-3 h-3" />
              <span>CHOOSE FROM GALLERY INSTEAD</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
