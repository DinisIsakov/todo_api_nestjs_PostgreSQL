import { Repository } from 'typeorm';
import { GroupEntity } from './entities/group.entity';
import { TaskEntity } from '../tasks/entities/task.entity';
import { CreateGroupDto } from './dtos/create-group.dto';
import { UpdateGroupDto } from './dtos/update-group.dto';
export declare class GroupService {
    private readonly groupRepository;
    private readonly taskRepository;
    private readonly logger;
    constructor(groupRepository: Repository<GroupEntity>, taskRepository: Repository<TaskEntity>);
    private findGroupById;
    findAll(extendsTasks: boolean): Promise<GroupEntity[]>;
    findOne(id: number): Promise<GroupEntity>;
    create(createGroupDto: CreateGroupDto): Promise<GroupEntity>;
    update(id: number, updateGroupDto: UpdateGroupDto): Promise<GroupEntity>;
    remove(id: number): Promise<void>;
    findGroupWithTasks(id: number): Promise<GroupEntity>;
    createTaskInGroup(groupId: number, task: TaskEntity): Promise<TaskEntity>;
    updateTaskInGroup(groupId: number, taskId: number, task: TaskEntity): Promise<TaskEntity>;
    removeTaskFromGroup(groupId: number, taskId: number): Promise<void>;
}
