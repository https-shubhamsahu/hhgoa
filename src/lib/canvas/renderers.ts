import { BuilderData } from '../../types';
import { fillTextFitWidth } from './fit-text';
import { drawImageCover } from './cover-fit';
import { getBuilderClass } from '../builder-class';
import { BRAND_COLORS } from '../brand-tokens';
import { generateQrDataUrl } from '../qr-generator';
import { BUILDER_ID_LAYOUT } from './layout';

const OFFICIAL_TEMPLATE_PATH = './assets/brand/template_badge.png';

let cachedTemplateImg: HTMLImageElement | null = null;

function loadTemplateImage(): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (cachedTemplateImg && cachedTemplateImg.complete && cachedTemplateImg.naturalWidth > 0) {
      resolve(cachedTemplateImg);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      cachedTemplateImg = img;
      resolve(img);
    };
    img.onerror = () => {
      console.error('Failed to load official template PNG:', OFFICIAL_TEMPLATE_PATH);
      resolve(null);
    };
    img.src = OFFICIAL_TEMPLATE_PATH;
  });
}

const PFP_TEMPLATE_PATH = './assets/brand/pfp_final.png?v=7';
let cachedPfpTemplateImg: HTMLImageElement | null = null;

function loadPfpTemplateImage(): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (cachedPfpTemplateImg && cachedPfpTemplateImg.complete && cachedPfpTemplateImg.naturalWidth > 0) {
      resolve(cachedPfpTemplateImg);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      cachedPfpTemplateImg = img;
      resolve(img);
    };
    img.onerror = () => {
      console.error('Failed to load official PFP template PNG:', PFP_TEMPLATE_PATH);
      resolve(null);
    };
    img.src = PFP_TEMPLATE_PATH;
  });
}

export async function drawPfpFrame(
  canvas: HTMLCanvasElement,
  data: BuilderData,
  userImage: HTMLImageElement | null
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const pfpTemplate = await loadPfpTemplateImage();

  const width = 1254;
  const height = 1254;
  canvas.width = width;
  canvas.height = height;

  // 1. LAYER 1: User Photo clipped cleanly to circle slot (CenterX=624, CenterY=637, Radius=395)
  const circleX = 624;
  const circleY = 637;
  const circleRadius = 395;

  ctx.save();
  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  if (userImage) {
    const photoBoxW = circleRadius * 2;
    const photoBoxH = circleRadius * 2;
    const photoBoxX = circleX - circleRadius;
    const photoBoxY = circleY - circleRadius;

    drawImageCover(
      ctx,
      userImage,
      { x: photoBoxX, y: photoBoxY, width: photoBoxW, height: photoBoxH },
      data.cropX,
      data.cropY,
      data.cropZoom,
      0
    );
  } else {
    ctx.fillStyle = 'rgba(3, 20, 12, 0.95)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = BRAND_COLORS.sandCream;
    ctx.font = 'bold 36px "Plus Jakarta Sans"';
    ctx.textAlign = 'center';
    ctx.fillText('DROP YOUR PHOTO HERE', circleX, circleY);
  }
  ctx.restore();

  // 2. LAYER 2: Official PFP Template Frame Overlay artwork on top!
  if (pfpTemplate) {
    ctx.drawImage(pfpTemplate, 0, 0, width, height);
  }
}

/**
 * CANONICAL BUILDER ID TEMPLATE COMPOSITOR
 * Fixed 1024 x 1536 Canvas Renderer aligned strictly to user reference image
 */
