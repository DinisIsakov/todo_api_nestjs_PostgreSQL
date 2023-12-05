"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const authentication_service_1 = require("./authentication.service");
const create_authentication_dto_1 = require("./dtos/create-authentication.dto");
const roles_decorator_1 = require("./roles.decorator");
let AuthenticationController = class AuthenticationController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        try {
            const result = await this.authService.login(req.body.username, req.body.password);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async register(createAuthenticationDto) {
        try {
            const result = await this.authService.register(createAuthenticationDto);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthenticationController = AuthenticationController;
__decorate([
    (0, common_1.Post)('login'),
    (0, roles_decorator_1.Roles)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, roles_decorator_1.Roles)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_authentication_dto_1.CreateAuthenticationDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "register", null);
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, common_1.Controller)('authentication'),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], AuthenticationController);
//# sourceMappingURL=authentication.controller.js.map