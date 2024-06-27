import 'awilix';
import '@fastify/awilix';

import { UsersRepository } from '@/domain/repositories/users-repository';
import { RegisterUserUseCase } from '@/domain/use-cases/register-user';
import { AuditsRepository } from '@/domain/repositories/audits-repository';
import { HashProvider } from '@/domain/providers/hash-provider';

declare module '@fastify/awilix' {
  interface Cradle {
    usersRepository: UsersRepository;
    auditsRepository: AuditsRepository;
    hashProvider: HashProvider;
  }

  interface RequestCradle {
    registerUserUseCase: RegisterUserUseCase;
  }
}
