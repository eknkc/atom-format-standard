/*global atom*/

var standard = require('standard-format')

module.exports = {
  formatter: standard,

  activate: function () {
    this.commands = atom.commands.add('atom-workspace', 'format-standard:format', function () {
      this.formatSelection()
    }.bind(this))

    this.editorObserver = atom.workspace.observeTextEditors(this.handleEvents.bind(this))
  },

  deactivate: function () {
    this.commands.dispose()
    this.editorObserver.dispose()
  },

  transform: function(text) {
    try {
      return this.formatter.transform(text)
    } catch(e) {
      return text
    }
  },

  format: function () {
    var editor = atom.workspace.getActivePaneItem()
      , text = editor.getText()
      , pos = editor.getCursorScreenPosition()

    editor.setText(this.transform(text))
    editor.setCursorScreenPosition(pos)
  },

  formatSelection: function() {
    var editor = atom.workspace.getActivePaneItem()
      , selected = editor.getSelectedText()
      , pos = editor.getCursorScreenPosition()

    if (!selected)
      return this.format()

    editor.setTextInBufferRange(editor.getSelectedBufferRange(), this.transform(selected))
    editor.setCursorScreenPosition(pos)
  },

  handleEvents: function (editor) {
    editor.getBuffer().onWillSave(function () {
      var path = editor.getPath()

      if (!path)
        return

      var formatOnSave = atom.config.get('format-standard.formatOnSave', {
        scope: editor.getRootScopeDescriptor()
      });

      if (!formatOnSave)
        return

      if (/\.(js|jsx)$/.test(path))
        this.format();
    }.bind(this))
  },

  config: {
    formatOnSave: {
      type: 'boolean',
      default: false
    }
  }
}
