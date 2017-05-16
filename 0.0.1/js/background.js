/* background.js

- Desc
*/


// Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action", "url": activeTab.url});
	});
  }
});

// // Current tab URL
// chrome.tabs.query(
//   ({currentWindow: true}), 
//   function(tabs) {
//     tabUrl = tabs[0].url;
//     console.log(tabUrl);
// });


// chrome.windows.getAll({populate:true},function(windows){
//   windows.forEach(function(window){
//     window.tabs.forEach(function(tab){
//       //collect all of the urls here, I will just log them instead
//       console.log(tab.url);
//     });
//   });
// });
