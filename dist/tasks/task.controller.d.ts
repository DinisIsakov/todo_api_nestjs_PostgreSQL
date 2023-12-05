import { TaskService } from './task.service';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAllTasks(): Promise<TaskEntity[]>;
    getTaskById(id: string): Promise<TaskEntity>;
    createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity>;
    markTaskAsDone(id: string): Promise<TaskEntity>;
    deleteTask(id: string): Promise<void>;
}
