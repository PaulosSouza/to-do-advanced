import { Task } from '@/domain/entities/task';
import { TasksRepository } from '@/domain/repositories/tasks-repository';

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  async create(task: Task): Promise<void> {
    this.items.push(task);
  }
}
