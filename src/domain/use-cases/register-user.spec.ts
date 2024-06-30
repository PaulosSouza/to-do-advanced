import { InvalidNameLengthError } from '../entities/errors/invalid-name-length-error';
import { InvalidEmailError } from '../entities/errors/invalid-email-error';
import { InvalidPasswordLengthError } from '../entities/errors/invalid-password-length-error';
import { AtLeastOneSpecialCharacterPasswordError } from '../entities/errors/at-least-one-special-character-password-error';

import { RegisterUserUseCase } from './register-user';

import { FakeHashProvider } from '@/test/providers/fake-hash-provider';
import { InMemoryAuditsRepository } from '@/test/repositories/in-memory-audits-repository';
import { InMemoryUsersRepository } from '@/test/repositories/in-memory-users-repository';
import { AlreadyExistsError } from '@/core/error/use-cases/already-exists-error';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryAuditsRepository: InMemoryAuditsRepository;
let fakeHashProvider: FakeHashProvider;

let useCase: RegisterUserUseCase;

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryAuditsRepository = new InMemoryAuditsRepository();
    fakeHashProvider = new FakeHashProvider();

    useCase = new RegisterUserUseCase(
      inMemoryUsersRepository,
      inMemoryAuditsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to register a user', async () => {
    const result = await useCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1@Password',
    });

    expect(result.isSuccess()).toBeTruthy();

    expect(inMemoryUsersRepository.items).toHaveLength(1);
    expect(inMemoryAuditsRepository.items).toHaveLength(1);
    expect(inMemoryUsersRepository.items[0].password.value).toContain(
      '-hashed',
    );
  });

  it('should not be able to register a user with invalid name', async () => {
    const result = await useCase.execute({
      name: 'j',
      email: 'johndoe@example.com',
      password: '1@Password',
    });

    expect(result.isFailure());
    expect(result.value).toBeInstanceOf(InvalidNameLengthError);
  });

  it('should not be able to register a user with invalid email', async () => {
    const result = await useCase.execute({
      name: 'John Doe',
      email: 'johndoe.com',
      password: '1@Password',
    });

    expect(result.isFailure());
    expect(result.value).toBeInstanceOf(InvalidEmailError);
  });

  it('should not be able to register a user with short password', async () => {
    const result = await useCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'abc',
    });

    expect(result.isFailure());
    expect(result.value).toBeInstanceOf(InvalidPasswordLengthError);
  });

  it('should not be able to register a user when password does not have at least one special character', async () => {
    const result = await useCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1password',
    });

    expect(result.isFailure());
    expect(result.value).toBeInstanceOf(
      AtLeastOneSpecialCharacterPasswordError,
    );
  });

  it('should not be able to register a user if same email twice', async () => {
    await useCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1@Password',
    });

    const result = await useCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1@Password',
    });

    expect(result.isFailure());
    expect(result.value).toBeInstanceOf(AlreadyExistsError);
  });
});
