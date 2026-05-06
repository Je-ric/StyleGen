export function buildGridCSS(s) {
  return `.container {\n  display: grid;\n  grid-template-columns: ${s.columns};\n  grid-template-rows: ${s.rows};\n  gap: ${s.gap}px;\n  justify-items: ${s.justifyItems};\n  align-items: ${s.alignItems};\n}`
}

export function buildGridTailwind(s) {
  const colCount = s.columns.match(/repeat\((\d+)/)?.[1]
  const colClass = colCount ? `grid-cols-${colCount}` : `grid-cols-[${s.columns}]`
  const rowCount = s.rows.match(/repeat\((\d+)/)?.[1]
  const rowClass = rowCount ? `grid-rows-${rowCount}` : `grid-rows-[${s.rows}]`
  return `<div class="grid ${colClass} ${rowClass} gap-[${s.gap}px]">\n  <!-- children -->\n</div>`
}

export function parseRepeat(val) {
  const m = val.match(/^repeat\((\d+),\s*(.+)\)$/)
  return m ? { count: parseInt(m[1]), size: m[2].trim() } : null
}
