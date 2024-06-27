import { User } from '../entities/user';
import { Email } from '../entities/value-objects/email';
import { Name } from '../entities/value-objects/name';
import { UsersRepository } from '../repositories/users-repository';
import { Password, PasswordError } from '../entities/value-objects/password';
import { InvalidEmailError } from '../entities/errors/invalid-email-error';
import { InvalidNameLengthError } from '../entities/errors/invalid-name-length-error';
import { AuditsRepository } from '../repositories/audits-repository';
import { Audit } from '../entities/audit';
import { Action } from '../enums/action';
import { HashProvider } from '../providers/hash-provider';

import { AlreadyExists } from '@/core/error/use-cases/already-exists';
import { Either, failure, success } from '@/core/logic/either';

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterUserUseCaseError =
  | InvalidNameLengthError
  | PasswordError
  | InvalidEmailError
  | AlreadyExists;

type RegisterUserUseCaseResponse = Either<
  RegisterUserUseCaseError,
  {
    user: User;
  }
>;

export class RegisterUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly auditsRepository: AuditsRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

    if (nameOrError.isFailure()) {
      return failure(nameOrError.value);
    }

    if (emailOrError.isFailure()) {
      return failure(emailOrError.value);
    }

    if (passwordOrError.isFailure()) {
      return failure(passwordOrError.value);
    }

    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      return failure(new AlreadyExists(email));
    }

    const passwordHashed = await this.hashProvider.generate(password);

    const user = User.create({
      name: nameOrError.value,
      email: emailOrError.value,
      password: Password.createFromHashedPassword(passwordHashed),
    });

    const { id: userId } = await this.usersRepository.create(user);

    const audit = Audit.create({
      action: Action.UserRegistered,
      timestamp: new Date(),
      userId,
      metadata: JSON.stringify(user),
    });

    await this.auditsRepository.create(audit);

    return success({ user });
  }
}
