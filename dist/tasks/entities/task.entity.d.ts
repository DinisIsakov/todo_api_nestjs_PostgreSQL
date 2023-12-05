import { GroupEntity } from '../../groups/entities/group.entity';
export declare class TaskEntity {
    id: number;
    name: string;
    description: string;
    isDone: boolean;
    group: GroupEntity;
    groupId: number;
    createdAt: Date;
    updatedAt: Date;
}
