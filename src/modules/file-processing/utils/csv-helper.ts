import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'json2csv';
import { promisify } from 'util';
import * as csvParser from 'csv-parser';

@Injectable()
export class CsvHelper {
  private readonly outputDir = path.resolve(__dirname, '../output');

  constructor() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async processCsv(filePath: string, options: any): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const results: any[] = [];
      const stream = fs.createReadStream(filePath)
        .pipe(csvParser());

      stream.on('data', (data) => results.push(data));
      stream.on('end', () => {
        try {
          let processedData = results;

          // Aplicar eliminación de duplicados
          if (options.removeDuplicates) {
            processedData = this.removeDuplicates(processedData);
          }

          // Aplicar ordenamiento
          if (options.sortColumn && options.sortOrder) {
            processedData = this.sortData(processedData, options.sortColumn, options.sortOrder);
          }

          resolve(processedData);
        } catch (error) {
          reject(new Error(`Error processing data: ${error.message}`));
        }
      });

      stream.on('error', (error) => {
        reject(new Error(`Error reading file: ${error.message}`));
      });
    });
  }

  private removeDuplicates(data: any[]): any[] {
    const uniqueData = new Map();
    data.forEach(item => {
      const key = JSON.stringify(item);
      if (!uniqueData.has(key)) {
        uniqueData.set(key, item);
      }
    });
    return Array.from(uniqueData.values());
  }

  private sortData(data: any[], column: string, order: 'asc' | 'desc'): any[] {
    return data.sort((a, b) => {
      if (a[column] < b[column]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  async generateCsv(data: any[]): Promise<string> {
    const timestamp = Date.now();
    const outputFileName = `processed-${timestamp}.csv`;
    const outputPath = path.join(this.outputDir, outputFileName);

    // Verifica si los datos tienen al menos un objeto
    if (data.length === 0) {
      throw new Error('Data is empty');
    }

    // Obtén los campos de la primera entrada para el CSV
    const fields = Object.keys(data[0]);

    const csv = parse(data, { fields });

    await promisify(fs.writeFile)(outputPath, csv);

    return outputPath;
  }
}
