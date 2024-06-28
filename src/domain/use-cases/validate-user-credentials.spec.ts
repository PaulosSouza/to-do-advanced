import { Email } from '../entities/value-objects/email';
import { Password } from '../entities/value-objects/password';

import { WrongCredentialsError } from './errors/wrong-credentilas-error';
import { ValidateUserCredentialsUseCase } from './validate-user-credentials';

import { makeUser } from '@/test/factories/make-user';
import { FakeHashProvider } from '@/test/providers/fake-hash-provider';
import { InMemoryUsersRepository } from '@/test/repositories/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHashProvider: FakeHashProvider;

let useCase: ValidateUserCredentialsUseCase;

describe('Validate User Credentials', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    useCase = new ValidateUserCredentialsUseCase(
      inMemoryUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to validate a user credentials', async () => {
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
        user,
      }),
    );
  });

  it('should not be able to validate a user credentials with wrong email', async () => {
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

  it('should not be able to validate a user credentials that password does not match', async () => {
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
