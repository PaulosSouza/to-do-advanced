import { UsersRepository } from '../repositories/users-repository';
import { HashProvider } from '../providers/hash-provider';
import { EncryptProvider } from '../providers/encrypt-provider';

import { WrongCredentialsError } from './errors/wrong-credentilas-error';

import { Either, failure, success } from '@/core/logic/either';

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseError = WrongCredentialsError;

type AuthenticateUserUseCaseResponse = Either<
  AuthenticateUserUseCaseError,
  {
    token: string;
  }
>;

export class AuthenticateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: HashProvider,
    private readonly encryptProvider: EncryptProvider,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return failure(new WrongCredentialsError());
    }

    const doesPasswordMatches = await this.hashProvider.compare(
      password,
      user.password.value,
    );

    if (!doesPasswordMatches) {
      return failure(new WrongCredentialsError());
    }

    const token = this.encryptProvider.encrypt({ sub: user.id });

    return success({ token });
  }
}
