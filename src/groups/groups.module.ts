import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { TaskEntity } from '../tasks/entities/task.entity';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, TaskEntity])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupsModule {}
