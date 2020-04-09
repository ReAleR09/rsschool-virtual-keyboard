import { KEYBOARD_CLICK_EVENT } from './utils';

export default class Key {
  constructor(domElement, code, character = false, shiftCharacter = false) {
    this.isShifted = false;
    this.isPressed = false;

    this.el = domElement;
    this.char = character;
    this.code = code;
    // if true, means that shifted character is just an uppercase
    // stores actualy char otherwise
    this.shiftCharacter = shiftCharacter;
    this.el.addEventListener('click', this.clickListener.bind(this));
  }

  clickListener(e) {
    e.preventDefault();

    this.el.dispatchEvent(new CustomEvent(KEYBOARD_CLICK_EVENT, {
      detail: {
        keyObj: this,
      },
      bubbles: true,
      cancelable: true,
    }));
  }

  getValue() {
    if (this.isShifted === true) {
      if (this.shiftCharacter === true) {
        return this.char.toUpperCase();
      }
      return this.shiftCharacter;
    }

    return this.char;
  }

  setShifted(isShifted, cssClass) {
    if (isShifted && !this.isShifted) {
      this.isShifted = true;
      if (this.shiftCharacter === true) {
        this.el.classList.add(cssClass);
      }
    } else if (!isShifted && this.isShifted) {
      this.isShifted = false;
      if (this.shiftCharacter === true) {
        this.el.classList.remove(cssClass);
      }
    }
  }

  setPressed(isPressed, cssClass = 'virtual-keyboard__key-pressed-true') {
    if (isPressed && !this.isPressed) {
      this.isPressed = true;
      this.el.classList.add(cssClass);
    } else if (!isPressed && this.isPressed) {
      this.isPressed = false;
      this.el.classList.remove(cssClass);
    }
  }

  pressAnimatation(cssClass = 'virtual-keyboard__key-animation-click') {
    this.el.classList.add(cssClass);
    setTimeout(() => { this.el.classList.remove(cssClass); }, 0);
  }
}
