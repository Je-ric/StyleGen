export function buildTransformCSS(s) {
  const val = `scale(${s.scale}) rotate(${s.rotate}deg) translate(${s.translateX}px, ${s.translateY}px) skew(${s.skewX}deg, ${s.skewY}deg)`
  return `transform: ${val};`
}

export const TRANSFORM_DEFAULTS = {
  scale: 1, rotate: 0, translateX: 0, translateY: 0, skewX: 0, skewY: 0,
}
