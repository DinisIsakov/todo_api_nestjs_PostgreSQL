import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  /**
   * Получает список всех задач.
   */
  async getAllTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  /**
   * Получает задачу по ее идентификатору.
   * @param {number} id Идентификатор задачи.
   * @return {Promise<TaskEntity>} Задача.
   * @throws {NotFoundException} Если задача с указанным идентификатором не найдена.
   */
  async getTaskById(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    return task;
  }

  /**
   * Создает новую задачу.
   * @param {CreateTaskDto} createTaskDto DTO для создания задачи.
   * @param {string[]} userRoles Роли пользователя.
   * @return {Promise<TaskEntity>} Созданная задача.
   * @throws {ForbiddenException} Если у пользователя нет прав на создание задачи.
   * @throws {ForbiddenException} Если задача с таким именем уже существует.
   */
  async createTask(
    createTaskDto: CreateTaskDto,
    userRoles: string[],
  ): Promise<TaskEntity> {
    this.checkAdminRole(userRoles, 'Создание задачи');

    // Проверяем, существует ли задача с таким же именем
    const existingTask = await this.taskRepository.findOne({
      where: { name: createTaskDto.name },
    });

    if (existingTask) {
      throw new ForbiddenException(
        `Задача с именем ${createTaskDto.name} уже существует`,
      );
    }

    // Создаем новую задачу и сохраняем
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  /**
   * Обновляет задачу по ее идентификатору.
   * @param {number} id Идентификатор задачи.
   * @param {UpdateTaskDto} updateTaskDto DTO для обновления задачи.
   * @param {string[]} userRoles Роли пользователя.
   * @return {Promise<TaskEntity>} Обновленная задача.
   * @throws {ForbiddenException} Если у пользователя нет прав на обновление задачи.
   * @throws {NotFoundException} Если задача с указанным идентификатором не найдена.
   */
  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userRoles: string[],
  ): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    this.checkAdminRole(userRoles, 'Обновление задачи');

    this.taskRepository.merge(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  /**
   * Отмечает задачу как выполненную.
   * @param {number} id Идентификатор задачи.
   * @param {string[]} userRoles Роли пользователя.
   * @return {Promise<TaskEntity>} Обновленная задача.
   * @throws {ForbiddenException} Если у пользователя нет прав на отметку задачи как выполненной.
   * @throws {NotFoundException} Если задача с указанным идентификатором не найдена.
   */
  async markTaskAsDone(id: number, userRoles: string[]): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    this.checkAdminRole(userRoles, 'Отметка задачи как выполненная');

    task.isDone = true;
    return this.taskRepository.save(task);
  }

  /**
   * Удаляет задачу по ее идентификатору.
   * @param {number} id Идентификатор задачи.
   * @param {string[]} userRoles Роли пользователя.
   * @throws {ForbiddenException} Если у пользователя нет прав на удаление задачи.
   * @throws {NotFoundException} Если задача с указанным идентификатором не найдена.
   */
  async deleteTask(id: number, userRoles: string[]): Promise<void> {
    const task = await this.getTaskById(id);
    this.checkAdminRole(userRoles, 'Удаление задачи');

    await this.taskRepository.remove(task);
  }

  /**
   * Проверяет наличие у пользователя прав на выполнение определенного действия.
   * @param {string[]} userRoles Роли пользователя.
   * @param {string} action Действие, для которого проверяются права.
   * @throws {ForbiddenException} Если у пользователя нет необходимых прав.
   */
  private checkAdminRole(userRoles: string[], action: string): void {
    if (!userRoles.includes('admin')) {
      throw new ForbiddenException(`Недостаточно прав для ${action}`);
    }
  }
}
