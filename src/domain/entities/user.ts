import { Email } from './value-objects/email';
import { Name } from './value-objects/name';
import { Password } from './value-objects/password';

import { Entity, EntityProps } from '@/core/entities/entity';

export interface UserProps extends EntityProps {
  name: Name;
  email: Email;
  password: Password;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  static create(props: UserProps, id?: string) {
    const user = new User(props, id);

    return user;
  }
}
