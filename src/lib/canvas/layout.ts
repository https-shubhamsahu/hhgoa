/**
 * CANONICAL BUILDER ID ALIGNMENT LAYOUT COORDINATES
 * Adjusted to eliminate white gap and shift photo circle 15px DOWN:
 * - Photo Circle moved 15px DOWN (centerY = 600) and expanded (radius = 255) to fill white gap cleanly!
 * - BUILDER Pill positioned flush below circle (y = 865)
 * - Builder Name moved to y = 950
 * - Role moved to y = 1030
 * - Builder Class moved to y = 1075
 */

export const BUILDER_ID_LAYOUT = {
  width: 1024,
  height: 1536,
  photo: {
    centerX: 512,
    centerY: 600,
    radius: 255,
  },
  builderPill: {
    centerX: 512,
    y: 865,
    width: 160,
    height: 38,
    borderRadius: 8,
    fillColor: '#FF0080',
    textColor: '#FFFBE8',
  },
  name: {
    centerX: 512,
    y: 950,
    maxWidth: 840,
    maxFontSize: 64,
    color: '#036735', // Deep Palm Green
  },
  role: {
    centerX: 512,
    y: 1030,
    iconRadius: 22,
    maxWidth: 840,
    maxFontSize: 28,
    color: '#036735',
  },
  builderClass: {
    centerX: 512,
    y: 1075,
    maxWidth: 840,
    maxFontSize: 22,
    color: '#FF0080', // Hot Pink
  },
  // Dotted Horizontal Line at y = 1050 (Untouched)
  qr: {
    x: 180,
    y: 1155,
    size: 150,
    labelX: 355,
    labelY: 1210,
    color: '#036735',
  },
  // Dotted Vertical Line at x = 538 (Untouched)
  team: {
    labelX: 565,
    labelY: 1175,
    nameX: 565,
    nameY: 1220,
    maxWidth: 380,
    maxFontSize: 38,
    color: '#036735',
  },
} as const;
