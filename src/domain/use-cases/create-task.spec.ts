import { InvalidNameLengthError } from '../entities/errors/invalid-name-length-error';

import { CreateTaskUseCase } from './create-task';

import { ResourceNotFoundError } from '@/core/error/use-cases/resource-not-found-error';
import { makeUser } from '@/test/factories/make-user';
import { InMemoryAuditsRepository } from '@/test/repositories/in-memory-audits-repository';
import { InMemoryTasksRepository } from '@/test/repositories/in-memory-tasks-repository';
import { InMemoryUsersRepository } from '@/test/repositories/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryAuditsRepository: InMemoryAuditsRepository;
let useCase: CreateTaskUseCase;

describe('Create Task', () => {
  inMemoryUsersRepository = new InMemoryUsersRepository();
  inMemoryTasksRepository = new InMemoryTasksRepository();
  inMemoryAuditsRepository = new InMemoryAuditsRepository();

  beforeEach(() => {
    useCase = new CreateTaskUseCase(
      inMemoryUsersRepository,
      inMemoryTasksRepository,
      inMemoryAuditsRepository,
    );
  });

  it('should be able to create a task', async () => {
    const user = makeUser();

    inMemoryUsersRepository.items.push(user);

    const result = await useCase.execute({
      name: 'Task example',
      userId: user.id,
      description: 'Description of task example',
    });

    expect(result.isSuccess()).toBeTruthy();
    expect(inMemoryTasksRepository.items).toHaveLength(1);
  });

  it('should not be able to create a task with invalid name', async () => {
    const user = makeUser();

    inMemoryUsersRepository.items.push(user);

    const result = await useCase.execute({
      name: 'A',
      userId: user.id,
    });

    expect(result.isFailure()).toBeTruthy();
    expect(result.value).toBeInstanceOf(InvalidNameLengthError);
  });

  it('should not be able to create a task with non-existent user', async () => {
    const result = await useCase.execute({
      name: 'Task example',
      userId: 'non-existent-user',
    });

    expect(result.isFailure()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
