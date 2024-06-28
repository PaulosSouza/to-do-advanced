import { FastifyInstance } from 'fastify';

import { usersRouter } from './users-router';
import { authenticationRouter } from './authentication-router';

export async function indexRouter(app: FastifyInstance) {
  app.register(usersRouter);
  app.register(authenticationRouter);
}
