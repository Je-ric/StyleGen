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

export function buildFilterTailwind(s) {
  const classes = []
  if (s.blur > 0)           classes.push(`blur-[${s.blur}px]`)
  if (s.brightness !== 100) classes.push(`brightness-[${s.brightness / 100}]`)
  if (s.contrast !== 100)   classes.push(`contrast-[${s.contrast / 100}]`)
  if (s.grayscale > 0)      classes.push(`grayscale-[${s.grayscale}%]`)
  if (s.sepia > 0)          classes.push(`sepia-[${s.sepia}%]`)
  if (s.hueRotate > 0)      classes.push(`hue-rotate-[${s.hueRotate}deg]`)
  if (s.invert > 0)         classes.push(`invert-[${s.invert}%]`)
  if (s.saturate !== 100)   classes.push(`saturate-[${s.saturate / 100}]`)
  if (s.opacity !== 100)    classes.push(`opacity-[${s.opacity}%]`)
  if (!classes.length) return `<img class="filter-none" src="..." />`
  return `<img class="${classes.join(' ')}" src="..." />`
}
