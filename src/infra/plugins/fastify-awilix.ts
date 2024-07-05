import { Cradle, diContainer, fastifyAwilixPlugin } from '@fastify/awilix';
import { Lifetime, asClass, asFunction } from 'awilix';
import { FastifyInstance } from 'fastify';

import { MongooseUsersRepository } from '../databases/mongoose/repositories/mongoose-users-repository';
import { TypeormAuditsRepository } from '../databases/typeorm/repositories/typeorm-audits-repository';
import { BcryptHashProvider } from '../providers/hash-provider/bcrypt-hash-provider';
import { MongooseTasksRepository } from '../databases/mongoose/repositories/mongoose-tasks-repository';

import { RegisterUserUseCase } from '@/domain/use-cases/register-user';
import { ValidateUserCredentialsUseCase } from '@/domain/use-cases/validate-user-credentials';
import { CreateTaskUseCase } from '@/domain/use-cases/create-task';

export async function loadFastifyAwilix(app: FastifyInstance) {
  await app.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
  });

  const config = {
    default: {
      lifetime: Lifetime.SINGLETON,
    },
    useCases: {
      lifetime: Lifetime.SCOPED,
    },
  };

  diContainer.register({
    // Repositories
    usersRepository: asClass(MongooseUsersRepository, config.default),
    tasksRepository: asClass(MongooseTasksRepository, config.default),
    auditsRepository: asClass(TypeormAuditsRepository, config.default),

    // Providers
    hashProvider: asClass(BcryptHashProvider, config.default),
  });

  app.addHook('onRequest', (request, _, done) => {
    request.diScope.register({
      // Register User Use Case
      registerUserUseCase: asFunction(
        ({ usersRepository, auditsRepository, hashProvider }: Cradle) =>
          new RegisterUserUseCase(
            usersRepository,
            auditsRepository,
            hashProvider,
          ),
        config.useCases,
      ),

      // Validate User Credentials Use Case
      validateUserCredentialsUseCase: asFunction(
        ({ usersRepository, auditsRepository, hashProvider }: Cradle) =>
          new ValidateUserCredentialsUseCase(
            usersRepository,
            auditsRepository,
            hashProvider,
          ),
        config.useCases,
      ),

      // Create Task Use Case
      createTaskUseCase: asFunction(
        ({ usersRepository, auditsRepository, tasksRepository }: Cradle) =>
          new CreateTaskUseCase(
            usersRepository,
            tasksRepository,
            auditsRepository,
          ),
        config.useCases,
      ),
    });

    done();
  });
}
