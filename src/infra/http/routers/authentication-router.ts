import { FastifyInstance } from 'fastify';

import { AuthenticateUserController } from '../controllers/authenticate-user-controller';

export async function authenticationRouter(app: FastifyInstance) {
  app.zod.post(
    '/login',
    {
      tags: ['authentication'],
      operationId: 'authenticateUser',
      body: 'AuthenticateUserRequestSchema',
      response: {
        200: {
          key: 'AuthenticateUserResponseSchema',
          description: 'Token JWT',
        },
      },
    },
    async ({ body, diScope }, reply) => {
      await AuthenticateUserController.handle({
        body,
        validateUserCredentialsUseCase:
          diScope.cradle.validateUserCredentialsUseCase,
        reply,
      });
    },
  );
}
