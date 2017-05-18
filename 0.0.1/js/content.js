/* content.js

- Desc
*/

// alert(isAsciiOnly(punycode.decode('maana-pta'))); 
// alert(isAsciiOnly(punycode.toUnicode('https://www.xn--80ak6aa92e.com/')));
// alert(punycode.toUnicode('xxn--80ak6aa92e')); 

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var warning = "";
    if (request.message === "clicked_browser_action") {
      // Local variables
      var all_urls = "";
      var urls = {};
      // var urls = {"네이버.com": "테스트"};  // Test

      // Getting current tab's URL
      all_urls += "Tab URL: " + request.url;
      urls["this current tab"] = request.url;

      // Getting all links on the opened page
      var links = document.querySelectorAll("a");
  	  for (var i = 1; i < links.length; ++i) {  // Set i=1 because i=0 is null
    	urls[links[i].textContent] = links[i].href;
      } 

  	  // Parse the URL for any non-ascii characters
  	  for (var u in urls) {
        // alert(urls[u]);
  	  	if (isAsciiOnly(punycode.toUnicode(urls[u])) == false) {
        // if (isAsciiOnly(urls[u]) == false) {
  	  	  // alert('The link "' + u + '" leads to the URL "' + urls[u] +
                // '", which contains non-ASCII characters.');
          warning += 'WARNING: The link for "' + u + '" leads to the URL "' + punycode.toUnicode(urls[u]) +
                     '", which contains non-ASCII characters.';
          // warning += "\n\n test string";
  	  	}
  	  }
      // Push out warning with all logged issues
      if (warning) {
        alert(warning);
      }
    }
  }
);

function isItUnicode(str) {

}

function isAsciiOnly(str) {
    for (var i = 0; i < str.length; i++)
        if (str.charCodeAt(i) > 127) {
            return false;
        }
    return true;
}




