import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';
import { Express } from 'express';

export class CreateFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  file: Express.Multer.File;

  @ApiProperty({
    type: Object,
    description: 'Options for processing the file',
    example: {
      removeDuplicates: true,
      sortColumn: 'name',
      sortOrder: 'asc',
    },
  })
  @IsObject()
  options: {
    removeDuplicates: boolean;
    sortColumn: string;
    sortOrder: string;
  };
}
