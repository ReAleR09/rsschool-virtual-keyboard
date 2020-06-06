export default class OutputWriter {
  constructor(outputEl) {
    this.outputEl = outputEl;
  }

  write(data) {
    const start = this.outputEl.selectionStart;
    const end = this.outputEl.selectionEnd;
    const str = this.outputEl.value;
    const newStr = str.slice(0, start) + data + str.slice(end, str.length);
    this.outputEl.value = newStr;
    this.outputEl.selectionStart = start + 1;
    this.outputEl.selectionEnd = start + 1;
    this.outputEl.focus();
  }

  backspace(toTheRight = false) {
    const start = this.outputEl.selectionStart;
    const end = this.outputEl.selectionEnd;
    const str = this.outputEl.value;
    let newStr = str;
    let newPos = start;
    if (start === end) {
      if (!toTheRight && start > 0) {
        newStr = str.slice(0, start - 1) + str.slice(start, str.length);
        newPos -= 1;
      }
      if (toTheRight && start < str.length) {
        newStr = str.slice(0, start) + str.slice(start + 1, str.length);
      }
    }
    if (start !== end) {
      newStr = str.slice(0, start) + str.slice(end, str.length);
    }
    this.outputEl.value = newStr;
    this.outputEl.selectionStart = newPos;
    this.outputEl.selectionEnd = newPos;
    this.outputEl.focus();
  }

  navigate(direction) {
    const start = this.outputEl.selectionStart;
    const end = this.outputEl.selectionEnd;
    switch (direction) {
      case 'left':
        this.outputEl.selectionStart = start - 1;
        this.outputEl.selectionEnd = start - 1;
        break;
      case 'right':
        this.outputEl.selectionStart = end + 1;
        this.outputEl.selectionEnd = end + 1;
        break;
      case 'up':
        this.outputEl.selectionStart = 0;
        this.outputEl.selectionEnd = 0;
        break;
      case 'down':
        this.outputEl.selectionStart = this.outputEl.value.length;
        this.outputEl.selectionEnd = this.outputEl.value.length;
        break;
      default:
        break;
    }
    this.outputEl.focus();
  }
}
