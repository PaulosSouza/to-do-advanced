import { Email } from '../entities/value-objects/email';
import { Password } from '../entities/value-objects/password';

import { AuthenticateUserUseCase } from './authenticate-user';
import { WrongCredentialsError } from './errors/wrong-credentilas-error';

import { makeUser } from '@/test/factories/make-user';
import { FakeEncryptProvider } from '@/test/providers/fake-encrypt-provider';
import { FakeHashProvider } from '@/test/providers/fake-hash-provider';
import { InMemoryUsersRepository } from '@/test/repositories/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeEncryptProvider: FakeEncryptProvider;

let useCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeEncryptProvider = new FakeEncryptProvider();

    useCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakeHashProvider,
      fakeEncryptProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    const hashedPassword = await fakeHashProvider.generate('fakePasswordTest@');

    const user = makeUser({
      email: Email.createFromValidEmail('johndoe@email.com'),
      password: Password.createFromHashedPassword(hashedPassword),
    });

    inMemoryUsersRepository.items.push(user);

    const result = await useCase.execute({
      email: 'johndoe@email.com',
      password: 'fakePasswordTest@',
    });

    expect(result.isSuccess());

    expect(result.value).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });

  it('should not be able to authenticate an employee with wrong email', async () => {
    const hashedPassword = await fakeHashProvider.generate('fakePasswordTest@');

    const user = makeUser({
      email: Email.createFromValidEmail('johndoe@email.com'),
      password: Password.createFromHashedPassword(hashedPassword),
    });

    inMemoryUsersRepository.items.push(user);

    const response = await useCase.execute({
      email: 'invalid-email@email.com',
      password: 'fakePasswordTest@',
    });

    expect(response.isFailure()).toBeTruthy();
    expect(response.value).toBeInstanceOf(WrongCredentialsError);
  });

  it('should not be able to authenticate an employee that password does not match', async () => {
    const hashedPassword = await fakeHashProvider.generate('fakePasswordTest@');

    const user = makeUser({
      email: Email.createFromValidEmail('johndoe@email.com'),
      password: Password.createFromHashedPassword(hashedPassword),
    });

    inMemoryUsersRepository.items.push(user);

    const response = await useCase.execute({
      email: 'johndoe@email.com',
      password: 'invalid-password-123@',
    });

    expect(response.isFailure()).toBeTruthy();
    expect(response.value).toBeInstanceOf(WrongCredentialsError);
  });
});
