/**
 * Lightweight, safe client-side SVG optimizer.
 * Strips XML comments, editor metadata, redundant whitespace, and shrinks hex colors
 * without altering vector geometry or visual appearance.
 */
export function optimizeSvgText(rawSvg: string, decimalPrecision = 2): string {
  let svg = rawSvg.trim();

  // Remove XML prolog & DOCTYPE
  svg = svg.replace(/<\?xml[\s\S]*?\?>/gi, '');
  svg = svg.replace(/<!DOCTYPE[\s\S]*?>/gi, '');

  // Strip comments
  svg = svg.replace(/<!--[\s\S]*?-->/g, '');

  // Strip editor metadata blocks
  svg = svg.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
  svg = svg.replace(/<sodipodi:namedview[\s\S]*?(?:\/>|<\/sodipodi:namedview>)/gi, '');

  // Strip editor-specific attributes (inkscape, sodipodi, sketch, adobe illustrator)
  svg = svg.replace(/\s+(?:xmlns:)?(?:inkscape|sodipodi|sketch|illustrator|i):[a-zA-Z0-9_-]+="[^"]*"/g, '');
  svg = svg.replace(/\s+data-name="[^"]*"/g, '');

  // Remove empty groups <g></g> or <g .../>
  svg = svg.replace(/<g[^>]*>\s*<\/g>/gi, '');
  svg = svg.replace(/<g[^>]*\/>/gi, '');

  // Shorten 6-digit hex colors (#aabbcc -> #abc) inside attributes/styles
  svg = svg.replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3\b/g, '#$1$2$3');

  // Trim excessive float precision inside path d="" and points="" safely
  if (decimalPrecision >= 0 && decimalPrecision <= 4) {
    svg = svg.replace(/\b(d|points)="([^"]+)"/g, (_match, attr: string, val: string) => {
      const cleaned = val
        .replace(/-?\d*\.\d{3,}/g, (numStr) => {
          const parsed = Number(numStr);
          if (!Number.isFinite(parsed)) return numStr;
          return String(Number(parsed.toFixed(decimalPrecision)));
        })
        .replace(/\s+/g, ' ')
        .trim();
      return `${attr}="${cleaned}"`;
    });
  }

  // Collapse whitespace between tags while keeping attribute separation clean
  svg = svg.replace(/>\s+</g, '><');
  svg = svg.replace(/\s{2,}/g, ' ');

  return svg.trim();
}
