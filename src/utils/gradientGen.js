export function hexToRGBA(hex, opacity) {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export function isValidHex(hex) {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex)
}

export function randomHex() {
  return '#' + Array.from({ length: 6 }, () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('')
}

export function buildGradientCSS(s) {
  const c1 = hexToRGBA(s.color1, s.opacity)
  const c2 = hexToRGBA(s.color2, s.opacity)
  const grad = s.type === 'linear'
    ? `linear-gradient(${s.angle}deg, ${c1}, ${c2})`
    : `radial-gradient(circle, ${c1}, ${c2})`
  return { grad, css: `background: ${grad};` }
}

export const GRADIENT_PRESETS = [
  { color1: '#ff9a9e', color2: '#fad0c4' },
  { color1: '#a18cd1', color2: '#fbc2eb' },
  { color1: '#84fab0', color2: '#8fd3f4' },
  { color1: '#6a11cb', color2: '#2575fc' },
  { color1: '#ff758c', color2: '#ff7eb3' },
  { color1: '#4facfe', color2: '#00f2fe' },
]
