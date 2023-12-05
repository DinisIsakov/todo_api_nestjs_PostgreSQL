import { IsString, MaxLength } from 'class-validator';

export class CreateAuthenticationDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @MaxLength(64, { message: 'Имя не должно превышать 64 символа' })
  username: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;
}
