import { TaskEntity } from '../../tasks/entities/task.entity';
export declare class GroupEntity {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: TaskEntity[];
}
