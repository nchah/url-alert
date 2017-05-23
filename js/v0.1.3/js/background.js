/* background.js

*/


chrome.webNavigation.onCompleted.addListener(function(details) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "exec", "url": activeTab.url});
	});
});

