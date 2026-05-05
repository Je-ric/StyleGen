export function buildTextDecorationCSS(s) {
  return `.decorated-text {\n  text-decoration: ${s.decoration};\n  text-decoration-style: ${s.style};\n  text-decoration-color: ${s.color};\n  text-decoration-thickness: ${s.thickness}px;\n}`
}

export const TEXT_DECORATION_OPTIONS = [
  'none','underline','overline','line-through',
  'underline overline','underline line-through',
  'overline line-through','underline overline line-through',
]

export const LINE_STYLE_OPTIONS = ['solid','dashed','dotted','double','wavy']

export const TEXT_DECORATION_PRESETS = [
  { decoration:'underline',              style:'solid',  color:'#6366f1', thickness:2 },
  { decoration:'overline',               style:'dotted', color:'#10b981', thickness:3 },
  { decoration:'line-through',           style:'wavy',   color:'#ef4444', thickness:2 },
  { decoration:'underline overline',     style:'double', color:'#f59e0b', thickness:1 },
  { decoration:'underline line-through', style:'dashed', color:'#8b5cf6', thickness:2 },
]
