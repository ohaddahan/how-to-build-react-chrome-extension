#### The Goals
* Build a Chrome extension
* Base the extension on React

#### Instructions
* `git clone https://github.com/ohaddahan/how-to-build-react-chrome-extension`
* `cd how-to-build-react-chrome-extension`
* `./scripts/run.sh`
* Load the unpacked extension into Chrome

#### The details
`./scripts/run.sh` is a fairly simple shell script to follow , here is how it works:
* Setup and use `nvm` , this part optional , and you comment this section if you like.
I left it since I think it's easier to avoid version mismatches with `nvm`
* Create the React application by running `npx create-react-app ${extName} --use-npm` where `extName` is an environment variable with default value `react-chrome-extension`.
* Install dependencies `npm install npm-run-all webpack-cli axios @material-ui/core chalk`.
* Copy `contentScript.js` and `background.js` sample files from my repo into the new extension `src` directory.
* Copy over the `scripts` and `icons`.
* Run `node scripts/prep.js` (will elaborate on it later).
* Finally it will build our extension using `npm run build`

## Why all these extra scripts?
Let me elaborate on the various issues I encountered while getting this to work.

* `package.json` compatibility issues:
  * Changes done to `pacakge.json` by `./scripts/prep.js`:
  > packageJSON['scripts']  = {
  >   "start": "react-scripts start",
  >   "eject": "react-scripts eject",
  >   "test":  "react-scripts test",
  >   "prebuild": "rm -fr build ; node scripts/validate.js",
  >   "build": "npm-run-all build:*",
  >   "build:app": "INLINE_RUNTIME_CHUNK=false react-scripts build",
  >   "build:files":  "node ./scripts/build.js",
  >   "prezip": "rm -fr *.zip",
  >   "zip": "npm-run-all zip:*",
  >   "zip:build": "cd build; zip -r ../build.zip * -x '*.DS_Store'",
  >   "zip:src": "zip -r src.zip src package.json README.md public -x '*.DS_Store'",
  >   "release": "npm-run-all build zip"
  > };
  > packageJSON['eslintConfig']  = { "extends": "react-app" };
  
  There were no changes done to `start` , `eject` and `test`.  
  `prezip` , `zip` , `zip:build` , `zip:src` and `release` are just regular helpers needed for any Chrome extension.                                                                                                 

  * `prebuild` first cleans up the previous build and then runs `./scripts/validate.js` 
  all this script does is check that `package.json` and `manifiest.json` are valid `JSON` files and that the required
  Chrome settings exist.
  (some of the settings I used aren't really mandatory but are a very common case and you can remove them if you have such a special case
  `icons` and `browser_action`)
  
  * The use of `npm-run-all` is purely for ease of use to run multiple targets from one target.

  * Since we're using `create-react-app` it will use `react-scripts build` which doesn't expect to be used
  as an extension. The first thing we need to change is adding `INLINE_RUNTIME_CHUNK=false` before `react-scripts build`.
  This is done inside `package.json` , under `scripts` key , you can see the result in the final file create by `scripts/run.sh`.
  If we won't use this flag Chrome will not run React properly and raise a
  Content Security Policy error since React will try to inline JavaScript code.

    * `package.json` at  `scripts` key , `"build:app": "INLINE_RUNTIME_CHUNK=false react-scripts build"`

    * [Create React App - Advanced Configuration](https://create-react-app.dev/docs/advanced-configuration)
    > By default, Create React App will embed the runtime script into index.html during the production build.
    > When set to false, the script will not be embedded and will be imported as usual.
    > This is normally required when dealing with CSP.

    * [Content Security Policy (CSP)](https://developer.chrome.com/extensions/contentSecurityPolicy)
    > Inline JavaScript will not be executed.
    > This restriction bans both inline `<script>` blocks and inline event handlers (e.g. `<button onclick="...">`).
    > The first restriction wipes out a huge class of cross-site scripting attacks by making it impossible for you to
    > accidentally execute script provided by a malicious third-party.
    > It does, however, require you to write your code with a clean separation between content and behavior 
    > (which you should of course do anyway, right?). An example might make this clearer.
    > You might try to write a Browser Action's popup as a single popup.html containing


  * `script/build.js` is the last helper script we have, it simply runs `npx webpack` on the `contentScript.js` 
  and `background.js` , after that it copies them into the build directory since `react-scripts` won't do it for us.

  
* `manifest.json` compatibility issues:

  * We add `version` and `manifest_version` which `create-react-app` doesn't add but Chrome demands.
  We also add `icons` which isn't mandatory but comes as an incompatible format from `create-react-app`.
  
  * We remove `background_color`, `display`, `start_url` and  `theme_color` which come from `create-react-app` but 
  aren't compatible with Chrome.
  
  * We also add `browser_action` , `content_scripts` , `permissions` , `content_security_policy` , `background`
   which aren't mandatory but most likely needed by most and is missing.
  
#### Background and Content Scripts
Included are simple `background.js` and `contentScript.js` which send a `GET` request to `https://postman-echo.com/get`.
The reason I included them is mainly for completeness and as a reference for others on how they work with a React-Chrome-Extension.
Furthermore they are also an example of `chrome.runtime` 


#### Final thoughts
While trying to do this I was trying to follow a few other examples as shown in the references section.
Unfortunately none had all the elements I needed or explained all the details I elaborate on here.
I hope this will help anyone else who would like to create a React-Chrome-Extension.
(I'm sure my code can get better, open an issue on `GitHub` and I'll happily fix it)  


#### References

* [How to use React.js to create a cross-browser extension in 5 minutes](https://levelup.gitconnected.com/how-to-use-react-js-to-create-chrome-extension-in-5-minutes-2ddb11899815)
* [React Chrome Extension Boilerplate](https://github.com/jhen0409/react-chrome-extension-boilerplate)
* [Create chrome extension with ReactJs using inject page strategy](https://itnext.io/create-chrome-extension-with-reactjs-using-inject-page-strategy-137650de1f39#3996)
* [Chrome Extension boilerplate with ReactJS and vanilla JS examples](https://github.com/FullStack-Academy-Kiev/react-chrome-extension)
* [Content Security Policy (CSP)](https://developer.chrome.com/extensions/contentSecurityPolicy)
* [Create React App - Advanced Configuration](https://create-react-app.dev/docs/advanced-configuration)
* [chrome.runtime - Official Docs](https://developer.chrome.com/extensions/runtime)
