import { FastifyInstance } from 'fastify';

import { usersRouter } from './users-router';

export async function indexRouter(app: FastifyInstance) {
  app.register(usersRouter);
}
