# Format Standard

Atom package to format your Javascript using [Standard Style](https://github.com/feross/standard). Somewhat based on [standard-formatter](https://github.com/stephenkubovic/atom-standard-formatter)
however I could not get it working properly and wanted to have a simple module just for [Standard Style](https://github.com/feross/standard).

### Usage

#### Keybindings

Use `ctrl-alt-f` to format the current Javascript file. If a text selection is made, only the selected text will be formatted.

#### Format On Save

Automatically format your Javascript file on save by enabling the *Format On Save* package setting.  This is off by default.

#### Menu

*Packages > Format Standard > Format*

### Settings

#### formatOnSave (default: false)

Format Javascript files when saving.

### Formatting

This package uses [standard-format](https://github.com/maxogden/standard-format) to handle the formatting.
Therefore, only the rules enforced in those packages will be applied.
