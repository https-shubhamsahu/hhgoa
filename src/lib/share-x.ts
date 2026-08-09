export function shareToX(builderName?: string, format: string = 'BUILDER_ID', projectUrl?: string) {
  let modeText = 'Hacker House Goa 2026 Builder ID Passport';
  if (format === 'PFP') {
    modeText = 'Hacker House Goa 2026 PFP Frame';
  } else if (format === 'CREW') {
    modeText = 'Hacker House Goa 2026 Crew Frame';
  }

  const nameText = builderName ? `for ${builderName} ` : '';
  const urlSnippet = projectUrl && projectUrl.trim() ? `\n\nProject: ${projectUrl.trim()}` : '';

  const caption = `Just generated our official ${modeText} ${nameText}🌴\n\nBuilding & Vibing at Hacker House Goa 2026! 🚀${urlSnippet}\n\nSee you on the sunny beaches of Goa!\n\n#FrameInGoa`;

  const encodedText = encodeURIComponent(caption);
  const targetUrl = `https://x.com/intent/post?text=${encodedText}`;

  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}
