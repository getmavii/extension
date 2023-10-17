# Mavii Search Extension

Browser extension for Chrome and Firefox that changes the default search to Mavii.

## Building and Developing

Build the extension and load it manually into Chrome or Firefox from `dist`.

`npm run build`

For ongoing development you can use to watch for changes:

`npm run dev`

## Packaging

To package the extension for the stores use the following command:

`npm run package`

This will create a zip file for Chrome and Firefox in the `packages` directory. This script runs `package:chrome` and `package:firefox`. The Firefox package script sets the manifest version to v2.
