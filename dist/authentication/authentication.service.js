"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const jwt = __importStar(require("jsonwebtoken"));
const authentication_entity_1 = require("./entities/authentication.entity");
const roles_enum_1 = require("./roles.enum");
const create_authentication_dto_1 = require("./dtos/create-authentication.dto");
const roles_decorator_1 = require("./roles.decorator");
let AuthenticationService = class AuthenticationService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async register(createAuthenticationDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { username: createAuthenticationDto.username },
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException('User with this username already exists');
        }
        let userRole;
        if (createAuthenticationDto.username === 'admin' &&
            createAuthenticationDto.password === 'admin') {
            userRole = roles_enum_1.UserRole.Admin;
        }
        else {
            userRole = roles_enum_1.UserRole.Reader;
        }
        const token = this.generateToken({
            sub: existingUser ? existingUser.id : undefined,
            username: createAuthenticationDto.username,
        });
        const newUser = this.usersRepository.create({
            ...createAuthenticationDto,
            roles: userRole,
            token,
        });
        const savedUser = await this.usersRepository.save(newUser);
        return { token, role: savedUser.roles };
    }
    async validateUser(username, password) {
        const user = await this.usersRepository.findOne({
            where: { username, password },
        });
        if (user) {
            return user;
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async login(username, password) {
        const user = await this.validateUser(username, password);
        if (user.token) {
            return { token: user.token };
        }
        const token = this.generateToken({
            sub: user.id,
            username: user.username,
        });
        user.token = token;
        await this.usersRepository.save(user);
        return { token };
    }
    generateToken(payload) {
        const secretKey = 'secret-key';
        const expiresIn = '1h';
        return jwt.sign(payload, secretKey, { expiresIn });
    }
    async getUserRolesFromDatabase(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        return [user.roles];
    }
};
exports.AuthenticationService = AuthenticationService;
__decorate([
    (0, roles_decorator_1.Roles)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_authentication_dto_1.CreateAuthenticationDto]),
    __metadata("design:returntype", Promise)
], AuthenticationService.prototype, "register", null);
__decorate([
    (0, roles_decorator_1.Roles)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthenticationService.prototype, "validateUser", null);
__decorate([
    (0, roles_decorator_1.Roles)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthenticationService.prototype, "login", null);
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(authentication_entity_1.AuthenticationEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map