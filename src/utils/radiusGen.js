export function buildRadiusCSS(s) {
  const { tl, tr, br, bl, borderWidth, borderColor, bgColor } = s
  return `border-width: ${borderWidth}px;\nborder-style: solid;\nborder-color: ${borderColor};\nborder-radius: ${tl}px ${tr}px ${br}px ${bl}px;\nbackground-color: ${bgColor};\n\n/* Individual corners */\nborder-top-left-radius: ${tl}px;\nborder-top-right-radius: ${tr}px;\nborder-bottom-right-radius: ${br}px;\nborder-bottom-left-radius: ${bl}px;`
}

export function buildRadiusTailwind(s) {
  const { tl, tr, br, bl, borderWidth, borderColor, bgColor } = s
  const allSame = tl === tr && tr === br && br === bl
  const lines = [`bg-[${bgColor}]`, `border-[${borderWidth}px]`, `border-solid`, `border-[${borderColor}]`]
  if (allSame) {
    lines.push(`rounded-[${tl}px]`)
  } else {
    lines.push(`rounded-tl-[${tl}px]`, `rounded-tr-[${tr}px]`, `rounded-br-[${br}px]`, `rounded-bl-[${bl}px]`)
  }
  return `<div class="${lines.join(' ')}">\n  <!-- your content -->\n</div>`
}

export const RADIUS_PRESETS = {
  circle:     { tl:50, tr:50, br:50, bl:50 },
  rounded:    { tl:10, tr:10, br:10, bl:10 },
  capsule:    { tl:50, tr:50, br:50, bl:50 },
  asymmetric: { tl:50, tr:10, br:30, bl:0  },
  reset:      { tl:0,  tr:0,  br:0,  bl:0  },
}
