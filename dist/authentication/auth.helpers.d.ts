import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticationService } from './authentication.service';
import { UserRole } from './roles.enum';
export declare const hasRoles: (userRoles: UserRole[], requiredRoles: string[]) => boolean;
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authenticationService;
    constructor(authenticationService: AuthenticationService);
    validate(username: string, password: string): Promise<any>;
}
export declare class AuthorizationGuard implements CanActivate {
    private readonly reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
export {};
