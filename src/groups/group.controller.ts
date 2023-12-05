import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dtos/create-group.dto';
import { UpdateGroupDto } from './dtos/update-group.dto';
import { Request } from 'express';
import { RolesGuard } from '../authentication/roles.guard';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  /**
   * Получение списка групп.
   * @param {string} extendsTasks Флаг расширения информации о задачах в группах.
   * @return {Promise<any>} Список групп или группы с расширенной информацией о задачах.
   * @throws {InternalServerErrorException} Если произошла внутренняя ошибка сервера.
   */
  @Get()
  @UseGuards(RolesGuard)
  async getGroups(@Query('extends') extendsTasks: string) {
    try {
      const shouldExtendTasks: boolean = extendsTasks === 'true';

      if (!shouldExtendTasks) {
        return this.groupService.findAll();
      }

      return this.groupService.findAllWithTasks();
    } catch (error) {
      console.error('Ошибка при получении групп:', error);
      throw new InternalServerErrorException('Внутренняя ошибка сервера');
    }
  }

  /**
   * Получение информации о конкретной группе по ID.
   * @param {string} id Идентификатор группы.
   * @return {Promise<any>} Информация о группе.
   * @throws {InternalServerErrorException} Если произошла внутренняя ошибка сервера.
   */
  @Get(':id')
  @UseGuards(RolesGuard)
  async getGroupById(@Param('id') id: string) {
    try {
      return this.groupService.findById(parseInt(id, 10));
    } catch (error) {
      console.error('Ошибка при получении информации о группе по ID:', error);
      throw new InternalServerErrorException('Внутренняя ошибка сервера');
    }
  }

  /**
   * Создание новой группы.
   * @param {CreateGroupDto} createGroupDto DTO для создания группы.
   * @param {Request} req Запрос Express.
   * @return {Promise<any>} Созданная группа.
   * @throws {InternalServerErrorException} Если произошла внутренняя ошибка сервера.
   */
  @Post()
  @UseGuards(RolesGuard)
  async createGroup(
    @Body() createGroupDto: CreateGroupDto,
    @Req() req: Request,
  ) {
    try {
      return this.groupService.create(createGroupDto, req.user.roles);
    } catch (error) {
      console.error('Ошибка при создании группы:', error);
      throw new InternalServerErrorException('Внутренняя ошибка сервера');
    }
  }

  /**
   * Обновление информации о группе по ID.
   * @param {string} id Идентификатор группы.
   * @param {UpdateGroupDto} updateGroupDto DTO для обновления информации о группе.
   * @param {Request} req Запрос Express.
   * @return {Promise<any>} Обновленная группа.
   * @throws {InternalServerErrorException} Если произошла внутренняя ошибка сервера.
   */
  @Patch(':id')
  @UseGuards(RolesGuard)
  async updateGroup(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @Req() req: Request,
  ) {
    try {
      return this.groupService.update(
        parseInt(id, 10),
        updateGroupDto,
        req.user.roles,
      );
    } catch (error) {
      console.error('Ошибка при обновлении информации о группе:', error);
      throw new InternalServerErrorException('Внутренняя ошибка сервера');
    }
  }

  /**
   * Удаление группы по ID.
   * @param {string} id Идентификатор группы.
   * @param {Request} req Запрос Express.
   * @return {Promise<any>}
   * @throws {InternalServerErrorException} Если произошла внутренняя ошибка сервера.
   */
  @Delete(':id')
  @UseGuards(RolesGuard)
  async deleteGroup(@Param('id') id: string, @Req() req: Request) {
    try {
      return this.groupService.delete(parseInt(id, 10), req.user.roles);
    } catch (error) {
      console.error('Ошибка при удалении группы:', error);
      throw new InternalServerErrorException('Внутренняя ошибка сервера');
    }
  }
}
