import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  readonly description?: string;

  @IsOptional()
  @IsBoolean()
  readonly isDone?: boolean;
}