export async function drawBuilderIdCard(
  canvas: HTMLCanvasElement,
  data: BuilderData,
  userImage: HTMLImageElement | null,
  debugMode: boolean = false
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const templateImg = await loadTemplateImage();

  // Canonical Template Resolution (1024 x 1536)
  const layout = BUILDER_ID_LAYOUT;
  canvas.width = layout.width;
  canvas.height = layout.height;

  // 1. LAYER 1: Base Template PNG Artwork
  if (templateImg) {
    ctx.drawImage(templateImg, 0, 0, layout.width, layout.height);
  } else {
    ctx.fillStyle = BRAND_COLORS.palmGreen;
    ctx.fillRect(0, 0, layout.width, layout.height);
  }

  // 2. LAYER 2: User Photo clipped cleanly to circular slot
  const { centerX, centerY, radius } = layout.photo;

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  if (userImage) {
    const photoBoxW = radius * 2;
    const photoBoxH = radius * 2;
    const photoBoxX = centerX - radius;
    const photoBoxY = centerY - radius;

    drawImageCover(
      ctx,
      userImage,
      { x: photoBoxX, y: photoBoxY, width: photoBoxW, height: photoBoxH },
      data.cropX,
      data.cropY,
      data.cropZoom,
      0
    );
  } else {
    ctx.fillStyle = 'rgba(3, 20, 12, 0.9)';
    ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
    ctx.fillStyle = BRAND_COLORS.sandCream;
    ctx.font = 'bold 28px "Plus Jakarta Sans"';
    ctx.textAlign = 'center';
    ctx.fillText('DROP YOUR PHOTO HERE', centerX, centerY);
  }
  ctx.restore();

  // Inner Yellow Border Ring around photo
  ctx.strokeStyle = BRAND_COLORS.sunYellow;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();

  // 3. LAYER 3: BUILDER Hot Pink Pill Badge
  const pill = layout.builderPill;
  const pillX = pill.centerX - pill.width / 2;
  const pillY = pill.y - pill.height / 2;

  ctx.fillStyle = pill.fillColor;
  ctx.beginPath();
  (ctx as any).roundRect?.(pillX, pillY, pill.width, pill.height, pill.borderRadius) ||
    ctx.rect(pillX, pillY, pill.width, pill.height);
  ctx.fill();

  ctx.fillStyle = pill.textColor;
  ctx.font = 'bold 20px "Plus Jakarta Sans"';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER', pill.centerX, pill.y + 6);

  // 4. LAYER 4: Dynamic Builder Name ("YOUR NAME" / "SHUBHAM SAHU")
  const nameText = (data.name.trim() || 'SHUBHAM SAHU').toUpperCase();
  fillTextFitWidth(
    ctx,
    nameText,
    layout.name.centerX,
    layout.name.y,
    layout.name.maxWidth,
    layout.name.maxFontSize,
    'Plus Jakarta Sans',
    '900',
    layout.name.color,
    'center'
  );

  // 5. LAYER 5: Dynamic Role & Stack (Clean Centered Text)
  const roleText = data.role.trim() || 'AI Engineer / Systems Dev';
  fillTextFitWidth(
    ctx,
    roleText,
    layout.role.centerX,
    layout.role.y,
    layout.role.maxWidth,
    layout.role.maxFontSize,
    'Plus Jakarta Sans',
    '600',
    layout.role.color,
    'center'
  );

  // 6. LAYER 6: Dynamic Builder Class (Secondary Title)
  const builderClass = getBuilderClass(data.role, data.stack);
  fillTextFitWidth(
    ctx,
    builderClass,
    layout.builderClass.centerX,
    layout.builderClass.y,
    layout.builderClass.maxWidth,
    layout.builderClass.maxFontSize,
    'Space Mono',
    'bold',
    layout.builderClass.color,
    'center'
  );

  // 7. LAYER 7: Scannable QR Code pointing to live site + "SCAN TO JOIN THE FRAME" Text
  const qrTargetUrl = 'https://hhgoa-omega.vercel.app/';
  const qrUrl = await generateQrDataUrl(qrTargetUrl);
  if (qrUrl) {
    const qrImg = new Image();
    await new Promise<void>((resolve) => {
      qrImg.onload = () => {
        ctx.drawImage(qrImg, layout.qr.x, layout.qr.y, layout.qr.size, layout.qr.size);
        ctx.strokeStyle = layout.qr.color;
        ctx.lineWidth = 4;
        ctx.strokeRect(layout.qr.x, layout.qr.y, layout.qr.size, layout.qr.size);
        resolve();
      };
      qrImg.onerror = () => resolve();
      qrImg.src = qrUrl;
    });
  }

  ctx.fillStyle = layout.qr.color;
  ctx.font = '800 18px "Plus Jakarta Sans"';
  ctx.textAlign = 'left';
  ctx.fillText('SCAN TO', layout.qr.labelX, layout.qr.labelY - 14);
  ctx.fillText('JOIN THE FRAME', layout.qr.labelX, layout.qr.labelY + 12);

  // 8. LAYER 8: Dynamic Team Name ("TEAM NAME" + "YOUR TEAM") (Lower Right)
  const teamLabel = 'TEAM NAME';
  const teamName = (data.teamName && data.teamName.trim() ? data.teamName.trim() : 'OPTI-MYSTIC').toUpperCase();

  ctx.fillStyle = layout.team.color;
  ctx.font = 'bold 20px "Plus Jakarta Sans"';
  ctx.textAlign = 'left';
  ctx.fillText(teamLabel, layout.team.labelX, layout.team.labelY);

  fillTextFitWidth(
    ctx,
    teamName,
    layout.team.nameX,
    layout.team.nameY,
    layout.team.maxWidth,
    layout.team.maxFontSize,
    'Plus Jakarta Sans',
    '900',
    layout.team.color,
    'left'
  );

  // 9. OPTIONAL DEBUG OVERLAY
  if (debugMode) {
    drawDebugBoundingBoxes(ctx, layout);
  }
}

