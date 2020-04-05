export function buildKeyObject(keyCode, keyValue, keyShiftValue = true) {
  return {
    code: keyCode,
    value: keyValue,
    shift: keyShiftValue,
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
