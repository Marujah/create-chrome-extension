#! /usr/bin/env node
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import ask from "./libs/inquirer.js";
import fs from "fs";
import { generateManifest } from "./libs/manifestTemplate.js";
import { serviceWorkerTemplate } from "./libs/serviceWorkerTemplate.js";
import {
  popupHTMLTemplate,
  popupCSSTemplate,
  popupJSTemplate,
} from "./libs/popupTemplate.js";
import { contentTemplate } from "./libs/contentTemplate.js";
import { updateProgress } from "./libs/progressBar.js";
import { extensionImages } from "./libs/assets.js";

clear();

console.log(
  chalk.yellow(
    figlet.textSync("CCHEX", {
      horizontalLayout: "full",
    })
  )
);

const run = async () => {
  const extensionData = await ask.askExtensionData();
  console.log("Creating extension...");
  const directoryName = `./${extensionData.extensionName}`;
  try {
    // Start updating the progress bar
    updateProgress();
    //
    // add images folder and copy default icons
    try {
      fs.mkdirSync(directoryName + "/images", {
        recursive: true,
      });
      extensionImages.map((fileName) => {
        fs.writeFileSync(
          `${directoryName}/images/${fileName.name}`,
          fileName.base64,
          { encoding: "base64" },
          (err) => {
            if (err) throw err;
          }
        );
      });
    } catch (error) {
      console.error("cannot create image folder", error);
    }
    try {
      // add background.js
      fs.writeFileSync(
        `${directoryName}/service-worker.js`,
        serviceWorkerTemplate
      );
      fs.writeFileSync(`${directoryName}/content.js`, contentTemplate);
      fs.mkdirSync(directoryName + "/popup", {
        recursive: true,
      });
      fs.writeFileSync(`${directoryName}/popup/popup.html`, popupHTMLTemplate);
      fs.writeFileSync(`${directoryName}/popup/popup.css`, popupCSSTemplate);
      fs.writeFileSync(`${directoryName}/popup/popup.js`, popupJSTemplate);
      // add manifest.json
      fs.writeFileSync(
        `${directoryName}/manifest.json`,
        JSON.stringify(generateManifest(extensionData), null, 4)
      );
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    chalk.red("error happened!", error);
    process.exit();
  }
};

run();
