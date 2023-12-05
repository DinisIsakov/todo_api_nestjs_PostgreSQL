import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<TaskEntity>);
    getAllTasks(): Promise<TaskEntity[]>;
    getTaskById(id: number): Promise<TaskEntity>;
    createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
    updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity>;
    markTaskAsDone(id: number): Promise<TaskEntity>;
    deleteTask(id: number): Promise<void>;
}
