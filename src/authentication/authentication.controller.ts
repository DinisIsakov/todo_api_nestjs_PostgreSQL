import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dtos/create-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  async register(@Body() createDto: CreateAuthenticationDto): Promise<string> {
    const token = await this.authService.register(createDto);
    return token;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() createDto: CreateAuthenticationDto): Promise<string> {
    const { username, password } = createDto;
    const token = await this.authService.login(username, password);
    return token;
  }
}
