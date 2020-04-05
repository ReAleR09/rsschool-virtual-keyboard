/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import defaultLanguagesConfig from './default-languages-config';
import { functionKeysCodes, functionalKeysConfig } from './functional-keys-config';
import Key from './Key';
import { KEYBOARD_CLICK_EVENT } from './utils';
import OutputWriter from './OutputWriter';

export default class Keyboard {
  constructor(container, output, langugageConfig = defaultLanguagesConfig) {
    this.writer = new OutputWriter(output);
    this.layouts = {};
    this.layoutCodes = [];
    this.selectedLayoutCode = null;
    this.rootDomElement = null;
    this.observedKeyCodes = {}; // by layout
    this.initData(langugageConfig);

    this.pressedFunctionalButtons = new Set();

    container.appendChild(this.rootDomElement);

    this.initClicksListener();
  }

  isShiftEnabled() {
    return this.pressedFunctionalButtons.has('ShiftLeft') || this.pressedFunctionalButtons.has('ShiftRight');
  }

  toggleShift(enable) {
    // make sure we have right to keep shift pressed
    if (enable === undefined) {
      // eslint-disable-next-line no-param-reassign
      enable = this.isShiftEnabled();
      const keys = Object.keys(this.observedKeyCodes[this.selectedLayoutCode]);
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      keys.forEach((keyCode) => {
        const keyObj = this.observedKeyCodes[this.selectedLayoutCode][keyCode];
        keyObj.setShifted(enable, 'virtual-keyboard__key-shifted-true');
      });
      return;
    }
    if (enable && !this.isShiftEnabled()) {
      this.shiftEnabled = true;
      const keys = Object.keys(this.observedKeyCodes[this.selectedLayoutCode]);
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      keys.forEach((keyCode) => {
        const keyObj = this.observedKeyCodes[this.selectedLayoutCode][keyCode];
        keyObj.setShifted(true, 'virtual-keyboard__key-shifted-true');
      });
      return;
    }
    if (!enable && this.isShiftEnabled()) {
      this.shiftEnabled = false;
      const keys = Object.keys(this.observedKeyCodes[this.selectedLayoutCode]);
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      keys.forEach((keyCode) => {
        const keyObj = this.observedKeyCodes[this.selectedLayoutCode][keyCode];
        keyObj.setShifted(false, 'virtual-keyboard__key-shifted-true');
      });
      return;
    }
  }

  initClicksListener() {
    this.rootDomElement.addEventListener(KEYBOARD_CLICK_EVENT, (e) => {
      const clickedObj = e.detail.keyObj;
      const { code } = clickedObj;
      if (functionKeysCodes.includes(code)) {
        console.log('Functional key clicked');
        switch (code) {
          case 'Backspace':
            this.writer.backspace();
            break;
          case 'Delete':
            this.writer.backspace(true);
            break;
          case 'Space':
            this.writer.write(' ');
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
          case 'ArrowRight':
          case 'ArrowDown':
            this.writer.navigate(code.slice(5).toLowerCase());
            break;
          case 'ShiftRight':
          case 'ShiftLeft':
            if (this.pressedFunctionalButtons.has(code)) {
              this.pressedFunctionalButtons.delete(code);
              clickedObj.setPressed(false);
            } else {
              this.pressedFunctionalButtons.add(code);
              clickedObj.setPressed(true);
            }
            this.toggleShift();
            break;
          default:
            break;
        }
      } else {
        const char = clickedObj.getValue();
        console.log('Non-functional key clicked');
        this.writer.write(char);
      }
    });
  }

  initData(langugageConfig) {
    this.rootDomElement = document.createElement('div');
    this.rootDomElement.classList.add('virtual-keyboard');
    this.generateLayouts(langugageConfig);
    this.nextLayout(true);
    this.layoutCodes.forEach((code) => {
      const layoutDom = this.layouts[code];
      layoutDom.classList.add('virtual-keyboard__layout');
      if (code !== this.selectedLayoutCode) {
        layoutDom.classList.add('virtual-keyboard__layout-hidden-true');
      }
      this.rootDomElement.appendChild(layoutDom);
    });
  }

