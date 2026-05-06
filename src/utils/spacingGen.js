export function buildSpacingCSS(s) {
  const { mt, mr, mb, ml, pt, pr, pb, pl } = s
  const mShort = mt === mr && mr === mb && mb === ml
  const pShort = pt === pr && pb === pl && pt === pt

  let css = ''
  if (mShort) {
    css += `margin: ${mt}px;\n`
  } else {
    css += `margin: ${mt}px ${mr}px ${mb}px ${ml}px;\n`
    css += `/* margin-top: ${mt}px; margin-right: ${mr}px; margin-bottom: ${mb}px; margin-left: ${ml}px; */\n`
  }
  if (pShort && pt === pr && pr === pb && pb === pl) {
    css += `padding: ${pt}px;`
  } else {
    css += `padding: ${pt}px ${pr}px ${pb}px ${pl}px;\n`
    css += `/* padding-top: ${pt}px; padding-right: ${pr}px; padding-bottom: ${pb}px; padding-left: ${pl}px; */`
  }
  return css
}

export function buildSpacingTailwind(s) {
  const { mt, mr, mb, ml, pt, pr, pb, pl } = s
  const mAll = mt === mr && mr === mb && mb === ml
  const pAll = pt === pr && pr === pb && pb === pl
  const classes = []
  if (mAll) { classes.push(`m-[${mt}px]`) }
  else { classes.push(`mt-[${mt}px]`, `mr-[${mr}px]`, `mb-[${mb}px]`, `ml-[${ml}px]`) }
  if (pAll) { classes.push(`p-[${pt}px]`) }
  else { classes.push(`pt-[${pt}px]`, `pr-[${pr}px]`, `pb-[${pb}px]`, `pl-[${pl}px]`) }
  return `<div class="${classes.join(' ')}">\n  <!-- content -->\n</div>`
}
