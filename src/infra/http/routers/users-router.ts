import { FastifyInstance } from 'fastify';

import { RegisterUserController } from '../controllers/register-user-controller';

const registerUserController = new RegisterUserController();

export async function usersRouter(app: FastifyInstance) {
  app.zod.post(
    '/users',
    {
      operationId: 'createUser',
      body: 'RegisterUserBodySchema',
    },
    async ({ body, diScope }, reply) => {
      await registerUserController.handle({
        body,
        registerUserUseCase: diScope.cradle.registerUserUseCase,
        reply,
      });
    },
  );
}
