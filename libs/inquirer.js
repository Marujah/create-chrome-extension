import inquirer from 'inquirer';
import files from './files.js';
import chalk from 'chalk';

const ask = {
  askExtensionData: () => {
    const questions = [
      {
        name: 'extensionName',
        type: 'input',
        message: 'Enter your Extension name:',
        validate: function( value ) {
          if (value.length) {
            if (files.directoryExists(value)) {
                return chalk.red('This name already exists!');
            } else {
                return true;
            }
          } else {
            return 'Please enter a name for your extension.';
          }
        }
      },
      {
        name: 'extensionDescription',
        type: 'input',
        message: 'Enter a description for your Extension (optional):',
      },
      {
        name: 'extensionAuthor',
        type: 'input',
        message: 'Enter your name (optional):',
      },
    ];
    return inquirer.prompt(questions);
  },
};

export default ask;