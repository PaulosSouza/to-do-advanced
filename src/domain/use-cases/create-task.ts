import { TaskStatus } from '../enums/task-status';
import { UsersRepository } from '../repositories/users-repository';
import { AuditsRepository } from '../repositories/audits-repository';
import { TasksRepository } from '../repositories/tasks-repository';
import { InvalidNameLengthError } from '../entities/errors/invalid-name-length-error';
import { Name } from '../entities/value-objects/name';
import { Task } from '../entities/task';
import { Audit } from '../entities/audit';
import { Action } from '../enums/action';

import { Either, failure, success } from '@/core/logic/either';
import { ResourceNotFoundError } from '@/core/error/use-cases/resource-not-found-error';

interface CreateTaskUseCaseRequest {
  name: string;
  description?: string;
  status?: TaskStatus;
  userId: string;
}

type CreateTaskUseCaseError = ResourceNotFoundError | InvalidNameLengthError;

type CreateTaskUseCaseResponse = Either<
  CreateTaskUseCaseError,
  {
    task: Task;
  }
>;

export class CreateTaskUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tasksRepository: TasksRepository,
    private readonly auditsRepository: AuditsRepository,
  ) {}

  async execute({
    name,
    description,
    status,
    userId,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const nameOrError = Name.create(name);

    if (nameOrError.isFailure()) {
      return failure(new InvalidNameLengthError());
    }

    const userAlreadyExists = await this.usersRepository.findById(userId);

    if (!userAlreadyExists) {
      return failure(new ResourceNotFoundError(userId));
    }

    const task = Task.create({
      name: nameOrError.value,
      description,
      status,
      userId,
    });

    const { id: taskId } = await this.tasksRepository.create(task);

    task.id = taskId;

    const audit = Audit.create({
      action: Action.TaskCreated,
      userId,
      metadata: JSON.stringify({ name, description, status }),
    });

    await this.auditsRepository.create(audit);

    return success({
      task,
    });
  }
}
