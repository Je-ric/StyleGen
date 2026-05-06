export function buildTypographyCSS(s) {
  return `.text {\n  font-family: '${s.fontFamily}', ${s.fallback};\n  font-size: ${s.fontSize}px;\n  font-weight: ${s.fontWeight};\n  line-height: ${s.lineHeight};\n  letter-spacing: ${s.letterSpacing}em;\n  color: ${s.color};\n  text-align: ${s.align};\n  text-transform: ${s.transform};\n}`
}

export function buildTypographyTailwind(s) {
  const weightMap = { 100:'thin', 200:'extralight', 300:'light', 400:'normal', 500:'medium', 600:'semibold', 700:'bold', 800:'extrabold', 900:'black' }
  const alignMap = { left:'text-left', center:'text-center', right:'text-right', justify:'text-justify' }
  const transformMap = { none:'normal-case', uppercase:'uppercase', lowercase:'lowercase', capitalize:'capitalize' }
  const classes = [
    `font-[${s.fontFamily.replace(/ /g,'_')}]`,
    `text-[${s.fontSize}px]`,
    `font-${weightMap[s.fontWeight] || s.fontWeight}`,
    `leading-[${s.lineHeight}]`,
    `tracking-[${s.letterSpacing}em]`,
    `text-[${s.color}]`,
    alignMap[s.align],
    transformMap[s.transform],
  ]
  return `<p class="${classes.join(' ')}">\n  Your text here\n</p>`
}

export const FONT_WEIGHTS = [100,200,300,400,500,600,700,800,900]
export const TEXT_ALIGNS = ['left','center','right','justify']
export const TEXT_TRANSFORMS = ['none','uppercase','lowercase','capitalize']
export const GOOGLE_FONTS = [
  'Inter','Roboto','Open Sans','Lato','Montserrat','Poppins','Raleway','Nunito',
  'Playfair Display','Merriweather','Oswald','Source Code Pro','Fira Code',
  'DM Sans','Plus Jakarta Sans','Outfit','Space Grotesk','Sora',
]
export const FONT_FALLBACKS = { serif:'serif', 'sans-serif':'sans-serif', monospace:'monospace' }
