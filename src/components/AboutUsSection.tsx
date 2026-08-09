import React, { useState, useRef } from 'react';
import { Github, Linkedin, Twitter, Instagram, Camera, Upload, ExternalLink, Sparkles, Code2, HeartHandshake, Rocket } from 'lucide-react';
import { optimizePhotoInput } from '../lib/image-optimizer';
import { BRAND_ASSETS } from '../lib/brand-tokens';

export const AboutUsSection: React.FC = () => {
  const [shubhamPhoto, setShubhamPhoto] = useState<string | null>(null);
  const [bhavnaPhoto, setBhavnaPhoto] = useState<string | null>(null);

  const shubhamInputRef = useRef<HTMLInputElement>(null);
  const bhavnaInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (person: 'shubham' | 'bhavna', file: File) => {
    try {
      const optimizedUrl = await optimizePhotoInput(file);
      if (person === 'shubham') {
        setShubhamPhoto(optimizedUrl);
      } else {
        setBhavnaPhoto(optimizedUrl);
      }
    } catch (err) {
      console.error('Failed to load profile photo:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* 1. Hero Title Banner */}
      <div className="relative overflow-hidden bg-goa-darker/95 border-4 border-black rounded-3xl p-6 sm:p-8 shadow-card-solid text-center sm:text-left">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: `url(${BRAND_ASSETS.illustrationSunrise})` }}
        />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-goa-yellow text-black font-bebas text-sm px-3 py-1 rounded-lg border border-black font-bold mb-1">
            <Sparkles className="w-4 h-4 text-goa-pink" />
            <span>HACKER HOUSE GOA 2026 TEAM</span>
          </div>

          <h1 className="font-bebas text-4xl sm:text-6xl text-goa-yellow tracking-wide leading-none">
            ABOUT US
          </h1>

          <p className="font-mono text-sm sm:text-base text-goa-cream/90 max-w-2xl font-medium">
            Meet the builders behind the Hacker House Goa 2026 Frame Generator — creating tools, experiences, and digital magic for Goa! 🌴🚀
          </p>
        </div>
      </div>

      {/* 2. Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Profile Card 1: Shubham */}
        <div className="bg-goa-dark/95 border-4 border-black rounded-3xl p-5 sm:p-6 shadow-card-solid-pink flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Photo Avatar & Upload */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 mx-auto rounded-full border-4 border-goa-yellow bg-goa-darker overflow-hidden flex items-center justify-center shadow-card-solid">
              {shubhamPhoto ? (
                <img src={shubhamPhoto} alt="Shubham Sahu" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-3 space-y-1">
                  <div className="bg-goa-pink/20 text-goa-pink p-2.5 rounded-full border border-goa-pink">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] text-goa-cream/60 font-bold">
                    SHUBHAM PHOTO
                  </span>
                </div>
              )}

              {/* Upload Button Overlay */}
              <input
                ref={shubhamInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handlePhotoUpload('shubham', e.target.files[0]);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => shubhamInputRef.current?.click()}
                className="absolute bottom-1 right-1 bg-goa-pink hover:bg-pink-600 text-white p-2 rounded-full border-2 border-black shadow-md cursor-pointer transition-all active:scale-95"
                title="Upload Photo"
                aria-label="Upload Photo for Shubham"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Details */}
            <div className="text-center space-y-1.5">
              <h2 className="font-bebas text-3xl sm:text-4xl text-goa-yellow tracking-wide leading-none">
                SHUBHAM SAHU
              </h2>
              <span className="inline-block bg-goa-green text-goa-yellow font-mono text-xs px-3 py-1 rounded-full border border-black font-bold">
                AI & SYSTEMS ENGINEER
              </span>
              <p className="font-sans text-xs sm:text-sm text-goa-cream/90 pt-2 leading-relaxed">
                Building intelligent AI systems, full-stack web applications, and developer tools for Hacker House Goa 2026.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-4 border-t-2 border-goa-green/50 space-y-2">
            <span className="block font-mono text-[11px] text-goa-yellow font-bold uppercase text-center">
              CONNECT WITH SHUBHAM
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://github.com/https-shubhamsahu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-goa-darker hover:bg-goa-dark text-goa-cream hover:text-white font-mono text-xs py-2.5 px-3 rounded-xl border border-black transition-all hover:scale-[1.02] min-h-[44px]"
              >
                <Github className="w-4 h-4 text-goa-yellow shrink-0" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
              </a>

              <a
                href="https://linkedin.com/in/shubhamsahu9372"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-goa-darker hover:bg-goa-dark text-goa-cream hover:text-white font-mono text-xs py-2.5 px-3 rounded-xl border border-black transition-all hover:scale-[1.02] min-h-[44px]"
              >
                <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
              </a>

              <a
                href="https://x.com/Isagi0011"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-goa-darker hover:bg-goa-dark text-goa-cream hover:text-white font-mono text-xs py-2.5 px-3 rounded-xl border border-black transition-all hover:scale-[1.02] min-h-[44px]"
              >
                <Twitter className="w-4 h-4 text-sky-400 shrink-0" />
                <span>X / Twitter</span>
                <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
              </a>

              <a
                href="https://instagram.com/https.shubham.sahu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-goa-darker hover:bg-goa-dark text-goa-cream hover:text-white font-mono text-xs py-2.5 px-3 rounded-xl border border-black transition-all hover:scale-[1.02] min-h-[44px]"
              >
                <Instagram className="w-4 h-4 text-goa-pink shrink-0" />
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
              </a>
            </div>
          </div>
        </div>

        {/* Profile Card 2: Bhavna */}
        <div className="bg-goa-dark/95 border-4 border-black rounded-3xl p-5 sm:p-6 shadow-card-solid-yellow flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Photo Avatar & Upload */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 mx-auto rounded-full border-4 border-goa-pink bg-goa-darker overflow-hidden flex items-center justify-center shadow-card-solid">
              {bhavnaPhoto ? (
                <img src={bhavnaPhoto} alt="Bhavna Chetty" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-3 space-y-1">
                  <div className="bg-goa-yellow/20 text-goa-yellow p-2.5 rounded-full border border-goa-yellow">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] text-goa-cream/60 font-bold">
                    BHAVNA PHOTO
                  </span>
                </div>
              )}

              {/* Upload Button Overlay */}
              <input
                ref={bhavnaInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handlePhotoUpload('bhavna', e.target.files[0]);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => bhavnaInputRef.current?.click()}
                className="absolute bottom-1 right-1 bg-goa-yellow hover:bg-yellow-400 text-black p-2 rounded-full border-2 border-black shadow-md cursor-pointer transition-all active:scale-95"
                title="Upload Photo"
                aria-label="Upload Photo for Bhavna"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Details */}
            <div className="text-center space-y-1.5">
              <h2 className="font-bebas text-3xl sm:text-4xl text-goa-pink tracking-wide leading-none">
                BHAVNA CHETTY
              </h2>
              <span className="inline-block bg-goa-pink text-white font-mono text-xs px-3 py-1 rounded-full border border-black font-bold">
                CREATIVE BUILDER & STRATEGIST
              </span>
              <p className="font-sans text-xs sm:text-sm text-goa-cream/90 pt-2 leading-relaxed">
                Designing vibrant community experiences, creative brand strategies, and digital media for HH Goa 2026.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-4 border-t-2 border-goa-pink/50 space-y-2">
            <span className="block font-mono text-[11px] text-goa-pink font-bold uppercase text-center">
              CONNECT WITH BHAVNA
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <a
                href="https://www.linkedin.com/in/bhavna-chetty-072983424"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-goa-darker hover:bg-goa-dark text-goa-cream hover:text-white font-mono text-xs py-2.5 px-3 rounded-xl border border-black transition-all hover:scale-[1.02] min-h-[44px]"
              >
                <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60 ml-auto sm:ml-0" />
              </a>

              <a
                href="https://x.com/bansznn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-goa-darker hover:bg-goa-dark text-goa-cream hover:text-white font-mono text-xs py-2.5 px-3 rounded-xl border border-black transition-all hover:scale-[1.02] min-h-[44px]"
              >
                <Twitter className="w-4 h-4 text-sky-400 shrink-0" />
                <span>X / Twitter</span>
                <ExternalLink className="w-3 h-3 opacity-60 ml-auto sm:ml-0" />
              </a>

              <a
                href="https://instagram.com/bansznnn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-goa-darker hover:bg-goa-dark text-goa-cream hover:text-white font-mono text-xs py-2.5 px-3 rounded-xl border border-black transition-all hover:scale-[1.02] min-h-[44px]"
              >
                <Instagram className="w-4 h-4 text-goa-pink shrink-0" />
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3 opacity-60 ml-auto sm:ml-0" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. "What We Build" Section */}
      <div className="bg-goa-darker/95 border-4 border-black rounded-3xl p-6 sm:p-8 shadow-card-solid space-y-4">
        <div className="border-b-2 border-goa-green pb-3">
          <h3 className="font-bebas text-2xl sm:text-3xl text-goa-yellow tracking-wide flex items-center gap-2">
            <Rocket className="w-6 h-6 text-goa-pink" />
            <span>WHAT WE BUILD</span>
          </h3>
          <p className="font-mono text-xs text-goa-cream/80">
            Empowering the hacker house community in Goa with identity tools and creative experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-goa-dark p-4 rounded-2xl border-2 border-black space-y-1.5">
            <div className="bg-goa-green/40 w-10 h-10 rounded-xl flex items-center justify-center border border-black">
              <Code2 className="w-5 h-5 text-goa-yellow" />
            </div>
            <h4 className="font-bebas text-xl text-goa-cream">IDENTITY LAB</h4>
            <p className="font-sans text-xs text-goa-cream/80 leading-relaxed">
              Official Builder Card, PFP Avatar, and Crew Frame Generators for HH Goa 2026.
            </p>
          </div>

          <div className="bg-goa-dark p-4 rounded-2xl border-2 border-black space-y-1.5">
            <div className="bg-goa-pink/20 w-10 h-10 rounded-xl flex items-center justify-center border border-black">
              <HeartHandshake className="w-5 h-5 text-goa-pink" />
            </div>
            <h4 className="font-bebas text-xl text-goa-cream">COMMUNITY BUILDING</h4>
            <p className="font-sans text-xs text-goa-cream/80 leading-relaxed">
              Connecting builders, creators, and teams under the sunny skies of Goa.
            </p>
          </div>

          <div className="bg-goa-dark p-4 rounded-2xl border-2 border-black space-y-1.5">
            <div className="bg-goa-yellow/20 w-10 h-10 rounded-xl flex items-center justify-center border border-black">
              <Sparkles className="w-5 h-5 text-goa-yellow" />
            </div>
            <h4 className="font-bebas text-xl text-goa-cream">HIGH-VIBE PRODUCTS</h4>
            <p className="font-sans text-xs text-goa-cream/80 leading-relaxed">
              Fast, privacy-focused, zero-login web applications built for speed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
