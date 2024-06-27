import { MongooseUserMapper } from '../mappers/mongoose-user-mapper';
import { MongooseUserModel } from '../models/mongoose-user-model';

import { User } from '@/domain/entities/user';
import { UsersRepository } from '@/domain/repositories/users-repository';

export class MongooseUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await MongooseUserModel.findOne({
      email,
    });

    if (!user) {
      return null;
    }

    return MongooseUserMapper.toDomain(user);
  }

  async create(user: User): Promise<{ id: string }> {
    const userData = MongooseUserMapper.toPersistency(user);

    await userData.save();

    return { id: userData.id };
  }
}
