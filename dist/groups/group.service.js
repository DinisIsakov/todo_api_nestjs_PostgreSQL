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
var GroupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const group_entity_1 = require("./entities/group.entity");
const task_entity_1 = require("../tasks/entities/task.entity");
let GroupService = GroupService_1 = class GroupService {
    constructor(groupRepository, taskRepository) {
        this.groupRepository = groupRepository;
        this.taskRepository = taskRepository;
        this.logger = new common_1.Logger(GroupService_1.name);
    }
    async findGroupById(id, relations) {
        const options = relations
            ? { where: { id }, relations }
            : { where: { id } };
        const group = await this.groupRepository.findOne(options);
        if (!group) {
            throw new common_1.NotFoundException(`Группа с ID ${id} не найдена`);
        }
        return group;
    }
    async findAll(extendsTasks) {
        const relations = extendsTasks ? ['tasks'] : undefined;
        return this.groupRepository.find({ relations });
    }
    async findOne(id) {
        return this.findGroupById(id, ['tasks']);
    }
    async create(createGroupDto) {
        this.logger.log(`Создание группы: ${JSON.stringify(createGroupDto)}`);
        const group = this.groupRepository.create(createGroupDto);
        return await this.groupRepository.save(group);
    }
    async update(id, updateGroupDto) {
        this.logger.log(`Обновление группы с ID ${id}: ${JSON.stringify(updateGroupDto)}`);
        const existingGroup = await this.findGroupById(id, ['tasks']);
        this.groupRepository.merge(existingGroup, updateGroupDto);
        return this.groupRepository.save(existingGroup);
    }
    async remove(id) {
        this.logger.log(`Удаление группы с ID ${id}`);
        const group = await this.findGroupById(id);
        await this.groupRepository.remove(group);
    }
    async findGroupWithTasks(id) {
        return this.findGroupById(id, ['tasks']);
    }
    async createTaskInGroup(groupId, task) {
        const group = await this.findGroupById(groupId);
        const taskWithGroup = { ...task, group };
        return this.taskRepository.save(taskWithGroup);
    }
    async updateTaskInGroup(groupId, taskId, task) {
        const group = await this.findGroupById(groupId, ['tasks']);
        const existingTask = group.tasks.find((t) => t.id === taskId);
        if (!existingTask) {
            throw new common_1.NotFoundException(`Задача с ID ${taskId} не найдена в группе ${groupId}`);
        }
        Object.assign(existingTask, task);
        return this.taskRepository.save(existingTask);
    }
    async removeTaskFromGroup(groupId, taskId) {
        const group = await this.findGroupById(groupId, ['tasks']);
        const taskToRemove = group.tasks.find((t) => t.id === taskId);
        if (!taskToRemove) {
            throw new common_1.NotFoundException(`Задача с ID ${taskId} не найдена в группе ${groupId}`);
        }
        await this.taskRepository.remove(taskToRemove);
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = GroupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_entity_1.GroupEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(task_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GroupService);
//# sourceMappingURL=group.service.js.map