import { IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateGroupDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @MaxLength(64, { message: 'Имя не должно превышать 64 символа' })
  @IsOptional()
  readonly name?: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @MaxLength(256, { message: 'Описание не должно превышать 256 символов' })
  @IsOptional()
  readonly description?: string;
}
