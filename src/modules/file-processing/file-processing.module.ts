import { Module } from '@nestjs/common';
import { FileProcessingController } from './file-processing.controller';
import { FileProcessingService } from './file-processing.service';
import { CsvHelper } from './utils/csv-helper';

@Module({
  controllers: [FileProcessingController],
  providers: [FileProcessingService, CsvHelper],
})
export class FileProcessingModule {}
