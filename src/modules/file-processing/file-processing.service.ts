import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CsvHelper } from './utils/csv-helper';
import { FileHelper } from 'src/common/utils/file-helper';
import { CreateFileDto } from './dtos/create-file.dto';
import { UpdateFileDto } from './dtos/file-options.dto';

@Injectable()
export class FileProcessingService {
  deleteFile(filename: string) {
    throw new Error('Method not implemented.');
  }
  getFile(fileName: string): Buffer | PromiseLike<Buffer> {
    throw new Error('Method not implemented.');
  }
  private readonly csvHelper = new CsvHelper();
  private readonly uploadDir = './uploads';

  async processFile(createFileDto: CreateFileDto): Promise<string> {
    try {
      const filePath = this.saveFile(createFileDto.file);
      const processedData = await this.csvHelper.processCsv(filePath, createFileDto.options);
      const outputPath = await this.csvHelper.generateCsv(processedData);
      FileHelper.deleteFile(filePath);
      return outputPath;
    } catch (error) {
      throw new Error(`Error processing file: ${error.message}`);
    }
  }

  private saveFile(file: Express.Multer.File): string {
    FileHelper.createDirectoryIfNotExists(this.uploadDir);
    const filePath = `${this.uploadDir}/${file.originalname}`;
    FileHelper.saveFile(file, this.uploadDir);
    return filePath;
  }

  async updateFile(filename: string, updateFileDto: UpdateFileDto): Promise<string> {
    try {
      throw new Error('Update functionality is not implemented.');
    } catch (error) {
      throw new Error(`Error updating file: ${error.message}`);
    }
  }

  async getAllFiles(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      fs.readdir(this.uploadDir, (err, files) => {
        if (err) {
          reject(new Error(`Error reading directory: ${err.message}`));
        } else {
          resolve(files);
        }
      });
    });
  }
}
