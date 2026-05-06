export function buildShadowCSS(s) {
  const { h, v, blur, spread, color, inset, borderSides, borderSize, borderStyle, borderColor, borderRadius, bgColor } = s
  const shadowVal = `${inset ? 'inset ' : ''}${h}px ${v}px ${blur}px ${spread}px ${color}`
  let borderCSS = 'border: none;'
  if (borderSides.length) {
    borderCSS = borderSides.map(side =>
      `border-${side}-width: ${borderSize}px;\nborder-${side}-style: ${borderStyle};\nborder-${side}-color: ${borderColor};`
    ).join('\n')
  }
  return `${borderCSS}\nbackground-color: ${bgColor};\nborder-radius: ${borderRadius}px;\nbox-shadow: ${shadowVal};`
}

export function buildShadowTailwind(s) {
  const { h, v, blur, spread, color, inset, borderRadius, bgColor } = s
  const lines = []
  lines.push(`bg-[${bgColor}]`)
  if (borderRadius > 0) lines.push(`rounded-[${borderRadius}px]`)
  // Tailwind arbitrary shadow
  const shadowVal = `${inset ? 'inset_' : ''}${h}px_${v}px_${blur}px_${spread}px_${color.replace('#','')}`
  lines.push(`shadow-[${inset ? 'inset_' : ''}${h}px_${v}px_${blur}px_${spread}px_${color}]`)
  return `<div class="${lines.join(' ')}">\n  <!-- your content -->\n</div>`
}

export const SHADOW_PRESETS = {
  subtle:   { h:0, v:4,  blur:6,  spread:0,  color:'#00000033', inset:false, borderRadius:8  },
  medium:   { h:0, v:10, blur:15, spread:-3, color:'#00000066', inset:false, borderRadius:12 },
  harsh:    { h:0, v:20, blur:25, spread:5,  color:'#000000',   inset:false, borderRadius:4  },
  inset:    { h:0, v:5,  blur:15, spread:0,  color:'#00000066', inset:true,  borderRadius:8  },
  neon:     { h:0, v:0,  blur:20, spread:10, color:'#8b5cf6',   inset:false, borderRadius:12 },
}

export const BORDER_STYLES = ['solid','dashed','dotted','double','groove','ridge','inset','outset','none']
