import React, { useEffect } from 'react';
import { Heart, Repeat, ExternalLink, Sparkles } from 'lucide-react';

export const XPostEmbedSection: React.FC = () => {
  useEffect(() => {
    // Load X (Twitter) widgets.js script dynamically once
    const scriptId = 'twitter-wjs';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);
    } else {
      // Re-trigger widget parsing for SPA tab switching
      if ((window as any).twttr && (window as any).twttr.widgets) {
        (window as any).twttr.widgets.load();
      }
    }
  }, []);

  const postUrl = 'https://x.com/isagi0011/status/2086526802378547645';

  return (
    <section className="bg-goa-darker/95 border-4 border-black rounded-3xl p-5 sm:p-8 shadow-card-solid max-w-3xl mx-auto w-full my-8 space-y-5 overflow-hidden">
      {/* Heading Above Embed */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 bg-goa-yellow text-black font-bebas text-xs px-3 py-1 rounded-lg border border-black font-bold mb-1">
          <Sparkles className="w-4 h-4 text-goa-pink" />
          <span>OFFICIAL ANNOUNCEMENT</span>
        </div>
        <h3 className="font-bebas text-3xl sm:text-4xl text-goa-yellow tracking-wide leading-none">
          BUILT THIS FOR HH GOA 🌴
        </h3>
        <p className="font-mono text-xs text-goa-cream/80">
          Check out the launch post and show some love to the builder!
        </p>
      </div>

      {/* Official X Widget Embed */}
      <div className="w-full flex justify-center overflow-x-auto py-2">
        <blockquote
          className="twitter-tweet"
          data-theme="dark"
          data-align="center"
          data-width="500"
        >
          <a href={postUrl}>Loading X post...</a>
        </blockquote>
      </div>

      {/* Text & Support CTA Below Embed */}
      <div className="pt-3 border-t-2 border-goa-green/50 text-center space-y-3">
        <p className="font-sans text-sm text-goa-cream/90 font-medium">
          Liked it? Help a builder out ❤️<br />
          <span className="font-mono text-xs text-goa-yellow font-semibold">
            Like • Repost • Share
          </span>
        </p>

        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-goa-pink hover:bg-pink-600 text-white font-bebas text-xl sm:text-2xl py-3 px-6 rounded-xl border-3 border-black shadow-card-solid-yellow transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer font-bold min-h-[48px]"
        >
          <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
          <span>❤️ SUPPORT THE BUILD</span>
          <ExternalLink className="w-4 h-4 opacity-80" />
        </a>
      </div>
    </section>
  );
};
