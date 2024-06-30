import fs from 'node:fs';
import path from 'node:path';

export function listDirectoriesNames(basePath: string) {
  return fs.readdirSync(basePath).filter((fileName) => {
    const joinedPath = path.join(basePath, fileName);
    const isDirectory = fs.lstatSync(joinedPath).isDirectory();

    return isDirectory;
  });
}
