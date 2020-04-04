/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import defaultLanguagesConfig from './default-languages-config';
import { functionKeysCodes, functionalKeysConfig } from './functional-keys-config';

export default class Keyboard {
  constructor(container, output, langugageConfig = defaultLanguagesConfig) {
    this.init(container, langugageConfig);
    console.log(output);
  }

  init(container, langugageConfig) {
    console.log(container);
    console.log(langugageConfig);
  }
}
