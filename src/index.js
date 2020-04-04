import Keyboard from "./js/class/Keyboard/Keyboard";

function onload() {
  const outputEl = document.getElementById('output');
  const keyboardContainer = document.getElementById('keyboard');
  const keyboard = new Keyboard(keyboardContainer, outputEl);
}

window.onload = onload;
