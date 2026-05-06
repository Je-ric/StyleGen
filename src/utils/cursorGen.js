export function buildCursorCSS(cursor) {
  return `.element {\n  cursor: ${cursor};\n}`
}

export function buildCursorTailwind(cursor) {
  const map = {
    auto:'cursor-auto', default:'cursor-default', pointer:'cursor-pointer',
    wait:'cursor-wait', text:'cursor-text', move:'cursor-move',
    'not-allowed':'cursor-not-allowed', crosshair:'cursor-crosshair',
    grab:'cursor-grab', grabbing:'cursor-grabbing', 'zoom-in':'cursor-zoom-in',
    'zoom-out':'cursor-zoom-out', help:'cursor-help', progress:'cursor-progress',
    'col-resize':'cursor-col-resize', 'row-resize':'cursor-row-resize',
    'n-resize':'cursor-n-resize', 's-resize':'cursor-s-resize',
    'e-resize':'cursor-e-resize', 'w-resize':'cursor-w-resize',
    'ne-resize':'cursor-ne-resize', 'nw-resize':'cursor-nw-resize',
    'se-resize':'cursor-se-resize', 'sw-resize':'cursor-sw-resize',
    'ew-resize':'cursor-ew-resize', 'ns-resize':'cursor-ns-resize',
    'nesw-resize':'cursor-nesw-resize', 'nwse-resize':'cursor-nwse-resize',
    none:'cursor-none', 'cell':'cursor-cell', 'copy':'cursor-copy',
    'alias':'cursor-alias', 'no-drop':'cursor-no-drop', 'all-scroll':'cursor-all-scroll',
  }
  const tw = map[cursor] || `cursor-[${cursor}]`
  return `<div class="${tw}">\n  <!-- hover this element -->\n</div>`
}

export const CURSOR_GROUPS = [
  {
    label: 'General',
    cursors: ['auto','default','none','context-menu','help','pointer','progress','wait'],
  },
  {
    label: 'Selection',
    cursors: ['cell','crosshair','text','vertical-text'],
  },
  {
    label: 'Drag & Drop',
    cursors: ['alias','copy','move','no-drop','not-allowed','grab','grabbing'],
  },
  {
    label: 'Resize',
    cursors: ['col-resize','row-resize','n-resize','e-resize','s-resize','w-resize','ne-resize','nw-resize','se-resize','sw-resize','ew-resize','ns-resize','nesw-resize','nwse-resize','all-scroll'],
  },
  {
    label: 'Zoom',
    cursors: ['zoom-in','zoom-out'],
  },
]
