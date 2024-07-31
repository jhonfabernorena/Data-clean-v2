import { IsOptional, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FileOptionsDto } from './update-file.dto';


export class UpdateFileDto {
  @ApiProperty({
    description: 'Nombre del archivo',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  fileName?: string;

  @ApiProperty({
    description: 'Opciones para el procesamiento del archivo',
    type: Object,
    example: { removeDuplicates: true, sortColumn: 'name', sortOrder: 'asc' },
    required: false,
  })
  @IsOptional()
  @IsObject()
  options?: FileOptionsDto;
}
