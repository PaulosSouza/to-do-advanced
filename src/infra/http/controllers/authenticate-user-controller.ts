import type { FastifyReply } from 'fastify';

import { AuthenticateUserRequest } from '../dtos/authenticate-user-dto';

import { HttpStatusCode } from '@/core/infra/enums/http-status-code';
import { ValidateUserCredentialsUseCase } from '@/domain/use-cases/validate-user-credentials';

interface AuthenticateUserControllerProps {
  body: AuthenticateUserRequest;
  validateUserCredentialsUseCase: ValidateUserCredentialsUseCase;
  reply: FastifyReply;
}

export class AuthenticateUserController {
  public static async handle({
    body: { email, password },
    validateUserCredentialsUseCase,
    reply,
  }: AuthenticateUserControllerProps) {
    const result = await validateUserCredentialsUseCase.execute({
      email,
      password,
    });

    if (result.isFailure()) {
      const error = result.value;

      return reply.status(HttpStatusCode.BadRequest).send({
        message: error.message,
      });
    }

    const { user } = result.value;

    const token = await reply.jwtSign(
      {},
      {
        sign: { sub: user.id },
      },
    );

    return reply.status(HttpStatusCode.Ok).send({ token });
  }
}
