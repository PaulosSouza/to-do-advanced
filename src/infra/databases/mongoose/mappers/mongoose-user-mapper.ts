import {
  type MongooseUserModelType,
  MongooseUserModel,
} from '../models/mongoose-user-model';

import { Name } from '@/domain/entities/value-objects/name';
import { User } from '@/domain/entities/user';
import { Email } from '@/domain/entities/value-objects/email';
import { Password } from '@/domain/entities/value-objects/password';

export class MongooseUserMapper {
  public static toDomain(raw: MongooseUserModelType) {
    const nameOrError = Name.create(raw.name);
    const emailOrError = Email.create(raw.email);
    const password = Password.createFromHashedPassword(raw.password);

    if (nameOrError.isFailure() || emailOrError.isFailure()) {
      throw new Error('Required user props are invalid!');
    }

    return User.create(
      {
        name: nameOrError.value,
        email: emailOrError.value,
        password,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        deletedAt: raw.deleted_at,
      },
      raw.id,
    );
  }

  public static toPersistency(user: User) {
    return new MongooseUserModel({
      name: user.name.value,
      email: user.email.value,
      password: user.password.value,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      deleted_at: user.deletedAt,
    });
  }
}
