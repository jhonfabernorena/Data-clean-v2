import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class FileOptionsDto {
  @ApiProperty({
    description: 'Indica si se deben eliminar registros duplicados',
    type: Boolean,
    example: true,
    required: false,
  })
  @IsOptional()
  removeDuplicates?: boolean;

  @ApiProperty({
    description: 'Columna por la cual se debe ordenar el archivo',
    type: String,
    example: 'name',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortColumn?: string;

  @ApiProperty({
    description: 'Orden de la clasificación de datos',
    enum: SortOrder,
    example: SortOrder.ASC,
    required: false,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
