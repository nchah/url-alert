/* popup.js

- Implements the popup window in the Chrome browser extension button
*/

var storage = chrome.storage.local;
var optionsButton2 = document.querySelector('img.optionsPage2');
optionsButton2.addEventListener('click', openOptions);

function openOptions() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } 
  else {
    window.open(chrome.runtime.getURL('options.html'))
  }
}
