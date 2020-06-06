export function buildKeyObject(code, value, shift = true) {
  return {
    code,
    value,
    shift,
  };
}

export function buildFunctionalKeyObject(keyCode, keyTitle, additionalClass = 'virtual-keyboard__key-func-wide') {
  return {
    code: keyCode,
    title: keyTitle,
    class: additionalClass,
    shift: false,
  };
}

export const KEYBOARD_CLICK_EVENT = 'vir-key-click';
