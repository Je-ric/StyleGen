export function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return { r, g, b }
}

export function buildGlassCSS(s) {
  const { r, g, b } = hexToRgb(s.bgColor)
  return `.glass {\n  background: rgba(${r}, ${g}, ${b}, ${s.bgOpacity});\n  backdrop-filter: blur(${s.blur}px) saturate(${s.saturate}%);\n  -webkit-backdrop-filter: blur(${s.blur}px) saturate(${s.saturate}%);\n  border: ${s.borderWidth}px solid rgba(${r}, ${g}, ${b}, ${s.borderOpacity});\n  border-radius: ${s.radius}px;\n  box-shadow: 0 ${s.shadowV}px ${s.shadowBlur}px rgba(0, 0, 0, ${s.shadowOpacity});\n}`
}

export function buildGlassTailwind(s) {
  const { r, g, b } = hexToRgb(s.bgColor)
  return `<div class="backdrop-blur-[${s.blur}px] bg-[rgba(${r},${g},${b},${s.bgOpacity})] border border-[rgba(${r},${g},${b},${s.borderOpacity})] rounded-[${s.radius}px] shadow-[0_${s.shadowV}px_${s.shadowBlur}px_rgba(0,0,0,${s.shadowOpacity})]">\n  <!-- content -->\n</div>`
}

export const GLASS_PRESETS = {
  frosted:  { bgColor:'#ffffff', bgOpacity:0.15, blur:12, saturate:180, borderWidth:1, borderOpacity:0.3, radius:16, shadowV:8, shadowBlur:32, shadowOpacity:0.15 },
  dark:     { bgColor:'#000000', bgOpacity:0.25, blur:16, saturate:150, borderWidth:1, borderOpacity:0.2, radius:16, shadowV:8, shadowBlur:32, shadowOpacity:0.3  },
  colored:  { bgColor:'#6366f1', bgOpacity:0.2,  blur:10, saturate:200, borderWidth:1, borderOpacity:0.4, radius:20, shadowV:4, shadowBlur:24, shadowOpacity:0.1  },
  minimal:  { bgColor:'#ffffff', bgOpacity:0.05, blur:4,  saturate:100, borderWidth:1, borderOpacity:0.1, radius:8,  shadowV:2, shadowBlur:8,  shadowOpacity:0.05 },
}
