import { Cradle, diContainer, fastifyAwilixPlugin } from '@fastify/awilix';
import { Lifetime, asClass, asFunction } from 'awilix';
import { FastifyInstance } from 'fastify';

import { MongooseUsersRepository } from '../databases/mongoose/repositories/mongoose-users-repository';
import { TypeormAuditsRepository } from '../databases/typeorm/repositories/typeorm-audits-repository';
import { BcryptHashProvider } from '../providers/hash-provider/bcrypt-hash-provider';

import { RegisterUserUseCase } from '@/domain/use-cases/register-user';
import { ValidateUserCredentialsUseCase } from '@/domain/use-cases/validate-user-credentials';

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

      // Validate User Use Case
      validateUserCredentialsUseCase: asFunction(
        ({ usersRepository, hashProvider }: Cradle) =>
          new ValidateUserCredentialsUseCase(usersRepository, hashProvider),
        config.useCases,
      ),
    });

    done();
  });
}
