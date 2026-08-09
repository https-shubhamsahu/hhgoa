import { dataUrlToBlob } from './image-optimizer';

export async function shareToNativeOrX(
  canvas: HTMLCanvasElement | null,
  builderName?: string,
  format: string = 'BUILDER_ID',
  projectUrl?: string
): Promise<void> {
  let modeText = 'Hacker House Goa 2026 Builder ID Passport';
  if (format === 'PFP') {
    modeText = 'Hacker House Goa 2026 PFP Frame';
  } else if (format === 'CREW') {
    modeText = 'Hacker House Goa 2026 Crew Frame';
  }

  const nameText = builderName ? `for ${builderName} ` : '';
  const urlSnippet = projectUrl && projectUrl.trim() ? `\n\nProject: ${projectUrl.trim()}` : '';
  const caption = `Just generated our official ${modeText} ${nameText}🌴\n\nBuilding & Vibing at Hacker House Goa 2026! 🚀${urlSnippet}\n\nSee you on the sunny beaches of Goa!\n\n#FrameInGoa`;

  // 1. Check if Web Share API is available with file sharing
  if (canvas && navigator.share && navigator.canShare) {
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const blob = dataUrlToBlob(dataUrl);
      const sanitizedName = (builderName || 'builder').toLowerCase().replace(/[^a-z0-9]/g, '-');
      const filename =
        format === 'PFP'
          ? `hh-goa-pfp-${sanitizedName}.png`
          : format === 'CREW'
          ? `hh-goa-crew-${sanitizedName}.png`
          : `hh-goa-card-${sanitizedName}.png`;

      const file = new File([blob], filename, { type: 'image/png' });
      const shareData = {
        title: 'Hacker House Goa 2026',
        text: caption,
        files: [file],
      };

      if (navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return;
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.warn('Native share failed, falling back to X intent:', err);
      } else {
        return; // User cancelled native share sheet
      }
    }
  }

  // 2. Fallback to X Intent URL
  const encodedText = encodeURIComponent(caption);
  const targetUrl = `https://x.com/intent/post?text=${encodedText}`;
  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}

export function shareToX(builderName?: string, format: string = 'BUILDER_ID', projectUrl?: string) {
  shareToNativeOrX(null, builderName, format, projectUrl);
}
