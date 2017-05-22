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

  	  var warning = "WARNING: internationalized domain name(s) detected. " +
                    "This may be a IDN homograph attack.* <br><br>"; // base warning
      // Parse the URL for any non-ascii characters
  	  for (var u in urls) {
        if (urls.hasOwnProperty(u)) {
  	  	  if (isAsciiOnly(punycode.toUnicode(urls[u])) == false) {
            warning += 'The link for "' + u + '" leads to a URL that looks like "' + 
                       punycode.toUnicode(urls[u]) +
                       '", but it contains non-ASCII characters. <br><br>';
  	  	  }
        }
  	  }
      // warning with all logged issues
      if (warning.length > 250) {  // length of warning before IDNs added
        // alert(warning);
        document.body.innerHTML += "<dialog>" + warning + "<button>OK</button>" +
        "<br><br>*Please check this <a href='https://en.wikipedia.org/wiki/IDN_homograph_attack' target='_blank'> \
        Wikipedia article</a> for details.</dialog>";
        var dialog = document.querySelector("dialog");
        dialog.style.width = "35%";
        dialog.style.border = "1";
        // dialog.style.color = "red";
        var button = document.querySelector("button")
        button.style.padding = "7px 20px";
        // dialog.style.color = "red";
        dialog.querySelector("button").addEventListener("click", function() {
            dialog.close();
        })
        dialog.showModal();
        // Testing:
        // alert(isAsciiOnly(punycode.toUnicode('https://www.xn--80ak6aa92e.com/')))
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




