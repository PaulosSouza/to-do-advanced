import type { FastifyReply } from 'fastify';
import { TFunction } from 'i18next';

import { CreateTaskRequest } from '../dtos/create-task-dto';
import { TaskPresenter } from '../presenters/create-task-presenter';

import { HttpStatusCode } from '@/core/infra/enums/http-status-code';
import { CreateTaskUseCase } from '@/domain/use-cases/create-task';

interface CreateTaskControllerProps {
  userId: string;
  body: CreateTaskRequest;
  useCase: CreateTaskUseCase;
  i18n: TFunction;
  reply: FastifyReply;
}

export class CreateTaskController {
  static async handle({
    userId,
    body: { name, description, status },
    i18n,
    useCase,
    reply,
  }: CreateTaskControllerProps) {
    const result = await useCase.execute({
      name,
      description,
      status,
      userId,
    });

    if (result.isFailure()) {
      const error = result.value;

      return reply.status(HttpStatusCode.BadRequest).send({
        message: i18n(error.i18nKey, error.i18nResources),
      });
    }

    const { task } = result.value;

    const output = TaskPresenter.toHTTP(task);

    return reply.status(HttpStatusCode.Created).send(output);
  }
}
