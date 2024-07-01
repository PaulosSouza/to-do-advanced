import { TaskStatus } from '../enums/task-status';

import { Name } from './value-objects/name';

import { Optional } from '@/core/types/optional';
import { Entity, EntityProps } from '@/core/entities/entity';

export interface TaskProps extends EntityProps {
  name: Name;
  description?: string;
  status: TaskStatus;
  userId: string;
}

export class Task extends Entity<TaskProps> {
  static create(props: Optional<TaskProps, 'status'>, id?: string) {
    const task = new Task(
      {
        status: props.status ?? TaskStatus.Pending,
        ...props,
      },
      id,
    );

    return task;
  }
}
