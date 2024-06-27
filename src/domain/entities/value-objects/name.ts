import { InvalidNameLengthError } from '../errors/invalid-name-length-error';

import { Either, failure, success } from '@/core/logic/either';

export class Name {
  static validateLength(name: string): boolean {
    if (!name || name.trim().length < 2 || name.trim().length > 255) {
      return false;
    }

    return true;
  }

  static create(name: string): Either<InvalidNameLengthError, Name> {
    if (!this.validateLength(name)) {
      return failure(new InvalidNameLengthError());
    }

    return success(new Name(name));
  }

  private readonly name: string;

  get value(): string {
    return this.name;
  }

  private constructor(name: string) {
    this.name = name;
  }
}
