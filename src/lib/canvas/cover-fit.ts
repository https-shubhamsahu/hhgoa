export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  slotRect: Rect,
  cropX: number = 0,
  cropY: number = 0,
  zoom: number = 1,
  borderRadius: number = 0
) {
  const imgRatio = img.width / img.height;
  const slotRatio = slotRect.width / slotRect.height;

  let renderWidth: number;
  let renderHeight: number;

  if (imgRatio > slotRatio) {
    renderHeight = slotRect.height * zoom;
    renderWidth = renderHeight * imgRatio;
  } else {
    renderWidth = slotRect.width * zoom;
    renderHeight = renderWidth / imgRatio;
  }

  // Base centered placement
  let drawX = slotRect.x + (slotRect.width - renderWidth) / 2 + cropX;
  let drawY = slotRect.y + (slotRect.height - renderHeight) / 2 + cropY;

  ctx.save();
  ctx.beginPath();
  if (borderRadius > 0) {
    if (typeof (ctx as any).roundRect === 'function') {
      (ctx as any).roundRect(slotRect.x, slotRect.y, slotRect.width, slotRect.height, borderRadius);
    } else {
      ctx.rect(slotRect.x, slotRect.y, slotRect.width, slotRect.height);
    }
  } else {
    ctx.rect(slotRect.x, slotRect.y, slotRect.width, slotRect.height);
  }
  ctx.clip();

  ctx.drawImage(img, drawX, drawY, renderWidth, renderHeight);
  ctx.restore();
}