  /**
   * if init - true, tries to get saved layout code from local storage,
   * defaults to first avaialble layout
   * (also, if layout for selected code is not loaded, defaults as well)
   * if not, picks next available code.
   * Saves picked layout in both cases
   * @param {boolean} init
   */
  nextLayout(init = false) {
    if (init === true) {
      try {
        let layoutCode = localStorage.getItem('layout');
        if (this.layoutCodes.includes(layoutCode)) {
          this.selectedLayoutCode = layoutCode;
          return;
        }
        // defaulting if localStorage didn't help
        [layoutCode] = this.layoutCodes;
        this.selectedLayoutCode = layoutCode;
      } catch (e) {
        // localStorage is not supported, defaulting
        const [layoutCode] = this.layoutCodes;
        this.selectedLayoutCode = layoutCode;
      }
      localStorage.setItem('layout', this.selectedLayoutCode);
      return;
    }

    const index = this.layoutCodes.indexOf(this.selectedLayoutCode);
    if (index + 1 === this.layoutCodes.length) {
      // end of list, back to first
      const [layoutCode] = this.layoutCodes;
      this.selectedLayoutCode = layoutCode;
    } else {
      // get next available code
      const layoutCode = this.layoutCodes[index];
      this.selectedLayoutCode = layoutCode;
    }
    localStorage.setItem('layout', this.selectedLayoutCode);
  }

  generateLayouts(langugageConfig) {
    langugageConfig.forEach((lang) => {
      const [langDomEl, langObservedKeyCodes] = this.createLangLayout(lang);
      this.layouts[lang.lang] = langDomEl;
      this.observedKeyCodes[lang.lang] = langObservedKeyCodes;
      this.layoutCodes.push(lang.lang);
    });
  }

  createLangLayout(langugageConfig) {
    const langDomElement = document.createElement('div');
    const langObservedKeyCodes = {};
    let rowNum = 0;

    functionalKeysConfig.forEach((funcKeysRowConfig) => {
      const rowDomElement = document.createElement('div');
      rowDomElement.classList.add('virtual-keyboard__row');

      // iterating left-side functional keys for this row
      if (Object.prototype.hasOwnProperty.call(funcKeysRowConfig, 'left') && funcKeysRowConfig.left.length > 0) {
        funcKeysRowConfig.left.forEach((key) => {
          const keyEl = document.createElement('div');
          keyEl.classList.add('virtual-keyboard__key');
          keyEl.innerHTML = `<span>${key.title}</span>`;
          keyEl.classList.add(key.class);
          rowDomElement.appendChild(keyEl);

          langObservedKeyCodes[key.code] = new Key(keyEl, key.code);
        });
      }

      // iterating keys
      if (typeof langugageConfig.keys[rowNum] !== 'undefined') {
        langugageConfig.keys[rowNum].forEach((key) => {
          const char = key.value;
          let shiftedChar = key.shift;

          const keyEl = document.createElement('div');
          keyEl.classList.add('virtual-keyboard__key');
          // shifted and unshifted keys differs only by upper/lower case
          if (key.shift === true) {
            shiftedChar = char.toUpperCase();
            keyEl.classList.add('virtual-keyboard__key-type-char');
          }
          keyEl.innerHTML = `<span>${shiftedChar}</span><span>${char}</span>`;
          rowDomElement.appendChild(keyEl);

          langObservedKeyCodes[key.code] = new Key(keyEl, key.code, key.value, key.shift);
        });
      }

      // iterating right-side functional keys for this row
      if (Object.prototype.hasOwnProperty.call(funcKeysRowConfig, 'right') && funcKeysRowConfig.right.length > 0) {
        funcKeysRowConfig.right.forEach((key) => {
          const keyEl = document.createElement('div');
          keyEl.classList.add('virtual-keyboard__key');
          keyEl.innerHTML = `<span>${key.title}</span>`;
          keyEl.classList.add(key.class);
          rowDomElement.appendChild(keyEl);

          langObservedKeyCodes[key.code] = new Key(keyEl, key.code);
        });
      }

      langDomElement.appendChild(rowDomElement);
      rowNum += 1;
    });

    return [langDomElement, langObservedKeyCodes];
  }
}
