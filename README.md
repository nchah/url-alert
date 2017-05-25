# URL Alert

URL Alert is a Chrome extension to parse URLs for internationalized domain names and warn against URL phishing attacks.

Available on the [Chrome Web Store](https://chrome.google.com/webstore/detail/url-alert/pflncfgmhaeckfmdgogffkbjkkogjgkh).


## Usage

An internationalized domain name (IDN) may be a sign that the URL is part of an internationalized domain name (IDN) homograph attack ([Wikipedia](https://en.wikipedia.org/wiki/IDN_homograph_attack)).

For example, you may find a URL that looks like "https://www.еріс.com", but it's actually the unicode domain: https://www.xn--e1awd7f.com/ (written in [Punycode](https://en.wikipedia.org/wiki/Punycode)). 
By using similar looking Cyrillic letters, the URL "www.еріс.com" is made to look like "www.epic.com" spelled with ASCII characters.
Check this site ([Unicode Lookup](https://unicodelookup.com/#www.еріс.com/1)) for details on the Unicode characters that are used.


## Screenshot

Example: Navigate to this Hacker News post "[Phishing attack uses Unicode characters in domains to clone known safe sites](https://news.ycombinator.com/item?id=14119713)" where a few unicode URLs can be found.

Or try this site: https://www.аррӏе.com/ and the associated blog post where the author demonstrates "a flaw in the way unicode domains are handled in browsers".

![](/images/screenshot-url-alert.png?raw=true)


## Tips

- If you prefer to hide the extension icon, right click on the icon next to the Chrome address bar and select "Hide in Chrome Menu". The icon should now be hidden in the "hamburger menu" (the three vertical dots).
- By default Chrome extensions are not enabled for "incognito" browsing. To enable this, go to "chrome://extensions/" in a new tab and check the "Allow in incognito" box.

## Dependencies

The modal that displays the warning uses jQuery ([jQuery UI](https://jqueryui.com)).

The URL unicode check is done with punycode.js ([GitHub: bestiejs/punycode.js](https://github.com/bestiejs/punycode.js/)).



