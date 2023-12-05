import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly name: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  readonly description?: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isDone: boolean;

  @IsNotEmpty()
  readonly groupId: number;
}
