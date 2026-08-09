export function fillTextFitWidth(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  maxFontSize: number,
  fontFamily: string = 'Bebas Neue',
  weight: string = 'bold',
  fillStyle: string = '#FFF9E8',
  textAlign: CanvasTextAlign = 'left'
): number {
  let fontSize = maxFontSize;
  ctx.save();
  ctx.textAlign = textAlign;
  ctx.fillStyle = fillStyle;

  do {
    ctx.font = `${weight} ${fontSize}px ${fontFamily}`;
    const metrics = ctx.measureText(text);
    if (metrics.width <= maxWidth || fontSize <= 12) {
      break;
    }
    fontSize -= 1;
  } while (fontSize > 12);

  ctx.fillText(text, x, y);
  ctx.restore();
  return fontSize;
}
