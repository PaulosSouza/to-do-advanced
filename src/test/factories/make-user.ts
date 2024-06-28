import { faker } from '@faker-js/faker/locale/pt_BR';

import { UserProps, User } from '@/domain/entities/user';
import { Name } from '@/domain/entities/value-objects/name';
import { Email } from '@/domain/entities/value-objects/email';
import { Password } from '@/domain/entities/value-objects/password';

export function makeUser(override: Partial<UserProps> = {}, id?: string) {
  const nameOrError = Name.create(
    override.name?.value ?? faker.person.fullName(),
  );
  const emailOrError = Email.create(
    override.email?.value ?? faker.internet.email(),
  );
  const passwordOrError = Password.create(
    override.password?.value ?? faker.internet.password({ length: 8 }),
  );

  if (
    nameOrError.isFailure() ||
    emailOrError.isFailure() ||
    passwordOrError.isFailure()
  ) {
    throw new Error(
      'Unexpected error for "name", "email" and "password" values!',
    );
  }

  const user = User.create(
    {
      name: nameOrError.value,
      password: passwordOrError.value,
      email: emailOrError.value,
      ...override,
    },
    id,
  );

  return user;
}
