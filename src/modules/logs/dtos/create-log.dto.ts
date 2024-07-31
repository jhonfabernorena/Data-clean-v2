import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsString()
  @IsNotEmpty()
  readonly level: string; // Ejemplo: 'info', 'error', etc.

  @IsString()
  @IsNotEmpty()
  readonly timestamp: string; // Fecha y hora del log
}
