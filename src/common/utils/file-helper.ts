import * as fs from 'fs';
import * as path from 'path';

export class FileHelper {
  static fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  static createFilePath(fileName: string): string {
    return path.resolve(__dirname, '../../uploads', fileName);
  }

  static saveFile(file: Express.Multer.File, uploadDir: string): void {
    const filePath = path.join(uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
  }

  static deleteFile(filePath: string): void {
    if (this.fileExists(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  static createDirectoryIfNotExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
}
