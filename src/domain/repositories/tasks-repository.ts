import { Task } from '../entities/task';

export interface TasksRepository {
  create(task: Task): Promise<{ id: string }>;
}
