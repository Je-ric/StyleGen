export function buildBorderCSS(s) {
  const { topW, topStyle, topColor, rightW, rightStyle, rightColor,
          bottomW, bottomStyle, bottomColor, leftW, leftStyle, leftColor, bgColor } = s

  const allSameWidth  = topW === rightW && rightW === bottomW && bottomW === leftW
  const allSameStyle  = topStyle === rightStyle && rightStyle === bottomStyle && bottomStyle === leftStyle
  const allSameColor  = topColor === rightColor && rightColor === bottomColor && bottomColor === leftColor

  let css = `border-top: ${topW}px ${topStyle} ${topColor};\nborder-right: ${rightW}px ${rightStyle} ${rightColor};\nborder-bottom: ${bottomW}px ${bottomStyle} ${bottomColor};\nborder-left: ${leftW}px ${leftStyle} ${leftColor};\nbackground-color: ${bgColor};`

  const shortcuts = []
  if (allSameWidth)  shortcuts.push(`border-width: ${topW}px;`)
  if (allSameStyle)  shortcuts.push(`border-style: ${topStyle};`)
  if (allSameColor)  shortcuts.push(`border-color: ${topColor};`)
  if (shortcuts.length) css += '\n\n/* Shorthand */\n' + shortcuts.join('\n')

  return css
}

export const BORDER_STYLES = ['solid','dashed','dotted','double','groove','ridge','inset','outset','none']
