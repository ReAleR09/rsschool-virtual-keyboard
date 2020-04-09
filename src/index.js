import Keyboard from './js/class/Keyboard/Keyboard';

function onload() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  wrapper.innerHTML = '<div class="output"><textarea id="output" class="output__textarea">Смена раскладки - Ctrl+Alt</textarea></div><div id="keyboard"></div>';

  document.body.prepend(wrapper);

  const outputEl = document.getElementById('output');
  const keyboardContainer = document.getElementById('keyboard');

  const keyboard = new Keyboard();
  keyboard.attach(keyboardContainer, outputEl);
}

window.onload = onload;
