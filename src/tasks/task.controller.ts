import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { RolesGuard } from '../authentication/roles.guard';
import { Request } from 'express';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Получение списка всех задач.
   * @return {Promise<TaskEntity[]>} Список задач.
   */
  @Get()
  @UseGuards(RolesGuard)
  async getAllTasks(): Promise<TaskEntity[]> {
    return this.taskService.getAllTasks();
  }

  /**
   * Получение информации о задаче по ее идентификатору.
   * @param {string} id Идентификатор задачи.
   * @return {Promise<TaskEntity>} Задача.
   */
  @Get(':id')
  @UseGuards(RolesGuard)
  async getTaskById(@Param('id') id: string): Promise<TaskEntity> {
    const taskId = Number(id);
    return this.taskService.getTaskById(taskId);
  }

  /**
   * Создание новой задачи.
   * @param {CreateTaskDto} createTaskDto DTO для создания задачи.
   * @param {Request} req Запрос Express.
   * @return {Promise<TaskEntity>} Созданная задача.
   */
  @Post()
  @UseGuards(RolesGuard)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: Request,
  ): Promise<TaskEntity> {
    return this.taskService.createTask(createTaskDto, req.user.roles);
  }

  /**
   * Обновление информации о задаче по ее идентификатору.
   * @param {string} id Идентификатор задачи.
   * @param {UpdateTaskDto} updateTaskDto DTO для обновления задачи.
   * @param {Request} req Запрос Express.
   * @return {Promise<TaskEntity>} Обновленная задача.
   */
  @Patch(':id')
  @UseGuards(RolesGuard)
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
  ): Promise<TaskEntity> {
    const taskId = Number(id);
    return this.taskService.updateTask(taskId, updateTaskDto, req.user.roles);
  }

  /**
   * Отметка задачи как выполненной по ее идентификатору.
   * @param {string} id Идентификатор задачи.
   * @param {Request} req Запрос Express.
   * @return {Promise<TaskEntity>} Обновленная задача.
   */
  @Patch(':id/done')
  @UseGuards(RolesGuard)
  async markTaskAsDone(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<TaskEntity> {
    const taskId = Number(id);
    return this.taskService.markTaskAsDone(taskId, req.user.roles);
  }

  /**
   * Удаление задачи по ее идентификатору.
   * @param {string} id Идентификатор задачи.
   * @param {Request} req Запрос Express.
   * @return {Promise<void>}
   */
  @Delete(':id')
  @UseGuards(RolesGuard)
  async deleteTask(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    const taskId = Number(id);
    await this.taskService.deleteTask(taskId, req.user.roles);
  }
}
