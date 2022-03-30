import fs  from 'fs';
import path from 'path';

const files = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  }
};

export default files;