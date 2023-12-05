import { UserRole } from '../roles.enum';
export declare class AuthenticationEntity {
    id: number;
    username: string;
    password: string;
    roles: UserRole;
    token: string | null;
}
