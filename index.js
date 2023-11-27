#! /usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import ask from './libs/inquirer.js';
import fs from 'fs';
import {
  generateManifest
} from './libs/manifestTemplate.js';
import {
  serviceWorkerTemplate
} from './libs/serviceWorkerTemplate.js';
import {
  popupHTMLTemplate, popupCSSTemplate, popupJSTemplate,
} from './libs/popupTemplate.js';
import { contentTemplate } from './libs/contentTemplate.js';
import { updateProgress } from './libs/progressBar.js';
import { commandLine } from './utils/path.js';
clear();

console.log(
  chalk.yellow(
    figlet.textSync('CCHEX', {
      horizontalLayout: 'full'
    })
  )
);

const run = async () => {
  const extensionData = await ask.askExtensionData();
  console.log('Creating extension...');
  const directoryName = `./${extensionData.extensionName}`;
  try {

    // Start updating the progress bar
    updateProgress();
    //
    var globalPackageDirectory = '';

    const cp = commandLine('npm root --global',function(err,data){
        if(err){
            console.log(err);
        }
        globalPackageDirectory = Buffer.from(data).toString('utf8');
    });

    cp.on('close',function(){
      //cmd_output is already populated above. If you want just console.log here or leave it
      // add images folder and copy default icons
      fs.mkdirSync(directoryName + '/images', {
        recursive: true,
      });
      [
        `${globalPackageDirectory}/cchex/assets/extension-default-icon16.png`,
        `${globalPackageDirectory}/cchex/assets/extension-default-icon32.png`,
        `${globalPackageDirectory}/cchex/assets/extension-default-icon48.png`,
        `${globalPackageDirectory}/cchex/assets/extension-default-icon128.png`,
      ].map(fileName => {
        fs.copyFile(fileName, `${directoryName}/images/${fileName.replace('./assets/', '')}`, (err) => {
          if (err) throw err;
        });
      })
      try {
        // add background.js
        fs.writeFileSync(`${directoryName}/service-worker.js`, serviceWorkerTemplate);
        fs.writeFileSync(`${directoryName}/content.js`, contentTemplate);
        fs.mkdirSync(directoryName + '/popup', {
          recursive: true
        });
        fs.writeFileSync(`${directoryName}/popup/popup.html`, popupHTMLTemplate);
        fs.writeFileSync(`${directoryName}/popup/popup.css`, popupCSSTemplate);
        fs.writeFileSync(`${directoryName}/popup/popup.js`, popupJSTemplate);
        // add manifest.json
        fs.writeFileSync(`${directoryName}/manifest.json`, JSON.stringify(generateManifest(extensionData), null, 4));
      } catch (error) {
        console.error(error)
      }
    })
    
  } catch (error) {
    chalk.red('error happened!', error);
    process.exit();
  }

};

run();