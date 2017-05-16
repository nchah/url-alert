/* options.js

- Handle optional customizations set by the user
*/

var storage = chrome.storage.local;
var form = document.querySelector("form");
form.addEventListener('submit', saveSettings);
var restoreDefaultsButton = document.querySelector('button#restoreDefaults');
restoreDefaultsButton.addEventListener('click', restoreDefaults);

loadEditmodeDefaultOptions();
loadAutosaveOptions();
loadHTMLChanges();


function loadEditmodeDefaultOptions() {
  storage.get('editmode', function(items) {
    if (items.editmode == 'yes') {
      document.getElementById('editmode').checked = true;
    } else if (items.editmode == 'no') {
      document.getElementById('editmode').checked = false;
    }
  })
}

function loadAutosaveOptions() {
  storage.get('autosave', function(items) {
    if (items.autosave == 'yes') {
      document.getElementById('autosave').checked = true;
    } else if (items.autosave == 'no') {
      document.getElementById('autosave').checked = false;
    }
  })
}

function restoreDefaults() {
  storage.remove('css');
  newCSSTheme = 'background-color: #404040; color: white; font-family: monospace; font-size: 12px;';
  chrome.tabs.insertCSS({code: newCSSTheme});
  storage.set({'css': newCSSTheme});
  alert("Default settings restored.");
}

function saveCuratedThemeSettings() {
  var newTheme = form.elements.themeSelect.value;
  switch (newTheme) {
      case 'Dark Default':
        newCSSTheme = 'background-color: #404040; color: white; font-family: monospace; font-size: 12px;';
        break;
      case 'Baby Blue':
        newCSSTheme = 'background-color: #99ccff; color: navy; font-family: monospace; font-size: 12px;';
        break;
      case "Cookies 'n Cream":
        newCSSTheme = 'background-color: white; color: #404040; font-family: monospace; font-size: 12px;';
        break;
      case 'Light Lavender':
        newCSSTheme = 'background-color: #ccccff; color: purple; font-family: monospace; font-size: 12px;';
        break;
      case 'Lush Lime':
        newCSSTheme = 'background-color: #b3ffb3; color: green; font-family: monospace; font-size: 12px;';
        break;
      case 'Orange Ochre':
        newCSSTheme = 'background-color: #ffcc99; color: #b37400; font-family: monospace; font-size: 12px;';
        break;
      case 'Rosy Rose':
        newCSSTheme = 'background-color: #ffcccc; color: maroon; font-family: monospace; font-size: 12px;';
        break;
    }
    chrome.tabs.insertCSS({code: newCSSTheme}, alert('Updated to theme: ' + newTheme));
    storage.set({'css': newCSSTheme});
}

