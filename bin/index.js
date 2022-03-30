#! /usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import ask from '../libs/inquirer.js';
import fs from 'fs';
import {
  generateManifest
} from '../libs/manifestTemplate.js';
import {
  backgroundTemplate
} from '../libs/backgroundTemplate.js';
import {
  popupHTMLTemplate, popupCSSTemplate, popupJSTemplate,
} from '../libs/popupTemplate.js';
import yargs from 'yargs';

clear();

console.log(
  chalk.yellow(
    figlet.textSync('CCHEXT', {
      horizontalLayout: 'full'
    })
  )
);

const usage = "\nUsage: create-chrome-extension <extension_name> to create a new extension";
const options = yargs(process.argv.slice(2))
.usage(usage)
.option("a", {
  alias: "popupAction",
  describe: "add popup action.",
  type: "boolean",
  demandOption: false
}).help('help')
.option("t", {
  alias: "bgType",
  describe: "specify background type i.e. -t=module",
  type: "text",
  demandOption: false
}).help('help')

.option("p", {
  alias: "permissions",
  describe: "add needed permissions.",
  type: "string",
  demandOption: false
}).help('help').argv;

const run = async () => {
  const permissions = yargs(process.argv.slice(2)).argv?.p;
  const defaultPopup = yargs(process.argv.slice(2)).argv?.a;
  const backgroundType = yargs(process.argv.slice(2)).argv?.t;
  // console.log(yargs(process.argv.slice(2)).argv, permissions, defaultPopup);return;
  const extensionData = await ask.askExtensionData();
  extensionData.permissions = permissions;
  extensionData.defaultPopup = defaultPopup;
  extensionData.backgroundType = backgroundType;
  console.log('Creating extension...');
  const directoryName = `./${extensionData.extensionName}`;
  try {
    // add images folder and copy default icons
    fs.mkdirSync(directoryName + '/images', {
      recursive: true
    });
    [
      './assets/extension-default-icon16.png',
      './assets/extension-default-icon32.png',
      './assets/extension-default-icon48.png',
      './assets/extension-default-icon128.png',
    ].map(fileName => {
      fs.copyFile(fileName, `${directoryName}/images/${fileName.replace('./assets/', '')}`, (err) => {
        if (err) throw err;
      });
    })
    // add manifest.json
    fs.writeFileSync(`${directoryName}/manifest.json`, JSON.stringify(generateManifest(extensionData), null, 4));
    // add background.js
    fs.writeFileSync(`${directoryName}/background.js`, backgroundTemplate);
    if (extensionData.defaultPopup) {
      fs.mkdirSync(directoryName + '/popup', {
        recursive: true
      });
      fs.writeFileSync(`${directoryName}/popup/popup.html`, popupHTMLTemplate);
      fs.writeFileSync(`${directoryName}/popup/popup.css`, popupCSSTemplate);
      fs.writeFileSync(`${directoryName}/popup/popup.js`, popupJSTemplate);
    }
  } catch (error) {
    chalk.red('error happaned!', error);
    process.exit();
  }

};

run();