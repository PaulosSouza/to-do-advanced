import { z } from 'zod';

import { TaskStatus } from '@/domain/enums/task-status';

export const CreateTaskRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).optional(),
});

export const CreateTaskResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  created_at: z.date(),
});

export type CreateTaskRequest = z.infer<typeof CreateTaskRequestSchema>;

export type CreateTaskResponse = z.infer<typeof CreateTaskResponseSchema>;
