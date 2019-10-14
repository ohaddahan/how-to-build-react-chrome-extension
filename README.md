#### The Goals
* Build a Chrome extension
* Base the extension on React

#### Instructions



Issues:
package.json -> setup
manifest.json -> setup / compatibility
background / content scripts
nvm -> nvmrc

create-react-app
custom build script


First step:
npx create-react-app react-chrome-extension


cd react-chrome-extension
npm start



mkdir scripts:
copy from: github
prebuild --> validate --> handy


INLINE_RUNTIME_CHUNK=false
By default, Create React App embeds a small runtime script into index.html during the production build, this is to reduce the number of HTTP requests. But unfortunately, you will see console errors related to CSP. You could turn off the embedding behavior by setting the INLINE_RUNTIME_CHUNK flag to false .


Testing locally:
1. how to build.
2. start background pages


Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self' https://www.google-analytics.com". Either the 'unsafe-inline' keyword, a hash ('sha256-31wM8eF+W2EIVBBtylCWWu4oRMtgZN1NAG5wAtANfWE='), or a nonce ('nonce-...') is required to enable inline execution.


#### References

* [How to use React.js to create a cross-browser extension in 5 minutes](https://levelup.gitconnected.com/how-to-use-react-js-to-create-chrome-extension-in-5-minutes-2ddb11899815)
* [React Chrome Extension Boilerplate](https://github.com/jhen0409/react-chrome-extension-boilerplate)
* [Create chrome extension with ReactJs using inject page strategy](https://itnext.io/create-chrome-extension-with-reactjs-using-inject-page-strategy-137650de1f39#3996)
* [Chrome Extension boilerplate with ReactJS and vanilla JS examples](https://github.com/FullStack-Academy-Kiev/react-chrome-extension)
* [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
* [Create React App - Advanced Configuration](https://create-react-app.dev/docs/advanced-configuration)
* [chrome.runtime - Official Docs](https://developer.chrome.com/extensions/runtime)
