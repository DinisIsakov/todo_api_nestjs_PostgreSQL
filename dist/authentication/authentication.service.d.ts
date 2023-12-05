import { Repository } from 'typeorm';
import { AuthenticationEntity } from './entities/authentication.entity';
import { CreateAuthenticationDto } from './dtos/create-authentication.dto';
export declare class AuthenticationService {
    private usersRepository;
    constructor(usersRepository: Repository<AuthenticationEntity>);
    register(createAuthenticationDto: CreateAuthenticationDto): Promise<{
        token: string;
        role: string;
    }>;
    validateUser(username: string, password: string): Promise<AuthenticationEntity>;
    login(username: string, password: string): Promise<{
        token: string;
    }>;
    private generateToken;
    private getUserRolesFromDatabase;
}
