import { DomainError } from '@/core/error/domain-error';

export class InvalidPasswordLengthError extends Error implements DomainError {
  constructor() {
    super('The password must have between 8 and 32 characters.');
  }
}
