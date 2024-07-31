import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateLogDto {
  @IsString()
  @IsOptional()
  readonly message?: string;

  @IsString()
  @IsOptional()
  readonly level?: string;

  @IsString()
  @IsOptional()
  readonly timestamp?: string;
}
