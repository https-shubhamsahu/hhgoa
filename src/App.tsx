import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { FormatToggle } from './components/FormatToggle';
import { UploadDropzone } from './components/UploadDropzone';
import { ImageCropperModal } from './components/ImageCropperModal';
import { BuilderForm } from './components/BuilderForm';
import { FrameCanvas } from './components/FrameCanvas';
import { ExportBar } from './components/ExportBar';
import { TeamBuilderSection } from './components/TeamBuilderSection';
import { BuilderData, FrameFormat } from './types';
import { BRAND_ASSETS } from './lib/brand-tokens';
import { Palmtree, Users, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  const [builderData, setBuilderData] = useState<BuilderData>({
    name: 'SHUBHAM SAHU',
    role: 'AI ENGINEER / SYSTEMS DEVELOPER',
    stack: 'Python • React • AI • Web3',
    buildingText: 'Building next-gen AI & Web3 applications on the sunny beaches of Goa!',
    city: 'Goa, India',
    passportNo: 'HHG-2026-8842',
    photoUrl: null,
    cropX: 0,
    cropY: 0,
    cropZoom: 1,
    format: 'BUILDER_ID',
    teamName: 'GOA AI HACKERS',
    teammates: [],
  });

  const handlePhotoSelected = (dataUrl: string) => {
    setBuilderData((prev) => ({
      ...prev,
      photoUrl: dataUrl,
      cropX: 0,
      cropY: 0,
      cropZoom: 1,
    }));
  };

  const handleUpdateData = (updated: Partial<BuilderData>) => {
    setBuilderData((prev) => ({ ...prev, ...updated }));
  };

  const handleDownloadTeamPng = () => {
    if (!canvasRef.current) return;

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#036735', '#FF0080', '#FEE101', '#FFFBE8'],
      });
    } catch (e) {
      // Ignore
    }

    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    const sanitizedTeam = (builderData.teamName || 'crew').toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.download = `hhgoa-crew-${sanitizedTeam}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-goa-green text-goa-cream flex flex-col font-sans selection:bg-goa-pink selection:text-white pb-12 overflow-x-hidden">
      {/* Dynamic Animated Looping Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-25"
      >
        <source src={BRAND_ASSETS.videoBackground} type="video/mp4" />
      </video>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Event Header */}
        <Header />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-5 flex-grow space-y-6">
        {/* Authentic Brand Hero Banner */}
        <div className="relative overflow-hidden bg-goa-darker/95 border-4 border-black rounded-3xl p-6 shadow-card-solid">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: `url(${BRAND_ASSETS.illustrationSunrise})` }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-bebas text-3xl sm:text-4xl text-goa-yellow tracking-wide leading-none">
                YOUR PHOTO. YOUR STACK. YOUR BUILDER IDENTITY.
              </h2>
              <p className="font-mono text-xs text-goa-cream/90 font-medium">
                Create your individual HH Goa frame AND bring your teammates into one combined crew graphic!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-goa-green/90 text-goa-cream px-3 py-1.5 rounded-xl border-2 border-black font-mono text-xs font-semibold shrink-0 shadow-card-solid-pink">
                <ShieldCheck className="w-4 h-4 text-goa-yellow" />
                <span>100% Processed Locally</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Controls Column (5 Cols Desktop) */}
          <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
            {/* Format Switcher */}
            <FormatToggle
              format={builderData.format}
              onChangeFormat={(f: FrameFormat) => handleUpdateData({ format: f })}
            />

            {/* Photo Upload Dropzone */}
            <UploadDropzone
              onPhotoSelected={handlePhotoSelected}
              hasPhoto={!!builderData.photoUrl}
            />

            {/* Builder Card Details Form */}
            {builderData.format === 'BUILDER_ID' && (
              <BuilderForm data={builderData} onChangeData={handleUpdateData} />
            )}

            {/* TEAM BUILDER / CREW SECTION */}
            {builderData.format === 'CREW' && (
              <TeamBuilderSection
                data={builderData}
                onChangeData={handleUpdateData}
                onDownloadTeamPng={handleDownloadTeamPng}
              />
            )}
          </div>

          {/* GENERATED PREVIEW HERO COLUMN (7 Cols Desktop) */}
          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2 lg:sticky lg:top-20">
            {/* Large Card Canvas Preview Component */}
            <div className="w-full max-w-lg mx-auto">
              <FrameCanvas
                data={builderData}
                canvasRef={canvasRef}
                isTeamMode={builderData.format === 'CREW'}
                debugMode={debugMode}
              />
            </div>

            {/* Export & Share Action Bar */}
            <div className="w-full max-w-lg mx-auto">
              <ExportBar
                canvasRef={canvasRef}
                builderName={builderData.name}
                format={builderData.format}
                onOpenCropper={() => setCropperOpen(true)}
                hasPhoto={!!builderData.photoUrl}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Cropper Modal */}
      <ImageCropperModal
        isOpen={cropperOpen}
        onClose={() => setCropperOpen(false)}
        photoUrl={builderData.photoUrl}
        cropState={{ x: builderData.cropX, y: builderData.cropY, zoom: builderData.cropZoom }}
        onChangeCrop={(c) =>
          handleUpdateData({
            cropX: c.x,
            cropY: c.y,
            cropZoom: c.zoom,
          })
        }
      />

      {/* Footer */}
      <footer className="mt-16 text-center font-mono text-xs text-goa-cream/70 border-t-4 border-black pt-6 relative overflow-hidden bg-goa-darker">
        <img
          src={BRAND_ASSETS.illustrationFooterTrees}
          alt="Goa Trees"
          className="w-full h-24 object-cover object-bottom opacity-40 mb-3"
        />
        <p className="relative z-10 pb-4">
          Hacker House Goa 2026 • Official Individual & Crew Identity Generator • #FrameInGoa
        </p>
      </footer>
      </div>
    </div>
  );
};
