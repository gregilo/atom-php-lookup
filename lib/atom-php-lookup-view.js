'use babel';

/* eslint "class-methods-use-this": ["error", {"exceptMethods": ["viewForItem"]}] */

import { SelectListView } from 'atom-space-pen-views';
import { entries as manEntries } from '../stores/man';

const opn = require('opn');

export default class AtomPhpLookupView extends SelectListView {

  initialize() {
    super.initialize();
    this.addClass('atom-php-lookup');
    this.setMaxItems(5);
    const helpText = 'Hitting enter will open the docs on php.net';
    const helpTextElement = document.createElement('div');
    helpTextElement.className = 'text-smaller';
    helpTextElement.innerHTML = helpText;
    this.error.after(helpTextElement);
  }

  static get possibleFilterKeys() {
    return ['name', 'synopsis', 'usage'];
  }

  static get defaultFilterKey() {
    return 'name';
  }

  getFilterKey() {
    const input = this.filterEditorView.getText();
    const inputArr = input.split(':');
    const isFilterKey = AtomPhpLookupView.possibleFilterKeys.includes(inputArr[0]);
    let filter = AtomPhpLookupView.defaultFilterKey;

    if (inputArr.length > 1 && isFilterKey) {
      filter = inputArr[0];
    }

    return filter;
  }

  getFilterQuery() {
    const input = this.filterEditorView.getText();
    const inputArr = input.split(':');
    let filter = input;

    if (inputArr.length > 1) {
      filter = inputArr[1];
    }

    return filter;
  }

  toggle() {
    if (this.panel && this.panel.isVisible()) {
      this.cancel();
    } else {
      this.show(manEntries);
    }
  }

  show(entries) {
    if (this.panel == null) {
      this.panel = atom.workspace.addModalPanel({ item: this });
    }

    this.storeFocusedElement();
    this.setItems(entries);
    if (!this.panel.isVisible()) {
      this.panel.show();
    }
    this.focusFilterEditor();
  }

  confirmed(entry) {
    if (entry) {
      opn(entry.url);
      this.hide();
    }
  }

  hide() {
    if (this.panel) {
      this.panel.hide();
    }
  }

  cancelled() {
    this.hide();
  }

  viewForItem(entry) {
    const { name, synopsis, usage } = entry;

    let itemMarkup = '<li class="two-lines">'
      + `<div class="primary-line"><span>${name}`;

    if (synopsis != null) {
      itemMarkup += ` - ${synopsis}`;
    }

    itemMarkup += '</span></div>'
      + `<div class="secondary-line"><span>${usage}</span></div>`
      + '</li>';

    return itemMarkup;
  }

}
