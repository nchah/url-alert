/* content.js

- Desc
*/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var warning = "";
    if (request.message === "exec") {
      var urls = {};
      var warning = "";

      // Getting current tab's URL
      urls["this current tab"] = request.url;

      // Getting all links on the opened page
      var links = document.querySelectorAll("a");
  	  for (var i = 1; i < links.length; ++i) {  // Set i=1 because i=0 is null
        urls[links[i].textContent] = links[i].href;
      }

  	  // Parse the URL for any non-ascii characters
  	  for (var u in urls) {
        if (urls.hasOwnProperty(u)) {
  	  	  if (isAsciiOnly(punycode.toUnicode(urls[u])) == false) {
            warning += 'WARNING: The link for "' + u + '" leads to the URL "' + 
                       punycode.toUnicode(urls[u]) +
                       '", which contains non-ASCII characters.\n\n';
  	  	  }
        }
  	  }
      // warning with all logged issues
      if (warning.length > 0) {
        alert(warning);
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




