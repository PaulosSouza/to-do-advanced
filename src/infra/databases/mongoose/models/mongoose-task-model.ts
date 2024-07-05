import { Schema, model, Document, Types } from 'mongoose';

import { TaskStatus } from '@/domain/enums/task-status';

interface Task {
  name: string;
  description?: string;
  status: TaskStatus;
  userId: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const taskSchema = new Schema<Task>({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
  },
});

export const MongooseTaskModel = model('Task', taskSchema, 'tasks');

export type MongooseTaskModelType = Document<unknown, object, Task> &
  Task & {
    _id: Types.ObjectId;
  };
