'use strict';
const mode = 'production';
process.env.BABEL_ENV = mode;
process.env.NODE_ENV  = mode;
const fs = require('fs');
const child_process = require('child_process');
const chalk = require('chalk');

function runAndPrintSummary(fileDetails, mode) {
  const sep = "*".repeat(150);
  let command = `npx webpack --mode ${mode} ${fileDetails.inputFile} --output ${fileDetails.outputFile}`;
  let ret = child_process.execSync(command);
  console.log(sep);
  console.log(`Ran webpack command '${command}`);
  console.log(`Command return value:\n`,ret.toString());
  console.log(sep);
}

function getInputOutfileFileNames(rawFileName) {
  let obj        = {};
  obj.inputFile  = `./src/${rawFileName.split("/").pop()}`;
  obj.outputFile = `./build/${rawFileName}`;
  obj.fileExists = fs.existsSync(obj.inputFile);
  return obj;
}

function webpackContentScripts(manifestJSON, mode) {
  if (!manifestJSON.content_scripts) {return ;}
  manifestJSON.content_scripts.forEach( function(contentScript) {
    if (!contentScript.js) { return; }
    contentScript.js.forEach( function(contentScriptFile) {
      let fileDetails = getInputOutfileFileNames(contentScriptFile);
      if (!fileDetails.fileExists) {
        console.log(chalk.red.bgBlack.bold(`File doesn't exists: ${fileDetails.inputFile}`));
        return
      }
      runAndPrintSummary(fileDetails, mode);
    });
  });
}

function webpackBackgroundScripts(manifestJSON, mode) {
  if (!manifestJSON.background || !manifestJSON.background.scripts ) { return; }
  manifestJSON.background.scripts.forEach( function(backgroundScriptFile) {
    let fileDetails = getInputOutfileFileNames(backgroundScriptFile);
    if (!fileDetails.fileExists) {
      console.log(chalk.red.bgBlack.bold(`File doesn't exists: ${fileDetails.inputFile}`));
      return
    }
    runAndPrintSummary(fileDetails, mode);
  });
}

let manifestJSONRaw = fs.readFileSync('public/manifest.json');
let manifestJSON = JSON.parse(manifestJSONRaw);
webpackBackgroundScripts(manifestJSON, mode);
webpackContentScripts(manifestJSON, mode);

