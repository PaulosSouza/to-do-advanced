import type { FastifyReply } from 'fastify';
import { TFunction } from 'i18next';

import { AuthenticateUserRequest } from '../dtos/authenticate-user-dto';

import { HttpStatusCode } from '@/core/infra/enums/http-status-code';
import { ValidateUserCredentialsUseCase } from '@/domain/use-cases/validate-user-credentials';

interface AuthenticateUserControllerProps {
  body: AuthenticateUserRequest;
  i18n: TFunction;
  useCase: ValidateUserCredentialsUseCase;
  reply: FastifyReply;
}

export class AuthenticateUserController {
  public static async handle({
    body: { email, password },
    i18n,
    useCase,
    reply,
  }: AuthenticateUserControllerProps) {
    const result = await useCase.execute({
      email,
      password,
    });

    if (result.isFailure()) {
      const error = result.value;

      return reply.status(HttpStatusCode.BadRequest).send({
        message: i18n(error.i18nKey, error.i18nResources),
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
