/* content.js

- Desc
*/


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      all_urls = "";

      // current tab's URL
      all_urls += "Tab URL: " + request.url;
      // alert(url);

      // all links on the page
      var links = document.querySelectorAll("a");
   	  var urls = {};
  	  for (var i = 1; i < links.length; ++i) {  // Set i=1 because i=0 is null
    	urls[links[i].textContent] = links[i].href;
      }
      for (var p in urls) {
    	if (urls.hasOwnProperty(p)) {
     	 all_urls += p + ": " + urls[p] + "\n";
    	} 
  	  } 
  	  alert(all_urls);


    }
  }
);