import 'awilix';
import '@fastify/awilix';

import { UsersRepository } from '@/domain/repositories/users-repository';
import { AuditsRepository } from '@/domain/repositories/audits-repository';
import { TasksRepository } from '@/domain/repositories/tasks-repository';
import { HashProvider } from '@/domain/providers/hash-provider';
import { RegisterUserUseCase } from '@/domain/use-cases/register-user';
import { ValidateUserCredentialsUseCase } from '@/domain/use-cases/validate-user-credentials';
import { CreateTaskUseCase } from '@/domain/use-cases/create-task';

declare module '@fastify/awilix' {
  interface Cradle {
    usersRepository: UsersRepository;
    auditsRepository: AuditsRepository;
    tasksRepository: TasksRepository;
    hashProvider: HashProvider;
  }

  interface RequestCradle {
    registerUserUseCase: RegisterUserUseCase;
    validateUserCredentialsUseCase: ValidateUserCredentialsUseCase;
    createTaskUseCase: CreateTaskUseCase;
  }
}
