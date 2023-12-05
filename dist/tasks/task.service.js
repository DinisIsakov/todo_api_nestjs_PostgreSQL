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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getAllTasks() {
        try {
            return await this.taskRepository.find();
        }
        catch (error) {
            throw error;
        }
    }
    async getTaskById(id) {
        try {
            return await this.taskRepository.findOne({ where: { id } });
        }
        catch (error) {
            throw error;
        }
    }
    async createTask(createTaskDto) {
        try {
            const task = this.taskRepository.create(createTaskDto);
            return await this.taskRepository.save(task);
        }
        catch (error) {
            throw error;
        }
    }
    async updateTask(id, updateTaskDto) {
        try {
            const task = await this.getTaskById(id);
            this.taskRepository.merge(task, updateTaskDto);
            return await this.taskRepository.save(task);
        }
        catch (error) {
            throw error;
        }
    }
    async markTaskAsDone(id) {
        try {
            const task = await this.getTaskById(id);
            task.isDone = true;
            return await this.taskRepository.save(task);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteTask(id) {
        try {
            const task = await this.getTaskById(id);
            await this.taskRepository.remove(task);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map