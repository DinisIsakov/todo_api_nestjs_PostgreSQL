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
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const group_service_1 = require("./group.service");
const create_group_dto_1 = require("./dtos/create-group.dto");
const update_group_dto_1 = require("./dtos/update-group.dto");
const task_entity_1 = require("../tasks/entities/task.entity");
const roles_decorator_1 = require("../authentication/roles.decorator");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    findAll(extendsTasks) {
        const extendsTasksBool = extendsTasks === 'true';
        return this.groupService.findAll(extendsTasksBool);
    }
    findOne(id) {
        return this.groupService.findOne(Number(id));
    }
    create(createGroupDto) {
        return this.groupService.create(createGroupDto);
    }
    update(id, updateGroupDto) {
        return this.groupService.update(Number(id), updateGroupDto);
    }
    remove(id) {
        return this.groupService.remove(Number(id));
    }
    findGroupWithTasks(id) {
        return this.groupService.findGroupWithTasks(Number(id));
    }
    createTaskInGroup(id, task) {
        return this.groupService.createTaskInGroup(Number(id), task);
    }
    updateTaskInGroup(groupId, taskId, task) {
        return this.groupService.updateTaskInGroup(Number(groupId), Number(taskId), task);
    }
    removeTaskFromGroup(groupId, taskId) {
        return this.groupService.removeTaskFromGroup(Number(groupId), Number(taskId));
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('reader', 'admin'),
    __param(0, (0, common_1.Query)('extends')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('reader', 'admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_dto_1.CreateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_group_dto_1.UpdateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/tasks'),
    (0, roles_decorator_1.Roles)('reader', 'admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findGroupWithTasks", null);
__decorate([
    (0, common_1.Post)(':id/tasks'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, task_entity_1.TaskEntity]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "createTaskInGroup", null);
__decorate([
    (0, common_1.Patch)(':groupId/tasks/:taskId'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, task_entity_1.TaskEntity]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "updateTaskInGroup", null);
__decorate([
    (0, common_1.Delete)(':groupId/tasks/:taskId'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "removeTaskFromGroup", null);
exports.GroupController = GroupController = __decorate([
    (0, common_1.Controller)('groups'),
    __metadata("design:paramtypes", [group_service_1.GroupService])
], GroupController);
//# sourceMappingURL=group.controller.js.map