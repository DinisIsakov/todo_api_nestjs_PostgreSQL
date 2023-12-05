import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationEntity } from './entities/authentication.entity';
import { CreateAuthenticationDto } from './dtos/create-authentication.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AuthenticationEntity)
    private readonly userRepository: Repository<AuthenticationEntity>,
  ) {}

  /**
   * Регистрация нового пользователя.
   * @param {CreateAuthenticationDto} createDto DTO для создания пользователя.
   * @return {Promise<string>} Токен доступа.
   */
  async register(createDto: CreateAuthenticationDto): Promise<string> {
    const { username, password } = createDto;
    const role = this.getRoleByUsernameAndPassword(username, password);

    const user = new AuthenticationEntity();
    user.username = username;
    user.password = password;
    user.roles = role;

    await this.userRepository.save(user);

    const token = this.jwtService.sign({
      sub: user.id,
      username,
      roles: [role],
    });

    user.token = token;
    await this.userRepository.save(user);

    return token;
  }

  /**
   * Аутентификация пользователя.
   * @param {string} username Имя пользователя.
   * @param {string} password Пароль пользователя.
   * @return {Promise<string>} Токен доступа.
   * @throws {UnauthorizedException} Если учетные данные неверны.
   */
  async login(username: string, password: string): Promise<string> {
    const user: AuthenticationEntity = await this.validateUser(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    return user.token;
  }

  /**
   * Валидация пользователя по учетным данным.
   * @param {string} username Имя пользователя.
   * @param {string} password Пароль пользователя.
   * @return {Promise<AuthenticationEntity>} Пользователь, если валидация успешна.
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<AuthenticationEntity> {
    return this.userRepository.findOne({ where: { username, password } });
  }

  private getRoleByUsernameAndPassword(
    username: string,
    password: string,
  ): string {
    return username === 'admin' && password === 'admin' ? 'admin' : 'reader';
  }
}
