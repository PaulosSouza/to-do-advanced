import {
  type MongooseTaskModelType,
  MongooseTaskModel,
} from '../models/mongoose-task-model';

import { Name } from '@/domain/entities/value-objects/name';
import { Task } from '@/domain/entities/task';

export class MongooseTaskMapper {
  public static toDomain(raw: MongooseTaskModelType) {
    const nameOrError = Name.create(raw.name);

    if (nameOrError.isFailure()) {
      throw new Error('Required task props are invalid!');
    }

    return Task.create(
      {
        name: nameOrError.value,
        description: raw.description,
        userId: raw.userId,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        deletedAt: raw.deleted_at,
      },
      raw.id,
    );
  }

  public static toPersistency(task: Task) {
    return new MongooseTaskModel({
      name: task.name.value,
      description: task.description,
      userId: task.userId,
      created_at: task.createdAt,
      updated_at: task.updatedAt,
      deleted_at: task.deletedAt,
    });
  }
}
