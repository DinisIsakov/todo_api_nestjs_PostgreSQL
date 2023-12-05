import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from './entities/group.entity';
import { TaskEntity } from '../tasks/entities/task.entity';
import { CreateGroupDto } from './dtos/create-group.dto';
import { UpdateGroupDto } from './dtos/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  /**
   * Получение списка всех групп.
   * @return {Promise<GroupEntity[]>} Список групп.
   */
  async findAll(): Promise<GroupEntity[]> {
    return this.groupRepository.find();
  }

  /**
   * Получение списка всех групп с возможностью включения задач.
   * @param {boolean} includeTasks Флаг включения задач в группы.
   * @return {Promise<GroupEntity[]>} Список групп.
   */
  async findAllWithTasks(includeTasks: boolean = true): Promise<GroupEntity[]> {
    if (includeTasks) {
      return this.groupRepository.find({ relations: ['tasks'] });
    } else {
      return this.groupRepository.find();
    }
  }

  /**
   * Получение информации о группе по ее идентификатору.
   * @param {number} id Идентификатор группы.
   * @return {Promise<GroupEntity>} Информация о группе.
   * @throws {NotFoundException} Если группа не найдена.
   */
  async findById(id: number): Promise<GroupEntity> {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!group) {
      throw new NotFoundException(`Группа с ID ${id} не найдена`);
    }

    return group;
  }

  /**
   * Создание новой группы.
   * @param {CreateGroupDto} createGroupDto DTO для создания группы.
   * @param {string[]} userRoles Роли пользователя.
   * @return {Promise<GroupEntity>} Созданная группа.
   * @throws {ForbiddenException} Если у пользователя нет прав для создания группы.
   * @throws {ForbiddenException} Если группа с таким именем уже существует.
   */
  async create(createGroupDto: CreateGroupDto, userRoles: string[]) {
    if (!userRoles.includes('admin')) {
      throw new ForbiddenException('Недостаточно прав для создания группы');
    }

    // Проверяем, существует ли группа с таким же именем
    const existingGroup = await this.groupRepository.findOne({
      where: { name: createGroupDto.name },
    });

    if (existingGroup) {
      throw new ForbiddenException(
        `Группа с именем ${createGroupDto.name} уже существует`,
      );
    }

    // Создаем новую группу и сохраняем
    const newGroup = this.groupRepository.create(createGroupDto);
    return await this.groupRepository.save(newGroup);
  }

  /**
   * Обновление информации о группе.
   * @param {number} id Идентификатор группы.
   * @param {UpdateGroupDto} updateGroupDto DTO для обновления группы.
   * @param {string[]} userRoles Роли пользователя.
   * @return {Promise<GroupEntity>} Обновленная группа.
   * @throws {ForbiddenException} Если у пользователя нет прав на обновление группы.
   * @throws {NotFoundException} Если группа не найдена.
   */
  async update(
    id: number,
    updateGroupDto: UpdateGroupDto,
    userRoles: string[],
  ): Promise<GroupEntity> {
    if (!userRoles.includes('admin')) {
      throw new ForbiddenException('Недостаточно прав для обновления группы');
    }

    const group = await this.groupRepository.findOne({ where: { id } });

    if (!group) {
      throw new NotFoundException(`Группа с ID ${id} не найдена`);
    }

    if (updateGroupDto.name) {
      group.name = updateGroupDto.name;
    }

    if (updateGroupDto.description) {
      group.description = updateGroupDto.description;
    }

    group.updatedAt = new Date();

    await this.groupRepository.save(group);

    // Удаляем связанные задачи перед обновлением
    if (group.tasks && group.tasks.length > 0) {
      for (const task of group.tasks) {
        await this.taskRepository.remove(task);
      }
    }

    return group;
  }

  /**
   * Удаление группы.
   * @param {number} id Идентификатор группы.
   * @param {string[]} userRoles Роли пользователя.
   * @return {Promise<void>}
   * @throws {ForbiddenException} Если у пользователя нет прав на удаление группы.
   * @throws {NotFoundException} Если группа не найдена.
   */
  async delete(id: number, userRoles: string[]): Promise<void> {
    if (!userRoles.includes('admin')) {
      throw new ForbiddenException('Недостаточно прав для удаления группы');
    }

    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!group) {
      throw new NotFoundException(`Группа с ID ${id} не найдена`);
    }

    // Удаляем задачи, если они существуют
    if (group.tasks && group.tasks.length > 0) {
      for (const task of group.tasks) {
        await this.taskRepository.remove(task);
      }
    }

    // Удаляем саму группу
    await this.groupRepository.remove(group);
  }
}
