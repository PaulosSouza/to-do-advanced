import { InvalidPasswordLengthError } from '../errors/invalid-password-length-error';
import { AtLeastOneSpecialCharacterPasswordError } from '../errors/at-least-one-special-character-password-error';

import { Either, failure, success } from '@/core/logic/either';

export type PasswordError =
  | InvalidPasswordLengthError
  | AtLeastOneSpecialCharacterPasswordError;

export class Password {
  public static checkLength(password: string) {
    const minLength = 8;
    const maxLength = 32;

    if (
      !password ||
      password.trim().length < minLength ||
      password.trim().length > maxLength
    ) {
      return false;
    }

    return true;
  }

  public static atLeastOneSpecialCharacter(password: string) {
    const specialCharRegex = /[!@#$%^&*()\-_=+[\]{};':"\\|,.<>/?]/;

    return specialCharRegex.test(password);
  }

  public static create(password: string): Either<PasswordError, Password> {
    if (!this.checkLength(password)) {
      return failure(new InvalidPasswordLengthError());
    }

    if (!this.atLeastOneSpecialCharacter(password)) {
      return failure(new AtLeastOneSpecialCharacterPasswordError());
    }

    return success(new Password(password));
  }

  public static createFromHashedPassword(hashedPassword: string): Password {
    return new Password(hashedPassword);
  }

  private readonly password: string;

  private constructor(password: string) {
    this.password = password;
  }

  get value(): string {
    return this.password;
  }
}
