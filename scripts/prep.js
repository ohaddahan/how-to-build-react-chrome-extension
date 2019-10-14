'use strict';
const fs = require('fs');
//const extName = process.env.extName || 'react-chrome-extension';
//const sep = "*".repeat(150);

let manifestJSONRaw = fs.readFileSync('public/manifest.json');
let manifestJSON = JSON.parse(manifestJSONRaw);
manifestJSON['version'] = '0.0.1';
manifestJSON['manifest_version'] = 2;
manifestJSON['icons'] = {
  "16": "chrome_react_14.png",
  "48": "chrome_react_48.png",
  "128": "chrome_react_128.png"
};

['background_color', 'display', 'start_url', 'theme_color'].forEach(function(forbidden) {
  if (forbidden in manifestJSON) {
    delete manifestJSON[forbidden];
  }
});

manifestJSON["browser_action"] = {
  "default_popup": "index.html",
  "default_title": "Open the popup"
};

manifestJSON["content_scripts"] = [
  {
    "matches": ["https://*/*"],
    "run_at": "document_idle",
    "js": ["/static/js/contentScript.js"]
  }
];

manifestJSON["permissions"] = [
  "storage",
  "alarms",
  "tabs",
  "notifications",
  "unlimitedStorage",
  "activeTab",
  "storage",
  "webNavigation",
  "activeTab",
  "declarativeContent",
  "contextMenus",
  "*://*/*"
];

manifestJSON["content_security_policy"] = "script-src 'self' https://www.google-analytics.com; object-src 'self'";

manifestJSON["background"] = {
  "scripts": [
    "background.js"
  ],
  "persistent": false
};

manifestJSONRaw = JSON.stringify(manifestJSON, null, 2);
fs.writeFileSync('public/manifest.json', manifestJSONRaw);


let packageJSONRaw= fs.readFileSync('package.json');
let packageJSON = JSON.parse(packageJSONRaw);

packageJSON['scripts']  = {
  "start": "react-scripts start",
  "eject": "react-scripts eject",
  "test":  "react-scripts test",
  "prebuild": "rm -fr build ; node scripts/validate.js",
  "build": "npm-run-all build:*",
  "build:app": "INLINE_RUNTIME_CHUNK=false react-scripts build",
  "build:files":  "node ./scripts/build.js",
  "prezip": "rm -fr *.zip",
  "zip": "npm-run-all zip:*",
  "zip:build": "cd build; zip -r ../build.zip * -x '*.DS_Store'",
  "zip:src": "zip -r src.zip src package.json README.md public -x '*.DS_Store'",
  "release": "npm-run-all build zip"
};
packageJSON['eslintConfig']  = { "extends": "react-app" };

packageJSONRaw = JSON.stringify(packageJSON, null ,2);
fs.writeFileSync('package.json', packageJSONRaw);
