import { FastifyInstance } from 'fastify';

import { CreateTaskController } from '../controllers/create-task-controller';

export async function tasksRouter(app: FastifyInstance) {
  app.zod.post(
    '/tasks',
    {
      tags: ['tasks'],
      operationId: 'createTask',
      body: 'CreateTaskRequestSchema',
      response: {
        200: {
          key: 'CreateTaskResponseSchema',
          description: 'Task created.',
        },
      },
    },
    async ({ body, diScope, t, ...rest }, reply) => {
      await CreateTaskController.handle({
        useCase: diScope.cradle.createTaskUseCase,
        userId: rest.user.sub,
        body,
        i18n: t,
        reply,
      });
    },
  );
}
