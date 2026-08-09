import React, { useRef, useState } from 'react';
import { Upload, Camera, FileImage, Loader2 } from 'lucide-react';
import { processUploadedFile } from '../lib/heic-converter';

interface UploadDropzoneProps {
  onPhotoSelected: (dataUrl: string) => void;
  hasPhoto: boolean;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onPhotoSelected,
  hasPhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    setLoading(true);
    try {
      const dataUrl = await processUploadedFile(file);
      onPhotoSelected(dataUrl);
    } catch (err) {
      console.error('Error reading photo:', err);
      alert('Could not read image file. Please try a JPG, PNG, or HEIC image.');
    } finally {
      setLoading(false);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between font-mono text-[11px]">
        <label className="text-goa-yellow font-bold uppercase tracking-wider">
          {hasPhoto ? 'YOUR PHOTO' : 'DROP YOUR PHOTO'}
        </label>
        <span className="text-goa-cream/60">No login required</span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-4 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-goa-pink bg-goa-pink/20 scale-[0.99]'
            : 'border-goa-cream/40 bg-goa-darker hover:border-goa-yellow hover:bg-goa-dark/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.heic,.heif"
          onChange={onChangeInput}
          className="hidden"
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-3 space-y-2 text-goa-yellow">
            <Loader2 className="w-7 h-7 animate-spin" />
            <span className="font-mono text-xs font-semibold">Processing photo...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2.5 py-1">
            <div className="bg-goa-pink/20 text-goa-pink p-3 rounded-full border-2 border-goa-pink">
              {hasPhoto ? <Camera className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
            </div>

            <div>
              <p className="font-bebas text-2xl text-goa-cream tracking-wide leading-none">
                {hasPhoto ? 'RE-UPLOAD PHOTO' : 'SELECT OR DROP PHOTO'}
              </p>
              <p className="font-mono text-[11px] text-goa-cream/60 mt-1">
                JPG, PNG, HEIC from iPhone • Portrait & Landscape
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-goa-yellow text-black font-bebas text-lg px-4 py-1 rounded-lg border-2 border-black shadow-card-solid">
              <FileImage className="w-4 h-4" />
              <span>{hasPhoto ? 'CHANGE FILE' : 'BROWSE PHOTO'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
