export function buildBorderCSS(s) {
  const { topW, topStyle, topColor, rightW, rightStyle, rightColor,
          bottomW, bottomStyle, bottomColor, leftW, leftStyle, leftColor, bgColor } = s

  const allSame = topW === rightW && rightW === bottomW && bottomW === leftW
    && topStyle === rightStyle && rightStyle === bottomStyle && bottomStyle === leftStyle
    && topColor === rightColor && rightColor === bottomColor && bottomColor === leftColor

  let css = `border-top: ${topW}px ${topStyle} ${topColor};\nborder-right: ${rightW}px ${rightStyle} ${rightColor};\nborder-bottom: ${bottomW}px ${bottomStyle} ${bottomColor};\nborder-left: ${leftW}px ${leftStyle} ${leftColor};\nbackground-color: ${bgColor};`

  if (allSame) css += `\n\n/* Shorthand */\nborder: ${topW}px ${topStyle} ${topColor};`

  return css
}

export function buildBorderTailwind(s) {
  const { topW, topStyle, topColor, rightW, rightStyle, rightColor,
          bottomW, bottomStyle, bottomColor, leftW, leftStyle, leftColor, bgColor } = s

  const allSame = topW === rightW && rightW === bottomW && bottomW === leftW
    && topStyle === rightStyle && topColor === rightColor

  const lines = []
  if (allSame) {
    if (topW > 0) lines.push(`border-[${topW}px]`, `border-[${topStyle}]`, `border-[${topColor}]`)
  } else {
    if (topW > 0)    lines.push(`border-t-[${topW}px]`, `border-t-[${topColor}]`)
    if (rightW > 0)  lines.push(`border-r-[${rightW}px]`, `border-r-[${rightColor}]`)
    if (bottomW > 0) lines.push(`border-b-[${bottomW}px]`, `border-b-[${bottomColor}]`)
    if (leftW > 0)   lines.push(`border-l-[${leftW}px]`, `border-l-[${leftColor}]`)
  }
  lines.push(`bg-[${bgColor}]`)
  return `<div class="${lines.join(' ')}">\n  <!-- your content -->\n</div>`
}

export const BORDER_STYLES = ['solid','dashed','dotted','double','groove','ridge','inset','outset','none']
