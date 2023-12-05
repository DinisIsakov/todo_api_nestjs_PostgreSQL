import { GroupService } from './group.service';
import { GroupEntity } from './entities/group.entity';
import { CreateGroupDto } from './dtos/create-group.dto';
import { UpdateGroupDto } from './dtos/update-group.dto';
import { TaskEntity } from '../tasks/entities/task.entity';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    findAll(extendsTasks: string): Promise<GroupEntity[]>;
    findOne(id: string): Promise<GroupEntity>;
    create(createGroupDto: CreateGroupDto): Promise<GroupEntity>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<GroupEntity>;
    remove(id: string): Promise<void>;
    findGroupWithTasks(id: string): Promise<GroupEntity>;
    createTaskInGroup(id: string, task: TaskEntity): Promise<TaskEntity>;
    updateTaskInGroup(groupId: string, taskId: string, task: TaskEntity): Promise<TaskEntity>;
    removeTaskFromGroup(groupId: string, taskId: string): Promise<void>;
}
