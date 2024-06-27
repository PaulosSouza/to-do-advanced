import { InvalidEmailError } from '../errors/invalid-email-error';

import { Either, failure, success } from '@/core/logic/either';

export class Email {
  public static validate(email: string): boolean {
    if (!email || email.trim().length > 255) {
      return false;
    }

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email)) {
      return false;
    }

    return true;
  }

  public static format(email: string) {
    return email.trim().toLowerCase();
  }

  public static create(email: string): Either<InvalidEmailError, Email> {
    if (!this.validate(email)) {
      return failure(new InvalidEmailError(email));
    }

    const formattedEmail = this.format(email);

    return success(new Email(formattedEmail));
  }

  private readonly email: string;

  get value(): string {
    return this.email;
  }

  private constructor(email: string) {
    this.email = email;
  }
}
