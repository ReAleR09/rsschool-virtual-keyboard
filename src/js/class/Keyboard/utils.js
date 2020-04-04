export function buildKeyObject(keyCode, keyValue, keyShiftValue = true) {
  return {
    code: keyCode,
    value: keyValue,
    shift: keyShiftValue,
  };
}

export function buildFunctionalKeyObject(keyCode, keyTitle, additionalClass = false) {
  return {
    code: keyCode,
    title: keyTitle,
    class: additionalClass,
  };
}
