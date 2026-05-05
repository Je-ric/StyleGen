export const FILTER_DEFAULTS = {
  brightness: 100, contrast: 100, saturate: 100,
  grayscale: 0, sepia: 0, hueRotate: 0, invert: 0,
  blur: 0, opacity: 100,
}

export const FILTER_PRESETS = {
  normal:   { ...FILTER_DEFAULTS },
  vintage:  { ...FILTER_DEFAULTS, brightness:110, contrast:85, saturate:75, sepia:40 },
  bw:       { ...FILTER_DEFAULTS, contrast:120, saturate:0, grayscale:100 },
  dramatic: { ...FILTER_DEFAULTS, brightness:110, contrast:150, saturate:120 },
}

export function buildFilterCSS(s) {
  const val = `blur(${s.blur}px) brightness(${s.brightness}%) contrast(${s.contrast}%) grayscale(${s.grayscale}%) hue-rotate(${s.hueRotate}deg) invert(${s.invert}%) opacity(${s.opacity}%) saturate(${s.saturate}%) sepia(${s.sepia}%)`
  return `filter: ${val};\n-webkit-filter: ${val};`
}
