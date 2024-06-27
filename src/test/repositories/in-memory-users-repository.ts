import { User } from '@/domain/entities/user';
import { UsersRepository } from '@/domain/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(
      (currentEmployee) => currentEmployee.email.value === email,
    );

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<{ id: string }> {
    this.items.push(user);

    return { id: user.id };
  }
}
