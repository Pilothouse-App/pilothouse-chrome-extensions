# Pilothouse App XDebug Chrome Extension
Toggle XDebug on and off, via a small Chrome extension.

### Installation

1. Visit `chrome://extensions` in your browser (or open up the Chrome menu by clicking the icon to the far right of the Omnibox:  The menu's icon is three horizontal bars. and select Extensions under the Tools menu to get to the same place).

2. Ensure that the Developer mode checkbox in the top right-hand corner is checked.

3. Click `Load unpacked extension…` to pop up a file-selection dialog.

4. Navigate to the directory in which your extension files live, and select it.

You should now see the Pilothouse App XDebug extension in your browser.

### Using
Click the icon to activate the XDebug cookie. This will vary based on the tab your are currently viewing. A gray icon indicates XDebug is currently inactive and yellow means it's activated.

You will still need to configure your IDE to use XDebug. This extension takes care of handling the browser-side setup of [XDebug](https://github.com/Pilothouse-App/pilothouse/wiki/Using-Xdebug).
