# URL Alert

A Chrome extension to parse URLs for internationalized domain names.
This may be a sign that the URL is an internationalized domain name (IDN) homograph attack ([Wikipedia](https://en.wikipedia.org/wiki/IDN_homograph_attack)).

Available on the [Chrome Web Store](https://chrome.google.com/webstore/detail/url-alert/pflncfgmhaeckfmdgogffkbjkkogjgkh).


## Screenshot

Example: Navigate to this Hacker News post "[Phishing attack uses Unicode characters in domains to clone known safe sites](https://news.ycombinator.com/item?id=14119713)" where a few unicode URLs can be found.

Or try this site: https://www.аррӏе.com/ and the associated blog post where the author demonstrates "a flaw in the way unicode domains are handled in browsers".

![](/images/screenshot-url-alert.png?raw=true)


## Tips

- If you prefer to hide the extension icon, right click on the icon next to the Chrome address bar and select "Hide in Chrome Menu". The icon should now be hidden in the "hamburger menu" (the three vertical dots).


## Dependencies

The modal that displays the warning uses jQuery [jQuery UI](https://jqueryui.com).

The URL unicode check is done with punycode.js [GitHub: bestiejs/punycode.js](https://github.com/bestiejs/punycode.js/).



