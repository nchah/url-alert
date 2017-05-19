/* content.js

- Desc
*/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
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

  	  var warning = "WARNING: internationalized domain name detected.\n\n <br><br>"; // base warning
      // Parse the URL for any non-ascii characters
  	  for (var u in urls) {
        if (urls.hasOwnProperty(u)) {
  	  	  if (isAsciiOnly(punycode.toUnicode(urls[u])) == false) {
            warning += 'The link for "' + u + '" leads to a URL that looks like "' + 
                       punycode.toUnicode(urls[u]) +
                       '", but it contains non-ASCII characters.\n\n <br><br>';
  	  	  }
        }
  	  }
      // warning with all logged issues
      if (warning.length > 50) {
        // alert(warning);
        document.body.innerHTML += '<dialog>' + warning + '<button>OK</button></dialog>';
        var dialog = document.querySelector("dialog");
        dialog.style.width = "35%";
        dialog.style.color = "red";
        dialog.querySelector("button").addEventListener("click", function() {
            dialog.close();
        })
        dialog.showModal();
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




