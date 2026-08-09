/**
 * Opens X (Twitter) composer directly using https://x.com/intent/post with URLSearchParams pre-filled caption.
 */
export function shareToX(
  builderName?: string,
  format: string = 'BUILDER_ID',
  projectUrl?: string
): void {
  const customSnippet = projectUrl && projectUrl.trim() ? `\n\nProject: ${projectUrl.trim()}` : '';
  const caption = `🌴 Built a tiny thing for Hacker House Goa.\n\nYour photo → your Builder ID → your crew. 👀\n\nMade both the PFP + Crew Frame generator. No signup. Just build.${customSnippet}\n\nTry it: https://hhgoa-omega.vercel.app\n\n#FrameInGoa #HHGoa2026`;

  const params = new URLSearchParams();
  params.set('text', caption);

  const targetUrl = `https://x.com/intent/post?${params.toString()}`;
  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}

export function shareToNativeOrX(
  _canvas: HTMLCanvasElement | null,
  builderName?: string,
  format: string = 'BUILDER_ID',
  projectUrl?: string
): void {
  shareToX(builderName, format, projectUrl);
}
