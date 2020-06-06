import { buildFunctionalKeyObject as key } from './utils';

// Describing list of keycodes for functional keys
// they behavior differs from default "print char into output"
export const functionKeysCodes = [
  'Backspace',
  'Tab',
  'Delete',
  'CapsLock',
  'Enter',
  'ShiftLeft',
  'ShiftRight',
  'ArrowLeft',
  'ArrowUp',
  'ArrowRight',
  'ArrowDown',
  'ControlLeft',
  'ControlRight',
  'AltLeft',
  'AltRight',
  'Space',
  'MetaLeft',
  'MetaRight',
];

const funcSmallKeyCssClass = 'virtual-keyboard__key-func-arrow';

// Thankfully, all functional keys are placed on the edges of key rows,
export const functionalKeysConfig = [
  // row 1 (with numbers)
  {
    right: [
      key('Backspace', 'Backspace'),
    ],
  },
  // row 2
  {
    left: [
      key('Tab', 'Tab'),
    ],
    right: [
      key('Delete', 'Del'),
    ],
  },
  // row 3
  {
    left: [
      key('CapsLock', 'Caps Lock'),
    ],
    right: [
      key('Enter', 'ENTER'),
    ],
  },
  // row 4
  {
    left: [
      key('ShiftLeft', 'Shift'),
    ],
    right: [
      key('ArrowUp', 'Up', funcSmallKeyCssClass),
      key('ShiftRight', 'Shift', funcSmallKeyCssClass),
    ],
  },
  // row 5 (fully functional)
  {
    left: [
      key('ControlLeft', 'Ctrl'),
      key('MetaLeft', 'Win'),
      key('AltLeft', 'Alt'),
      key('Space', '', 'virtual-keyboard__key-func-space'),
    ],
    right: [
      key('AltRight', 'Alt'),
      key('ControlRight', 'Ctrl'),
      key('ArrowLeft', 'Left', funcSmallKeyCssClass),
      key('ArrowDown', 'Down', funcSmallKeyCssClass),
      key('ArrowRight', 'Right', funcSmallKeyCssClass),
    ],
  },
];