const CREW_TEMPLATE_PATH = './assets/brand/template_crew.png?v=1';
let cachedCrewTemplateImg: HTMLImageElement | null = null;

function loadCrewTemplateImage(): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (cachedCrewTemplateImg && cachedCrewTemplateImg.complete && cachedCrewTemplateImg.naturalWidth > 0) {
      resolve(cachedCrewTemplateImg);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      cachedCrewTemplateImg = img;
      resolve(img);
    };
    img.onerror = () => {
      console.error('Failed to load official Crew template PNG:', CREW_TEMPLATE_PATH);
      resolve(null);
    };
    img.src = CREW_TEMPLATE_PATH;
  });
}

/**
 * COMBINED TEAM / CREW FRAME RENDERER (2048 x 1362 px)
 * Composites dynamic team name, member photos (1 to 4 members), names, roles, and QR code pointing to About Us!
 */
export async function drawTeamFrame(
  canvas: HTMLCanvasElement,
  data: BuilderData,
  userImage: HTMLImageElement | null,
  teammateImages: Map<string, HTMLImageElement>,
  debugMode: boolean = false
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const crewTemplate = await loadCrewTemplateImage();

  const width = 2048;
  const height = 1362;
  canvas.width = width;
  canvas.height = height;

  // 1. LAYER 1: Immutable Background Template Artwork (2048 x 1362)
  if (crewTemplate) {
    ctx.drawImage(crewTemplate, 0, 0, width, height);
  } else {
    ctx.fillStyle = BRAND_COLORS.palmGreen;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. LAYER 2: Dynamic Team Name (2x Size, baseline Y=530, max font size 140px)
  const teamNameText = (data.teamName.trim() || 'OPTI-MYSTIC').toUpperCase();
  fillTextFitWidth(
    ctx,
    teamNameText,
    1024,
    530,
    1448,
    140,
    'Plus Jakarta Sans',
    '900',
    BRAND_COLORS.sunYellow,
    'center'
  );

  // 3. LAYER 3: Dynamic Members
  const members = [
    {
      name: (data.name.trim() || 'SHUBHAM SAHU').toUpperCase(),
      role: (data.role.trim() || 'AI ENGINEER').toUpperCase(),
      img: userImage,
      cropX: data.cropX,
      cropY: data.cropY,
      cropZoom: data.cropZoom,
    },
    ...data.teammates.slice(0, 3).map((t) => ({
      name: (t.name.trim() || 'TEAMMATE').toUpperCase(),
      role: (t.role.trim() || 'BUILDER').toUpperCase(),
      img: teammateImages.get(t.id) || null,
      cropX: t.cropX,
      cropY: t.cropY,
      cropZoom: t.cropZoom,
    })),
  ];

  const total = Math.min(members.length, 4);
  let layoutCoords: Array<{ cx: number; cy: number; r: number; nameY: number; roleY: number }> = [];

  if (total === 1) {
    layoutCoords = [
      { cx: 1024, cy: 770, r: 215, nameY: 1035, roleY: 1080 }
    ];
  } else if (total === 2) {
    layoutCoords = [
      { cx: 680, cy: 750, r: 180, nameY: 980, roleY: 1025 },
      { cx: 1368, cy: 750, r: 180, nameY: 980, roleY: 1025 },
    ];
  } else if (total === 3) {
    layoutCoords = [
      { cx: 550, cy: 740, r: 155, nameY: 945, roleY: 990 },
      { cx: 1024, cy: 740, r: 155, nameY: 945, roleY: 990 },
      { cx: 1498, cy: 740, r: 155, nameY: 945, roleY: 990 },
    ];
  } else {
    layoutCoords = [
      { cx: 430, cy: 730, r: 140, nameY: 920, roleY: 965 },
      { cx: 826, cy: 730, r: 140, nameY: 920, roleY: 965 },
      { cx: 1222, cy: 730, r: 140, nameY: 920, roleY: 965 },
      { cx: 1618, cy: 730, r: 140, nameY: 920, roleY: 965 },
    ];
  }

  for (let i = 0; i < total; i++) {
    const m = members[i];
    const c = layoutCoords[i];

    // Yellow Outer Border Ring (12px stroke)
    ctx.save();
    ctx.fillStyle = BRAND_COLORS.sunYellow;
    ctx.strokeStyle = BRAND_COLORS.midnightDark;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(c.cx, c.cy, c.r + 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Circular Photo Cutout
    ctx.save();
    ctx.beginPath();
    ctx.arc(c.cx, c.cy, c.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    if (m.img) {
      const boxSize = c.r * 2;
      drawImageCover(
        ctx,
        m.img,
        { x: c.cx - c.r, y: c.cy - c.r, width: boxSize, height: boxSize },
        m.cropX,
        m.cropY,
        m.cropZoom,
        0
      );
    } else {
      ctx.fillStyle = BRAND_COLORS.midnightDark;
      ctx.fillRect(c.cx - c.r, c.cy - c.r, c.r * 2, c.r * 2);
      ctx.fillStyle = BRAND_COLORS.sandCream;
      ctx.font = 'bold 22px "Plus Jakarta Sans"';
      ctx.textAlign = 'center';
      ctx.fillText('PHOTO', c.cx, c.cy);
    }
    ctx.restore();

    // Member Name (Bold Dark Green)
    const maxTextW = c.r * 2.4;
    fillTextFitWidth(
      ctx,
      m.name,
      c.cx,
      c.nameY,
      maxTextW,
      total === 1 ? 42 : total === 2 ? 36 : 28,
      'Plus Jakarta Sans',
      '800',
      BRAND_COLORS.midnightDark,
      'center'
    );

    // Member Role (Hot Pink / Accent)
    fillTextFitWidth(
      ctx,
      m.role,
      c.cx,
      c.roleY,
      maxTextW,
      total === 1 ? 30 : total === 2 ? 26 : 22,
      'Plus Jakarta Sans',
      '700',
      BRAND_COLORS.hotPink,
      'center'
    );
  }

  // 4. LAYER 4: Dynamic QR Code pointing to About Us page: https://hhgoa-omega.vercel.app/#/about
  const qrTargetUrl = data.projectUrl && data.projectUrl.trim()
    ? data.projectUrl.trim()
    : 'https://hhgoa-omega.vercel.app/#/about';

  if (qrTargetUrl) {
    const qrUrl = await generateQrDataUrl(qrTargetUrl);
    if (qrUrl) {
      const qrImg = new Image();
      await new Promise<void>((resolve) => {
        qrImg.onload = () => {
          ctx.drawImage(qrImg, 50, 980, 180, 180);
          ctx.strokeStyle = BRAND_COLORS.midnightDark;
          ctx.lineWidth = 4;
          ctx.strokeRect(50, 980, 180, 180);
          resolve();
        };
        qrImg.onerror = () => resolve();
        qrImg.src = qrUrl;
      });
    }
  }
}

function drawDebugBoundingBoxes(ctx: CanvasRenderingContext2D, layout: typeof BUILDER_ID_LAYOUT) {
  ctx.save();

  // Photo Circle Region
  ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(layout.photo.centerX, layout.photo.centerY, layout.photo.radius, 0, Math.PI * 2);
  ctx.stroke();

  // Builder Pill Box
  ctx.strokeStyle = 'rgba(255, 0, 255, 0.8)';
  ctx.strokeRect(layout.builderPill.centerX - layout.builderPill.width / 2, layout.builderPill.y - layout.builderPill.height / 2, layout.builderPill.width, layout.builderPill.height);

  // Name Region Box
  ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';
  ctx.strokeRect(layout.name.centerX - layout.name.maxWidth / 2, layout.name.y - 50, layout.name.maxWidth, 65);

  // Role Region Box
  ctx.strokeStyle = 'rgba(0, 0, 255, 0.8)';
  ctx.strokeRect(layout.role.centerX - layout.role.maxWidth / 2, layout.role.y - 25, layout.role.maxWidth, 35);

  // Builder Class Region Box
  ctx.strokeStyle = 'rgba(255, 128, 0, 0.8)';
  ctx.strokeRect(layout.builderClass.centerX - layout.builderClass.maxWidth / 2, layout.builderClass.y - 20, layout.builderClass.maxWidth, 30);

  // QR Box
  ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
  ctx.strokeRect(layout.qr.x, layout.qr.y, layout.qr.size, layout.qr.size);

  // Team Box
  ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
  ctx.strokeRect(layout.team.nameX, layout.team.labelY - 15, layout.team.maxWidth, 70);

  ctx.restore();
}
