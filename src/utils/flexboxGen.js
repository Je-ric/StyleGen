export function buildFlexCSS(s) {
  return `.container {\n  display: flex;\n  flex-direction: ${s.direction};\n  flex-wrap: ${s.wrap};\n  justify-content: ${s.justify};\n  align-items: ${s.align};\n  align-content: ${s.alignContent};\n  gap: ${s.gap}px;\n}`
}

export function buildFlexTailwind(s) {
  const dirMap = { row:'flex-row', 'row-reverse':'flex-row-reverse', column:'flex-col', 'column-reverse':'flex-col-reverse' }
  const wrapMap = { nowrap:'flex-nowrap', wrap:'flex-wrap', 'wrap-reverse':'flex-wrap-reverse' }
  const justifyMap = { 'flex-start':'justify-start', 'flex-end':'justify-end', center:'justify-center', 'space-between':'justify-between', 'space-around':'justify-around', 'space-evenly':'justify-evenly' }
  const alignMap = { 'flex-start':'items-start', 'flex-end':'items-end', center:'items-center', stretch:'items-stretch', baseline:'items-baseline' }
  const classes = ['flex', dirMap[s.direction], wrapMap[s.wrap], justifyMap[s.justify], alignMap[s.align], `gap-[${s.gap}px]`].filter(Boolean)
  return `<div class="${classes.join(' ')}">\n  <!-- children -->\n</div>`
}

export const FLEX_DIRECTIONS   = ['row','row-reverse','column','column-reverse']
export const FLEX_WRAPS        = ['nowrap','wrap','wrap-reverse']
export const FLEX_JUSTIFIES    = ['flex-start','flex-end','center','space-between','space-around','space-evenly']
export const FLEX_ALIGNS       = ['flex-start','flex-end','center','stretch','baseline']
export const FLEX_ALIGN_CONTENTS = ['normal','flex-start','flex-end','center','space-between','space-around','stretch']
