import * as fs from 'fs';
import * as path from 'path';

export const fileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath);
};

export const createFilePath = (fileName: string): string => {
  return path.resolve(__dirname, '../../uploads', fileName);
};
