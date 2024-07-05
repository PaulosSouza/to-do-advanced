import { MongooseTaskMapper } from '../mappers/mongoose-task-mapper';

import { Task } from '@/domain/entities/task';
import { TasksRepository } from '@/domain/repositories/tasks-repository';

export class MongooseTasksRepository implements TasksRepository {
  async create(task: Task): Promise<{ id: string }> {
    const taskData = MongooseTaskMapper.toPersistency(task);

    await taskData.save();

    return { id: taskData.id };
  }
}
