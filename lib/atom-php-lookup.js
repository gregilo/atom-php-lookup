'use babel';

import { CompositeDisposable } from 'atom';
const EntriesListView = require('./atom-php-lookup-view');

export default {

  subscriptions: null,
  entriesListView: null,

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-php-lookup:toggle': () => {
        if (!this.entriesListView) {
          this.entriesListView = new EntriesListView();
        }

        this.entriesListView.toggle();
      },
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },
};
