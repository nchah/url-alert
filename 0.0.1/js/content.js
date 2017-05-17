/* content.js

- Desc
*/


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      var all_urls = "";
      var urls = {};
      // var urls = {"ㅁㄴㅇㄹ.com": "가짜"};  // Test

      // current tab's URL
      all_urls += "Tab URL: " + request.url;
      urls[request.url] = "this current tab's URL";
      // alert(url);

      // all links on the page
      var links = document.querySelectorAll("a");
  	  for (var i = 1; i < 4; ++i) {  // Set i=1 because i=0 is null
    	urls[links[i].textContent] = links[i].href;
      }
      for (var p in urls) {
    	if (urls.hasOwnProperty(p)) {
     	 all_urls += p + ": " + urls[p] + "\n";
    	} 
  	  } 
  	  // alert(all_urls);

  	  // Parse the URL for any non-ascii characters
  	  for (var u in urls) {
  	  	if (isAsciiOnly(u) == false) {
  	  	  alert('The link "' + u + '" leads to the URL "' + urls[u] +
                '", which contains non-ASCII characters.');
  	  	}
  	  }
    }
  }
);

function isAsciiOnly(str) {
    for (var i = 0; i < str.length; i++)
        if (str.charCodeAt(i) > 127) {
            return false;
        }
    return true;
}