function saveSettings() {
  // editmode "ON" by default
  var editmode = form.elements.editmode.value;
  var editmode = document.getElementById('editmode').checked;
  if (editmode) {
    storage.set({'editmode': 'yes'});
  } else if (!editmode) {
    storage.set({'editmode': 'no'});
  }

  // autosave
  var autosave = form.elements.autosave.value;
  var autosave = document.getElementById('autosave').checked;
  if (autosave) {
    storage.set({'autosave': 'yes'});
  } else if (!autosave) {
    storage.set({'autosave': 'no'});
  }

  // Menubar orientation
  var menubarAlignment = form.elements.menubarAlignment.value;
  if (menubarAlignment != '') {
    storage.set({'menubar': menubarAlignment});
  }

  // Apply a new curated theme of styles 
  var newTheme = form.elements.themeSelect.value;
  if (newTheme.length > 0) {
    saveCuratedThemeSettings();
  }

  // Setting variables for CSS elements; Choosing between dropdown or input where needed
  // * New background color
  var newBackgroundColor1 = form.elements.bgColorCustom.value;
  var newBackgroundColor2 = form.elements.bgColorSelect.value;
  if (newBackgroundColor1) {
    newBackgroundColor = newBackgroundColor1;
  } else {
    newBackgroundColor = newBackgroundColor2;
  }
  // * New text color
  var newTextColor1 = form.elements.textColorCustom.value;
  var newTextColor2 = form.elements.textColorSelect.value;
  if (newTextColor1) {
    newTextColor = newTextColor1;
  } else {
    newTextColor = newTextColor2;
  }
  // * New font family
  var newFontFamily1 = form.elements.fontFamilyCustom.value;
  var newFontFamily2 = form.elements.fontFamilySelect.value;
  if (newFontFamily1) {
    newFontFamily = newFontFamily1;
  } else {
    newFontFamily = newFontFamily2;
  }
  // ** Experimental: web fonts
  var webFont = form.elements.fontFamilyWeb.value;
  if (webFont) {
    storage.set({'webFont': webFont});
    newFontFamily = webFont;
    // newFontSize = '14px';
  }
  // * New font size
  var newFontSize = form.elements.fontSize.value + "px";

  // Storing CSS option changes
  if (newBackgroundColor.length > 0
      || newTextColor.length > 0
      || newFontFamily.length > 0
      || newFontSize.length - 2 > 0
      && newTheme.length == 0) {

    // Getting existing CSS settings
    storage.get('css', function(items) {

      if (items.css) {
        var existingCSS = items.css.split(';', 4); // limit to the 4 CSS options for now
        // Ex: background-color: #ffcccc, color: maroon, font-family: monospace, font-size: 14px
        var existingCSSBackgroundColor = existingCSS[0].split(':')[1].trim();
        var existingCSSTextColor = existingCSS[1].split(':')[1].trim();
        var existingCSSFontFamily = existingCSS[2].split(':')[1].trim();
        var existingCSSFontSize = existingCSS[3].split(':')[1].trim();

        // If no new value was set, preserve the existing CSS value
        if (!newBackgroundColor) {
          newBackgroundColor = existingCSSBackgroundColor;
        }
        if (!newTextColor) {
          newTextColor = existingCSSTextColor;
        }
        if (!newFontFamily) {
          newFontFamily = existingCSSFontFamily;
        }
        if (!newFontSize && existingCSSFontSize.length > 2) {
          newFontSize = existingCSSFontSize;
        }
      }

      // Combine all updates into single CSS statement
      var newCSS = 'background-color: ' + newBackgroundColor + '; ' + 
                   'color: ' + newTextColor + '; ' +
                   'font-family: ' + newFontFamily + '; ' +
                   'font-size: ' + newFontSize + ';';
      
      var msg = 'Updated: ' + '\n' +
              '- Background Color: ' + newBackgroundColor + '\n' +
              '- Text Color: ' + newTextColor + '\n' +
              '- Font Family: ' + newFontFamily + '\n' + 
              '- Font Size: ' + newFontSize + '\n';

      chrome.tabs.insertCSS({code: newCSS}, function() {
        alert(msg);
      });
      storage.set({'css': newCSS});
    })
  }
}

function loadHTMLChanges() {
  // Update the HTML text to indicate the current Detailed Options settings
  storage.get('css', function(items) {
    if (items.css) {
      var existingCSS = items.css.split(';', 4); // limit to the 4 CSS options for now
      // Ex: background-color: #ffcccc, color: maroon, font-family: monospace, font-size: 14px
      var existingCSSBackgroundColor = existingCSS[0].split(':')[1].trim();
      var existingCSSTextColor = existingCSS[1].split(':')[1].trim();
      var existingCSSFontFamily = existingCSS[2].split(':')[1].trim();
      var existingCSSFontSize = existingCSS[3].split(':')[1].trim();
      // Displaying a default value due to bug with setting font size after adjusting font family
      if (existingCSSFontSize.length <= 2) {
        existingCSSFontSize = '12px';
      }

      var backgroundColorHTML = document.getElementById('background_color');
      backgroundColorHTML.innerHTML = '(' + existingCSSBackgroundColor + ')';

      var textColorHTML = document.getElementById('text_color');
      textColorHTML.innerHTML = '(' + existingCSSTextColor + ')';

      var fontFamilyHTML = document.getElementById('font_family');
      fontFamilyHTML.innerHTML = '(' + existingCSSFontFamily + ')';

      var fontSizeHTML = document.getElementById('font_size');
      fontSizeHTML.innerHTML = '(' + existingCSSFontSize + ')';
    }
  });
}
