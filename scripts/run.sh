#!/usr/bin/env zsh
if [ "$(which nvm)" = "nvm not found" ] ; then
  echo "nvm not found, will try to set it"
  export NVM_DIR="$HOME/.nvm"
  if [ -r "/usr/local/opt/nvm/nvm.sh" ] ; then
    source "/usr/local/opt/nvm/nvm.sh"
  fi
  if [ -r "/usr/local/opt/nvm/etc/bash_completion" ] ; then
    source "/usr/local/opt/nvm/etc/bash_completion"
  fi
fi

if [ "$(which nvm)" = "nvm not found" ] ; then
  echo "nvm still not found, exiting"
  exit 1
fi

if [ ! -e .nvmrc ] ; then
  echo "Please insert you node version inside an .nvmrc file before running this script"
  exit 1
fi
nvm use

if [ -z "${extName}" ] ; then
  export extName='react-chrome-extension'
fi
set -x
npx create-react-app ${extName} --use-npm
if [ -e .nvmrc ] ; then
  cp .nvmrc ${extName}
fi
cd ${extName}
npm install npm-run-all webpack-cli axios @material-ui/core chalk
cp ../scripts/contentScript.js src/contentScript.js
cp ../scripts/background.js src/background.js
cp -fr ../scripts ./
cp -fr ../icons/* ./public/
node scripts/prep.js
npm run build