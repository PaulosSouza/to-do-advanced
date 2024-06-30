import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { RegisterUserController } from '../controllers/register-user-controller';

const registerUserController = new RegisterUserController();

export async function usersRouter(app: FastifyInstance) {
  app.zod.post(
    '/users',
    {
      tags: ['users'],
      operationId: 'createUser',
      body: 'RegisterUserBodySchema',
    },
    async ({ body, diScope, t }, reply) => {
      await registerUserController.handle({
        body,
        i18n: t,
        useCase: diScope.cradle.registerUserUseCase,
        reply,
      });
    },
  );
}
