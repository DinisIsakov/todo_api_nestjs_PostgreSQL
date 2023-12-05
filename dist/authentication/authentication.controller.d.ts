import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dtos/create-authentication.dto';
export declare class AuthenticationController {
    private readonly authService;
    constructor(authService: AuthenticationService);
    login(req: any): Promise<{
        token: string;
    }>;
    register(createAuthenticationDto: CreateAuthenticationDto): Promise<{
        token: string;
        role: string;
    }>;
}
