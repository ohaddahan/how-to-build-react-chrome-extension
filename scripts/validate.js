'use strict';
const fs = require('fs');
const sep = "*".repeat(150);
['public/manifest.json', 'package.json'].forEach( function(fileName) {
  try {
    console.log(sep);
    console.log(`Parsing file '${fileName}'`);
    let manifestJSONRaw = fs.readFileSync(fileName);
    JSON.parse(manifestJSONRaw);
    console.log(`Parsed '${fileName}' successfully`);
    console.log(sep);
  } catch(error) {
    console.log(`Error: ${error}`);
    console.log(sep);
    process.exit(1);
  }
});

let manifestJSONRaw = fs.readFileSync('public/manifest.json');
let manifestJSON = JSON.parse(manifestJSONRaw);

['browser_action', 'version', 'manifest_version', 'icons', 'name'].forEach(function(sectionName) {
  if (!manifestJSON[sectionName]) {
    console.log(sep);
    console.log(`Section ${sectonName} is missing from manifest.json`);
    console.log(sep);
    process.exit(1);
  }
});

for (const iconName in manifestJSON.icons) {
  let fileName = manifestJSON.icons[iconName];
  if (typeof(fileName) !== 'string') {
    console.log(sep);
    console.log(`${iconName} value isn't a string`);
    console.log(sep);
    process.exit(1);
  }
  if (!fs.existsSync(`./public/${fileName}`)) {
    console.log(sep);
    console.log(`Couldn't find ${iconName} file at ./public/${fileName}`);
    console.log(sep);
    process.exit(1);
  }
}

