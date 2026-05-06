export function buildScrollbarCSS(s) {
  return `/* Webkit browsers (Chrome, Safari, Edge) */\n::-webkit-scrollbar {\n  width: ${s.width}px;\n  height: ${s.width}px;\n}\n::-webkit-scrollbar-track {\n  background: ${s.trackColor};\n  border-radius: ${s.radius}px;\n}\n::-webkit-scrollbar-thumb {\n  background: ${s.thumbColor};\n  border-radius: ${s.radius}px;\n  border: ${s.thumbBorder}px solid ${s.trackColor};\n}\n::-webkit-scrollbar-thumb:hover {\n  background: ${s.thumbHoverColor};\n}\n\n/* Firefox */\n* {\n  scrollbar-width: ${s.width <= 4 ? 'thin' : 'auto'};\n  scrollbar-color: ${s.thumbColor} ${s.trackColor};\n}`
}

export const SCROLLBAR_PRESETS = {
  minimal:  { width:4,  trackColor:'transparent', thumbColor:'#cbd5e1', thumbHoverColor:'#94a3b8', radius:99, thumbBorder:0 },
  rounded:  { width:8,  trackColor:'#f1f5f9',     thumbColor:'#94a3b8', thumbHoverColor:'#64748b', radius:99, thumbBorder:2 },
  flat:     { width:6,  trackColor:'#e2e8f0',     thumbColor:'#64748b', thumbHoverColor:'#475569', radius:0,  thumbBorder:0 },
  green:    { width:6,  trackColor:'#f0fdf4',     thumbColor:'#86efac', thumbHoverColor:'#4ade80', radius:99, thumbBorder:0 },
  dark:     { width:8,  trackColor:'#1e293b',     thumbColor:'#475569', thumbHoverColor:'#64748b', radius:4,  thumbBorder:0 },
}
