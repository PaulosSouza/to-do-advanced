import type { FastifyReply } from 'fastify';

import { RegisterUserBody } from '../dtos/register-user-dto';

import { HttpStatusCode } from '@/core/infra/enums/http-status-code';
import { RegisterUserUseCase } from '@/domain/use-cases/register-user';

interface RegisterUserControllerProps {
  body: RegisterUserBody;
  registerUserUseCase: RegisterUserUseCase;
  reply: FastifyReply;
}

export class RegisterUserController {
  async handle({
    body: { email, name, password },
    registerUserUseCase,
    reply,
  }: RegisterUserControllerProps) {
    const result = await registerUserUseCase.execute({
      email,
      name,
      password,
    });

    if (result.isFailure()) {
      const error = result.value;

      return reply.status(HttpStatusCode.BadRequest).send({
        message: error.message,
      });
    }

    return reply.status(HttpStatusCode.Created).send();
  }
}
