import type { FastifyReply } from 'fastify';
import { TFunction } from 'i18next';

import { RegisterUserBody } from '../dtos/register-user-dto';

import { HttpStatusCode } from '@/core/infra/enums/http-status-code';
import { RegisterUserUseCase } from '@/domain/use-cases/register-user';

interface RegisterUserControllerProps {
  body: RegisterUserBody;
  useCase: RegisterUserUseCase;
  i18n: TFunction;
  reply: FastifyReply;
}

export class RegisterUserController {
  async handle({
    body: { email, name, password },
    i18n,
    useCase,
    reply,
  }: RegisterUserControllerProps) {
    const result = await useCase.execute({
      email,
      name,
      password,
    });

    if (result.isFailure()) {
      const error = result.value;

      return reply.status(HttpStatusCode.BadRequest).send({
        message: i18n(error.i18nKey, error.i18nResources),
      });
    }

    return reply.status(HttpStatusCode.Created).send();
  }
}
