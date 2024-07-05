import { CreateTaskResponse } from '../dtos/create-task-dto';

import { Task } from '@/domain/entities/task';

export class TaskPresenter {
  static toHTTP(task: Task): CreateTaskResponse {
    return {
      id: task.id.toString(),
      name: task.name.value,
      description: task.description,
      userId: task.userId,
      status: task.status,
      created_at: task.createdAt,
    };
  }
}
