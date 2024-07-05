import { Task } from '@/domain/entities/task';
import { TasksRepository } from '@/domain/repositories/tasks-repository';

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  async create(task: Task): Promise<{ id: string }> {
    this.items.push(task);

    return { id: task.id };
  }
}
