import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface DecodedToken {
  sub: string;
  username: string;
  roles: string[];
}

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      username: string;
      roles: string[];
    };
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new ForbiddenException('Токен не предоставлен');
    }

    const cleanedToken = token.replace('Bearer ', '');

    const decodedToken = jwt.verify(cleanedToken, 'secret-key') as DecodedToken;

    request.user = {
      id: decodedToken.sub,
      username: decodedToken.username,
      roles: decodedToken.roles || [],
    };

    const userRoles = request.user?.roles || [];

    if (!userRoles.length) {
      throw new ForbiddenException('Роли пользователя отсутствуют');
    }

    const roles = Reflect.getMetadata('roles', context.getHandler());

    if (roles && !roles.some((role) => userRoles.includes(role))) {
      throw new ForbiddenException('Недостаточно прав');
    }

    return true;
  }
}
