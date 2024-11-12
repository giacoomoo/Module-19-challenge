// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');

      // If no data is returned from IndexedDB (data is empty or falsy), use localStorage or header
      if (!data || !data.length) { // Log the localData for debugging
        // Fallback to localData or header if localData is not available
        const valueToSet = localData || header || ''; // Ensure there's always a fallback value
        this.editor.setValue(valueToSet);
      } else {
        // If data is found, inject it into the editor
        this.editor.setValue(data[data.length - 1]);
      }
    }).catch((error) => {
      // If there's an error while accessing IndexedDB, log the error and fall back to localStorage/header
      console.error("Error loading data from IndexedDB", error);

      // Fallback if IndexedDB fails
      const valueToSet = localData || header || ''; // Ensure there's always a fallback value
      this.editor.setValue(valueToSet);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}
