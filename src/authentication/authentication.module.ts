import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationEntity } from './entities/authentication.entity';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { RolesGuard } from './roles.guard'; // Update the import path

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthenticationEntity]),
    JwtModule.register({
      secret: 'secret-key',
      signOptions: { expiresIn: '8760h' },
    }),
  ],
  providers: [AuthenticationService, RolesGuard],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
